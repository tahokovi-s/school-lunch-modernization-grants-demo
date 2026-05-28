#!/usr/bin/env python3

from __future__ import annotations

from pathlib import Path
import math
import sys

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
INPUT_PATH = ROOT / "data" / "analysis_ready" / "school_year_panel_with_survey.csv"
OUTPUT_DIR = ROOT / "final_outputs"
SPEC_CATALOG_PATH = OUTPUT_DIR / "causal_spec_catalog.csv"
ESTIMATES_PATH = OUTPUT_DIR / "causal_spec_estimates.csv"
EVENT_STUDY_PATH = OUTPUT_DIR / "causal_event_study.svg"
BRIEF_PATH = OUTPUT_DIR / "causal_results_brief.md"

SCHOOL_COL = "school_id"
YEAR_COL = "year"
GRANT_COL = "ModernizationGrantRecipient"
AMOUNT_COL = "ModernizationGrantAmount"
OUTCOMES = [
    "lunch_participation_rate",
    "healthy_meal_score",
    "student_health_index",
    "student_wellbeing_score",
    "mental_health_referral_rate",
]
CAUTION_OUTCOMES = {"student_wellbeing_score", "mental_health_referral_rate"}


def load_panel() -> pd.DataFrame:
    if not INPUT_PATH.exists():
        raise FileNotFoundError(
            "Missing data/analysis_ready/school_year_panel_with_survey.csv.\n"
            "Run the panel and survey merge scripts first, for example:\n"
            "  python3 scripts/build_school_year_panel.py\n"
            "  python3 scripts/merge_student_survey_outcomes.py"
        )

    panel = pd.read_csv(INPUT_PATH)
    required = {SCHOOL_COL, YEAR_COL, GRANT_COL, AMOUNT_COL}
    missing = sorted(required - set(panel.columns))
    if missing:
        raise ValueError(f"The panel is missing required columns: {missing}")
    if panel.duplicated([SCHOOL_COL, YEAR_COL]).any():
        raise ValueError("The panel has duplicate school_id/year rows.")

    available_outcomes = [col for col in OUTCOMES if col in panel.columns]
    if not available_outcomes:
        raise ValueError(f"The panel does not contain any expected outcomes: {OUTCOMES}")

    panel = panel.copy()
    panel[YEAR_COL] = pd.to_numeric(panel[YEAR_COL], errors="coerce")
    panel[GRANT_COL] = pd.to_numeric(panel[GRANT_COL], errors="coerce").fillna(0)
    panel[AMOUNT_COL] = pd.to_numeric(panel[AMOUNT_COL], errors="coerce").fillna(0)
    for outcome in available_outcomes:
        panel[outcome] = pd.to_numeric(panel[outcome], errors="coerce")

    first_grant_year = (
        panel.loc[(panel[GRANT_COL] == 1) | (panel[AMOUNT_COL] > 0)]
        .groupby(SCHOOL_COL)[YEAR_COL]
        .min()
        .rename("first_grant_year")
    )
    panel = panel.merge(first_grant_year, on=SCHOOL_COL, how="left")
    panel["ever_grant"] = panel["first_grant_year"].notna().astype(int)
    panel["post_first_grant"] = (
        panel["first_grant_year"].notna() & (panel[YEAR_COL] >= panel["first_grant_year"])
    ).astype(int)
    panel["treated_post"] = panel["ever_grant"] * panel["post_first_grant"]
    panel["relative_year"] = panel[YEAR_COL] - panel["first_grant_year"]
    panel["grant_amount_100k"] = panel[AMOUNT_COL] / 100.0
    return panel


def available_outcomes(panel: pd.DataFrame) -> list[str]:
    return [col for col in OUTCOMES if col in panel.columns]


def mean_or_blank(series: pd.Series) -> float | None:
    clean = series.dropna()
    if clean.empty:
        return None
    return float(clean.mean())


