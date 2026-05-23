from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
RAW_PATH = ROOT / "data" / "raw" / "legacy_film_finance_deals.csv"
OUTPUT_PATH = ROOT / "data" / "processed" / "legacy_film_party_classifications.csv"
AUDIT_PATH = ROOT / "audits" / "legacy_film_party_classification_audit.md"

RULES = {
    "legacy_film_finance_investor": (
        "tax credit investor",
        "legacy film finance investor",
        "film finance investor",
        "finance investor",
        "senior production lender",
        "production lender",
        "bridge financing",
        "provided tax capacity",
    ),
    "production_company": (
        "production company",
        "producer",
        "production sponsor",
        "project producer",
        "production llc",
    ),
    "studio_distributor": (
        "studio/distributor",
        "studio",
        "distributor",
        "distributed",
        "marketed the project",
    ),
    "completion_bond_or_payroll_vendor": (
        "completion bond",
        "completion bond firm",
        "bonded delivery",
        "payroll vendor",
        "cast and crew payroll",
        "production services vendor",
    ),
    "streaming_or_offtake_customer": (
        "streaming licensee",
        "streaming platform customer",
        "streaming/offtake customer",
        "offtake customer",
        "customer",
        "licensed",
        "release window",
        "brand integration customer",
    ),
    "advisor": (
        "advisor",
        "legal advisor",
        "financial advisor",
        "production incentive advisor",
        "brand strategy advisor",
        "counsel",
        "consulting",
    ),
}

AMBIGUOUS_TERMS = (
    "ambiguous",
    "unclear",
    "possible finance participant",
    "prospective",
    "not documented",
    "finance partner",
    "strategic partner",
    "capacity unclear",
)


def classify_party(row: pd.Series) -> tuple[str, str]:
    """Classify one film-finance party using transparent text rules."""
    role_text = str(row.get("party_role_raw", "")).lower()
    note_text = str(row.get("party_note", "")).lower()
    combined_text = f"{role_text} {note_text}"

    ambiguous_hits = [term for term in AMBIGUOUS_TERMS if term in combined_text]
    if ambiguous_hits:
        return "ambiguous", f"ambiguous term: {', '.join(ambiguous_hits)}"

    matches, matched_terms = find_rule_matches(role_text)
    source = "party_role_raw"
    if not matches:
        matches, matched_terms = find_rule_matches(combined_text)
        source = "party_role_raw + party_note"

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
    counts = classified["party_category"].value_counts().rename_axis("category").reset_index(name="rows")
    ambiguous = classified[classified["party_category"] == "ambiguous"].copy()

    rule_lines = []
    for category, keywords in RULES.items():
        rule_lines.append(f"- `{category}`: " + ", ".join(f"`{keyword}`" for keyword in keywords))

    audit = f"""# Legacy Film Party Classification Audit

## Source

- Input: `{RAW_PATH.relative_to(ROOT)}`
- Output: `{OUTPUT_PATH.relative_to(ROOT)}`
- Rows classified: {len(classified)}

## Rule Set

The script lowercases `party_role_raw` and `party_note`, then applies exact keyword checks. Rows with explicit uncertainty terms are classified as `ambiguous` before any other category is assigned. For non-ambiguous rows, rules are applied to `party_role_raw` first; `party_note` is used only when the role field has no match.

{chr(10).join(rule_lines)}

Ambiguous terms: {", ".join(f"`{term}`" for term in AMBIGUOUS_TERMS)}

## Classification Counts

{markdown_table(counts, ["category", "rows"])}

## Ambiguous Rows For Human Review

{markdown_table(ambiguous, ["deal_id", "deal_year", "party_name", "party_role_raw", "classification_reason"])}

## Teaching Note

This audit is intentionally conservative. Production companies, studios, distributors, completion bond firms, payroll vendors, customers, and advisors are not treated as legacy film-finance investors. Ambiguous finance-partner cases remain visible for review instead of being forced into a binary indicator.
"""
    AUDIT_PATH.write_text(audit, encoding="utf-8")


def main() -> None:
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    AUDIT_PATH.parent.mkdir(parents=True, exist_ok=True)

    deals = pd.read_csv(RAW_PATH)
    classified = deals.copy()
    results = classified.apply(classify_party, axis=1, result_type="expand")
    classified["party_category"] = results[0]
    classified["classification_reason"] = results[1]

    output_columns = [
        "deal_id",
        "deal_year",
        "project_title",
        "party_name",
        "party_role_raw",
        "party_note",
        "party_category",
        "classification_reason",
    ]
    classified[output_columns].to_csv(OUTPUT_PATH, index=False)
    write_audit(classified[output_columns])

    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)}")
    print(f"Wrote {AUDIT_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
