const modules = [
  {
    id: "setup",
    title: "Before Thursday: Setup Checklist",
    step: "Confirm the apps before Thursday",
    tag: "Setup",
    plainIntro: true,
    body: [
      "Please use this checklist before Thursday to confirm that Codex, Claude Code, and Python are ready.",
      "Do not create the workshop project folder yet; we will create it together during the session, then use Codex for the live research workflow."
    ],
    substepTitle: "Before Thursday Checklist",
    checkableSubsteps: true,
    substeps: [
      {
        number: "1.1",
        title: "Confirm Tool Access",
        text: "Make sure Codex and Claude Code open, are signed in, and can respond inside the app.",
        links: [
          { label: "Need access help?", href: "setup/access.html" },
          { label: "Need Codex help?", href: "setup/codex.html" },
          { label: "Need Claude help?", href: "setup/claude-code.html" }
        ]
      },
      {
        number: "1.2",
        title: "Confirm Python Is Installed",
        text: "Confirm Python before the workshop so Codex can run scripts, build data files, and create figures during the live workflow.",
        links: [{ label: "Need Python help?", href: "setup/python.html" }]
      },
      {
        number: "1.3",
        title: "Ask Codex To Test Python",
        text: "Open Codex and ask it to verify that Python works. Codex can run the technical check, show the terminal result inside the app, and report the outcome; you do not need to type command-line checks yourself.",
        links: [{ label: "Need Python help?", href: "setup/python.html" }],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Please check whether Python is installed and available to you. If it is available, run a tiny Python script that prints the Python version and confirms that 2 + 2 equals 4. Briefly tell me what command or check you ran and where I can see the result in the Codex app. Do not modify any project files."
          }
        ]
      },
      {
        number: "1.4",
        title: "Wait To Create The Project Folder",
        text: "Do not create the workshop project folder before the live walkthrough. You will create the shared root folder during the workshop.",
        links: [{ label: "Need folder help?", href: "setup/no-project-folder.html" }]
      }
    ],
    commands: [],
    prompts: []
  },
  {
    id: "handoff",
    title: "From PI Email To Project Memory",
    step: "Save the source materials and set up project memory",
    tag: "Start",
    plainIntro: true,
    body: [
      "Start with a clean outer workspace. The PI email and raw ZIP are the source materials; the dedicated project folder and memory files come next.",
      "Do not ask the agent to solve the whole project at once. First preserve the source materials, create the project structure, summarize the assignment, and create project memory before moving to data work."
    ],
    substepTitle: "Module 2 Steps",
    substeps: [
      {
        number: "2.1",
        title: "Create And Open My_RA_Tasks",
        text: "Create a new folder named My_RA_Tasks somewhere sensible in your home folder. Then open Codex, create a new project from an existing folder, and select My_RA_Tasks.",
        materials: [
          { label: "Why this matters", text: "My_RA_Tasks is the outer workspace for this workshop. It will contain the actual school_lunch_modernization_grants project folder." }
        ],
        image: {
          src: "assets/codex-open-existing-folder.svg?v=20260527-school-lunch",
          alt: "Annotated guide image showing the Codex existing-folder project flow and the My_RA_Tasks folder selection.",
          caption: "Follow the existing-folder path, then choose the My_RA_Tasks folder you created."
        }
      },
      {
        number: "2.2",
        title: "You've Got Mail! PI Email And Source Materials",
        text: "With My_RA_Tasks open in Codex, review the PI email and download both files. If your browser asks where to save them, choose My_RA_Tasks for now. The guide page is only the delivery mechanism; once saved, the email PDF and raw ZIP become the project source materials.",
        contextBlocks: [
          {
            type: "figure",
            src: "assets/generated/pi-mission-email.png?v=20260527-pi-mission",
            alt: "Illustration of a laptop inbox with a PI assignment email, a project folder, and school lunch source materials."
          },
          {
            type: "collapsible",
            label: "Open PI Email And Download Files",
            blocks: [
              {
                type: "email",
                from: "The Hon. Dr. Sir Jensen Ahokovi, PhD, MA, BA.",
                to: "STAX Predoc Team",
                subject: "Possible new project on school lunch modernization grants",
                date: "Monday, March 4, 2024 at 8:17 AM",
                attachment: "school_lunch_modernization_raw_data.zip",
                paragraphs: [
                  "Hi team,",
                  "I have a possible new project that I would like to explore. The state has been giving small modernization grants to schools for cafeteria equipment, kitchen upgrades, and healthier meal infrastructure, but I do not yet have a clean sense of which schools received what.",
                  "The broad question is whether we can turn these grant records into an auditable school-year panel. My intuition is that better kitchens, cooler storage, salad bars, and serving-line upgrades may show up in meal participation or healthier menu measures, but I do not know what the raw files will support.",
                  "I attached the raw materials I have so far. They are not cleaned or documented beyond what is in the files, so please treat this as exploratory. I expect school and district names, grant records, equipment descriptions, cafeteria partner role labels, and school-name crosswalks to need some judgment before we can say anything confidently.",
                  "Could you take a first pass and see whether it is possible to turn this into a school-year file for 2019-2024? I would like something that shows, for each school and year, whether the school received a modernization grant, roughly how much it received, what its lunch participation and healthy-meal measures look like, and whether it appears to have led a meal-program modernization effort.",
                  "Please do not worry about making this perfect on the first pass. I care more about a transparent, auditable workflow: what files are there, how names were matched, which role labels were counted as school meal-program leads, what looked ambiguous, and what should be checked before I rely on the results.",
                  "If an organization's role sounds like a district office, equipment vendor, food supplier, consultant, nutrition education group, or just a vague strategic partner, please flag it instead of automatically treating it as a school lead. A conservative first pass with clear caveats would be more useful than a polished file that hides the hard calls.",
                  "Thanks,",
                  "The Hon. Dr. Sir Jensen Ahokovi, PhD, MA, BA."
                ]
              },
              {
                type: "downloadCards",
                title: "Files To Download Now",
                cards: [
                  {
                    label: "PI assignment email",
                    text: "Download this PDF now. You will move it into school_lunch_modernization_grants/docs/ once the project folder exists.",
                    href: "assets/generated/pi_assignment_email.pdf?v=20260528-survey-flow",
                    download: "pi_assignment_email.pdf",
                    action: "Download email PDF"
                  },
                  {
                    label: "Raw data ZIP",
                    text: "Download this unchanged ZIP now. You will move it into school_lunch_modernization_grants/data/original/ once the project folder exists.",
                    href: "attachments/school_lunch_modernization_raw_data.zip?v=20260528-survey-flow",
                    download: "school_lunch_modernization_raw_data.zip",
                    action: "Download data ZIP"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        number: "2.3",
        title: "Create The Project Folder",
        text: "Set up a task-specific project subdirectory inside My_RA_Tasks. Ask Codex to briefly explain the file layout, create only the folders for the research project, then stop.",
        contextBlocks: [
          {
            type: "miniTable",
            title: "Folder Map",
            columns: ["Place", "Path", "What it means"],
            rows: [
              ["Outer workspace", "My_RA_Tasks/", "The folder Codex opens first so it can create the project folder."],
              ["Project root", "My_RA_Tasks/school_lunch_modernization_grants/", "The actual research project folder."],
              ["After reopening", "docs/", "A project-relative path, meaning school_lunch_modernization_grants/docs/."]
            ]
          }
        ],
        materials: [
          { label: "General project habit", text: "Separating notes, raw data, cleaned data, scripts, audit trails, and final outputs is useful on almost any research project, with or without agentic AI." }
        ],
        prompts: [
          {
            label: "Set up project folder",
            text: "First report the active workspace root. It should be My_RA_Tasks. If it is not, stop and tell me what folder is currently open.\n\nBriefly explain where the saved PI email, raw ZIP, handoff summary, scripts, audit notes, analysis-ready data, and final outputs should live in this project structure.\n\nThen create a dedicated research project folder inside the current workspace named school_lunch_modernization_grants. Set up these folders:\n\n- docs/ for assignment notes, rubrics, and handoff summaries\n- data/original/ for unchanged files downloaded from the assignment materials\n- data/analysis_ready/ for cleaned CSVs that are ready to use in analysis\n- scripts/ for Python code that Codex writes or runs\n- audit_notes/ for notes explaining checks, assumptions, and judgment calls\n- final_outputs/ for final tables, figures, or exports\n\nAdd .gitkeep placeholder files in empty data, audit_notes, and final_outputs folders if needed.\n\nStop after creating the folders. Do not inspect data, unzip files, classify rows, write analysis code, or build the panel. When done, list the created paths and remind me to reopen school_lunch_modernization_grants as the active Codex project root."
          }
        ]
      },
      {
        number: "2.4",
        title: "Reopen The Project Folder",
        text: "Open a new or current Codex project from the existing folder school_lunch_modernization_grants. From this point on, paths like docs/ and data/original/ should refer to the research project, not My_RA_Tasks.",
        materials: [
          { label: "Check before continuing", text: "The folder shown in Codex should be school_lunch_modernization_grants. My_RA_Tasks is only the outer workspace." }
        ]
      },
      {
        number: "2.5",
        title: "Move Source Materials Into The Project",
        text: "Move or save the downloaded email PDF into docs/ and the raw-data ZIP into data/original/. Leave the ZIP unchanged and note the exact email filename so you can reference it in Codex with @.",
        materials: [
          { label: "Email destination", text: "school_lunch_modernization_grants/docs/pi_assignment_email.pdf" },
          { label: "ZIP destination", text: "school_lunch_modernization_grants/data/original/school_lunch_modernization_raw_data.zip" }
        ]
      },
      {
        number: "2.6",
        title: "Summarize The PI Request",
        text: "Ask Codex to read the saved PI email and create a concise handoff summary before coding begins. The prompt uses the workshop filename; if your saved email has a different name, use @ to select your actual file before sending.",
        materials: [
          { label: "Input email", text: "@docs/pi_assignment_email.pdf, or your actual saved assignment email file selected with @" },
          { label: "Output file", text: "docs/email_handoff_summary.md" }
        ],
        prompts: [
          {
            label: "Summarize the PI email",
            text: "Use the saved PI assignment email as the source of truth for this project.\n\nAssignment email: @docs/pi_assignment_email.pdf\n\nRead the saved email artifact and create docs/email_handoff_summary.md. Include the sender, subject, PI request, research objective, outcome domains the PI mentions, required inputs, expected deliverables, action items, open questions, assumptions, and judgment calls.\n\nIf the email is missing or unreadable, stop and tell me. Do not inspect or unzip the raw data yet."
          }
        ]
      },
      {
        number: "2.7",
        title: "Create Project Memory Files",
        text: "With the source email and handoff summary inside the project, ask Codex to create the README and agent-instruction files that will anchor future turns. These files are project memory, not analysis output.",
        materials: [
          { label: "Input context", text: "@docs/pi_assignment_email.pdf plus docs/email_handoff_summary.md" },
          { label: "Guide files", text: "README.md, AGENTS.md for Codex, and CLAUDE.md for Claude Code" }
        ],
        prompts: [
          {
            label: "Create project memory files",
            text: "Read @docs/pi_assignment_email.pdf and docs/email_handoff_summary.md. Treat the saved PI email as the source of truth. If the handoff summary conflicts with the email, trust the email and note the mismatch.\n\nWorking in the current project root, create README.md, AGENTS.md, and CLAUDE.md.\n\nREADME.md should briefly summarize the research objective, expected original inputs, expected analysis-ready output, and the rule that audit notes are part of the deliverable. Include the PI's interest in meal participation and healthy-meal measures if the raw files support them.\n\nAGENTS.md and CLAUDE.md should tell coding agents to read the email and handoff before coding, preserve raw inputs, inspect before building outputs, keep work auditable, and ask before treating ambiguous cafeteria partner roles as confirmed school leads.\n\nKeep the files concise. Do not inspect or unzip the raw data yet."
          }
        ]
      }
    ],
    commandTitle: "Do In The Apps",
    commands: [],
    prompts: [],
    recap: [
      "You began by preserving the original assignment materials before asking Codex to do any data work. The PI email and raw-data ZIP moved from loose downloads into a dedicated research project folder, so the project now has a clear source of truth and a stable place for future outputs.",
      "That mattered because the task is exploratory and judgment-heavy. Before inspecting data, the project needed a clean boundary between unchanged inputs, notes, scripts, audit files, analysis-ready data, and final deliverables.",
      "Codex also created the first layer of project memory: the email handoff summary, README, and agent instruction files. Those files make the PI request durable, remind future coding turns to preserve raw inputs, and keep ambiguous cafeteria-partner roles from being silently treated as confirmed school leads.",
      "The project is now initialized. The source email is in docs/, the raw ZIP is unchanged in data/original/, and the project has enough memory for raw-data inspection to begin without losing the original assignment context."
    ],
    checks: [
      "My_RA_Tasks has been created in a sensible place in your home folder.",
      "Codex is open with My_RA_Tasks selected long enough to scaffold the nested project folder.",
      "The PI assignment email PDF and raw-data ZIP have been downloaded.",
      "Codex has created the dedicated school_lunch_modernization_grants project folder.",
      "Codex is now open with school_lunch_modernization_grants selected as the active project root.",
      "The assignment email PDF has been saved into docs/.",
      "The raw-data ZIP has been saved unchanged into data/original/.",
      "docs/email_handoff_summary.md exists and summarizes the PI request.",
      "README.md, AGENTS.md, and CLAUDE.md exist as project memory files."
    ]
  },
  {
    id: "raw-data",
    title: "Inspect Raw Data Before Classification",
    step: "Find the evidence before making categories",
    tag: "Data",
    body: [
      "At this point, the PI email, raw-data ZIP, and project memory are saved in the project. Now open the ZIP and make the raw evidence legible before asking anyone to classify rows or build the panel.",
      "This pass leaves behind one working note: a compact data-intake and role-rubric file. It should explain the raw files, the matching risks, and the conservative role categories without creating cleaned data, row-level classifications, code, or the school-year panel."
    ],
    substepTitle: "Module 3 Steps",
    substeps: [
      {
        number: "3.1",
        title: "Create The Data Intake And Role Rubric",
        text: "Use the raw ZIP at data/original/school_lunch_modernization_raw_data.zip. This pass should make the files understandable and turn the messy cafeteria-partner evidence into conservative classification rules.",
        materials: [
          { label: "Output file", text: "docs/data_intake_and_role_rubric.md" }
        ],
        prompts: [
          {
            label: "Data Intake And Rubric",
            text: "Inspect the raw-data ZIP at data/original/school_lunch_modernization_raw_data.zip.\n\nExtract it into data/original/ while preserving the ZIP. Then create docs/data_intake_and_role_rubric.md.\n\nThe note should summarize:\n\n- which CSV files are present and their row counts\n- what each CSV appears to contain and its likely unit of observation\n- likely keys and relationships between files\n- how established_school_crosswalk.csv maps raw school names to canonical school_id values\n- school or district aliases that could affect matching\n- cafeteria partner-role cases that may need human judgment\n\nIn the same note, define these allowed role_category values and the evidence required for each:\n\n- school_meal_program_lead\n- district_or_state_office\n- equipment_or_installation_vendor\n- food_supplier_or_menu_vendor\n- nutrition_education_partner\n- advisor_or_consultant\n- ambiguous\n\nFor each category, explain what evidence supports it, what evidence rules it out, and when a row should stay ambiguous. Be conservative: unclear, vague, prospective, undocumented, or only possibly implementation-related roles should remain ambiguous.\n\nDo not classify rows, create cleaned data, write code, or build the panel yet."
          }
        ]
      }
    ],
    commandTitle: "Ask The Agent To Inspect",
    commands: [],
    prompts: [],
    recap: [
      "You opened the raw data carefully before making any classifications or merges. The ZIP was extracted while preserving the original archive, and the data-intake note made the CSVs legible: what files exist, how many rows they contain, what each file appears to measure, and where joins or name matching may become fragile.",
      "That mattered because the PI's question depends on judgment calls, not just clean merges. School names, district aliases, partner roles, and cafeteria-related descriptions all needed to be understood before any row could be safely turned into an analysis variable.",
      "The role rubric in the same note turned that raw evidence into conservative rules. It separated confirmed school meal-program leadership from district offices, vendors, suppliers, advisors, nutrition education partners, and ambiguous cases, so uncertainty remains visible instead of being hidden inside a binary indicator.",
      "The project is now ready for row-level role classification, but it has not yet produced the classification CSV, analysis-ready data, or the school-year panel. The useful state is one compact working note that explains the raw files, matching risks, category rules, and ambiguity triggers."
    ],
    checks: [
      "docs/data_intake_and_role_rubric.md identifies files, row counts, likely join keys, crosswalk support, aliases, messy role labels, and rows needing review.",
      "docs/data_intake_and_role_rubric.md defines allowed role categories with examples and ambiguity triggers.",
      "This pass has not produced a row-level classification CSV, analysis code, or school-year panel."
    ]
  },
  {
    id: "classification",
    title: "Reviewer-Style Cafeteria Partner Classification",
    step: "Use reviewer roles for judgment-heavy rows",
    tag: "Rules",
    body: [
      "Use separate reviewer passes instead of a keyword-rule script. Codex will look at the same rows from different angles, then reconcile the results into one auditable classification table.",
      "The output is still an analysis-ready CSV and an audit file. Ambiguous partner rows stay visible and are not counted as confirmed school meal-program leads."
    ],
    substepTitle: "Module 4 Steps",
    substeps: [
      {
        number: "4.1",
        title: "Classify With Reviewer Perspectives",
        text: "Ask the agent to apply the rubric through separate reviewer perspectives, using Codex subagents if the app offers them, then write one row-level classification CSV and one audit note.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Use docs/data_intake_and_role_rubric.md to classify data/original/cafeteria_partner_role_records.csv.\n\nStart by briefly restating the allowed role_category values and the conservative default rule. Then use reviewer-style passes. If the Codex app offers subagents or delegated reviewers in this session, use separate reviewer agents; otherwise use clearly separated passes in your own work:\n\n- School lead reviewer: identify rows that clearly support school_meal_program_lead and cite exact role or note evidence.\n- Non-lead partner reviewer: identify district offices, equipment vendors, food suppliers or meal vendors, nutrition education partners, and advisors or consultants that should not count as school leads.\n- Ambiguity reviewer: identify rows that should stay ambiguous or need human review, especially strategic partners, possible implementation partners, prospective kitchen partners, and roles without documented scope.\n- Reconciliation lead: choose the conservative classification when reviewers disagree and explain why.\n\nIn your final chat response, tell me whether you used Codex subagents or internal reviewer passes.\n\nCreate data/analysis_ready/cafeteria_partner_role_classifications.csv with one row for every row in data/original/cafeteria_partner_role_records.csv. Include these columns: record_id, record_year, project_title, organization_name, organization_role_raw, organization_note, role_category, classification_reason. Use only these role_category values: school_meal_program_lead, district_or_state_office, equipment_or_installation_vendor, food_supplier_or_menu_vendor, nutrition_education_partner, advisor_or_consultant, ambiguous.\n\nAlso create audit_notes/cafeteria_partner_role_classification_audit.md. The audit should summarize the reviewer perspectives, classification counts, rows marked ambiguous, any disagreements or conservative calls, rows that need PI review, and verification that every original record_id is present exactly once.\n\nDo not write a Python classification script for this step. If you create temporary reviewer notes, fold the useful substance into the audit instead of leaving extra learner-facing files."
          }
        ]
      },
      {
        number: "4.2",
        title: "Review The Audit",
        text: "Make the human judgment points explicit before moving on to the panel builder.",
        prompts: [
          { label: "Prompt to copy", text: "Read audit_notes/cafeteria_partner_role_classification_audit.md and data/analysis_ready/cafeteria_partner_role_classifications.csv. Summarize which rows were classified as confirmed school meal-program leads, which rows were marked ambiguous, and which judgment calls should be shown to the PI before using the panel." }
        ]
      }
    ],
    commandTitle: "Ask The Agent To Coordinate",
    commands: [],
    prompts: [],
    recap: [
      "You used the intake-and-rubric note to classify cafeteria partner records through separate reviewer perspectives. Instead of relying on a simple keyword script, the workflow asked for evidence from school-lead, non-lead, and ambiguity reviews before reconciling the final categories.",
      "That mattered because the role labels are exactly where the PI warned the project could go wrong. A vendor, district office, strategic partner, or consultant can sound relevant to modernization without being evidence that a school led a meal-program effort.",
      "The reconciled output created one classification row for every original partner-role record, with a reason attached to each category. Ambiguous rows stayed ambiguous, reviewer disagreements were summarized, and cases needing PI review were written into the audit instead of being buried.",
      "The project now has an analysis-ready role classification file and a PI-readable audit trail. It is ready for the panel build, with the important caveat that MealProgramLead should use only confirmed school meal-program lead rows and continue excluding ambiguous or non-lead categories."
    ],
    checks: [
      "Reviewer roles are visible before classification.",
      "The analysis-ready classification CSV has one row per original role row.",
      "Ambiguous rows are not silently forced into school lead status.",
      "The audit trail records reviewer disagreements and human-review rows."
    ]
  },
  {
    id: "panel",
    title: "Build A School-Year Panel",
    step: "Combine the directory, crosswalk, awards, and role classifications",
    tag: "Panel",
    body: [
      "The panel build turns the school directory, established-school crosswalk, modernization grant awards, and role classifications into one row per school-year for each school from 2019 through 2024.",
      "The build should make the research rules inspectable: name matching across sources, grant amount and recipient timing, cumulative `MealProgramLead` status, and exclusion of ambiguous or non-lead partner rows."
    ],
    substepTitle: "Panel Build Steps",
    substeps: [
      {
        number: "5.1",
        title: "Inspect Inputs And State The Build Rules",
        text: "Before coding, have the agent state the unit, timing, matching, and exclusion rules in chat. The script and audit will preserve those rules; this step should not create another planning document.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Review the panel inputs and prior audit before writing code: data/original/school_directory.csv, data/original/established_school_crosswalk.csv, data/original/school_lunch_modernization_grant_awards.csv, data/analysis_ready/cafeteria_partner_role_classifications.csv, and audit_notes/cafeteria_partner_role_classification_audit.md.\n\nState the build rules in chat. Include:\n\n- unit of observation and expected key columns, including school_id and year\n- years to include: 2019-2024\n- duplicate-school and unmatched-name risks across the directory, crosswalk, grant, and lead-role sources\n- allowed role_category values and which categories are excluded from `MealProgramLead`\n- how `ModernizationGrantRecipient` and `ModernizationGrantAmount` should use award timing\n- how `MealProgramLead` should become cumulative after the first confirmed lead year\n- audit outputs needed for row counts, year coverage, matching, input coverage, exclusions, unmatched names, and human-review caveats\n\nDo not create a separate build-contract markdown file. Do not write or run the script yet. Flag any blocker that would make the build unsafe."
          }
        ]
      },
      {
        number: "5.2",
        title: "Write And Run The Panel Builder",
        text: "Use the stated build rules to create the script first, then run it as a separate turn.",
        sequenceNote: "Send these as two separate Codex messages. First ask Codex to create the script and stop. Then ask Codex to run it and report the resulting panel shape and audit caveats.",
        prompts: [
          {
            label: "Create script prompt",
            text: "Start by briefly restating the build rules. If no blocker remains, create scripts/build_school_year_panel.py, but do not run it yet.\n\nThe script should read the directory, established-school crosswalk, grant awards, and role classification inputs. It should write data/analysis_ready/school_year_panel.csv and audit_notes/build_school_year_panel_audit.md.\n\nThe audit note should report:\n\n- row counts and expected school-year coverage\n- year coverage\n- match summary across school names and aliases\n- variable timing/rules for `ModernizationGrantRecipient`, `ModernizationGrantAmount`, and `MealProgramLead`\n- excluded classification counts\n- unmatched grant names and unmatched lead-role names\n- human-review caveats"
          },
          {
            label: "Run script prompt",
            text: "Run scripts/build_school_year_panel.py.\n\nAfter it runs, report:\n\n- files created or updated\n- panel row count\n- year range\n- whether expected rows equal unique schools x 6 years\n- unmatched grants or lead rows\n- any audit caveats that need human review\n\nIf it fails, explain the error and the smallest input or code issue to inspect next before changing the rules."
          }
        ]
      },
      {
        number: "5.3",
        title: "Inspect Panel, Matches, And Audit Notes",
        text: "Check the final CSV and audit for shape, timing rules, crosswalk matches, exclusions, and records requiring human review. This is a good place to let Codex run small terminal checks against the files it just created.",
        materials: [
          { label: "Output file", text: "data/analysis_ready/school_year_panel.csv" },
          { label: "Audit file", text: "audit_notes/build_school_year_panel_audit.md" }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Inspect data/analysis_ready/school_year_panel.csv and audit_notes/build_school_year_panel_audit.md. Use quick terminal or Python checks where helpful, and summarize the checks you ran.\n\nCheck:\n\n- expected rows = unique schools x 6 years\n- no duplicate school_id/year rows\n- years are exactly 2019-2024\n- school_id remains in the panel for later merges\n- `ModernizationGrantAmount` is 0 when no award occurred\n- `ModernizationGrantRecipient` timing is consistent with the award year and grant amount\n- `MealProgramLead` is cumulative after the first confirmed school-meal lead year\n- ambiguous and non-lead partner rows are excluded from `MealProgramLead`\n- unmatched names and human-review rows are visible in the audit\n\nSummarize any issue that could change downstream analysis."
          }
        ]
      }
    ],
    commandTitle: "Ask The Agent To Build",
    commands: [],
    prompts: [],
    recap: [
      "The directory, established-school crosswalk, grant awards, and cafeteria partner classifications have now been turned into a school-year panel for 2019 through 2024. The project moved from separate source files and judgment notes into one baseline analysis-ready dataset with explicit rules for timing, matching, and exclusions.",
      "That mattered because the panel is only useful if its construction is auditable. Grant receipt and grant amount had to follow award timing, MealProgramLead had to become cumulative only after confirmed school lead evidence, `school_id` had to remain available for later merges, and ambiguous or non-lead partner rows had to stay out of the lead variable.",
      "The project should now contain data/analysis_ready/school_year_panel.csv and audit_notes/build_school_year_panel_audit.md. The audit should make the row count, year coverage, duplicate checks, unmatched names, excluded classifications, and human-review caveats visible before any analysis begins."
    ],
    checks: [
      "The chat summary, script, and audit name the unit, keys, years, timing rules, crosswalk rules, exclusions, matching risks, and audit outputs.",
      "Panel has one row per school-year, with expected rows equal to unique schools x 6 years.",
      "No duplicate school-year rows appear, and years are exactly 2019-2024.",
      "Grant amount and recipient variables follow award timing, with zero amounts when no award occurred.",
      "`MealProgramLead` is cumulative and excludes ambiguous or non-lead categories.",
      "`school_id` remains in the panel for later source merges.",
      "The audit reports match summaries, excluded counts, unmatched names, and human-review caveats."
    ]
  },
  {
    id: "audits",
    title: "Prepare The PI Handoff",
    step: "Turn the completed panel into a PI-facing research update",
    tag: "Review",
    body: [
      "The panel is built, but the research task is not finished until the uncertainty is readable.",
      "Use the final CSV and audit notes to explain what is ready, what still needs human review, and what the PI should know before using the panel for analysis."
    ],
    substepTitle: "PI Handoff Steps",
    substeps: [
      {
        number: "6.1",
        title: "Review What The Panel Can Support",
        text: "Read the panel and audit notes, then summarize what the constructed data can and cannot support.",
        materials: [
          { label: "Output file", text: "final_outputs/school_lunch_panel_review.md" }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Read data/analysis_ready/school_year_panel.csv, audit_notes/cafeteria_partner_role_classification_audit.md, and audit_notes/build_school_year_panel_audit.md.\n\nCreate final_outputs/school_lunch_panel_review.md.\n\nSummarize:\n\n- panel coverage, years, and unit of observation\n- key variables and how they were constructed\n- meal participation and healthy-meal variables available for a first pass\n- unmatched names, ambiguous classifications, missing or unmatched records, and human-review cases\n- what the panel is ready to support\n- what should not be treated as settled yet\n\nDo not run regressions or create new variables."
          }
        ]
      },
      {
        number: "6.2",
        title: "Draft The PI Update",
        text: "Turn the review notes into a short PI-facing update with caveats and next steps.",
        materials: [
          { label: "Output file", text: "final_outputs/school_lunch_panel_pi_update.md" }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Using final_outputs/school_lunch_panel_review.md and the audit notes, create final_outputs/school_lunch_panel_pi_update.md.\n\nWrite a concise update to the PI. Include:\n\n- what is complete\n- which files were created\n- what the panel can be used for, including meal participation and healthy-meal checks\n- the most important caveats\n- which cases need PI or human review\n- recommended next analysis steps\n\nKeep the tone practical and PI-facing. Do not overstate the data quality or causal meaning of the panel."
          }
        ]
      }
    ],
    recap: [
      "The completed panel has been translated back into research language. Instead of ending with a CSV, the project now has a review memo and a PI-facing update that explain what was built, what the variables mean, which meal and healthy-meal variables are available, and which caveats still matter.",
      "That mattered because the PI needs to know what the data can support before using it. Ambiguous role classifications, unmatched names, and human-review cases are not side issues; they shape whether the panel is ready for a first analysis pass or still needs cleaning.",
      "The project should now have final_outputs/school_lunch_panel_review.md and final_outputs/school_lunch_panel_pi_update.md. The panel is in a handoff-ready state, with the usable outputs named clearly and the unresolved judgment calls kept visible."
    ],
    checks: [
      "The PI handoff explains what is complete.",
      "The update names the panel and audit files.",
      "Ambiguous roles, unmatched names, and human-review cases remain visible.",
      "The update says whether the panel is ready for a first analysis pass.",
      "The update does not treat unresolved judgment calls as settled facts."
    ]
  },
  {
    id: "causal-analysis",
    title: "Causal Design And Econometric Spec Lab",
    step: "Turn the PI question into coded specifications",
    tag: "Analysis",
    body: [
      "Suppose your PI has written again: the panel is ready, and a 2022 scoring change may have given more priority to applications for scratch-cooking equipment, cold storage, and healthier serving-line infrastructure. This module turns that loose question into candidate causal designs, econometric specifications, runnable code, estimates, and a cautious interpretation.",
      "The follow-up also brings a new school-year survey extract with aggregate health and wellbeing measures. Treat it as a new source file, but keep the workflow lean: merge and check it, then let Codex reason through feasible specifications in chat before writing the analysis script."
    ],
    contextTitle: "New PI Follow-Up Email",
    contextBlocks: [
      {
        type: "figure",
        src: "assets/generated/pi-followup-another-email.png?v=20260527-another-email",
        alt: "Illustration of a laptop inbox with a second PI email notification and the words Another email."
      },
      {
        type: "collapsible",
        label: "Open Follow-Up Email",
        blocks: [
          {
            type: "email",
            from: "The Hon. Dr. Sir Jensen Ahokovi, PhD, MA, BA.",
            to: "STAX Predoc Team",
            subject: "Follow-up on the 2022 school lunch grant scoring change",
            date: "Thursday, March 14, 2024 at 3:42 PM",
            attachment: "student_health_wellbeing_survey_extract.csv",
            paragraphs: [
              "Hi team,",
              "Thanks for putting together the school-year panel and the notes. This is very helpful, and I think it may be enough for a more serious specification pass.",
              "One more thing: I confirmed that the state changed the modernization grant scoring in 2022. After the change, applications tied to scratch-cooking equipment, cold storage, and healthier serving-line infrastructure appear to have received a clearer priority. That may give us a useful timing change to explore, though I do not want to assume it is a clean policy break without checking the panel.",
              "I also attached a school-year survey extract with aggregate student health and wellbeing measures. Please merge it carefully before using those variables. If the scoring change mattered in practice, I would expect to see something like more schools receiving grants, larger grant amounts, or improvements in lunch participation, healthy-meal scores, and aggregate student health or wellbeing measures after 2022.",
              "Please be cautious with the wellbeing and mental-health-related measures. A referral rate could reflect need, detection, service access, or reporting practice, so treat those checks as exploratory survey signals rather than proof of a mental-health effect.",
              "Could you use your judgment to propose the best feasible comparisons and code them up? I would like to see which specifications are only descriptive, which are exploratory, and whether anything like a fixed-effects, event-study, or dose-response check is credible enough to inspect.",
              "I mostly want to know whether there is anything promising here, what the estimates look like under those specifications, and what we would need to check before taking any result seriously.",
              "Thanks,",
              "The Hon. Dr. Sir Jensen Ahokovi, PhD, MA, BA."
            ]
          },
          {
            type: "downloadCards",
            title: "Files To Download Now",
            cards: [
              {
                label: "PI follow-up email",
                text: "Download this PDF now. You will move it into school_lunch_modernization_grants/docs/ as the source of truth for the econometric spec lab.",
                href: "assets/generated/pi_followup_2022_scoring_change_email.pdf?v=20260528-survey-flow",
                download: "pi_followup_2022_scoring_change_email.pdf",
                action: "Download email PDF"
              },
              {
                label: "Student survey extract",
                text: "Download this CSV now. You will move it into school_lunch_modernization_grants/data/original/ before creating the expanded analysis panel.",
                href: "attachments/student_health_wellbeing_survey_extract.csv?v=20260528-survey-flow",
                download: "student_health_wellbeing_survey_extract.csv",
                action: "Download survey CSV"
              }
            ]
          }
        ]
      }
    ],
    substepTitle: "Causal Spec Lab Steps",
    substeps: [
      {
        number: "7.1",
        title: "Prepare The Expanded Panel",
        text: "Download the follow-up email PDF and survey CSV, then ask Codex to merge the survey extract into the existing school-year panel with row-count and key checks. Keep the merge summary in chat rather than creating another memo.",
        materials: [
          { label: "Email file", text: "pi_followup_2022_scoring_change_email.pdf" },
          { label: "Survey file", text: "student_health_wellbeing_survey_extract.csv" },
          { label: "Output file", text: "data/analysis_ready/school_year_panel_with_survey.csv" }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "My PI sent a follow-up request about the 2022 school lunch grant scoring change.\n\nFollow-up request: @docs/pi_followup_2022_scoring_change_email.pdf\nSurvey extract: data/original/student_health_wellbeing_survey_extract.csv\nBaseline panel: data/analysis_ready/school_year_panel.csv\n\nRead the follow-up request as the source of truth. Then inspect and merge the survey extract into the baseline panel by school_id and year.\n\nCreate only this output file:\n\n- data/analysis_ready/school_year_panel_with_survey.csv\n\nMerge rules:\n\n- preserve the baseline panel row count and school-year universe\n- verify school_id/year keys are unique before merging\n- report in chat the survey row count, matched rows, unmatched survey rows, panel rows without survey data, duplicate-key checks, and missingness for student_health_index, student_wellbeing_score, mental_health_referral_rate, and survey_response_count\n- treat mental_health_referral_rate as service contacts per 100 students, not diagnoses\n\nDo not create a handoff summary, inspection memo, design memo, audit note, review memo, or PI update in this step."
          }
        ]
      },
      {
        number: "7.2",
        title: "Have Codex Propose Candidate Designs",
        text: "Use Codex as an applied econometrics partner. Ask it to inspect the expanded panel and explain which specifications are feasible, which are merely descriptive, and which assumptions would be needed for a causal interpretation.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Act as an applied econometrician and coding partner.\n\nInspect these files:\n\n- @docs/pi_followup_2022_scoring_change_email.pdf\n- data/analysis_ready/school_year_panel_with_survey.csv\n- audit_notes/cafeteria_partner_role_classification_audit.md\n- audit_notes/build_school_year_panel_audit.md\n\nIn chat only, propose a compact econometric specification plan for the 2022 scoring-change question.\n\nFor each candidate design, include:\n\n- estimand\n- equation or regression formula\n- outcome variables\n- treatment, exposure, or event-time definition\n- comparison group\n- required assumptions\n- whether the design is descriptive, exploratory, or plausibly causal\n- what would make the estimate misleading\n\nInclude at least these candidates when feasible:\n\n1. pre/post checks for grant receipt and grant amount\n2. differential-exposure DiD with school and year fixed effects\n3. event-study style checks around first grant award year\n4. exploratory dose-response checks using grant amount\n\nBe explicit that a statewide post-2022 indicator alone is not a clean causal design. Treat student wellbeing and mental-health referral measures cautiously. Do not create any files yet."
          }
        ]
      },
      {
        number: "7.3",
        title: "Code And Run The Spec Lab",
        text: "Ask Codex to turn the design plan into a readable script that creates the variables, runs the feasible specifications, saves estimate tables, and draws one event-study style figure.",
        materials: [
          { label: "Script", text: "scripts/run_causal_spec_lab.py" },
          { label: "Spec catalog", text: "final_outputs/causal_spec_catalog.csv" },
          { label: "Estimates", text: "final_outputs/causal_spec_estimates.csv" },
          { label: "Figure", text: "final_outputs/causal_event_study.svg" },
          { label: "Draft brief", text: "final_outputs/causal_results_brief.md" }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Using the econometric specification plan from the previous chat turn, create and run scripts/run_causal_spec_lab.py.\n\nThe script should load data/analysis_ready/school_year_panel_with_survey.csv, validate the panel keys, construct needed variables, run all feasible specifications, and write:\n\n- final_outputs/causal_spec_catalog.csv\n- final_outputs/causal_spec_estimates.csv\n- final_outputs/causal_event_study.svg\n- final_outputs/causal_results_brief.md\n\nInclude at least:\n\n1. pre/post checks for ModernizationGrantRecipient and ModernizationGrantAmount\n2. differential-exposure DiD with school and year fixed effects when feasible\n3. event-study style checks around first grant award year\n4. exploratory dose-response checks using ModernizationGrantAmount\n\nOutcome candidates should include lunch_participation_rate, healthy_meal_score, student_health_index, student_wellbeing_score, and mental_health_referral_rate when available.\n\nImplementation rules:\n\n- install any Python libraries needed to run the econometric specifications and plot cleanly, using the active project environment rather than system-level installs\n- keep the code beginner-readable, with formulas and variable definitions visible\n- if a model cannot be estimated cleanly, write a row in the spec catalog explaining why\n- label each specification as descriptive, exploratory, or plausibly causal only under stated assumptions\n- treat mental_health_referral_rate as an exploratory service-contact measure, not a diagnosis or proof of mental-health effects\n- keep final_outputs/causal_results_brief.md concise and PI-facing\n- do not create intermediate design, inspection, audit, or review markdown files\n\nAfter running the script, open final_outputs/causal_event_study.svg in the Codex in-app browser or another available local preview. Report in chat which outputs were created, which specifications ran, which packages were installed if any, which specifications were skipped, and whether the figure rendered cleanly."
          }
        ]
      },
      {
        number: "7.4",
        title: "Review The One PI-Facing Results Brief",
        text: "End by reviewing the single brief the spec runner produced, tightening language where needed without creating another memo.",
        materials: [{ label: "Output file", text: "final_outputs/causal_results_brief.md" }],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Review final_outputs/causal_results_brief.md against these causal spec lab outputs:\n\n- final_outputs/causal_spec_catalog.csv\n- final_outputs/causal_spec_estimates.csv\n- final_outputs/causal_event_study.svg\n\nRevise final_outputs/causal_results_brief.md only if needed.\n\nThe brief should be concise and PI-facing. It should include:\n\n- the follow-up question about the 2022 scoring change\n- what data were added by the survey merge\n- the specifications Codex ran, in plain English\n- what the estimates and event-study figure suggest for grants, meal outcomes, health, wellbeing, and mental-health referral measures\n- which results are descriptive or exploratory rather than causal\n- why a statewide 2022 change is not automatically a clean causal design\n- what a human researcher should verify next before sharing or extending the analysis\n\nDo not create separate review, audit, or design markdown files. Do not describe the results as proof that the scoring change caused the observed patterns."
          }
        ]
      }
    ],
    commandTitle: "Ask The Agent To Analyze",
    commands: [],
    prompts: [],
    recap: [
      "The PI's follow-up request added two things to the project: a question about the 2022 grant scoring change and a new aggregate student survey extract. The workflow kept the new-source checks visible, but moved quickly into the econometric work: what can be estimated, what assumptions would be needed, and what code produces the first evidence.",
      "That mattered because the strongest live demo is not another planning memo. Codex can inspect a panel, reject over-simple causal claims, propose candidate designs with equations, implement the feasible specifications, and leave behind reusable code plus estimate tables.",
      "The 2022 change is suggestive, not automatically causal. A statewide post indicator is descriptive unless there is credible differential exposure, timing, or comparison structure. Wellbeing and mental-health-related measures remain exploratory school-level survey signals.",
      "The project should now contain an expanded panel, a causal spec runner, a specification catalog, an estimates table, an event-study style SVG, and one PI-facing results brief. The brief separates promising patterns from causal claims and names what a human researcher should check next."
    ],
    checks: [
      "The follow-up email PDF has been saved into docs/ and can be referenced with @.",
      "The student survey extract has been saved into data/original/.",
      "The survey extract was merged without changing the baseline panel row count.",
      "Codex explained candidate specifications, equations, assumptions, and causal limits in chat before writing code.",
      "The spec runner produced a specification catalog, estimates table, and event-study style SVG.",
      "Skipped or fragile specifications are named in the catalog rather than hidden.",
      "The generated SVG plot was opened in the Codex in-app browser or local preview tool and checked for readability.",
      "The single PI-facing brief separates exploratory findings from causal claims and treats wellbeing measures cautiously.",
      "The causal spec lab avoids creating extra design, inspection, audit, and review markdown files."
    ]
  },
  {
    id: "visualizations",
    title: "Create Publication-Style Visualizations",
    step: "One-shot complex plot variants, then revise them visually",
    tag: "Visuals",
    body: [
      "After the causal spec lab exists, use Codex for a different kind of work: turning the same analysis-ready data, estimates, and causal caveats into polished, reusable visualization code.",
      "The point is not to make a final journal figure in one try. The point is to show that specific visualization prompts can get you a serious first draft: an Economist-inspired editorial chart set, an AER-style research figure set, and a compact policy-brief view that would be tedious to hand-tweak from scratch."
    ],
    substepTitle: "Visualization Prompt Steps",
    substeps: [
      {
        number: "8.1",
        title: "Write A Visualization Brief",
        text: "Ask Codex to inspect the expanded panel and causal spec-lab outputs, then choose the visual stories and style constraints before writing plotting code.",
        materials: [{ label: "Output file", text: "docs/school_lunch_visualization_brief.md" }],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Read data/analysis_ready/school_year_panel_with_survey.csv, final_outputs/causal_spec_catalog.csv, final_outputs/causal_spec_estimates.csv, final_outputs/causal_event_study.svg, and final_outputs/causal_results_brief.md.\n\nCreate docs/school_lunch_visualization_brief.md.\n\nThe brief should propose three reusable visualization variants:\n\n1. An Economist-inspired editorial chart set: annotated, direct-labeled, clear 2022 marker, restrained color accents, source note, and no publication logo or official branding.\n2. An AER-style research figure set: print-friendly, simple panels, clear units, grayscale or restrained color, confidence intervals only when supported by the causal spec estimates, and reproducible labels.\n3. A compact policy-brief dashboard: a small set of linked panels for grants, lunch participation, healthy-meal score, available aggregate health or wellbeing measures, and the main causal caveats.\n\nFor each variant, specify the intended message, required input columns, panel layout, annotations, style constraints, caveats, and output filenames. Do not write plotting code yet."
          }
        ]
      },
      {
        number: "8.2",
        title: "Generate A Visualization Gallery",
        text: "Use a single ambitious prompt to have Codex install useful visualization libraries if needed, write reusable plotting code, produce several SVG drafts, and show the plots as chat artifacts for side-by-side review.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Using docs/school_lunch_visualization_brief.md, create and run scripts/create_school_lunch_visualization_gallery.py.\n\nThe script should use data/analysis_ready/school_year_panel_with_survey.csv and the causal spec lab outputs in final_outputs/ to create a small visualization gallery.\n\nCreate these outputs:\n\n- final_outputs/visualization_gallery/economist_inspired_grant_meals.svg\n- final_outputs/visualization_gallery/aer_style_school_lunch_results.svg\n- final_outputs/visualization_gallery/policy_brief_school_lunch_dashboard.svg\n- final_outputs/visualization_gallery/README.md\n- audit_notes/school_lunch_visualization_gallery_audit.md\n\nVisualization requirements:\n\n- Economist-inspired chart set: editorial title, short subtitle, direct labels where possible, one accent color for the 2022 scoring change, source note, and annotations that explain the visual pattern without overclaiming.\n- AER-style figure set: clean research-paper panels, print-readable labels, minimal gridlines, clear units, and uncertainty intervals only if the causal spec estimates support them.\n- Policy-brief dashboard: compact multi-panel view that connects grants, meal outcomes, survey outcomes, and the identification caveats while keeping mental-health-related measures cautious.\n\nImplementation rules:\n\n- Use pandas and matplotlib, and install any helpful data-visualization libraries that would materially improve the gallery, such as seaborn, plotnine, adjustText, or another lightweight PyPI package.\n- Install packages only into the active project environment. Avoid system-level dependencies and avoid large or unrelated packages.\n- Record any installed packages and why they were useful in the visualization gallery audit.\n- Generate SVG files with readable text, stable figure sizes, and enough margin to avoid clipping.\n- Keep the script readable so a researcher can edit titles, labels, colors, and annotations later.\n- Write the audit note with input files used, output files created, packages used or installed, missing-variable fallbacks, visual design choices, and interpretation caveats.\n\nAfter running the script, show the three SVGs as artifacts or images in the Codex chat so I can view them side by side and use the app's annotation or comment tools. Also open each SVG in the in-app browser or an available local preview tool. Report whether each file rendered and whether any title, label, legend, annotation, or source note looked cramped or clipped."
          }
        ]
      },
      {
        number: "8.3",
        title: "Review And Revise Plot Elements In Codex",
        text: "Keep the plots visible as Codex chat artifacts, review them with the app's annotation tools, then have Codex make the requested plot edits while the artifacts are still fresh.",
        materials: [{ label: "Output file", text: "audit_notes/school_lunch_visualization_review_notes.md" }],
        prompts: [
          {
            label: "Prompt to copy",
            text: "I have reviewed the SVG artifacts in final_outputs/visualization_gallery/ and left comments or annotations on specific plot elements.\n\nUse my comments and the generated SVG files to update scripts/create_school_lunch_visualization_gallery.py, rerun it, and create audit_notes/school_lunch_visualization_review_notes.md.\n\nMake only the plot revisions requested in my comments. Preserve the existing filenames unless my comments explicitly ask for variants.\n\nIn the review notes, summarize changes to:\n\n- title and subtitle\n- axis labels, tick labels, and units\n- legends or direct labels\n- 2022 scoring-change marker\n- annotations and arrows\n- color choices and contrast\n- panel spacing and text clipping\n- source notes and caveats\n- print/readability risks\n\nAfter rerunning, show the revised SVGs as artifacts or images in Codex chat and preview them again in the in-app browser or an available local preview tool. Report whether any text is still cramped or clipped and which visual choices remain subjective. Do not change the underlying analysis or make stronger causal claims."
          }
        ]
      }
    ],
    commandTitle: "Ask The Agent To Visualize",
    prompts: [],
    commands: [],
    recap: [
      "The project now has a visualization layer separate from the causal spec lab. Instead of asking for one basic plot, you asked Codex for reusable plotting code and several deliberately different visual treatments of the same school lunch panel evidence.",
      "That mattered because advanced visualization work is often full of small, manual choices: panel layout, direct labels, annotations, treatment markers, color accents, source notes, and margin fixes. The module shows that those choices can be described in a prompt, generated as code, previewed, and revised.",
      "The key supervision step is visual review inside Codex. Participants should look at the SVGs, annotate exact plot elements, and have Codex revise the reusable plotting script while the visual feedback is still concrete."
    ],
    checks: [
      "docs/school_lunch_visualization_brief.md proposes the visual stories, input columns, layouts, style constraints, and caveats.",
      "scripts/create_school_lunch_visualization_gallery.py creates reusable plotting code.",
      "final_outputs/visualization_gallery/ contains the Economist-inspired, AER-style, and policy-brief SVG drafts.",
      "audit_notes/school_lunch_visualization_review_notes.md records the annotated plot issues and the revisions made.",
      "The revised SVGs were shown as Codex chat artifacts and previewed in the in-app browser or local preview tool before sharing."
    ]
  },
  {
    id: "resources",
    title: "Extra Resources",
    step: "Save for the end",
    tag: "Resources",
    body: [
      "Use this optional section only if there is time after the core research workflow. It collects the Codex skills material and reference links without making skills installation part of the main setup.",
      "The official OpenAI skills catalog includes many skills for deployment, design, GitHub workflows, Notion, security, and media. For this workshop, the suggested optional set is define-goal, openai-docs, pdf, and jupyter-notebook.",
      "If you try the install flow, ask Codex to explain any user-level or Global settings change before it installs anything. Restart Codex before relying on newly installed skills."
    ],
    commandTitle: "Reference Links",
    promptTitle: "Optional Codex Prompts",
    commands: [
      "https://github.com/openai/skills",
      "https://developers.openai.com/codex/skills"
    ],
    prompts: [
      "/skills",
      "Use $skill-installer with https://github.com/openai/skills as the official skills catalog. Install only this optional workshop set if the skills are not already available: define-goal, openai-docs, pdf, and jupyter-notebook. Do not install any other skills. Before changing any user-level or Global Codex settings, explain exactly what you will change and wait for my confirmation. After installation, tell me to restart Codex and show me how to confirm the skills are available.",
      "After I restart Codex, help me confirm that define-goal, openai-docs, pdf, and jupyter-notebook are available. Do not install or remove anything."
    ],
    recap: [
      "The core research workflow is complete before the optional resources section begins. The remaining links and prompts are for continued learning, especially around Codex skills, rather than requirements for finishing the school lunch project.",
      "That mattered because extra tooling should not blur the project record. Optional skill installation can be useful, but it should be explicit, limited to the selected skills, and separated from the analysis workflow that produced the panel and PI updates.",
      "The project state should remain unchanged unless you deliberately install skills. If skills are installed, Codex should explain any user-level or Global settings changes first, install only the selected optional set, and remind you to restart Codex before relying on them."
    ],
    checks: [
      "The selected optional skill names are define-goal, openai-docs, pdf, and jupyter-notebook.",
      "Codex is told not to install any other skills.",
      "Codex explains any user-level or Global settings change before installing skills.",
      "Codex is restarted after any new skill install."
    ]
  }
];