def format_number(value: object, digits: int = 3) -> str:
    if value is None or pd.isna(value):
        return ""
    try:
        return f"{float(value):.{digits}f}"
    except (TypeError, ValueError):
        return str(value)


def build_spec_catalog(panel: pd.DataFrame) -> pd.DataFrame:
    outcomes = available_outcomes(panel)
    rows = []
    for outcome in outcomes:
        caution = "Use as cautious association only." if outcome in CAUTION_OUTCOMES else ""
        rows.extend(
            [
                {
                    "spec_id": f"prepost_{outcome}",
                    "family": "pre_post_check",
                    "outcome": outcome,
                    "exposure": "ever-grant schools before vs after first grant year",
                    "estimator": "descriptive means",
                    "fixed_effects": "none",
                    "status": "runnable",
                    "interpretation_note": f"Screening check, not causal. {caution}".strip(),
                },
                {
                    "spec_id": f"did_fe_{outcome}",
                    "family": "differential_exposure_did",
                    "outcome": outcome,
                    "exposure": "treated_post",
                    "estimator": "OLS if statsmodels is installed; descriptive fallback otherwise",
                    "fixed_effects": "school and year where feasible",
                    "status": "runnable",
                    "interpretation_note": f"Compares treated schools after first grant to untreated timing patterns; still needs parallel-trends support. {caution}".strip(),
                },
                {
                    "spec_id": f"event_study_{outcome}",
                    "family": "event_study_check",
                    "outcome": outcome,
                    "exposure": "years relative to first grant award",
                    "estimator": "event-time means and optional FE event-study regression",
                    "fixed_effects": "school and year where feasible",
                    "status": "runnable",
                    "interpretation_note": f"Looks for movement before and after award timing; sparse event years should be read carefully. {caution}".strip(),
                },
                {
                    "spec_id": f"dose_{outcome}",
                    "family": "grant_amount_dose",
                    "outcome": outcome,
                    "exposure": "grant_amount_100k",
                    "estimator": "OLS if statsmodels is installed; descriptive fallback otherwise",
                    "fixed_effects": "school and year where feasible",
                    "status": "runnable",
                    "interpretation_note": f"Exploratory dose association, not proof that larger grants caused larger changes. {caution}".strip(),
                },
            ]
        )
    return pd.DataFrame(rows)


def try_statsmodels():
    try:
        import statsmodels.formula.api as smf

        return smf, None
    except Exception as exc:  # pragma: no cover - depends on local environment
        return None, str(exc)


def add_descriptive_prepost(panel: pd.DataFrame, outcome: str) -> dict[str, object]:
    treated = panel[panel["ever_grant"] == 1].copy()
    pre_mean = mean_or_blank(treated.loc[treated[YEAR_COL] < treated["first_grant_year"], outcome])
    post_mean = mean_or_blank(treated.loc[treated[YEAR_COL] >= treated["first_grant_year"], outcome])
    estimate = None if pre_mean is None or post_mean is None else post_mean - pre_mean
    return {
        "spec_id": f"prepost_{outcome}",
        "family": "pre_post_check",
        "outcome": outcome,
        "term": "post_minus_pre_among_ever_grant",
        "estimate": estimate,
        "std_error": None,
        "p_value": None,
        "n_rows": int(treated[outcome].notna().sum()),
        "n_schools": int(treated[SCHOOL_COL].nunique()),
        "method": "descriptive means",
        "limitations": "Before-after comparisons confound grant timing with other time-varying changes.",
    }


