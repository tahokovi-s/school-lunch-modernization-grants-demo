# Sendable Session Invitation Email

Subject: Setup for STAX Lab Codex / Claude Code training

Hi everyone,

Ahead of our STAX Lab training session, please take 20-30 minutes to set up the tools we will use in the live demo. You do not need to create a project folder yet. We will do that together during the session.

The workshop will show how to use coding agents for a realistic predoc-style research workflow: reading a project handoff, inspecting messy data, writing small Python scripts, building an auditable panel, and deciding where human judgment belongs.

## Please Install Or Confirm Access

1. Codex

   Codex is OpenAI's coding agent. Please make sure you can launch Codex and sign in with a ChatGPT plan that includes Codex access. ChatGPT Plus is currently listed at $20/month, and OpenAI's Codex docs say Plus, Pro, Business, Edu, and Enterprise plans include Codex. Check the current pages before subscribing:

   - Codex CLI docs: https://developers.openai.com/codex/cli
   - ChatGPT Plus help page: https://help.openai.com/en/articles/6950777-chatgpt-plus-.eps
   - ChatGPT pricing: https://chatgpt.com/pricing

   Quick check:

   ```bash
   codex --version
   ```

2. Claude Code

   Claude Code is Anthropic's coding agent. Please make sure you can launch it and sign in with Claude Pro, Max, Team, Enterprise, Console, or equivalent institutional access. Claude's plan guide currently lists Pro at $20/month in the US, and Claude Code docs say the free Claude.ai plan does not include Claude Code access.

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

During the workshop we will use Codex skills with `/skills` and `$skill-name` prompts. After Codex is installed, please try opening Codex and running:

```text
/skills
```

We will also look at OpenAI's official skills catalog:

https://github.com/openai/skills

If you want to preview the skill-install flow, do not worry about choosing a skill yet. Just ask Codex:

```text
$skill-installer list curated skills from the official openai/skills repository. Do not install anything yet.
```

During the session, I may have everyone install one lightweight example skill and restart Codex so you can see how skills change the agent's behavior.

## What To Bring

- A laptop where you can install command-line tools.
- Codex and Claude Code logged in.
- A terminal open.
- No project folder needed yet.

If any setup step fails, come anyway. The first block of the session is a setup clinic.

Best,

[Your Name]
