# Workshop Walkthrough

This walkthrough mirrors the public training site. It starts with tool setup, then moves into a school lunch modernization grants research workflow.

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

## 2. Context Before Coding

Use this module as a short reading pause before anyone creates files. Do not turn it into a taxonomy lecture. The point is to make the research target concrete and give participants one habit they can use immediately.

Say the target in plain English: we are trying to build an auditable school-year panel for school lunch modernization grants. The panel should show grant receipt, grant amounts, meal outcomes, and a conservative `MealProgramLead` indicator.

Then name the problem in the data. The PI email and raw ZIP are the source materials, but the files will not already agree with one another. School names and district labels may not match cleanly. Cafeteria partner-role rows mix school leads, district offices, vendors, advisors, and ambiguous partners. Those distinctions need to stay visible until someone reviews them.

Use the figure to show why the role labels are evidence, not final categories. Then give participants one reusable prompt shape:

```text
Context: [source-of-truth files, active folder, and research target]
Next action: [one bounded thing the agent should do now]
Output: [specific file, checklist, summary, or decision needed]
Stop before: [work that belongs in a later module]
Checks: [research risks to verify, such as row counts, aliases, ambiguous roles, or audit notes]
```

Use the prompt contrast as a quick reference, but keep it practical:

```text
Bad: Clean the school lunch data and make the panel.

Better: Context: The saved PI email is the source of truth for school_lunch_modernization_grants.
Next action: summarize the assignment.
Output: create docs/email_handoff_summary.md with the PI request, required inputs, deliverables, open questions, assumptions, and judgment calls.
Stop before: unzipping data, classifying cafeteria partner roles, writing code, or building the panel.
Checks: flag wrong-folder risk, hidden role-classification assumptions, and anything that needs PI review.
```

End the module with the working habit: before coding, tell the agent what evidence to use, what one artifact to produce, and where to stop.

## 3. From PI Email To Project Memory

This module gets participants from an empty outer workspace to a ready project root with the assignment materials and memory files in place. Keep it brisk: the goal is setup plus context, not data inspection.

### 3.1 Create And Open `My_RA_Tasks`

Have participants create a new folder named `My_RA_Tasks` somewhere they can find again, such as Documents, Desktop, or another personal work folder.

Then have them open Codex, create a new project from an existing folder, and select `My_RA_Tasks`.

Say plainly: `My_RA_Tasks` is the outer workspace. The actual research project folder will be created inside it.

### 3.2 You've Got Mail! PI Email And Source Materials

With `My_RA_Tasks` open in Codex, have participants open the PI assignment in the guide. Use the image as a brief arrival cue, then move straight to the email and downloads.

Have participants review the PI email and download both files:

- `pi_assignment_email.pdf`
- `school_lunch_modernization_raw_data.zip`

If the browser asks where to save them, choose `My_RA_Tasks` for now. The guide page is only the delivery mechanism. Once saved, the email PDF and raw ZIP are the project source materials.

### 3.3 Create The Project Folder

Ask Codex to create the dedicated project folder inside `My_RA_Tasks`. The folder map is the main idea:

- `My_RA_Tasks/` is the outer workspace.
- `My_RA_Tasks/school_lunch_modernization_grants/` is the actual research project root.
- After reopening the project root, `docs/` means `school_lunch_modernization_grants/docs/`.

```text
First report the active workspace root. It should be My_RA_Tasks. If it is not, stop and tell me what folder is currently open.

Briefly explain where the saved PI email, raw ZIP, handoff summary, scripts, audit notes, analysis-ready data, and final outputs should live in this project structure.

Create a dedicated research project folder inside the current workspace named school_lunch_modernization_grants. Set up these folders:

- docs/ for assignment notes, rubrics, and handoff summaries
- data/original/ for unchanged files downloaded from the assignment materials
- data/analysis_ready/ for cleaned CSVs that are ready to use in analysis
- scripts/ for Python code that Codex writes or runs
- audit_notes/ for notes explaining checks, assumptions, and judgment calls
- final_outputs/ for final tables, figures, or exports

Add .gitkeep placeholder files in empty data, audit_notes, and final_outputs folders if needed.

Stop after creating the folders. Do not inspect data, unzip files, classify rows, write analysis code, or build the panel. When done, list the created paths and remind me to reopen school_lunch_modernization_grants as the active Codex project root.
```

### 3.4 Reopen The Project Folder

After Codex creates the folder, have participants open `school_lunch_modernization_grants` as the active Codex project root before continuing. The rest of the workshop paths are relative to that project.

Do not make this a Codex prompt. Have participants confirm in the app that the folder shown is `school_lunch_modernization_grants`, not `My_RA_Tasks`.

### 3.5 Move Source Materials Into The Project

Have participants move or save the downloaded files into the project:

