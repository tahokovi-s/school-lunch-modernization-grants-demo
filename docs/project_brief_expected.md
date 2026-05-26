# Expected Agent Brief From The Assignment Email

## Research Objective

Build a fictional buyer-side company-year panel for 2019-2024. The panel should identify which companies bought transferable film tax credits and which companies had prior or current participation as finance investors in legacy film-finance deals.

## Inputs

- `data/raw/film_tax_credit_raw_data.zip`: raw-data ZIP attachment from the fictional PI email.
- `data/raw/company_directory.csv`: extracted CSV with canonical company names, aliases, industries, and yearly revenue.
- `data/raw/film_tax_credit_purchases.csv`: extracted CSV with credit purchases by buyer name, purchase year, seller production, film title, and amount.
- `data/raw/legacy_film_finance_deals.csv`: extracted CSV with party-level legacy film-finance records, role descriptions, and notes.

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

1. Confirm the raw-data ZIP attachment has been saved in `data/raw/`.
2. Unzip the attachment and identify the extracted CSV files.
3. Inspect raw data and identify name variants.
4. Draft a conservative classification rubric for legacy film-finance parties.
5. Use subagent reviewer roles to classify legacy film-finance deal parties.
6. Reconcile reviewer disagreements conservatively and quarantine ambiguous party roles instead of forcing them into investor status.
7. Match film tax credit buyers and legacy investors to the company directory using canonical names and aliases.
8. Build one row per company-year from 2019 through 2024.
9. Write audit files that summarize counts, matching problems, ambiguous rows, reviewer disagreements, and assumptions.

## Human Judgment Points

- Some party descriptions are ambiguous by design.
- Production companies, studios, streaming customers, completion bond firms, payroll vendors, and advisors should not be counted as finance investors.
- Alias matching is acceptable for the demo but would need stronger validation before scaling.
- The legacy investor indicator is cumulative through the panel year.
- Real IPUMS, QCEW, film-credit registry, and proprietary financial data would require data-use review and documented merge rules.
