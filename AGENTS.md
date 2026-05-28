# AGENTS.md

These are repo-level instructions for editing the workshop site itself. They are different from the participant-created `school_lunch_modernization_grants/AGENTS.md` described inside the fictional workshop workflow.

## Start Here

Before revising workshop copy, prompts, module structure, or frontend behavior, read:

- `docs/workshop_revision_rubric.md`
- `README.md`
- the relevant module data in `docs/app.js`
- the matching facilitator notes in `docs/live_demo_script.md`

Use the rubric as the shared framework for judging future edits.

## Editing Principles

- Keep the guide realistic: full steps should represent real research actions or meaningful artifacts.
- Treat modern agentic coding tools as capable. Do not over-explain obvious file, path, or missing-input behavior unless it is a real teaching issue.
- Teach beginner supervision through concise prompts, concrete outputs, and plain English explanations.
- Prefer precise headers over abstract labels.
- Prefer a paragraph or prompt phrase over a new card, table, or step when the idea is simple.
- Keep safety guidance focused on research risk: ambiguity, row drops, unsupported classifications, unverifiable outputs, and hidden assumptions.
- Avoid "audience review" language, meta-narrative labels, and overengineered workshop scaffolding.

## File Responsibilities

- `docs/app.js`: main guide content, module structure, prompts, context blocks, and rendering logic.
- `docs/styles.css`: guide styling.
- `docs/guide.html`: full guide shell and cache-busted asset references.
- `docs/setup.html`: setup-only shell and cache-busted asset references.
- `docs/live_demo_script.md`: facilitator walkthrough. Update this when module order, prompts, or artifact names change.
- `README.md`: project overview and high-level workflow.
- `docs/workshop_revision_rubric.md`: master standard for future revisions.

## Frontend Checks

When editing `docs/app.js`:

- Run `node --check docs/app.js`.
- Bump the `app.js?v=...` token in both `docs/guide.html` and `docs/setup.html`.
- Verify the changed module in the in-app browser when the change affects visible content.

When editing `docs/styles.css`:

- Bump the `styles.css?v=...` token in both `docs/guide.html` and `docs/setup.html`.
- Verify the affected view in the in-app browser.

Always run `git diff --check` on changed files before finishing.

## Copy Rules

Use plain language. A good paragraph usually beats a clever label.

Good examples:

- "This prompt should create `docs/data_intake_and_role_rubric.md`."
- "The intake note should define the decision rules; the row-level classification table comes later in the classification pass."
- "Use the saved ZIP at `data/original/school_lunch_modernization_raw_data.zip`."

Avoid:

- "Guardrails"
- "Safety Lessons"
- "Boundary For This Pass"
- "Narrative turn"
- "Audience Review Notes"
- repeated warnings about basic missing-file behavior

## Do Not

- Do not revert unrelated local changes.
- Do not rename the workflow or artifacts without updating `docs/live_demo_script.md` and `README.md`.
- Do not add new renderer features for one-off copy if existing paragraphs, notes, tables, or cards can express the idea.
- Do not make participant-facing steps more ceremonial than a real researcher workflow would be.