- `pi_assignment_email.pdf` -> `docs/pi_assignment_email.pdf`
- `school_lunch_modernization_raw_data.zip` -> `data/original/school_lunch_modernization_raw_data.zip`

Leave the ZIP unchanged.

### 3.6 Summarize The PI Request

Ask Codex to treat the saved PI email as the source of truth and turn it into a markdown handoff summary:

```text
Use the saved PI assignment email as the source of truth for this project.

Assignment email: @docs/pi_assignment_email.pdf

Read the saved email artifact and create docs/email_handoff_summary.md. Include the sender, subject, PI request, research objective, required inputs, expected deliverables, action items, open questions, assumptions, and judgment calls.

If the email is missing or unreadable, stop and tell me. Do not inspect or unzip the raw data yet.
```

### 3.7 Create Project Memory Files

After the handoff summary exists, create the project memory files:

```text
Read @docs/pi_assignment_email.pdf and docs/email_handoff_summary.md. Treat the saved PI email as the source of truth. If the handoff summary conflicts with the email, trust the email and note the mismatch.

Working in the current project root, create README.md, AGENTS.md, and CLAUDE.md.

README.md should briefly summarize the research objective, expected original inputs, expected analysis-ready output, and the rule that audit notes are part of the deliverable.

AGENTS.md and CLAUDE.md should tell coding agents to read the email and handoff before coding, preserve raw inputs, inspect before building outputs, keep work auditable, and ask before treating ambiguous cafeteria partner roles as confirmed school leads.

Keep the files concise. Do not inspect or unzip the raw data yet.
```

## 4. Inspect Raw Data

The raw-data ZIP from Module 3 should already be at `data/original/school_lunch_modernization_raw_data.zip`. Use a compact, realistic three-prompt flow: one careful raw-data inspection prompt, one rubric prompt, and one review-pass plan prompt. Keep safety in the notes and checks rather than creating extra process scaffolding.

Ask the agent to unzip the attachment, explain the extracted folder contents, and inspect the raw data in one concise request:

```text
Mode: Execute.

The raw-data ZIP is at data/original/school_lunch_modernization_raw_data.zip. Please do one first-pass raw-data inspection.

Unzip it into data/original/ and preserve the original ZIP. Then report:

- which CSV files are present and their row counts
- what each CSV appears to contain
- likely keys and relationships between files
- school or district aliases that could affect matching
- messy cafeteria partner roles, ambiguous cases, and rows that should not be auto-classified

Save notes to docs/raw_data_preliminary_pass.md with sections for file inventory, data structure, classification risks, and open questions.

Stop after this inspection pass. Do not clean data, classify rows, write analysis code, or build the panel yet.
```

Then ask the agent to turn the preliminary pass into a classification rubric:

```text
Mode: Execute.

Based on docs/raw_data_preliminary_pass.md and data/original/cafeteria_partner_role_records.csv, draft docs/cafeteria_partner_classification_rubric.md.

The rubric should define these categories: school_meal_program_lead, district_or_state_office, equipment_or_installation_vendor, food_supplier_or_menu_vendor, nutrition_education_partner, advisor_or_consultant, and ambiguous.

For each category, explain the signals that support it, signals that rule it out, and concrete examples from the CSVs. Keep the rubric compact but concrete. Be conservative: if a role is unclear, strategic, prospective, or only possibly implementation-related, mark it ambiguous for human review rather than forcing it into school lead status.

Do not classify rows, create the final classification CSV, write analysis code, or build the panel.
```

Then ask the agent to plan the review passes that will happen in Module 5:

```text
Mode: Execute.

Create docs/cafeteria_partner_subagent_review_plan.md for classifying data/original/cafeteria_partner_role_records.csv with a team of subagent reviewers in Module 5.

Include at least four roles:

- School lead reviewer
- Non-lead partner reviewer
- Ambiguity reviewer
- Reconciliation lead

For each role, explain:

- what evidence it should cite
- what mistakes it should guard against
- how disagreements should be resolved
- what failure checks should stop the pass or send a row to human review

The plan should also specify the expected Module 5 outputs, the allowed role_category values from docs/cafeteria_partner_classification_rubric.md, and a row-count check to confirm every original record is accounted for after reconciliation.

Default rule: be conservative. If uncertainty remains unresolved, mark the row as ambiguous and needing human review.

Stop after writing the review plan. Do not classify rows or create the final CSV yet.
```

Before moving on, do a quick human verify: `docs/raw_data_preliminary_pass.md` exists, the rubric protects ambiguous cases, `docs/cafeteria_partner_subagent_review_plan.md` names roles and disagreement rules, and no classification CSV or panel file exists yet.

Look for school name variants, cafeteria partner roles, and ambiguous strategic partners before asking the subagent team to classify rows. Module 4 should leave behind notes and a review plan, not a finished classification.

## 5. Classify Cafeteria Partner Roles With Subagents

