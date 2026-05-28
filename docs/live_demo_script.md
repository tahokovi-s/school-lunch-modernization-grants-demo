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
Please check whether Python is installed and available to you. If it is available, run a tiny Python script that prints the Python version and confirms that 2 + 2 equals 4. Briefly tell me what command or check you ran and where I can see the result in the Codex app. Do not modify any project files.
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

### 2.7 Create The Project Memory Set

After the handoff summary exists, create one project-memory set. Frame `README.md`, `AGENTS.md`, and `CLAUDE.md` as shared memory for future agent work, not as three unrelated deliverables:

```text
Read @docs/pi_assignment_email.pdf and docs/email_handoff_summary.md. Treat the saved PI email as the source of truth. If the handoff summary conflicts with the email, trust the email and note the mismatch.

Working in the current project root, create the project-memory set: README.md, AGENTS.md, and CLAUDE.md.

README.md should briefly summarize the research objective, expected original inputs, expected analysis-ready output, outcome domains, and the rule that audit notes are part of the deliverable.

AGENTS.md and CLAUDE.md should tell coding agents to read the email and handoff before coding, preserve raw inputs, inspect before building outputs, keep work auditable, and ask before treating ambiguous cafeteria partner roles as confirmed school leads.

Keep the files concise. Do not inspect or unzip the raw data yet.
```

## 3. Inspect Raw Data And Draft The Role Rubric

The raw-data ZIP should already be at `data/original/school_lunch_modernization_raw_data.zip`. Use one prompt to make the data legible and create one learner-facing artifact: `docs/data_intake_and_role_rubric.md`. This artifact combines raw-data inspection with the conservative cafeteria-partner role rubric. It should not classify every row or build panel outputs.

### 3.1 Create The Data Intake And Role Rubric

Ask the agent to inspect the source files and write the combined artifact:

```text
Inspect the raw-data ZIP at data/original/school_lunch_modernization_raw_data.zip.

Extract it into data/original/ while preserving the ZIP. Then create docs/data_intake_and_role_rubric.md.

The artifact should summarize:

- which CSV files are present and their row counts
- what each CSV appears to contain and its likely unit of observation
- likely keys and relationships between files
- how established_school_crosswalk.csv maps raw school names to canonical school_id values
- school or district aliases that could affect matching
- cafeteria partner-role fields and cases that may need human judgment

Then include a compact conservative role rubric with these allowed role_category values:

- school_meal_program_lead
- district_or_state_office
- equipment_or_installation_vendor
- food_supplier_or_menu_vendor
- nutrition_education_partner
- advisor_or_consultant
- ambiguous

For each category, explain the evidence that supports it, evidence that rules it out, concrete examples from the CSVs, and triggers for human review. Be conservative: unclear, vague, prospective, or only possibly implementation-related roles should remain ambiguous.

End with the checks the classification step must satisfy: one output row for every original partner-role row, allowed categories only, unresolved uncertainty preserved as ambiguous, and judgment calls surfaced in the audit.

Do not create a classification CSV, panel file, separate role-rubric file, or separate review-plan file yet.
```

Before moving on, confirm that `docs/data_intake_and_role_rubric.md` exists, and that no classification CSV or panel file exists yet.

## 4. Classify Cafeteria Partner Roles With Reviewer-Style Passes

Use the Module 3 artifact as the rubric. The goal is fewer turns: one classification prompt should produce both the machine-readable classification CSV and the audit note, then a short prompt should review the audit. If the Codex app exposes subagents or delegated reviewers, this is the best moment to show them; otherwise use the same reviewer roles inside one agent turn.

