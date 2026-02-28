# 07 — Agent Legibility

> "From the agent's point of view, anything it can't access in-context while running effectively doesn't exist."  
> — OpenAI Harness Engineering

---

## Core Principle

**If the agent can't see it, it can't use it.**

Knowledge in Slack threads, Google Docs, meetings, or someone's head is invisible to agents. The same applies to runtime behavior that isn't observable through developer tools.

Agent legibility means: **organizing and exposing the right information so the agent can reason over it, rather than overwhelming it with ad-hoc instructions.**

---

## Making the Codebase Legible

### 1. Onboard the Agent Like a New Hire

Just as you'd onboard a new teammate, give the agent:

| Onboarding Topic | How to Provide It |
|-------------------|-------------------|
| "What does this project do?" | Project overview in `AGENTS.md` |
| "How is the code organized?" | Directory map in `AGENTS.md`, architecture in `docs/ARCHITECTURE.md` |
| "What are the team's conventions?" | `docs/GOLDEN_PRINCIPLES.md` and reference docs |
| "What's the current work happening?" | `docs/exec-plans/active/` |
| "What mistakes should I avoid?" | Anti-patterns section in `AGENTS.md` |
| "How do I test my changes?" | Test commands in `AGENTS.md`, test patterns in reference docs |

### 2. Make Navigation Predictable

Agents navigate best when the structure is **conventional and predictable**:

```
✅ GOOD — Agent can guess where things are:
  src/components/sections/Hero.tsx      → Component
  src/styles/sections/hero.css          → Its styles
  src/test/components/Hero.test.tsx     → Its tests
  docs/design-docs/hero_design_spec.md  → Its spec

❌ BAD — Agent has to search everywhere:
  src/Hero.tsx
  src/css/theme/hero-main-styles.css
  tests/unit/ui/hero-component.spec.ts
  docs/hero.md
```

### 3. Keep Dependencies Inspectable

Prefer dependencies that the agent can reason about:

| Preference | Why |
|-----------|-----|
| Local config files over cloud dashboards | Agent can read the file |
| Explicit imports over magic globals | Agent can trace the dependency |
| Typed APIs over stringly-typed configs | Agent gets autocomplete and validation |
| Small focused packages over large frameworks | Agent can understand the full surface area |
| Well-documented APIs over clever abstractions | Agent can read docs, not decode cleverness |

### 4. Push Knowledge Into the Repo

Every time alignment happens outside the repo, ask: "How do I capture this for the next agent run?"

| Knowledge Source | Capture Method |
|-----------------|----------------|
| Slack discussion about an approach | → Decision log in execution plan |
| Meeting where architecture was decided | → Update `docs/ARCHITECTURE.md` |
| Code review comment explaining why | → Code comment or design doc update |
| Bug report from user | → Issue tracker or tech debt tracker |
| Mental model of how something works | → Document it in `docs/references/` |

---

## Making the Application Legible

Beyond the code, agents need to **observe the running application**:

### Browser-Level Observability

| Capability | How It Helps |
|-----------|-------------|
| Screenshots/DOM snapshots | Agent can verify visual changes |
| Browser console access | Agent can detect JavaScript errors |
| Network request logging | Agent can debug API interactions |
| Accessibility tree | Agent can validate a11y compliance |

**Setup:** Use Playwright, Puppeteer, or Chrome DevTools Protocol to give agents browser access.

### Application-Level Observability

| Capability | How It Helps |
|-----------|-------------|
| Structured logs | Agent can query for specific events |
| Performance metrics | Agent can verify "page loads under 2s" |
| Error tracking | Agent can find and reproduce bugs |
| Health checks | Agent can confirm the app is running |

**Setup:** Expose logs and metrics via local tooling that the agent can query.

---

## When to Reimplement vs. Depend

OpenAI found it was sometimes **cheaper to reimplement** subsets of external package functionality:

**Reimplement when:**
- The external package is opaque (minified, poorly documented)
- You only need 10% of its functionality
- You need tight integration with your own tooling (logging, tracing)
- The package has unpredictable behavior the agent can't reason about

**Depend when:**
- The package is well-documented and stable
- You need most of its functionality
- Reimplementation would be error-prone (crypto, parsing, etc.)
- The package is a de facto standard (React, Express, etc.)

---

## Checklist: Is Your Project Agent-Legible?

- [ ] Agent can find any component/file by following naming conventions
- [ ] Agent can find the spec for any feature via `docs/design-docs/`
- [ ] Agent can understand the architecture from `docs/ARCHITECTURE.md`
- [ ] Agent knows what not to do from `docs/GOLDEN_PRINCIPLES.md`
- [ ] Agent can run the app locally and observe it
- [ ] Agent can run tests and interpret results
- [ ] Agent can trace imports without hitting opaque boundaries
- [ ] Important decisions are documented, not just in someone's memory