def add_fallback_did(panel: pd.DataFrame, outcome: str) -> dict[str, object]:
    treated_post = panel[(panel["ever_grant"] == 1) & (panel["post_first_grant"] == 1)]
    treated_pre = panel[(panel["ever_grant"] == 1) & (panel["post_first_grant"] == 0)]
    never_post_years = panel[(panel["ever_grant"] == 0) & panel[outcome].notna()]
    treated_change = mean_or_blank(treated_post[outcome])
    treated_base = mean_or_blank(treated_pre[outcome])
    never_mean = mean_or_blank(never_post_years[outcome])
    estimate = None
    if treated_change is not None and treated_base is not None:
        estimate = treated_change - treated_base
    return {
        "spec_id": f"did_fe_{outcome}",
        "family": "differential_exposure_did",
        "outcome": outcome,
        "term": "treated_post",
        "estimate": estimate,
        "std_error": None,
        "p_value": None,
        "n_rows": int(panel[outcome].notna().sum()),
        "n_schools": int(panel.loc[panel[outcome].notna(), SCHOOL_COL].nunique()),
        "method": "descriptive fallback because statsmodels is unavailable",
        "limitations": (
            "This is not a fixed-effects regression. It reports the treated-school post-minus-pre change; "
            f"never-treated mean across all years was {format_number(never_mean)}."
        ),
    }


def add_fallback_dose(panel: pd.DataFrame, outcome: str) -> dict[str, object]:
    rows = panel[[outcome, "grant_amount_100k", SCHOOL_COL]].dropna()
    positive = rows[rows["grant_amount_100k"] > 0]
    zero = rows[rows["grant_amount_100k"] == 0]
    estimate = None
    if not positive.empty and not zero.empty:
        estimate = float(positive[outcome].mean() - zero[outcome].mean())
    return {
        "spec_id": f"dose_{outcome}",
        "family": "grant_amount_dose",
        "outcome": outcome,
        "term": "any_positive_grant_amount",
        "estimate": estimate,
        "std_error": None,
        "p_value": None,
        "n_rows": int(len(rows)),
        "n_schools": int(rows[SCHOOL_COL].nunique()),
        "method": "descriptive fallback because statsmodels is unavailable",
        "limitations": "Compares positive-award school-years to zero-award school-years without fixed effects.",
    }


def add_event_study_rows(panel: pd.DataFrame, outcome: str) -> list[dict[str, object]]:
    points = event_study_points(panel, outcome)
    rows = []
    for _, point in points.iterrows():
        rel_year = int(point["relative_year"])
        rows.append(
            {
                "spec_id": f"event_study_{outcome}",
                "family": "event_study_check",
                "outcome": outcome,
                "term": f"relative_year_{rel_year}",
                "estimate": float(point["baseline_centered"]),
                "std_error": None,
                "p_value": None,
                "n_rows": int(point["n"]),
                "n_schools": int(
                    panel.loc[
                        (panel["ever_grant"] == 1)
                        & (panel["relative_year"] == point["relative_year"])
                        & panel[outcome].notna(),
                        SCHOOL_COL,
                    ].nunique()
                ),
                "method": "event-time mean centered on relative year -1",
                "limitations": "Event-study check is descriptive without regression standard errors in the fallback path.",
            }
        )
    if not rows:
        rows.append(
            {
                "spec_id": f"event_study_{outcome}",
                "family": "event_study_check",
                "outcome": outcome,
                "term": "no_event_points",
                "estimate": None,
                "std_error": None,
                "p_value": None,
                "n_rows": 0,
                "n_schools": 0,
                "method": "not estimated",
                "limitations": "No grant-timing event-study points were available.",
            }
        )
    return rows


