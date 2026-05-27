import re
from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
SCHOOL_DIRECTORY_PATH = ROOT / "data" / "original" / "school_directory.csv"
GRANTS_PATH = ROOT / "data" / "original" / "school_lunch_modernization_grant_awards.csv"
CLASSIFICATIONS_PATH = ROOT / "data" / "analysis_ready" / "cafeteria_partner_role_classifications.csv"
OUTPUT_PATH = ROOT / "data" / "analysis_ready" / "school_year_panel.csv"
AUDIT_PATH = ROOT / "audit_notes" / "build_school_year_panel_audit.md"
YEARS = range(2019, 2025)
YEARLY_STEMS = ("enrollment", "lunch_participation_rate", "healthy_meal_score")

DROP_TOKENS = {
    "the",
    "school",
    "schools",
    "usd",
    "sd",
}

REPLACEMENTS = {
    "elem": "elementary",
    "es": "elementary",
    "ms": "middle school",
    "mid": "middle",
    "hs": "high school",
    "k8": "k 8",
    "vly": "valley",
    "vw": "view",
    "trls": "trails",
    "pk": "peak",
    "n": "north",
}


def normalize_name(value: object) -> str:
    text = str(value).lower().replace("&", " and ")
    text = re.sub(r"[^a-z0-9]+", " ", text)
    tokens = []
    for token in text.split():
        tokens.extend(REPLACEMENTS.get(token, token).split())
    return " ".join(token for token in tokens if token not in DROP_TOKENS)


def split_aliases(value: object) -> list[str]:
    if pd.isna(value):
        return []
    return [alias.strip() for alias in str(value).split("|") if alias.strip()]


def build_name_lookup(directory: pd.DataFrame) -> dict[str, str]:
    lookup = {}
    for _, row in directory.iterrows():
        names = [row["school_name"], *split_aliases(row["name_variants"])]
        for name in names:
            lookup[normalize_name(name)] = row["school_id"]
    return lookup


def match_school_id(name: object, lookup: dict[str, str]) -> str | None:
    return lookup.get(normalize_name(name))


def make_school_year_panel(directory: pd.DataFrame) -> pd.DataFrame:
    records = []
    for _, row in directory.iterrows():
        for year in YEARS:
            record = {
                "school_id": row["school_id"],
                "school_name": row["school_name"],
                "district_name": row["district_name"],
                "grades_served": row["grades_served"],
                "urbanicity": row["urbanicity"],
                "year": year,
            }
            for stem in YEARLY_STEMS:
                record[stem] = row[f"{stem}_{year}"]
            records.append(record)
    return pd.DataFrame.from_records(records).sort_values(["school_id", "year"]).reset_index(drop=True)


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


def write_audit(
    panel: pd.DataFrame,
    grants: pd.DataFrame,
    unmatched_grants: pd.DataFrame,
    school_leads: pd.DataFrame,
    unmatched_leads: pd.DataFrame,
    ambiguous_roles: pd.DataFrame,
) -> None:
    grant_rows = int(panel["ModernizationGrantRecipient"].sum())
    lead_rows = int(panel["MealProgramLead"].sum())

    audit = f"""# School-Year Panel Build Audit

## Inputs

- School directory: `{SCHOOL_DIRECTORY_PATH.relative_to(ROOT)}`
- School lunch modernization grants: `{GRANTS_PATH.relative_to(ROOT)}`
- Cafeteria partner role classifications: `{CLASSIFICATIONS_PATH.relative_to(ROOT)}`

## Outputs

- Panel: `{OUTPUT_PATH.relative_to(ROOT)}`
- Rows in panel: {len(panel)}
- Schools: {panel["school_name"].nunique()}
- Years: {panel["year"].min()}-{panel["year"].max()}

## Variable Rules

- `ModernizationGrantRecipient` equals 1 when a matched school received a modernization grant in that panel year.
- `ModernizationGrantAmount` is the sum of matched grant awards in thousands of dollars.
- `MealProgramLead` equals 1 in the first year a matched school is classified as a school meal-program lead and remains 1 in later panel years.
- Rows classified as `ambiguous`, `district_or_state_office`, `equipment_or_installation_vendor`, `food_supplier_or_menu_vendor`, `nutrition_education_partner`, or `advisor_or_consultant` are not counted as school meal-program leads.

## Summary Counts

- Grant rows read: {len(grants)}
- Grant rows matched to school directory: {len(grants) - len(unmatched_grants)}
- Grant rows not matched: {len(unmatched_grants)}
- School-year rows with `ModernizationGrantRecipient == 1`: {grant_rows}
- Matched school meal-program lead rows: {len(school_leads) - len(unmatched_leads)}
- School meal-program lead rows not matched to school directory: {len(unmatched_leads)}
- School-year rows with `MealProgramLead == 1`: {lead_rows}
- Ambiguous cafeteria partner rows excluded from lead indicator: {len(ambiguous_roles)}

## Unmatched Grant Rows

{markdown_table(unmatched_grants, ["grant_id", "award_year", "school_name", "grant_amount_thousands"])}

## Unmatched School Meal-Program Lead Rows

{markdown_table(unmatched_leads, ["record_id", "record_year", "organization_name", "organization_role_raw"])}

## Ambiguous Cafeteria Partner Rows Excluded From Lead Indicator

{markdown_table(ambiguous_roles, ["record_id", "record_year", "organization_name", "organization_role_raw", "classification_reason"])}

## Teaching Note

The panel is designed for live instruction, not final inference. In a real project, state grant records, student information systems, meal-claim files, and procurement data would need stronger validation, versioned extracts, and data-use review.
"""
    AUDIT_PATH.write_text(audit, encoding="utf-8")


