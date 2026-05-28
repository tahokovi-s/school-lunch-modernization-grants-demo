# School Lunch Modernization Grants Demo

This is a compact teaching repo for an introductory STAX Lab seminar on using Codex / Claude Code for agentic AI research workflows. The example is Python-first and follows a realistic predoc assignment at the intersection of empirical accounting, public policy, education, and school meal programs.

The session starts before participants have a project folder. Use `docs/session_invitation_email.md` as the pre-session setup email. During the live workflow, participants create a `My_RA_Tasks` folder as their outer workshop workspace, open that folder in Codex, download the PI assignment materials from the guide, ask Codex to scaffold the dedicated `school_lunch_modernization_grants` codebase inside `My_RA_Tasks`, reopen `school_lunch_modernization_grants` as the active Codex project root, and then turn the saved PI email into project memory before coding.

The research scenario starts from state school lunch modernization grants for cafeteria equipment, kitchen upgrades, cold storage, and healthier meal infrastructure. The initial task is to build a school-year panel showing which schools received modernization awards, school meal outcomes, and which schools clearly led meal-program modernization efforts. A later PI follow-up introduces an aggregate student survey extract with health and wellbeing outcomes.

No confidential student records or proprietary school files are included in this teaching repo. The later survey variables are aggregate fictional school-year teaching measures.

## Before The Session

Ask participants to confirm:

- Paid or institutional access is available for Codex and Claude Code.
- The Codex app, signed in with a ChatGPT account that includes Codex access.
- The Claude Code app, signed in with Claude Pro, Max, Team, Enterprise, Console, or equivalent institutional access.
- Python installed and confirmed by Codex with a tiny Python check.
- No project folder created yet.

Plan names and usage limits change, so the email links to the current product docs and pricing pages.

## How To Use This In The Seminar

Open the interactive training guide:

```bash
open docs/index.html
```

The welcome page links to the module guide at `docs/guide.html`. The site is plain HTML/CSS/JavaScript in `docs/`, so it can also be published with GitHub Pages from the `docs/` folder.

For future workshop revisions, use `docs/workshop_revision_rubric.md` as the master design rubric and `AGENTS.md` as the repo-level editing guide.

The live GitHub Pages site is:

`https://tahokovi-s.github.io/school-lunch-modernization-grants-demo/`

For pre-session sharing, use the setup-only URL:

`https://tahokovi-s.github.io/school-lunch-modernization-grants-demo/setup.html`

This is a soft lock for a public static site: it renders only Module 1 in the guide UI, but it is not a security boundary.