const moduleNarrativeCopy = {
  handoff: "Use this as the intake pass. By the end, the source email, raw ZIP, handoff summary, and project memory files should be in the project root, and raw-data inspection can begin.",
  "raw-data": "Use this as the data intake pass. Open the saved ZIP, inventory the CSVs, identify the crosswalk and likely join keys, and turn the messy role evidence into rules before classification starts.",
  classification: "This is the judgment-heavy part of the workflow. Use the agent to organize independent reviews, cite row-level evidence, and keep uncertain cases out of the analysis variables instead of pretending ambiguity disappeared.",
  panel: "The panel build turns the prior judgment work into an inspectable dataset: one school-year row per school, with matching, timing, exclusions, and caveats documented in the audit.",
  audits: "The PI handoff turns the completed panel back into a research conversation. It should separate usable variables from caveats, name unresolved cases, and make clear which meal-program questions are ready for a first pass.",
  "causal-analysis": "Use this as the econometrics showcase. The follow-up adds a survey source, then Codex proposes causal designs, labels identification strength, codes feasible specifications, and keeps the final writeup lean.",
  visualizations: "This is the visual prompting showcase. Use Codex to generate reusable plotting code for several polished figure styles from the causal spec lab outputs, then review exact plot elements in the app before asking for a focused revision.",
  resources: "This closing module is optional. Use it as a path to keep learning without making skill installation or extra tooling a requirement for the main research workflow."
};

