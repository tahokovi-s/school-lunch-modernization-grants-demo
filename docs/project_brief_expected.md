# Expected Codex Brief

## Research Objective

Build a fictional buyer-side firm-year panel for 2019-2024. The panel should identify which firms bought green investment credits and which firms had prior or current participation as finance investors in legacy clean-energy deals.

## Inputs

- `data/raw/firm_directory.csv`: canonical firm names, aliases, industries, and yearly revenue.
- `data/raw/green_credit_purchases.csv`: credit purchases by buyer name, purchase year, seller developer, project, and amount.
- `data/raw/legacy_energy_finance_deals.csv`: party-level legacy deal records with role descriptions and notes.

## Output

The expected analysis-ready file is:

`data/processed/firm_year_panel.csv`

Required columns:

- `firm_name`
- `year`
- `industry`
- `revenue_millions`
- `GreenCreditBuyer`
- `LegacyFinanceInvestor`
- `GreenCreditAmount`

## Proposed Workflow

1. Inspect raw data and identify name variants.
2. Classify legacy deal parties with transparent keyword rules.
3. Quarantine ambiguous party roles instead of forcing them into investor status.
4. Match purchase buyers and legacy investors to the firm directory using canonical names and aliases.
5. Build one row per firm-year from 2019 through 2024.
6. Write audit files that summarize counts, matching problems, ambiguous rows, and assumptions.

## Human Judgment Points

- Some party descriptions are ambiguous by design.
- Advisors and customers should not be counted as finance investors.
- Alias matching is acceptable for the demo but would need stronger validation before scaling.
- The legacy investor indicator is cumulative through the panel year.
- Real IPUMS, QCEW, and proprietary financial data would require data-use review and documented merge rules.
