from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
PANEL_PATH = ROOT / "data" / "analysis_ready" / "school_year_panel.csv"
SURVEY_PATH = ROOT / "data" / "original" / "student_health_wellbeing_survey_extract.csv"
OUTPUT_PATH = ROOT / "data" / "analysis_ready" / "school_year_panel_with_survey.csv"
AUDIT_PATH = ROOT / "audit_notes" / "student_survey_merge_audit.md"
SURVEY_COLUMNS = [
    "student_health_index",
    "student_wellbeing_score",
    "mental_health_referral_rate",
    "survey_response_count",
]


def markdown_table(frame: pd.DataFrame, columns: list[str]) -> str:
    if frame.empty:
        return "_None._"

    header = "| " + " | ".join(columns) + " |"
    divider = "| " + " | ".join(["---"] * len(columns)) + " |"
    lines = [header, divider]
    for _, row in frame[columns].iterrows():
        values = [str(row[col]).replace("|", "/").replace("\n", " ") for col in columns]
        lines.append("| " + " | ".join(values) + " |")
    return "\n".join(lines)


def main() -> None:
    panel = pd.read_csv(PANEL_PATH)
    survey = pd.read_csv(SURVEY_PATH)

    required_panel = {"school_id", "school_name", "year"}
    required_survey = {"school_id", "school_name", "year", *SURVEY_COLUMNS, "survey_source_note"}
    missing_panel = required_panel - set(panel.columns)
    missing_survey = required_survey - set(survey.columns)
    if missing_panel:
        raise ValueError(f"Panel is missing columns: {sorted(missing_panel)}")
    if missing_survey:
        raise ValueError(f"Survey extract is missing columns: {sorted(missing_survey)}")

    if panel.duplicated(["school_id", "year"]).any():
        raise ValueError("Panel has duplicate school_id/year rows before the survey merge.")

    duplicate_survey = survey[survey.duplicated(["school_id", "year"], keep=False)].copy()
    if not duplicate_survey.empty:
        raise ValueError("Survey extract has duplicate school_id/year rows.")

    survey_keys = survey[["school_id", "year", *SURVEY_COLUMNS]].copy()
    enriched = panel.merge(survey_keys, on=["school_id", "year"], how="left")
    if len(enriched) != len(panel):
        raise ValueError("Survey merge changed the panel row count.")

    panel_keys = set(zip(panel["school_id"], panel["year"]))
    survey_pairs = list(zip(survey["school_id"], survey["year"]))
    unmatched_survey = survey[[key not in panel_keys for key in survey_pairs]].copy()
    missing_all = enriched[SURVEY_COLUMNS].isna().all(axis=1)
    missing_by_column = enriched[SURVEY_COLUMNS].isna().sum().rename_axis("variable").reset_index(name="missing_rows")

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    AUDIT_PATH.parent.mkdir(parents=True, exist_ok=True)
    enriched.to_csv(OUTPUT_PATH, index=False)

    audit = f"""# Student Survey Merge Audit

## Inputs

- Baseline panel: `{PANEL_PATH.relative_to(ROOT)}`
- Student survey extract: `{SURVEY_PATH.relative_to(ROOT)}`

## Output

- Enriched panel: `{OUTPUT_PATH.relative_to(ROOT)}`
- Baseline panel rows: {len(panel)}
- Enriched panel rows: {len(enriched)}
- Survey rows read: {len(survey)}
- Survey rows outside the baseline panel keys: {len(unmatched_survey)}
- Panel rows with no survey outcomes: {int(missing_all.sum())}

## Missingness By Survey Variable

{markdown_table(missing_by_column, ["variable", "missing_rows"])}

## Unmatched Survey Rows

{markdown_table(unmatched_survey, ["school_id", "school_name", "year"])}

## Interpretation Note

The survey extract is fictional aggregate school-year teaching data. `student_health_index` and `student_wellbeing_score` are school-level index measures. `mental_health_referral_rate` is a service-contact rate per 100 students, not a diagnosis rate; higher values could reflect need, detection, service access, or reporting practice.
"""
    AUDIT_PATH.write_text(audit, encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)}")
    print(f"Wrote {AUDIT_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
