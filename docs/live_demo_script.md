# Live Demo Script

## Framing

Tell the room: "This is a coding-agent workflow session. We will start before there is a project folder, verify that the tools are installed, then create a realistic predoc handoff around a fictional film tax credit project."

Keep this training site open on one side of the screen and Codex open on the other.

## 0. Setup Clinic

Ask everyone to run:

```bash
codex --version
claude --version
git --version
python3 --version
```

If Claude Code is installed but not authenticated, have them run:

```bash
claude
```

If Codex is installed but not authenticated, have them run:

```bash
codex
```

Say clearly that plan names and limits change. The operational requirement is access to Codex plus Claude Code, not a specific billing page screenshot.

## 1. Skills Warm-Up

In Codex, show:

```text
/skills
```

Then explain the two activation modes:

- Explicit: mention a skill directly, such as `$skill-installer`.
- Implicit: Codex selects a skill when the task matches the skill description.

Use the official OpenAI skills catalog:

```text
$skill-installer list curated skills from the official openai/skills repository. Do not install anything yet.
```

Optional live install:

```text
$skill-installer install https://github.com/openai/skills/tree/main/skills/.experimental/create-plan
```

If you install a skill, restart Codex before relying on it.

## 2. Open The Repo And Site

```bash
cd hollywood-film-tax-credit-buyers-demo
open docs/index.html
```

Say that the site is served from `docs/`, the same folder GitHub Pages can publish later.

## 3. Read The PI Email

```bash
open docs/intro_email.md
```

Prompt Codex:

```text
Read docs/intro_email.md. Summarize the research objective, raw inputs, expected output, and judgment calls in a concise RA brief.
```

Pause to point out that a good agentic workflow starts by restating the assignment.

## 4. Inspect Raw Data

```bash
python -c "import pandas as pd; print(pd.read_csv('data/raw/company_directory.csv').head())"
python -c "import pandas as pd; print(pd.read_csv('data/raw/legacy_film_finance_deals.csv')[['deal_id','deal_year','party_name','party_role_raw']].head(12))"
python -c "import pandas as pd; print(pd.read_csv('data/raw/film_tax_credit_purchases.csv'))"
```

Ask the room what looks messy before running any code. Company name variants, film-finance roles, and ambiguous strategic partners should come up.

## 5. Classify Legacy Film-Finance Parties

```bash
python src/classify_legacy_film_deal_parties.py
sed -n '1,220p' audits/legacy_film_party_classification_audit.md
```

Explain that this script uses transparent keyword rules rather than a model call. That makes it easier to audit and teach.

## 6. Build The Company-Year Panel

```bash
python src/build_company_year_panel.py
python -c "import pandas as pd; print(pd.read_csv('data/processed/company_year_panel.csv').head(18))"
sed -n '1,220p' audits/build_company_year_panel_audit.md
```

Point out that the panel is analysis-ready but not judgment-free. The audit file is where the agent hands uncertainty back to the human.

## 7. Discuss Human Judgment

Prompt Codex:

```text
Based on the audit files, draft a short note to the PI explaining what is complete and what needs judgment.
```

Close with three reusable habits:

1. Start by verifying tools and invoking the right skill.
2. Ask the agent to restate the research task before coding.
3. Treat audits as part of the deliverable.
