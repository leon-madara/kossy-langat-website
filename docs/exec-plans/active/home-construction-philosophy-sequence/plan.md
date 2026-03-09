# Plan - Home Construction Philosophy Sequence

Status: Active rewrite implementation
Feature slug: `home-construction-philosophy-sequence`
Branch: `codex/mobile-philosophy-layout-exploration`
Related docs:
- [Feature overview](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/README.md)
- [Design note](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/design-docs/home-construction-philosophy-sequence/README.md)
- [Wireframes](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/wireframes.md)

## Goal

Rewrite the animation structure across `Hero`, `PhilosophySequence`, and `GapProblem` so the three sections are intentionally disconnected in animation ownership:
- `Hero` is an independent intro with only hero-owned motion.
- `PhilosophySequence` is the only pinned GSAP narrative in this page region.
- `GapProblem` is a static reading section with no local GSAP animation.

## Non-Goals

- net-new feature expansion beyond current section scope
- migration to a different animation stack
- redesign of unrelated home sections
- changes to `FeaturedProjects` beyond preserving its current local animation behavior

## Success Criteria

- Hero no longer animates or measures sibling sections.
- Philosophy owns the only pin in the `Hero -> Philosophy -> Gap` flow.
- Gap enters naturally after Philosophy unpins and remains readable without becoming another motion stage.
- The chosen soft-settle behavior for Gap feels subtle and does not trap the reader.
- Desktop and mobile behavior are defined explicitly rather than inherited from sibling coupling.
- Phone-only layout changes remain isolated below `768px`, while tablet and desktop stay visually unchanged.
- `FeaturedProjects` still works as expected after the upstream rewrite.
- `npm run lint` and `npm run build` continue to pass.

## Principles

### 1. Single-owner motion

- A section may animate only its own elements.
- No section may move the trigger geometry of the next section.

### 2. Single-owner pinning

- In this region of the home page, only `PhilosophySequence` may own a long-form `pin: true`.
- Global micro-pins must not target Philosophy during this flow.

### 3. Explicit breakpoint setup

- If the timeline structure differs by breakpoint, rebuild it with `gsap.matchMedia()` instead of relying on CSS-only changes plus `ScrollTrigger.refresh()`.

### 4. Gap stays static

- Gap should not become a GSAP scene.
- The reading assist should stay lightweight and be owned by the Philosophy exit if it is still needed after the rebuilds.

## Section Architecture

### Hero

Target behavior:
- Independent Hero sequence only.
- Fade out Hero copy, overlays, and texture on scroll.
- Optional short Hero pin/hold is acceptable if it affects only Hero-owned refs.
- No sibling handoff animation.
- No `nextElementSibling` dependency.

Implementation shape:
- Refactor `Hero.tsx` so every tween targets only hero refs.
- Remove the current logic that offsets and animates the next sibling.
- Let Hero release into normal document flow.

### Philosophy

Target behavior:
- Full pinned GSAP narrative.
- Canvas-based 192-frame scrub across `250vh`.
- Text choreography fully owned by the philosophy timeline.
- Clean release into Gap after the final line lands.

Implementation shape:
- Opt Philosophy out of `ScrollMicroPin`.
- Rebuild the section with explicit desktop/mobile `gsap.matchMedia()` branches.
- Keep trigger geometry stable by ensuring Hero no longer transforms this section.
- Revisit preload/init timing so pin setup is predictable on slower loads.

### Gap

Target behavior:
- No local GSAP animation.
- Normal scroll section that releases naturally after Philosophy.
- Once the reader continues, the section passes naturally into `FeaturedProjects`.

Implementation shape:
- Remove Gap from any inherited local or cross-section GSAP choreography.
- Keep document-level scroll snap out of this flow because there is no local scroll container in the page region.
- Keep the release assist in Philosophy ownership only; do not add GSAP to Gap itself.

## Phases

### Phase 1 - Remove Cross-Section Coupling

- Remove Hero's `nextElementSibling` handoff model.
- Decide whether Hero keeps a local pin or becomes a simple scrub/fade release.
- Opt Philosophy out of the global micro-pin system.
- Confirm Gap is not being animated by Hero or by inherited pin logic.

Deliverable:
- Clean section ownership boundaries.
- Status: checkpoint completed on 2026-03-08.

### Phase 2 - Rebuild Hero as a Self-Contained Intro

- Refactor `Hero.tsx` so all tweens are scoped to hero-owned refs.
- Preserve the current atmosphere and fade quality without affecting downstream sections.
- Tune Hero's release so Philosophy arrives naturally.

Deliverable:
- Independent Hero animation.
- Status: checkpoint completed on 2026-03-08.

### Phase 3 - Rebuild Philosophy as the Only Pinned Narrative

- Rework Philosophy into explicit desktop/mobile GSAP setups.
- Preserve one pin owner and one timeline owner.
- Improve loading/init strategy so the pin does not register excessively late.
- Preserve reduced-motion and load-failure fallbacks.
- Re-validate mobile light-theme readability.

Deliverable:
- Stable pinned philosophy sequence with clean entry and release.
- Status: checkpoint completed on 2026-03-08.

### Phase 4 - Stabilize Philosophy Release Boundary

- Make Philosophy claim its pin before frame readiness so the Hero -> Philosophy handoff cannot leak Gap for a frame on slower loads.
- Keep Gap static and remove any leftover local GSAP settle behavior.
- Add a dedicated final hold so the last frame and final line dwell before release.

Deliverable:
- Stable Hero -> Philosophy -> Gap release boundary with one motion owner.
- Status: checkpoint completed on 2026-03-09.

### Phase 5 - Recompose Phone-Only Philosophy Layout

- Split the old under-`1024px` layout into phone (`<768px`) and tablet (`768px-1023px`) behavior.
- Move the eyebrow into a dedicated phone-only strip above the image.
- Change phone rendering from full-bleed cover framing to a contained framed image with full-width copy below.
- Keep tablet and desktop visually unchanged.
- Mirror the new phone composition in reduced-motion and load-failure fallback states.

Deliverable:
- Phone-only stacked mobile composition with contained image, separate eyebrow strip, and below-image copy.
- Status: checkpoint completed on 2026-03-09.

### Phase 6 - Integration and Cleanup

- Re-test `Hero -> Philosophy -> Gap -> FeaturedProjects` as one continuous flow.
- Remove obsolete assumptions from docs and code comments.
- Verify the global micro-pin system still behaves correctly for the rest of the site.

Deliverable:
- Stable home flow with independent animation ownership.

### Phase 7 - Verification and Signoff

- Desktop browser pass.
- Mobile browser pass.
- Reduced-motion pass.
- Slow-load sanity pass for Philosophy.
- `npm run lint`
- `npm run build`

Deliverable:
- User-review-ready rewrite.

## Immediate Next Step

- Run a final real-device review of the new phone-only layout and then re-test the full `Hero -> Philosophy -> Gap -> FeaturedProjects` flow as one integrated sequence.
