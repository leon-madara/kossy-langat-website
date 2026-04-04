# Changelog — Kossy Langat Portfolio

All notable changes to this project will be documented in this file.

---
## [2026-03-09] - Home Construction Philosophy Sequence Phone Portrait Mobile Variant

### Added
- **`public/images/philosophy/mobile/frame-001.jpg` through `frame-240.jpg`**: Adds the dedicated portrait philosophy frame set for phone viewports.

### Changed
- **`src/components/sections/home/PhilosophySequence.tsx`**: Refactors the philosophy renderer around explicit landscape and phone portrait sequence variants, converts text timing to shared progress cues, preserves normalized progress across breakpoint changes, and avoids full `useGSAP` reinitialization during variant swaps so pin spacing remains stable.
- **`public/workers/philosophy-worker.js`**: Adds per-load token handling and bitmap disposal safeguards so stale frame requests from an old breakpoint variant cannot overwrite the active sequence.
- **`docs/exec-plans/active/home-construction-philosophy-sequence/README.md`**, **`plan.md`**, **`todo.md`**, **`done.md`**, **`decisions.md`**, **`handoff.md`**, and **`verification.md`**: Reorients the active feature record around the immersive mobile comparison branch, the portrait-frame asset swap, the breakpoint-switch fix, and the latest verification results.

## [2026-03-08] - Removed Global Grain Overlay System

### Changed
- **`src/app/globals.css`**: Removes the shared `.texture-overlay` grain utility and its SVG noise implementation.
- **Page, section, card, and header components across `src/app/` and `src/components/`**: Removes all runtime uses of the grain overlay so the site no longer renders noise over imagery or surfaces.
- **`AGENTS.md`**, **`WORKFLOW/AGENTS.md`**, **`docs/GOLDEN_PRINCIPLES.md`**, and **`docs/ARCHITECTURE.md`**: Updates the current guidance so grain is no longer described as a required part of the visual system.

## [2026-03-08] - Hero Blur-Only Scroll Adjustment

### Changed
- **`src/components/sections/home/Hero.tsx`** and **`src/components/sections/home/Hero.css`**: Removes the Hero image lift and darkening exit pass while preserving the fixed-image, copy-fade, and blur-to-clear reveal behavior.
- **`docs/exec-plans/active/home-construction-philosophy-sequence/README.md`**, **`todo.md`**, **`done.md`**, **`decisions.md`**, **`handoff.md`**, and **`verification.md`**: Records the corrected Hero behavior, updated verification notes, and the need to re-test the full flow after the adjustment.

## [2026-03-08] - Home Construction Philosophy Sequence Ownership Rewrite Phase 1

### Changed
- **`src/components/sections/home/Hero.tsx`**: Removes the `nextElementSibling` handoff tween so Hero only animates hero-owned refs during its pinned intro.
- **`src/components/sections/home/PhilosophySequence.tsx`**: Adds `data-micro-pin="off"` so the section opts out of the global micro-pin system and keeps a single local pin owner.
- **`docs/exec-plans/active/home-construction-philosophy-sequence/README.md`**, **`todo.md`**, **`done.md`**, **`decisions.md`**, **`handoff.md`**, and **`verification.md`**: Records the Phase 1 checkpoint, updated ownership decisions, and post-change verification results.

## [2026-03-08] - Home Construction Philosophy Sequence Hero Rebuild Phase 2

### Changed
- **`src/components/sections/home/Hero.tsx`** and **`src/components/sections/home/Hero.css`**: Rebuilds the Hero intro as a self-contained pinned sequence with hero-owned image drift, faster blur release, and an internal exit wash instead of a static post-copy hold.
- **`docs/exec-plans/active/home-construction-philosophy-sequence/README.md`**, **`plan.md`**, **`todo.md`**, **`done.md`**, **`decisions.md`**, **`handoff.md`**, and **`verification.md`**: Records the Phase 2 checkpoint, updated next step, and desktop/mobile Hero verification results.

## [2026-03-08] - Home Construction Philosophy Sequence Philosophy Rebuild Phase 3

