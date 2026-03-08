# Handoff - Home Construction Philosophy Sequence

## Current State

- Section is implemented and routed on the home page.
- Frames exist and load from `public/images/philosophy/`.
- Hero no longer animates the next section during its pinned intro.
- Hero now keeps the image fixed while the copy fades and the blurred asset clears during its local pin.
- `PhilosophySequence` now opts out of the global micro-pin flow, so it is the only long-form pin owner in this page region.
- Philosophy now initializes on the first successfully loaded frame, keeps a section-local loader while remaining frames settle, and redraws toward the requested frame with nearest-frame fallback.
- Timeline normalization fix is implemented (frame tween spans the full timeline).
- Canvas resize scaling fix is implemented.
- Desktop side-rail markup/CSS refactor is implemented.
- Pin distance is explicitly tuned to `250vh`.
- Desktop text jitter/overlap is fixed by consolidating text property ownership under GSAP and explicit breakpoint timelines.
- Mobile uses cover-mode framing, lower-third copy placement, discrete line swaps, and dedicated light-theme overlay tokens.
- Reduced-motion and no-frame failure cases now degrade to readable static narrative flow.
- Runtime browser validation passed on desktop, mobile light theme, reduced-motion, and the post-Phase-1 DOM ownership checks.
- `npm run lint` and `npm run build` pass.
- Feature remains in active rewrite mode because the Gap exit settle and full-flow integration pass are still unresolved.

## Next Recommended Step

Start Phase 4 and add the chosen Philosophy-owned exit settle while keeping Gap static and free of local GSAP.

## Files to Read First

- [Feature overview](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/README.md)
- [Feature plan](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/plan.md)
- [Current component](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/components/sections/home/PhilosophySequence.tsx)
- [Current styles](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/components/sections/home/PhilosophySequence.css)
- [Verification log](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/verification.md)

## Files Expected to Change Next

- `src/components/sections/home/PhilosophySequence.tsx`
- `src/components/sections/home/GapProblem.tsx`
- `src/components/sections/home/GapProblem.css`

## Risks and Open Questions

- The chosen Philosophy-owned exit settle still needs implementation and real-device validation against the static Gap section.
- Re-test the full upstream flow after the latest Hero fixed-image fade adjustment to make sure the handoff pacing still feels intentional.
- The full `Hero -> Philosophy -> Gap -> FeaturedProjects` flow still needs its post-Phase-3 integration pass.
- Desktop eyebrow clearance remains a secondary concern after the structural pin and readability fixes.
- Further animation changes should preserve the single-owner model for transforms and opacity to avoid reintroducing jitter.
