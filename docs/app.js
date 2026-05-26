const modules = [
  {
    id: "setup",
    title: "Before Thursday: Setup Checklist",
    step: "Confirm the apps before Thursday",
    tag: "Setup",
    body: [
      "This setup is meant to make sure you have both Claude Code and Codex installed, signed in, and ready. For the workshop on Thursday, we will use Codex exclusively."
    ],
    substepTitle: "Before Thursday Checklist",
    checkableSubsteps: true,
    substeps: [
      {
        number: "1.1",
        title: "Confirm Tool Access",
        text: "Make sure Codex and Claude Code open, are signed in, and can respond inside the app.",
        links: [
          {
            label: "Need access help?",
            href: "setup/access.html"
          },
          {
            label: "Need Codex help?",
            href: "setup/codex.html"
          },
          {
            label: "Need Claude help?",
            href: "setup/claude-code.html"
          }
        ]
      },
      {
        number: "1.2",
        title: "Confirm Python Is Installed",
        text: "Python should be installed before the workshop so Codex can run scripts, build data files, and create figures during the live workflow.",
        links: [
          {
            label: "Need Python help?",
            href: "setup/python.html"
          }
        ]
      },
      {
        number: "1.3",
        title: "Ask Codex To Test Python",
        text: "Open Codex and ask it to verify that Python works. Codex can run the technical check and report the result; you do not need to type command-line checks yourself.",
        links: [
          {
            label: "Need Python help?",
            href: "setup/python.html"
          }
        ],
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
        text: "Do not create the workshop project folder before the live walkthrough. Everyone will create the same root folder together during the workshop.",
        links: [
          {
            label: "Need folder help?",
            href: "setup/no-project-folder.html"
          }
        ]
      }
    ],
    commands: [],
    prompts: []
  },
  {
    id: "handoff",
    title: "Project Folder And Assignment Email",
    step: "Create the root, then start from the inbox",
    tag: "Start",
    body: [
      "Create a clean workspace, ask Codex to scaffold the dedicated research project codebase inside it, save the PI email into that codebase, and ask Codex to turn that email into a markdown handoff summary before any coding begins."
    ],
    substepTitle: "Module 2 Steps",
    substeps: [
      {
        number: "2.1",
        title: "Create My_RA_Tasks",
        text: "Create a new folder named My_RA_Tasks somewhere sensible in your home folder, such as Documents, Desktop, or another personal work folder you can find again.",
        materials: [
          {
            label: "Why this matters",
            text: "My_RA_Tasks is the outer workspace for this workshop. It will contain the actual film_tax_credit_buyers project folder and any files the agent creates before you switch into that project."
          }
        ]
      },
      {
        number: "2.2",
        title: "Open My_RA_Tasks In Codex",
        text: "Open Codex, create a new project from an existing folder, and select My_RA_Tasks.",
        image: {
          src: "assets/codex-open-existing-folder.svg?v=20260525-pi-context-prompt",
          alt: "Annotated guide image showing the Codex existing-folder project flow and the My_RA_Tasks folder selection.",
          caption: "Follow the existing-folder path, then choose the My_RA_Tasks folder you created in step 2.1."
        }
      },
      {
        number: "2.3",
        title: "Set Up The Research Codebase",
        text: "Ask Codex to create the actual research project inside My_RA_Tasks, with folders that make the work easy to inspect later.",
        sequenceNote: "Send these as two separate Codex messages. First copy and run the folder prompt. Wait for Codex to finish. Then copy and run the guide-files prompt. Do not paste both prompts at once.",
        materials: [
          {
            label: "Project folder",
            text: "film_tax_credit_buyers/"
          },
          {
            label: "Folder map",
            text: "docs/ for assignment notes, data/original/ for unchanged files from the email, data/analysis_ready/ for cleaned CSVs, scripts/ for Python code, audit_notes/ for judgment notes, and final_outputs/ for final tables or figures."
          },
          {
            label: "Agent instruction files",
            text: "AGENTS.md for Codex and CLAUDE.md for Claude Code"
          }
        ],
        prompts: [
          {
            label: "Create folder prompt",
            text: "Create a dedicated research project folder inside the current workspace named film_tax_credit_buyers. Set up these folders:\n\n- docs/ for assignment notes, rubrics, and handoff summaries\n- data/original/ for unchanged files downloaded from the PI email\n- data/analysis_ready/ for cleaned CSVs that are ready to use in analysis\n- scripts/ for Python code that Codex writes or runs\n- audit_notes/ for notes explaining checks, assumptions, and judgment calls\n- final_outputs/ for final tables, figures, or exports\n\nAdd .gitkeep placeholder files in empty data, audit_notes, and final_outputs folders if needed.\n\nStop after creating the folders. Do not inspect data, classify rows, write analysis code, or build the panel yet."
          },
          {
            label: "Create guide files prompt",
            text: "Inside film_tax_credit_buyers, create README.md, AGENTS.md, and CLAUDE.md.\n\nThe README should summarize the research objective, expected original inputs, expected analysis-ready output, and the rule that audit notes are part of the deliverable.\n\nAGENTS.md is the Codex project-instructions file. CLAUDE.md is for Claude Code. Both instruction files should tell coding agents to treat the PI email and supplied data as the source of truth, inspect and summarize inputs before coding, keep outputs auditable, and ask before treating ambiguous film-finance roles as confirmed investors.\n\nStop after creating these starter markdown files. Do not inspect data, classify rows, write analysis code, or build the panel yet."
          }
        ]
      },
      {
        number: "2.4",
        title: "Reopen film_tax_credit_buyers In Codex",
        text: "Open a new or current Codex project from the existing folder film_tax_credit_buyers so later paths like docs/ and data/original/ refer to the research project, not My_RA_Tasks."
      },
      {
        number: "2.5",
        title: "Save The Assignment Email",
        text: "Open the PI assignment email from your inbox. Save or export it into the project docs/ folder using whatever filename your email app gives it, then note the exact filename so you can reference it in Codex with the @ command."
      },
      {
        number: "2.6",
        title: "Create The Email Handoff Summary",
        text: "After saving the PI's email in the docs folder, ask Codex to read it and create a markdown summary with clear action items.",
        materials: [
          {
            label: "Input email",
            text: "The saved email file in docs/, referenced in chat with @"
          },
          {
            label: "Output file",
            text: "docs/email_handoff_summary.md"
          }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "My PI sent me a research assignment by email. I saved that email in the docs folder.\n\nEmail file to reference with @: @docs/[select the saved assignment email file]\n\nReplace the bracketed text by selecting the actual saved file with @. Do not leave the brackets in the prompt.\n\nRead the saved email artifact as the source of truth for this project and create docs/email_handoff_summary.md. Include the sender, subject, what my PI is asking me to do, the research objective, required inputs or data, expected deliverables, clear action items, open questions, and any assumptions or judgment calls. Do not start coding yet."
          }
        ]
      },
      {
        number: "2.7",
        title: "Review Before Coding",
        text: "Ask Codex to read docs/email_handoff_summary.md and restate the task before writing or changing code.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Read docs/email_handoff_summary.md. Before writing code, restate the research objective, raw inputs, expected output, action items, and judgment calls in a concise RA brief. Flag any missing context or open questions."
          },
          {
            label: "Optional follow-up",
            text: "Before writing code for this research task, identify what could go wrong when matching companies across these files."
          }
        ]
      }
    ],
    commandTitle: "Do In The Apps",
    commands: [],
    prompts: [],
    checks: [
      "My_RA_Tasks has been created in a sensible place in your home folder.",
      "Codex is open with My_RA_Tasks selected long enough to scaffold the nested project.",
      "Codex has created the dedicated film_tax_credit_buyers project folder with starter folders, README.md, AGENTS.md, and CLAUDE.md.",
      "Codex is now open with film_tax_credit_buyers selected as the active project root.",
      "The inbox email has been saved or exported into docs/ and the exact filename is known.",
      "The agent has created docs/email_handoff_summary.md with a summary and action items.",
      "The buyer-side company-year panel goal is clear.",
      "Codex has summarized the handoff before coding.",
      "The PI email and supplied data are treated as the source of truth."
    ]
  },
  {
    id: "raw-data",
    title: "Raw Data Inspection And Review Plan",
    step: "Prepare evidence before classification",
    tag: "Data",
    body: [
      "Before asking the agent to classify anything, start from the raw-data ZIP attachment, extract it into the project, inspect the files, and prepare a conservative rubric for a team of subagent reviewers.",
      "The goal is to make the judgment work visible: aliases, production roles, vendor roles, ambiguous finance partners, and rows that should be reviewed by a human."
    ],
    substepTitle: "Module 3 Steps",
    substeps: [
      {
        number: "3.1",
        title: "Download And Move The ZIP",
        text: "Download the raw-data ZIP attachment from the PI email. Save or move it into the project's data/original folder. If that folder does not exist yet, ask Codex to create it for you.",
        materials: [
          {
            label: "Attachment",
            text: "film_tax_credit_raw_data.zip"
          },
          {
            label: "Destination",
            text: "data/original/film_tax_credit_raw_data.zip"
          }
        ]
      },
      {
        number: "3.2",
        title: "Ask Codex For A Staged Data Pass",
        text: "Give Codex one staged request: extract the ZIP, identify the created files, explain the folder contents, and inspect the raw data before any classification work.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "I downloaded the PI email attachment and placed it at data/original/film_tax_credit_raw_data.zip. Please work in stages:\n\nStage 1: Unzip the attachment into data/original/.\nStage 2: Tell me exactly which CSV files were created and whether the original ZIP is still there.\nStage 3: Explain what each CSV appears to contain and how it might be used in the buyer-side company-year panel.\nStage 4: Do a preliminary data pass on the extracted CSVs. List the columns, likely keys, obvious company aliases or name variants, messy film-finance roles, ambiguous cases, and specific rows that should not be auto-classified without human review.\nStage 5: Save your notes as docs/raw_data_preliminary_pass.md.\n\nKeep the explanation beginner-friendly. Stop after the preliminary data pass. Do not write analysis code or classify the rows yet."
          }
        ]
      },
      {
        number: "3.3",
        title: "Draft A Classification Rubric",
        text: "Turn the messy cases into a conservative rubric that the subagent reviewers will use in Module 4.",
        materials: [
          {
            label: "Output file",
            text: "docs/legacy_film_classification_rubric.md"
          }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Based on docs/raw_data_preliminary_pass.md and data/original/legacy_film_finance_deals.csv, draft docs/legacy_film_classification_rubric.md. The rubric should define these categories: legacy_film_finance_investor, production_company, studio_distributor, completion_bond_or_payroll_vendor, streaming_or_offtake_customer, advisor, and ambiguous. For each category, explain the signals that support it, signals that rule it out, and concrete examples from the CSVs. Be conservative: if a role is unclear, strategic, prospective, or only possibly finance-related, mark it ambiguous for human review rather than forcing it into investor status."
          }
        ]
      },
      {
        number: "3.4",
        title: "Plan The Subagent Review Team",
        text: "Ask Codex to plan the reviewer roles before classification begins.",
        materials: [
          {
            label: "Output file",
            text: "docs/legacy_film_subagent_review_plan.md"
          }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Create docs/legacy_film_subagent_review_plan.md for classifying data/original/legacy_film_finance_deals.csv with a team of subagent reviewers. Include at least four roles: investor reviewer, non-investor role reviewer, ambiguity reviewer, and reconciliation lead. For each role, explain what evidence it should cite, what mistakes it should guard against, and how disagreements should be resolved. The default rule should be conservative: unresolved uncertainty becomes ambiguous and needs human review."
          }
        ]
      }
    ],
    commandTitle: "Ask The Agent To Inspect",
    commands: [],
    prompts: [],
    checks: [
      "The raw-data ZIP attachment has been downloaded into data/original/.",
      "Codex has extracted the ZIP, identified the CSV files, explained the folder contents, and saved preliminary notes.",
      "The classification rubric is conservative and example-backed.",
      "The subagent review plan names reviewer roles and disagreement rules.",
      "Rows needing human review are visible before classification begins."
    ]
  },
  {
    id: "classification",
    title: "Subagent Legacy Film-Finance Classification",
    step: "Use reviewer roles for judgment-heavy rows",
    tag: "Rules",
    body: [
      "This module uses separate reviewer passes instead of a keyword-rule script. Codex looks at the same rows from different angles, then reconciles the results into one auditable classification table.",
      "The output is still an analysis-ready CSV and an audit file. Ambiguous finance-partner rows stay visible and are not counted as confirmed investor participation."
    ],
    substepTitle: "Module 4 Steps",
    substeps: [
      {
        number: "4.1",
        title: "Convene The Review Team",
        text: "Ask the agent to read the rubric and review plan, then restate how the subagent classification will work.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Read docs/legacy_film_classification_rubric.md and docs/legacy_film_subagent_review_plan.md. Before classifying rows, restate the reviewer roles, the allowed party_category values, the conservative default rule, and the output files we need. Do not write or run a classification script."
          }
        ]
      },
      {
        number: "4.2",
        title: "Run Independent Reviewer Passes",
        text: "Have the subagents classify from different perspectives before reconciliation.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Use the reviewer plan to run independent subagent passes over data/original/legacy_film_finance_deals.csv. If your environment supports subagents, use them; otherwise use clearly separated reviewer passes.\n\nStage 1: The investor reviewer identifies rows that clearly support legacy_film_finance_investor and cites exact role or note evidence.\nStage 2: The non-investor role reviewer identifies rows that should not count as investors because they are production companies, studios/distributors, vendors, customers/offtake partners, brand partners, or advisors.\nStage 3: The ambiguity reviewer identifies rows that should be ambiguous or need human review, especially strategic partners, possible finance participants, prospective finance partners, and unclear finance partners.\n\nSave the reviewer notes as docs/legacy_film_subagent_review_notes.md. Do not create the final CSV yet."
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
            text: "Reconcile docs/legacy_film_subagent_review_notes.md into final row-level classifications. If reviewers disagree, choose the conservative classification and explain why.\n\nCreate data/analysis_ready/legacy_film_party_classifications.csv with one row for every row in data/original/legacy_film_finance_deals.csv. Include these columns: deal_id, deal_year, project_title, party_name, party_role_raw, party_note, party_category, classification_reason. Use only these party_category values: legacy_film_finance_investor, production_company, studio_distributor, completion_bond_or_payroll_vendor, streaming_or_offtake_customer, advisor, ambiguous.\n\nAlso create audit_notes/legacy_film_party_classification_audit.md. The audit should summarize the reviewer roles, classification counts, rows marked ambiguous, any reviewer disagreements, and rows that need PI review. Do not write a Python classification script for this step."
          }
        ]
      },
      {
        number: "4.4",
        title: "Review The Audit",
        text: "Make the human judgment points explicit before moving on to the panel builder.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Read audit_notes/legacy_film_party_classification_audit.md and data/analysis_ready/legacy_film_party_classifications.csv. Summarize which rows were classified as confirmed legacy finance investors, which rows were marked ambiguous, and which judgment calls should be shown to the PI before using the panel."
          }
        ]
      }
    ],
    commandTitle: "Ask The Agent To Coordinate",
    commands: [],
    prompts: [],
    checks: [
      "Reviewer roles are visible before classification.",
      "The analysis-ready classification CSV has one row per original party row.",
      "Ambiguous rows are not silently forced into investor status.",
      "The audit trail records reviewer disagreements and human-review rows."
    ]
  },
  {
    id: "panel",
    title: "Build The Company-Year Panel",
    step: "Turn messy inputs into analysis-ready rows",
    tag: "Panel",
    body: [
      "The panel builder reads the company directory, film tax credit purchases, and the subagent-reviewed party classifications. It creates one company-year row for each company from 2019 through 2024.",
      "The final variables are intentionally plain: company name, year, industry, revenue, buyer indicator, legacy investor indicator, and film credit amount."
    ],
    substepTitle: "Module 5 Steps",
    substeps: [
      {
        number: "5.1",
        title: "Confirm The Inputs",
        text: "Before running the panel builder, ask Codex to confirm that the raw files and reviewer-pass classification artifact are ready.",
        materials: [
          {
            label: "Required input",
            text: "data/original/company_directory.csv"
          },
          {
            label: "Required input",
            text: "data/original/film_tax_credit_purchases.csv"
          },
          {
            label: "Required input",
            text: "data/analysis_ready/legacy_film_party_classifications.csv"
          }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Before building the company-year panel, confirm that these inputs exist: data/original/company_directory.csv, data/original/film_tax_credit_purchases.csv, and data/analysis_ready/legacy_film_party_classifications.csv. Then read audit_notes/legacy_film_party_classification_audit.md and summarize how the reviewer passes created the classification file, which party_category values count as confirmed legacy finance investors, which categories are excluded, and what human-review caveats should carry forward. Do not run the panel builder yet."
          }
        ]
      },
      {
        number: "5.2",
        title: "Create The Panel Script",
        text: "Have Codex explain the panel-building plan first, then write the Python script in a separate message.",
        sequenceNote: "Send these as two separate Codex messages. First ask for the plan and wait for the explanation. Then ask Codex to write the script. Do not run the script until step 5.3.",
        prompts: [
          {
            label: "Explain plan prompt",
            text: "Before writing code, explain the panel-building logic in beginner-friendly language. The script will read data/original/company_directory.csv, data/original/film_tax_credit_purchases.csv, and data/analysis_ready/legacy_film_party_classifications.csv. It should write data/analysis_ready/company_year_panel.csv and audit_notes/build_company_year_panel_audit.md.\n\nCover the years included, how company aliases and name variants should be matched, how FilmCreditBuyer and FilmCreditAmount should be created, how LegacyFilmFinanceInvestor should use data/analysis_ready/legacy_film_party_classifications.csv, and how ambiguous or non-investor categories should be excluded from the investor indicator. Flag any missing input or risky assumption. Do not write code yet."
          },
          {
            label: "Write script prompt",
            text: "Now create scripts/build_company_year_panel.py using the plan above. Use clear, beginner-friendly code and comments. The script should read data/original/company_directory.csv, data/original/film_tax_credit_purchases.csv, and data/analysis_ready/legacy_film_party_classifications.csv. It should write data/analysis_ready/company_year_panel.csv and audit_notes/build_company_year_panel_audit.md. Do not run the script yet."
          }
        ]
      },
      {
        number: "5.3",
        title: "Build The Panel",
        text: "Ask Codex to run the panel builder from the app and report the files it creates.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Run scripts/build_company_year_panel.py from the app. If it fails, explain the error and which input needs attention before changing code. If it succeeds, tell me which files were created or updated and give a short summary of what the panel contains."
          }
        ]
      },
      {
        number: "5.4",
        title: "Inspect The Output And Audit",
        text: "End the module by checking the analysis-ready panel and the audit trail before using the file downstream.",
        materials: [
          {
            label: "Output file",
            text: "data/analysis_ready/company_year_panel.csv"
          },
          {
            label: "Audit file",
            text: "audit_notes/build_company_year_panel_audit.md"
          }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Inspect data/analysis_ready/company_year_panel.csv and audit_notes/build_company_year_panel_audit.md. Give me five sanity checks: one row per company-year, expected years 2019-2024, FilmCreditAmount is zero-filled when no purchase occurred, LegacyFilmFinanceInvestor turns on cumulatively after the first confirmed investor year, and ambiguous legacy film party rows are excluded from the investor indicator. Also list any unmatched names or rows that still need human review."
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
      "Panel has one row per company-year.",
      "Film credit amounts are zero-filled when no purchase occurred.",
      "LegacyFilmFinanceInvestor is cumulative through the panel year and excludes ambiguous rows."
    ]
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
      "audit_notes/legacy_film_party_classification_audit.md",
      "audit_notes/build_company_year_panel_audit.md",
      "data/analysis_ready/company_year_panel.csv"
    ],
    prompts: [
      "Based on the audit files, draft a short note to the PI explaining what is complete and what needs judgment.",
      "Create a concise seminar recap: what Codex did, what the human checked, and what would change with real state film office/IPUMS/QCEW/proprietary data."
    ],
    checks: [
      "Human review points are explicit.",
      "No ambiguous case is treated as confirmed investor participation.",
      "The demo ends with a human-readable PI update."
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
      "If participants try the install flow, Codex should explain any user-level or Global settings change before it installs anything. Restart Codex before relying on newly installed skills."
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

const pageParams = new URLSearchParams(window.location.search);
const setupOnlyMode = Boolean(window.STAX_SETUP_ONLY)
  || window.location.pathname.endsWith("/setup.html")
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
    caption.textContent = image.caption;
    figure.appendChild(caption);
  }

  details.appendChild(figure);
  content.appendChild(details);
}

