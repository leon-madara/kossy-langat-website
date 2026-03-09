# Home Construction Philosophy Sequence

Status: Active rewrite implementation
Last updated: 2026-03-09
Branch: `codex/mobile-philosophy-layout-exploration`

## Overview

This feature introduces a pinned, scroll-driven home-page sequence that scrubs through 192 construction frames while narrative lines appear in staged windows.

The section now exists in the app and is integrated between Hero and GapProblem. The ownership rewrite across `Hero -> Philosophy -> Gap` is now stable, and the latest work moved the phone layout away from the old lower-third overlay into a stacked composition.
The Hero and Philosophy rebuild phases are complete. Current work is focused on phone-only visual review and any follow-up tuning after the new under-`768px` eyebrow/image/copy layout shipped.

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
- frame-scrubbed canvas rendering across 192 frames
- synchronized text choreography
- desktop and mobile responsive variants
- independent Hero exit behavior
- static Gap entry behavior with lightweight readability support

Out of scope:
- redesigning unrelated home sections
- changing the home hero copy strategy
- replacing frame assets with generated imagery

## Current State

Implemented:
- Section inserted into home route between Hero and GapProblem.
- Hero handoff changed from hardcoded target to `nextElementSibling`.
- Hero no longer animates its next sibling and now releases into normal document flow.
- Hero now keeps the image fixed while the copy fades out and the blurred asset scrubs into the clear asset, with no lift or darkening pass.
- Philosophy now initializes on the first successfully loaded frame instead of waiting for all 192 frames before pinning.
- Philosophy now claims its pin immediately on mount, so frame readiness no longer controls the Hero -> Philosophy handoff.
- Canvas sequence keeps loading in place behind a section-local progress badge, and frame drawing falls back to the nearest loaded frame until the requested frame arrives.
- Philosophy now uses explicit desktop/mobile `gsap.matchMedia()` branches for its pinned narrative.
- 192 frame assets present in `public/images/philosophy/`.
- Pin distance now uses an explicit `250vh` ScrollTrigger range plus a dedicated `10vh` final hold before release.
- Text choreography no longer mixes CSS base transforms with GSAP `y` motion, and Phase 3 keeps Philosophy as the only `pin: true` owner in this page region.
- Phone-only (`<768px`) layout now uses a separate eyebrow strip above the image, a framed contained canvas stage, and a full-width copy block below the image.
- Tablet (`768px-1023px`) keeps the existing full-bleed overlay treatment, and desktop side-rail behavior remains unchanged.
- Phone rendering now switches the frame scaler to `contain` mode while tablet/desktop stay on `cover`.
- Phone-only loader placement now sits in the framed image area instead of the top-center metadata zone.
- Phone-only scrim is disabled because the copy no longer overlays the image.
- Reduced-motion and total frame-load failure paths both degrade to readable static narrative layouts.
- `PhilosophySequence` now explicitly opts out of the global micro-pin system.
- `npm run lint` and `npm run build` pass.

Open items:
- Re-run a real-device phone review to confirm the new stacked layout feels comfortable on short and tall phones outside emulation.
- The full `Hero -> Philosophy -> Gap -> FeaturedProjects` flow still needs a final integration pass after the mobile recomposition.
- Desktop eyebrow clearance under the fixed header remains secondary to the current phone-layout review.

## Success Criteria

- Pinned stage scrubs frame progression uniformly across the full ScrollTrigger range.
- Page remains pinned for the intended duration and unpins cleanly.
- Text window timing aligns with visible construction progression.
- Hero, Philosophy, and Gap each own only their own motion.
- Gap remains readable without becoming another GSAP section.
- Desktop layout reads as intentional side-rail (not accidental overlap).
- Phone layout reads clearly without overlay collisions, while tablet and desktop remain unchanged.
- Reduced-motion and load-failure fallbacks remain readable and robust.
- Lint/build remain clean except for pre-existing unrelated warnings.
