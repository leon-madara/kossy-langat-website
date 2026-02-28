# AGENTS.md — Kossy Langat Portfolio Navigation

> "Efficiency is intelligent laziness." — The Kossy Way

Welcome, agent. You are in the codebase for **Kossy | Structural Engineer & General Manager**, a premium portfolio website built for high-impact visual excellence and technical precision.

---

## 🛠 Project Overview

**Name:** Kossy Langat Portfolio  
**Stack:** Next.js 15 (App Router) + TypeScript + GSAP 3 + Vanilla CSS  
**Description:** A high-end, tactile portfolio for a Structural Engineer, featuring structural-inspired grids, premium animations, and deep-level case studies.

---

## 📂 Directory Structure

```
kossy-langat-website/
├── src/
│   ├── app/                ← Routes: Home, Work, About, Insights, Mentorship
│   ├── components/
│   │   ├── sections/       ← Page sections (Hero, Bento, Services, Contact)
│   │   ├── layout/         ← Nav, Footer, Custom Cursor
│   │   ├── ui/             ← Grainy Button, Premium Cards, Textures
│   │   └── shared/         ← Reusable structural components
│   ├── lib/                ← GSAP registry, formatting utils
│   └── data/               ← Projects, expertise, and insights metadata
├── docs/                   ← System of Record
│   ├── design-docs/        ← Feature-specific specifications
│   ├── exec-plans/         ← Archived and active execution plans
│   └── reports/            ← Audit and verification reports
├── WORKFLOW/               ← Engineering Operating Model
├── public/                 ← Assets: textures, icons, profile shots
└── [config files]          ← package.json, next.config.ts, tsconfig.json
```

---

## 📜 Key Documentation (Read Before Making Changes)

| Doc | Purpose |
|-----|---------|
| [CHANGELOG.md](file:///c:/Users/Leon/DevMode/kossy-langat-website/CHANGELOG.md) | Detailed record of all major project changes |
| [ARCHITECTURE.md](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/ARCHITECTURE.md) | System layers and dependency flow |
| [GOLDEN_PRINCIPLES.md](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/GOLDEN_PRINCIPLES.md) | Non-negotiable implementation rules |
| [animation_strategy.md](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/animation_strategy.md) | GSAP standards and patterns |
| [css_architecture.md](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/css_architecture.md) | Naming, cascade rules, and Vanilla CSS mandate |
| [design_tokens.md](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/design_tokens.md) | Colors, typography, and spacing system |
| [tech_stack.md](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/tech_stack.md) | Deep dive into dependencies and tool versions |
| [01_WORKFLOW.md](file:///c:/Users/Leon/DevMode/kossy-langat-website/WORKFLOW/01_WORKFLOW.md) | How agents must operate in this codebase |

---

## 🚦 Rules for Agents

### Must Follow
1. **No Tailwind**: Styles must reside in `.css` files managed by `globals.css` or component-specific imports.
2. **Texture-First Design**: Every section should feel tactile. Use `.texture-overlay` and `.mesh-gradient`.
3. **GSAP for Motion**: All non-trivial animations must use GSAP ScrollTrigger. Avoid CSS `transition` for scroll-linked effects.
4. **Link Integrity**: Use the internal `[Link Text](file:///...)` format for all documentation cross-references.
5. **Log Serious Changes**: Every significant architectural or feature update must be documented in `CHANGELOG.md`.
6. **Lint Before Commit**: Run `npm run lint` and `npm run build` to ensure type safety.

### Anti-Patterns to Avoid
- **No Inline Styles**: Use semantic classes.
- **No Raw DOM Manipulation**: Use React refs with GSAP.
- **No Placeholder Assets**: Use the `generate_image` tool for demonstration assets.
- **No Bloated Components**: Keep page sections clean; move complex logic to `src/lib` or `src/components/shared`.

---

## 🏗 Test & Build

```bash
# Start development server
npm run dev

# Production type-check & build
npm run build

# Linting check
npm run lint
```

---

## 🧭 How to Get Context

1. **Start Here** → This file
2. **Architecture** → `docs/ARCHITECTURE.md`
3. **Core Rules** → `docs/GOLDEN_PRINCIPLES.md`
4. **Style Guide** → `docs/css_architecture.md`
5. **Operating Model** → `WORKFLOW/01_WORKFLOW.md`

