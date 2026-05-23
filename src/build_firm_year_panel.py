import re
from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
FIRM_DIRECTORY_PATH = ROOT / "data" / "raw" / "firm_directory.csv"
PURCHASES_PATH = ROOT / "data" / "raw" / "green_credit_purchases.csv"
CLASSIFICATIONS_PATH = ROOT / "data" / "processed" / "legacy_party_classifications.csv"
OUTPUT_PATH = ROOT / "data" / "processed" / "firm_year_panel.csv"
AUDIT_PATH = ROOT / "audits" / "build_firm_year_panel_audit.md"
YEARS = range(2019, 2025)

DROP_TOKENS = {
    "inc",
    "llc",
    "co",
    "corp",
    "corporation",
    "company",
    "holdings",
    "hldgs",
    "group",
    "na",
}


def normalize_name(value: object) -> str:
    text = str(value).lower().replace("&", " and ")
    text = re.sub(r"[^a-z0-9]+", " ", text)
    tokens = [token for token in text.split() if token not in DROP_TOKENS]
    return " ".join(tokens)


def split_aliases(value: object) -> list[str]:
    if pd.isna(value):
        return []
    return [alias.strip() for alias in str(value).split("|") if alias.strip()]


def build_name_lookup(directory: pd.DataFrame) -> dict[str, str]:
    lookup = {}
    for _, row in directory.iterrows():
        names = [row["firm_name"], *split_aliases(row["name_variants"])]
        for name in names:
            lookup[normalize_name(name)] = row["firm_id"]
    return lookup


def match_firm_id(name: object, lookup: dict[str, str]) -> str | None:
    return lookup.get(normalize_name(name))


def make_directory_panel(directory: pd.DataFrame) -> pd.DataFrame:
    revenue_columns = [column for column in directory.columns if column.startswith("revenue_")]
    panel = directory.melt(
        id_vars=["firm_id", "firm_name", "industry", "name_variants"],
        value_vars=revenue_columns,
        var_name="year",
        value_name="revenue_millions",
    )
    panel["year"] = panel["year"].str.replace("revenue_", "", regex=False).astype(int)
    panel = panel[panel["year"].isin(YEARS)].copy()
    return panel.sort_values(["firm_id", "year"]).reset_index(drop=True)


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
    purchases: pd.DataFrame,
    unmatched_purchases: pd.DataFrame,
    investor_parties: pd.DataFrame,
    unmatched_investors: pd.DataFrame,
    ambiguous_parties: pd.DataFrame,
) -> None:
    buyer_rows = int(panel["GreenCreditBuyer"].sum())
    investor_rows = int(panel["LegacyFinanceInvestor"].sum())

    audit = f"""# Firm-Year Panel Build Audit

## Inputs

- Firm directory: `{FIRM_DIRECTORY_PATH.relative_to(ROOT)}`
- Green credit purchases: `{PURCHASES_PATH.relative_to(ROOT)}`
- Legacy party classifications: `{CLASSIFICATIONS_PATH.relative_to(ROOT)}`

## Outputs

- Panel: `{OUTPUT_PATH.relative_to(ROOT)}`
- Rows in panel: {len(panel)}
- Firms: {panel["firm_name"].nunique()}
- Years: {panel["year"].min()}-{panel["year"].max()}

## Variable Rules

- `GreenCreditBuyer` equals 1 when a matched firm bought green credits in that panel year.
- `GreenCreditAmount` is the sum of matched fictional green credit purchases in millions.
- `LegacyFinanceInvestor` equals 1 in the first year a matched firm is classified as a legacy finance investor and remains 1 in later panel years.
- Parties classified as `ambiguous`, `project_developer`, `customer_offtaker`, or `advisor` are not counted as legacy finance investors.

## Summary Counts

- Purchase rows read: {len(purchases)}
- Purchase rows matched to firm directory: {len(purchases) - len(unmatched_purchases)}
- Purchase rows not matched: {len(unmatched_purchases)}
- Firm-year rows with `GreenCreditBuyer == 1`: {buyer_rows}
- Matched legacy finance investor party rows: {len(investor_parties) - len(unmatched_investors)}
- Legacy finance investor party rows not matched to firm directory: {len(unmatched_investors)}
- Firm-year rows with `LegacyFinanceInvestor == 1`: {investor_rows}
- Ambiguous legacy party rows excluded from investor indicator: {len(ambiguous_parties)}

## Unmatched Purchase Buyers

{markdown_table(unmatched_purchases, ["purchase_id", "purchase_year", "buyer_name", "credit_amount_millions"])}

## Unmatched Legacy Finance Investor Parties

{markdown_table(unmatched_investors, ["deal_id", "deal_year", "party_name", "party_role_raw"])}

## Ambiguous Parties Excluded From Investor Indicator

{markdown_table(ambiguous_parties, ["deal_id", "deal_year", "party_name", "party_role_raw", "classification_reason"])}

## Teaching Note

The panel is designed for live instruction, not inference. In a real project, name matching, IPUMS/QCEW joins, and proprietary financial data merges would need stronger validation, versioned extracts, and data-use review.
"""
    AUDIT_PATH.write_text(audit, encoding="utf-8")


