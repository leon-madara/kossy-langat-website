# Plan - Home Construction Philosophy Sequence

Status: Active mobile-variant comparison branch
Feature slug: `home-construction-philosophy-sequence`
Branch: `feature/offscreen-canvas-worker`
Related docs:
- [Feature overview](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/README.md)
- [Design note](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/design-docs/home-construction-philosophy-sequence/README.md)
- [Wireframes](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/wireframes.md)

## Goal

Integrate a phone-only portrait philosophy sequence into the current immersive mobile layout so phones no longer crop the desktop `16:9` frames aggressively:
- phones below `768px` use the new `240`-frame portrait sequence
- tablet and desktop keep the existing `192`-frame landscape sequence
- text timing remains editorially aligned across both variants
- breakpoint changes preserve progress without destabilizing the pinned GSAP sequence

## Non-Goals

- redesigning the mobile layout on this branch
- changing Hero, GapProblem, or FeaturedProjects
- changing the `250vh` narrative pacing or `10vh` end hold
- replacing the worker architecture
- ratio-based device gating beyond `<768px`

## Success Criteria

- Phones load only the portrait sequence from `public/images/philosophy/mobile/`.
- Tablet and desktop continue loading only the landscape sequence from `public/images/philosophy/`.
- Text cues remain aligned across both frame families via shared progress windows.
- The current immersive mobile layout remains visually unchanged apart from the improved source framing.
- Breakpoint changes do not compound pin spacing or restart the sequence.
- Delayed phone frame loads do not leak Gap into view before Philosophy owns the viewport.
- `npm run lint` and `npm run build` continue to pass.
- This branch remains directly comparable with the separate stacked mobile-layout branch.

## Principles

### 1. Preserve the current immersive layout on this branch

- The point of this branch is to evaluate portrait assets inside the existing mobile composition.
- Layout redesign belongs to the separate stacked-layout comparison branch.

### 2. Breakpoints choose sequence variants

- `<768px` selects the portrait sequence.
- `>=768px` selects the landscape sequence.
- Only one frame family should load for a given breakpoint path.

### 3. Shared editorial timing

- Copy timing should be expressed as normalized progress windows, not hardcoded per-variant frame indices.
- Landscape timing remains the editorial baseline.

### 4. One pin owner during resize

- `gsap.matchMedia()` remains the only timeline owner during breakpoint changes.
- Variant switching must not rerun the full `useGSAP` setup, or pin spacing will accumulate.
- Worker and fallback loads must ignore stale requests during variant swaps.

## Phases

### Phase 1 - Promote the Phone Portrait Asset Set

- Copy the portrait research frames into `public/images/philosophy/mobile/`.
- Normalize the filenames to `frame-001.jpg` through `frame-240.jpg`.

Deliverable:
- Production-ready phone frame set.
- Status: completed on 2026-03-09.

### Phase 2 - Make the Sequence Variant-Aware

- Replace the single fixed frame family in `PhilosophySequence.tsx` with explicit landscape and phone variants.
- Refactor the fallback renderer to use the active variant frame count.
- Convert text activation from frame windows to shared progress windows.

Deliverable:
- One component path that supports `192` landscape frames and `240` portrait frames.
- Status: completed on 2026-03-09.

### Phase 3 - Make Breakpoint Switching Safe

- Preserve normalized progress when changing variants on resize.
- Ignore stale worker/fallback loads during variant changes.
- Keep `gsap.matchMedia()` as the single timeline owner during breakpoint changes.

Deliverable:
- Stable `767 -> 768 -> 767` transitions with no compounded pin spacing.
- Status: completed on 2026-03-09.

### Phase 4 - Verification and Comparison Prep

- Re-run phone, tablet, desktop, reduced-motion, final-hold, and delayed-load checks.
- Update feature continuity docs and changelog for the comparison branch.
- Hand off the branch for visual review against the stacked-layout alternative.

Deliverable:
- User-review-ready immersive mobile comparison branch.
- Status: completed on 2026-03-09.

## Immediate Next Step

- Compare this branch against `codex/mobile-philosophy-layout-exploration` and decide whether the immersive portrait-frame path or the stacked mobile layout is the stronger mobile direction.
