# Workshop Walkthrough

This walkthrough mirrors the public training site. It starts with tool setup, then moves into a fictional Hollywood film tax credit research workflow.

## 0. Setup Clinic

Before Thursday, May 28, 2026, participants should confirm:

- Codex is installed, opens, and is signed in.
- Claude Code is installed, opens, and is signed in.
- Paid or institutional access is available for Codex and Claude Code.
- `/skills` opens inside Codex.
- No project folder has been created yet.

Run:

```bash
codex --version
claude --version
git --version
python3 --version
```

If Claude Code is installed but not authenticated, run:

```bash
claude
```

If Codex is installed but not authenticated, run:

```bash
codex
```

Plan names and limits change. The operational requirement for this workshop is access to Codex plus Claude Code, not a specific billing page screenshot.

## 1. Skills Warm-Up

In Codex, open the skills list:

```text
/skills
```

Codex can use skills in two ways:

- Explicit: mention a skill directly, such as `$skill-installer`.
- Implicit: Codex selects a skill when the task matches the skill description.

List skills from the official OpenAI skills catalog:

```text
$skill-installer list curated skills from the official openai/skills repository. Do not install anything yet.
```

Optional live install:

```text
$skill-installer install https://github.com/openai/skills/tree/main/skills/.experimental/create-plan
```

After installing a skill, restart Codex before relying on it.

## 2. Open The Repo And Site

```bash
cd hollywood-film-tax-credit-buyers-demo
open docs/index.html
```

The welcome page links to the training guide. The site is served from `docs/`, the same folder GitHub Pages can publish later.

## 3. Read The PI Email

```bash
open docs/intro_email.md
```

Use this prompt:

```text
Read docs/intro_email.md. Summarize the research objective, raw inputs, expected output, and judgment calls in a concise RA brief.
```

A good agentic workflow starts by restating the assignment before writing code.

## 4. Inspect Raw Data

```bash
python -c "import pandas as pd; print(pd.read_csv('data/raw/company_directory.csv').head())"
python -c "import pandas as pd; print(pd.read_csv('data/raw/legacy_film_finance_deals.csv')[['deal_id','deal_year','party_name','party_role_raw']].head(12))"
python -c "import pandas as pd; print(pd.read_csv('data/raw/film_tax_credit_purchases.csv'))"
```

Look for company name variants, film-finance roles, and ambiguous strategic partners before running the classification script.

## 5. Classify Legacy Film-Finance Parties

```bash
python src/classify_legacy_film_deal_parties.py
sed -n '1,220p' audits/legacy_film_party_classification_audit.md
```

This script uses transparent keyword rules rather than a model call. That makes it easier to audit and teach.

## 6. Build The Company-Year Panel

```bash
python src/build_company_year_panel.py
python -c "import pandas as pd; print(pd.read_csv('data/processed/company_year_panel.csv').head(18))"
sed -n '1,220p' audits/build_company_year_panel_audit.md
```

The panel is analysis-ready but not judgment-free. The audit file is where the agent hands uncertainty back to the human.

## 7. Discuss Human Judgment

Use this prompt:

```text
Based on the audit files, draft a short note to the PI explaining what is complete and what needs judgment.
```

Reusable habits:

1. Start by verifying tools and invoking the right skill.
2. Ask the agent to restate the research task before coding.
3. Treat audits as part of the deliverable.
