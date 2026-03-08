# Mentorship Horizontal Scroll Stage

Status: Draft concept note
Last updated: 2026-03-05
Current branch: `codex/mentorship-horizontal-scroll`

## Purpose

This document captures the agreed direction for replacing the current desktop "Practical Advice" stacked-card interaction on the Mentorship page with a pinned horizontal storytelling stage.

The goal is to preserve context for future implementation sessions, including sessions handled by other agents.

Relevant files:
- [Mentorship page component](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/app/mentorship/page.tsx)
- [Mentorship page styles](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/app/mentorship/MentorshipPage.css)
- [Animation strategy](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/animation_strategy.md)
- [Golden principles](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/GOLDEN_PRINCIPLES.md)
- [Feature overview](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/mentorship-horizontal-scroll-stage/README.md)
- [Execution plan](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/mentorship-horizontal-scroll-stage/plan.md)

## Decision Summary

We do not want a card with a horizontal scroller inside it.

We do want the entire advice stage area under the heading to become the horizontal experience.

Recommended structure:
- Keep the top heading area as the section intro.
- Convert the large stage area below it into a pinned horizontal viewport.
- Translate a wide horizontal track through that viewport as the user scrolls vertically.
- Build five principle panels inside the track.
- Use GSAP ScrollTrigger for both the pin and the scrubbed motion.
- Use layered parallax inside each panel so image, number, title, and description do not move at the same rate.

## Why This Direction

This is preferred over a nested horizontal card because:
- it gives the image and copy enough space to feel editorial instead of cramped
- it keeps the motion localized to one intentional section
- it preserves the page structure above and below the section
- it reads as a premium narrative stage rather than a widget

## Section Anatomy

The recommended desktop anatomy is:

```text
------------------------------------------------------------
PRACTICAL ADVICE
Five principles I wish someone had given me on day one.
------------------------------------------------------------

< pinned horizontal stage / masked viewport >

| Panel 01 | Panel 02 | Panel 03 | Panel 04 | Panel 05 |

------------------------------------------------------------
Continue to next mentorship section
------------------------------------------------------------
```

Within the pinned stage:
- the viewport stays visually fixed
- the horizontal track moves left as vertical scroll progresses
- each panel occupies the full stage width
- the heading above remains stable and readable during the stage sequence

## Motion Model

Base motion:
- Pin the mentorship advice wrapper when it reaches the active viewport window.
- Scrub a horizontal `x` translation across the full panel track.
- Release the pin after the final panel completes.

Parallax inside each panel:
- background image moves slowest
- oversized number moves least and behaves like an anchor
- title moves slightly
- description block moves faster than the image

Interaction intent:
- user scroll remains vertical
- perceived movement is horizontal
- panel content reveals in layers instead of all sliding at one identical speed

## Panel System

There are five advice items. The recommended visual rhythm is not five unrelated layouts.
Use three panel archetypes in this sequence:

`A -> B -> C -> B -> A`

This creates variation without making the section visually incoherent.

### Panel 01 - Master Fundamentals

Opening panel. Clean and authoritative.

```text
| IMAGE LEFT (approx. 58%)      | 01
| technical desk / blueprint    | Title
| scene                         | gold line
|                               | body copy
```

Notes:
- strongest opening layout
- easy to read immediately
- number should feel structural, not decorative

Suggested image direction:
- young woman at desk
- drawings, codes, notes, material references
- technical competence over lifestyle mood

### Panel 02 - Speak with Clarity

Reverse split to change rhythm.

```text
| 02                            | IMAGE RIGHT (approx. 58%)
| Title                         | site briefing / presentation
| gold line                     |
| body copy                     |
```

Notes:
- copy leads, image answers
- good place for stronger text-over-image drift

Suggested image direction:
- presenting to team
- briefing on site
- tablet, drawings, or speaking posture

### Panel 03 - Understand Financial Language

Cinematic center panel. Most visually distinct.