def add_statsmodels_row(panel: pd.DataFrame, outcome: str, spec_id: str, family: str, term: str, formula: str, smf) -> dict[str, object]:
    rows = panel[[outcome, term, SCHOOL_COL, YEAR_COL]].dropna()
    base = {
        "spec_id": spec_id,
        "family": family,
        "outcome": outcome,
        "term": term,
        "estimate": None,
        "std_error": None,
        "p_value": None,
        "n_rows": int(len(rows)),
        "n_schools": int(rows[SCHOOL_COL].nunique()) if not rows.empty else 0,
        "method": "statsmodels OLS with school and year fixed effects",
        "limitations": "Regression is a teaching specification; check parallel trends, data quality, and sample size before causal claims.",
    }
    if rows.empty or rows[term].nunique() < 2:
        base["method"] = "not estimated"
        base["limitations"] = f"Not enough variation in {term} after dropping missing values."
        return base

    try:
        fit = smf.ols(formula, data=rows).fit(cov_type="cluster", cov_kwds={"groups": rows[SCHOOL_COL]})
        base.update(
            {
                "estimate": float(fit.params.get(term, math.nan)),
                "std_error": float(fit.bse.get(term, math.nan)),
                "p_value": float(fit.pvalues.get(term, math.nan)),
                "n_rows": int(fit.nobs),
            }
        )
    except Exception as exc:
        base["method"] = "statsmodels attempted but failed"
        base["limitations"] = f"Regression failed: {exc}"
    return base


def estimate_specs(panel: pd.DataFrame) -> tuple[pd.DataFrame, str | None]:
    smf, statsmodels_error = try_statsmodels()
    rows = []
    for outcome in available_outcomes(panel):
        rows.append(add_descriptive_prepost(panel, outcome))
        rows.extend(add_event_study_rows(panel, outcome))
        if smf is None:
            rows.append(add_fallback_did(panel, outcome))
            rows.append(add_fallback_dose(panel, outcome))
        else:
            rows.append(
                add_statsmodels_row(
                    panel,
                    outcome,
                    f"did_fe_{outcome}",
                    "differential_exposure_did",
                    "treated_post",
                    f"{outcome} ~ treated_post + C({SCHOOL_COL}) + C({YEAR_COL})",
                    smf,
                )
            )
            rows.append(
                add_statsmodels_row(
                    panel,
                    outcome,
                    f"dose_{outcome}",
                    "grant_amount_dose",
                    "grant_amount_100k",
                    f"{outcome} ~ grant_amount_100k + C({SCHOOL_COL}) + C({YEAR_COL})",
                    smf,
                )
            )
    return pd.DataFrame(rows), statsmodels_error


def event_study_points(panel: pd.DataFrame, outcome: str) -> pd.DataFrame:
    event = panel[(panel["ever_grant"] == 1) & panel["relative_year"].notna()].copy()
    event = event[event["relative_year"].between(-3, 4)]
    if event.empty:
        return pd.DataFrame(columns=["relative_year", "mean_outcome", "baseline_centered", "n"])

    grouped = (
        event.groupby("relative_year", as_index=False)
        .agg(mean_outcome=(outcome, "mean"), n=(outcome, "count"))
        .sort_values("relative_year")
    )
    baseline = grouped.loc[grouped["relative_year"] == -1, "mean_outcome"]
    baseline_value = float(baseline.iloc[0]) if not baseline.empty else float(grouped["mean_outcome"].iloc[0])
    grouped["baseline_centered"] = grouped["mean_outcome"] - baseline_value
    return grouped


def write_event_study_with_matplotlib(points: pd.DataFrame, outcome: str) -> bool:
    try:
        import matplotlib.pyplot as plt
    except Exception:
        return False

    fig, ax = plt.subplots(figsize=(7.5, 4.5))
    ax.axhline(0, color="#666666", linewidth=1)
    ax.axvline(-0.5, color="#999999", linestyle="--", linewidth=1)
    ax.plot(points["relative_year"], points["baseline_centered"], marker="o", color="#276fbf")
    for _, row in points.iterrows():
        ax.annotate(f"n={int(row['n'])}", (row["relative_year"], row["baseline_centered"]), textcoords="offset points", xytext=(0, 8), ha="center", fontsize=8)
    ax.set_title("Causal spec lab event-study check")
    ax.set_xlabel("Years relative to first grant award")
    ax.set_ylabel(f"{outcome}, centered on year -1")
    fig.tight_layout()
    fig.savefig(EVENT_STUDY_PATH, format="svg")
    plt.close(fig)
    return True