```text
Read docs/data_intake_and_role_rubric.md and data/original/cafeteria_partner_role_records.csv.

Classify every row in data/original/cafeteria_partner_role_records.csv using reviewer-style passes inside your work:

Stage 1: A school lead reviewer identifies rows that clearly support school_meal_program_lead and cites exact role or note evidence.
Stage 2: A non-lead partner reviewer identifies rows that should not count as school leads because they are district offices, equipment vendors, food suppliers, meal vendors, education partners, advisors, or other non-leads.
Stage 3: An ambiguity reviewer identifies rows that should remain ambiguous or need human review, especially strategic partners, possible implementation partners, prospective kitchen partners, and roles without documented scope.
Stage 4: A reconciliation pass resolves disagreements conservatively. If evidence is weak or reviewers would disagree, keep the row ambiguous and explain why.

If the Codex app offers subagents or delegated reviewers in this session, use separate reviewer agents. Otherwise, use clearly separated passes in your own work. In your final chat response, tell me which approach you used.

Create data/analysis_ready/cafeteria_partner_role_classifications.csv with one row for every row in data/original/cafeteria_partner_role_records.csv. Include these columns: record_id, record_year, project_title, organization_name, organization_role_raw, organization_note, role_category, classification_reason. Use only these role_category values: school_meal_program_lead, district_or_state_office, equipment_or_installation_vendor, food_supplier_or_menu_vendor, nutrition_education_partner, advisor_or_consultant, ambiguous.

Also create audit_notes/cafeteria_partner_role_classification_audit.md. The audit should summarize the reviewer-style passes, classification counts, rows marked ambiguous, any disagreements or weak-evidence cases, rows that need PI review, and a check that every original row is accounted for.

Do not write a Python classification script. Do not create a separate review-plan or reviewer-notes artifact.
```

End with a short audit review prompt:

```text
Read audit_notes/cafeteria_partner_role_classification_audit.md and data/analysis_ready/cafeteria_partner_role_classifications.csv. Summarize which rows were classified as confirmed school meal-program leads, which rows were marked ambiguous, and which judgment calls should be shown to the PI before using the panel.
```

This module teaches classification as a judgment-heavy review workflow. The analysis-ready CSV is still machine-readable, but the reasoning comes from reviewer perspectives and a visible reconciliation summary.

## 5. Build A School-Year Panel

Start by having the agent review the inputs and restate the build rules in chat. This module intentionally does not create a separate build-contract markdown artifact; the rules are restated in chat, encoded in `scripts/build_school_year_panel.py`, and preserved in `audit_notes/build_school_year_panel_audit.md`.

```text
Before building the school-year panel, inspect these inputs:

- data/original/school_directory.csv
- data/original/established_school_crosswalk.csv
- data/original/school_lunch_modernization_grant_awards.csv
- data/analysis_ready/cafeteria_partner_role_classifications.csv
- audit_notes/cafeteria_partner_role_classification_audit.md

Summarize the build rules before writing code. The panel should have one row for every school in the directory for each year 2019-2024. Grant indicators and amounts should come from the grant awards file, meal outcomes should come from the directory fields, school-name matching should use the established-school crosswalk, meal-program leadership should come only from confirmed school meal-program lead classifications, and ambiguous or non-lead categories should not turn on the lead indicator.

Also summarize any unmatched names, ambiguous records, or human-review caveats that should carry into the panel audit. Do not write or run the script yet, and do not create a separate build-contract markdown file.
```

Then ask the agent to create the panel script:

```text
Create scripts/build_school_year_panel.py, but do not run it yet.

The script should read the panel inputs inspected above and write:

- data/analysis_ready/school_year_panel.csv
- audit_notes/build_school_year_panel_audit.md

Implement the build rules restated in chat: years 2019-2024, one school-year row per directory school per year, school aliases and district variants handled through the established-school crosswalk, ModernizationGrantRecipient and ModernizationGrantAmount tied to the award year, grant amount set to zero when no award occurred in that school-year, and MealProgramLead turned on cumulatively after the first confirmed school meal-program lead year.

The lead indicator must exclude ambiguous, district/state office, vendor, nutrition education, advisor/consultant, and other non-lead classifications. The audit note should preserve the build rules and report row counts, duplicate school-year checks, unmatched award or partner names, excluded ambiguous/non-lead rows, and records that still need human review.
```

Then run it:

```text
Run scripts/build_school_year_panel.py.

If the script fails, explain whether the issue is an input problem or a code problem before changing anything. If it succeeds, summarize which files were created or updated and the main counts in the panel.
```

Finally inspect the output and audit:

```text
Inspect data/analysis_ready/school_year_panel.csv and audit_notes/build_school_year_panel_audit.md. Report these checks:

Use quick terminal or Python checks where helpful, and summarize the checks you ran.

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

## 7. Causal Design And Econometric Spec Lab

Use this module after the core panel workflow if there is time for a more ambitious Codex demo. The follow-up PI request asks whether the completed panel shows promising evidence around the 2022 scoring change and introduces a new aggregate student survey extract with health and wellbeing outcomes. Keep the emphasis on Codex as an econometric design-and-code partner: it should reject over-simple causal claims, propose feasible specifications, write runnable code, and leave one concise PI-facing brief.

### 7.1 Prepare The Expanded Panel

Have participants download the follow-up PI request from the guide and save it in `docs/` beside the original assignment email. Have them download `student_health_wellbeing_survey_extract.csv` and save it in `data/original/`. Then merge and check the survey source without creating another planning memo:

```text
My PI sent a follow-up request about the 2022 school lunch grant scoring change.

Follow-up request: @docs/pi_followup_2022_scoring_change_email.pdf
Survey extract: data/original/student_health_wellbeing_survey_extract.csv
Baseline panel: data/analysis_ready/school_year_panel.csv

Read the follow-up request as the source of truth. Then inspect and merge the survey extract into the baseline panel by school_id and year.

Create only this output file:

- data/analysis_ready/school_year_panel_with_survey.csv

Merge rules:

- preserve the baseline panel row count and school-year universe
- verify school_id/year keys are unique before merging
- report in chat the survey row count, matched rows, unmatched survey rows, panel rows without survey data, duplicate-key checks, and missingness for student_health_index, student_wellbeing_score, mental_health_referral_rate, and survey_response_count
- treat mental_health_referral_rate as service contacts per 100 students, not diagnoses

Do not create a handoff summary, inspection memo, design memo, audit note, review memo, or PI update in this step.
```

### 7.2 Have Codex Propose Candidate Designs

This is the econometrics showcase. Ask Codex to inspect the expanded panel and classify candidate designs by identification strength before it writes code:

```text
Act as an applied econometrician and coding partner.

Inspect these files:

- @docs/pi_followup_2022_scoring_change_email.pdf
- data/analysis_ready/school_year_panel_with_survey.csv
- audit_notes/cafeteria_partner_role_classification_audit.md
- audit_notes/build_school_year_panel_audit.md

In chat only, propose a compact econometric specification plan for the 2022 scoring-change question.

For each candidate design, include:

- estimand
- equation or regression formula
- outcome variables
- treatment, exposure, or event-time definition
- comparison group
- required assumptions
- whether the design is descriptive, exploratory, or plausibly causal
- what would make the estimate misleading

Include at least these candidates when feasible:

1. pre/post checks for grant receipt and grant amount
2. differential-exposure DiD with school and year fixed effects
3. event-study style checks around first grant award year
4. exploratory dose-response checks using grant amount

Be explicit that a statewide post-2022 indicator alone is not a clean causal design. Treat student wellbeing and mental-health referral measures cautiously. Do not create any files yet.
```

### 7.3 Code And Run The Spec Lab

Turn the chat design plan into one readable script and compact outputs:

```text
Using the econometric specification plan from the previous chat turn, create and run scripts/run_causal_spec_lab.py.

The script should load data/analysis_ready/school_year_panel_with_survey.csv, validate the panel keys, construct needed variables, run all feasible specifications, and write:

- final_outputs/causal_spec_catalog.csv
- final_outputs/causal_spec_estimates.csv
- final_outputs/causal_event_study.svg
- final_outputs/causal_results_brief.md

Include at least:

1. pre/post checks for ModernizationGrantRecipient and ModernizationGrantAmount
2. differential-exposure DiD with school and year fixed effects when feasible
3. event-study style checks around first grant award year
4. exploratory dose-response checks using ModernizationGrantAmount

Outcome candidates should include lunch_participation_rate, healthy_meal_score, student_health_index, student_wellbeing_score, and mental_health_referral_rate when available.

Implementation rules:

- install any Python libraries needed to run the econometric specifications and plot cleanly in the Python environment Codex will use to run the script; user-level or system-level installs are allowed when needed, but ask me before using administrator privileges
- if a model cannot be estimated cleanly, write a row in the spec catalog explaining why
- keep the code beginner-readable, with formulas and variable definitions visible
- label each specification as descriptive, exploratory, or plausibly causal only under stated assumptions
- treat mental_health_referral_rate as an exploratory service-contact measure, not a diagnosis or proof of mental-health effects
- keep final_outputs/causal_results_brief.md concise and PI-facing
- do not create intermediate design, inspection, audit, or review markdown files

