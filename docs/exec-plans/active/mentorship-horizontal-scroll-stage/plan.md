# Plan - Mentorship Horizontal Scroll Stage

Status: Active planning
Feature slug: `mentorship-horizontal-scroll-stage`
Branch: `codex/mentorship-horizontal-scroll`

## Goal

Replace the current desktop "Practical Advice" stacked-card interaction on the Mentorship page with a pinned horizontal storytelling stage that:
- keeps the heading as the stable intro
- turns the large lower stage into a horizontal GSAP viewport
- uses five principle panels
- layers parallax inside each panel
- uses custom generated imagery aligned to the five principles

## Non-Goals

- changing broader page structure outside the advice section
- forcing the full desktop horizontal experience onto mobile
- generating final production imagery before the panel compositions are locked

## Success Criteria

- Desktop advice stage is horizontal and pinned
- Five panels move through one scrubbed track
- Parallax hierarchy is clear and readable
- The section remains premium and coherent
- Mobile and reduced-motion fallbacks are usable
- Lint and build pass at completion

## Phases

### Phase 1 - Lock the Stage Specification

- confirm desktop stage height and proportions
- confirm heading behavior above the stage
- confirm panel sequence `A -> B -> C -> B -> A`
- set content limits for title and body copy
- decide mobile fallback direction
- decide reduced-motion fallback direction

### Phase 2 - Produce Panel Wireframes

- define one detailed wireframe for each of the five principles
- lock image placement, number placement, title placement, body placement, and progress cue placement
- ensure the layouts vary without becoming unrelated

### Phase 3 - Build the Image Direction Pack

- define one shared editorial art direction
- write one common prompt template
- write five principle-specific prompts
- generate first-pass image candidates
- review and refine the image set

### Phase 4 - Replace the Static Markup

- replace stacked-card markup with horizontal-stage markup
- build the viewport, track, and panel structure
- wire in chosen images
- keep the heading stable above the stage

### Phase 5 - Implement Base GSAP Horizontal Scroll

- pin the advice stage
- scrub the track horizontally
- tune distance, scrub feel, and resize handling

### Phase 6 - Add Panel-Level Parallax

- image moves slowest
- number moves least
- title moves slightly
- description block moves faster than the image

### Phase 7 - Add Fallbacks

- implement the chosen mobile fallback
- implement reduced-motion behavior

### Phase 8 - Harden and Verify

- visual review across target sizes
- check loading, layout stability, and pin behavior
- run `npm run lint`
- run `npm run build`
- update docs and changelog

## Immediate Next Step

- Lock the stage proportions and turn the five panel concepts into explicit wireframes before any markup or GSAP implementation begins.
