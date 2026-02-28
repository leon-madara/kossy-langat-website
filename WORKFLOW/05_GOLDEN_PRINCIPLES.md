# 05 — Golden Principles

> "We started encoding what we call 'golden principles' — opinionated, mechanical rules that keep the codebase legible and consistent for future agent runs."  
> — OpenAI Harness Engineering

---

## What Is a Golden Principle?

A golden principle is a rule that is:

1. **Opinionated** — It makes a specific choice, not a vague suggestion
2. **Mechanical** — It can be verified by a machine (lint, test, script)
3. **Agent-legible** — An agent can understand and follow it without ambiguity
4. **Universal** — It applies everywhere in the codebase, no exceptions

Golden principles are **not** guidelines. They are **laws**. If a principle can't be enforced mechanically, either make it enforceable or downgrade it to a "preference" in docs.

---

## Structure

Each principle follows this format:

```markdown
### GP-[NUMBER]: [TITLE]

**Rule:** [Exact, unambiguous statement of the rule]
**Why:** [What goes wrong if this is violated]
**Enforced by:** [Lint name / test name / CI gate — or "manual review" if not yet encoded]
**Remediation:** [Exact steps to fix a violation]
```

---

## Template — Customize Per Project

Copy this file into your project's `docs/GOLDEN_PRINCIPLES.md` and fill in your project-specific principles.

### GP-01: [YOUR PRINCIPLE TITLE]

**Rule:** [e.g., "Every React component in `src/components/` must have a corresponding CSS file in `src/styles/` with the same base name."]  
**Why:** [e.g., "Orphan styles and unstyled components create visual bugs and make agent navigation unpredictable."]  
**Enforced by:** [e.g., "`css:gates` architecture test"]  
**Remediation:** [e.g., "Create `src/styles/sections/[component-name].css` and import it in the component file."]

### GP-02: [YOUR PRINCIPLE TITLE]

**Rule:** [e.g., "No `!important` declarations in any CSS file."]  
**Why:** [e.g., "Specificity wars make CSS unpredictable for agents and create cascading bugs."]  
**Enforced by:** [e.g., "PostCSS lint rule or `grep -r '!important' src/styles/`"]  
**Remediation:** [e.g., "Increase selector specificity naturally, or restructure the cascade order in `index.css`."]

### GP-03: [YOUR PRINCIPLE TITLE]

**Rule:** [e.g., "All scroll-triggered animations use GSAP ScrollTrigger, not CSS scroll-driven animations."]  
**Why:** [e.g., "Mixing animation systems creates conflicts and makes debugging impossible."]  
**Enforced by:** [e.g., "Architecture lint: no `animation-timeline: scroll()` in CSS files"]  
**Remediation:** [e.g., "Implement the animation using `gsap.to()` with `scrollTrigger: {}` config. See `GSAP/scrolltrigger/` for reference."]

---

## Examples from OpenAI's Approach

These are distilled from the article — adapt to your context:

### GP-A: Prefer Shared Utilities Over Hand-Rolled Helpers

**Rule:** If a utility function already exists in `src/utils/` or `src/lib/`, use it. Do not rewrite equivalent logic in a component.  
**Why:** Hand-rolled helpers duplicate invariants and diverge over time. Agents replicate whatever pattern exists locally, so duplicates spread.  
**Enforced by:** Periodic scan for duplicate function signatures.  
**Remediation:** Search `src/utils/` and `src/lib/` for existing functions. If none exists, add your helper there — not in the component.

### GP-B: Validate Boundaries, Don't Probe YOLO-Style

**Rule:** All external data (API responses, URL params, user input) must be validated/parsed at the boundary before use.  
**Why:** Agents can accidentally build logic on guessed data shapes. Validation at the boundary makes the contract explicit.  
**Enforced by:** Lint for untyped `any` or unvalidated `fetch` responses.  
**Remediation:** Use a schema validator (e.g., Zod) or TypeScript type guard at the entry point.

### GP-C: Repository Is the Single Source of Truth

**Rule:** No knowledge about the system may exist only in chat, meetings, or people's heads. If a decision was made, it must be in a doc or code comment.  
**Why:** Agents can only access what's in the repository. Anything else is invisible.  
**Enforced by:** Human discipline + periodic "doc-gardening" reviews.  
**Remediation:** Write it down in the appropriate `docs/` section.

---

## How Principles Feed Into Garbage Collection

Golden principles drive the entropy cleanup process (see `06_QUALITY_ENTROPY.md`):

1. **Define the principle** → "No duplicate utility functions"
2. **Encode enforcement** → Lint rule or scan script
3. **Run periodically** → Background task detects violations
4. **Auto-fix or flag** → Agent opens a cleanup PR or creates a tech debt item
5. **Principle evolves** → If a principle is violated too often, make enforcement stricter

---

## How to Add a New Principle

1. Identify a recurring problem — "agents keep doing X wrong"
2. Ask: "Can I make this mechanically enforceable?"
3. If yes → Write the principle + lint/test + remediation
4. If no → Document it as a "preference" in the relevant reference doc
5. Add to `docs/GOLDEN_PRINCIPLES.md`
6. Update `AGENTS.md` if it's critical enough to mention in the top-level routing
