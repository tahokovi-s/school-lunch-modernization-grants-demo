from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
RAW_PATH = ROOT / "data" / "original" / "cafeteria_partner_role_records.csv"
OUTPUT_PATH = ROOT / "data" / "analysis_ready" / "cafeteria_partner_role_classifications.csv"
AUDIT_PATH = ROOT / "audit_notes" / "cafeteria_partner_role_classification_audit.md"

RULES = {
    "school_meal_program_lead": (
        "school meal program lead",
        "cafeteria lead",
        "school project lead",
        "meal program site lead",
        "school operations team",
        "school cafeteria team",
        "school kitchen team",
        "school led",
    ),
    "district_or_state_office": (
        "district sponsor",
        "district nutrition office",
        "district coordinated",
        "district submitted",
        "district approved",
        "state grant administrator",
    ),
    "equipment_or_installation_vendor": (
        "kitchen equipment vendor",
        "equipment vendor",
        "kitchen installer",
        "dishwasher vendor",
        "refrigeration contractor",
        "ventilation",
        "supplied",
        "installed",
    ),
    "food_supplier_or_menu_vendor": (
        "meal service vendor",
        "temporary meal service vendor",
        "produce supplier",
        "menu planning support",
        "prepared lunches",
        "fruit cups",
        "fresh fruit",
        "seasonal produce",
    ),
    "nutrition_education_partner": (
        "nutrition education partner",
        "student tasting partner",
        "taste tests",
        "student feedback",
        "student menu voting",
        "wellness",
    ),
    "advisor_or_consultant": (
        "advisor",
        "grant writer",
        "grant compliance advisor",
        "evaluation consultant",
        "procurement advisor",
        "consulting",
        "closeout checklist",
        "survey instrument",
    ),
}

AMBIGUOUS_TERMS = (
    "ambiguous",
    "unclear",
    "possible implementation partner",
    "possible support role",
    "prospective",
    "not documented",
    "role not documented",
    "strategic meal partner",
    "capacity unclear",
    "without details",
    "no signed scope",
)


def classify_role(row: pd.Series) -> tuple[str, str]:
    """Classify one cafeteria partner role using transparent text rules."""
    role_text = str(row.get("organization_role_raw", "")).lower()
    note_text = str(row.get("organization_note", "")).lower()
    combined_text = f"{role_text} {note_text}"

    ambiguous_hits = [term for term in AMBIGUOUS_TERMS if term in combined_text]
    if ambiguous_hits:
        return "ambiguous", f"ambiguous term: {', '.join(ambiguous_hits)}"

    matches, matched_terms = find_rule_matches(role_text)
    source = "organization_role_raw"
    if not matches:
        matches, matched_terms = find_rule_matches(combined_text)
        source = "organization_role_raw + organization_note"

    if len(matches) == 1:
        category = matches[0]
        return category, f"matched {source} keyword(s): {', '.join(matched_terms[category])}"

    if len(matches) > 1:
        return "ambiguous", f"multiple category matches in {source}: {', '.join(matches)}"

    return "ambiguous", "no rule matched"


def find_rule_matches(text: str) -> tuple[list[str], dict[str, list[str]]]:
    matches = []
    matched_terms = {}
    for category, keywords in RULES.items():
        hits = [keyword for keyword in keywords if keyword in text]
        if hits:
            matches.append(category)
            matched_terms[category] = hits
    return matches, matched_terms


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


def write_audit(classified: pd.DataFrame) -> None:
    counts = classified["role_category"].value_counts().rename_axis("category").reset_index(name="rows")
    ambiguous = classified[classified["role_category"] == "ambiguous"].copy()

    rule_lines = []
    for category, keywords in RULES.items():
        rule_lines.append(f"- `{category}`: " + ", ".join(f"`{keyword}`" for keyword in keywords))

    audit = f"""# Cafeteria Partner Role Classification Audit

## Source

- Input: `{RAW_PATH.relative_to(ROOT)}`
- Output: `{OUTPUT_PATH.relative_to(ROOT)}`
- Rows classified: {len(classified)}

## Rule Set

The script lowercases `organization_role_raw` and `organization_note`, then applies exact keyword checks. Rows with explicit uncertainty terms are classified as `ambiguous` before any other category is assigned. For non-ambiguous rows, rules are applied to `organization_role_raw` first; `organization_note` is used only when the role field has no match.

{chr(10).join(rule_lines)}

Ambiguous terms: {", ".join(f"`{term}`" for term in AMBIGUOUS_TERMS)}

## Classification Counts

{markdown_table(counts, ["category", "rows"])}

## Ambiguous Rows For Human Review

{markdown_table(ambiguous, ["record_id", "record_year", "organization_name", "organization_role_raw", "classification_reason"])}

## Teaching Note

This audit is intentionally conservative. District offices, equipment vendors, meal vendors, produce suppliers, education nonprofits, advisors, and consultants are not treated as school meal-program leads. Ambiguous partner cases remain visible for review instead of being forced into a binary panel indicator.
"""
    AUDIT_PATH.write_text(audit, encoding="utf-8")


def main() -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    AUDIT_PATH.parent.mkdir(parents=True, exist_ok=True)

    records = pd.read_csv(RAW_PATH)
    classified = records.copy()
    results = classified.apply(classify_role, axis=1, result_type="expand")
    classified["role_category"] = results[0]
    classified["classification_reason"] = results[1]

    output_columns = [
        "record_id",
        "record_year",
        "project_title",
        "organization_name",
        "organization_role_raw",
        "organization_note",
        "role_category",
        "classification_reason",
    ]
    classified[output_columns].to_csv(OUTPUT_PATH, index=False)
    write_audit(classified[output_columns])

    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)}")
    print(f"Wrote {AUDIT_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
