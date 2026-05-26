# Workshop Walkthrough

This walkthrough mirrors the public training site. It starts with tool setup, then moves into a fictional Hollywood film tax credit research workflow.

## 0. Setup Clinic

Before Thursday, May 28, 2026, participants should confirm:

- Paid or institutional access is available for Codex and Claude Code.
- The Codex app is installed, opens, and is signed in.
- The Claude Code app is installed, opens, and is signed in.
- Python is installed and Codex can run a tiny Python check.
- No project folder has been created yet.

This session is app-only for participants. The operational requirement is access to the Codex app plus the Claude Code app, and working Python that Codex can use. Participants do not need to type command-line checks themselves.

Ask participants to copy this into Codex during setup:

```text
Please check whether Python is installed and available to you. If it is available, run a tiny Python script that prints the Python version and confirms that 2 + 2 equals 4. Do not modify any project files.
```

## 1. Open The Repo And Site

Open the public GitHub Pages site in the browser. The welcome page links to the training guide, and the guide mirrors the sequence participants will follow side by side with Codex or Claude Code.

## 2. Create The Project Root, Then Turn The Assignment Email Into Context

### 2.1 Create `My_RA_Tasks`

Have participants create a new folder named `My_RA_Tasks` somewhere sensible in their file home, such as Documents, Desktop, or another personal work folder they can find again.

Explain that `My_RA_Tasks` is the project root for the workshop. It is the home folder that will contain the actual workshop project folder and any files the agent creates during the session.

### 2.2 Open `My_RA_Tasks` In Codex

Have participants open Codex, create a new project from an existing folder, and select `My_RA_Tasks`.

### 2.3 Open The Assignment Email

Have participants open the fictional assignment email in their inboxes. This is the realistic starting point for the research task: a predoc receives a PI-style email before there is a tidy project brief. The email includes a raw-data ZIP attachment named `film_tax_credit_raw_data.zip`.

### 2.4 Create The Email Handoff Summary

Have participants save or export the email into the project as context. Depending on the email app, use either `docs/intro_email.pdf` or `docs/intro_email.eml`. Then ask the agent to treat the PI email as the source of truth and turn it into a markdown handoff summary:

```text
My PI sent me a research assignment by email. I saved that email in the docs folder as either docs/intro_email.pdf or docs/intro_email.eml. Read the saved email artifact as the source of truth for this project and create docs/email_handoff_summary.md. Include the sender, subject, what my PI is asking me to do, the research objective, required inputs or data, expected deliverables, clear action items, open questions, and any assumptions or judgment calls. Do not start coding yet.
```

### 2.5 Review Before Coding

After `docs/email_handoff_summary.md` exists, use this prompt:


```text
Read docs/email_handoff_summary.md. Before writing code, restate the research objective, raw inputs, expected output, action items, and judgment calls in a concise RA brief. Flag any missing context or open questions.
```

A good agentic workflow starts by preserving and restating the assignment before writing code. If someone cannot access the inbox email during the session, use the facilitator copy in `docs/intro_email.md` to create `docs/email_handoff_summary.md`.

## 3. Inspect Raw Data

Have participants download the raw-data ZIP attachment from the fictional PI email and save or move it into the project at `data/raw/film_tax_credit_raw_data.zip`. If the folder does not exist yet, participants can ask Codex or Claude Code to create the folder for them inside the app.

Ask the agent to unzip the attachment, explain the extracted folder contents, and inspect the raw data in one clearly staged request:

```text
I downloaded the PI email attachment and placed it at data/raw/film_tax_credit_raw_data.zip. Please work in stages:

Stage 1: Unzip the attachment into data/raw/.
Stage 2: Tell me exactly which CSV files were created and whether the original ZIP is still there.
Stage 3: Explain what each CSV appears to contain and how it might be used in the buyer-side company-year panel.
Stage 4: Do a preliminary data pass on the extracted CSVs. List the columns, likely keys, obvious company aliases or name variants, messy film-finance roles, ambiguous cases, and specific rows that should not be auto-classified without human review.
Stage 5: Save your notes as docs/raw_data_preliminary_pass.md.

Keep the explanation beginner-friendly. Stop after the preliminary data pass. Do not write analysis code or classify the rows yet.
```

Then ask the agent to turn the preliminary pass into a classification rubric:

```text
Based on docs/raw_data_preliminary_pass.md and data/raw/legacy_film_finance_deals.csv, draft docs/legacy_film_classification_rubric.md. The rubric should define these categories: legacy_film_finance_investor, production_company, studio_distributor, completion_bond_or_payroll_vendor, streaming_or_offtake_customer, advisor, and ambiguous. For each category, explain the signals that support it, signals that rule it out, and concrete examples from the CSVs. Be conservative: if a role is unclear, strategic, prospective, or only possibly finance-related, mark it ambiguous for human review rather than forcing it into investor status.
```

