# Home Construction Philosophy Sequence

Status: Active mobile-variant comparison branch
Last updated: 2026-03-09
Branch: `feature/offscreen-canvas-worker`

## Overview

This feature introduces a pinned, scroll-driven home-page philosophy sequence between Hero and GapProblem.

On this branch, the current focus is the immersive mobile comparison path: phones now use a dedicated portrait frame family instead of reusing the desktop `16:9` sequence. Desktop and tablet keep the landscape sequence and the current layout. The alternative stacked mobile layout remains isolated on its own branch for side-by-side comparison.

## Related Docs

- [Design note](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/design-docs/home-construction-philosophy-sequence/README.md)
- [Feature plan](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/plan.md)
- [Wireframes](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/wireframes.md)
- [Frame setup](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/FRAME_SETUP.md)
- [Home route](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/app/page.tsx)
- [Hero section](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/components/sections/home/Hero.tsx)
- [Philosophy section](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/components/sections/home/PhilosophySequence.tsx)

## Scope

In scope:
- pinned ScrollTrigger stage for `PhilosophySequence`
- phone-only portrait frame support below `768px`
- landscape sequence continuity for tablet and desktop
- synchronized text choreography across both frame families
- breakpoint-safe asset switching without disturbing pin ownership
- worker and fallback renderer protection against stale frame loads
- preserving the current immersive mobile layout on this branch

Out of scope:
- redesigning the mobile layout on this branch
- changing Hero, GapProblem, or downstream home sections
- changing the `250vh` narrative pace or `10vh` final hold
- replacing the worker architecture
- ratio-based device gating beyond the `<768px` phone breakpoint

## Current State

Implemented:
- Section remains integrated between Hero and GapProblem on the home route.
- Hero and Gap remain on the single-owner motion model established by the earlier ownership rewrite.
- The desktop/tablet philosophy sequence still uses the original `192` landscape frames in `public/images/philosophy/`.
- A new phone-only portrait sequence now ships from `public/images/philosophy/mobile/` with `240` normalized `frame-001.jpg` to `frame-240.jpg` assets.
- `PhilosophySequence` now chooses the sequence variant by breakpoint: `<768px` uses portrait frames, `>=768px` uses the landscape set.
- Text timing now derives from normalized progress windows, so the same editorial beats stay aligned across both the `192`-frame and `240`-frame variants.
- The worker path and main-thread fallback both ignore stale frame loads via per-load tokens, which keeps breakpoint switches from mixing old and new sequences.
- Breakpoint switching now preserves normalized progress without re-running the full `useGSAP` setup, so the philosophy pin spacer no longer compounds on `767 -> 768 -> 767` transitions.
- The current immersive mobile layout is intentionally preserved on this branch: full-height stage, cover rendering, lower-third copy, and the existing `10vh` end hold all remain in place.
- Reduced-motion and total frame-load failure paths remain readable.
- `npm run lint` and `npm run build` pass.

Open items:
- Compare this immersive portrait-frame branch against the stacked mobile-layout branch and choose the preferred mobile direction.
- Decide whether any follow-up phone tuning is still needed after user review, or whether the asset swap solves the crop issue cleanly enough on its own.
- Reduced-motion still loads the active frame family before falling back to static content; that optimization remains deferred.

## Success Criteria

- Phones below `768px` request only the portrait frame family.
- Tablets and desktops continue requesting only the landscape frame family.
- Text beats stay editorially aligned across both variants.
- Breakpoint changes do not restart the sequence or compound pin spacing.
- The existing immersive mobile layout remains intact on this branch.
- The existing final `10vh` hold remains intact.
- Reduced-motion and load-failure fallbacks remain readable and robust.
- Lint/build remain clean except for pre-existing unrelated warnings.
