# Mentorship Horizontal Scroll Stage

Status: Active implementation
Last updated: 2026-03-06
Branch: `codex/mentorship-horizontal-scroll`

## Overview

This feature replaces the current desktop "Practical Advice" stacked-card interaction on the Mentorship page with a pinned horizontal storytelling stage.

The heading remains the stable section intro. The large stage below it becomes a horizontal viewport that advances through five principle panels as the user scrolls vertically.

## Related Docs

- [Design note](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/design-docs/mentorship-horizontal-scroll-stage/README.md)
- [Feature plan](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/mentorship-horizontal-scroll-stage/plan.md)
- [Wireframes](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/mentorship-horizontal-scroll-stage/wireframes.md)
- [Mentorship page component](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/app/mentorship/page.tsx)
- [Mentorship page styles](file:///c:/Users/Leon/DevMode/kossy-langat-website/src/app/mentorship/MentorshipPage.css)

## Scope

In scope:
- desktop-first horizontal mentorship advice stage
- five principle panels
- GSAP pin + horizontal scrub
- panel-level parallax
- custom imagery with a shared art direction
- mobile and reduced-motion fallbacks

Out of scope:
- changing unrelated mentorship sections
- changing broader page architecture
- finalizing mobile-first motion before desktop composition is locked

## Current State

- Concept direction approved
- Panel system agreed at a high level
- Execution plan defined
- Feature continuity folder created
- Desktop stage proportions and panel wireframes drafted
- User-selected panel imagery is available and checked into `public/images/mentorship/`
- The desktop advice section now uses a pinned horizontal GSAP stage with five panels, panel snap, and layered parallax
- Mobile and reduced-motion fallbacks now use a vertical editorial stack
- `npm run lint` and `npm run build` both pass after implementation

## Success Criteria

- The desktop advice area becomes a pinned horizontal stage
- All five principles are represented as distinct panels in one horizontal track
- Image, number, title, and description have motion hierarchy
- The section feels premium, readable, and coherent
- Mobile and reduced-motion fallbacks remain usable
- `npm run lint` and `npm run build` pass when implementation is complete