### Changed
- **`src/components/sections/home/PhilosophySequence.tsx`**: Rebuilds Philosophy as the single pinned narrative owner with first-frame initialization, explicit desktop/mobile `gsap.matchMedia()` timelines, nearest-frame fallback drawing, and static reduced-motion/no-frame fallback behavior.
- **`src/components/sections/home/PhilosophySequence.css`**: Moves the loading UI into the section, preserves the desktop side-rail/mobile overlay composition, and adds light-theme mobile overlay tokens so copy stays readable against the dark scrim.
- **`docs/exec-plans/active/home-construction-philosophy-sequence/README.md`**, **`plan.md`**, **`todo.md`**, **`done.md`**, **`decisions.md`**, **`handoff.md`**, and **`verification.md`**: Records the Phase 3 checkpoint, updated architecture decisions, and desktop/mobile/reduced-motion verification results.

## [2026-03-08] - Home Construction Philosophy Sequence Scroll Pacing Adjustment

### Changed
- **`src/components/sections/home/PhilosophySequence.tsx`**: Extends the pinned ScrollTrigger range from `200vh` to `250vh` via `PIN_SCROLL_DISTANCE_VH` so the 192-frame canvas scrub progresses more gradually and reduces perceived jitter.
- **`docs/exec-plans/active/home-construction-philosophy-sequence/README.md`**, **`plan.md`**, **`done.md`**, **`decisions.md`**, and **`handoff.md`**: Updates documentation to reflect the new `250vh` pin distance and keep feature continuity notes aligned with the current scroll pacing.

## [2026-03-07] - Home Construction Philosophy Sequence Implementation

### Added
- **`src/components/sections/home/PhilosophySequence.tsx`**: Adds new home section with canvas-based 192-frame construction sequence engine, GSAP ScrollTrigger scrub animation, and text choreography synced to frame windows.
- **`src/components/sections/home/PhilosophySequence.css`**: Adds responsive styles with desktop side-rail text layout and mobile overlay text layout, plus reduced-motion fallback.
- **`public/images/philosophy/frame-001.jpg` through `frame-192.jpg`**: Adds all 192 construction sequence frames for scroll-driven animation.

### Changed
- **`src/app/page.tsx`**: Inserts `PhilosophySequence` between `Hero` and `GapProblem` to create narrative arc from identity → philosophy → problem → solution.
- **`src/components/sections/home/Hero.tsx`**: Refactors handoff logic from hardcoded `#gap-problem` selector to dynamic `nextElementSibling` for flexible section ordering.
- **`src/components/sections/home/GapProblem.tsx`**: Updates eyebrow numbering from 02.0 to 03.0 to maintain sequential section indexing.
- **`src/components/sections/home/PhilosophySequence.tsx`**: Stabilizes timeline behavior with explicit frame tween duration, normalized text cue timing, and resize-safe canvas transform resets before DPR scaling.
- **`src/components/sections/home/PhilosophySequence.css`**: Refactors to true desktop side-rail composition and adds mobile scrim treatment for text readability over image frames.
- **`docs/exec-plans/active/home-construction-philosophy-sequence/done.md`**: Records Phase 2-5 implementation completion and frame asset placement.
- **`docs/exec-plans/active/home-construction-philosophy-sequence/todo.md`**: Updates remaining tasks to focus on browser testing and timing refinement.
- **`docs/exec-plans/active/home-construction-philosophy-sequence/handoff.md`**: Documents current implementation state and next steps for visual review.
- **`docs/exec-plans/active/home-construction-philosophy-sequence/verification.md`**: Records build checks and outlines pending visual verification.
- **`docs/exec-plans/active/home-construction-philosophy-sequence/README.md`**, **`plan.md`**, **`decisions.md`**, and **`FRAME_SETUP.md`**: Synchronizes feature docs with the stabilization fixes and current validation-focused next steps.

## [2026-03-07] - Home Construction Philosophy Sequence Planning Pack

### Added
- **`docs/design-docs/home-construction-philosophy-sequence/README.md`**: Adds the concept note for the new home scroll-driven 192-frame construction narrative section, including placement analysis, layout direction, choreography map, and implementation constraints.
- **`docs/exec-plans/active/home-construction-philosophy-sequence/`**: Adds the full feature continuity folder (`README.md`, `plan.md`, `todo.md`, `done.md`, `decisions.md`, `handoff.md`, `verification.md`, `assets-prompts.md`, `wireframes.md`) for multi-session execution.

### Changed
- **`docs/index.md`**: Adds discoverability links for the new home construction philosophy design note and active feature plan.

## [2026-03-06] - Mentorship Horizontal Scroll Implementation

### Added
- **`public/images/mentorship/`**: Adds the selected mentorship horizontal-stage image set (`horizontalScroll1.png`, `horizontalScroll2c.png`, `horizontalScroll3.png`, `horizontalScroll4.png`, `horizontalScroll5c.png`) for stable local use in production.

