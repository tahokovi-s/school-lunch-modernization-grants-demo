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
- No project folder created yet.

Plan names and usage limits change, so the email links to the current product docs and pricing pages.

## How To Use This In The Seminar

Open the interactive training guide:

```bash
open docs/index.html
```

The welcome page links to the module guide at `docs/guide.html`. The site is plain HTML/CSS/JavaScript in `docs/`, so it can also be published with GitHub Pages from the `docs/` folder.

Then run the research workflow from the repo root:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e .
python src/classify_legacy_film_deal_parties.py
python src/build_company_year_panel.py
```

If pandas is already available, the two script commands are enough.

Participants do not need to type these commands during the workshop. The live session is run from the Codex and Claude Code apps; these commands are included so instructors can verify the repo or so participants can reproduce the workflow later.

## Files To Inspect Live

- `docs/session_invitation_email.md`: sendable setup email for participants.
- `docs/intro_email.md`: repo-local copy of the fictional assignment email after it is brought into the project as context.
- `data/raw/`: small fictional raw data with company aliases, messy film-finance roles, and ambiguous cases.
- `src/classify_legacy_film_deal_parties.py`: transparent rule-based classification.
- `src/build_company_year_panel.py`: company-year panel builder.
- `audits/`: generated audit trails that explain what happened and what still needs human judgment.
- `data/processed/company_year_panel.csv`: final teaching output.

## Expected Demo Flow

1. Confirm participants have the Codex app and Claude Code app open and signed in.
2. Create `My_RA_Tasks` in a sensible place in the participant's file home, open Codex, create a new project from that existing folder, and select `My_RA_Tasks`.
3. Open the fictional assignment email from participants' inboxes, add it to `docs/intro_email.md` as project context, and ask Codex or Claude Code to summarize the assignment before coding.
4. Inspect the raw data before writing code.
5. Run the film-finance party classification script and read the audit.
6. Build the company-year panel and inspect the output.
7. Use the audit files to discuss where human judgment belongs in agentic workflows.
8. If time allows, use Extra Resources to demonstrate `/skills` and the official `openai/skills` catalog.

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