const substepNarrativeCopy = {
  "setup:1.1": "Keep this check deliberately simple: make sure the two coding apps open and respond before you start solving a research problem with them. If access is broken, it is much easier to fix it here than halfway through a data task.",
  "setup:1.2": "Python is the engine underneath the later workshop steps. Codex can write and run friendly scripts, but it needs a working Python installation before it can unzip files, inspect CSVs, regenerate figures, and build the panel.",
  "setup:1.3": "Let Codex do the technical confirmation in plain language. You get a first low-stakes interaction with the app, and the agent reports what it checked without asking you to memorize terminal commands.",
  "setup:1.4": "Wait on the project folder for now. You will create the same outer workspace during the live walkthrough, which keeps path names less mysterious when the agent starts creating files.",
  "handoff:2.1": "Start with a plain outer folder before the source materials enter the workflow. Opening My_RA_Tasks in Codex gives the app a workspace while leaving room for the actual research project folder inside it.",
  "handoff:2.2": "The PI email and raw ZIP are the project evidence. The guide page delivers them, but the saved files become what later agent turns should read and preserve.",
  "handoff:2.3": "This is the first place to combine planning and action. Have the agent explain the folder logic briefly, create the project folder, and stop before it inspects data or starts making research decisions.",
  "handoff:2.4": "Once the project folder exists, switch Codex into it and confirm the folder shown in the app. This small move prevents confusion about whether docs/ and data/original/ refer to the outer workspace or the project.",
  "handoff:2.5": "Now the downloaded materials become part of the project record. Keeping the ZIP unchanged and storing the email in docs/ makes it clear which files are original evidence and which files the agent creates later.",
  "handoff:2.6": "The email handoff summary is the first derived memory file. It asks the agent to translate an informal PI message into action items, open questions, deliverables, and judgment calls before any code exists.",
  "handoff:2.7": "The project memory files give future agent turns stable context. They tell Codex and Claude Code to read the source materials first, inspect before coding, preserve audit notes, and be conservative with ambiguous roles.",
  "raw-data:3.1": "Start with one working note instead of a chain of planning files. It should name the CSVs, row counts, likely keys, crosswalk support, aliases, allowed role categories, and partner-role cases that need judgment.",
  "classification:4.1": "The reviewer perspectives are part of the classification prompt itself. If Codex subagents are available, this is a natural place to use them; otherwise the same logic works as separated passes in one agent turn.",
  "classification:4.2": "Reading the audit before building the panel keeps the human in the loop. It makes clear which rows are safe to use, which rows are excluded, and which calls should go back to the PI.",
  "panel:5.1": "Start by having the agent state the panel rules in chat: unit, keys, years, timing, matching, exclusions, and audit expectations. The script and audit preserve those rules, so this does not need a separate planning file.",
  "panel:5.2": "Create the script from the stated rules, then run it in a separate turn. The important report is not just whether the script finished, but what rows, years, matches, exclusions, and caveats it produced.",
  "panel:5.3": "Inspect the panel like a research artifact. Shape, duplicate keys, timing rules, cumulative lead status, unmatched names, and visible human-review rows all affect whether the dataset is safe to use downstream.",
  "audits:6.1": "Start with what the panel can actually support. The review note should name the constructed variables, available meal outcomes, caveats, unresolved matches, and any human-review cases before anyone writes a PI update.",
  "audits:6.2": "The PI update is the handoff artifact. It should be concise, practical, and honest about what the panel is ready for without treating unresolved judgment calls as settled facts.",
  "causal-analysis:7.1": "Keep the new-source intake lean. The survey merge still checks keys, coverage, missingness, and row counts, but those checks live in chat and the expanded panel rather than another chain of memo files.",
  "causal-analysis:7.2": "This is the research-design pause. Codex should name estimands, equations, comparison groups, assumptions, and identification limits before it touches the script.",
  "causal-analysis:7.3": "The spec runner is the live coding showcase: construct treatment timing, run feasible specifications, write estimate tables, and preview the event-study style figure.",
  "causal-analysis:7.4": "The final brief turns coded results back into PI language. It should separate descriptive patterns, exploratory associations, plausible designs, and assumptions that still need human validation.",
  "visualizations:8.1": "Start by prompting for figure design, not code. The brief should connect available columns and causal spec lab outputs to specific visual stories, layouts, annotations, and caveats.",
  "visualizations:8.2": "This is the one-shot visualization prompt. Ask for multiple polished SVG drafts plus reusable plotting code, with style instructions concrete enough that Codex can make real layout choices.",
  "visualizations:8.3": "The review happens while the plots are visible. Annotate exact plot elements, then let Codex turn those comments into concrete script edits and refreshed artifacts in the same step."
};