```text
Read docs/cafeteria_partner_classification_rubric.md and docs/cafeteria_partner_subagent_review_plan.md. Before classifying rows, restate the reviewer roles, the allowed role_category values, the conservative default rule, and the output files we need. Do not write or run a classification script.
```

Then ask Codex or Claude Code to run independent reviewer passes:

```text
Use the reviewer plan to run independent subagent passes over data/original/cafeteria_partner_role_records.csv. If your environment supports subagents, use them; otherwise use clearly separated reviewer passes.

Stage 1: The school lead reviewer identifies rows that clearly support school_meal_program_lead and cites exact role or note evidence.
Stage 2: The non-lead partner reviewer identifies rows that should not count as school leads because they are district offices, equipment vendors, food suppliers, meal vendors, education partners, or advisors.
Stage 3: The ambiguity reviewer identifies rows that should be ambiguous or need human review, especially strategic partners, possible implementation partners, prospective kitchen partners, and roles without documented scope.

Save the reviewer notes as docs/cafeteria_partner_subagent_review_notes.md. Do not create the final CSV yet.
```

Then reconcile the reviewers into the processed classification artifact:

```text
Reconcile docs/cafeteria_partner_subagent_review_notes.md into final row-level classifications. If reviewers disagree, choose the conservative classification and explain why.

Create data/analysis_ready/cafeteria_partner_role_classifications.csv with one row for every row in data/original/cafeteria_partner_role_records.csv. Include these columns: record_id, record_year, project_title, organization_name, organization_role_raw, organization_note, role_category, classification_reason. Use only these role_category values: school_meal_program_lead, district_or_state_office, equipment_or_installation_vendor, food_supplier_or_menu_vendor, nutrition_education_partner, advisor_or_consultant, ambiguous.

Also create audit_notes/cafeteria_partner_role_classification_audit.md. The audit should summarize the reviewer roles, classification counts, rows marked ambiguous, any reviewer disagreements, and rows that need PI review. Do not write a Python classification script for this step.
```

End by asking the agent to summarize the audit:

```text
Read audit_notes/cafeteria_partner_role_classification_audit.md and data/analysis_ready/cafeteria_partner_role_classifications.csv. Summarize which rows were classified as confirmed school meal-program leads, which rows were marked ambiguous, and which judgment calls should be shown to the PI before using the panel.
```

This module teaches classification as a judgment-heavy review workflow. The analysis-ready CSV is still machine-readable, but the reasoning comes from multiple reviewer perspectives and a visible reconciliation step.

## 6. Build The School-Year Panel

First confirm the inputs from the raw data and subagent classification workflow:

```text
Before building the school-year panel, confirm that these inputs exist: data/original/school_directory.csv, data/original/school_lunch_modernization_grant_awards.csv, and data/analysis_ready/cafeteria_partner_role_classifications.csv. Then read audit_notes/cafeteria_partner_role_classification_audit.md and summarize how the subagent reviewers created the classification file, which role_category values count as confirmed school meal-program leads, which categories are excluded, and what human-review caveats should carry forward. Do not run the panel builder yet.
```

Then ask the agent to create the panel script and explain the logic before running code:

```text
Create scripts/build_school_year_panel.py, but do not run it yet. Before writing the file, explain the panel-building logic in beginner-friendly language. The script should read data/original/school_directory.csv, data/original/school_lunch_modernization_grant_awards.csv, and data/analysis_ready/cafeteria_partner_role_classifications.csv. It should write data/analysis_ready/school_year_panel.csv and audit_notes/build_school_year_panel_audit.md.

Cover the years included, how school aliases and district name variants will be matched, how ModernizationGrantRecipient and ModernizationGrantAmount will be created, how MealProgramLead will use data/analysis_ready/cafeteria_partner_role_classifications.csv, and how ambiguous or non-lead categories will be excluded from the lead indicator. Use clear, beginner-friendly code and comments. Flag any missing input or risky assumption before writing the script.
```

Ask the agent to build the panel:

```text
Run scripts/build_school_year_panel.py. If it fails, explain the error and which input needs attention before changing code. If it succeeds, tell me which files were created or updated and give a short summary of what the panel contains.
```

Finally inspect the output and audit:

```text
Inspect data/analysis_ready/school_year_panel.csv and audit_notes/build_school_year_panel_audit.md. Give me five sanity checks: one row per school-year, expected years 2019-2024, ModernizationGrantAmount is zero-filled when no award occurred, MealProgramLead turns on cumulatively after the first confirmed school lead year, and ambiguous cafeteria partner rows are excluded from the lead indicator. Also list any unmatched names or rows that still need human review.
```

The panel is analysis-ready but not judgment-free. The audit file is where the agent hands uncertainty back to the human.

## 7. Discuss Human Judgment

Use this prompt:

```text
Based on the audit files, draft a short note to the PI explaining what is complete and what needs judgment.
```

## 8. Extra Resources

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