def main() -> None:
    if not CLASSIFICATIONS_PATH.exists():
        raise FileNotFoundError(
            "Missing data/analysis_ready/cafeteria_partner_role_classifications.csv. "
            "Create it from the subagent classification workflow before building the panel."
        )

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    AUDIT_PATH.parent.mkdir(parents=True, exist_ok=True)

    directory = pd.read_csv(SCHOOL_DIRECTORY_PATH)
    grants = pd.read_csv(GRANTS_PATH)
    classifications = pd.read_csv(CLASSIFICATIONS_PATH)
    lookup = build_name_lookup(directory)

    panel = make_school_year_panel(directory)

    grants = grants.copy()
    grants["school_id"] = grants["school_name"].apply(lambda name: match_school_id(name, lookup))
    unmatched_grants = grants[grants["school_id"].isna()].copy()
    matched_grants = grants[grants["school_id"].notna()].copy()

    grant_amounts = (
        matched_grants.groupby(["school_id", "award_year"], as_index=False)["grant_amount_thousands"]
        .sum()
        .rename(columns={"award_year": "year", "grant_amount_thousands": "ModernizationGrantAmount"})
    )
    panel = panel.merge(grant_amounts, on=["school_id", "year"], how="left")
    panel["ModernizationGrantAmount"] = panel["ModernizationGrantAmount"].fillna(0).round(2)
    panel["ModernizationGrantRecipient"] = (panel["ModernizationGrantAmount"] > 0).astype(int)

    school_leads = classifications[classifications["role_category"] == "school_meal_program_lead"].copy()
    school_leads["school_id"] = school_leads["organization_name"].apply(lambda name: match_school_id(name, lookup))
    unmatched_leads = school_leads[school_leads["school_id"].isna()].copy()
    matched_leads = school_leads[school_leads["school_id"].notna()].copy()
    first_lead_year = matched_leads.groupby("school_id")["record_year"].min().to_dict()

    panel["MealProgramLead"] = panel.apply(
        lambda row: int(row["year"] >= first_lead_year.get(row["school_id"], 9999)),
        axis=1,
    )

    final = panel[
        [
            "school_name",
            "year",
            "district_name",
            "grades_served",
            "urbanicity",
            "enrollment",
            "lunch_participation_rate",
            "healthy_meal_score",
            "ModernizationGrantRecipient",
            "MealProgramLead",
            "ModernizationGrantAmount",
        ]
    ].sort_values(["school_name", "year"])

    final.to_csv(OUTPUT_PATH, index=False)

    ambiguous_roles = classifications[classifications["role_category"] == "ambiguous"].copy()
    write_audit(final, grants, unmatched_grants, school_leads, unmatched_leads, ambiguous_roles)

    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)}")
    print(f"Wrote {AUDIT_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
