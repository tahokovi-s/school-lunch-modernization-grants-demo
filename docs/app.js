const modules = [
  {
    id: "setup",
    title: "Before The Session: Install And Account Setup",
    step: "Start before the repo exists",
    tag: "Setup",
    duration: "10 min",
    body: [
      "You do not need a project folder yet. Start by making sure the tools are installed, authenticated, and ready to run in a terminal.",
      "Plan names and usage limits change, so use the linked product pages as the source of truth. For individual users, ChatGPT Plus or higher and Claude Pro or higher are the usual starting points for this workshop.",
      "The setup email template in docs/session_invitation_email.md includes current reference links and a short preparation checklist."
    ],
    commands: [
      "open docs/session_invitation_email.md",
      "codex --version",
      "claude --version",
      "git --version && python3 --version"
    ],
    prompts: [
      "Check whether Codex is installed and authenticated. Do not change files; just explain the next setup step.",
      "Check whether Claude Code is installed and authenticated. Do not change files; explain any issue in beginner-friendly language."
    ],
    checks: [
      "Codex opens and is signed in.",
      "Claude Code opens and is signed in.",
      "Git and Python 3 are available."
    ]
  },
  {
    id: "skills",
    title: "Skills Warm-Up",
    step: "Use /skills before the project work",
    tag: "Skills",
    duration: "8 min",
    body: [
      "Skills are reusable instructions, scripts, and resources that help Codex perform a workflow reliably. This module demonstrates how agents can be customized rather than only prompted from scratch.",
      "OpenAI maintains the official openai/skills catalog on GitHub. Run /skills to see what is already available, then use $skill-installer to list curated skills.",
      "The optional install prompt shows how a skill can be added from the official catalog. After installing a skill, restart Codex before relying on it."
    ],
    commands: [
      "open https://github.com/openai/skills",
      "open https://developers.openai.com/codex/skills"
    ],
    prompts: [
      "/skills",
      "$skill-installer list curated skills from the official openai/skills repository. Do not install anything yet.",
      "$skill-installer install https://github.com/openai/skills/tree/main/skills/.experimental/create-plan"
    ],
    checks: [
      "The /skills menu has been opened.",
      "$skill-name explicit invocation is clear.",
      "The official openai/skills catalog has been identified."
    ]
  },
  {
    id: "handoff",
    title: "PI Email And Research Handoff",
    step: "Start from the assignment, not the code",
    tag: "Handoff",
    duration: "6 min",
    body: [
      "Now move from setup into the fictional research task. Open the PI email and treat it like a real RA request.",
      "The workflow starts with a messy but plausible handoff about transferable film production tax credits. Ask Codex to restate the task, then turn that brief into an auditable workflow.",
      "The policy, productions, companies, and data are fictional. The transferable lesson is how to guide an agent through research work with checks and judgment."
    ],
    commands: [
      "open docs/intro_email.md",
      "sed -n '1,180p' docs/intro_email.md"
    ],
    prompts: [
      "Read docs/intro_email.md. Summarize the research objective, raw inputs, expected output, and judgment calls in a concise RA brief.",
      "Before writing code, identify what could go wrong when matching companies across these files."
    ],
    checks: [
      "The buyer-side company-year panel goal is clear.",
      "Codex has been asked to summarize before coding.",
      "The fictional-data boundary is clear."
    ]
  },
  {
    id: "raw-data",
    title: "Raw Data Inspection",
    step: "Find the mess before automating",
    tag: "Data",
    duration: "8 min",
    body: [
      "Inspect all three CSVs: film tax credit purchases, legacy film-finance deal parties, and the company directory. The teachable messiness is intentional: aliases, production roles, vendor roles, and ambiguous finance partners.",
      "This module shows why agents need grounded context. Good prompts point Codex to the data shape and ask it to inspect before generating assumptions."
    ],
    commands: [
      "python -c \"import pandas as pd; print(pd.read_csv('data/raw/company_directory.csv').head())\"",
      "python -c \"import pandas as pd; print(pd.read_csv('data/raw/legacy_film_finance_deals.csv')[['deal_id','deal_year','party_name','party_role_raw']].head(12))\"",
      "python -c \"import pandas as pd; print(pd.read_csv('data/raw/film_tax_credit_purchases.csv'))\""
    ],
    prompts: [
      "Inspect data/raw/*.csv and list the columns, likely keys, obvious aliases, and rows that should not be auto-classified without review.",
      "Propose a conservative matching strategy for this fictional film credit exercise."
    ],
    checks: [
      "Company name variants have been noticed.",
      "Ambiguous film-finance parties have been identified before classification.",
      "The audit motivation is clear."
    ]
  },
  {
    id: "classification",
    title: "Legacy Film-Finance Party Classification",
    step: "Use transparent rules first",
    tag: "Rules",
    duration: "10 min",
    body: [
      "The classification script deliberately uses keyword rules rather than an API call. That keeps the lesson focused on transparent, reviewable automation.",
      "The script writes both a processed CSV and an audit file. Ambiguous finance-partner rows are kept in the data but quarantined from the investor indicator."
    ],
    commands: [
      "python src/classify_legacy_film_deal_parties.py",
      "sed -n '1,220p' audits/legacy_film_party_classification_audit.md",
      "python -c \"import pandas as pd; print(pd.read_csv('data/processed/legacy_film_party_classifications.csv')[['deal_id','party_name','party_category','classification_reason']])\""
    ],
    prompts: [
      "Review src/classify_legacy_film_deal_parties.py. Explain the rule order and whether any terms should be safer or more conservative.",
      "Read audits/legacy_film_party_classification_audit.md and identify which rows require human judgment."
    ],
    checks: [
      "Classification rules are visible in code.",
      "Ambiguous rows are not silently forced into a category.",
      "Audit trail has been opened and discussed."
    ]
  },
  {
    id: "panel",
    title: "Build The Company-Year Panel",
    step: "Turn messy inputs into analysis-ready rows",
    tag: "Panel",
    duration: "10 min",
    body: [
      "The panel builder reads the company directory, film tax credit purchases, and party classifications. It creates one company-year row for each fictional company from 2019 through 2024.",
      "The final variables are intentionally plain: company name, year, industry, revenue, buyer indicator, legacy investor indicator, and film credit amount."
    ],
    commands: [
      "python src/build_company_year_panel.py",
      "python -c \"import pandas as pd; print(pd.read_csv('data/processed/company_year_panel.csv').head(18))\"",
      "sed -n '1,220p' audits/build_company_year_panel_audit.md"
    ],
    prompts: [
      "Read src/build_company_year_panel.py and explain how company aliases are matched.",
      "Inspect data/processed/company_year_panel.csv and provide three sanity checks before using it in analysis."
    ],
    checks: [
      "Panel has one row per company-year.",
      "Film credit amounts are zero-filled when no purchase occurred.",
      "LegacyFilmFinanceInvestor is cumulative through the panel year."
    ]
  },
  {
    id: "audits",
    title: "Audit Trails And PI Update",
    step: "Make uncertainty visible",
    tag: "Review",
    duration: "8 min",
    body: [
      "The audit files are part of the output, not an afterthought. They show row counts, classification counts, unmatched names, and rows that should be reviewed by a human.",
      "End by turning the audit into a PI update. This makes the workflow feel like a real predoc handoff rather than just a code exercise."
    ],
    commands: [
      "ls audits data/processed",
      "sed -n '1,220p' audits/legacy_film_party_classification_audit.md",
      "sed -n '1,220p' audits/build_company_year_panel_audit.md"
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
  }
];

let activeModuleId = modules[0].id;
const stateKey = "hollywood-film-tax-credit-demo-progress-v2";

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(stateKey)) || {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(stateKey, JSON.stringify(progress));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderNav() {
  const progress = loadProgress();
  const buttons = document.querySelector("#moduleButtons");
  buttons.innerHTML = "";

  modules.forEach((module, index) => {
    const button = document.createElement("button");
    button.className = "module-button";
    if (module.id === activeModuleId) button.classList.add("active");
    if (progress[module.id]) button.classList.add("done");
    button.type = "button";
    button.innerHTML = `
      <span class="module-index">${progress[module.id] ? "OK" : index + 1}</span>
      <span>
        <span class="module-name">${escapeHtml(module.title)}</span>
        <span class="module-step">${escapeHtml(module.step)}</span>
      </span>
    `;
    button.addEventListener("click", () => {
      activeModuleId = module.id;
      render();
    });
    buttons.appendChild(button);
  });

  const doneCount = modules.filter((module) => progress[module.id]).length;
  document.querySelector("#progressCount").textContent = `${doneCount}/${modules.length}`;
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
    row.innerHTML = `${content}<button class="copy-button" type="button">Copy</button>`;
    row.querySelector("button").addEventListener("click", async (event) => {
      try {
        await navigator.clipboard.writeText(text);
        event.currentTarget.textContent = "Done";
        setTimeout(() => {
          event.currentTarget.textContent = "Copy";
        }, 1000);
      } catch {
        event.currentTarget.textContent = "Select";
      }
    });
    container.appendChild(row);
  });
}

