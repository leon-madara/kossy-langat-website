# 01 — Core Agent Workflow & Operating Model

> "Humans steer. Agents execute."  
> — OpenAI Harness Engineering

---

## Philosophy

The engineer's job is **not** to write code. It is to:

1. **Design environments** — Make the codebase navigable and structured for agents
2. **Specify intent** — Write clear prompts, acceptance criteria, and constraints
3. **Build feedback loops** — Tests, lints, CI, and review processes that tell agents when they're wrong

Code is the agent's output. Humans provide direction, quality gates, and judgment.

---

## The Core Loop

```
┌─────────────────────────────────────────────────┐
│                  HUMAN LAYER                     │
│                                                  │
│  1. Identify task / break down goals             │
│  2. Write prompt with clear acceptance criteria   │
│  3. Provide relevant context pointers            │
│                                                  │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│                  AGENT LAYER                     │
│                                                  │
│  4. Agent reads AGENTS.md → docs → relevant code │
│  5. Agent creates execution plan (if complex)    │
│  6. Agent writes code, tests, and docs           │
│  7. Agent self-reviews using local tools          │
│  8. Agent opens PR                               │
│                                                  │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│                 REVIEW LAYER                     │
│                                                  │
│  9. Agent-to-agent review (if configured)        │
│ 10. Human review (if required by policy)         │
│ 11. Iterate on feedback                          │
│ 12. Merge                                        │
│                                                  │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│               FEEDBACK LAYER                     │
│                                                  │
│ 13. CI validates (tests, lints, build)           │
│ 14. If failures → agent self-fixes               │
│ 15. If blockers → escalate to human              │
│ 16. Update docs / plans if architecture changed  │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## Levels of Autonomy

Not every task has the same level of agent independence. Calibrate based on risk:

### Level 1 — Simple Fix (Highest Autonomy)
- Bug fix with clear reproduction steps
- Agent can: fix, test, open PR, respond to review, merge
- Human involvement: skim the diff, approve

### Level 2 — Feature Implementation (Supervised)
- New feature with a spec or design doc
- Agent can: plan, implement, test, open PR
- Human involvement: review the plan, review the PR, validate behavior

### Level 3 — Architectural Change (Collaborative)
- Changes to boundaries, layers, or core abstractions
- Agent can: draft a plan, prototype
- Human involvement: approve the plan, pair-review implementation, validate invariants

### Level 4 — Strategic Decision (Human-Led)
- Technology choice, product direction, deprecation strategy
- Agent can: research, summarize options, draft proposals
- Human involvement: make the decision, have agent execute it

---

## Writing Effective Prompts

Good prompts have:

| Element | Example |
|---------|---------|
| **Context** | "In the portfolio section (`src/components/sections/Portfolio.tsx`)..." |
| **Intent** | "...add lazy loading for project images..." |
| **Constraints** | "...using native `loading='lazy'` attribute, no external libraries..." |
| **Acceptance criteria** | "...images below the fold should not load until scrolled into view." |
| **Pointers** | "See `docs/design-docs/portfolio_spec.md` for the card layout." |

Bad prompts: "make the portfolio better" — too vague, no constraints, no verifiable outcome.

---

## When the Agent Struggles

When the agent fails or produces poor output, **don't try harder**. Instead ask:

> "What capability is missing, and how do I make it both legible and enforceable for the agent?"

Typical root causes and fixes:

| Symptom | Root Cause | Fix |
|---------|-----------|-----|
| Agent ignores a convention | Convention not documented | Add to `GOLDEN_PRINCIPLES.md` |
| Agent can't find relevant code | No architecture map | Update `ARCHITECTURE.md` |
| Agent produces inconsistent patterns | No structural enforcement | Add a lint rule |
| Agent generates incorrect logic | No test coverage for the area | Write a test spec first |
| Agent hallucinates an API | Dependency is opaque/undocumented | Add reference docs or reimplement |

---

---

## 🔍 Change Discoverability & Reporting

Every "Serious Change" (Level 3 or 4) must be made discoverable through formal logging. This ensures the codebase remains legible to both humans and other agents.

### The Discoverability Protocol
1. **Log in `CHANGELOG.md`**: Add an entry under the appropriate category (`Added`, `Changed`, `Fixed`, `Deprecated`).
2. **Context Linkage**: Link the changelog entry to any new or updated documentation files.
3. **Notify on Completion**: Use `notify_user` to provide a concise summary of the change and point to the updated docs.

### What Constitutes a "Serious Change"?
- Changes to core architectural layers (e.g., introducing a new dependency, changing the directory structure).
- Significant feature additions that modify the site's layout or behavior.
- Breaking changes to internal APIs or shared components.
- Updates to `GOLDEN_PRINCIPLES.md` or `ARCHITECTURE.md`.

---

## Task Breakdown Strategy

Break work **depth-first**, not breadth-first:

1. **Identify the goal** — e.g., "Add a contact form section"
2. **Identify the building blocks** — e.g., form component, validation logic, API endpoint, styles
3. **Build blocks bottom-up** — Start with the smallest, most independent piece
4. **Compose** — Use completed blocks to build the larger feature
5. **Validate** — Run tests, visual checks, acceptance criteria

Each block should be a single PR. This keeps diffs small, feedback tight, and agent context focused.

---

## Anti-Patterns

| Anti-Pattern | Why It Fails |
|-------------|-------------|
| One giant prompt for a whole feature | Agent context overflows, output is incoherent |
| Manually fixing agent code | You bypass the feedback loop — the fix won't stick |
| Skipping docs because "it's obvious" | It's obvious to you today, illegible to agent tomorrow |
| Reviewing every line like a human wrote it | Bottleneck. Focus on correctness and invariants, not style |
| Hoarding knowledge in Slack/chat | If it's not in the repo, it doesn't exist for agents |
