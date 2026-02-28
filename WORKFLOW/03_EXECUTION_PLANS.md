# 03 — Execution Plans as First-Class Artifacts

> "Plans are treated as first-class artifacts... allowing agents to operate without relying on external context."  
> — OpenAI Harness Engineering

---

## Why Plans Matter

When agents work on complex tasks, they need:
- **Memory** — What was decided and why
- **Continuity** — Pick up where the last session left off
- **Accountability** — Track progress, blockers, and decisions
- **Visibility** — Other agents and humans can see the full picture

Plans provide all of this. They are **versioned, committed, and co-located** with the code they describe.

---

## Plan Types

### Lightweight Plans (Small Changes)

For tasks that take 1-2 PRs, a lightweight plan is sufficient. This can be a simple markdown section in the PR description or a brief file:

```markdown
# Plan: Fix portfolio card hover state

## Goal
Fix the hover animation on portfolio cards that currently flickers on mobile.

## Approach
1. Replace CSS `:hover` with GSAP-driven hover via `onMouseEnter`/`onMouseLeave`
2. Add touch detection to skip hover on mobile entirely

## Acceptance Criteria
- [ ] No flicker on iOS Safari
- [ ] Hover animation works on desktop Chrome/Firefox
- [ ] No layout shift during hover
```

### Full Execution Plans (Complex Changes)

For tasks spanning 3+ PRs or involving architectural decisions, use a full execution plan:

```markdown
# Execution Plan: [Feature Name]

## Status: 🟡 In Progress
**Created:** [DATE]  
**Last Updated:** [DATE]  
**Owner:** [NAME or AGENT]

## Goal
[What are we trying to achieve and why]

## Context
[Background, references to design docs, related plans]

## Phases

### Phase 1: [Name] — ✅ Complete
- [x] Task A
- [x] Task B
- **Decision:** Chose approach X over Y because [reason]
- **PR:** #123

### Phase 2: [Name] — 🟡 In Progress
- [x] Task C
- [ ] Task D
- **Blocker:** Waiting on [dependency]

### Phase 3: [Name] — ⬜ Not Started
- [ ] Task E
- [ ] Task F

## Decision Log
| Date | Decision | Rationale |
|------|----------|-----------|
| [DATE] | Chose X over Y | [reason] |
| [DATE] | Deferred Z | [reason] |

## Risks & Mitigations
- **Risk:** [description] → **Mitigation:** [approach]

## Acceptance Criteria
- [ ] All tests pass
- [ ] No performance regression
- [ ] Documentation updated
```

---

## Directory Structure

```
docs/exec-plans/
├── active/                     ← Currently in-progress plans
│   ├── feature-hero-redesign.md
│   └── infra-ci-pipeline.md
├── completed/                  ← Archived completed plans
│   ├── 2026-01-auth-flow.md
│   └── 2026-02-portfolio-cards.md
└── tech-debt-tracker.md        ← Living inventory of known debt
```

---

## Lifecycle

```
Created → Active → Completed
             │
             └──→ Paused (with reason)
             └──→ Abandoned (with reason)
```

1. **Created:** Plan is written, reviewed, placed in `active/`
2. **Active:** Work is underway. Plan is updated with progress after each session
3. **Completed:** All acceptance criteria met. Plan moves to `completed/` with a summary
4. **Paused/Abandoned:** Document why, so future agents don't re-discover the problem

---

## Tech Debt Tracker Template

```markdown
# Tech Debt Tracker

> Last reviewed: [DATE]

## Priority: High 🔴
| Debt | Impact | Location | Effort | Notes |
|------|--------|----------|--------|-------|
| [description] | [what breaks or degrades] | [files/area] | [S/M/L] | |

## Priority: Medium 🟡
| Debt | Impact | Location | Effort | Notes |
|------|--------|----------|--------|-------|
| [description] | [what breaks or degrades] | [files/area] | [S/M/L] | |

## Priority: Low 🟢
| Debt | Impact | Location | Effort | Notes |
|------|--------|----------|--------|-------|
| [description] | [what breaks or degrades] | [files/area] | [S/M/L] | |
```

---

## Rules

1. **Plans live in the repo** — Never in external docs, chat, or people's heads
2. **Plans are versioned** — Commit updates alongside the code changes they describe
3. **Active plans have a status** — 🟢 On Track / 🟡 In Progress / 🔴 Blocked / ⬜ Not Started
4. **Decision log is mandatory for complex plans** — Future agents need to know *why*, not just *what*
5. **Move to completed, don't delete** — Historical plans are context for future work
6. **Update the plan after every session** — If you touched code related to a plan, update its checkboxes and decision log
