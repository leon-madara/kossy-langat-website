# Architecture Reference — Kossy Portfolio

## 🏗 System Layers

The project follows a standard Next.js App Router structure, layered by concern:

### 1. View Layer (`src/app/`, `src/components/`)
- **Pages**: Entry points in `src/app/`. Responsible for data fetching (Server Components) and layout assembly.
- **Sections**: Top-level UI blocks (e.g., `Hero`, `Services`, `Work`).
- **Shared Components**: Atomic UI elements (Buttons, Cards, Modals).

### 2. Style Layer (`src/app/globals.css`, `src/components/**/*.css`)
- **Global**: Design tokens, variables, and resets in `globals.css`.
- **Scoped**: Component-specific styles co-located or mapped.
- **Rules**: Strictly Vanilla CSS. Use the design system defined in `docs/design_tokens.md`.

### 3. Logic Layer (`src/lib/`)
- **Utilities**: Pure functions for formatting, validation, etc.
- **Hooks**: Custom React hooks for shared state or side effects.
- **GSAP Manager**: Shared animation timelines and ScrollTrigger configurations.

---

## 🔄 Dependency Flow
- **Allowed**: `View` -> `Style`, `View` -> `Logic`, `Logic` -> `Core`.
- **Forbidden**: `Logic` -> `View` (Logic should be UI-agnostic), `Style` -> `Logic`.

---

## 📁 Directory Mapping

| Pattern | Layer | Responsibility |
|---------|-------|----------------|
| `src/app/**/page.tsx` | View (Page) | Route entry and Layout |
| `src/components/sections/` | View (Section) | Large UI modules |
| `src/components/ui/` | View (Atomic) | Base components |
| `src/lib/gsap/` | Logic (Animation) | GSAP engine config |

---

## 🛠 Tech Stack Reference
See [docs/tech_stack.md](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/tech_stack.md) for detailed environment configuration.