modules.forEach((module) => {
  const moduleCopy = moduleNarrativeCopy[module.id];
  if (moduleCopy && !module.body.includes(moduleCopy)) {
    module.body = [module.body[0], moduleCopy, ...module.body.slice(1)];
  }

  (module.substeps || []).forEach((substep) => {
    const key = `${module.id}:${substep.number}`;
    if (substepNarrativeCopy[key]) {
      substep.intro = substepNarrativeCopy[key];
    }
  });
});

const pageParams = new URLSearchParams(window.location.search);
const setupOnlyMode = Boolean(window.STAX_SETUP_ONLY)
  || pageParams.get("mode") === "setup"
  || pageParams.get("setup") === "1";
const visibleModules = setupOnlyMode ? modules.filter((module) => module.id === "setup") : modules;

function getInitialModuleId() {
  const requestedModule = pageParams.get("module");
  if (visibleModules.some((module) => module.id === requestedModule)) return requestedModule;
  return moduleIdFromHash() || visibleModules[0].id;
}

let activeModuleId = getInitialModuleId();
const substepProgressKey = "stax-training-substep-progress-v1";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const inlineCodeRefPattern = /(?:@?(?:[A-Za-z0-9_.-]+\/)+(?:[A-Za-z0-9_.@-]+)?|(?:[A-Za-z0-9_-]+\.)+(?:csv|zip|pdf|md|py|svg|json|html|toml|eml|txt)|\.[A-Za-z][A-Za-z0-9_-]*|\/skills|\$skill-installer|\b(?:My_RA_Tasks|school_lunch_modernization_grants|README\.md|AGENTS\.md|CLAUDE\.md|ModernizationGrantRecipient|ModernizationGrantAmount|MealProgramLead|EverGrantToDate|role_category|school_id|school_name|award_year|record_id|established_school_crosswalk|student_health_index|student_wellbeing_score|mental_health_referral_rate|survey_response_count)\b)/g;

