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

The PI's request plants the baseline outcome domains: meal participation and healthier-meal measures. Do not introduce the later survey outcomes yet; they arrive with the follow-up request after the baseline panel exists.

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

Read the saved email artifact and create docs/email_handoff_summary.md. Include the sender, subject, PI request, research objective, required inputs, expected outcome domains, expected deliverables, action items, open questions, assumptions, and judgment calls.

If the email is missing or unreadable, stop and tell me. Do not inspect or unzip the raw data yet.
```

### 2.7 Create Project Memory Files

After the handoff summary exists, create the project memory files:

```text
Read @docs/pi_assignment_email.pdf and docs/email_handoff_summary.md. Treat the saved PI email as the source of truth. If the handoff summary conflicts with the email, trust the email and note the mismatch.

Working in the current project root, create README.md, AGENTS.md, and CLAUDE.md.

README.md should briefly summarize the research objective, expected original inputs, expected analysis-ready output, outcome domains, and the rule that audit notes are part of the deliverable.

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
- how established_school_crosswalk.csv maps raw school names to canonical school_id values
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

## 5. Build A School-Year Panel

Start by having the agent review the inputs and state the build contract:

```text
Before building the school-year panel, inspect these inputs:

- data/original/school_directory.csv
- data/original/established_school_crosswalk.csv
- data/original/school_lunch_modernization_grant_awards.csv
- data/analysis_ready/cafeteria_partner_role_classifications.csv
- audit_notes/cafeteria_partner_role_classification_audit.md

Summarize the build contract before writing code. The panel should have one row for every school in the directory for each year 2019-2024. Grant indicators and amounts should come from the grant awards file, meal outcomes should come from the directory fields, school-name matching should use the established-school crosswalk, meal-program leadership should come only from confirmed school meal-program lead classifications, and ambiguous or non-lead categories should not turn on the lead indicator.

Also summarize any unmatched names, ambiguous records, or human-review caveats that should carry into the panel audit. Do not write or run the script yet.
```

Then ask the agent to create the panel script:

```text
Create scripts/build_school_year_panel.py, but do not run it yet.

The script should read the panel inputs inspected above and write:

- data/analysis_ready/school_year_panel.csv
- audit_notes/build_school_year_panel_audit.md

Implement the build contract from the inspection step: years 2019-2024, one school-year row per directory school per year, school aliases and district variants handled through the established-school crosswalk, ModernizationGrantRecipient and ModernizationGrantAmount tied to the award year, grant amount set to zero when no award occurred in that school-year, and MealProgramLead turned on cumulatively after the first confirmed school meal-program lead year.

The lead indicator must exclude ambiguous, district/state office, vendor, nutrition education, advisor/consultant, and other non-lead classifications. The audit note should report row counts, duplicate school-year checks, unmatched award or partner names, excluded ambiguous/non-lead rows, and records that still need human review.
```

Then run it:

```text
Run scripts/build_school_year_panel.py.

If the script fails, explain whether the issue is an input problem or a code problem before changing anything. If it succeeds, summarize which files were created or updated and the main counts in the panel.
```

Finally inspect the output and audit:

```text
Inspect data/analysis_ready/school_year_panel.csv and audit_notes/build_school_year_panel_audit.md. Report these checks:

- expected rows equal the number of unique schools times 6 years
- no duplicate school_id/year rows
- years are exactly 2019-2024
- school_id remains in the panel for later source merges
- ModernizationGrantRecipient and ModernizationGrantAmount turn on only in the correct award year, with zero grant amount when no award occurred
- MealProgramLead turns on cumulatively after the first confirmed school meal-program lead year
- ambiguous and non-lead cafeteria partner categories are excluded from MealProgramLead
- unmatched names and human-review rows are listed in the audit

Flag any failed check or unresolved research judgment before treating the panel as analysis-ready.
```

The panel is analysis-ready but not judgment-free. The audit file is where the agent hands uncertainty back to the human.

## 6. Prepare The PI Handoff

