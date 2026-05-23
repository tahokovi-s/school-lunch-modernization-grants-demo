# Workshop Walkthrough

This walkthrough mirrors the public training site. It starts with tool setup, then moves into a fictional Hollywood film tax credit research workflow.

## 0. Setup Clinic

Before Thursday, May 28, 2026, participants should confirm:

- The Codex app is installed, opens, and is signed in.
- Codex has been asked to install only the selected workshop skills from the official OpenAI skills repo.
- The Claude Code app is installed, opens, and is signed in.
- Paid or institutional access is available for Codex and Claude Code.
- No project folder has been created yet.

This session is app-only for participants. The operational requirement is access to the Codex app plus the Claude Code app, not a terminal screenshot.

## 1. Skills Warm-Up

After the Codex app is installed and signed in, give it the official OpenAI skills repo link:

```text
https://github.com/openai/skills
```

Codex can use skills in two ways:

- Explicit: mention a skill directly, such as `$skill-installer`.
- Implicit: Codex selects a skill when the task matches the skill description.

Selected workshop skills:

- `define-goal`
- `openai-docs`
- `pdf`
- `jupyter-notebook`

Ask Codex to install only that set:

```text
Use $skill-installer with https://github.com/openai/skills as the official skills catalog. Install only this workshop set if the skills are not already available: define-goal, openai-docs, pdf, and jupyter-notebook. Do not install any other skills. Before changing any user-level or Global Codex settings, explain exactly what you will change and wait for my confirmation. After installation, tell me to restart Codex and show me how to confirm the skills are available.
```

After installing a skill, restart Codex before relying on it.

## 2. Open The Repo And Site

Open the public GitHub Pages site in the browser. The welcome page links to the training guide, and the guide mirrors the sequence participants will follow side by side with Codex or Claude Code.

## 3. Read The PI Email

In Codex or Claude Code, open `docs/intro_email.md`.

Use this prompt:

```text
Read docs/intro_email.md. Summarize the research objective, raw inputs, expected output, and judgment calls in a concise RA brief.
```

A good agentic workflow starts by restating the assignment before writing code.

## 4. Inspect Raw Data

Ask the agent to inspect the raw files:

```text
Inspect data/raw/company_directory.csv, data/raw/legacy_film_finance_deals.csv, and data/raw/film_tax_credit_purchases.csv. List the columns, likely keys, obvious aliases, and rows that should not be auto-classified without review.
```

Look for company name variants, film-finance roles, and ambiguous strategic partners before running the classification script.

## 5. Classify Legacy Film-Finance Parties

```text
Run src/classify_legacy_film_deal_parties.py from the app, then open audits/legacy_film_party_classification_audit.md and explain which rows require human judgment.
```

This script uses transparent keyword rules rather than a model call. That makes it easier to audit and teach.

## 6. Build The Company-Year Panel

```text
Run src/build_company_year_panel.py from the app, inspect data/processed/company_year_panel.csv, and open audits/build_company_year_panel_audit.md.
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
