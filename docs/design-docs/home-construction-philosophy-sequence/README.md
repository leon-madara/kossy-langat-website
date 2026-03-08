# Home Construction Philosophy Sequence

Status: Draft concept note
Last updated: 2026-03-07
Current branch: `codex/mentorship-horizontal-scroll`

## Purpose

Define where the new 192-frame construction sequence and narrative text should live on the home page, and lock the first implementation direction before code work starts.

Relevant files:
- [Home route](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/app/page.tsx)
- [Hero section](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/components/sections/home/Hero.tsx)
- [Gap Problem section](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/components/sections/home/GapProblem.tsx)
- [Feature overview](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/README.md)
- [Feature plan](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/home-construction-philosophy-sequence/plan.md)

## Project Fit Analysis

Current section order:

`Hero -> GapProblem -> FeaturedProjects -> ImpactMetrics -> Representation`

### Option 1 - New section between Hero and GapProblem (recommended)

Flow:

`Hero -> Philosophy Sequence -> GapProblem`

Why it fits best:
- The sequence extends the hero message instead of interrupting project proof sections.
- The final line naturally hands off to GapProblem ("space between people and design").
- It becomes the narrative centerpiece of the home page.

Integration constraint:
- `Hero.tsx` currently animates `#gap-problem` during handoff.
- If this new section is inserted, the hero handoff target must move from `#gap-problem` to the new section id.

### Option 2 - Overlay sequence inside Hero exit

Why it is second-best:
- Very cinematic.
- Minimal section-count increase.

Tradeoff:
- Risks overcrowding Hero, which already has heavy copy, CTAs, and handoff motion.

### Option 3 - Transition section after GapProblem

Why it is third-best:
- Lowest integration risk.

Tradeoff:
- Narrative impact drops because philosophy appears after the "problem" statement.

## Final Direction

Use **Option 1** with a dedicated `PhilosophySequence` section inserted between Hero and GapProblem.

### Desktop layout (primary)
- Full stage with canvas/image sequence on the left (or center-weighted).
- Vertical text rail on the right with staged line reveals.
- Subtle structural grid overlay tied to key beats.

### Mobile layout
- Full-bleed sequence with text overlay near lower third.
- Larger dark gradient scrim for readability.
- Simpler line fades instead of dense side rail.

## Sequence Spec (192 Frames at 24fps)

Assumption:
- Assets are image frames extracted from one construction video.
- Recommended naming: `public/images/home/construction-sequence/frame-0001.jpg` ... `frame-0192.jpg`

Scroll behavior:
- Pin section.
- Vertical scroll scrubs frame index from `1` to `192`.
- Release pin after the final line lands.

## Text Choreography (Frame Mapping)

| Text | Frame Range | Intent |
|------|-------------|--------|
| Good design does not begin with walls. | 1-24 | Foundation appears |
| It begins with structure. | 25-48 | Structural system rises |
| With alignment. | 49-72 | Spatial order appears |
| With logic. | 73-96 | Connections resolve |
| With systems that hold. | 97-132 | Frame integrity builds |
| And with the right leadership, what was only a framework becomes something real. | 133-176 | Assembly becomes architecture |
| That space between people and design - that's where I live. | 177-192 | Final claim + handoff |

## Interaction Model

### Motion engine
- GSAP + ScrollTrigger only for scroll-linked behavior.
- `useGSAP` with scoped refs and `gsap.matchMedia()` for desktop/mobile behavior.

### Rendering model
- Use `canvas` draw for smooth frame scrubbing.
- Preload initial frame batch for fast first paint; progressively load remaining frames.
- Keep fallback `img` for reduced motion / load failure mode.

### Text animation
- Default: line-level fade and slight `y` lift.
- Optional enhancement: SplitText word stagger for key lines only.

### Performance guardrails
- Use compressed JPG/WebP frames with consistent dimensions.
- Avoid rendering all frames as DOM `img` elements.
- Keep only nearby frames strongly referenced in memory.
- Pause frame redraw if section is out of view.

## Implementation Notes

Planned file additions:
- `src/components/sections/home/PhilosophySequence.tsx`
- `src/components/sections/home/PhilosophySequence.css`
- `src/lib/home/useConstructionSequence.ts` (or local hook inside section)

Planned file edits:
- `src/app/page.tsx` (insert section)
- `src/components/sections/home/Hero.tsx` (handoff target update)
- optional minor updates in `GapProblem` only if spacing/handoff requires it

## Risks

- 192-frame payload can be heavy if compression is not controlled.
- Hero handoff can break if `#gap-problem` dependency is not updated with section insertion.
- Text readability can drop on light frames without dynamic scrim.
- Pin distance can feel long on short viewports if not tuned with breakpoints.

## Recommended Next Step

Implement a first pass with:
1. section insertion and hero handoff fix,
2. canvas sequence scrubbing with placeholder test frames,
3. text choreography hook-up for the seven approved lines.