function renderSubsteps(module) {
  const substeps = module.substeps || [];
  const progress = loadSubstepProgress();
  const isChecklist = Boolean(module.checkableSubsteps);
  const band = document.querySelector("#substepBand");
  const container = document.querySelector("#substepList");
  document.querySelector("#substepTitle").textContent = (module.substepTitle || "Module Steps").replace("Substeps", "Steps");
  container.innerHTML = "";
  container.classList.toggle("checklist-list", isChecklist);
  container.dataset.focusMode = isChecklist ? "static" : "scroll";
  band.hidden = substeps.length === 0;

  substeps.forEach((substep) => {
    const row = document.createElement("article");
    row.className = isChecklist ? "substep-card checklist-card" : "substep-card";
    row.id = domIdForStep(module, substep);
    if (isChecklist) {
      row.innerHTML = `
        <div class="substep-content checklist-content">
          <div class="checklist-title-row">
            <div class="checklist-title-copy">
              <span class="substep-number">Item ${escapeHtml(substep.number)}</span>
              <h4>${escapeHtml(substep.title)}</h4>
            </div>
          </div>
          <p>${escapeHtml(substep.text)}</p>
        </div>
      `;
    } else {
      row.innerHTML = `
        <span class="substep-number">Step ${escapeHtml(substep.number)}</span>
        <div class="substep-content">
          <div class="substep-title-row">
            <h4>${escapeHtml(substep.title)}</h4>
          </div>
          <h5>Do</h5>
          <p>${escapeHtml(substep.text)}</p>
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

    (substep.materials || []).forEach((material) => {
      const materialRow = document.createElement("div");
      materialRow.className = "substep-material";
      materialRow.innerHTML = `
        <span class="substep-label">${escapeHtml(material.label)}</span>
        <span>${escapeHtml(material.text)}</span>
      `;
      content.appendChild(materialRow);
    });

    if (substep.sequenceNote) {
      const sequenceNote = document.createElement("p");
      sequenceNote.className = "sequence-note";
      sequenceNote.innerHTML = `<strong>Prompt order:</strong> ${escapeHtml(substep.sequenceNote)}`;
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

function renderModuleChecks(module) {
  const checks = module.checks || [];
  const band = document.querySelector("#moduleChecksBand");
  const container = document.querySelector("#moduleChecksList");
  if (!band || !container) return;

  container.innerHTML = "";
  band.hidden = checks.length === 0;

  checks.forEach((check) => {
    const label = document.createElement("label");
    label.className = "check-item";
    label.innerHTML = `
      <input type="checkbox">
      <span>${escapeHtml(check)}</span>
    `;
    container.appendChild(label);
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
  const setupOnlyNotice = setupOnlyMode
    ? ["This is the setup module for Thursday. Please complete it before the workshop; we will go over the full set of modules together on Thursday."]
    : [];
  const body = [...setupOnlyNotice, ...module.body];
  const bodyHtml = body
    .map((paragraph, index) => {
      const label = index === 0 ? "Module outcome" : "Context";
      return `<p><strong>${label}:</strong> ${escapeHtml(paragraph)}</p>`;
    })
    .join("");
  const focusHtml = module.step
    ? `<p><strong>Working focus:</strong> ${escapeHtml(module.step)}</p>`
    : "";
  document.querySelector("#moduleBody").innerHTML = `${bodyHtml}${focusHtml}`;
  renderSubsteps(module);
  renderModuleChecks(module);
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