### Changed
- **`src/app/mentorship/page.tsx`**: Replaces the old stacked-card advice interaction with a pinned desktop horizontal GSAP stage that scrubs across five panels, snaps to each principle, and animates panel media, cards, numbers, and detail labels at different rates.
- **`src/app/mentorship/page.tsx`**: Refactors the mentorship advice data model to include local image assets, panel layout variants, editorial straplines, and browser-safe progress formatting.
- **`src/app/mentorship/MentorshipPage.css`**: Rebuilds the mentorship advice section as a full-width horizontal viewport with layered image scrims, safe-area panel overlays, oversized split-edge numbering, rail-plus-numeric progress, and static mobile/reduced-motion fallbacks.
- **`docs/exec-plans/active/mentorship-horizontal-scroll-stage/README.md`**: Updates the feature folder state from planning to active implementation.
- **`docs/exec-plans/active/mentorship-horizontal-scroll-stage/todo.md`**, **`done.md`**, **`decisions.md`**, **`handoff.md`**, and **`verification.md`**: Record the selected image set, implementation milestones, browser review findings, and the new post-implementation next steps.

## [2026-03-05] - Mentorship Horizontal Scroll Design Note

### Added
- **`docs/design-docs/mentorship-horizontal-scroll-stage/README.md`**: Adds a persistent concept note for the proposed Mentorship horizontal-scroll stage, including section anatomy, five-panel layout recommendations, GSAP motion model, image direction rules, risks, and next steps.
- **`WORKFLOW/02_CODEX_CUSTOM_INSTRUCTION.md`**: Adds a copy-paste Codex custom instruction template covering task classification, reasoning-route selection, mandatory repo discovery, and feature continuity rules.
- **`docs/exec-plans/_templates/feature-work/`**: Adds a reusable feature-folder template with overview, plan, todo, done, decisions, handoff, verification, and asset-prompt files for multi-session work.
- **`docs/exec-plans/active/mentorship-horizontal-scroll-stage/`**: Adds the active feature folder for the Mentorship horizontal-scroll work, including the canonical plan, decision log, task list, handoff, verification notes, and first-pass image prompt pack.

### Changed
- **`docs/index.md`**: Adds a discoverable documentation index entry for the Mentorship horizontal-scroll design note.
- **`AGENTS.md`**: Adds a Codex task-routing and feature-continuity section, and links the new custom instruction doc from the key documentation table.
- **`WORKFLOW/01_WORKFLOW.md`**: Adds the Codex pre-flight routing protocol and the feature continuity folder protocol for complex and multi-session work.
- **`docs/index.md`**: Adds discoverability links for the Codex custom instruction template and the feature-work template.
- **`docs/design-docs/mentorship-horizontal-scroll-stage/README.md`**: Updates the concept note to point to the new canonical feature-folder plan.
- **`docs/exec-plans/active/mentorship-horizontal-scroll-stage-execution-plan.md`**: Marks the older flat execution-plan file as superseded by the new feature folder.

## [2026-03-04] - Mentorship Advice Snap Stack (Desktop)

