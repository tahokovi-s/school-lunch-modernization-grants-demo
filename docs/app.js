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
    id: "context",
    title: "Context Before Coding",
    tag: "Context",
    readOnly: true,
    body: [
      "Before anyone creates files, pause for the shape of the research task. We are not asking the agent to \"clean the data\" in one leap. We are trying to build an auditable school-year panel: one row per school per year, with modernization grant receipt, grant amounts, meal outcomes, and clear notes about the judgment calls behind the variables.",
      "The hard part is not that the agent needs elaborate instructions to find files. The hard part is that the raw materials describe different things. A school directory names schools and districts. Grant records describe awards. Cafeteria partner-role rows mix school leads, district offices, vendors, advisors, and ambiguous partners. If we let those distinctions disappear too early, the final panel may look clean while hiding the decisions that produced it.",
      "So the habit for this workshop is simple: before asking the agent to act, tell it what evidence to use, what one artifact to produce, and where to stop. The stop point is usually where human judgment begins: matching names, deciding whether a role really indicates school meal-program leadership, or relying on a merged output.",
      "You do not need to memorize a framework. Just keep one question in mind as we move through the modules: what would I need to inspect before trusting the next file?"
    ],
    contextTitle: "What To Notice",
    contextBlocks: [
      {
        type: "figure",
        src: "assets/generated/raw_role_distribution.svg?v=20260527-school-lunch",
        alt: "Bar chart of the most common raw cafeteria partner role labels before classification.",
        caption: "This is why we do not ask for a final `MealProgramLead` variable right away. The role labels are evidence to inspect, not categories to trust automatically."
      },
      {
        type: "miniTable",
        title: "A Useful Prompt Shape",
        columns: ["Include", "What it does", "Example"],
        rows: [
          ["Evidence", "Anchors the request in something real.", "Use the saved PI email as the source of truth."],
          ["One action", "Keeps the agent from solving three future steps at once.", "Create the handoff summary."],
          ["Expected artifact", "Makes the output inspectable.", "Write `docs/email_handoff_summary.md`."],
          ["Stop point", "Keeps judgment-heavy work visible.", "Do not unzip data, classify rows, write code, or build the panel yet."]
        ]
      }
    ],
    commands: [],
    promptTitle: "Two Prompts We Will Reuse",
    prompts: [
      "Before changing files, report the active workspace root. Then tell me where the PI email, raw ZIP, handoff summary, scripts, audit notes, analysis-ready data, and final outputs should live. Stop after the folder plan; do not inspect data, unzip files, classify rows, write code, or build the panel.",
      "When the saved PI email is at docs/pi_assignment_email.pdf, read it as the source of truth and create docs/email_handoff_summary.md with the PI request, required inputs, deliverables, open questions, assumptions, and judgment calls. Do not inspect or unzip the raw data yet."
    ]
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
    substepTitle: "Module 3 Steps",
    substeps: [
      {
        number: "3.1",
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
        number: "3.2",
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
                  "I attached the raw materials I have so far. They are not cleaned or documented beyond what is in the files, so please treat this as exploratory. I expect school and district names, grant records, equipment descriptions, and cafeteria partner role labels to be messy, and some judgment will be needed before we can say anything confidently.",
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
                    href: "assets/generated/pi_assignment_email.pdf?v=20260527-school-lunch",
                    download: "pi_assignment_email.pdf",
                    action: "Download email PDF"
                  },
                  {
                    label: "Raw data ZIP",
                    text: "Download this unchanged ZIP now. You will move it into school_lunch_modernization_grants/data/original/ once the project folder exists.",
                    href: "attachments/school_lunch_modernization_raw_data.zip",
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
        number: "3.3",
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
        number: "3.4",
        title: "Reopen The Project Folder",
        text: "Open a new or current Codex project from the existing folder school_lunch_modernization_grants. From this point on, paths like docs/ and data/original/ should refer to the research project, not My_RA_Tasks.",
        materials: [
          { label: "Check before continuing", text: "The folder shown in Codex should be school_lunch_modernization_grants. My_RA_Tasks is only the outer workspace." }
        ]
      },
      {
        number: "3.5",
        title: "Move Source Materials Into The Project",
        text: "Move or save the downloaded email PDF into docs/ and the raw-data ZIP into data/original/. Leave the ZIP unchanged and note the exact email filename so you can reference it in Codex with @.",
        materials: [
          { label: "Email destination", text: "school_lunch_modernization_grants/docs/pi_assignment_email.pdf" },
          { label: "ZIP destination", text: "school_lunch_modernization_grants/data/original/school_lunch_modernization_raw_data.zip" }
        ]
      },
      {
        number: "3.6",
        title: "Summarize The PI Request",
        text: "Ask Codex to read the saved PI email and create a concise handoff summary before coding begins. The prompt uses the workshop filename; if your saved email has a different name, use @ to select your actual file before sending.",
        materials: [
          { label: "Input email", text: "@docs/pi_assignment_email.pdf, or your actual saved assignment email file selected with @" },
          { label: "Output file", text: "docs/email_handoff_summary.md" }
        ],
        prompts: [
          {
            label: "Summarize the PI email",
            text: "Use the saved PI assignment email as the source of truth for this project.\n\nAssignment email: @docs/pi_assignment_email.pdf\n\nRead the saved email artifact and create docs/email_handoff_summary.md. Include the sender, subject, PI request, research objective, required inputs, expected deliverables, action items, open questions, assumptions, and judgment calls.\n\nIf the email is missing or unreadable, stop and tell me. Do not inspect or unzip the raw data yet."
          }
        ]
      },
      {
        number: "3.7",
        title: "Create Project Memory Files",
        text: "With the source email and handoff summary inside the project, ask Codex to create the README and agent-instruction files that will anchor future turns. These files are project memory, not analysis output.",
        materials: [
          { label: "Input context", text: "@docs/pi_assignment_email.pdf plus docs/email_handoff_summary.md" },
          { label: "Guide files", text: "README.md, AGENTS.md for Codex, and CLAUDE.md for Claude Code" }
        ],
        prompts: [
          {
            label: "Create project memory files",
            text: "Read @docs/pi_assignment_email.pdf and docs/email_handoff_summary.md. Treat the saved PI email as the source of truth. If the handoff summary conflicts with the email, trust the email and note the mismatch.\n\nWorking in the current project root, create README.md, AGENTS.md, and CLAUDE.md.\n\nREADME.md should briefly summarize the research objective, expected original inputs, expected analysis-ready output, and the rule that audit notes are part of the deliverable.\n\nAGENTS.md and CLAUDE.md should tell coding agents to read the email and handoff before coding, preserve raw inputs, inspect before building outputs, keep work auditable, and ask before treating ambiguous cafeteria partner roles as confirmed school leads.\n\nKeep the files concise. Do not inspect or unzip the raw data yet."
          }
        ]
      }
    ],
    commandTitle: "Do In The Apps",
    commands: [],
    prompts: [],
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
      "At this point, the PI email, raw-data ZIP, and project memory are saved in the project. Now open the ZIP and make the raw evidence legible before asking anyone to classify rows.",
      "This pass leaves behind three things: preliminary notes on the raw files, a conservative cafeteria-partner rubric, and a review plan for row-level classification. It does not create cleaned data, row-level classifications, code, or the school-year panel."
    ],
    contextTitle: "Artifacts From This Pass",
    contextBlocks: [
      {
        type: "miniTable",
        columns: ["Artifact", "Purpose", "What to check"],
        rows: [
          ["docs/raw_data_preliminary_pass.md", "Raw-file inspection notes.", "CSV files, row counts, likely keys, aliases, and messy role labels."],
          ["docs/cafeteria_partner_classification_rubric.md", "Decision rules for cafeteria partner roles.", "Allowed categories, concrete examples, and ambiguity triggers."],
          ["docs/cafeteria_partner_subagent_review_plan.md", "Handoff for the role-classification review passes.", "Evidence rules, disagreement handling, and row-count accounting."]
        ]
      }
    ],
    substepTitle: "Module 4 Steps",
    substeps: [
      {
        number: "4.1",
        title: "Inspect The Raw Files",
        text: "Use the raw ZIP at data/original/school_lunch_modernization_raw_data.zip. This pass should make the files understandable: what is in each CSV, how rows are counted, where joins may happen, and which partner-role cases need human judgment.",
        prompts: [
          {
            label: "Raw Data Inspection",
            text: "Inspect the raw-data ZIP at data/original/school_lunch_modernization_raw_data.zip.\n\nExtract it into data/original/ while preserving the ZIP. Then create docs/raw_data_preliminary_pass.md summarizing:\n\n- which CSV files are present and their row counts\n- what each CSV appears to contain and its likely unit of observation\n- likely keys and relationships between files\n- school or district aliases that could affect matching\n- cafeteria partner-role cases that may need human judgment\n\nFocus on inspection only for now; classification and panel-building come later."
          }
        ]
      },
      {
        number: "4.2",
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
        number: "4.3",
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
    checks: [
      "docs/raw_data_preliminary_pass.md identifies files, row counts, likely keys, aliases, messy role labels, and rows needing review.",
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
    substepTitle: "Module 5 Steps",
    substeps: [
      {
        number: "5.1",
        title: "Convene The Review Team",
        text: "Ask the agent to read the rubric and review plan, then restate how the subagent classification will work.",
        prompts: [
          { label: "Prompt to copy", text: "Read docs/cafeteria_partner_classification_rubric.md and docs/cafeteria_partner_subagent_review_plan.md. Before classifying rows, restate the reviewer roles, the allowed role_category values, the conservative default rule, and the output files we need. Do not write or run a classification script." }
        ]
      },
      {
        number: "5.2",
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
        number: "5.3",
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
        number: "5.4",
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
    checks: [
      "Reviewer roles are visible before classification.",
      "The analysis-ready classification CSV has one row per original role row.",
      "Ambiguous rows are not silently forced into school lead status.",
      "The audit trail records reviewer disagreements and human-review rows."
    ]
  },
  {
    id: "panel",
    title: "Build The School-Year Panel",
    step: "Turn messy inputs into analysis-ready rows",
    tag: "Panel",
    body: [
      "The panel builder reads the school directory, modernization grant awards, and the subagent-reviewed partner role classifications. It creates one school-year row for each school from 2019 through 2024.",
      "The final variables are intentionally plain: school name, year, district, grade span, urbanicity, enrollment, lunch participation, healthy-meal score, grant recipient indicator, meal-program lead indicator, and grant amount."
    ],
    substepTitle: "Module 6 Steps",
    substeps: [
      {
        number: "6.1",
        title: "Confirm The Inputs",
        text: "Before running the panel builder, ask Codex to confirm that the raw files and reviewer-pass classification artifact are ready.",
        materials: [
          { label: "Required input", text: "data/original/school_directory.csv" },
          { label: "Required input", text: "data/original/school_lunch_modernization_grant_awards.csv" },
          { label: "Required input", text: "data/analysis_ready/cafeteria_partner_role_classifications.csv" }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Before building the school-year panel, confirm that these inputs exist:\n\n- data/original/school_directory.csv\n- data/original/school_lunch_modernization_grant_awards.csv\n- data/analysis_ready/cafeteria_partner_role_classifications.csv\n\nThen read audit_notes/cafeteria_partner_role_classification_audit.md and summarize:\n\n- how the reviewer passes created the classification file\n- which role_category values count as confirmed school meal-program leads\n- which categories are excluded\n- what human-review caveats should carry forward\n\nDo not run the panel builder yet."
          }
        ]
      },
      {
        number: "6.2",
        title: "Create The Panel Script",
        text: "Have Codex explain the panel-building plan first, then write the Python script in a separate message.",
        sequenceNote: "Send these as two separate Codex messages. First ask for the plan and wait for the explanation. Then ask Codex to write the script. Do not run the script until step 6.3.",
        prompts: [
          {
            label: "Explain plan prompt",
            text: "Before writing code, explain the panel-building logic in beginner-friendly language.\n\nThe script will read:\n\n- data/original/school_directory.csv\n- data/original/school_lunch_modernization_grant_awards.csv\n- data/analysis_ready/cafeteria_partner_role_classifications.csv\n\nThe script should write:\n\n- data/analysis_ready/school_year_panel.csv\n- audit_notes/build_school_year_panel_audit.md\n\nCover:\n\n- which years should be included\n- how school aliases and district name variants should be matched\n- how ModernizationGrantRecipient and ModernizationGrantAmount should be created\n- how MealProgramLead should use data/analysis_ready/cafeteria_partner_role_classifications.csv\n- how ambiguous or non-lead categories should be excluded from the lead indicator\n\nFlag any missing input or risky assumption.\n\nDo not write code yet."
          },
          {
            label: "Write script prompt",
            text: "Now create scripts/build_school_year_panel.py using the plan above.\n\nUse clear, beginner-friendly code and comments.\n\nThe script should read:\n\n- data/original/school_directory.csv\n- data/original/school_lunch_modernization_grant_awards.csv\n- data/analysis_ready/cafeteria_partner_role_classifications.csv\n\nThe script should write:\n\n- data/analysis_ready/school_year_panel.csv\n- audit_notes/build_school_year_panel_audit.md\n\nDo not run the script yet."
          }
        ]
      },
      {
        number: "6.3",
        title: "Build The Panel",
        text: "Ask Codex to run the panel builder and report the files it creates.",
        prompts: [
          { label: "Prompt to copy", text: "Run scripts/build_school_year_panel.py. If it fails, explain the error and which input needs attention before changing code. If it succeeds, tell me which files were created or updated and give a short summary of what the panel contains." }
        ]
      },
      {
        number: "6.4",
        title: "Inspect The Output And Audit",
        text: "End the module by checking the analysis-ready panel and the audit trail before using the file downstream.",
        materials: [
          { label: "Output file", text: "data/analysis_ready/school_year_panel.csv" },
          { label: "Audit file", text: "audit_notes/build_school_year_panel_audit.md" }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Inspect these files:\n\n- data/analysis_ready/school_year_panel.csv\n- audit_notes/build_school_year_panel_audit.md\n\nGive me five sanity checks:\n\n- one row per school-year\n- expected years are 2019-2024\n- ModernizationGrantAmount is zero-filled when no award occurred\n- MealProgramLead turns on cumulatively after the first confirmed school lead year\n- ambiguous cafeteria partner rows are excluded from the lead indicator\n\nAlso list any unmatched names or rows that still need human review."
          }
        ]
      }
    ],
    commandTitle: "Ask The Agent To Build",
    commands: [],
    prompts: [],
    checks: [
      "The subagent-reviewed classification CSV exists before the panel build.",
      "Alias matching and classification rules have been explained before running code.",
      "Panel has one row per school-year.",
      "Grant amounts are zero-filled when no award occurred.",
      "MealProgramLead is cumulative through the panel year and excludes ambiguous rows."
    ]
  },
  {
    id: "payoff",
    title: "Before And After: What The Agentic Workflow Fixed",
    tag: "Payoff",
    readOnly: true,
    body: [
      "After the panel build, you can see the payoff directly: messy raw inputs become a structured school-year panel with audit notes that preserve uncertainty.",
      "Use this read-only module as the bridge between the coding work and the PI-facing update."
    ],
    contextTitle: "Payoff Slides",
    contextSlides: [
      {
        title: "Clean Output Snapshot",
        lead: "The cleaned file now has a stable school-year shape and visible caveats.",
        blocks: [
          {
            type: "statCards",
            cards: [
              { label: "Panel Rows", value: "360", note: "60 schools times six years, 2019-2024." },
              { label: "Grant Total", value: "$11.72M", note: "The panel total excludes four unmatched raw award rows that need audit attention." },
              { label: "Grant Rows", value: "73", note: "School-year rows where a matched school received a modernization award." },
              { label: "Meal Lead Rows", value: "166", note: "School-year rows after the first confirmed school lead year." },
              { label: "Both Signals Rows", value: "55", note: "School-year rows with both grant and meal-program lead indicators on." },
              { label: "Ambiguous Rows Preserved", value: "24", note: "Ambiguous partner rows remain visible for human review rather than becoming confirmed school leads." }
            ]
          }
        ]
      },
      {
        title: "Before And After",
        lead: "The workflow changes the shape of the evidence without hiding judgment calls.",
        blocks: [
          {
            type: "figure",
            src: "assets/generated/before_after_summary.svg?v=20260527-school-lunch",
            alt: "Two-column summary comparing raw inputs before the workflow and cleaned outputs after the workflow.",
            caption: "The point is not that the agent magically removes human judgment. The point is that it helps organize the work so the judgment calls are visible."
          }
        ]
      },
      {
        title: "Panel Measures By Year",
        lead: "Every school appears in every year, so year-by-year patterns are easier to inspect.",
        blocks: [
          {
            type: "figure",
            src: "assets/generated/panel_by_year.svg?v=20260527-school-lunch",
            alt: "Chart showing grant recipients, meal-program leads, and grant amount by panel year.",
            caption: "The cleaned panel makes year-by-year comparisons possible because every school appears in every year."
          }
        ]
      },
      {
        title: "What Changed",
        lead: "Use the before/after comparison to explain the value of the workflow.",
        blocks: [
          {
            type: "miniTable",
            columns: ["Before", "After"],
            rows: [
              ["Raw grant records are award-level and use school-name strings.", "The panel is school-year level with matched school names."],
              ["Missing award years are absent from the raw award file.", "No-award school-years appear with ModernizationGrantAmount set to zero."],
              ["Raw role labels mix school leads with vendors, suppliers, advisors, education partners, and ambiguous helpers.", "Classified role categories separate confirmed school leads from excluded and ambiguous rows."],
              ["Unmatched names and ambiguous rows can disappear if no audit is kept.", "Audit notes preserve what still needs human review."]
            ]
          }
        ]
      }
    ],
    commands: [],
    prompts: []
  },
  {
    id: "audits",
    title: "Audit Trails And PI Update",
    step: "Make uncertainty visible",
    tag: "Review",
    body: [
      "The audit files are part of the output, not an afterthought. They show row counts, classification counts, unmatched names, and rows that should be reviewed by a human.",
      "End by turning the audit into a PI update. This makes the workflow feel like a real predoc handoff rather than just a code exercise."
    ],
    commandTitle: "Open In The App",
    commands: [
      "audit_notes/cafeteria_partner_role_classification_audit.md",
      "audit_notes/build_school_year_panel_audit.md",
      "data/analysis_ready/school_year_panel.csv"
    ],
    prompts: [
      "Based on the audit files, draft a short note to the PI explaining what is complete and what needs judgment.",
      "Create a concise seminar recap: what Codex did, what the human checked, and what would change with real state grant, meal-claim, procurement, and student outcome data."
    ],
    checks: [
      "Human review points are explicit.",
      "No ambiguous case is treated as confirmed school lead status.",
      "The demo ends with a human-readable PI update."
    ]
  },
  {
    id: "causal-analysis",
    title: "Regression Analysis And Causal Inference",
    step: "One-shot the analysis suite, then inspect what happened",
    tag: "Analysis",
    body: [
      "Suppose your PI has written again: the panel is ready, and a clear 2022 scoring change gave priority to applications for scratch-cooking equipment, cold storage, and healthier serving-line infrastructure. That creates an opportunity to run a fast but cautious regression and causal-inference pass.",
      "The point is to show that agentic coding tools can make data analysis very fast, while humans still keep an eye on the research design, code, model assumptions, outputs, and caveats."
    ],
    contextTitle: "New PI Follow-Up Email",
    contextBlocks: [
      {
        type: "email",
        from: "The Hon. Dr. Sir Jensen Ahokovi, PhD, MA, BA.",
        to: "STAX Predoc Team",
        subject: "Follow-up on the 2022 school lunch grant scoring change",
        date: "Thursday, March 14, 2024 at 3:42 PM",
        paragraphs: [
          "Hi team,",
          "Thanks for putting together the school-year panel and the notes. This is very helpful, and I think it may be enough for a first analysis pass.",
          "One more thing: I confirmed that the state changed the modernization grant scoring in 2022. After the change, applications tied to scratch-cooking equipment, cold storage, and healthier serving-line infrastructure received a clearer priority. That gives us a real policy break to work with.",
          "If the change had bite, I would expect to see something like more schools receiving grants, larger grant amounts, or improvements in lunch participation and healthy-meal scores after 2022. It may also matter whether schools had already shown meal-program leadership before the scoring change.",
          "Could you take a first pass at whether the panel shows anything along those lines? Please use your judgment about the exact comparisons. Pre/post patterns, plots, and some regression-style checks would be useful, but I do not want to force one specification too early.",
          "I mostly want to know whether there is anything promising here, what the first-pass estimates look like, and what we would need to check before taking the result seriously.",
          "Thanks,",
          "The Hon. Dr. Sir Jensen Ahokovi, PhD, MA, BA.",
          "Professor of Accounting, Public Policy, and School Meals",
          "STAX Lab"
        ],
        actions: [
          { label: "Download email PDF", href: "assets/generated/pi_followup_causal_inference_email.pdf?v=20260527-followup-pi", download: "pi_followup_causal_inference_email.pdf" }
        ]
      }
    ],
    substepTitle: "Module 9 Steps",
    substeps: [
      {
        number: "9.1",
        title: "Download And Save The Follow-Up Email",
        text: "Download the follow-up email PDF and save it into the project docs/ folder, next to the original PI assignment email. Keep track of the exact filename so you can reference it in Codex with the @ command.",
        materials: [
          { label: "Email file", text: "pi_followup_causal_inference_email.pdf" },
          { label: "Destination", text: "school_lunch_modernization_grants/docs/" }
        ],
        links: [
          { label: "Download email PDF", href: "assets/generated/pi_followup_causal_inference_email.pdf?v=20260527-followup-pi", download: "pi_followup_causal_inference_email.pdf" }
        ]
      },
      {
        number: "9.2",
        title: "Create The Follow-Up Handoff Summary",
        text: "Ask Codex to read the saved follow-up email and turn it into a concise analysis handoff before any regression code is written. The prompt uses the workshop follow-up filename; if yours differs, select your actual file with @ before sending.",
        materials: [
          { label: "Input email", text: "@docs/pi_followup_causal_inference_email.pdf, or your actual saved follow-up email file selected with @" },
          { label: "Output file", text: "docs/school_lunch_analysis_handoff_summary.md" }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "My PI sent a follow-up analysis request after we built the school-year panel.\n\nFollow-up email: @docs/pi_followup_causal_inference_email.pdf\n\nRead the saved email as the source of truth and create docs/school_lunch_analysis_handoff_summary.md.\n\nInclude:\n\n- what changed since the original assignment\n- the policy change and timing described in the email\n- the analysis-ready input file Codex should use\n- the requested regression and causal-inference strategies\n- expected tables, figures, code, and audit-note outputs\n- assumptions, causal caveats, and human-review points\n\nDo not write analysis code yet."
          }
        ]
      },
      {
        number: "9.3",
        title: "Review The Research Design Before Coding",
        text: "Have Codex explain the proposed causal strategies in plain language so the human can inspect the assumptions before the one-shot analysis run.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Read docs/school_lunch_analysis_handoff_summary.md and inspect the columns in data/analysis_ready/school_year_panel.csv.\n\nBefore writing code, propose a beginner-friendly analysis plan.\n\nCover:\n\n- the outcome variables\n- the 2022 post-expansion indicator\n- how to define pre-expansion meal-program leadership using only information available before 2022\n- descriptive pre/post summaries\n- simple regression specifications\n- difference-in-differences style specifications\n- event-study style checks around 2022\n- robustness checks and diagnostic tables\n- what assumptions would need to hold for a causal interpretation\n- what results should be treated as exploratory rather than causal proof\n\nFlag missing variables, weak assumptions, or risks before writing code."
          }
        ]
      },
      {
        number: "9.4",
        title: "One-Shot The Analysis Suite",
        text: "Give Codex one larger analysis request: write the script, run it, and produce tables, figures, and an audit note. The request is broad on purpose, but it still requires transparent outputs.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Create and run scripts/run_school_lunch_causal_analysis_suite.py using the plan above.\n\nGoal:\nRun a full but clearly provisional analysis suite from data/analysis_ready/school_year_panel.csv.\n\nThe script should:\n\n- load and validate the panel\n- construct PostExpansion for years 2022 and later\n- construct a pre-expansion meal-program leadership variable using only information available before 2022\n- analyze ModernizationGrantRecipient, ModernizationGrantAmount, lunch_participation_rate, and healthy_meal_score\n- produce descriptive pre/post summaries\n- run simple regression models\n- run difference-in-differences style models\n- run event-study style checks around 2022\n- add robustness checks with enrollment, district, grade-span, and urbanicity controls when feasible\n- avoid claiming causal proof from this sample dataset\n\nOutput files:\n\n- final_outputs/school_lunch_descriptive_summary.csv\n- final_outputs/school_lunch_regression_results.csv\n- final_outputs/school_lunch_event_study_coefficients.csv\n- final_outputs/school_lunch_event_study.svg\n- audit_notes/school_lunch_causal_analysis_audit.md\n\nImplementation rules:\n\n- Use pandas and standard Python first.\n- Use statsmodels only if it is already available; do not install packages without asking.\n- If a model cannot be estimated cleanly, write that limitation into the audit note instead of hiding it.\n- Keep the code beginner-readable.\n\nAfter running the script, summarize which outputs were created and the main caveats."
          }
        ]
      },
      {
        number: "9.5",
        title: "Inspect The Code And Results",
        text: "Slow down after the one-shot run. Ask Codex to explain the code, the model choices, and the outputs before treating any estimate as useful.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Inspect these files:\n\n- scripts/run_school_lunch_causal_analysis_suite.py\n- final_outputs/school_lunch_descriptive_summary.csv\n- final_outputs/school_lunch_regression_results.csv\n- final_outputs/school_lunch_event_study_coefficients.csv\n- audit_notes/school_lunch_causal_analysis_audit.md\n\nGive me a human review memo with:\n\n- what each specification is trying to estimate\n- which assumptions are strongest\n- whether the pre/post and event-study patterns look plausible\n- whether any results changed across robustness checks\n- which parts of the code deserve closer inspection\n- what should not be described as causal evidence yet"
          }
        ]
      },
      {
        number: "9.6",
        title: "Draft The PI Analysis Update",
        text: "Turn the fast analysis pass into a cautious PI-facing update that separates findings from assumptions and caveats.",
        materials: [{ label: "Output file", text: "final_outputs/school_lunch_analysis_pi_update.md" }],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Using the school lunch analysis outputs and audit note, draft final_outputs/school_lunch_analysis_pi_update.md.\n\nThe update should include:\n\n- what analysis Codex ran\n- what the main descriptive patterns show\n- what the regression and causal-inference style checks suggest\n- why the results should be treated as exploratory\n- which assumptions or data limitations matter most\n- what a human researcher should review next\n\nKeep the tone concise and PI-facing. Do not overstate causal conclusions."
          }
        ]
      }
    ],
    commandTitle: "Ask The Agent To Analyze",
    commands: [],
    prompts: [],
    checks: [
      "The follow-up email PDF has been saved into docs/ and can be referenced with @.",
      "Codex created docs/school_lunch_analysis_handoff_summary.md before writing analysis code.",
      "The research design was explained before the one-shot script was written.",
      "The analysis suite produced tables, a figure, code, and an audit note.",
      "A human review memo identifies assumptions, code areas to inspect, and results that should not be oversold.",
      "The PI update separates exploratory findings from causal claims."
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
    checks: [
      "The selected optional skill names are define-goal, openai-docs, pdf, and jupyter-notebook.",
      "Codex is told not to install any other skills.",
      "Codex explains any user-level or Global settings change before installing skills.",
      "Codex is restarted after any new skill install."
    ]
  }
];

