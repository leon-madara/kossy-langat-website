# Decisions - Mentorship Horizontal Scroll Stage

## Accepted

- 2026-03-05 - Decision: replace the current desktop stacked-card advice interaction with a pinned horizontal stage. Why: it gives the section enough space to feel editorial and premium instead of cramped. Impact: the advice section markup and GSAP system will be reworked.
- 2026-03-05 - Decision: keep the heading area above the stage as the stable section intro. Why: it preserves readability and prevents the whole page from becoming one giant horizontal interaction. Impact: the horizontal motion is localized to the lower stage.
- 2026-03-05 - Decision: use five panels for the five principles. Why: one panel per principle preserves narrative clarity. Impact: the horizontal track will contain exactly five primary desktop panels.
- 2026-03-05 - Decision: use the layout rhythm `A -> B -> C -> B -> A`. Why: it creates variety without making the sequence visually incoherent. Impact: panel archetypes will repeat intentionally rather than each panel becoming unrelated.
- 2026-03-05 - Decision: generated images should follow one tight art direction. Why: inconsistent imagery would break the authored feel of the section. Impact: image prompts must use one shared template and style system.
- 2026-03-05 - Decision: the desktop stage should occupy the full orange-box region as a full-width viewport with an inner content safe area. Why: the stage must feel like a narrative canvas rather than a centered floating card. Impact: the current centered advice card frame will be replaced.
- 2026-03-05 - Decision: use a desktop stage height of `clamp(460px, 54vh, 600px)` with a `64px` heading-to-stage gap. Why: this better uses the available viewport height across 1280 to 1920 desktop widths while staying readable. Impact: the future GSAP stage and panel layouts should be built against this geometry.
- 2026-03-05 - Decision: use a centered content safe area of `min(1380px, calc(100vw - 96px))` inside full-width panels. Why: it allows a premium full-stage feel without pushing important content against the viewport edges. Impact: panel content alignment should be based on the safe area, not the full viewport edge.
- 2026-03-05 - Decision: use a global bottom-centered numeric progress cue during the first implementation. Why: it is the simplest high-signal progress system and avoids overcomplicating the early layout pass. Impact: progress styling can be refined later without changing the panel structure.
- 2026-03-05 - Decision: use a vertical editorial stack as the mobile fallback and a non-scrubbed static flow as the reduced-motion fallback. Why: these are the safest readable fallbacks before any mobile-specific horizontal behavior is attempted. Impact: desktop motion complexity will stay isolated.
- 2026-03-05 - Decision: set desktop content limits to a two-line title with a hard cap of `34` characters and body copy with a target range of `150` to `210` characters and a hard cap of `220`. Why: the layouts need predictable density before static panel build begins. Impact: copy may need trimming if it exceeds the locked limits.
- 2026-03-06 - Decision: use the user-provided `ResearchFindings` image set for implementation instead of waiting on generated assets. Why: it removes the billing blocker and lets the feature ship with approved imagery now. Impact: the horizontal stage uses checked-in local images under `public/images/mentorship/`.
- 2026-03-06 - Decision: keep the desktop advice viewport fully full-width and move the inset logic into the inner safe area only. Why: the first browser pass showed that inset outer padding clipped panel content against the viewport edge. Impact: the stage now uses a true full-width viewport with protected internal content margins.
- 2026-03-06 - Decision: upgrade the progress system from numeric-only to rail-plus-numeric. Why: the horizontal stage needed a stronger sense of travel without introducing extra navigation chrome. Impact: the bottom progress cue now includes active rail segments and the numeric counter.
- 2026-03-06 - Decision: add GSAP snap between panel resting states. Why: the scrubbed stage looked unresolved when it paused between panels during browser review. Impact: the desktop experience now settles cleanly on each principle after scrolling.

## Rejected

- 2026-03-05 - Rejected option: make the existing card itself contain the horizontal scroll. Why: it would feel cramped and widget-like instead of like a premium narrative stage.
- 2026-03-05 - Rejected option: turn the entire mentorship page into one long horizontal interaction. Why: it would overwhelm the page structure and make the section less controlled.

## Deferred

- 2026-03-05 - Deferred topic: whether progress remains numeric only or evolves into a rail-plus-numeric system. Trigger: after the static stage is visually composed.
- 2026-03-06 - Decision: move panel number from floating above card to top-left corner inside card. Why: creates cleaner visual hierarchy and allows title/content to scale up without collision. Impact: number is now integrated into card layout with reduced size (3-4.5rem vs 4.5-8.8rem).
- 2026-03-06 - Decision: soften snap behavior with increased delay (0.2s) and longer duration (0.4-0.7s). Why: hard snapping during scroll felt jarring and interrupted parallax experience. Impact: users can now freely scroll and experience parallax effects before gentle snap occurs.
- 2026-03-06 - Decision: implement varied scale animations per panel instead of uniform scale. Why: all images having identical zoom patterns felt monotonous and didn't leverage the parallax potential. Impact: each panel now has unique scaleStart/scaleEnd values creating visual variety (some zoom in 1.0→1.18, others zoom out 1.15→1.02).
- 2026-03-06 - Decision: reduce scrub value from 1 to 0.5 on all parallax animations. Why: tighter scrub made motion feel too locked to scroll position, reducing fluidity. Impact: parallax effects now have more natural lag and smoothness.
- 2026-03-06 - Decision: add opacity transitions to card elements during parallax. Why: elements appearing at full opacity from viewport edge felt abrupt. Impact: cards, numbers, and details now fade in (0.5-0.7 → 1.0) as they enter viewport.
