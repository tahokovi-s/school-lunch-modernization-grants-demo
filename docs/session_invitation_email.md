# Session Invitation Email Template

Subject: Setup for STAX Lab Codex / Claude Code training

Hi everyone,

Ahead of the STAX Lab training session on Thursday, May 28, 2026, please take 20-30 minutes to confirm the setup below. You do not need to create a project folder yet. The project workflow will be created and opened during the session.

The workshop shows how to use coding agents for a realistic predoc-style research workflow: reading a project handoff, inspecting messy data, writing small Python scripts, building an auditable panel, and deciding where human judgment belongs.

## Setup Checklist

- [ ] Codex is installed, opens, and is signed in. Setup help: `docs/setup/codex.html`
- [ ] Claude Code is installed, opens, and is signed in. Setup help: `docs/setup/claude-code.html`
- [ ] Paid or institutional access is available for Codex and Claude Code. Setup help: `docs/setup/access.html`
- [ ] These terminal checks print versions. Setup help: `docs/setup/terminal-checks.html`

  ```bash
  codex --version
  claude --version
  git --version
  python3 --version
  ```

- [ ] The `/skills` menu opens inside Codex. Setup help: `docs/setup/skills.html`
- [ ] No project folder has been created yet. That happens during the session.

The public training guide has a "Guide" button next to each checklist item for step-by-step help on macOS and Windows.

## Please Install Or Confirm Access

1. Codex

   Codex is OpenAI's coding agent. Please make sure Codex launches and is signed in with a ChatGPT plan that includes Codex access. ChatGPT Plus is currently listed at $20/month, and OpenAI's Codex docs say Plus, Pro, Business, Edu, and Enterprise plans include Codex. Check the current pages before subscribing:

   - Codex CLI docs: https://developers.openai.com/codex/cli
   - ChatGPT Plus help page: https://help.openai.com/en/articles/6950777-chatgpt-plus-.eps
   - ChatGPT pricing: https://chatgpt.com/pricing

   Quick check:

   ```bash
   codex --version
   ```

2. Claude Code

   Claude Code is Anthropic's coding agent. Please make sure it launches and is signed in with Claude Pro, Max, Team, Enterprise, Console, or equivalent institutional access. Claude's plan guide currently lists Pro at $20/month in the US, and Claude Code docs say the free Claude.ai plan does not include Claude Code access.

   - Claude Code install docs: https://code.claude.com/docs/en/installation
   - Claude plan guide: https://support.claude.com/en/articles/11049762-choose-a-claude-plan
   - Using Claude Code with Pro or Max: https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan

   Quick checks:

   ```bash
   claude --version
   claude doctor
   ```

3. Git and Python

   Please make sure these commands work:

   ```bash
   git --version
   python3 --version
   ```

## Skills Warm-Up

During the workshop, Codex skills will be used with `/skills` and `$skill-name` prompts. After Codex is installed, open Codex and try:

```text
/skills
```

The workshop also uses OpenAI's official skills catalog:

https://github.com/openai/skills

To preview the skill-install flow without installing anything, ask Codex:

```text
$skill-installer list curated skills from the official openai/skills repository. Do not install anything yet.
```

An optional live exercise may install one lightweight example skill and restart Codex so everyone can see how skills change the agent's behavior.

## What To Bring

- A laptop where command-line tools can be installed.
- Codex and Claude Code logged in.
- A terminal open.
- No project folder needed before Thursday.

If any setup step fails, the first block of the session includes time for setup help.

Best,

[Facilitator Name]
