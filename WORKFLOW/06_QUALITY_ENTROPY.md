# 06 — Quality Scoring & Entropy Management

> "Technical debt is like a high-interest loan: it's almost always better to pay it down continuously in small increments than to let it compound."  
> — OpenAI Harness Engineering

---

## The Problem: Entropy Is Inevitable

Agent-generated code **replicates patterns that already exist** — including suboptimal ones. Without active cleanup:

- Bad patterns spread exponentially
- Documentation drifts from reality
- Quality degrades silently
- Each new agent run builds on a slightly worse foundation

OpenAI's team initially spent **20% of every week** (every Friday) manually cleaning up "AI slop." That didn't scale. The solution: **automate garbage collection**.

---

## Quality Scoring Framework

Grade each domain/area of your project on a regular cadence:

### Quality Scorecard Template

```markdown
# Quality Scorecard

> Last updated: [DATE]
> Next review: [DATE + interval]

| Domain / Area | Score | Trend | Top Issue | Owner |
|--------------|:-----:|:-----:|-----------|-------|
| [e.g., Hero Section] | B | ↑ | Animation timing inconsistent | [name] |
| [e.g., Portfolio Section] | C | ↓ | Pinning implementation broken | [name] |
| [e.g., CSS Architecture] | A | → | Minor specificity issues | [name] |
| [e.g., Test Coverage] | B | ↑ | Missing e2e for mobile | [name] |
| [e.g., Documentation] | D | ↓ | 4 stale docs in root | [name] |
```

**Grading:**
- **A** — Clean, well-tested, well-documented, no known debt
- **B** — Functional, minor issues, adequate tests
- **C** — Works but has known problems, incomplete coverage
- **D** — Significant issues, debt accumulating, needs attention
- **F** — Broken or unmaintainable, blocks other work

---

## Entropy Cleanup Processes

### 1. Doc-Gardening (Weekly / Per-Sprint)

A recurring task that scans for stale documentation:

**What it checks:**
- Docs that reference files/functions that no longer exist
- Docs with a "Last updated" date older than N days
- Docs not linked from `docs/index.md` (orphans)
- `AGENTS.md` pointers that lead to moved/deleted files

**Actions:**
- Update or archive stale docs
- Fix broken cross-links
- Remove orphan docs or re-link them

### 2. Pattern Drift Detection (Weekly / Per-Sprint)

Scan for violations of golden principles:

**What it checks:**
- Duplicate utility functions across components
- Inconsistent naming patterns
- Files exceeding size limits
- Import boundary violations
- Anti-patterns listed in `GOLDEN_PRINCIPLES.md`

**Actions:**
- Open targeted refactoring PRs (one concern per PR)
- Most should be reviewable in under a minute
- Auto-merge if CI passes and change is mechanical

### 3. Dependency Hygiene (Monthly)

**What it checks:**
- Unused dependencies in `package.json`
- Outdated dependencies with security advisories
- Dependencies that could be replaced with simpler alternatives
- Vendored code that's drifted from its origin

**Actions:**
- Remove unused deps
- Update deps with security issues
- Evaluate if complex deps can be simplified

### 4. Dead Code Detection (Monthly)

**What it checks:**
- Exported functions/components that are never imported
- CSS selectors that match no elements
- Config options that are never read
- Test utilities that are never called

**Actions:**
- Remove dead code
- Archive if it might be needed later (move to a `_deprecated/` folder)

---

## Setting Up Automated Scans

Create scripts or CI jobs for recurring checks:

```bash
# Example: check for stale docs
find docs/ -name "*.md" -mtime +30 -print
# → Lists docs not modified in 30 days

# Example: check for !important violations
grep -rn '!important' src/styles/
# → Lists all !important usages

# Example: check for large files
find src/ -name "*.tsx" -o -name "*.ts" | xargs wc -l | sort -rn | head -20
# → Lists the 20 largest source files
```

For more sophisticated checks, use project-specific lint scripts (see `04_ARCHITECTURE_ENFORCEMENT.md`).

---

## The Cleanup PR

A good cleanup PR:
- Fixes **one** category of debt (not "fix everything")
- Is small enough to review in **under a minute**
- Includes a description: "Cleaning up [pattern] per GP-[N]"
- Passes all CI gates
- Can often be auto-merged

---

## Freshness Indicators

Add freshness metadata to important docs:

```markdown
---
last_verified: 2026-02-17
verified_against: src/components/sections/Hero.tsx (commit abc1234)
next_review: 2026-03-17
status: ✅ current
---
```

This lets automated tools flag docs for review when:
- The `next_review` date has passed
- The `verified_against` file has changed since `last_verified`

---

## Rules

1. **Pay debt continuously** — Small, frequent cleanup beats big quarterly refactors
2. **Automate detection** — If you can write a grep for it, script it
3. **One concern per cleanup PR** — Keep changes atomic and reviewable
4. **Grade honestly** — A "C" today is better than a fake "A" that hides problems
5. **Track trends, not just scores** — A "B" that's trending up is better than an "A" trending down
6. **Human taste → code** — When you spot a quality issue manually, encode the check so it's automatic next time
