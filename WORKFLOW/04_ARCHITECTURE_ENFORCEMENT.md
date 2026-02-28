# 04 — Architecture & Mechanical Enforcement

> "Enforce boundaries centrally, allow autonomy locally."  
> — OpenAI Harness Engineering

---

## Philosophy

Documentation alone doesn't keep a codebase coherent. **Rules that aren't mechanically enforced will be violated** — especially by agents that replicate whatever patterns already exist, including bad ones.

The goal: encode invariants into tooling so they apply **everywhere, automatically, without human review**.

---

## What to Enforce (vs. What to Leave Flexible)

### Enforce Centrally (Hard Rules)
These are structural invariants that, if violated, create cascading problems:

- **Dependency directions** — Layer A can import from Layer B, but not the reverse
- **Data validation at boundaries** — All external data is validated/parsed at entry points
- **Naming conventions** — Files, classes, CSS selectors follow predictable patterns
- **File size limits** — No single file exceeds N lines (signal to split)
- **Test coverage requirements** — Critical paths must have tests
- **Security boundaries** — No hardcoded secrets, no unsafe patterns

### Allow Locally (Soft Rules)
These are stylistic choices where the agent has freedom:

- Internal implementation patterns (how a function achieves its goal)
- Variable naming within a function
- Choice of helper utilities (as long as they're project-internal)
- Comment style and density

---

## Architecture Model Template

Define your system as layers with strict dependency rules:

```markdown
# Architecture Layers

## Layer 1: Core / Domain
**Contains:** Business logic, data models, validation
**Can import from:** Nothing (standalone)
**Cannot import from:** UI, infrastructure, external services

## Layer 2: Services / Infrastructure  
**Contains:** API clients, database access, external integrations
**Can import from:** Core
**Cannot import from:** UI

## Layer 3: UI / Presentation
**Contains:** Components, pages, styles, animations
**Can import from:** Core, Services
**Cannot import from:** Nothing above it

## Layer 4: Config / Entry Points
**Contains:** App bootstrap, routing, configuration
**Can import from:** Everything
```

Visualize dependencies (modify per project):

```
[Config / Entry] → [UI / Presentation] → [Services] → [Core / Domain]
                                              ↓
                                        [External APIs]
```

---

## Enforcement Mechanisms

### 1. Custom Linters

Write linters that:
- **Check dependency directions** — e.g., "components/ cannot import from pages/"
- **Validate naming conventions** — e.g., "CSS files must match their component name"
- **Enforce file size limits** — e.g., "warn if a file exceeds 300 lines, error at 500"

**Critical:** Bake remediation instructions into error messages:

```
❌ BAD:  "Import violation detected"
✅ GOOD: "Import violation: src/components/Hero.tsx imports from src/pages/HomePage.tsx. 
         Fix: Move shared logic to src/utils/ or src/hooks/, then import from there."
```

The agent can action the good message. The bad message is a dead end.

### 2. Structural Tests

Tests that validate architecture, not business logic:

```typescript
// Example: No circular dependencies
test('no circular imports in components/', () => {
  const imports = analyzeImports('src/components/');
  expect(findCircularDeps(imports)).toEqual([]);
});

// Example: CSS ownership is 1:1
test('every component has exactly one CSS file', () => {
  const components = glob('src/components/**/*.tsx');
  const styles = glob('src/styles/**/*.css');
  // validate 1:1 mapping...
});
```

### 3. CI Gates

Automated checks that run on every PR:

| Gate | Blocks Merge? | Purpose |
|------|:---:|---------|
| Type checking | ✅ | Structural correctness |
| Unit tests | ✅ | Logic correctness |
| Architecture lints | ✅ | Boundary enforcement |
| File size warnings | ⚠️ | Code organization |
| Doc freshness check | ⚠️ | Knowledge maintenance |
| Visual regression | ⚠️ | UI stability |

### 4. Naming Conventions

Define predictable naming so agents can navigate by convention:

```
Component file:  src/components/sections/Hero.tsx
Style file:      src/styles/sections/hero.css
Test file:       src/test/components/Hero.test.tsx
Design doc:      docs/design-docs/hero_design_spec.md
```

If the agent knows the convention, it can **find or create** the right file without searching.

---

## Technology Choices for Agent Legibility

Prefer technologies that are:

| Trait | Why | Example |
|-------|-----|---------|
| **Composable** | Agents can reason about small, independent pieces | Utility functions > monolithic classes |
| **API-stable** | Less churn = fewer hallucinations | Established libraries > bleeding-edge |
| **Well-represented in training data** | Agent knows how to use it | React, Express, PostgreSQL |
| **Inspectable in-repo** | Agent can read the source/config | Local config files > cloud dashboards |
| **Boring** | Predictable behavior, fewer edge cases | SQL > GraphQL subscriptions |

> OpenAI's insight: "Technologies described as 'boring' tend to be easier for agents to model due to composability, API stability, and representation in the training set."

When a dependency is opaque or poorly documented, consider **reimplementing the subset you need**:
- Tightly integrated with your tooling
- 100% test coverage
- Behaves exactly as your runtime expects
- Fully legible to agent context

---

## Rules

1. **Invariants go in code, not docs** — If a rule can be a lint, make it a lint
2. **Error messages are agent instructions** — Write remediation steps into every lint error
3. **Enforce boundaries, allow autonomy** — Care deeply about layer boundaries; be flexible about implementation within a layer
4. **Agent-generated code doesn't need to match human style** — It needs to be correct, maintainable, and legible to future agent runs
5. **When documentation fails, promote to code** — If agents keep violating a documented rule, encode it as a lint
