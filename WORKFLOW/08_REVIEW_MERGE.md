# 08 — Review & Merge Philosophy

> "In a system where agent throughput far exceeds human attention, corrections are cheap and waiting is expensive."  
> — OpenAI Harness Engineering

---

## Philosophy

Traditional engineering assumes code is expensive to produce and cheap to review. Agent-first engineering **inverts this**: code is cheap to produce but human attention is the bottleneck.

Optimize the review process for **speed and signal**, not exhaustive coverage.

---

## PR Lifecycle

```
Agent writes code → Self-review → Agent review → Human review (if needed) → CI → Merge
                         │              │                │
                         │              │                └── Optional for low-risk
                         │              └── Second agent validates
                         └── Agent checks its own output
```

### Short-Lived PRs

- PRs should stay open for **hours**, not days
- One concern per PR — no mixed-purpose changes
- Small diffs are easier to review and safer to merge
- If a PR grows too large, split it

---

## Review Tiers

Not all PRs need the same level of scrutiny:

### Tier 1: Auto-Merge (Minimal Human Review)
**Criteria:** CI passes, mechanical changes only

| Change Type | Example |
|-------------|---------|
| Formatting / lint fixes | Agent-reformatted files |
| Doc updates | Fixed broken links, updated dates |
| Dependency updates (patch) | Security patch, no API changes |
| Cleanup per golden principles | Removed dead code, consolidated duplicates |

### Tier 2: Quick Review (Skim the Diff)
**Criteria:** CI passes, behavioral changes in well-tested areas

| Change Type | Example |
|-------------|---------|
| Bug fix with tests | Fixed hover state, added regression test |
| Style changes | Updated colors, spacing, animations |
| New test coverage | Added tests for existing functionality |
| Refactoring | Restructured a component, no behavior change |

### Tier 3: Thorough Review (Full Attention)
**Criteria:** Architectural impact, new patterns, or risk

| Change Type | Example |
|-------------|---------|
| New feature | Added a whole new section/component |
| Architecture change | Modified layer boundaries or data flow |
| New dependency | Added a new npm package |
| Performance-critical | Changes to animation engine, loading logic |
| Security-sensitive | Auth, data handling, external requests |

---

## Agent Self-Review Checklist

Before opening a PR, the agent should verify:

- [ ] **Build passes** — `npm run build` succeeds
- [ ] **Tests pass** — `npm run test` succeeds
- [ ] **No lint violations** — Architecture gates pass
- [ ] **Relevant docs updated** — If architecture changed, docs reflect it
- [ ] **No unrelated changes** — Diff contains only what was asked
- [ ] **Naming conventions followed** — Files, classes, selectors match patterns
- [ ] **Golden principles respected** — No known violations

---

## Handling Test Flakes

In a high-throughput environment, test flakes are addressed differently:

| Traditional Approach | Agent-First Approach |
|---------------------|---------------------|
| Flaky test blocks merge | Flaky test triggers follow-up run |
| Spend hours debugging flake | Re-run test; if it passes, merge |
| Disable the test | Open a follow-up PR to fix the root cause |

**Key insight:** If a test fails once and passes on retry, merge and track the flake separately. The cost of blocking is higher than the cost of a follow-up fix.

---

## Review Comments as System Feedback

Review comments are a feedback mechanism that should be **captured permanently**:

| Comment Type | Action |
|-------------|--------|
| "This pattern is wrong" | Update `GOLDEN_PRINCIPLES.md` with the correct pattern |
| "This should use utility X" | Update reference docs or add to anti-patterns |
| "This doesn't match our convention" | Encode as a lint rule if possible |
| "This is clever but hard to understand" | Document the approach or simplify |

> The goal: every review comment eventually becomes unnecessary because the rule it enforces is now encoded into the system.

---

## Merge Checklist

Before merging:

1. ✅ CI green (or known-flaky tests re-passed)
2. ✅ PR addresses only one concern
3. ✅ Review tier appropriate for the change type
4. ✅ No open questions or unresolved comments
5. ✅ Docs updated if applicable

After merging:

1. ✅ Verify the change in staging/preview (if applicable)
2. ✅ Close related issues or update execution plans
3. ✅ If a new pattern was introduced, document it

---

## Rules

1. **Speed over ceremony** — Merge working changes quickly
2. **CI is the gatekeeper** — If CI passes, the bar is met for mechanical correctness
3. **Human review is for judgment** — Focus on design decisions, not syntax
4. **Corrections are cheap** — `git revert` is your safety net; use it without guilt
5. **Every review comment is a system gap** — If you keep saying the same thing, encode it
