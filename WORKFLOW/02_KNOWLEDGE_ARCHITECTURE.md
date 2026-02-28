# 02 — Repository Knowledge Architecture

> "Give agents a map, not a 1,000-page instruction manual."  
> — OpenAI Harness Engineering

---

## Core Principle: Progressive Disclosure

Agents should navigate knowledge in layers, not drown in a monolith:

```
AGENTS.md (the map — ~100 lines)
    └── docs/index.md (the index — links to everything)
            ├── docs/ARCHITECTURE.md (system boundaries)
            ├── docs/GOLDEN_PRINCIPLES.md (non-negotiable rules)
            ├── docs/design-docs/ (feature specs)
            ├── docs/exec-plans/ (versioned plans)
            ├── docs/references/ (deep technical guides)
            └── docs/reports/ (audits, metrics, assessments)
```

**Layer 1 — AGENTS.md:** "Here's what this project is, here's where to look."  
**Layer 2 — docs/index.md:** "Here's everything we know, organized by category."  
**Layer 3 — Individual docs:** Deep dives into specific topics.

---

## Standard `docs/` Directory Layout

```
docs/
├── index.md                    ← Master index with links to every doc
│
├── ARCHITECTURE.md             ← System boundaries, layers, dependency rules
├── GOLDEN_PRINCIPLES.md        ← Non-negotiable codebase rules
│
├── design-docs/                ← Feature-level design specifications
│   ├── index.md                ← Catalog of all design docs
│   ├── [feature-name].md       ← Individual feature spec
│   └── ...
│
├── exec-plans/                 ← Execution plans (first-class artifacts)
│   ├── active/                 ← Currently in-progress plans
│   ├── completed/              ← Archived completed plans
│   └── tech-debt-tracker.md    ← Known tech debt inventory
│
├── references/                 ← Deep technical guides, style guides
│   ├── [topic].md              ← e.g., css-guide.md, animation-reference.md
│   └── ...
│
├── product-specs/              ← Product-level specifications
│   ├── index.md
│   └── [feature].md
│
├── generated/                  ← Auto-generated docs (DB schemas, API specs)
│   └── ...
│
└── reports/                    ← Audits, performance reports, assessments
    └── ...
```

---

## What Goes Where

| Content Type | Location | Example |
|-------------|----------|---------|
| "What is this project" | `AGENTS.md` | Tech stack, directory map, key rules |
| "How is the system structured" | `docs/ARCHITECTURE.md` | Domain boundaries, dependency graph |
| "What must never be violated" | `docs/GOLDEN_PRINCIPLES.md` | "No !important", "All animations use GSAP" |
| "How should feature X work" | `docs/design-docs/` | `hero_design_spec.md` |
| "What are we building right now" | `docs/exec-plans/active/` | Current sprint / task plans |
| "What did we build before" | `docs/exec-plans/completed/` | Archived task summaries |
| "What technical debt exists" | `docs/exec-plans/tech-debt-tracker.md` | Known issues, prioritized |
| "How to use technology Y" | `docs/references/` | CSS guide, GSAP cheatsheet |
| "What does the data look like" | `docs/generated/` | DB schema, API response shapes |
| "How healthy is area Z" | `docs/reports/` | Performance audits, CSS analysis |

---

## The `docs/index.md` Template

```markdown
# Documentation Index

> Last updated: [DATE]

## Architecture
- [ARCHITECTURE.md](./ARCHITECTURE.md) — System boundaries and layers
- [GOLDEN_PRINCIPLES.md](./GOLDEN_PRINCIPLES.md) — Non-negotiable rules

## Design Docs
- [Feature A](./design-docs/feature-a.md) — ✅ Verified
- [Feature B](./design-docs/feature-b.md) — 🚧 Draft

## Execution Plans
- **Active:** [Current Plan](./exec-plans/active/current.md)
- **Completed:** [See archive](./exec-plans/completed/)
- **Tech Debt:** [Tracker](./exec-plans/tech-debt-tracker.md)

## References
- [CSS Guide](./references/css-guide.md)
- [Animation Reference](./references/animation-reference.md)

## Reports
- [Performance Report](./reports/performance.md) — [DATE]
```

---

## Why a Single Big AGENTS.md Fails

From OpenAI's experience:

| Problem | Consequence |
|---------|------------|
| **Context is a scarce resource** | A giant file crowds out the actual task, code, and relevant docs |
| **Too much guidance = non-guidance** | When everything is "important," nothing is — agent pattern-matches randomly |
| **It rots instantly** | A monolithic manual becomes a graveyard of stale rules |
| **It's hard to verify** | A single blob can't be mechanically checked for coverage, freshness, or correctness |

---

## Rules for Maintaining Knowledge

1. **Repo is the source of truth** — If it's not in the repository, it doesn't exist for agents
2. **No orphan knowledge** — That Slack discussion that aligned the team? Distill it into a doc
3. **Every doc has an owner** — Someone (or some process) is responsible for keeping it current
4. **Index everything** — Every doc should be linked from `docs/index.md`
5. **Mark verification status** — Use ✅ Verified / 🚧 Draft / ⚠️ Stale badges
6. **Automate freshness checks** — A CI job or periodic task should flag docs that haven't been updated in N days relative to the code they describe