### Changed
- **`src/app/mentorship/page.tsx`**: Replaces the old per-card pin logic with a single desktop GSAP ScrollTrigger stage (`mentor-advice-snap`) that pins once, scrubs through card depth transitions, and snaps to deterministic card steps.
- **`src/app/mentorship/page.tsx`**: Adds left/right navigation buttons for the advice stage and an active step indicator (`current / total`) synced to scroll progress.
- **`src/app/mentorship/page.tsx`**: Opts all Mentorship sections out of global micro-pin (`data-micro-pin="off"`) to eliminate nested pin conflicts and jerky scroll behavior.
- **`src/app/mentorship/page.tsx`**: Fixes stacked-card overlay ghosting by fully fading non-active/outgoing cards and promoting the incoming card to the top stacking layer during each scrubbed step.
- **`src/app/mentorship/page.tsx`**: Improves active card state sync by deriving the active index from live card opacity values during ScrollTrigger updates.
- **`src/app/mentorship/page.tsx`** and **`src/app/mentorship/MentorshipPage.css`**: Refactors advice navigation controls to viewport-fixed anchors (`10vw` left and `10vw` from right) with trigger-scoped visibility, keeping arrows static during the pinned advice sequence.
- **`src/app/mentorship/page.tsx`** and **`src/app/mentorship/MentorshipPage.css`**: Keeps the Practical Advice heading visible during active card interaction by promoting the heading group into a trigger-scoped fixed reference layer.
- **`src/app/mentorship/page.tsx`** and **`src/app/mentorship/MentorshipPage.css`**: Redesigns the advice card composition with a wider desktop stage, split-digit corner numbering (`0` offset + `1` inset), and rebalanced title/body placement zones.
- **`src/app/mentorship/MentorshipPage.css`**: Introduces a desktop snap-stage layout with stacked-depth card styling, side nav button styles, reduced-motion fallback, and static mobile flow.
- **`src/app/mentorship/MentorshipPage.css`**: Removes transform contention on the reality image hover effect by switching from `transform: scale(...)` to a brightness filter hover.
- **`src/app/mentorship/MentorshipPage.css`**: Constrains the desktop advice stage to a centered `40vw` band so cards read inside the `30vw` to `70vw` viewport window.
- **`src/app/mentorship/page.tsx`**: Stabilizes advice snap interaction by switching active-index sync to ScrollTrigger progress, expanding per-step scroll travel, and softening snap timing to reduce jitter under wheel/trackpad scroll.
- **`src/app/mentorship/page.tsx`** and **`src/app/mentorship/MentorshipPage.css`**: Refactors the Practical Advice heading into a full-width sticky glass bar with softened top/bottom edge blending while keeping heading content constrained to the shared page container.
- **`src/app/mentorship/page.tsx`** and **`src/app/mentorship/MentorshipPage.css`**: Wraps the advice stack in a centered content-zone frame directly under the sticky heading bar so the cards read as a dedicated, bounded stage area.
- **`src/app/mentorship/page.tsx`** and **`src/app/mentorship/MentorshipPage.css`**: Adds a top fade veil and stronger upward card travel during advice snap transitions so outgoing cards visibly pass under the sticky bar and dissolve as they exit.
- **`src/app/mentorship/MentorshipPage.css`**: Repositions advice navigation controls to sit lower and farther outboard (left/right viewport rails) so previous/next toggles align with the marked yellow target zones around the card stage.

## [2026-03-04] - Home Hero Handoff Refinement

### Changed
- **`src/components/sections/home/Hero.tsx`**: Reworks the home hero scroll sequence so the hero image remains fixed while the Gap Problem section performs the overlap/parallax handoff with a 15% peak cover and a smooth settle.
- **`src/components/sections/home/GapProblem.tsx`** and **`src/components/sections/home/GapProblem.css`**: Refactors the Gap Problem section into a theme-aware Vanilla CSS surface with a light-mode `#F5F0EE` background, dark-mode parity with the existing dark surface, and a temporary top blend layer used only during the hero transition.
- **`src/components/sections/home/Hero.tsx`** and **`src/components/sections/home/GapProblem.css`**: Removes the temporary hero-to-gap blend overlay so the overlap now reads as a flat, natural section edge during the handoff.
- **`src/components/sections/home/Hero.tsx`** and **`src/components/sections/home/GapProblem.tsx`**: Consolidates the gap-section lift under the hero ScrollTrigger so the section rises once into its overlap position instead of being pushed up and then settled back by a second transform timeline.
- **`src/components/sections/home/GapProblem.css`**: Corrects the gap section top spacing so the overlap no longer creates an oversized empty band above the eyebrow and headline during scroll.
- **`src/components/sections/home/ImpactMetrics.tsx`** and **`src/components/ui/MetricCard.tsx`**: Opts the Impact section out of the global micro-pin hold and adds a GSAP count-up sequence so the key figures animate from zero when the section enters view.
- **`src/app/globals.css`**: Removes the shared powder-petal text inheritance from `#gap-problem` so the section can own its light/dark surface contrast correctly.

## [2026-03-04] - About Gym Cards Accordion Interaction

### Added
- **`src/app/about/page.tsx`**: Adds structured hover-state content for the "Discipline Outside the Site" gym cards, including numbered labels, supporting copy, spec rows, and badges.

### Changed
- **`src/app/about/page.tsx`**: Refactors the gym card markup into interactive accordion panels for tablet and desktop, with hover activation on pointer devices and tap/focus activation on non-hover tablets. Mobile remains the existing static gallery.
- **`src/app/about/AboutPage.css`**: Replaces the tablet/desktop masonry treatment for the gym cards with a showroom-style accordion layout, staged reveal timings, active/inactive panel states, and reduced-motion safeguards.


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