The panel exists, but the research task is not finished until the uncertainty is readable. Use the completed panel and audit notes to prepare a short PI-facing handoff: what is ready, what remains uncertain, and what should be reviewed before analysis.

Start by asking the agent to review the evidence:

```text
Read data/analysis_ready/school_year_panel.csv, audit_notes/cafeteria_partner_role_classification_audit.md, and audit_notes/build_school_year_panel_audit.md.

Create final_outputs/school_lunch_panel_review.md.

Summarize:

- panel coverage, years, and unit of observation
- key variables and how they were constructed
- unmatched names, ambiguous classifications, and human-review cases
- what the panel is ready to support
- what should not be treated as settled yet

Do not run regressions or create new variables.
```

Then draft the PI update:

```text
Using final_outputs/school_lunch_panel_review.md and the audit notes, draft final_outputs/school_lunch_panel_pi_update.md.

Write it as a concise update to the PI. Include:

- what is complete
- what files were created
- what the panel can be used for
- the most important caveats
- which cases need PI or human review
- recommended next analysis steps

Keep the tone practical and PI-facing. Do not overstate what the panel can identify.
```

## 7. Explore The 2022 Scoring Change

Use this module only if there is time after the core panel workflow. The follow-up PI request asks whether the completed panel shows promising first-pass patterns around the 2022 scoring change and introduces a new aggregate student survey extract with health and wellbeing outcomes. Keep the emphasis on the new source, the merge, whether the expanded panel fits the question, what the analysis actually ran, and what still needs human review.

### 7.1 Save And Summarize The Follow-Up Request

Have participants download the follow-up PI request from the guide and save it in `docs/` beside the original assignment email. Have them download `student_health_wellbeing_survey_extract.csv` and save it in `data/original/`. Then ask the agent to summarize the request before any merge or analysis code appears:

```text
My PI sent a follow-up request about the 2022 school lunch grant scoring change.

Follow-up request: @docs/pi_followup_2022_scoring_change_email.pdf
Survey extract: data/original/student_health_wellbeing_survey_extract.csv

Read the saved request as the source of truth and create docs/school_lunch_analysis_handoff_summary.md.

Include:

- what changed since the original assignment
- the 2022 scoring change described in the request
- the analysis-ready baseline panel file Codex should use
- the student survey extract to inspect and merge
- the first-pass questions the PI wants answered, including meal, health, and wellbeing outcomes after the survey merge
- expected tables, figure, code, audit note, review memo, and PI update
- assumptions, caveats, and human-review points

Do not inspect results, merge files, write analysis code, or draft the PI update yet.
```

### 7.2 Inspect The Survey Extract

Before merging the new source, inspect its unit, keys, coverage, and missingness:

```text
Inspect data/original/student_health_wellbeing_survey_extract.csv.

Create docs/student_survey_extract_inspection.md summarizing:

- row count and unit of observation
- school_id and year coverage
- available aggregate health and wellbeing variables
- duplicate school_id/year keys
- missing values
- whether the file can merge to data/analysis_ready/school_year_panel.csv by school_id and year

Do not merge the file yet.
```

### 7.3 Merge The Survey Extract

Merge the survey file into the completed baseline panel, preserving the original row universe:

```text
Using docs/student_survey_extract_inspection.md, merge data/original/student_health_wellbeing_survey_extract.csv into data/analysis_ready/school_year_panel.csv by school_id and year.

Create data/analysis_ready/school_year_panel_with_survey.csv and audit_notes/student_survey_merge_audit.md.

The merge must preserve the original panel row count and school-year universe. The audit should report matched rows, unmatched survey rows, panel rows without survey data, duplicate-key handling, missingness by variable, and any caveats for interpreting aggregate wellbeing or mental-health-related measures.
```

### 7.4 Check The Expanded Panel Against The Question

Before coding, ask for a short design memo that compares the PI's question with the columns and timing in the completed panel:

