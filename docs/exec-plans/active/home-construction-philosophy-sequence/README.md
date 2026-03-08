# Home Construction Philosophy Sequence

Status: Active rewrite implementation
Last updated: 2026-03-08
Branch: `codex/mentorship-horizontal-scroll`

## Overview

This feature introduces a pinned, scroll-driven home-page sequence that scrubs through 192 construction frames while narrative lines appear in staged windows.

The section now exists in the app and is integrated between Hero and GapProblem. Current work is focused on rewriting the animation ownership model for `Hero -> Philosophy -> Gap` so those sections no longer interfere with each other.
The Hero and Philosophy rebuild phases are now complete. Current work is focused on the Philosophy-owned exit settle for the transition into the static Gap section, plus full-flow integration checks.

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
- Canvas sequence keeps loading in place behind a section-local progress badge, and frame drawing falls back to the nearest loaded frame until the requested frame arrives.
- Philosophy now uses explicit desktop/mobile `gsap.matchMedia()` branches for its pinned narrative.
- 192 frame assets present in `public/images/philosophy/`.
 - Pin distance now uses an explicit `250vh` ScrollTrigger range.
- Text choreography no longer mixes CSS base transforms with GSAP `y` motion, and Phase 3 keeps Philosophy as the only `pin: true` owner in this page region.
- Mobile uses cover-mode framing, lower-third copy, single-line swaps, and dedicated overlay foreground tokens so light theme remains readable over the dark scrim.
- Reduced-motion and total frame-load failure paths both degrade to readable static narrative layouts.
- `PhilosophySequence` now explicitly opts out of the global micro-pin system.
- `npm run lint` and `npm run build` pass.

Open items:
- Gap still needs its settle implementation, but the chosen architecture is to keep Gap static and let Philosophy own any exit settle instead of adding document-level scroll snap.
- The full `Hero -> Philosophy -> Gap -> FeaturedProjects` flow still needs its post-Phase-3 integration pass after the Gap settle lands.
- Desktop eyebrow clearance under the fixed header remains secondary after the ownership rewrite.

## Success Criteria

- Pinned stage scrubs frame progression uniformly across the full ScrollTrigger range.
- Page remains pinned for the intended duration and unpins cleanly.
- Text window timing aligns with visible construction progression.
- Hero, Philosophy, and Gap each own only their own motion.
- Gap remains readable without becoming another GSAP section.
- Desktop layout reads as intentional side-rail (not accidental overlap).
- Mobile/reduced-motion fallbacks remain readable and robust.
- Lint/build remain clean except for pre-existing unrelated warnings.