function formatInlineCodeRefs(value) {
  const text = String(value);
  let html = "";
  let lastIndex = 0;

  text.replace(inlineCodeRefPattern, (match, offset) => {
    const trailing = match.match(/[.,;:!?)]*$/)?.[0] || "";
    const core = trailing ? match.slice(0, -trailing.length) : match;

    html += escapeHtml(text.slice(lastIndex, offset));
    html += core
      ? `<code class="code-ref">${escapeHtml(core)}</code>${escapeHtml(trailing)}`
      : escapeHtml(match);
    lastIndex = offset + match.length;
    return match;
  });

  html += escapeHtml(text.slice(lastIndex));
  return html;
}

function loadSubstepProgress() {
  try {
    return JSON.parse(localStorage.getItem(substepProgressKey)) || {};
  } catch {
    return {};
  }
}

function saveSubstepProgress(progress) {
  localStorage.setItem(substepProgressKey, JSON.stringify(progress));
}

function substepProgressId(module, substep) {
  return `${module.id}:${substep.number}`;
}

function domIdForSubstep(module, substep) {
  return `substep-check-${module.id}-${substep.number}`.replace(/[^a-z0-9_-]/gi, "-");
}

function domIdForStep(module, substep) {
  return `step-${String(substep.number).replace(/[^a-z0-9]/gi, "")}`;
}

