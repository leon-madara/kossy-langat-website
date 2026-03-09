# Handoff - Home Construction Philosophy Sequence

## Current State

- Section is implemented and routed on the home page.
- Frames exist and load from `public/images/philosophy/`.
- Hero no longer animates the next section during its pinned intro.
- Hero now keeps the image fixed while the copy fades and the blurred asset clears during its local pin.
- `PhilosophySequence` now opts out of the global micro-pin flow, so it is the only long-form pin owner in this page region.
- Philosophy now claims its pin immediately on mount, keeps a section-local loader while remaining frames settle, and waits only on first-frame readiness before syncing canvas/text rendering to the current scroll position.
- Philosophy now includes a dedicated `10vh` end-hold, so the final frame and last line remain pinned briefly before the section releases into Gap.
- Phone-only (`<768px`) layout now uses a dedicated eyebrow strip above the image, a contained framed canvas, and a full-width reading block below the image.
- Tablet (`768px-1023px`) still uses the existing full-bleed overlay treatment, and desktop side-rail composition is unchanged.
- Phone-only rendering now uses `contain` fit mode in both the worker and main-thread fallback renderer; tablet and desktop remain on `cover`.
- Phone-only loader placement now sits inside the image frame, and the phone scrim is disabled because the copy no longer overlays the image.
- Timeline normalization fix is implemented (frame tween spans the full timeline).
- Canvas resize scaling fix is implemented.
- Desktop side-rail markup/CSS refactor is implemented.
- Pin distance is explicitly tuned to `250vh`.
- Desktop text jitter/overlap is fixed by consolidating text property ownership under GSAP and explicit breakpoint timelines.
- Gap is static again with no local GSAP settle; the reveal wrappers now carry the actual opacity hint for Framer Motion.
- Reduced-motion and no-frame failure cases now degrade to readable static narrative flow.
- Runtime browser validation passed on phone, large phone, phone reduced-motion, tablet at both breakpoint edges, desktop, delayed-image loader placement, and the post-Phase-1 DOM ownership checks.
- Runtime boundary probing on 2026-03-09 did not reproduce a sampled single-frame Gap flash before Philosophy pin takeover, including under delayed philosophy-frame loading.
- `npm run lint` and `npm run build` pass.
- Feature remains in active refinement mode because the new phone layout still needs a final real-device review and a full-flow integration pass.

## Next Recommended Step

Run a real-device review of the new phone-only composition first, then re-test the full `Hero -> Philosophy -> Gap -> FeaturedProjects` flow as one integrated sequence before any further styling tweaks.

## Files to Read First

- [Feature overview](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/README.md)
- [Feature plan](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/plan.md)
- [Current component](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/components/sections/home/PhilosophySequence.tsx)
- [Current styles](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/components/sections/home/PhilosophySequence.css)
- [Worker renderer](file:///c:/Users/Leon/DevMode/kossy-langat-website/public/workers/philosophy-worker.js)
- [Verification log](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/verification.md)

## Files Expected to Change Next

- `src/components/sections/home/PhilosophySequence.tsx`
- `src/components/sections/home/PhilosophySequence.css`
- `public/workers/philosophy-worker.js`
- `docs/exec-plans/active/home-construction-philosophy-sequence/verification.md`

## Risks and Open Questions

- Re-test the full upstream flow after the phone-only layout change to make sure the pacing still feels intentional when the section is pinned on small screens.
- Shorter real devices may still need minor typography or spacing trims if the below-image copy block feels too tall.
- Desktop eyebrow clearance remains a secondary concern after the structural pin and mobile layout fixes.
- Dark theme currently inherits the same section surface palette used before this pass; revisit only if a distinct dark treatment becomes a product request.
- Further animation changes should preserve the single-owner model for transforms and opacity to avoid reintroducing jitter.
