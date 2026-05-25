# Workshop Walkthrough

This walkthrough mirrors the public training site. It starts with tool setup, then moves into a fictional Hollywood film tax credit research workflow.

## 0. Setup Clinic

Before Thursday, May 28, 2026, participants should confirm:

- Paid or institutional access is available for Codex and Claude Code.
- The Codex app is installed, opens, and is signed in.
- The Claude Code app is installed, opens, and is signed in.
- No project folder has been created yet.

This session is app-only for participants. The operational requirement is access to the Codex app plus the Claude Code app, not a terminal screenshot.

## 1. Open The Repo And Site

Open the public GitHub Pages site in the browser. The welcome page links to the training guide, and the guide mirrors the sequence participants will follow side by side with Codex or Claude Code.

## 2. Turn The Assignment Email Into Project Context

Have participants open the fictional assignment email in their inboxes. This is the realistic starting point: a predoc receives a PI-style email before there is a tidy project brief.

Ask Codex or Claude Code to save that email into the project as context:

```text
I received the fictional PI assignment email for this training. Create or update docs/intro_email.md with the full email text below as project context. Preserve the sender, subject, and body. Do not start coding yet.
```

After the email has been saved as `docs/intro_email.md`, use this prompt:


```text
Read docs/intro_email.md. Summarize the research objective, raw inputs, expected output, and judgment calls in a concise RA brief.
```

A good agentic workflow starts by preserving and restating the assignment before writing code. If someone cannot access the inbox email during the session, use the copy already in `docs/intro_email.md` as the fallback training handoff.

## 3. Inspect Raw Data

Ask the agent to inspect the raw files:

```text
Inspect data/raw/company_directory.csv, data/raw/legacy_film_finance_deals.csv, and data/raw/film_tax_credit_purchases.csv. List the columns, likely keys, obvious aliases, and rows that should not be auto-classified without review.
```

Look for company name variants, film-finance roles, and ambiguous strategic partners before running the classification script.

## 4. Classify Legacy Film-Finance Parties

```text
Run src/classify_legacy_film_deal_parties.py from the app, then open audits/legacy_film_party_classification_audit.md and explain which rows require human judgment.
```

This script uses transparent keyword rules rather than a model call. That makes it easier to audit and teach.

## 5. Build The Company-Year Panel

```text
Run src/build_company_year_panel.py from the app, inspect data/processed/company_year_panel.csv, and open audits/build_company_year_panel_audit.md.
```

The panel is analysis-ready but not judgment-free. The audit file is where the agent hands uncertainty back to the human.

## 6. Discuss Human Judgment

Use this prompt:

```text
Based on the audit files, draft a short note to the PI explaining what is complete and what needs judgment.
```

## 7. Extra Resources

Use this optional section only if there is time after the core research workflow. It covers `/skills`, `$skill-installer`, and the official OpenAI skills catalog:

```text
https://github.com/openai/skills
```

Optional workshop skills:

- `define-goal`
- `openai-docs`
- `pdf`
- `jupyter-notebook`

```text
Use $skill-installer with https://github.com/openai/skills as the official skills catalog. Install only this optional workshop set if the skills are not already available: define-goal, openai-docs, pdf, and jupyter-notebook. Do not install any other skills. Before changing any user-level or Global Codex settings, explain exactly what you will change and wait for my confirmation. After installation, tell me to restart Codex and show me how to confirm the skills are available.
```

Reusable habits:

1. Start by verifying access and app readiness.
2. Ask the agent to restate the research task before coding.
3. Treat audits as part of the deliverable.
