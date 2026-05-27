# Expected Agent Brief From The Assignment Email

## Research Objective

Build a school-year panel for 2019-2024. The panel should identify which schools received school lunch modernization grants, award amounts, yearly meal outcomes, and whether each school clearly led a meal-program modernization effort.

## Inputs

- `data/original/school_lunch_modernization_raw_data.zip`: raw-data ZIP attachment from the PI email.
- `data/original/school_directory.csv`: extracted CSV with canonical school names, aliases, districts, grade spans, enrollment, and yearly meal outcomes.
- `data/original/school_lunch_modernization_grant_awards.csv`: extracted CSV with grant awards by raw school name, award year, project description, and amount.
- `data/original/cafeteria_partner_role_records.csv`: extracted CSV with organization-level cafeteria partner records, role descriptions, and notes.

## Output

The expected analysis-ready file is:

`data/analysis_ready/school_year_panel.csv`

Required columns:

- `school_name`
- `year`
- `district_name`
- `grades_served`
- `urbanicity`
- `enrollment`
- `lunch_participation_rate`
- `healthy_meal_score`
- `ModernizationGrantRecipient`
- `MealProgramLead`
- `ModernizationGrantAmount`

## Proposed Workflow

1. Confirm the raw-data ZIP attachment has been saved in `data/original/`.
2. Unzip the attachment and identify the extracted CSV files.
3. Inspect raw data and identify school and district name variants.
4. Draft a conservative classification rubric for cafeteria partner roles.
5. Use subagent reviewer roles to classify cafeteria partner records.
6. Reconcile reviewer disagreements conservatively and quarantine ambiguous partner roles instead of forcing them into school lead status.
7. Match grant awards and meal-program lead records to the school directory using canonical names and aliases.
8. Build one row per school-year from 2019 through 2024.
9. Write audit files that summarize counts, matching problems, ambiguous rows, reviewer disagreements, and assumptions.

## Human Judgment Points

- Some partner descriptions are ambiguous by design.
- District offices, equipment vendors, meal vendors, produce suppliers, education nonprofits, advisors, and consultants should not be counted as school meal-program leads.
- Alias matching is acceptable for the demo but would need stronger validation before scaling.
- The meal-program lead indicator is cumulative through the panel year.
- Real meal-claim files, procurement records, state grant extracts, and student outcome data would require data-use review and documented merge rules.