function renderChecklist(module) {
  const progress = loadProgress();
  const container = document.querySelector("#checklist");
  container.innerHTML = "";

  module.checks.forEach((check, index) => {
    const item = document.createElement("label");
    item.className = "check-item";
    const itemKey = `${module.id}:${index}`;
    item.innerHTML = `
      <input type="checkbox" ${progress[itemKey] ? "checked" : ""}>
      <span>${escapeHtml(check)}</span>
    `;
    item.querySelector("input").addEventListener("change", (event) => {
      const nextProgress = loadProgress();
      nextProgress[itemKey] = event.currentTarget.checked;
      nextProgress[module.id] = module.checks.every((_, checkIndex) => nextProgress[`${module.id}:${checkIndex}`]);
      saveProgress(nextProgress);
      renderNav();
    });
    container.appendChild(item);
  });
}

function renderModule() {
  const module = modules.find((item) => item.id === activeModuleId) || modules[0];
  document.querySelector("#moduleTag").textContent = module.tag;
  document.querySelector("#moduleDuration").textContent = module.duration;
  document.querySelector("#moduleTitle").textContent = module.title;
  document.querySelector("#moduleBody").innerHTML = module.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  renderRows("#commandList", module.commands, "command-row");
  renderRows("#promptList", module.prompts, "prompt-row");
  renderChecklist(module);
}

function render() {
  renderNav();
  renderModule();
}

render();