For instructor code-only verification, the repo includes deterministic fallback scripts:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e .
python scripts/classify_cafeteria_partner_roles.py
python scripts/build_school_year_panel.py
```

If pandas is already available, the two script commands are enough.

Participants do not need to type these commands during the workshop. The live session is run from the Codex and Claude Code apps. In the main teaching flow, Module 4 asks Codex or Claude Code to use reviewer-style classification passes and create `data/analysis_ready/cafeteria_partner_role_classifications.csv` plus an audit note; the Python classifier remains only as an instructor fallback or code-only reproducibility check.

The Codex app showcase moments are built into the workflow: Codex runs the first Python check and reports the terminal result, uses `@` file references for saved PDFs, optionally uses subagents or delegated reviewer passes for judgment-heavy classification, runs verification checks against generated CSVs, installs visualization libraries when useful, previews SVG plots as chat artifacts and in the in-app browser, and supports element-level plot revision prompts.

## Files To Inspect Live

- `docs/session_invitation_email.md`: sendable setup email for participants.
- `school_lunch_modernization_grants/README.md`, `school_lunch_modernization_grants/AGENTS.md`, and `school_lunch_modernization_grants/CLAUDE.md`: participant-created project memory set during Module 2.
- `school_lunch_modernization_grants/docs/pi_assignment_email.pdf`: participant-saved copy of the PI assignment email downloaded from the guide during Module 2. This repo also includes `docs/intro_email.md` as a facilitator-readable fallback copy.
- `docs/attachments/school_lunch_modernization_raw_data.zip`: source copy of the raw-data ZIP served by the guide download button.
- `school_lunch_modernization_grants/docs/email_handoff_summary.md`: agent-created markdown summary and action list produced from the saved assignment email during Module 2.
- `school_lunch_modernization_grants/data/original/school_lunch_modernization_raw_data.zip`: participant-saved copy of the raw-data ZIP during Module 2, then inspected in Module 3.
- `data/original/*.csv`: workshop raw data after the agent extracts the ZIP, with school aliases, the established-school crosswalk, grant records, messy cafeteria partner roles, unmatched awards, and ambiguous cases.
- `data/original/established_school_crosswalk.csv`: clean school identity crosswalk used to map observed names and aliases to canonical `school_id` values.
- `data/original/student_health_wellbeing_survey_extract.csv`: aggregate school-year survey extract introduced by the follow-up request, not the initial assignment.
- `docs/data_intake_and_role_rubric.md`: combined Module 3 data-intake note and conservative role rubric, including file inventory, likely keys, crosswalk support, aliases, allowed role categories, ambiguous rows, and safety checks.
- `data/analysis_ready/cafeteria_partner_role_classifications.csv` and `audit_notes/cafeteria_partner_role_classification_audit.md`: reviewed classification CSV and audit note produced during Module 4.
- `scripts/classify_cafeteria_partner_roles.py`: optional deterministic fallback for instructors, not the main participant workflow.
- `scripts/build_school_year_panel.py`: school-year panel builder.
- `audit_notes/`: generated audit notes that preserve unresolved matches, timing assumptions, and human-review cases.
- `data/analysis_ready/school_year_panel.csv`: baseline panel output with grant, meal, and meal-program lead variables.
- `data/analysis_ready/school_year_panel_with_survey.csv`: enriched panel after the survey extract is merged by `school_id` and `year`.
- `final_outputs/school_lunch_panel_review.md`: short review of what the completed panel can support and what remains unsettled.
- `final_outputs/school_lunch_panel_pi_update.md`: concise PI-facing handoff after the panel and audit notes are reviewed.
- `scripts/run_causal_spec_lab.py`: causal design and econometric specification runner.
- `final_outputs/causal_spec_catalog.csv`: compact catalog of candidate specifications, identification labels, and caveats.
- `final_outputs/causal_spec_estimates.csv`: estimates or descriptive fallback rows from the causal spec lab.
- `final_outputs/causal_event_study.svg`: event-study style timing check generated by the spec lab.
- `final_outputs/causal_results_brief.md`: concise PI-facing interpretation of the causal spec lab outputs.
- `docs/school_lunch_visualization_brief.md`: Module 8 design brief for publication-style visualization variants.
- `scripts/create_school_lunch_visualization_gallery.py`: reusable plotting script for the visualization gallery.
- `final_outputs/visualization_gallery/`: Economist-inspired, AER-style, and policy-brief SVG visualization drafts plus gallery notes.
- `audit_notes/school_lunch_visualization_gallery_audit.md` and `audit_notes/school_lunch_visualization_review_notes.md`: visual generation audit plus annotated review and revision notes.

## Expected Workshop Flow

1. Confirm participants have the Codex app and Claude Code app open and signed in.
2. Ask Codex to confirm Python is installed, run a tiny Python script, and point participants to the in-app terminal result.
3. Create `My_RA_Tasks` in a sensible place in the participant's file home, then open that folder as the active Codex project.
4. Review and download the guide's PI assignment email PDF and raw-data ZIP into `My_RA_Tasks`.
5. Ask Codex to explain the folder map and scaffold `school_lunch_modernization_grants` inside `My_RA_Tasks`.
6. Reopen `school_lunch_modernization_grants` as the active project root, move `pi_assignment_email.pdf` into `docs/`, and move the unchanged raw-data ZIP into `data/original/`.
7. Ask Codex or Claude Code to create `docs/email_handoff_summary.md`, then create the project-memory set: `README.md`, `AGENTS.md`, and `CLAUDE.md`.
8. With the raw-data ZIP in `data/original/`, ask Codex or Claude Code to unzip it and create `docs/data_intake_and_role_rubric.md`, a single beginner-facing artifact that combines raw-data inspection, likely keys, crosswalk notes, and the conservative cafeteria-partner role rubric.
9. Ask Codex or Claude Code to use reviewer-style classification passes in one prompt, using Codex subagents if available, reconcile disagreements conservatively, and write the classification CSV plus audit note.
10. Build the baseline school-year panel after restating the build rules in chat, encoding them in `scripts/build_school_year_panel.py`, and preserving the checks and caveats in `audit_notes/build_school_year_panel_audit.md`; then inspect `data/analysis_ready/school_year_panel.csv` and the audit.
11. Review the panel and audit notes, create `final_outputs/school_lunch_panel_review.md`, and draft `final_outputs/school_lunch_panel_pi_update.md` for the PI.
12. If time allows, use `Causal Design And Econometric Spec Lab` to save the follow-up request and survey extract, merge the survey outcomes into the baseline panel, have Codex propose candidate econometric designs in chat, run the causal spec runner, preview the event-study SVG, and review one concise PI-facing results brief.
13. Use `Create Publication-Style Visualizations` to ask Codex for Economist-inspired, AER-style, and policy-brief SVG drafts based on the causal spec lab outputs, then review specific plot elements in the Codex app and revise the plots live from those annotations.

## Useful Current References

- Codex app page: `https://openai.com/codex/`
- Codex skills docs: `https://developers.openai.com/codex/skills`
- OpenAI skills catalog: `https://github.com/openai/skills`
- Claude Code desktop guide: `https://code.claude.com/docs/en/desktop-quickstart`
- Claude plan guide: `https://support.claude.com/en/articles/11049762-choose-a-claude-plan`

## GitHub Pages Publishing Note

After pushing this repo to GitHub, publish the training guide by going to:

`Settings -> Pages -> Build and deployment -> Source: Deploy from a branch -> Branch: main -> Folder: /docs`

The public site will then serve `docs/index.html`.
