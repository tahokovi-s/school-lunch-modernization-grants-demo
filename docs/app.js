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
        text: "Open Codex and ask it to verify that Python works. Codex can run the technical check and report the result; you do not need to type command-line checks yourself.",
        links: [{ label: "Need Python help?", href: "setup/python.html" }],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Please check whether Python is installed and available to you. If it is available, run a tiny Python script that prints the Python version and confirms that 2 + 2 equals 4. Do not modify any project files."
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
      "This pass leaves behind three things: preliminary notes on the raw files, a conservative cafeteria-partner rubric, and a review plan for row-level classification. It does not create cleaned data, row-level classifications, code, or the school-year panel."
    ],
    substepTitle: "Module 3 Steps",
    substeps: [
      {
        number: "3.1",
        title: "Inspect The Raw Files",
        text: "Use the raw ZIP at data/original/school_lunch_modernization_raw_data.zip. This pass should make the files understandable: what is in each CSV, how rows are counted, how the established-school crosswalk supports matching, and which partner-role cases need human judgment.",
        prompts: [
          {
            label: "Raw Data Inspection",
            text: "Inspect the raw-data ZIP at data/original/school_lunch_modernization_raw_data.zip.\n\nExtract it into data/original/ while preserving the ZIP. Then create docs/raw_data_preliminary_pass.md summarizing:\n\n- which CSV files are present and their row counts\n- what each CSV appears to contain and its likely unit of observation\n- likely keys and relationships between files\n- how established_school_crosswalk.csv maps raw school names to canonical school_id values\n- school or district aliases that could affect matching\n- cafeteria partner-role cases that may need human judgment\n\nFocus on inspection only for now; classification and panel-building come later."
          }
        ]
      },
      {
        number: "3.2",
        title: "Write The Role Classification Rubric",
        text: "Once the preliminary pass has surfaced messy partner roles, write the rules future reviewers will use. The rubric should define evidence for each category and keep unclear cases visible as ambiguous instead of forcing them into confirmed school lead status.",
        notes: [
          "This prompt should create docs/cafeteria_partner_classification_rubric.md. The rubric should define decision rules only; row-level role_category assignments happen in the classification pass."
        ],
        prompts: [
          {
            label: "Role Rubric",
            text: "Using docs/raw_data_preliminary_pass.md and data/original/cafeteria_partner_role_records.csv, draft docs/cafeteria_partner_classification_rubric.md.\n\nDefine these allowed role_category values:\n\n- school_meal_program_lead\n- district_or_state_office\n- equipment_or_installation_vendor\n- food_supplier_or_menu_vendor\n- nutrition_education_partner\n- advisor_or_consultant\n- ambiguous\n\nFor each category, explain the evidence that supports it, the evidence that rules it out, concrete examples from the CSVs, and triggers for human review. Be conservative: unclear, vague, prospective, or only possibly implementation-related roles should remain ambiguous."
          }
        ]
      },
      {
        number: "3.3",
        title: "Prepare The Classification Review Plan",
        text: "The rubric defines the categories. The review plan defines how separate reviewer passes will apply them and how disagreements become audit notes instead of hidden assumptions.",
        materials: [{ label: "Output file", text: "docs/cafeteria_partner_subagent_review_plan.md" }],
        notes: [
          "Before row-level classification begins, you should have preliminary notes, a rubric, and a review plan, but no classification CSV or school-year panel."
        ],
        prompts: [
          {
            label: "Classification Review Plan",
            text: "Create docs/cafeteria_partner_subagent_review_plan.md for the row-level classification pass.\n\nBase it on docs/cafeteria_partner_classification_rubric.md and data/original/cafeteria_partner_role_records.csv. Define these four review passes:\n\n- School lead reviewer\n- Non-lead partner reviewer\n- Ambiguity reviewer\n- Reconciliation lead\n\nFor each pass, explain what evidence it should cite and what would count as weak evidence. Also explain how disagreements should be reconciled, how unresolved uncertainty should stay in the ambiguous category, and how the final classification should verify that every original row is accounted for."
          }
        ]
      }
    ],
    commandTitle: "Ask The Agent To Inspect",
    commands: [],
    prompts: [],
    recap: [
      "You opened the raw data carefully before making any classifications or merges. The ZIP was extracted while preserving the original archive, and the preliminary notes made the CSVs legible: what files exist, how many rows they contain, what each file appears to measure, and where joins or name matching may become fragile.",
      "That mattered because the PI's question depends on judgment calls, not just clean merges. School names, district aliases, partner roles, and cafeteria-related descriptions all needed to be understood before any row could be safely turned into an analysis variable.",
      "The classification rubric turned that raw evidence into conservative rules. It separated confirmed school meal-program leadership from district offices, vendors, suppliers, advisors, nutrition education partners, and ambiguous cases, so uncertainty remains visible instead of being hidden inside a binary indicator.",
      "The project is now ready for row-level role classification, but it has not yet produced the classification CSV, analysis-ready data, or the school-year panel. The useful state is the audit trail: preliminary raw-data notes, a role-classification rubric, and a review plan that explains how evidence, disagreement, and ambiguity should be handled."
    ],
    checks: [
      "docs/raw_data_preliminary_pass.md identifies files, row counts, likely join keys, crosswalk support, aliases, messy role labels, and rows needing review.",
      "docs/cafeteria_partner_classification_rubric.md defines allowed categories with examples and ambiguity triggers.",
      "docs/cafeteria_partner_subagent_review_plan.md explains reviewer passes, disagreement handling, and row accounting for classification.",
      "This pass has not produced a row-level classification CSV, analysis code, or school-year panel."
    ]
  },
  {
    id: "classification",
    title: "Subagent Cafeteria Partner Classification",
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
        title: "Convene The Review Team",
        text: "Ask the agent to read the rubric and review plan, then restate how the subagent classification will work.",
        prompts: [
          { label: "Prompt to copy", text: "Read docs/cafeteria_partner_classification_rubric.md and docs/cafeteria_partner_subagent_review_plan.md. Before classifying rows, restate the reviewer roles, the allowed role_category values, the conservative default rule, and the output files we need. Do not write or run a classification script." }
        ]
      },
      {
        number: "4.2",
        title: "Run Independent Reviewer Passes",
        text: "Have the subagents classify from different perspectives before reconciliation.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Use the reviewer plan to run independent subagent passes over data/original/cafeteria_partner_role_records.csv. If your environment supports subagents, use them; otherwise use clearly separated reviewer passes.\n\nStage 1: The school lead reviewer identifies rows that clearly support school_meal_program_lead and cites exact role or note evidence.\nStage 2: The non-lead partner reviewer identifies rows that should not count as school leads because they are district offices, equipment vendors, food suppliers, meal vendors, education partners, or advisors.\nStage 3: The ambiguity reviewer identifies rows that should be ambiguous or need human review, especially strategic partners, possible implementation partners, prospective kitchen partners, and roles without documented scope.\n\nSave the reviewer notes as docs/cafeteria_partner_subagent_review_notes.md. Do not create the final CSV yet."
          }
        ]
      },
      {
        number: "4.3",
        title: "Reconcile And Write Outputs",
        text: "Ask for one conservative row-level classification table and a PI-readable audit trail.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Reconcile docs/cafeteria_partner_subagent_review_notes.md into final row-level classifications. If reviewers disagree, choose the conservative classification and explain why.\n\nCreate data/analysis_ready/cafeteria_partner_role_classifications.csv with one row for every row in data/original/cafeteria_partner_role_records.csv. Include these columns: record_id, record_year, project_title, organization_name, organization_role_raw, organization_note, role_category, classification_reason. Use only these role_category values: school_meal_program_lead, district_or_state_office, equipment_or_installation_vendor, food_supplier_or_menu_vendor, nutrition_education_partner, advisor_or_consultant, ambiguous.\n\nAlso create audit_notes/cafeteria_partner_role_classification_audit.md. The audit should summarize the reviewer roles, classification counts, rows marked ambiguous, any reviewer disagreements, and rows that need PI review. Do not write a Python classification script for this step."
          }
        ]
      },
      {
        number: "4.4",
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
      "You used the rubric and review plan to classify cafeteria partner records through separate reviewer perspectives. Instead of relying on a simple keyword script, the workflow asked for evidence from school-lead, non-lead, and ambiguity reviews before reconciling the final categories.",
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
        title: "Review Inputs And Build Contract",
        text: "Before coding, turn the input caveats, crosswalk rules, and classification rules into a contract for the panel build.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Review the panel inputs and prior audit before writing code: data/original/school_directory.csv, data/original/established_school_crosswalk.csv, data/original/school_lunch_modernization_grant_awards.csv, data/analysis_ready/cafeteria_partner_role_classifications.csv, and audit_notes/cafeteria_partner_role_classification_audit.md.\n\nCreate a short build contract for the school-year panel. Include:\n\n- unit of observation and expected key columns, including school_id and year\n- years to include: 2019-2024\n- duplicate-school and unmatched-name risks across the directory, crosswalk, grant, and lead-role sources\n- allowed role_category values and which categories are excluded from `MealProgramLead`\n- how `ModernizationGrantRecipient` and `ModernizationGrantAmount` should use award timing\n- how `MealProgramLead` should become cumulative after the first confirmed lead year\n- audit outputs needed for row counts, year coverage, matching, input coverage, exclusions, unmatched names, and human-review caveats\n\nDo not write or run the script yet. Flag any blocker that would make the contract unsafe."
          }
        ]
      },
      {
        number: "5.2",
        title: "Write And Run The Panel Builder",
        text: "Use the build contract to create the script first, then run it as a separate turn.",
        sequenceNote: "Send these as two separate Codex messages. First ask Codex to create the script and stop. Then ask Codex to run it and report the resulting panel shape and audit caveats.",
        prompts: [
          {
            label: "Create script prompt",
            text: "Start by briefly restating the build contract. If no blocker remains, create scripts/build_school_year_panel.py, but do not run it yet.\n\nThe script should read the directory, established-school crosswalk, grant awards, and role classification inputs. It should write data/analysis_ready/school_year_panel.csv and audit_notes/build_school_year_panel_audit.md.\n\nThe audit note should report:\n\n- row counts and expected school-year coverage\n- year coverage\n- match summary across school names and aliases\n- variable timing/rules for `ModernizationGrantRecipient`, `ModernizationGrantAmount`, and `MealProgramLead`\n- excluded classification counts\n- unmatched grant names and unmatched lead-role names\n- human-review caveats"
          },
          {
            label: "Run script prompt",
            text: "Run scripts/build_school_year_panel.py.\n\nAfter it runs, report:\n\n- files created or updated\n- panel row count\n- year range\n- whether expected rows equal unique schools x 6 years\n- unmatched grants or lead rows\n- any audit caveats that need human review\n\nIf it fails, explain the error and the smallest input or code issue to inspect next before changing the contract."
          }
        ]
      },
      {
        number: "5.3",
        title: "Inspect Panel, Matches, And Audit Notes",
        text: "Check the final CSV and audit for shape, timing rules, crosswalk matches, exclusions, and records requiring human review.",
        materials: [
          { label: "Output file", text: "data/analysis_ready/school_year_panel.csv" },
          { label: "Audit file", text: "audit_notes/build_school_year_panel_audit.md" }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Inspect data/analysis_ready/school_year_panel.csv and audit_notes/build_school_year_panel_audit.md.\n\nCheck:\n\n- expected rows = unique schools x 6 years\n- no duplicate school_id/year rows\n- years are exactly 2019-2024\n- school_id remains in the panel for later merges\n- `ModernizationGrantAmount` is 0 when no award occurred\n- `ModernizationGrantRecipient` timing is consistent with the award year and grant amount\n- `MealProgramLead` is cumulative after the first confirmed school-meal lead year\n- ambiguous and non-lead partner rows are excluded from `MealProgramLead`\n- unmatched names and human-review rows are visible in the audit\n\nSummarize any issue that could change downstream analysis."
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
      "The build contract names the unit, keys, years, timing rules, crosswalk rules, exclusions, matching risks, and audit outputs.",
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
    title: "Explore The 2022 Scoring Change",
    step: "Turn the panel into cautious first-pass evidence",
    tag: "Analysis",
    body: [
      "Suppose your PI has written again: the panel is ready, and a 2022 scoring change may have given more priority to applications for scratch-cooking equipment, cold storage, and healthier serving-line infrastructure. That creates an opportunity for a fast but cautious first analysis pass.",
      "The follow-up also brings a new school-year survey extract with aggregate health and wellbeing measures. Treat it as a new source file: inspect it first, merge it into the existing panel, then use the expanded panel for cautious first-pass analysis."
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
              "Thanks for putting together the school-year panel and the notes. This is very helpful, and I think it may be enough for a first analysis pass.",
              "One more thing: I confirmed that the state changed the modernization grant scoring in 2022. After the change, applications tied to scratch-cooking equipment, cold storage, and healthier serving-line infrastructure appear to have received a clearer priority. That may give us a useful timing change to explore, though I do not want to assume it is a clean policy break without checking the panel.",
              "I also attached a school-year survey extract with aggregate student health and wellbeing measures. Please merge it carefully before using those variables. If the scoring change mattered in practice, I would expect to see something like more schools receiving grants, larger grant amounts, or improvements in lunch participation, healthy-meal scores, and aggregate student health or wellbeing measures after 2022.",
              "Please be cautious with the wellbeing and mental-health-related measures. A referral rate could reflect need, detection, service access, or reporting practice, so treat those checks as exploratory survey signals rather than proof of a mental-health effect.",
              "Could you take a first pass at whether the panel shows anything along those lines? Please use your judgment about the exact comparisons. Pre/post patterns, plots, and some regression-style checks would be useful, but I do not want to force one specification too early.",
              "I mostly want to know whether there is anything promising here, what the first-pass estimates look like, and what we would need to check before taking the result seriously.",
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
                text: "Download this PDF now. You will move it into school_lunch_modernization_grants/docs/ before summarizing the follow-up request.",
                href: "assets/generated/pi_followup_2022_scoring_change_email.pdf?v=20260528-survey-flow",
                download: "pi_followup_2022_scoring_change_email.pdf",
                action: "Download email PDF"
              },
              {
                label: "Student survey extract",
                text: "Download this CSV now. You will move it into school_lunch_modernization_grants/data/original/ before the merge pass.",
                href: "attachments/student_health_wellbeing_survey_extract.csv?v=20260528-survey-flow",
                download: "student_health_wellbeing_survey_extract.csv",
                action: "Download survey CSV"
              }
            ]
          }
        ]
      }
    ],
    substepTitle: "First-Pass Analysis Steps",
    substeps: [
      {
        number: "7.1",
        title: "Save And Summarize The Follow-Up Request",
        text: "Download the follow-up email PDF and survey CSV. Save the email into docs/ and the survey extract into data/original/, then ask Codex to turn the request into a short analysis brief before any code is written.",
        materials: [
          { label: "Email file", text: "pi_followup_2022_scoring_change_email.pdf" },
          { label: "Survey file", text: "student_health_wellbeing_survey_extract.csv" },
          { label: "Output file", text: "docs/school_lunch_analysis_handoff_summary.md" }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "My PI sent a follow-up request about the 2022 school lunch grant scoring change.\n\nFollow-up request: @docs/pi_followup_2022_scoring_change_email.pdf\nSurvey extract: data/original/student_health_wellbeing_survey_extract.csv\n\nRead the saved request as the source of truth and create docs/school_lunch_analysis_handoff_summary.md.\n\nInclude:\n\n- what changed since the original assignment\n- the 2022 scoring change described in the request\n- the analysis-ready baseline panel file to use\n- the student survey extract to inspect and merge\n- the first-pass questions the PI wants answered, including meal, health, and wellbeing outcomes after the survey merge\n- expected tables, figure, code, audit note, review memo, and PI update\n- assumptions, caveats, and human-review points\n\nDo not inspect results, merge files, write analysis code, or draft the PI update yet."
          }
        ]
      },
      {
        number: "7.2",
        title: "Inspect The Survey Extract",
        text: "Before merging the new source, inspect its unit, keys, coverage, and missingness.",
        materials: [{ label: "Output file", text: "docs/student_survey_extract_inspection.md" }],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Inspect data/original/student_health_wellbeing_survey_extract.csv.\n\nCreate docs/student_survey_extract_inspection.md summarizing:\n\n- row count and unit of observation\n- school_id and year coverage\n- available aggregate health and wellbeing variables\n- duplicate school_id/year keys\n- missing values\n- whether the file can merge to data/analysis_ready/school_year_panel.csv by school_id and year\n\nDo not merge the file yet."
          }
        ]
      },
      {
        number: "7.3",
        title: "Merge The Survey Extract",
        text: "Merge the survey file into the completed baseline panel and write an audit note that makes coverage and interpretation limits visible.",
        materials: [
          { label: "Output file", text: "data/analysis_ready/school_year_panel_with_survey.csv" },
          { label: "Audit file", text: "audit_notes/student_survey_merge_audit.md" }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Using docs/student_survey_extract_inspection.md, merge data/original/student_health_wellbeing_survey_extract.csv into data/analysis_ready/school_year_panel.csv by school_id and year.\n\nCreate data/analysis_ready/school_year_panel_with_survey.csv and audit_notes/student_survey_merge_audit.md.\n\nThe merge must preserve the original panel row count and school-year universe. The audit should report matched rows, unmatched survey rows, panel rows without survey data, duplicate-key handling, missingness by variable, and any caveats for interpreting aggregate wellbeing or mental-health-related measures."
          }
        ]
      },
      {
        number: "7.4",
        title: "Check The Expanded Panel Against The Question",
        text: "Before writing analysis code, have Codex inspect whether the expanded panel actually contains the years, outcomes, identifiers, and comparison structure needed for the PI's question.",
        materials: [
          { label: "Output file", text: "docs/school_lunch_analysis_design_memo.md" }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Read docs/school_lunch_analysis_handoff_summary.md, data/analysis_ready/school_year_panel_with_survey.csv, audit_notes/student_survey_merge_audit.md, audit_notes/cafeteria_partner_role_classification_audit.md, and audit_notes/build_school_year_panel_audit.md.\n\nCreate docs/school_lunch_analysis_design_memo.md.\n\nThe memo should cover:\n\n- the exact follow-up question about the 2022 scoring change\n- the panel unit, years, and variables available after the survey merge\n- which meal, health, and wellbeing outcomes can be checked in a first pass\n- how to mark years before and after the 2022 change\n- which comparisons the panel can support\n- which variables, audit caveats, or assumptions are too weak for strong claims\n- how to interpret mental-health-related referral measures cautiously\n- the summary table, regression checks, plot, audit note, review memo, and PI update to create\n\nDo not write or run analysis code yet."
          }
        ]
      },
      {
        number: "7.5",
        title: "Write And Run A First-Pass Analysis",
        text: "Ask Codex to write and run a readable script that turns the panel check into descriptive summaries, plots where useful, exploratory regressions, and an audit note.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Create and run scripts/run_school_lunch_first_pass_analysis.py using docs/school_lunch_analysis_design_memo.md.\n\nThe script should:\n\n- load and validate data/analysis_ready/school_year_panel_with_survey.csv\n- construct a 2022-and-later indicator\n- use only variables available in the panel, with the exact column names in the CSV\n- create a first-pass summary table by period and relevant school groups\n- run simple regression checks for grant receipt, grant amount, lunch participation, healthy-meal score, aggregate health index, aggregate wellbeing score, and mental-health referral rate when those variables are available after the survey merge\n- create a plot showing pre/post patterns around the 2022 scoring change for the clearest available outcomes\n- write an audit note that names any dropped rows, missing variables, fragile checks, or interpretation limits\n\nOutput files:\n\n- final_outputs/school_lunch_first_pass_summary.csv\n- final_outputs/school_lunch_first_pass_regression_checks.csv\n- final_outputs/school_lunch_2022_change_plot.svg\n- audit_notes/school_lunch_first_pass_analysis_audit.md\n\nImplementation rules:\n\n- Use pandas and standard Python first.\n- Use statsmodels only if it is already available; do not install packages without asking.\n- If a check cannot be estimated cleanly, write that limitation into the audit note instead of hiding it.\n- Treat mental-health referral rate as an exploratory school-level survey measure; higher values could reflect greater need, better detection, or better service access.\n- Keep the code beginner-readable.\n\nAfter running the script, summarize which outputs were created and the main caveats."
          }
        ]
      },
      {
        number: "7.6",
        title: "Inspect The Results And Audit",
        text: "Slow down after the first-pass run. Ask Codex to explain the script, the model choices, the outputs, and the audit note before treating any estimate as useful.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Inspect these files:\n\n- scripts/run_school_lunch_first_pass_analysis.py\n- data/analysis_ready/school_year_panel_with_survey.csv\n- audit_notes/student_survey_merge_audit.md\n- final_outputs/school_lunch_first_pass_summary.csv\n- final_outputs/school_lunch_first_pass_regression_checks.csv\n- final_outputs/school_lunch_2022_change_plot.svg\n- audit_notes/school_lunch_first_pass_analysis_audit.md\n\nCreate final_outputs/school_lunch_analysis_review.md.\n\nThe review memo should summarize:\n\n- what the survey merge added\n- what the script ran\n- whether the output files match docs/school_lunch_analysis_design_memo.md\n- what the summary table and plot show for meal, health, and wellbeing outcomes\n- what the regression checks suggest\n- which results are fragile, missing, or sensitive to panel limits\n- which wellbeing or mental-health-related measures need especially cautious interpretation\n- which code or data assumptions a human should inspect before sharing the update\n\nDo not draft the PI update yet."
          }
        ]
      },
      {
        number: "7.7",
        title: "Draft The PI Analysis Update",
        text: "Turn the survey merge and first-pass analysis into a cautious PI-facing update that separates findings from assumptions and caveats.",
        materials: [{ label: "Output file", text: "final_outputs/school_lunch_analysis_pi_update.md" }],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Using docs/school_lunch_analysis_handoff_summary.md, docs/school_lunch_analysis_design_memo.md, final_outputs/school_lunch_analysis_review.md, audit_notes/student_survey_merge_audit.md, and audit_notes/school_lunch_first_pass_analysis_audit.md, draft final_outputs/school_lunch_analysis_pi_update.md.\n\nThe update should include:\n\n- what follow-up question the PI asked\n- what the survey merge added to the baseline panel\n- what first-pass analysis was run\n- what the summary table, regression checks, and plot suggest for meal, health, and wellbeing outcomes\n- why the results should be treated as preliminary\n- which assumptions or data limitations matter most\n- how to describe mental-health-related measures without overclaiming\n- what a human researcher should review next\n\nKeep the tone concise and PI-facing. Do not describe the results as proof that the scoring change caused the observed patterns."
          }
        ]
      }
    ],
    commandTitle: "Ask The Agent To Analyze",
    commands: [],
    prompts: [],
    recap: [
      "The PI's follow-up request added two things to the project: a question about the 2022 grant scoring change and a new aggregate student survey extract. The project responded by saving the new materials, summarizing the request, inspecting the survey file, and merging it into the baseline panel before running analysis.",
      "That mattered because the health and wellbeing variables were not part of the original panel build. Treating them as a new source made the merge visible: row counts, school-year keys, missingness, and interpretation limits were checked before those variables entered any table, plot, or regression.",
      "The 2022 change is suggestive, not automatically causal. The analysis can describe pre/post patterns, compare relevant groups, and run exploratory regression checks, but it still needs to separate interesting signals from claims the data cannot justify, especially for wellbeing and mental-health-related survey measures.",
      "The project should now contain the analysis handoff, survey inspection, survey merge audit, design memo, readable analysis script, summary outputs, plot, audit note, review memo, and PI update. The analysis is useful as a first look: it shows what patterns appear in the expanded panel and what a human researcher should inspect before taking the evidence seriously."
    ],
    checks: [
      "The follow-up email PDF has been saved into docs/ and can be referenced with @.",
      "The student survey extract has been saved into data/original/.",
      "Codex created docs/school_lunch_analysis_handoff_summary.md before writing analysis code.",
      "The survey extract was inspected and merged without changing the baseline panel row count.",
      "The design memo explains whether the expanded data can support the PI's question across meal, health, and wellbeing outcomes.",
      "The first-pass analysis produced readable code, tables or figures, and an audit note.",
      "A human review memo identifies assumptions, code areas to inspect, and results that should stay preliminary.",
      "The PI update separates exploratory findings from causal claims and treats wellbeing measures cautiously."
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
  "causal-analysis": "Use this as a first look, not a final estimate. The follow-up adds a survey source, so the human task is to check the merge, timing, outcomes, comparison groups, and wellbeing interpretation before saying anything stronger.",
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
  "raw-data:3.1": "Start with a plain inventory of the raw files. The useful output is a note that names the CSVs, row counts, likely keys, crosswalk support, aliases, and partner-role cases that need judgment.",
  "raw-data:3.2": "The rubric is where judgment becomes a rule, not a row-level assignment. It should say which evidence supports each category and when a case should remain ambiguous.",
  "raw-data:3.3": "The review plan is the handoff to row-level classification. It should define the separate passes, how disagreements are handled, and how every original role row will be accounted for.",
  "classification:4.1": "Start classification with a verbal contract. Ask the agent to restate the categories, outputs, and conservative default before touching rows, so you can correct the rules while they are still easy to change.",
  "classification:4.2": "Independent reviewer passes are a simple way to make agent judgment more inspectable. One pass looks for clear school leads, another guards against false positives, and another protects ambiguity.",
  "classification:4.3": "Reconciliation is where the review becomes data. The agent turns notes into a row-level CSV, but it also has to explain disagreements and keep ambiguous records visible in the audit.",
  "classification:4.4": "Reading the audit before building the panel keeps the human in the loop. It makes clear which rows are safe to use, which rows are excluded, and which calls should go back to the PI.",
  "panel:5.1": "Start by turning the source files, prior audit, classification caveats, and crosswalk rules into a build contract. The contract should make timing, matching, exclusions, and audit expectations visible before code exists.",
  "panel:5.2": "Create the script from that contract, then run it in a separate turn. The important report is not just whether the script finished, but what rows, years, matches, exclusions, and caveats it produced.",
  "panel:5.3": "Inspect the panel like a research artifact. Shape, duplicate keys, timing rules, cumulative lead status, unmatched names, and visible human-review rows all affect whether the dataset is safe to use downstream.",
  "audits:6.1": "Start with what the panel can actually support. The review note should name the constructed variables, available meal outcomes, caveats, unresolved matches, and any human-review cases before anyone writes a PI update.",
  "audits:6.2": "The PI update is the handoff artifact. It should be concise, practical, and honest about what the panel is ready for without treating unresolved judgment calls as settled facts.",
  "causal-analysis:7.1": "The follow-up email adds a new request and a new source file without replacing the old project. Saving and summarizing it first keeps the PI's actual question visible before code or model choices enter.",
  "causal-analysis:7.2": "The survey inspection is the intake pass for the new source. It checks unit, keys, coverage, and missingness before the file touches the panel.",
  "causal-analysis:7.3": "The survey merge should feel like ordinary research work: add the new source, preserve the row universe, and write down coverage and interpretation caveats.",
  "causal-analysis:7.4": "The panel check is the research-design pause. It asks whether the expanded data contain the right years, meal and wellbeing outcomes, and comparison structure before any first-pass estimate is produced.",
  "causal-analysis:7.5": "The first-pass script should be useful but modest: descriptive summaries, plots where helpful, and exploratory regressions only when the panel check says they are reasonable.",
  "causal-analysis:7.6": "Inspection comes immediately after the run. The point is to treat generated regressions as drafts that need interpretation, code review, and skepticism before they become research claims.",
  "causal-analysis:7.7": "The final update turns analysis back into communication. A good PI note separates descriptive patterns, tentative regression evidence, unsupported stronger designs, and the assumptions that would need real validation."
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
