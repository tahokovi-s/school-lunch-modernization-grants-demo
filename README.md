# Green Credit Buyers Demo

This is a compact, fictional teaching repo for an introductory STAX Lab seminar on using Codex / Claude Code for agentic AI research workflows. The example is Python-first and simulates a realistic predoc assignment at the intersection of empirical accounting, tax, and public finance.

The scenario is fictional: a policy lets clean-energy developers sell unused green investment credits to other companies. The research task is to build a buyer-side firm-year panel showing which firms bought green credits and which firms previously participated in legacy clean-energy finance deals.

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
python src/classify_legacy_deal_parties.py
python src/build_firm_year_panel.py
```

## Files To Inspect Live

- `docs/intro_email.md`: fictional PI handoff email.
- `data/raw/`: small fictional raw data with name variants, messy party roles, and ambiguous cases.
- `src/classify_legacy_deal_parties.py`: transparent rule-based classification.
- `src/build_firm_year_panel.py`: firm-year panel builder.
- `audits/`: generated audit trails that explain what happened and what still needs human judgment.
- `data/processed/firm_year_panel.csv`: final teaching output.

## Expected Demo Flow

1. Start with the PI email and ask Codex to summarize the assignment.
2. Inspect the raw data before writing code.
3. Run the party classification script and read the audit.
4. Build the firm-year panel and inspect the output.
5. Use the audit files to discuss where human judgment belongs in agentic workflows.

## GitHub Pages Publishing Note

After pushing this repo to GitHub, publish the training guide by going to:

`Settings -> Pages -> Build and deployment -> Source: Deploy from a branch -> Branch: main -> Folder: /docs`

The public site will then serve `docs/index.html`.