After running the script, open final_outputs/causal_event_study.svg in the Codex in-app browser or another available local preview. Report in chat which outputs were created, which specifications ran, which packages were installed or verified, which specifications were skipped, and whether the figure rendered cleanly.
```

### 7.4 Review The One PI-Facing Results Brief

End by reviewing the single brief the spec runner produced, tightening language where needed without creating another memo:

```text
Review final_outputs/causal_results_brief.md against these causal spec lab outputs:

- final_outputs/causal_spec_catalog.csv
- final_outputs/causal_spec_estimates.csv
- final_outputs/causal_event_study.svg

Revise final_outputs/causal_results_brief.md only if needed.

The brief should be concise and PI-facing. It should include:

- the follow-up question about the 2022 scoring change
- what data were added by the survey merge
- the specifications Codex ran, in plain English
- what the estimates and event-study figure suggest for grants, meal outcomes, health, wellbeing, and mental-health referral measures
- which results are descriptive or exploratory rather than causal
- why a statewide 2022 change is not automatically a clean causal design
- what a human researcher should verify next before sharing or extending the analysis

Do not create separate review, audit, or design markdown files. Do not describe the results as proof that the scoring change caused the observed patterns.
```

## 8. Create Publication-Style Visualizations

Use this module after the causal spec lab if there is time. It is a Codex-app showcase: participants ask for ambitious visualization code, preview the generated SVGs, then write element-level revision notes while looking at the plots in the app.

### 8.1 Write A Visualization Brief

Start with a design brief so the plotting prompt has a clear target:

```text
Read data/analysis_ready/school_year_panel_with_survey.csv, final_outputs/causal_spec_catalog.csv, final_outputs/causal_spec_estimates.csv, final_outputs/causal_event_study.svg, and final_outputs/causal_results_brief.md.

Create docs/school_lunch_visualization_brief.md.

The brief should propose four reusable publication-style visuals:

1. Grant timing and exposure overview: show which schools received modernization grants, when awards arrived, how award amounts or treatment exposure vary, and where the 2022 scoring change belongs in the timeline.
2. Meal outcomes trend figure: compare lunch participation and healthy-meal score patterns over time, with recipient/nonrecipient or exposure-group comparisons only where the data support them.
3. Student survey outcomes snapshot: summarize available aggregate health, wellbeing, and mental-health-referral measures cautiously, using labels that make clear these are school-year aggregates and not individual diagnoses.
4. Causal estimates and caveats figure: turn the causal spec catalog, estimates, and event-study output into a compact research-facing visual summary, using uncertainty intervals only when the estimates file supports them.

For each visual, specify the intended message, required input columns, panel layout, annotations, style constraints, caveats, and exact output filename. Do not write plotting code yet.
```

### 8.2 Generate A Visualization Gallery

Then use one ambitious prompt to install the required visualization packages, create reusable code, produce four SVG drafts, and show the plots as chat artifacts:

```text
Using docs/school_lunch_visualization_brief.md, create and run scripts/create_school_lunch_visualization_gallery.py.

The script should use data/analysis_ready/school_year_panel_with_survey.csv and the causal spec lab outputs in final_outputs/ to create a small visualization gallery.

Create these outputs:

- final_outputs/visualization_gallery/grant_timing_and_exposure.svg
- final_outputs/visualization_gallery/meal_outcomes_trends.svg
- final_outputs/visualization_gallery/survey_outcomes_snapshot.svg
- final_outputs/visualization_gallery/causal_estimates_and_caveats.svg
- final_outputs/visualization_gallery/README.md
- audit_notes/school_lunch_visualization_gallery_audit.md

Visualization requirements:

- Grant timing and exposure overview: show award timing, recipient status, grant amount or exposure variation when available, a clear 2022 scoring-change marker, direct labels where useful, and a source note.
- Meal outcomes trend figure: show lunch participation and healthy-meal score trends in readable panels, with recipient/nonrecipient or exposure-group comparisons only when supported by the data.
- Student survey outcomes snapshot: summarize available aggregate student_health_index, student_wellbeing_score, and mental_health_referral_rate patterns cautiously, avoiding any claim that referral rates prove mental-health effects.
- Causal estimates and caveats figure: summarize the causal spec estimates, skipped or fragile specifications, and identification caveats in a compact research-facing visual, using confidence intervals only when supported by the estimates file.