function currentHashId() {
  return decodeURIComponent(window.location.hash.replace(/^#/, ""));
}

function moduleIdFromHash() {
  const hash = currentHashId();
  if (!hash) return "";
  if (visibleModules.some((module) => module.id === hash)) return hash;

  const moduleWithStep = visibleModules.find((module) =>
    (module.substeps || []).some((substep) => domIdForStep(module, substep) === hash)
  );
  return moduleWithStep?.id || "";
}

function renderNav() {
  const buttons = document.querySelector("#moduleButtons");
  buttons.innerHTML = "";

  visibleModules.forEach((module, index) => {
    const button = document.createElement("button");
    button.className = "module-button";
    if (module.id === activeModuleId) button.classList.add("active");
    button.type = "button";
    if (module.id === activeModuleId) button.setAttribute("aria-current", "page");
    button.innerHTML = `
      <span class="module-index">${index + 1}</span>
      <span>
        <span class="module-name">${escapeHtml(module.title)}</span>
      </span>
    `;
    button.addEventListener("click", () => {
      activeModuleId = module.id;
      history.replaceState(null, "", `#${module.id}`);
      render();
      window.scrollTo({ top: 0, behavior: "auto" });
    });
    buttons.appendChild(button);
  });
}

function renderRows(containerId, rows, className) {
  const container = document.querySelector(containerId);
  container.innerHTML = "";

  if (!rows.length) {
    container.innerHTML = '<p class="empty-state">Nothing queued for this module.</p>';
    return;
  }

  rows.forEach((text) => {
    const row = document.createElement("div");
    row.className = className;
    const label = className === "command-row" ? "Reference" : "Prompt";
    row.innerHTML = `
      <div class="prompt-row-head">
        <span class="substep-label">${label}</span>
      </div>
      <pre class="prompt-text">${escapeHtml(text)}</pre>
    `;
    row.querySelector(".prompt-row-head").appendChild(createCopyButton(text));
    container.appendChild(row);
  });
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Copy command was not accepted.");
}

function createCopyButton(text) {
  const button = document.createElement("button");
  button.className = "copy-button";
  button.type = "button";
  button.textContent = "Copy";
  button.addEventListener("click", async () => {
    const original = button.textContent;
    button.textContent = "Copied";
    try {
      await copyTextToClipboard(text);
    } catch {
      button.textContent = "Text Selected";
      const promptText = button.closest(".substep-prompt, .prompt-row, .command-row")?.querySelector(".prompt-text");
      if (promptText) {
        const range = document.createRange();
        range.selectNodeContents(promptText);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    setTimeout(() => {
      button.textContent = original;
    }, 1400);
  });
  return button;
}

function appendSubstepImage(content, image) {
  if (!image || !image.src) return;

  const details = document.createElement("details");
  details.className = "substep-reference";

  const summary = document.createElement("summary");
  summary.textContent = "Show visual reference";
  details.appendChild(summary);

  const figure = document.createElement("figure");
  figure.className = "substep-image";

  const img = document.createElement("img");
  img.src = image.src;
  img.alt = image.alt || "";
  img.loading = "lazy";
  figure.appendChild(img);

  if (image.caption) {
    const caption = document.createElement("figcaption");
    caption.innerHTML = formatInlineCodeRefs(image.caption);
    figure.appendChild(caption);
  }

  details.appendChild(figure);
  content.appendChild(details);
}

const contextSlideState = {};

function createContextBlock(block) {
  const section = document.createElement("section");
  section.className = `context-block context-block-${block.type || "text"}`;

  if (block.title) {
    const heading = document.createElement("h4");
    heading.textContent = block.title;
    section.appendChild(heading);
  }

  if (block.type === "statCards") {
    const grid = document.createElement("div");
    grid.className = "context-stat-grid";
    (block.cards || []).forEach((card) => {
      const item = document.createElement("article");
      item.className = "context-stat-card";
      item.innerHTML = `
        <span class="context-stat-label">${escapeHtml(card.label)}</span>
        <strong>${escapeHtml(card.value)}</strong>
        <span>${formatInlineCodeRefs(card.note)}</span>
      `;
      grid.appendChild(item);
    });
    section.appendChild(grid);
  }

  if (block.type === "conceptCards") {
    const grid = document.createElement("div");
    grid.className = "context-card-grid";
    (block.cards || []).forEach((card) => {
      const item = document.createElement("article");
      item.className = "context-card";
      item.innerHTML = `
        <span class="substep-label">${escapeHtml(card.label)}</span>
        <p>${formatInlineCodeRefs(card.text)}</p>
      `;
      grid.appendChild(item);
    });
    section.appendChild(grid);
  }

  if (block.type === "miniTable") {
    const table = document.createElement("table");
    table.className = "context-table";
    const columns = block.columns || [];
    table.innerHTML = `
      <thead>
        <tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${(block.rows || [])
          .map((row) => `<tr>${row.map((cell) => `<td>${formatInlineCodeRefs(cell)}</td>`).join("")}</tr>`)
          .join("")}
      </tbody>
    `;
    section.appendChild(table);
  }

  if (block.type === "figure") {
    const figure = document.createElement("figure");
    figure.className = "context-figure";
    const image = document.createElement("img");
    image.src = block.src;
    image.alt = block.alt || "";
    image.loading = "lazy";
    figure.appendChild(image);
    if (block.caption) {
      const caption = document.createElement("figcaption");
      caption.innerHTML = formatInlineCodeRefs(block.caption);
      figure.appendChild(caption);
    }
    section.appendChild(figure);
  }

  if (block.type === "collapsible") {
    const details = document.createElement("details");
    details.className = "context-collapsible";

    const summary = document.createElement("summary");
    summary.className = "guide-button context-collapsible-trigger";
    summary.textContent = block.label || "Open";
    details.appendChild(summary);

    const content = document.createElement("div");
    content.className = "context-collapsible-content";
    (block.blocks || []).forEach((nestedBlock) => {
      content.appendChild(createContextBlock(nestedBlock));
    });
    details.appendChild(content);
    section.appendChild(details);
  }

  if (block.type === "downloadCards") {
    const grid = document.createElement("div");
    grid.className = "context-download-grid";
    (block.cards || []).forEach((card) => {
      const item = document.createElement("article");
      item.className = "context-download-card";
      item.innerHTML = `
        <span class="substep-label">${escapeHtml(card.label)}</span>
        <p>${formatInlineCodeRefs(card.text)}</p>
      `;
      const anchor = document.createElement("a");
      anchor.className = "guide-button";
      anchor.href = card.href;
      anchor.textContent = card.action || "Download";
      if (card.download) anchor.setAttribute("download", card.download === true ? "" : card.download);
      item.appendChild(anchor);
      grid.appendChild(item);
    });
    section.appendChild(grid);
  }

  if (block.type === "email") {
    const email = document.createElement("article");
    email.className = "context-email";

    const header = document.createElement("div");
    header.className = "context-email-header";
    header.innerHTML = `
      ${block.label ? `<span class="substep-label">${escapeHtml(block.label)}</span>` : ""}
      <h4>${escapeHtml(block.subject || "Follow-up email")}</h4>
      <dl class="context-email-meta">
        ${block.from ? `<div><dt>From</dt><dd>${escapeHtml(block.from)}</dd></div>` : ""}
        ${block.to ? `<div><dt>To</dt><dd>${escapeHtml(block.to)}</dd></div>` : ""}
        ${block.date ? `<div><dt>Date</dt><dd>${escapeHtml(block.date)}</dd></div>` : ""}
        ${block.attachment ? `<div><dt>Attachment</dt><dd>${escapeHtml(block.attachment)}</dd></div>` : ""}
      </dl>
    `;
    email.appendChild(header);

    const body = document.createElement("div");
    body.className = "context-email-body";
    (block.paragraphs || []).forEach((paragraph) => {
      const item = document.createElement("p");
      item.textContent = paragraph;
      body.appendChild(item);
    });
    email.appendChild(body);

    if ((block.actions || []).length) {
      const actionRow = document.createElement("div");
      actionRow.className = "context-email-actions";
      (block.actions || []).forEach((action) => {
        const anchor = document.createElement("a");
        anchor.className = "guide-button";
        anchor.href = action.href;
        anchor.textContent = action.label;
        if (action.download) anchor.setAttribute("download", action.download === true ? "" : action.download);
        actionRow.appendChild(anchor);
      });
      email.appendChild(actionRow);
    }

    section.appendChild(email);
  }

  return section;
}

function renderContextSlides(module, container) {
  const slides = module.contextSlides || [];
  const slideCount = slides.length;
  const currentIndex = Math.min(
    Math.max(contextSlideState[module.id] || 0, 0),
    Math.max(slideCount - 1, 0)
  );
  contextSlideState[module.id] = currentIndex;
  const slide = slides[currentIndex];

  const deck = document.createElement("section");
  deck.className = "context-slide-deck";
  deck.setAttribute("aria-label", `${module.title} slides`);

  const stage = document.createElement("article");
  stage.className = "context-slide-stage";
  stage.setAttribute("aria-live", "polite");
  stage.innerHTML = `
    <div class="context-slide-header">
      <span class="context-slide-kicker">Slide ${currentIndex + 1} of ${slideCount}</span>
      <h4>${escapeHtml(slide.title)}</h4>
      ${slide.lead ? `<p>${formatInlineCodeRefs(slide.lead)}</p>` : ""}
    </div>
  `;

  const content = document.createElement("div");
  content.className = "context-slide-content";
  (slide.blocks || []).forEach((block) => {
    content.appendChild(createContextBlock(block));
  });
  stage.appendChild(content);

  const controls = document.createElement("div");
  controls.className = "context-slide-controls";

  const previousButton = document.createElement("button");
  previousButton.className = "slide-arrow";
  previousButton.type = "button";
  previousButton.setAttribute("aria-label", "Previous slide");
  previousButton.title = "Previous slide";
  previousButton.disabled = currentIndex === 0;
  previousButton.innerHTML = '<span aria-hidden="true">&larr;</span>';
  previousButton.addEventListener("click", () => {
    contextSlideState[module.id] = Math.max(currentIndex - 1, 0);
    renderContextBlocks(module);
  });

  const nextButton = document.createElement("button");
  nextButton.className = "slide-arrow";
  nextButton.type = "button";
  nextButton.setAttribute("aria-label", "Next slide");
  nextButton.title = "Next slide";
  nextButton.disabled = currentIndex === slideCount - 1;
  nextButton.innerHTML = '<span aria-hidden="true">&rarr;</span>';
  nextButton.addEventListener("click", () => {
    contextSlideState[module.id] = Math.min(currentIndex + 1, slideCount - 1);
    renderContextBlocks(module);
  });

  const dots = document.createElement("div");
  dots.className = "context-slide-dots";
  slides.forEach((item, index) => {
    const dot = document.createElement("button");
    dot.className = "context-slide-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Show slide ${index + 1}: ${item.title}`);
    dot.setAttribute("aria-current", index === currentIndex ? "step" : "false");
    dot.addEventListener("click", () => {
      contextSlideState[module.id] = index;
      renderContextBlocks(module);
    });
    dots.appendChild(dot);
  });

  controls.append(previousButton, dots, nextButton);
  deck.append(stage, controls);
  container.appendChild(deck);
}

function renderContextBlocks(module) {
  const blocks = module.contextBlocks || [];
  const slides = module.contextSlides || [];
  const band = document.querySelector("#moduleContextBand");
  const title = document.querySelector("#moduleContextTitle");
  const container = document.querySelector("#contextBlocks");
  if (!band || !title || !container) return;

  container.innerHTML = "";
  title.textContent = module.contextTitle || (slides.length ? "Slides" : "Context");
  band.hidden = blocks.length === 0 && slides.length === 0;
  band.classList.toggle("context-slideshow-band", slides.length > 0);

  if (slides.length) {
    renderContextSlides(module, container);
    return;
  }

  blocks.forEach((block) => {
    container.appendChild(createContextBlock(block));
  });
}

function renderSubsteps(module) {
  const substeps = module.substeps || [];
  const progress = loadSubstepProgress();
  const isChecklist = Boolean(module.checkableSubsteps);
  const band = document.querySelector("#substepBand");
  const container = document.querySelector("#substepList");
  document.querySelector("#substepTitle").textContent = (module.substepTitle || "Module Steps").replace("Substeps", "Steps");
  container.innerHTML = "";
  container.classList.remove("is-focusing");
  container.classList.toggle("checklist-list", isChecklist);
  container.dataset.focusMode = isChecklist ? "static" : "scroll";
  band.hidden = substeps.length === 0;

  substeps.forEach((substep) => {
    const row = document.createElement("article");
    const substepIntroHtml = substep.intro ? `<p class="substep-intro">${formatInlineCodeRefs(substep.intro)}</p>` : "";
    row.className = isChecklist ? "substep-card checklist-card" : "substep-card";
    row.id = domIdForStep(module, substep);
    if (isChecklist) {
      row.innerHTML = `
        <div class="substep-content checklist-content">
          <div class="checklist-title-row">
            <div class="checklist-title-copy">
              <span class="substep-number">Item ${escapeHtml(substep.number)}</span>
              <h4>${formatInlineCodeRefs(substep.title)}</h4>
            </div>
          </div>
          ${substepIntroHtml}
          <p>${formatInlineCodeRefs(substep.text)}</p>
        </div>
      `;
    } else {
      row.innerHTML = `
        <span class="substep-number">Step ${escapeHtml(substep.number)}</span>
        <div class="substep-content">
          <div class="substep-title-row">
            <h4>${formatInlineCodeRefs(substep.title)}</h4>
          </div>
          ${substepIntroHtml}
          <p class="substep-action"><strong>DO:</strong> ${formatInlineCodeRefs(substep.text)}</p>
        </div>
      `;
    }
    const content = row.querySelector(".substep-content");
    const titleRow = row.querySelector(isChecklist ? ".checklist-title-row" : ".substep-title-row");

    if (module.checkableSubsteps) {
      const itemKey = substepProgressId(module, substep);
      const checkboxId = domIdForSubstep(module, substep);
      const checkLabel = document.createElement("label");
      checkLabel.className = "substep-check";
      checkLabel.htmlFor = checkboxId;

      const input = document.createElement("input");
      input.id = checkboxId;
      input.type = "checkbox";
      input.checked = Boolean(progress[itemKey]);
      row.classList.toggle("substep-card-complete", input.checked);

      input.addEventListener("change", () => {
        const nextProgress = loadSubstepProgress();
        nextProgress[itemKey] = input.checked;
        saveSubstepProgress(nextProgress);
        row.classList.toggle("substep-card-complete", input.checked);
      });

      const labelText = document.createElement("span");
      labelText.textContent = isChecklist ? "Mark complete" : "Done";
      checkLabel.append(input, labelText);
      if (isChecklist) {
        titleRow.prepend(checkLabel);
      } else {
        titleRow.appendChild(checkLabel);
      }
    }

    appendSubstepImage(content, substep.image);

    (substep.contextBlocks || []).forEach((block) => {
      const contextBlock = createContextBlock(block);
      contextBlock.classList.add("substep-context-block");
      content.appendChild(contextBlock);
    });

    (substep.materials || []).forEach((material) => {
      const materialRow = document.createElement("div");
      materialRow.className = "substep-material";
      materialRow.innerHTML = `
        <span class="substep-label">${escapeHtml(material.label)}</span>
        <span>${formatInlineCodeRefs(material.text)}</span>
      `;
      content.appendChild(materialRow);
    });

    (substep.notes || []).forEach((note) => {
      const noteRow = document.createElement("p");
      noteRow.className = "substep-note";
      noteRow.innerHTML = formatInlineCodeRefs(note);
      content.appendChild(noteRow);
    });

    if (substep.sequenceNote) {
      const sequenceNote = document.createElement("p");
      sequenceNote.className = "sequence-note";
      sequenceNote.innerHTML = `<strong>Prompt order:</strong> ${formatInlineCodeRefs(substep.sequenceNote)}`;
      content.appendChild(sequenceNote);
    }

    if ((substep.links || []).length) {
      const linkRow = document.createElement("div");
      linkRow.className = "substep-links";
      (substep.links || []).forEach((link) => {
        const anchor = document.createElement("a");
        anchor.className = "guide-button";
        anchor.href = link.href;
        anchor.textContent = link.label;
        if (link.download) anchor.setAttribute("download", link.download === true ? "" : link.download);
        linkRow.appendChild(anchor);
      });
      content.appendChild(linkRow);
    }

    (substep.prompts || []).forEach((prompt) => {
      const promptRow = document.createElement("div");
      promptRow.className = "substep-prompt";
      promptRow.innerHTML = `
        <div class="substep-prompt-copy">
          <div class="substep-prompt-head">
            <span class="substep-label">${escapeHtml(prompt.label || "Ask Codex")}</span>
          </div>
          <pre class="prompt-text">${escapeHtml(prompt.text)}</pre>
        </div>
      `;
      promptRow.querySelector(".substep-prompt-head").appendChild(createCopyButton(prompt.text));
      content.appendChild(promptRow);
    });

    container.appendChild(row);
  });
}

function renderModuleRecap(module) {
  const recapParagraphs = module.recap || [];
  const shouldShowRecap = recapParagraphs.length > 0;
  const band = document.querySelector("#moduleRecapBand");
  const container = document.querySelector("#moduleRecapList");
  if (!band || !container) return;

  container.innerHTML = "";
  band.hidden = !shouldShowRecap;
  if (!shouldShowRecap) return;

  recapParagraphs.forEach((paragraph) => {
    const recap = document.createElement("p");
    recap.className = "recap-intro";
    recap.innerHTML = formatInlineCodeRefs(paragraph);
    container.appendChild(recap);
  });
}

function renderModule() {
  const module = visibleModules.find((item) => item.id === activeModuleId) || visibleModules[0];
  const commands = module.commands || [];
  const prompts = module.prompts || [];
  const commandBand = document.querySelector(".command-band");
  const promptBand = document.querySelector(".prompt-band");
  document.querySelector("#moduleTag").textContent = module.tag;
  document.querySelector("#moduleTitle").textContent = module.title;
  document.querySelector("#commandTitle").textContent = module.commandTitle || "Agent Actions";
  document.querySelector("#promptTitle").textContent = module.promptTitle || "Prompt Snippets";
  const body = module.body;
  const bodyHtml = body
    .map((paragraph) => `<p>${formatInlineCodeRefs(paragraph)}</p>`)
    .join("");
  const focusHtml = module.step && !module.readOnly && !module.plainIntro
    ? `<p>${formatInlineCodeRefs(module.step)}</p>`
    : "";
  document.querySelector("#moduleBody").innerHTML = `${bodyHtml}${focusHtml}`;
  renderContextBlocks(module);
  renderSubsteps(module);
  renderModuleRecap(module);
  commandBand.hidden = commands.length === 0;
  if (commands.length) {
    renderRows("#commandList", commands, "command-row");
  } else {
    document.querySelector("#commandList").innerHTML = "";
  }
  promptBand.hidden = prompts.length === 0;
  if (prompts.length) {
    renderRows("#promptList", prompts, "prompt-row");
  } else {
    document.querySelector("#promptList").innerHTML = "";
  }
}

function render() {
  renderNav();
  renderModule();
  refreshStepFocus();
}

let focusFrame = null;
let focusableSteps = [];
let focusStepList = null;
let activeStep = null;
let anchorStep = null;
let anchorLockUntil = 0;

function setActiveStep(nextStep) {
  if (!focusStepList || !nextStep || activeStep === nextStep) return;
  activeStep = nextStep;
  focusStepList.classList.add("is-focusing");
  focusableSteps.forEach((step) => {
    step.classList.toggle("is-active", step === nextStep);
  });
}

function updateFocusedStep() {
  focusFrame = null;
  if (!focusableSteps.length) return;

  if (anchorStep && Date.now() < anchorLockUntil) {
    const rect = anchorStep.getBoundingClientRect();
    const isAnchorVisible = rect.bottom > 80 && rect.top < window.innerHeight - 80;
    if (isAnchorVisible) {
      setActiveStep(anchorStep);
      return;
    }
  }

  const focusLine = window.innerHeight * 0.42;
  let bestStep = null;
  let bestDistance = Infinity;

  focusableSteps.forEach((step) => {
    const rect = step.getBoundingClientRect();
    const isVisible = rect.bottom > 80 && rect.top < window.innerHeight - 80;
    if (!isVisible) return;

    const stepCenter = rect.top + rect.height / 2;
    const distance = Math.abs(stepCenter - focusLine);
    if (distance < bestDistance) {
      bestStep = step;
      bestDistance = distance;
    }
  });

  if (bestStep) setActiveStep(bestStep);
}

function requestFocusUpdate() {
  if (focusFrame !== null) return;
  focusFrame = window.requestAnimationFrame(updateFocusedStep);
}

function focusHashStep({ scroll = false } = {}) {
  const targetId = currentHashId();
  if (!targetId) return false;
  const target = document.getElementById(targetId);
  if (!target || !focusableSteps.includes(target)) return false;

  anchorStep = target;
  anchorLockUntil = Date.now() + 900;
  setActiveStep(target);
  if (scroll) {
    target.scrollIntoView({ block: "start", behavior: "auto" });
  }
  return true;
}

function refreshStepFocus() {
  focusStepList = document.querySelector("#substepList");
  focusableSteps = Array.from(document.querySelectorAll(".substep-card"));
  activeStep = null;
  anchorStep = null;

  if (!focusStepList || !focusableSteps.length) return;
  focusStepList.classList.remove("is-focusing");
  focusableSteps.forEach((step) => step.classList.remove("is-active"));

  if (focusStepList.dataset.focusMode === "static") {
    const target = document.getElementById(currentHashId());
    if (target && focusableSteps.includes(target)) {
      target.scrollIntoView({ block: "start", behavior: "auto" });
    }
    focusableSteps = [];
    return;
  }

  if (!focusHashStep({ scroll: true })) requestFocusUpdate();
}

window.addEventListener("scroll", requestFocusUpdate, { passive: true });
window.addEventListener("resize", requestFocusUpdate);
window.addEventListener("hashchange", () => {
  const hashModuleId = moduleIdFromHash();
  if (hashModuleId && hashModuleId !== activeModuleId) {
    activeModuleId = hashModuleId;
    render();
    return;
  }

  window.setTimeout(() => {
    focusHashStep({ scroll: true });
    requestFocusUpdate();
  }, 80);
});

render();
