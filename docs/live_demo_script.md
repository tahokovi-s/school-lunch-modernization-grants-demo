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

## 2. From PI Email To Project Memory

This module gets participants from an empty outer workspace to a ready project root with the assignment materials and memory files in place. Keep it brisk: the goal is setup plus context, not data inspection.

### 2.1 Create And Open `My_RA_Tasks`

Have participants create a new folder named `My_RA_Tasks` somewhere they can find again, such as Documents, Desktop, or another personal work folder.

Then have them open Codex, create a new project from an existing folder, and select `My_RA_Tasks`.

Say plainly: `My_RA_Tasks` is the outer workspace. The actual research project folder will be created inside it.

### 2.2 You've Got Mail! PI Email And Source Materials

With `My_RA_Tasks` open in Codex, have participants open the PI assignment in the guide. Use the image as a brief arrival cue, then move straight to the email and downloads.

Have participants review the PI email and download both files:

- `pi_assignment_email.pdf`
- `school_lunch_modernization_raw_data.zip`

If the browser asks where to save them, choose `My_RA_Tasks` for now. The guide page is only the delivery mechanism. Once saved, the email PDF and raw ZIP are the project source materials.

### 2.3 Create The Project Folder

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

### 2.4 Reopen The Project Folder

After Codex creates the folder, have participants open `school_lunch_modernization_grants` as the active Codex project root before continuing. The rest of the workshop paths are relative to that project.

Do not make this a Codex prompt. Have participants confirm in the app that the folder shown is `school_lunch_modernization_grants`, not `My_RA_Tasks`.

### 2.5 Move Source Materials Into The Project

Have participants move or save the downloaded files into the project:

- `pi_assignment_email.pdf` -> `docs/pi_assignment_email.pdf`
- `school_lunch_modernization_raw_data.zip` -> `data/original/school_lunch_modernization_raw_data.zip`

Leave the ZIP unchanged.

### 2.6 Summarize The PI Request

Ask Codex to treat the saved PI email as the source of truth and turn it into a markdown handoff summary:

```text
Use the saved PI assignment email as the source of truth for this project.

Assignment email: @docs/pi_assignment_email.pdf

Read the saved email artifact and create docs/email_handoff_summary.md. Include the sender, subject, PI request, research objective, required inputs, expected deliverables, action items, open questions, assumptions, and judgment calls.

If the email is missing or unreadable, stop and tell me. Do not inspect or unzip the raw data yet.
```

### 2.7 Create Project Memory Files

After the handoff summary exists, create the project memory files:

```text
Read @docs/pi_assignment_email.pdf and docs/email_handoff_summary.md. Treat the saved PI email as the source of truth. If the handoff summary conflicts with the email, trust the email and note the mismatch.

Working in the current project root, create README.md, AGENTS.md, and CLAUDE.md.

README.md should briefly summarize the research objective, expected original inputs, expected analysis-ready output, and the rule that audit notes are part of the deliverable.

AGENTS.md and CLAUDE.md should tell coding agents to read the email and handoff before coding, preserve raw inputs, inspect before building outputs, keep work auditable, and ask before treating ambiguous cafeteria partner roles as confirmed school leads.

Keep the files concise. Do not inspect or unzip the raw data yet.
```

## 3. Inspect Raw Data Before Classification

The raw-data ZIP should already be at `data/original/school_lunch_modernization_raw_data.zip`. Use three short prompts: inspect the files, write the role-classification rubric, then prepare the review plan for row-level classification. This pass should leave behind notes and a review plan, not a finished classification.

### 3.1 Inspect The Raw Files

Ask the agent to make the raw files legible before any classification work:

```text
Inspect the raw-data ZIP at data/original/school_lunch_modernization_raw_data.zip.

Extract it into data/original/ while preserving the ZIP. Then create docs/raw_data_preliminary_pass.md summarizing:

- which CSV files are present and their row counts
- what each CSV appears to contain and its likely unit of observation
- likely keys and relationships between files
- school or district aliases that could affect matching
- cafeteria partner-role cases that may need human judgment

Focus on inspection only for now; classification and panel-building come later.
```

### 3.2 Write The Role Classification Rubric

Then ask the agent to turn the preliminary pass into a compact classification rubric:

```text
Using docs/raw_data_preliminary_pass.md and data/original/cafeteria_partner_role_records.csv, draft docs/cafeteria_partner_classification_rubric.md.

Define these allowed role_category values:

- school_meal_program_lead
- district_or_state_office
- equipment_or_installation_vendor
- food_supplier_or_menu_vendor
- nutrition_education_partner
- advisor_or_consultant
- ambiguous

For each category, explain the evidence that supports it, the evidence that rules it out, concrete examples from the CSVs, and triggers for human review. Be conservative: unclear, vague, prospective, or only possibly implementation-related roles should remain ambiguous.
```

### 3.3 Prepare The Classification Review Plan

Then ask the agent to plan the review passes that will happen before row-level classification:

```text
Create docs/cafeteria_partner_subagent_review_plan.md for the row-level classification pass.

Base it on docs/cafeteria_partner_classification_rubric.md and data/original/cafeteria_partner_role_records.csv. Define these four review passes:

- School lead reviewer
- Non-lead partner reviewer
- Ambiguity reviewer
- Reconciliation lead

For each pass, explain what evidence it should cite and what would count as weak evidence. Also explain how disagreements should be reconciled, how unresolved uncertainty should stay in the ambiguous category, and how the final classification should verify that every original row is accounted for.
```

Before moving on, confirm that `docs/raw_data_preliminary_pass.md`, `docs/cafeteria_partner_classification_rubric.md`, and `docs/cafeteria_partner_subagent_review_plan.md` exist, and that no classification CSV or panel file exists yet.

## 4. Classify Cafeteria Partner Roles With Subagents

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

## 5. Build The School-Year Panel

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

## 6. Audit Trails And PI Update

Use this prompt:

```text
Based on the audit files, draft a short note to the PI explaining what is complete and what needs judgment.
```

## 7. Regression Analysis And Causal Inference

Use this module only if there is time after the core panel workflow. The follow-up PI email introduces a new question about the 2022 scoring change, and the teaching point is that agents can move quickly from panel data to regressions while humans still own the research design.

Keep the sequence simple: save the follow-up email, summarize the analysis request, ask for a design plan before code, run the provisional analysis suite, inspect the code and results, then draft a cautious PI update. Stress that the output is exploratory and should not be oversold as causal proof.

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
