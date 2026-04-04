# Handoff - Home Construction Philosophy Sequence

## Current State

- Section is implemented and routed on the home page.
- Desktop/tablet frames exist and load from `public/images/philosophy/`.
- Phone portrait frames now exist and load from `public/images/philosophy/mobile/`.
- Hero no longer animates the next section during its pinned intro.
- Hero now keeps the image fixed while the copy fades and the blurred asset clears during its local pin.
- `PhilosophySequence` now opts out of the global micro-pin flow, so it is the only long-form pin owner in this page region.
- Philosophy now claims its pin immediately on mount, keeps a section-local loader while remaining frames settle, and waits only on first-frame readiness before syncing canvas/text rendering to the current scroll position.
- Philosophy now includes a dedicated `10vh` end-hold, so the final frame and last line remain pinned briefly before the section releases into Gap.
- Philosophy now selects a phone-only portrait frame family below `768px` and keeps the original landscape family for tablet and desktop.
- Text timing now uses normalized progress windows so both the `192`-frame and `240`-frame sequences stay aligned.
- Worker and fallback frame loads now use tokens so stale variant requests cannot overwrite the active sequence.
- Breakpoint switching now preserves normalized progress without re-running the full `useGSAP` setup, which fixed the `260vh` pin-spacer accumulation seen during `767 -> 768 -> 767` transitions.
- Mobile on this branch intentionally keeps the immersive cover-mode layout, lower-third copy placement, and light-theme overlay tokens.
- Reduced-motion and no-frame failure cases now degrade to readable static narrative flow.
- Runtime validation now passes for phone portrait loading, tablet/desktop landscape loading, reduced-motion fallback, breakpoint crossing, delayed mobile-frame loading, and the existing final hold.
- `npm run lint` and `npm run build` pass.
- This branch is ready for comparison review against the stacked mobile-layout alternative.

## Next Recommended Step

Compare this immersive portrait-frame branch against `codex/mobile-philosophy-layout-exploration` and decide which mobile direction should advance. If this branch wins, limit follow-up work to targeted phone-only polish instead of a layout rewrite.

## Files to Read First

- [Feature overview](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/README.md)
- [Feature plan](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/plan.md)
- [Current component](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/components/sections/home/PhilosophySequence.tsx)
- [Worker implementation](file:///c:/Users/Leon/DevMode/kossy-langat-website/public/workers/philosophy-worker.js)
- [Current styles](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/components/sections/home/PhilosophySequence.css)
- [Verification log](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/verification.md)

## Files Expected to Change Next

- `src/components/sections/home/PhilosophySequence.tsx`
- `src/components/sections/home/PhilosophySequence.css`
- `docs/exec-plans/active/home-construction-philosophy-sequence/*`

## Risks and Open Questions

- Reduced-motion still downloads the active frame family before presenting static content; revisit only if that cost becomes material.
- If future breakpoint logic changes, keep `gsap.matchMedia()` as the sole timeline owner or the pin spacer can regress.
- Real-device comparison against the stacked-layout branch is still needed before choosing the final mobile direction.
