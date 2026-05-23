# Expected Codex Brief

## Research Objective

Build a fictional buyer-side company-year panel for 2019-2024. The panel should identify which companies bought transferable film tax credits and which companies had prior or current participation as finance investors in legacy film-finance deals.

## Inputs

- `data/raw/company_directory.csv`: canonical company names, aliases, industries, and yearly revenue.
- `data/raw/film_tax_credit_purchases.csv`: credit purchases by buyer name, purchase year, seller production, film title, and amount.
- `data/raw/legacy_film_finance_deals.csv`: party-level legacy film-finance records with role descriptions and notes.

## Output

The expected analysis-ready file is:

`data/processed/company_year_panel.csv`

Required columns:

- `company_name`
- `year`
- `industry`
- `revenue_millions`
- `FilmCreditBuyer`
- `LegacyFilmFinanceInvestor`
- `FilmCreditAmount`

## Proposed Workflow

1. Inspect raw data and identify name variants.
2. Classify legacy film-finance deal parties with transparent keyword rules.
3. Quarantine ambiguous party roles instead of forcing them into investor status.
4. Match film tax credit buyers and legacy investors to the company directory using canonical names and aliases.
5. Build one row per company-year from 2019 through 2024.
6. Write audit files that summarize counts, matching problems, ambiguous rows, and assumptions.

## Human Judgment Points

- Some party descriptions are ambiguous by design.
- Production companies, studios, streaming customers, completion bond firms, payroll vendors, and advisors should not be counted as finance investors.
- Alias matching is acceptable for the demo but would need stronger validation before scaling.
- The legacy investor indicator is cumulative through the panel year.
- Real IPUMS, QCEW, film-credit registry, and proprietary financial data would require data-use review and documented merge rules.