Then ask the agent to plan the subagent review team:

```text
Create docs/legacy_film_subagent_review_plan.md for classifying data/raw/legacy_film_finance_deals.csv with a team of subagent reviewers. Include at least four roles: investor reviewer, non-investor role reviewer, ambiguity reviewer, and reconciliation lead. For each role, explain what evidence it should cite, what mistakes it should guard against, and how disagreements should be resolved. The default rule should be conservative: unresolved uncertainty becomes ambiguous and needs human review.
```

Look for company name variants, film-finance roles, and ambiguous strategic partners before asking the subagent team to classify rows.

## 4. Classify Legacy Film-Finance Parties With Subagents

```text
Read docs/legacy_film_classification_rubric.md and docs/legacy_film_subagent_review_plan.md. Before classifying rows, restate the reviewer roles, the allowed party_category values, the conservative default rule, and the output files we need. Do not write or run a classification script.
```

Then ask Codex or Claude Code to run independent reviewer passes:

```text
Use the reviewer plan to run independent subagent passes over data/raw/legacy_film_finance_deals.csv. If your environment supports subagents, use them; otherwise use clearly separated reviewer passes.

Stage 1: The investor reviewer identifies rows that clearly support legacy_film_finance_investor and cites exact role or note evidence.
Stage 2: The non-investor role reviewer identifies rows that should not count as investors because they are production companies, studios/distributors, vendors, customers/offtake partners, brand partners, or advisors.
Stage 3: The ambiguity reviewer identifies rows that should be ambiguous or need human review, especially strategic partners, possible finance participants, prospective finance partners, and unclear finance partners.

Save the reviewer notes as docs/legacy_film_subagent_review_notes.md. Do not create the final CSV yet.
```

Then reconcile the reviewers into the processed classification artifact:

```text
Reconcile docs/legacy_film_subagent_review_notes.md into final row-level classifications. If reviewers disagree, choose the conservative classification and explain why.

Create data/processed/legacy_film_party_classifications.csv with one row for every row in data/raw/legacy_film_finance_deals.csv. Include these columns: deal_id, deal_year, project_title, party_name, party_role_raw, party_note, party_category, classification_reason. Use only these party_category values: legacy_film_finance_investor, production_company, studio_distributor, completion_bond_or_payroll_vendor, streaming_or_offtake_customer, advisor, ambiguous.

Also create audits/legacy_film_party_classification_audit.md. The audit should summarize the reviewer roles, classification counts, rows marked ambiguous, any reviewer disagreements, and rows that need PI review. Do not write a Python classification script for this step.
```

End by asking the agent to summarize the audit:

```text
Read audits/legacy_film_party_classification_audit.md and data/processed/legacy_film_party_classifications.csv. Summarize which rows were classified as confirmed legacy finance investors, which rows were marked ambiguous, and which judgment calls should be shown to the PI before using the panel.
```

This module teaches classification as a judgment-heavy review workflow. The processed CSV is still machine-readable, but the reasoning comes from multiple reviewer perspectives and a visible reconciliation step.

## 5. Build The Company-Year Panel

First confirm the inputs from the raw data and subagent classification workflow:

```text
Before building the company-year panel, confirm that these inputs exist: data/raw/company_directory.csv, data/raw/film_tax_credit_purchases.csv, and data/processed/legacy_film_party_classifications.csv. Then read audits/legacy_film_party_classification_audit.md and summarize how the subagent reviewers created the classification file, which party_category values count as confirmed legacy finance investors, which categories are excluded, and what human-review caveats should carry forward. Do not run the panel builder yet.
```

Then preview the panel logic before running code:

```text
Read src/build_company_year_panel.py and explain the panel-building logic in beginner-friendly language. Cover the years included, how company aliases and name variants are matched, how FilmCreditBuyer and FilmCreditAmount are created, how LegacyFilmFinanceInvestor uses data/processed/legacy_film_party_classifications.csv, and how ambiguous or non-investor categories are excluded from the investor indicator. Flag any missing input or risky assumption before running anything.
```

Ask the agent to build the panel from the app:

```text
Run src/build_company_year_panel.py from the app. If it fails, explain the error and which input needs attention before changing code. If it succeeds, tell me which files were created or updated and give a short summary of what the panel contains.
```

Finally inspect the output and audit:

```text
Inspect data/processed/company_year_panel.csv and audits/build_company_year_panel_audit.md. Give me five sanity checks: one row per company-year, expected years 2019-2024, FilmCreditAmount is zero-filled when no purchase occurred, LegacyFilmFinanceInvestor turns on cumulatively after the first confirmed investor year, and ambiguous legacy film party rows are excluded from the investor indicator. Also list any unmatched names or rows that still need human review.
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