def scale(value: float, old_min: float, old_max: float, new_min: float, new_max: float) -> float:
    if old_max == old_min:
        return (new_min + new_max) / 2
    return new_min + (value - old_min) * (new_max - new_min) / (old_max - old_min)


def write_event_study_plain_svg(points: pd.DataFrame, outcome: str) -> None:
    width = 760
    height = 430
    left = 72
    right = 24
    top = 44
    bottom = 64
    plot_width = width - left - right
    plot_height = height - top - bottom

    if points.empty:
        body = '<text x="72" y="210" font-size="16">No grant-timing event-study points were available.</text>'
    else:
        xs = points["relative_year"].astype(float).tolist()
        ys = points["baseline_centered"].astype(float).tolist()
        x_min, x_max = min(xs), max(xs)
        y_pad = max(0.5, (max(ys) - min(ys)) * 0.18)
        y_min, y_max = min(ys) - y_pad, max(ys) + y_pad
        coords = []
        labels = []
        for _, row in points.iterrows():
            x = scale(float(row["relative_year"]), x_min, x_max, left, left + plot_width)
            y = scale(float(row["baseline_centered"]), y_min, y_max, top + plot_height, top)
            coords.append(f"{x:.1f},{y:.1f}")
            labels.append(
                f'<circle cx="{x:.1f}" cy="{y:.1f}" r="5" fill="#276fbf" />'
                f'<text x="{x:.1f}" y="{y - 10:.1f}" text-anchor="middle" font-size="11">n={int(row["n"])}</text>'
                f'<text x="{x:.1f}" y="{height - 34}" text-anchor="middle" font-size="12">{int(row["relative_year"])}</text>'
            )
        zero_y = scale(0, y_min, y_max, top + plot_height, top)
        grant_x = scale(-0.5, x_min, x_max, left, left + plot_width)
        body = "\n".join(
            [
                f'<line x1="{left}" y1="{zero_y:.1f}" x2="{left + plot_width}" y2="{zero_y:.1f}" stroke="#777" />',
                f'<line x1="{grant_x:.1f}" y1="{top}" x2="{grant_x:.1f}" y2="{top + plot_height}" stroke="#999" stroke-dasharray="4 4" />',
                f'<polyline points="{" ".join(coords)}" fill="none" stroke="#276fbf" stroke-width="3" />',
                *labels,
            ]
        )

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">
<rect width="100%" height="100%" fill="#ffffff" />
<text x="{left}" y="26" font-family="Arial, sans-serif" font-size="18" font-weight="700">Causal spec lab event-study check</text>
<text x="{left}" y="{height - 12}" font-family="Arial, sans-serif" font-size="13">Years relative to first grant award</text>
<text x="18" y="{top + 20}" font-family="Arial, sans-serif" font-size="13" transform="rotate(-90 18 {top + 20})">{outcome}, centered on year -1</text>
<rect x="{left}" y="{top}" width="{plot_width}" height="{plot_height}" fill="none" stroke="#cccccc" />
<g font-family="Arial, sans-serif" fill="#222222">
{body}
</g>
</svg>
'''
    EVENT_STUDY_PATH.write_text(svg, encoding="utf-8")


def write_event_study(panel: pd.DataFrame) -> str:
    preferred = "student_health_index" if "student_health_index" in panel.columns else available_outcomes(panel)[0]
    points = event_study_points(panel, preferred)
    used_matplotlib = write_event_study_with_matplotlib(points, preferred)
    if not used_matplotlib:
        write_event_study_plain_svg(points, preferred)
    return preferred


def markdown_table(frame: pd.DataFrame, columns: list[str], max_rows: int = 12) -> str:
    if frame.empty:
        return "_No rows._"
    shown = frame[columns].head(max_rows).copy()
    lines = ["| " + " | ".join(columns) + " |", "| " + " | ".join(["---"] * len(columns)) + " |"]
    for _, row in shown.iterrows():
        values = []
        for col in columns:
            value = row[col]
            if value is None or pd.isna(value):
                values.append("")
            elif isinstance(value, float):
                values.append(format_number(value))
            else:
                values.append(str(value))
        lines.append("| " + " | ".join(values) + " |")
    return "\n".join(lines)


def write_brief(panel: pd.DataFrame, estimates: pd.DataFrame, event_outcome: str, statsmodels_error: str | None) -> None:
    treated_schools = int(panel.loc[panel["ever_grant"] == 1, SCHOOL_COL].nunique())
    schools = int(panel[SCHOOL_COL].nunique())
    years = f"{int(panel[YEAR_COL].min())}-{int(panel[YEAR_COL].max())}"
    did_rows = estimates[estimates["family"].isin(["differential_exposure_did", "grant_amount_dose"])].copy()
    did_rows["estimate"] = pd.to_numeric(did_rows["estimate"], errors="coerce")

    caution = (
        "Wellbeing and mental-health referral measures are especially sensitive to reporting, "
        "survey response patterns, staffing, and referral practices. Treat those results as "
        "hypothesis-generating associations unless the measurement design is audited."
    )
    stats_note = (
        "Statsmodels was available, so the DiD and dose rows use OLS with school and year fixed effects."
        if statsmodels_error is None
        else "Statsmodels was not available, so the script wrote descriptive fallback rows instead of FE regressions."
    )
    if statsmodels_error:
        stats_note += f" Import detail: {statsmodels_error}"

    brief = f"""# Causal Specification Lab Results

## Data Used

- Input: `data/analysis_ready/school_year_panel_with_survey.csv`
- Rows: {len(panel)}
- Schools: {schools}
- Years: {years}
- Schools with at least one modernization grant award: {treated_schools}

## What This Script Produced

- `final_outputs/causal_spec_catalog.csv`: candidate specification catalog.
- `final_outputs/causal_spec_estimates.csv`: runnable estimates or descriptive fallbacks.
- `final_outputs/causal_event_study.svg`: event-study style timing plot for `{event_outcome}`.
- `final_outputs/causal_results_brief.md`: this short interpretation memo.

## Main Teaching Takeaways

{stats_note}

The most useful move is not to overclaim. The catalog separates quick pre/post checks, differential-exposure DiD specifications with school and year fixed effects where feasible, event-study timing checks, and exploratory grant-amount dose checks.

{caution}

## Selected Estimate Rows

{markdown_table(did_rows, ["spec_id", "outcome", "term", "estimate", "std_error", "p_value", "method"], max_rows=15)}

## Suggested Interpretation Language

Use language like: "In this teaching panel, modernization grant timing is associated with changes in selected school-year outcomes under the listed specifications. These estimates are not final causal evidence without stronger validation of grant timing, pre-trends, comparison schools, outcome measurement, and possible simultaneous policy changes."
"""
    BRIEF_PATH.write_text(brief, encoding="utf-8")


def main() -> int:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    panel = load_panel()

    spec_catalog = build_spec_catalog(panel)
    estimates, statsmodels_error = estimate_specs(panel)
    event_outcome = write_event_study(panel)
    write_brief(panel, estimates, event_outcome, statsmodels_error)

    spec_catalog.to_csv(SPEC_CATALOG_PATH, index=False)
    estimates.to_csv(ESTIMATES_PATH, index=False)

    print(f"Wrote {SPEC_CATALOG_PATH.relative_to(ROOT)}")
    print(f"Wrote {ESTIMATES_PATH.relative_to(ROOT)}")
    print(f"Wrote {EVENT_STUDY_PATH.relative_to(ROOT)}")
    print(f"Wrote {BRIEF_PATH.relative_to(ROOT)}")
    if statsmodels_error:
        print("Statsmodels was not available; wrote descriptive fallback estimates.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        raise SystemExit(1)
