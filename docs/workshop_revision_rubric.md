# Workshop Revision Rubric

Use this rubric when revising the STAX agentic coding workshop guide, live demo script, prompts, or supporting docs. The goal is to keep the workshop realistic, beginner-friendly, and research-native without making modern agentic coding tools sound brittle or incompetent.

## Core Vision

This workshop should feel like a real predoc research workflow:

- A PI request arrives.
- The participant creates a project folder.
- Source materials are saved.
- The agent inspects raw files.
- The researcher defines judgment rules.
- Reviewer passes handle ambiguous classifications.
- The agent builds outputs.
- Audit notes preserve uncertainty and caveats.

The teaching should be embedded in that workflow. Do not turn every safety habit into a standalone ritual. The workshop should teach supervision through realistic prompts, clear artifacts, and plain-language explanations.

## Design Principles

### 1. Real Workflow Test

Good changes represent work a researcher would actually do in sequence.

Use a full step for actions that create, inspect, or approve meaningful artifacts:

- saving project materials
- creating project memory files
- inspecting raw data
- drafting a rubric
- planning reviewer passes
- creating a classification CSV
- building the panel
- reviewing an audit note

Do not create a full step for obvious file checks, redundant warnings, or process labels that can be folded into a sentence, prompt, note, or checklist.

### 2. Agent Competence Test

Assume frontier coding agents are capable of ordinary file and code navigation. Do not write copy that sounds like the agent is too dumb to notice basic missing files, obvious paths, or routine execution errors.

Focus guidance on the human research role:

- what evidence matters
- what assumptions need review
- what should stay ambiguous
- what output should be inspectable
- what judgment calls should be carried forward

### 3. Beginner Help Test

Beginners need orientation, not condescension.

Good beginner-facing copy:

- explains the purpose of the step
- names the expected artifact
- uses plain research language
- clarifies what happens now versus later
- avoids jargon unless the workflow itself requires it

Revise copy that overexplains obvious mechanics or hides the real research issue behind process language.

### 4. Step, Note, Prompt, Or Delete

Use this decision rule before adding material:

- Full step: the user performs a meaningful action or creates/reviews an artifact.
- Plain paragraph: the reader needs a short explanation of what the next prompt should achieve.
- Note/card/table: the concept helps scan a real step but is not itself an action.
- Prompt phrase: a small boundary belongs inside the prompt.
- Delete: the material repeats what the prompt, title, or surrounding text already says.

When in doubt, compress.

### 5. Header Clarity Test

Headers should say exactly what the section is for.

Prefer:

- `What We're Looking For`
- `Inspection Output, Not Analysis Output`
- `What The Rubric Must Specify`
- `What The Rubric Should Prevent`
- `Quick Verify Before Module 5`

Avoid vague or meta headers:

- `Guardrails`
- `Safety Lessons`
- `Boundary For This Pass`
- `Conservative Means`
- `Audience Review Notes`
- `Narrative Turn`

If a header needs explanation, rewrite the header.

### 6. Prompt Realism Test

Prompts should look like something a capable researcher would actually send.

Good prompts:

- give the relevant input path or context
- ask for one bounded action
- name the expected output artifact
- request the evidence or checks that matter
- include a stop boundary only when it prevents a real downstream risk

Avoid prompts that:

- split ordinary work into too many planning micro-steps
- repeatedly warn about obvious missing-file behavior
- sound like compliance forms
- bury the main task under process scaffolding

### 7. Artifact Test

Every major step should leave behind something useful:

- markdown handoff summary
- README / AGENTS / CLAUDE project memory
- raw-data preliminary pass
- classification rubric
- reviewer plan
- reviewer notes
- analysis-ready CSV
- script
- audit note
- PI update

If a step produces only "process," reconsider whether it should be a step.

### 8. Verification Test

Verification should focus on research risks, not obvious mechanics.

Good verification checks:

- row counts and expected years
- one row per intended unit
- categories use allowed values
- ambiguous rows are visible
- unmatched records are reported
- original assumptions are documented
- audit notes explain judgment calls

Weak verification checks:

- repeated reminders that a file may be missing
- restating an expected filename after it is already in the prompt
- checking for outputs that the prompt already explicitly forbids unless there is a real risk of overreach

### 9. Tone Test

The guide should sound practical, calm, and research-native.

Use:

- direct verbs
- precise nouns
- plain English explanations
- realistic RA workflow language

Avoid:

- overdesigned workshop labels
- meta-teaching language
- cute process names unless they add real clarity
- copy that implies the audience is being managed
- copy that implies the agent is incompetent

### 10. Compression Test

Before finalizing a change, ask:

- Can this be one sentence instead of a card?
- Can this be a prompt phrase instead of a step?
- Can this table be a paragraph?
- Does this repeat something nearby?
- Would a real researcher keep reading?

Shorter is better when it preserves the research meaning.

## Future-Edit Checklist

Before sending a final answer after workshop edits:

- Check that changed steps still follow the real workflow sequence.
- Remove redundant warnings or labels.
- Make headers precise and literal.
- Make prompts concise but bounded.
- Keep verification focused on research risks.
- Update `docs/live_demo_script.md` when the guide flow changes.
- Update cache tokens in `docs/guide.html` and `docs/setup.html` when `docs/app.js` or `docs/styles.css` changes.
- Run `node --check docs/app.js` after JavaScript edits.
- Run `git diff --check` on changed files.
- Use the in-app browser for meaningful frontend changes.