```text
| FULL-WIDTH IMAGE ACROSS PANEL                           |
|                                                         |
|                         small top-right descriptor      |
| Title bottom-left                                       |
| gold line                                               |
| floating copy slab across lower third              03   |
```

Notes:
- this should be the peak panel in the sequence
- description can move across the image faster than the image itself
- number can sit near the far right edge and partially crop

Suggested image direction:
- boardroom + costing documents
- commercial review setting
- financial and engineering language in one frame

### Panel 04 - Build Physical Resilience

Return to split, but with a more vertical image emphasis.

```text
| 04 / Title / line / body        | TALL IMAGE RIGHT
|                                 | training / endurance
|                                 | strength composition
```

Notes:
- still part of the same system
- stronger physical energy than Panels 01 and 02

Suggested image direction:
- training discipline
- gym endurance
- strong posture, not generic fitness advertising

### Panel 05 - Develop a Disciplined Routine

Closing panel. Controlled and resolved.

```text
| IMAGE LEFT (approx. 50%)        | 05
| dawn routine / planning         | Title
| systems / workflow              | gold line
|                                 | body copy
|                                 | subtle closing cue
```

Notes:
- end with calm structure instead of spectacle
- parallax should be quieter than earlier panels

Suggested image direction:
- early-morning routine
- notebook, planning, focused workflow
- disciplined system rather than chaotic hustle imagery

## Shared Visual Rules

These should hold across all five panels:
- one typography system
- one image treatment system
- one spacing system
- one color logic
- one overlay logic

Do not let each panel become a separate design language.

The sequence should feel authored as one section, not assembled from unrelated concepts.

## Image Direction Rules

If generated images are used, they need one tight art direction.

Requirements:
- editorial realism, not glossy stock-photo energy
- consistent lighting philosophy
- consistent grading and contrast
- premium architectural / technical atmosphere
- women-in-engineering framing that feels serious and credible

## Technical Implementation Notes

Recommended GSAP architecture:
- one ScrollTrigger to pin the mentorship advice stage
- one scrubbed horizontal timeline or tween for the track translation
- per-panel parallax tweens linked to the same scroll progress
- `gsap.matchMedia()` for desktop/tablet vs. mobile behavior
- reduced-motion fallback that disables the full horizontal sequence

Recommended DOM structure:

```text
mentor-advice
  advice-heading-bar
  advice-horizontal-stage
    advice-horizontal-viewport
      advice-horizontal-track
        advice-panel panel-01
        advice-panel panel-02
        advice-panel panel-03
        advice-panel panel-04
        advice-panel panel-05
```

## Mobile and Accessibility

Desktop and large tablet:
- full pinned horizontal stage

Mobile:
- likely revert to a vertical stack or simplified static panel flow
- avoid forcing a wide horizontal narrative into narrow screens

Reduced motion:
- provide a non-scrubbed fallback
- preserve all content and reading order without motion dependency

## Risks and Constraints

Primary risks:
- too much text per panel can make layouts feel crowded
- inconsistent generated imagery will weaken the entire section
- overly long pin duration can make the stage feel heavy
- too much title motion will hurt readability
- nested pins or conflicting ScrollTriggers can create jank

## Open Questions

These are still unresolved:
- exact stage height on desktop
- exact panel width behavior across large monitors
- whether each panel should have a small label or descriptor beyond title and body
- whether progress should be numeric only or include a visual rail
- whether images should be edge-to-edge or boxed with margins

## Recommended Next Steps

1. Design one production-ready panel layout first, starting with Panel 01.
2. Confirm the exact stage proportions for the orange-box area.
3. Define one consistent image prompt strategy for all five principles.
4. Replace the current stacked-card markup with horizontal-stage markup.
5. Implement the base GSAP pin + horizontal scrub.
6. Layer in panel parallax.
7. Add mobile and reduced-motion fallbacks.

## Implementation Status

Current state:
- concept approved for further exploration
- no horizontal-scroll implementation has been started yet
- current mentorship advice stack remains the active production behavior
