const modules = [
  {
    id: "setup",
    title: "Before Thursday: Setup Checklist",
    step: "Confirm the apps before Thursday",
    tag: "Setup",
    body: [
      "Complete this checklist before Thursday, May 28, 2026. This workshop starts in the Codex and Claude Code apps, and Codex needs working Python so it can run the small scripts in the research workflow."
    ],
    substepTitle: "Module 1 Setup Steps",
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
            text: "Please check whether Python is installed and available to you. If it is available, run a tiny Python script that prints the Python version and confirms that 2 + 2 equals 4. Then tell me whether you can run Python code for the STAX training. Do not modify any project files."
          }
        ]
      },
      {
        number: "1.4",
        title: "Wait To Create The Project Folder",
        text: "Do not create the workshop project folder before the live walkthrough. Everyone will create the same root folder together in Module 2.",
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
      "Create a clean project root, save the fictional PI email into the codebase as a PDF or .eml file, and ask Codex or Claude Code to turn that email into a markdown handoff summary before any coding begins."
    ],
    substepTitle: "Module 2 Substeps",
    substeps: [
      {
        number: "2.1",
        title: "Create My_RA_Tasks",
        text: "Create a new folder named My_RA_Tasks somewhere sensible in your file home, such as Documents, Desktop, or another personal work folder you can find again.",
        materials: [
          {
            label: "Why this matters",
            text: "My_RA_Tasks is the project root for this workshop. It will contain the actual workshop project folder and any files the agent creates during the session."
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
        title: "Open The Assignment Email",
        text: "Open the fictional PI assignment email from your inbox. Treat the email as the real starting point for the research task."
      },
      {
        number: "2.4",
        title: "Create The Email Handoff Summary",
        text: "After saving the PI's email in the docs folder, ask Codex or Claude Code to read it and create a markdown summary with clear action items.",
        materials: [
          {
            label: "Input email",
            text: "docs/intro_email.pdf or docs/intro_email.eml"
          },
          {
            label: "Output file",
            text: "docs/email_handoff_summary.md"
          }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "My PI sent me a research assignment by email. I saved that email in the docs folder as either docs/intro_email.pdf or docs/intro_email.eml. Read the saved email artifact as the source of truth for this project and create docs/email_handoff_summary.md. Include the sender, subject, what my PI is asking me to do, the research objective, required inputs or data, expected deliverables, clear action items, open questions, and any assumptions or judgment calls. Do not start coding yet."
          }
        ]
      },
      {
        number: "2.5",
        title: "Review Before Coding",
        text: "Ask Codex or Claude Code to read docs/email_handoff_summary.md and restate the task before writing or changing code.",
        materials: [
          {
            label: "What to look for",
            text: "A useful summary names the research objective, raw inputs, expected output, and judgment calls before any code changes happen."
          }
        ],
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
      "My_RA_Tasks has been created in a sensible place in your file home.",
      "Codex is open with My_RA_Tasks selected as the project root.",
      "The inbox email has been saved or exported into the repo as a PDF or .eml file.",
      "The agent has created docs/email_handoff_summary.md with a summary and action items.",
      "The buyer-side company-year panel goal is clear.",
      "Codex has summarized the handoff before coding.",
      "The fictional-data boundary is clear."
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
    substepTitle: "Module 3 Substeps",
    substeps: [
      {
        number: "3.1",
        title: "Download And Move The ZIP",
        text: "Download the raw-data ZIP attachment from the fictional PI email. Save or move it into the project's data/raw folder. If that folder does not exist yet, ask Codex or Claude Code to create it for you.",
        materials: [
          {
            label: "Attachment",
            text: "film_tax_credit_raw_data.zip"
          },
          {
            label: "Destination",
            text: "data/raw/film_tax_credit_raw_data.zip"
          }
        ]
      },
      {
        number: "3.2",
        title: "Ask Codex For A Staged Data Pass",
        text: "Give Codex or Claude Code one staged request: extract the ZIP, identify the created files, explain the folder contents, and inspect the raw data before any classification work.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "I downloaded the PI email attachment and placed it at data/raw/film_tax_credit_raw_data.zip. Please work in stages:\n\nStage 1: Unzip the attachment into data/raw/.\nStage 2: Tell me exactly which CSV files were created and whether the original ZIP is still there.\nStage 3: Explain what each CSV appears to contain and how it might be used in the buyer-side company-year panel.\nStage 4: Do a preliminary data pass on the extracted CSVs. List the columns, likely keys, obvious company aliases or name variants, messy film-finance roles, ambiguous cases, and specific rows that should not be auto-classified without human review.\nStage 5: Save your notes as docs/raw_data_preliminary_pass.md.\n\nKeep the explanation beginner-friendly. Stop after the preliminary data pass. Do not write analysis code or classify the rows yet."
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
            text: "Based on docs/raw_data_preliminary_pass.md and data/raw/legacy_film_finance_deals.csv, draft docs/legacy_film_classification_rubric.md. The rubric should define these categories: legacy_film_finance_investor, production_company, studio_distributor, completion_bond_or_payroll_vendor, streaming_or_offtake_customer, advisor, and ambiguous. For each category, explain the signals that support it, signals that rule it out, and concrete examples from the CSVs. Be conservative: if a role is unclear, strategic, prospective, or only possibly finance-related, mark it ambiguous for human review rather than forcing it into investor status."
          }
        ]
      },
      {
        number: "3.4",
        title: "Plan The Subagent Review Team",
        text: "Ask Codex or Claude Code to plan the reviewer roles before classification begins.",
        materials: [
          {
            label: "Output file",
            text: "docs/legacy_film_subagent_review_plan.md"
          }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Create docs/legacy_film_subagent_review_plan.md for classifying data/raw/legacy_film_finance_deals.csv with a team of subagent reviewers. Include at least four roles: investor reviewer, non-investor role reviewer, ambiguity reviewer, and reconciliation lead. For each role, explain what evidence it should cite, what mistakes it should guard against, and how disagreements should be resolved. The default rule should be conservative: unresolved uncertainty becomes ambiguous and needs human review."
          }
        ]
      }
    ],
    commandTitle: "Ask The Agent To Inspect",
    commands: [],
    prompts: [],
    checks: [
      "The raw-data ZIP attachment has been downloaded into data/raw/.",
      "Codex or Claude Code has extracted the ZIP, identified the CSV files, explained the folder contents, and saved preliminary notes.",
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
      "This module uses a team of subagent reviewers instead of a keyword-rule script. Each reviewer looks at the same rows from a different angle, then Codex or Claude Code reconciles the results into one auditable classification table.",
      "The output is still a processed CSV and an audit file. Ambiguous finance-partner rows stay visible and are not counted as confirmed investor participation."
    ],
    substepTitle: "Module 4 Substeps",
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
            text: "Use the reviewer plan to run independent subagent passes over data/raw/legacy_film_finance_deals.csv. If your environment supports subagents, use them; otherwise use clearly separated reviewer passes.\n\nStage 1: The investor reviewer identifies rows that clearly support legacy_film_finance_investor and cites exact role or note evidence.\nStage 2: The non-investor role reviewer identifies rows that should not count as investors because they are production companies, studios/distributors, vendors, customers/offtake partners, brand partners, or advisors.\nStage 3: The ambiguity reviewer identifies rows that should be ambiguous or need human review, especially strategic partners, possible finance participants, prospective finance partners, and unclear finance partners.\n\nSave the reviewer notes as docs/legacy_film_subagent_review_notes.md. Do not create the final CSV yet."
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
            text: "Reconcile docs/legacy_film_subagent_review_notes.md into final row-level classifications. If reviewers disagree, choose the conservative classification and explain why.\n\nCreate data/processed/legacy_film_party_classifications.csv with one row for every row in data/raw/legacy_film_finance_deals.csv. Include these columns: deal_id, deal_year, project_title, party_name, party_role_raw, party_note, party_category, classification_reason. Use only these party_category values: legacy_film_finance_investor, production_company, studio_distributor, completion_bond_or_payroll_vendor, streaming_or_offtake_customer, advisor, ambiguous.\n\nAlso create audits/legacy_film_party_classification_audit.md. The audit should summarize the reviewer roles, classification counts, rows marked ambiguous, any reviewer disagreements, and rows that need PI review. Do not write a Python classification script for this step."
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
            text: "Read audits/legacy_film_party_classification_audit.md and data/processed/legacy_film_party_classifications.csv. Summarize which rows were classified as confirmed legacy finance investors, which rows were marked ambiguous, and which judgment calls should be shown to the PI before using the panel."
          }
        ]
      }
    ],
    commandTitle: "Ask The Agent To Coordinate",
    commands: [],
    prompts: [],
    checks: [
      "Reviewer roles are visible before classification.",
      "The processed classification CSV has one row per raw party row.",
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
      "The panel builder reads the company directory, film tax credit purchases, and the subagent-reviewed party classifications. It creates one company-year row for each fictional company from 2019 through 2024.",
      "The final variables are intentionally plain: company name, year, industry, revenue, buyer indicator, legacy investor indicator, and film credit amount."
    ],
    substepTitle: "Module 5 Substeps",
    substeps: [
      {
        number: "5.1",
        title: "Confirm The Inputs",
        text: "Before running the panel builder, ask Codex or Claude Code to confirm that the raw files and subagent-reviewed classification artifact are ready.",
        materials: [
          {
            label: "Required input",
            text: "data/raw/company_directory.csv"
          },
          {
            label: "Required input",
            text: "data/raw/film_tax_credit_purchases.csv"
          },
          {
            label: "Required input",
            text: "data/processed/legacy_film_party_classifications.csv"
          }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Before building the company-year panel, confirm that these inputs exist: data/raw/company_directory.csv, data/raw/film_tax_credit_purchases.csv, and data/processed/legacy_film_party_classifications.csv. Then read audits/legacy_film_party_classification_audit.md and summarize how the subagent reviewers created the classification file, which party_category values count as confirmed legacy finance investors, which categories are excluded, and what human-review caveats should carry forward. Do not run the panel builder yet."
          }
        ]
      },
      {
        number: "5.2",
        title: "Preview The Panel Logic",
        text: "Have the agent explain the script before running it, especially how subagent classifications flow into the panel.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Read src/build_company_year_panel.py and explain the panel-building logic in beginner-friendly language. Cover the years included, how company aliases and name variants are matched, how FilmCreditBuyer and FilmCreditAmount are created, how LegacyFilmFinanceInvestor uses data/processed/legacy_film_party_classifications.csv, and how ambiguous or non-investor categories are excluded from the investor indicator. Flag any missing input or risky assumption before running anything."
          }
        ]
      },
      {
        number: "5.3",
        title: "Build The Panel",
        text: "Ask Codex or Claude Code to run the existing panel builder from the app and report the files it creates.",
        prompts: [
          {
            label: "Prompt to copy",
            text: "Run src/build_company_year_panel.py from the app. If it fails, explain the error and which input needs attention before changing code. If it succeeds, tell me which files were created or updated and give a short summary of what the panel contains."
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
            text: "data/processed/company_year_panel.csv"
          },
          {
            label: "Audit file",
            text: "audits/build_company_year_panel_audit.md"
          }
        ],
        prompts: [
          {
            label: "Prompt to copy",
            text: "Inspect data/processed/company_year_panel.csv and audits/build_company_year_panel_audit.md. Give me five sanity checks: one row per company-year, expected years 2019-2024, FilmCreditAmount is zero-filled when no purchase occurred, LegacyFilmFinanceInvestor turns on cumulatively after the first confirmed investor year, and ambiguous legacy film party rows are excluded from the investor indicator. Also list any unmatched names or rows that still need human review."
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
      "audits/legacy_film_party_classification_audit.md",
      "audits/build_company_year_panel_audit.md",
      "data/processed/company_year_panel.csv"
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
  const requestedModule = pageParams.get("module") || window.location.hash.replace("#", "");
  return visibleModules.some((module) => module.id === requestedModule) ? requestedModule : visibleModules[0].id;
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

function renderNav() {
  const buttons = document.querySelector("#moduleButtons");
  buttons.innerHTML = "";

  visibleModules.forEach((module, index) => {
    const button = document.createElement("button");
    button.className = "module-button";
    if (module.id === activeModuleId) button.classList.add("active");
    button.type = "button";
    button.innerHTML = `
      <span class="module-index">${index + 1}</span>
      <span>
        <span class="module-name">${escapeHtml(module.title)}</span>
      </span>
    `;
    button.addEventListener("click", () => {
      activeModuleId = module.id;
      render();
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
    const content = className === "command-row"
      ? `<code>${escapeHtml(text)}</code>`
      : `<div class="prompt-text">${escapeHtml(text)}</div>`;
    row.innerHTML = content;
    row.appendChild(createCopyButton(text));
    container.appendChild(row);
  });
}

function createCopyButton(text) {
  const button = document.createElement("button");
  button.className = "copy-button";
  button.type = "button";
  button.textContent = "Copy";
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 1000);
    } catch {
      button.textContent = "Copy manually";
      setTimeout(() => {
        button.textContent = "Copy";
      }, 1600);
    }
  });
  return button;
}

function appendSubstepImage(content, image) {
  if (!image || !image.src) return;

  content.closest(".substep-card")?.classList.add("substep-card-with-image");

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

  content.appendChild(figure);
}

function renderSubsteps(module) {
  const substeps = module.substeps || [];
  const progress = loadSubstepProgress();
  const band = document.querySelector("#substepBand");
  const container = document.querySelector("#substepList");
  document.querySelector("#substepTitle").textContent = module.substepTitle || "Module Substeps";
  container.innerHTML = "";
  band.hidden = substeps.length === 0;

  substeps.forEach((substep) => {
    const row = document.createElement("article");
    row.className = "substep-card";
    row.innerHTML = `
      <span class="substep-number">${escapeHtml(substep.number)}</span>
      <div class="substep-content">
        <div class="substep-title-row">
          <h4>${escapeHtml(substep.title)}</h4>
        </div>
        <p>${escapeHtml(substep.text)}</p>
      </div>
    `;
    const content = row.querySelector(".substep-content");
    const titleRow = row.querySelector(".substep-title-row");

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
      labelText.textContent = "Done";
      checkLabel.append(input, labelText);
      titleRow.appendChild(checkLabel);
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
          <span class="substep-label">${escapeHtml(prompt.label)}</span>
          <div class="prompt-text">${escapeHtml(prompt.text)}</div>
        </div>
      `;
      promptRow.appendChild(createCopyButton(prompt.text));
      content.appendChild(promptRow);
    });

    container.appendChild(row);
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
    ? ["Setup-only view: Modules 2-7 are hidden until the live workshop. Complete this checklist now, then wait to create the project folder or download workshop data."]
    : [];
  document.querySelector("#moduleBody").innerHTML = [...setupOnlyNotice, ...module.body]
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
  renderSubsteps(module);
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
}

render();
