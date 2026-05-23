const modules = [
  {
    id: "handoff",
    title: "PI Email And Research Handoff",
    step: "Start from the assignment, not the code",
    tag: "Handoff",
    duration: "6 min",
    body: [
      "Open the fictional PI email and treat it like a real RA request. The point is to make Codex reason from research context before asking it to write code.",
      "The seminar framing is: a predoc receives a messy but plausible handoff about transferable film production tax credits, asks Codex to restate the task, then turns that brief into an auditable workflow.",
      "Emphasize that the policy, productions, companies, and data are fictional. The workflow habits are the real teaching object."
    ],
    commands: [
      "open docs/intro_email.md",
      "sed -n '1,180p' docs/intro_email.md"
    ],
    prompts: [
      "Read docs/intro_email.md. Summarize the research objective, raw inputs, expected output, and judgment calls in a concise RA brief.",
      "Before writing code, tell me what could go wrong when matching companies across these files."
    ],
    checks: [
      "Audience understands the buyer-side company-year panel goal.",
      "Codex has been asked to summarize before coding.",
      "Fictional-data boundary has been stated out loud."
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
      "The class understands why audits matter."
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
      "Read audits/legacy_film_party_classification_audit.md and tell me which rows require human judgment."
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
      "Inspect data/processed/company_year_panel.csv and give me three sanity checks before I use it in analysis."
    ],
    checks: [
      "Panel has one row per company-year.",
      "Film credit amounts are zero-filled when no purchase occurred.",
      "LegacyFilmFinanceInvestor is cumulative through the panel year."
    ]
  },
  {
    id: "audits",
    title: "Audit Trails And Human Judgment",
    step: "Make uncertainty visible",
    tag: "Review",
    duration: "8 min",
    body: [
      "The audit files are part of the output, not an afterthought. They show row counts, classification counts, unmatched names, and rows that should be reviewed by a human.",
      "This is the core agentic workflow habit: let the agent do repetitive work, but design outputs that make review cheap."
    ],
    commands: [
      "ls audits data/processed",
      "sed -n '1,220p' audits/legacy_film_party_classification_audit.md",
      "sed -n '1,220p' audits/build_company_year_panel_audit.md"
    ],
    prompts: [
      "Based on the audit files, draft a short note to the PI explaining what is complete and what needs judgment.",
      "Suggest one additional audit check we should add before scaling this workflow to real state film office, IPUMS, QCEW, and proprietary financial data."
    ],
    checks: [
      "Human review points are explicit.",
      "No ambiguous case is treated as confirmed investor participation.",
      "The audience sees audits as research infrastructure."
    ]
  },
  {
    id: "script",
    title: "Live Demo Prompts",
    step: "Keep Codex and the guide side by side",
    tag: "Demo",
    duration: "6 min",
    body: [
      "This final module gives the instructor a compact path through the repo. Keep this site open beside Codex, click through modules, and paste the prompt snippets when the room is ready for the next step.",
      "The goal is not to show perfect automation. The goal is to show how a research assistant can steer an agent, inspect outputs, and decide where judgment remains."
    ],
    commands: [
      "open docs/live_demo_script.md",
      "git status --short"
    ],
    prompts: [
      "Create a concise seminar recap: what Codex did, what the human checked, and what would change with real state film office/IPUMS/QCEW/proprietary data.",
      "Turn the audit findings into a three-bullet update email to the fictional PI."
    ],
    checks: [
      "Every generated output has been inspected.",
      "The demo ends with a human-readable PI update.",
      "The class can name one workflow habit they can reuse."
    ]
  }
];

let activeModuleId = modules[0].id;
const stateKey = "hollywood-film-tax-credit-demo-progress";

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
      <span class="module-index">${progress[module.id] ? "Done" : index + 1}</span>
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
