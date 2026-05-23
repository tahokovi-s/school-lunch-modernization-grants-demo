# Live Demo Script

## Framing

Tell the room: "This is a fictional predoc assignment. The point is not the policy estimate. The point is how to steer a coding agent through a small, auditable research workflow."

Keep this training site open on one side of the screen and Codex open on the other.

## 1. Open The Repo And Site

```bash
cd green-credit-buyers-demo
open docs/index.html
```

Say that the site is served from `docs/`, the same folder GitHub Pages can publish later.

## 2. Read The PI Email

```bash
open docs/intro_email.md
```

Prompt Codex:

```text
Read docs/intro_email.md. Summarize the research objective, raw inputs, expected output, and judgment calls in a concise RA brief.
```

Pause to point out that a good agentic workflow starts by restating the assignment.

## 3. Inspect Raw Data

```bash
python -c "import pandas as pd; print(pd.read_csv('data/raw/firm_directory.csv').head())"
python -c "import pandas as pd; print(pd.read_csv('data/raw/legacy_energy_finance_deals.csv')[['deal_id','deal_year','party_name','party_role_raw']].head(12))"
python -c "import pandas as pd; print(pd.read_csv('data/raw/green_credit_purchases.csv'))"
```

Ask the room what looks messy before running any code. Name variants and ambiguous party roles should come up.

## 4. Classify Legacy Deal Parties

```bash
python src/classify_legacy_deal_parties.py
sed -n '1,220p' audits/legacy_party_classification_audit.md
```

Explain that this script uses transparent keyword rules rather than a model call. That makes it easier to audit and teach.

## 5. Build The Firm-Year Panel

```bash
python src/build_firm_year_panel.py
python -c "import pandas as pd; print(pd.read_csv('data/processed/firm_year_panel.csv').head(18))"
sed -n '1,220p' audits/build_firm_year_panel_audit.md
```

Point out that the panel is analysis-ready but not judgment-free. The audit file is where the agent hands uncertainty back to the human.

## 6. Discuss Human Judgment

Prompt Codex:

```text
Based on the audit files, draft a short note to the PI explaining what is complete and what needs judgment.
```

Close with three reusable habits:

1. Ask the agent to restate the research task before coding.
2. Keep classification rules transparent when the ground truth is fuzzy.
3. Treat audits as part of the deliverable.
