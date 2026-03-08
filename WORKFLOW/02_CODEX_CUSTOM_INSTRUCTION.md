# 02 - Codex Custom Instruction Template

This file contains the recommended custom instruction for Codex when working in this repository.

Use it as the default instruction block for Codex sessions tied to this codebase.

## Copy/Paste Instruction

```text
You are Codex working inside a repository that uses AGENTS.md and WORKFLOW/01_WORKFLOW.md as mandatory operating documents.

Before starting meaningful work, run a pre-flight task classification:

1. Simple
- single-file or tightly bounded task
- low risk
- no architecture decisions
- minimal repo discovery needed

2. Medium
- bounded multi-file task
- moderate UI, logic, or animation work
- touches shared systems or a feature already in progress
- some repo discovery required

3. Complex
- new feature
- new animation system
- cross-cutting refactor
- architectural change
- multi-session work
- tasks requiring design docs, workflow docs, or handoff tracking

Routing rule:
- For Simple tasks, use the lowest safe reasoning tier supported by the environment.
- For Medium tasks, use the medium reasoning tier supported by the environment.
- For Complex tasks, use the highest reasoning tier supported by the environment.

If the environment supports explicit model or route selection, choose the route that matches the task class. If not, still apply the same reasoning discipline and planning depth.

Discovery rule:
- For Simple tasks, inspect only the immediately relevant files unless risk increases.
- For Medium tasks, read AGENTS.md when touching shared UI, animation, routing, theming, docs, or feature work. Read WORKFLOW/01_WORKFLOW.md when the task affects process, architecture, or multi-file coordination.
- For Complex tasks, always read:
  - AGENTS.md
  - WORKFLOW/01_WORKFLOW.md
  - relevant architecture, design, and strategy docs
  - any active feature folder related to the task

Complex-task rule:
- Do not begin implementation for a Complex task until the repo instructions and relevant active feature context have been read.

Feature continuity rule:
- For any new feature, animation system, multi-session effort, or cross-page UI change, create or update a feature folder at:
  docs/exec-plans/active/<feature-slug>/

Required files inside the feature folder:
- README.md
- plan.md
- todo.md
- done.md
- decisions.md
- handoff.md
- verification.md
- assets-prompts.md when image or asset generation is involved

Feature-folder update rule:
- Update todo.md before or during active work.
- Update done.md whenever a meaningful task is completed.
- Update decisions.md whenever an implementation choice is made or reversed.
- Update handoff.md at the end of a working session so another agent can resume without chat history.
- Update verification.md whenever checks, builds, or visual reviews are run.

Resume rule:
- When a feature folder exists, read in this order before continuing feature work:
  1. README.md
  2. plan.md
  3. todo.md
  4. done.md
  5. decisions.md
  6. handoff.md
  7. verification.md
  8. assets-prompts.md if present

Completion rule:
- When a feature is complete, move or archive the folder under docs/exec-plans/completed/ and update CHANGELOG.md.
```

## Notes

- This instruction is designed to work with the repository rules in [AGENTS.md](file:///c:/Users/Leon/DevMode/kossy-langat-website/AGENTS.md) and [01_WORKFLOW.md](file:///c:/Users/Leon/DevMode/kossy-langat-website/WORKFLOW/01_WORKFLOW.md).
- The feature-folder template lives at [feature-work template](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/_templates/feature-work/README.md).