def main() -> None:
    if not CLASSIFICATIONS_PATH.exists():
        raise FileNotFoundError(
            "Missing data/processed/legacy_party_classifications.csv. "
            "Run `python src/classify_legacy_deal_parties.py` first."
        )

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    AUDIT_PATH.parent.mkdir(parents=True, exist_ok=True)

    directory = pd.read_csv(FIRM_DIRECTORY_PATH)
    purchases = pd.read_csv(PURCHASES_PATH)
    classifications = pd.read_csv(CLASSIFICATIONS_PATH)
    lookup = build_name_lookup(directory)

    panel = make_directory_panel(directory)

    purchases = purchases.copy()
    purchases["firm_id"] = purchases["buyer_name"].apply(lambda name: match_firm_id(name, lookup))
    unmatched_purchases = purchases[purchases["firm_id"].isna()].copy()
    matched_purchases = purchases[purchases["firm_id"].notna()].copy()

    purchase_amounts = (
        matched_purchases.groupby(["firm_id", "purchase_year"], as_index=False)["credit_amount_millions"]
        .sum()
        .rename(columns={"purchase_year": "year", "credit_amount_millions": "GreenCreditAmount"})
    )
    panel = panel.merge(purchase_amounts, on=["firm_id", "year"], how="left")
    panel["GreenCreditAmount"] = panel["GreenCreditAmount"].fillna(0).round(2)
    panel["GreenCreditBuyer"] = (panel["GreenCreditAmount"] > 0).astype(int)

    investor_parties = classifications[classifications["party_category"] == "legacy_finance_investor"].copy()
    investor_parties["firm_id"] = investor_parties["party_name"].apply(lambda name: match_firm_id(name, lookup))
    unmatched_investors = investor_parties[investor_parties["firm_id"].isna()].copy()
    matched_investors = investor_parties[investor_parties["firm_id"].notna()].copy()
    first_investor_year = matched_investors.groupby("firm_id")["deal_year"].min().to_dict()

    panel["LegacyFinanceInvestor"] = panel.apply(
        lambda row: int(row["year"] >= first_investor_year.get(row["firm_id"], 9999)),
        axis=1,
    )

    final = panel[
        [
            "firm_name",
            "year",
            "industry",
            "revenue_millions",
            "GreenCreditBuyer",
            "LegacyFinanceInvestor",
            "GreenCreditAmount",
        ]
    ].sort_values(["firm_name", "year"])

    final.to_csv(OUTPUT_PATH, index=False)

    ambiguous_parties = classifications[classifications["party_category"] == "ambiguous"].copy()
    write_audit(final, purchases, unmatched_purchases, investor_parties, unmatched_investors, ambiguous_parties)

    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)}")
    print(f"Wrote {AUDIT_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