```text
Read docs/school_lunch_analysis_handoff_summary.md, data/analysis_ready/school_year_panel_with_survey.csv, audit_notes/student_survey_merge_audit.md, audit_notes/cafeteria_partner_role_classification_audit.md, and audit_notes/build_school_year_panel_audit.md.

Create docs/school_lunch_analysis_design_memo.md.

The memo should cover:

- the exact follow-up question about the 2022 scoring change
- the panel unit, years, and variables available after the survey merge
- which meal, health, and wellbeing outcomes can be checked in a first pass
- how to mark years before and after the 2022 change
- which comparisons the panel can support
- which variables, audit caveats, or assumptions are too weak for strong claims
- how to interpret mental-health-related referral measures cautiously
- the summary table, regression checks, plot, audit note, review memo, and PI update to create

Do not write or run analysis code yet.
```

### 7.5 Write And Run The First-Pass Analysis

Use the design memo to make one readable script and the expected outputs:

```text
Create and run scripts/run_school_lunch_first_pass_analysis.py using docs/school_lunch_analysis_design_memo.md.

The script should:

- load and validate data/analysis_ready/school_year_panel_with_survey.csv
- construct a 2022-and-later indicator
- use only variables available in the panel
- create a first-pass summary table by period and relevant school groups
- run simple regression checks for grant receipt, grant amount, lunch participation, healthy-meal score, student health index, student wellbeing score, and mental-health referral rate when those variables are available after the survey merge
- create a plot showing pre/post patterns around the 2022 scoring change
- write an audit note that names any dropped rows, missing variables, fragile checks, or interpretation limits

Output files:

- final_outputs/school_lunch_first_pass_summary.csv
- final_outputs/school_lunch_first_pass_regression_checks.csv
- final_outputs/school_lunch_2022_change_plot.svg
- audit_notes/school_lunch_first_pass_analysis_audit.md

Implementation rules:

- Use pandas and standard Python first.
- Use statsmodels only if it is already available; do not install packages without asking.
- If a check cannot be estimated cleanly, write that limitation into the audit note instead of hiding it.
- Treat mental-health referral rate as an exploratory school-level survey measure; higher values could reflect greater need, better detection, or better service access.
- Keep the code beginner-readable.

After running the script, summarize which outputs were created and the main caveats.
```

### 7.6 Inspect The Results And Audit

Slow down after the script runs. Ask the agent to inspect the code, tables, figure, and audit before anyone writes the PI update:

```text
Inspect these files:

- scripts/run_school_lunch_first_pass_analysis.py
- data/analysis_ready/school_year_panel_with_survey.csv
- audit_notes/student_survey_merge_audit.md
- final_outputs/school_lunch_first_pass_summary.csv
- final_outputs/school_lunch_first_pass_regression_checks.csv
- final_outputs/school_lunch_2022_change_plot.svg
- audit_notes/school_lunch_first_pass_analysis_audit.md

Create final_outputs/school_lunch_analysis_review.md.

The review memo should summarize:

- what the script ran
- what the survey merge added
- whether the output files match docs/school_lunch_analysis_design_memo.md
- what the summary table and plot show for meal, health, and wellbeing outcomes
- what the regression checks suggest
- which results are fragile, missing, or sensitive to panel limits
- which wellbeing or mental-health-related measures need especially cautious interpretation
- which code or data assumptions a human should inspect before sharing the update

Do not draft the PI update yet.
```

### 7.7 Draft The PI Update

End by turning the inspected outputs into a concise PI-facing note:

```text
Using docs/school_lunch_analysis_handoff_summary.md, docs/school_lunch_analysis_design_memo.md, final_outputs/school_lunch_analysis_review.md, audit_notes/student_survey_merge_audit.md, and audit_notes/school_lunch_first_pass_analysis_audit.md, draft final_outputs/school_lunch_analysis_pi_update.md.

The update should include:

- what follow-up question the PI asked
- what the survey merge added to the baseline panel
- what first-pass analysis Codex ran
- what the summary table, regression checks, and plot suggest for meal, health, and wellbeing outcomes
- why the results should be treated as preliminary
- which assumptions or data limitations matter most
- what a human researcher should review next

Keep the tone concise and PI-facing. Do not describe the results as proof that the scoring change caused the observed patterns.
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
