# Hollywood Film Tax Credit Buyers Demo

This is a compact, fictional teaching repo for an introductory STAX Lab seminar on using Codex / Claude Code for agentic AI research workflows. The example is Python-first and simulates a realistic predoc assignment at the intersection of empirical accounting, tax, public finance, and entertainment finance.

The scenario is fictional: a state film incentive program lets movie and streaming productions sell unused production tax credits to companies with enough tax capacity to use them. The research task is to build a buyer-side company-year panel showing which companies bought film tax credits and which companies previously participated in legacy film-finance deals.

No real project data, confidential records, or real firm financials are used.

## How To Use This In The Seminar

Open the interactive training guide:

```bash
open docs/index.html
```

The guide is a plain HTML/CSS/JavaScript site in `docs/`, so it can also be published with GitHub Pages from the `docs/` folder.

Then run the research workflow from the repo root:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e .
python src/classify_legacy_film_deal_parties.py
python src/build_company_year_panel.py
```

If pandas is already available, the two script commands are enough.

## Files To Inspect Live

- `docs/intro_email.md`: fictional PI handoff email.
- `data/raw/`: small fictional raw data with company aliases, messy film-finance roles, and ambiguous cases.
- `src/classify_legacy_film_deal_parties.py`: transparent rule-based classification.
- `src/build_company_year_panel.py`: company-year panel builder.
- `audits/`: generated audit trails that explain what happened and what still needs human judgment.
- `data/processed/company_year_panel.csv`: final teaching output.

## Expected Demo Flow

1. Start with the PI email and ask Codex to summarize the assignment.
2. Inspect the raw data before writing code.
3. Run the film-finance party classification script and read the audit.
4. Build the company-year panel and inspect the output.
5. Use the audit files to discuss where human judgment belongs in agentic workflows.

## GitHub Pages Publishing Note

After pushing this repo to GitHub, publish the training guide by going to:

`Settings -> Pages -> Build and deployment -> Source: Deploy from a branch -> Branch: main -> Folder: /docs`

The public site will then serve `docs/index.html`.