Implementation rules:

- Before writing or running plotting code, install the required Python packages in the Python environment Codex will use to run the script: pandas, matplotlib, seaborn, and adjustText. Use a command such as `python -m pip install pandas matplotlib seaborn adjustText`. User-level or system-level installs are allowed when needed to make the script run on this machine. If a package is already installed, verify it with an import check and report it as already present. Do not treat package setup as optional.
- If an install command fails because of permissions, try the appropriate user-level, virtual-environment, or system-level fix and ask me before using administrator privileges.
- Use the installed packages in the plotting script, keeping the code beginner-readable so a researcher can edit titles, labels, colors, and annotations later.
- Record the package setup command, install scope, import-check result, and any package versions you can determine in the visualization gallery audit.
- Generate SVG files with readable text, stable figure sizes, and enough margin to avoid clipping.
- Write the audit note with input files used, output files created, packages installed or verified, missing-variable fallbacks, visual design choices, and interpretation caveats.

After running the script, show the four SVGs as artifacts or images in the Codex chat so I can view them side by side and use the app's annotation or comment tools. Also open each SVG in the in-app browser or an available local preview tool. Report whether each file rendered and whether any title, label, legend, annotation, or source note looked cramped or clipped.
```

### 8.3 Build A Plot Viewer Page

Once the SVG drafts exist, have Codex create a simple local HTML page that puts the plots in one review surface:

```text
Create a simple static HTML viewer for the generated Module 8 plots.

Use every generated SVG in final_outputs/visualization_gallery/, including these expected files:

- final_outputs/visualization_gallery/grant_timing_and_exposure.svg
- final_outputs/visualization_gallery/meal_outcomes_trends.svg
- final_outputs/visualization_gallery/survey_outcomes_snapshot.svg
- final_outputs/visualization_gallery/causal_estimates_and_caveats.svg

Create final_outputs/visualization_gallery/index.html.

Requirements:

- embed each SVG on the page with a short title, caption, and direct link to the raw SVG file
- keep the page self-contained with inline CSS and no external build tools or network assets
- make the layout readable on laptop and mobile widths
- include a short note that these are draft visualization artifacts for review, not new analysis
- preserve the existing SVG filenames and do not change the plotting script, data, estimates, or causal claims
- if an expected SVG is missing, include a clearly labeled placeholder card for it and list the missing file in the chat response

After creating the page, open final_outputs/visualization_gallery/index.html in the Codex in-app browser or another available local preview. Report whether each embedded plot rendered and whether any title, label, legend, annotation, or source note looked cramped or clipped.
```

### 8.4 Review And Revise Plot Elements In Codex

Keep the viewer page or generated plots visible, review them with Codex's annotation tools, then use the comments to revise the plotting script live:

```text
I have reviewed final_outputs/visualization_gallery/index.html and the SVG artifacts in final_outputs/visualization_gallery/ and left comments or annotations on specific plot elements.

Use my comments and the generated SVG files to update scripts/create_school_lunch_visualization_gallery.py, rerun it, and create audit_notes/school_lunch_visualization_review_notes.md.

Make only the plot revisions requested in my comments. Preserve the existing filenames unless my comments explicitly ask for variants. Leave final_outputs/visualization_gallery/index.html unchanged unless captions or links need to reflect the requested revisions.

In the review notes, summarize changes to:

- title and subtitle
- axis labels, tick labels, and units
- legends or direct labels
- 2022 scoring-change marker
- annotations and arrows
- color choices and contrast
- panel spacing and text clipping
- source notes and caveats
- print/readability risks

After rerunning, show the revised SVGs as artifacts or images in Codex chat and preview the updated viewer page again in the in-app browser or an available local preview tool. Report whether any text is still cramped or clipped and which visual choices remain subjective. Do not change the underlying analysis or make stronger causal claims.
```

## 9. Extra Resources

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
4. Use the in-app browser or local preview for generated visual outputs before sharing them.
