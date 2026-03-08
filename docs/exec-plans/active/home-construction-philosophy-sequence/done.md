# Done - Home Construction Philosophy Sequence

## Completed Work

- 2026-03-08 - Restored the intended Hero scroll behavior: the image stays fixed, the copy fades out, and the blurred asset transitions into the clear asset without reintroducing image lift or darkening.
- 2026-03-08 - Rebuilt `PhilosophySequence` as the only pinned narrative in the Hero -> Philosophy -> Gap flow using explicit desktop/mobile `gsap.matchMedia()` branches.
- 2026-03-08 - Changed Philosophy preload/init so the section can pin on the first usable frame, keep loading remaining assets in place, and redraw toward the requested frame with nearest-frame fallback.
- 2026-03-08 - Added section-local loading UI, mobile light-theme overlay tokens, and a static no-frame fallback so Philosophy remains readable across slow load, light theme, and asset-failure scenarios.
- 2026-03-08 - Validated the Phase 3 Philosophy rebuild in Playwright on desktop, mobile light theme, and reduced-motion; re-ran `npm run lint` and `npm run build` successfully.
- 2026-03-08 - Rebuilt Hero as a self-contained intro with hero-owned image drift, faster blur release, and an internal exit wash instead of downstream handoff motion.
- 2026-03-08 - Validated the new Hero pacing in Playwright on desktop and mobile so the intro no longer falls into a static dead zone after the copy fades.
- 2026-03-08 - Removed Hero's sibling handoff tween so Hero no longer animates Philosophy or Gap geometry.
- 2026-03-08 - Opted `PhilosophySequence` out of `ScrollMicroPin` via `data-micro-pin="off"` so its local `pin: true` trigger is the only pin owner in that page region.
- 2026-03-08 - Verified in Playwright that `#philosophy-sequence` now renders inside a plain `.pin-spacer` and no longer inherits `.pin-spacer-micro-pin:*`.
- 2026-03-08 - Re-ran `npm run lint` (same 2 unrelated warnings) and `npm run build` (pass) after the Phase 1 boundary changes.
- 2026-03-08 - Drafted a detailed rewrite plan for independent `Hero -> Philosophy -> Gap` animation ownership.
- 2026-03-08 - Performed a deep debug audit of `PhilosophySequence`, `Hero`, and the global scroll pin system instead of treating the feature as signoff-ready.
- 2026-03-08 - Confirmed at runtime that the philosophy section was wrapped by the global micro-pin system (`pin-spacer-micro-pin:0`) during home-page playback before the Phase 1 fix.
- 2026-03-08 - Confirmed at runtime on a 390x844 viewport that the mobile lower-third copy is effectively unreadable in light-theme/auto-theme because dark text sits on a dark scrim.
- 2026-03-08 - Cross-checked the current implementation against the local design note and official GSAP ScrollTrigger/matchMedia/refresh docs to isolate structural, not cosmetic, issues.
- 2026-03-07 - Created feature continuity folder, design note, and wireframe documentation for the new home philosophy sequence.
- 2026-03-07 - Implemented `PhilosophySequence` with canvas-based 192-frame rendering and GSAP ScrollTrigger pin/scrub timeline.
- 2026-03-07 - Inserted `PhilosophySequence` between Hero and GapProblem in `src/app/page.tsx`.
- 2026-03-07 - Refactored Hero handoff from hardcoded `#gap-problem` to `nextElementSibling`.
- 2026-03-07 - Updated section numbering so GapProblem now follows Philosophy sequence.
- 2026-03-07 - Added reduced-motion fallback and loading progress UI in sequence component.
- 2026-03-07 - Confirmed 192 frame assets exist in `public/images/philosophy/` with expected naming.
- 2026-03-07 - Ran `npm run lint` (2 unrelated warnings, no errors).
- 2026-03-07 - Ran `npm run build` successfully.
- 2026-03-07 - Performed code review audit and identified stabilization priorities for timeline duration, canvas resize scaling, and layout fidelity.
- 2026-03-07 - Added explicit timeline normalization for frame scrub in `PhilosophySequence.tsx` using a full-span frame tween duration.
- 2026-03-07 - Fixed canvas resize behavior to avoid cumulative scaling (`setTransform` reset + DPR-capped redraw + resize RAF).
- 2026-03-07 - Refactored sequence markup/CSS to true desktop side-rail composition and added mobile readability scrim.
- 2026-03-07 - Re-ran `npm run lint` and `npm run build`; both pass (same unrelated lint warnings remain).
- 2026-03-07 - Changed the pin distance from percentage-based pacing to an explicit `250vh` ScrollTrigger range.
- 2026-03-07 - Refactored text choreography so GSAP fully owns line transforms, removing the CSS/GSAP transform conflict that caused jitter and jumpy overlaps.
- 2026-03-07 - Switched mobile canvas rendering to cover-mode and moved the mobile copy block to the lower third for full-bleed readability.
- 2026-03-07 - Replaced mobile crossfades with discrete line swaps so only one philosophy sentence is visible at a time on narrow screens.
- 2026-03-07 - Ran runtime browser validation on desktop, mobile, and reduced-motion modes; sequence behavior is now stable in all three paths.
