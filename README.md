# Hollywood Film Tax Credit Buyers Demo

This is a compact, fictional teaching repo for an introductory STAX Lab seminar on using Codex / Claude Code for agentic AI research workflows. The example is Python-first and simulates a realistic predoc assignment at the intersection of empirical accounting, tax, public finance, and entertainment finance.

The session now starts before participants have a project folder. Use `docs/session_invitation_email.md` as the pre-session setup email. During the live workflow, participants create a `My_RA_Tasks` folder as their workshop project root, open that folder in Codex, and then work from a separate fictional assignment email sent to their inboxes.

The research scenario is fictional: a state film incentive program lets movie and streaming productions sell unused production tax credits to companies with enough tax capacity to use them. The task is to build a buyer-side company-year panel showing which companies bought film tax credits and which companies previously participated in legacy film-finance deals.

No real project data, confidential records, or real firm financials are used.

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

The live GitHub Pages site is:

`https://tahokovi-s.github.io/hollywood-film-tax-credit-buyers-demo/`

For pre-session sharing, use the setup-only URL:

`https://tahokovi-s.github.io/hollywood-film-tax-credit-buyers-demo/setup.html`

This is a soft lock for a public static site: it renders only Module 1 in the guide UI, but it is not a security boundary.

For instructor code-only verification, the repo still includes a deterministic fallback script:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e .
python src/classify_legacy_film_deal_parties.py
python src/build_company_year_panel.py
```

If pandas is already available, the two script commands are enough.

Participants do not need to type these commands during the workshop. The live session is run from the Codex and Claude Code apps. In the main teaching flow, Module 4 asks Codex or Claude Code to coordinate subagent reviewers and create `data/processed/legacy_film_party_classifications.csv` plus an audit note; the Python classifier remains only as an instructor fallback or code-only reproducibility check.

## Files To Inspect Live

- `docs/session_invitation_email.md`: sendable setup email for participants.
- `docs/intro_email.pdf` or `docs/intro_email.eml`: participant-saved copy of the fictional assignment email after it is brought into the project as context. This repo also includes `docs/intro_email.md` as a facilitator fallback copy.
- `docs/attachments/film_tax_credit_raw_data.zip`: facilitator copy of the raw-data ZIP to attach to the fictional PI email.
- `docs/email_handoff_summary.md`: agent-created markdown summary and action list produced from the saved assignment email during Module 2.
- `data/raw/film_tax_credit_raw_data.zip`: participant-saved copy of the PI email attachment during Module 3.
- `data/raw/*.csv`: fictional raw data after the agent extracts the ZIP, with company aliases, messy film-finance roles, unmatched buyers, and ambiguous cases.
- `docs/legacy_film_classification_rubric.md`: agent-created rubric for subagent classification during Module 3.
- `docs/legacy_film_subagent_review_plan.md`: agent-created reviewer plan for Module 4.
- `data/processed/legacy_film_party_classifications.csv`: subagent-reviewed classification artifact produced during Module 4.
- `src/classify_legacy_film_deal_parties.py`: optional deterministic fallback for instructors, not the main participant workflow.
- `src/build_company_year_panel.py`: company-year panel builder.
- `audits/`: generated audit trails that explain what happened and what still needs human judgment.
- `data/processed/company_year_panel.csv`: final teaching output.

## Expected Demo Flow

1. Confirm participants have the Codex app and Claude Code app open and signed in.
2. Ask Codex to confirm Python is installed and can run a tiny Python script.
3. Create `My_RA_Tasks` in a sensible place in the participant's file home, open Codex, create a new project from that existing folder, and select `My_RA_Tasks`.
4. Open the fictional assignment email from participants' inboxes, save or export it to `docs/intro_email.pdf` or `docs/intro_email.eml` as project context, and ask Codex or Claude Code to create `docs/email_handoff_summary.md` before coding.
5. Download the raw-data ZIP attachment from the fictional PI email, place it in `data/raw/`, ask Codex or Claude Code to unzip it, inspect the extracted CSVs, draft a classification rubric, and plan subagent reviewer roles.
6. Ask Codex or Claude Code to coordinate subagent reviewers for the legacy film-finance party classification, reconcile disagreements conservatively, and write the classification CSV plus audit note.
7. Build the company-year panel and inspect the output.
8. Use the audit files to discuss where human judgment belongs in agentic workflows.
9. If time allows, use Extra Resources to demonstrate `/skills` and the official `openai/skills` catalog.

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