const moduleNarrativeCopy = {
  context: "Move slowly here before creating files. You are learning how to brief and supervise a coding agent: give it source-of-truth context, ask for a plan, review the assumptions, verify the output, and preserve judgment calls in an audit trail.",
  handoff: "Use this as the intake pass. By the end, the source email, raw ZIP, handoff summary, and project memory files should be in the project root, and Module 4 can begin raw-data inspection.",
  "raw-data": "Use this as the data intake pass. Open the saved ZIP, inventory the CSVs, and turn the messy role evidence into rules before classification starts.",
  classification: "This is the judgment-heavy part of the workflow. Use the agent to organize independent reviews, cite row-level evidence, and keep uncertain cases out of the analysis variables instead of pretending ambiguity disappeared.",
  panel: "The panel build is the payoff for the careful setup. By this point the agent has enough context, raw-file knowledge, and audit constraints to write a small script that turns scattered records into a school-year dataset you can actually inspect.",
  payoff: "Take a breath after the build and look at the before-and-after view. You can see how scaffolding, inspection, classification, and auditing add up to something more useful than a single generated file.",
  audits: "The audit handoff brings your judgment back to the center. The files are not just artifacts from the agent; they are evidence about what the agent did, where it used judgment, and what still needs a researcher to decide.",
  "causal-analysis": "In the final research module, look for both the power and the danger of speed. Once the panel exists, an agent can produce a broad analysis suite quickly, but keep your emphasis on assumptions, timing, model choices, and what should not be oversold.",
  resources: "This closing module is optional. Use it as a path to keep learning without making skill installation or extra tooling a requirement for the main research workflow."
};

