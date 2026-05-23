# Session Invitation Email Template

Subject: Setup for STAX Lab Codex / Claude Code training

Hi everyone,

Ahead of the STAX Lab training session on Thursday, May 28, 2026, please take 20-30 minutes to confirm the setup below. You do not need to create a project folder yet. The project workflow will be created and opened during the session.

The workshop shows how to use coding agents for a realistic predoc-style research workflow: reading a project handoff, inspecting messy data, writing small Python scripts, building an auditable panel, and deciding where human judgment belongs.

## Setup Checklist

- [ ] The Codex app is installed, opens, and is signed in. Setup help: `docs/setup/codex.html`
- [ ] Codex has been asked to install only the selected workshop skills from the official OpenAI skills repo. Setup help: `docs/setup/skills.html`
- [ ] The Claude Code app is installed, opens, and is signed in. Setup help: `docs/setup/claude-code.html`
- [ ] Paid or institutional access is available for Codex and Claude Code. Setup help: `docs/setup/access.html`
- [ ] No project folder has been created yet. Setup help: `docs/setup/no-project-folder.html`

The public training guide has a "Guide" button next to each checklist item for step-by-step help on macOS and Windows.

## Please Install Or Confirm Access

1. Codex

   Codex is OpenAI's coding agent. Please make sure the Codex app launches and is signed in with a ChatGPT account that includes Codex access. Plan names and limits change, so check the current pages before subscribing:

   - Codex app page: https://openai.com/codex/
   - ChatGPT pricing: https://chatgpt.com/pricing

2. Claude Code

   Claude Code is Anthropic's coding agent. Please make sure the Claude Code desktop app launches and is signed in with an account that includes Claude Code access. Check the current pages before subscribing:

   - Claude Code desktop guide: https://code.claude.com/docs/en/desktop-quickstart
   - Claude plan guide: https://support.claude.com/en/articles/11049762-choose-a-claude-plan

## After Codex Is Installed: Skills Warm-Up

During the workshop, Codex skills will be used with `/skills` and `$skill-name` prompts. After the Codex app is installed and signed in, use the official OpenAI skills catalog:

```text
https://github.com/openai/skills
```

The selected workshop skills are:

- `define-goal`
- `openai-docs`
- `pdf`
- `jupyter-notebook`

Copy this into Codex:

```text
Use $skill-installer with https://github.com/openai/skills as the official skills catalog. Install only this workshop set if the skills are not already available: define-goal, openai-docs, pdf, and jupyter-notebook. Do not install any other skills. Before changing any user-level or Global Codex settings, explain exactly what you will change and wait for my confirmation. After installation, tell me to restart Codex and show me how to confirm the skills are available.
```

If Codex says one of these skills is already built in or already installed, that is fine. Do not install extra skills to compensate.

## What To Bring

- A laptop with the Codex app and Claude Code app installed.
- Codex and Claude Code signed in.
- No project folder needed before Thursday.

If any setup step fails, the first block of the session includes time for setup help.

Best,

[Facilitator Name]
