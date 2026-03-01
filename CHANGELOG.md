# Changelog — Kossy Langat Portfolio

All notable changes to this project will be documented in this file.

---

## [2026-03-01] — About Split-Screen Reveal Hero

### Added
- **`src/components/sections/about/AboutSplitHero.tsx`**: About page split-screen hero (~55vh) with synchronized GSAP dropdown (clip-path) reveals (T→B, B→T, T→B), grayscale-to-color veil wipe, and post-reveal staggered copy.
- **`src/components/sections/about/AboutSplitHero.css`**: Vanilla CSS grid + tactile overlays (texture + mesh gradients) for the split-screen layout.
- **`src/components/layout/ScrollMicroPin.tsx`**: Global GSAP ScrollTrigger micro-pin system that briefly pins each `main` section at the top to guide scroll progression (desktop + subtle mobile variant).

### Changed
- **`src/app/about/page.tsx`**: Renders the split-screen hero at the top of `/about` and removes the previous text-only hero block.
- **`src/app/about/AboutPage.css`**: Adjusts top padding so the new hero sits flush at the page start while keeping narrative sections comfortably spaced.
- **`src/app/layout.tsx`**: Wires the global micro-pin system so it runs across routes.
- **`src/components/sections/home/Hero.tsx`**: Refines the desktop hero handoff so the hero image holds scale while the next section rises in a catch-up + settle parallax phase.

## [2026-02-28] — Theme Tokens & Header Contrast Hardening

### Added
- **`src/app/theme.generated.css`**: Colorffy-style `--clr-*` scales and `--theme-*` role tokens generated from the project palette PDF.
- **`src/components/layout/Header.css`**: Vanilla CSS header styling using role tokens (default + scrolled + mobile overlay states).
- **Light/Dark Theme Toggle**: Persistent `data-theme` override (localStorage) with a header toggle button and an inline pre-hydration theme init script.
- **Theme Audit Reports**: Runtime contrast audits stored in `docs/reports/` (theme-generator skill output).

### Changed
- **`src/app/globals.css`**: Imports `theme.generated.css` so tokens are globally available.
- **`src/app/globals.css`**: Dark mode now respects `:root[data-theme="dark"]` (and system dark only when no override is set). Added `--*-rgb` helper tokens for rgba() usage.
- **Header navigation**: Refactored `src/components/layout/Header.tsx` to remove Tailwind classes and ensure consistent text/background visibility across scroll states.
- **Home sections**: Contrast fixes for hero CTAs/highlights, Featured Projects surface, and Project Card accents/tags to ensure AA visibility in both themes.
- **Home hero**: Added a scroll-linked GSAP transition (fade/translate hero content, reduce overlays) and a subtle parallax lift on the next section during initial scroll.

## [2026-02-27] — Agent Onboarding & Discoverability Upgrade

### Added
- **Root `CHANGELOG.md`**: Centralized log for major architectural and feature changes.
- **Change Discoverability Protocol**: Formalized rules for logging "Serious Changes" in `WORKFLOW/01_WORKFLOW.md`.

### Added
- **Global Texture System**: Established a code-based `.texture-overlay` system in `globals.css` using SVG noise filters, fulfilling **GP-03**.
- **Impact Metrics Section**: Implemented the Section 4 of the home page using strictly Vanilla CSS and GSAP staggered reveal animations, following **GP-01** and **GP-02**.
- **Representation Section**: Implemented the final home page section using Vanilla CSS and GSAP, focusing on leadership narratives and structural scarcity.
- **`MetricCard` Refactor**: Migrated the `MetricCard` component to a Tailwind-Free, Vanilla CSS architecture.

### Changed
- **Enhanced `AGENTS.md`**: Upgraded root and workflow templates to mirror the `codebyLeon` standard. Added visual directory structure, key documentation tables, and bespoke rules (Vanilla CSS, Texture-First, GSAP).
- **Refined `WORKFLOW/` Docs**: Standardized the canonical agent guide and ensured consistency between templates and root files.

### Bespoke Rules Updated
- **Vanilla CSS Mandate**: Strictly no Tailwind.
- **Texture-First Design**: Requires `.texture-overlay` and `.mesh-gradient` for all UI sections.
- **Serious Change Logging**: Agents must now update the Changelog for any architectural or significant feature update.
