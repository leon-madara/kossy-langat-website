# 09 — Project Onboarding Checklist

> Use this checklist when bootstrapping a new project with the ENG WORKFLOW framework. Go top-down — each step builds on the previous.

---

## Prerequisites

- [ ] Project repository exists (even if empty)
- [ ] Package manager / build tool is set up
- [ ] You've read all files in `ENG WORKFLOW/` at least once

---

## Phase 1: Foundation (Day 1)

### Step 1: Copy the Framework
- [ ] Copy the `ENG WORKFLOW/` folder into your project root
- [ ] Commit it as the first (or early) commit — it's part of the project

### Step 2: Create AGENTS.md
- [ ] Copy `ENG WORKFLOW/AGENTS.md` to your project root as `AGENTS.md`
- [ ] Fill in `[PROJECT_NAME]` — your project's name
- [ ] Fill in `[STACK]` — your tech stack (e.g., "React + Vite + TypeScript")
- [ ] Fill in the directory structure to match your actual project layout
- [ ] Fill in the test commands
- [ ] Fill in the anti-patterns specific to your project
- [ ] Remove any sections that don't apply

### Step 3: Create the `docs/` Structure
- [ ] Create the `docs/` directory at your project root
- [ ] Create subdirectories: `design-docs/`, `exec-plans/active/`, `exec-plans/completed/`, `references/`, `reports/`
- [ ] Create `docs/index.md` using the template from `02_KNOWLEDGE_ARCHITECTURE.md`
- [ ] Populate the index with links to whatever docs you already have

### Step 4: Write the Architecture Doc
- [ ] Create `docs/ARCHITECTURE.md`
- [ ] Define your layers (UI → Services → Core, or whatever fits)
- [ ] Define dependency directions (what can import from what)
- [ ] Map your directory structure to layers
- [ ] This document will evolve — start simple, iterate as the project grows

---

## Phase 2: Principles & Rules (Week 1)

### Step 5: Define Golden Principles
- [ ] Create `docs/GOLDEN_PRINCIPLES.md` using template from `05_GOLDEN_PRINCIPLES.md`
- [ ] Start with 3-5 principles — don't over-engineer on day one
- [ ] Focus on rules you've already learned the hard way
- [ ] For each principle: define the rule, why it matters, how it's enforced, and how to fix violations

### Step 6: Set Up Enforcement
- [ ] Ensure your CI pipeline runs tests on every PR
- [ ] Add at least one architectural lint (even if it's just a grep-based check)
- [ ] Write lint error messages that include remediation instructions
- [ ] Consider adding file size warnings

### Step 7: Create the Tech Debt Tracker
- [ ] Create `docs/exec-plans/tech-debt-tracker.md` using template from `03_EXECUTION_PLANS.md`
- [ ] Inventory any known debt — be honest about current state
- [ ] Prioritize: High (blocks work) / Medium (degrades quality) / Low (cleanup when convenient)

---

## Phase 3: Workflow & Velocity (Weeks 2-4)

### Step 8: Start Using Execution Plans
- [ ] For your next complex task, write a full execution plan before starting
- [ ] Put it in `docs/exec-plans/active/`
- [ ] Update it after each work session
- [ ] When complete, move to `docs/exec-plans/completed/`

### Step 9: Establish Review Cadence
- [ ] Define which changes need human review vs. auto-merge (see `08_REVIEW_MERGE.md`)
- [ ] Set up the quality scorecard for your project's domains
- [ ] Schedule a weekly entropy review (even 15 minutes helps)

### Step 10: Iterate on AGENTS.md
- [ ] After a few agent sessions, review: Did the agent find what it needed?
- [ ] Update `AGENTS.md` with any missing pointers
- [ ] Add new anti-patterns you discovered
- [ ] Update doc links if things moved

---

## Phase 4: Continuous Improvement (Ongoing)

### Recurring Tasks

| Task | Frequency | Reference |
|------|-----------|-----------|
| Update quality scorecard | Weekly | `06_QUALITY_ENTROPY.md` |
| Doc-gardening scan | Weekly | `06_QUALITY_ENTROPY.md` |
| Review golden principles | Monthly | `05_GOLDEN_PRINCIPLES.md` |
| Dependency hygiene | Monthly | `06_QUALITY_ENTROPY.md` |
| Architecture doc review | Monthly | `04_ARCHITECTURE_ENFORCEMENT.md` |
| Dead code scan | Monthly | `06_QUALITY_ENTROPY.md` |

### Signs You're Doing It Right

- [ ] Agent finds relevant docs without being told where to look
- [ ] Recurring mistakes are caught by lints, not humans
- [ ] Review comments decrease over time (because rules are encoded)
- [ ] New features build on existing patterns, not reinventions
- [ ] Tech debt is tracked and trending down

### Signs You Need to Adjust

- [ ] Agent keeps making the same mistake → Missing golden principle
- [ ] Agent can't find relevant code → Architecture doc or naming is unclear
- [ ] Agent generates inconsistent patterns → Missing lint or structural test
- [ ] Agent hallucinates APIs → Dependency is opaque, needs docs or reimplementation
- [ ] Docs are always stale → Freshness checks not automated
- [ ] Review takes longer than coding → Review tiers not calibrated

---

## Quick Reference: File Map

After onboarding, your project should have:

```
[PROJECT_ROOT]/
├── AGENTS.md                       ← Agent routing table
├── ENG WORKFLOW/                   ← This framework (reference)
│   ├── 01_WORKFLOW.md
│   ├── 02_KNOWLEDGE_ARCHITECTURE.md
│   ├── 03_EXECUTION_PLANS.md
│   ├── 04_ARCHITECTURE_ENFORCEMENT.md
│   ├── 05_GOLDEN_PRINCIPLES.md
│   ├── 06_QUALITY_ENTROPY.md
│   ├── 07_AGENT_LEGIBILITY.md
│   ├── 08_REVIEW_MERGE.md
│   └── 09_PROJECT_ONBOARDING.md
├── docs/
│   ├── index.md
│   ├── ARCHITECTURE.md
│   ├── GOLDEN_PRINCIPLES.md
│   ├── design-docs/
│   ├── exec-plans/
│   │   ├── active/
│   │   ├── completed/
│   │   └── tech-debt-tracker.md
│   ├── references/
│   └── reports/
└── src/
    └── ...
```