const substepNarrativeCopy = {
  "setup:1.1": "Keep this check deliberately simple: make sure the two coding apps open and respond before you start solving a research problem with them. If access is broken, it is much easier to fix it here than halfway through a data task.",
  "setup:1.2": "Python is the engine underneath the later workshop steps. Codex can write and run friendly scripts, but it needs a working Python installation before it can unzip files, inspect CSVs, regenerate figures, and build the panel.",
  "setup:1.3": "Let Codex do the technical confirmation in plain language. You get a first low-stakes interaction with the app, and the agent reports what it checked without asking you to memorize terminal commands.",
  "setup:1.4": "Wait on the project folder for now. You will create the same outer workspace during the live walkthrough, which keeps path names less mysterious when the agent starts creating files.",
  "handoff:3.1": "Start with a plain outer folder before the source materials enter the workflow. Opening My_RA_Tasks in Codex gives the app a workspace while leaving room for the actual research project folder inside it.",
  "handoff:3.2": "The PI email and raw ZIP are the project evidence. The guide page delivers them, but the saved files become what later agent turns should read and preserve.",
  "handoff:3.3": "This is the first place to combine planning and action. Have the agent explain the folder logic briefly, create the project folder, and stop before it inspects data or starts making research decisions.",
  "handoff:3.4": "Once the project folder exists, switch Codex into it and confirm the folder shown in the app. This small move prevents confusion about whether docs/ and data/original/ refer to the outer workspace or the project.",
  "handoff:3.5": "Now the downloaded materials become part of the project record. Keeping the ZIP unchanged and storing the email in docs/ makes it clear which files are original evidence and which files the agent creates later.",
  "handoff:3.6": "The email handoff summary is the first derived memory file. It asks the agent to translate an informal PI message into action items, open questions, deliverables, and judgment calls before any code exists.",
  "handoff:3.7": "The project memory files give future agent turns stable context. They tell Codex and Claude Code to read the source materials first, inspect before coding, preserve audit notes, and be conservative with ambiguous roles.",
  "raw-data:4.1": "Start with a plain inventory of the raw files. The useful output is a note that names the CSVs, row counts, likely keys, aliases, and partner-role cases that need judgment.",
  "raw-data:4.2": "The rubric is where judgment becomes a rule, not a row-level assignment. It should say which evidence supports each category and when a case should remain ambiguous.",
  "raw-data:4.3": "The review plan is the handoff to row-level classification. It should define the separate passes, how disagreements are handled, and how every original role row will be accounted for.",
  "classification:5.1": "Start classification with a verbal contract. Ask the agent to restate the categories, outputs, and conservative default before touching rows, so you can correct the rules while they are still easy to change.",
  "classification:5.2": "Independent reviewer passes are a simple way to make agent judgment more inspectable. One pass looks for clear school leads, another guards against false positives, and another protects ambiguity.",
  "classification:5.3": "Reconciliation is where the review becomes data. The agent turns notes into a row-level CSV, but it also has to explain disagreements and keep ambiguous records visible in the audit.",
  "classification:5.4": "Reading the audit before building the panel keeps the human in the loop. It makes clear which rows are safe to use, which rows are excluded, and which calls should go back to the PI.",
  "panel:6.1": "Do not start the panel build until the inputs are known and the classification caveats are fresh. Have the agent check that it has the right raw files and the right analysis-ready classification.",
  "panel:6.2": "Ask for the plan before the script so the code is easier to trust. You should see the matching logic, year range, zero-filling rule, and exclusion rule before the agent writes anything.",
  "panel:6.3": "Running the script is the mechanical part, but it still needs a clear report. Ask the agent to say what it created and what the panel contains instead of leaving you to guess.",
  "panel:6.4": "Use this sanity check to inspect output instead of merely accepting it. Row counts, year coverage, zero-filled amounts, cumulative indicators, and unmatched names are the first things to look at.",
  "causal-analysis:9.1": "The follow-up email introduces a new research task without replacing the old one. Saving it beside the original assignment lets the agent see how the project evolved from data cleaning into analysis.",
  "causal-analysis:9.2": "The analysis handoff gives the agent a chance to separate the new policy question from the earlier panel-building work. It also forces the expected outputs and causal caveats into writing before code appears.",
  "causal-analysis:9.3": "This research-design pause is the most important guardrail in the fast analysis module. It asks the agent to explain outcomes, timing, exposure, comparisons, and assumptions before it produces estimates.",
  "causal-analysis:9.4": "The one-shot suite is intentionally ambitious so you can see what speed feels like. The prompt still requires transparent outputs, readable code, and caveats when a model is too fragile for the sample data.",
  "causal-analysis:9.5": "Inspection comes immediately after the fast run. The point is to treat generated regressions as drafts that need interpretation, code review, and skepticism before they become research claims.",
  "causal-analysis:9.6": "The final update turns analysis back into communication. A good PI note separates descriptive patterns, tentative regression evidence, and the assumptions that would need real validation."
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

const inlineCodeRefPattern = /(?:@?(?:[A-Za-z0-9_.-]+\/)+(?:[A-Za-z0-9_.@-]+)?|(?:[A-Za-z0-9_-]+\.)+(?:csv|zip|pdf|md|py|svg|json|html|toml|eml|txt)|\.[A-Za-z][A-Za-z0-9_-]*|\/skills|\$skill-installer|\b(?:My_RA_Tasks|school_lunch_modernization_grants|README\.md|AGENTS\.md|CLAUDE\.md|ModernizationGrantRecipient|ModernizationGrantAmount|MealProgramLead|PostExpansion|EverGrantToDate|role_category|school_id|school_name|award_year|record_id)\b)/g;

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

function agentHelpForSubstep(substep) {
  const titleAndText = `${substep.title || ""} ${substep.text || ""}`.toLowerCase();
  const hasPrompt = (substep.prompts || []).length > 0;

  if (hasPrompt) {
    return "Codex helped by taking a bounded request, reading the referenced project context, and producing an explanation, file, or review artifact you could inspect before moving on.";
  }

  if (titleAndText.includes("open") || titleAndText.includes("reopen")) {
    return "This made the agent useful by putting Codex in the right working folder, so later prompts could use project-relative paths without confusion.";
  }

  if (titleAndText.includes("download") || titleAndText.includes("save") || titleAndText.includes("move")) {
    return "This made the later agent work concrete: once the materials were saved in predictable paths, Codex could read and reference the same evidence you were using.";
  }

  if (titleAndText.includes("create") || titleAndText.includes("confirm")) {
    return "This gave the agent a stable starting point, so the next generated files and checks were anchored in the actual project instead of a vague task description.";
  }

  return "The agentic tool helped by keeping the next action concrete, inspectable, and tied to the project files instead of a loose to-do list.";
}

function recapItemsForModule(module) {
  if ((module.substeps || []).length) {
    return module.substeps.map((substep) => ({
      number: substep.number,
      title: substep.title,
      motivation: substep.intro || "This step kept the workflow moving in a deliberate order, with context and checks before downstream work.",
      agentHelp: agentHelpForSubstep(substep),
      summary: substep.text
    }));
  }

  const items = [];
  if ((module.commands || []).length) {
    items.push({
      number: "Review",
      title: module.commandTitle || "Open The Key References",
      motivation: "You needed to return to the concrete files or links that anchor the module, because the work is only trustworthy if the source artifacts are easy to inspect.",
      agentHelp: "Codex helped by working from explicit file paths and references, which let it inspect the same artifacts you would cite in a handoff.",
      summary: `You opened or referenced ${module.commands.join(", ")}.`
    });
  }

  if ((module.prompts || []).length) {
    items.push({
      number: "Synthesis",
      title: module.promptTitle || "Turn The Work Into A Handoff",
      motivation: "The last move was to translate the technical artifacts into a human-readable next step, so the project did not end as a pile of files.",
      agentHelp: "Codex helped by drafting from the project evidence and turning scattered outputs into concise language you could review and revise.",
      summary: "You used the prompt cards to ask for a short update, recap, or optional setup follow-through."
    });
  }

  return items;
}

function renderModuleRecap(module) {
  const shouldShowRecap = (module.checks || []).length > 0;
  const band = document.querySelector("#moduleRecapBand");
  const container = document.querySelector("#moduleRecapList");
  if (!band || !container) return;

  container.innerHTML = "";
  band.hidden = !shouldShowRecap;
  if (!shouldShowRecap) return;

  const intro = document.createElement("p");
  intro.className = "recap-intro";
  intro.textContent = "Here is what you just did, why each move mattered, and how the agentic coding tool helped keep the work inspectable.";
  container.appendChild(intro);

  recapItemsForModule(module).forEach((item) => {
    const recap = document.createElement("article");
    recap.className = "recap-item";
    recap.innerHTML = `
      <span class="recap-step">${formatInlineCodeRefs(item.number)}</span>
      <h4>${formatInlineCodeRefs(item.title)}</h4>
      <p><strong>Why it mattered:</strong> ${formatInlineCodeRefs(item.motivation)}</p>
      <p><strong>How Codex helped:</strong> ${formatInlineCodeRefs(item.agentHelp)}</p>
      <p><strong>What you did:</strong> ${formatInlineCodeRefs(item.summary)}</p>
    `;
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
