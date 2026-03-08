# Mentorship Horizontal Scroll Stage - Execution Plan

Canonical location note:
- This flat plan has been superseded by the feature folder at [feature overview](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/mentorship-horizontal-scroll-stage/README.md).
- The canonical plan now lives at [plan.md](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/mentorship-horizontal-scroll-stage/plan.md).

Status: Active planning
Last updated: 2026-03-05
Branch: `codex/mentorship-horizontal-scroll`
Related design note: [Mentorship Horizontal Scroll Stage](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/design-docs/mentorship-horizontal-scroll-stage/README.md)

## Goal

Replace the current desktop "Practical Advice" stacked-card interaction on the Mentorship page with a pinned horizontal storytelling stage that:
- keeps the section heading as the stable intro
- turns the large lower stage into a horizontal GSAP-driven viewport
- uses five panels for the five principles
- introduces layered parallax inside each panel
- uses custom generated imagery aligned to each principle

## Non-Goals

This plan does not include:
- changing the broader page structure outside the Mentorship advice section
- implementing the same horizontal behavior on mobile
- generating final production imagery before panel composition is approved

## Success Criteria

The feature is complete when:
- the desktop advice area is a pinned horizontal stage instead of stacked cards
- all five principles are represented as full panels in a single horizontal track
- image, number, title, and description have distinct parallax behavior
- the section feels premium, readable, and intentional at desktop widths
- mobile and reduced-motion fallbacks remain fully usable
- `npm run lint` and `npm run build` pass

## Work Phases

### Phase 1 - Lock the Stage Specification

Objective:
- finalize the spatial and editorial rules before implementation

Tasks:
- confirm the exact desktop stage height and viewport proportions for the orange-box area
- confirm that the heading remains the stable top intro while the lower stage runs
- confirm the five-panel sequence `A -> B -> C -> B -> A`
- define content limits for each panel title and paragraph
- confirm the mobile fallback direction
- confirm the reduced-motion fallback direction

Deliverables:
- approved stage proportions
- approved panel sequence
- approved content constraints

Exit criteria:
- no unresolved layout-level questions that would block markup and CSS work

### Phase 2 - Panel Wireframes

Objective:
- convert the high-level concept into production-targeted panel blueprints

Tasks:
- produce one detailed wireframe for each principle panel
- lock image placement for each panel
- lock number placement for each panel
- lock title, line, body copy, and progress cue positions
- ensure the layouts vary without becoming visually unrelated

Deliverables:
- five panel wireframes
- a shared alignment and spacing system for all panels

Exit criteria:
- each panel can be built without guessing at composition

### Phase 3 - Image Direction and Prompt Pack

Objective:
- define and generate imagery that supports the section instead of diluting it

Tasks:
- define a shared image art direction for all five panels
- write one prompt template that preserves style consistency
- write five principle-specific prompts
- use the image generation workflow to create first-pass candidate imagery
- review the image set for consistency, realism, and narrative fit
- decide whether a second generation pass is required

Deliverables:
- approved image direction rules
- prompt pack for all five panels
- first-pass image set

Exit criteria:
- each panel has at least one viable image option that fits the editorial system

### Phase 4 - Static Layout Build

Objective:
- replace the current advice-card structure with the new stage structure before motion is added

Tasks:
- replace the stacked-card markup with horizontal stage markup
- create the viewport, track, and panel container structure
- build all five panel layouts in static form
- wire in selected image assets
- keep the heading stable above the stage
- implement static desktop layout only at this stage

Deliverables:
- complete static desktop panel system
- no GSAP horizontal motion yet

Exit criteria:
- all five panels render correctly in place and read well without animation

### Phase 5 - Base GSAP Horizontal Scroll

Objective:
- establish the pinned horizontal narrative behavior

Tasks:
- add the pinned advice-stage ScrollTrigger
- translate the horizontal track left as scroll progresses
- tune scroll distance and scrub behavior
- ensure clean trigger setup and teardown
- verify resize behavior with `ScrollTrigger.refresh()`

Deliverables:
- functioning pinned horizontal scrubbed track

Exit criteria:
- the user can scroll through all five panels vertically while perceiving horizontal travel

### Phase 6 - Panel-Level Parallax

Objective:
- layer the premium motion behavior on top of the base track

Tasks:
- animate image movement slower than the track
- animate number movement minimally
- animate title movement slightly
- animate description block movement faster than the image
- tune per-panel reveal timing so the motion feels intentional rather than noisy

Deliverables:
- panel-level parallax choreography

Exit criteria:
- the sequence has clear depth and motion hierarchy without readability loss

### Phase 7 - Mobile and Reduced-Motion Fallbacks

Objective:
- keep the section robust outside the primary desktop experience

Tasks:
- implement the chosen mobile fallback
- implement reduced-motion behavior without scrubbed parallax
- preserve reading order and content access in all fallbacks

Deliverables:
- usable mobile version
- usable reduced-motion version

Exit criteria:
- the section remains fully readable and functional in non-desktop or reduced-motion contexts

### Phase 8 - Hardening and Verification

Objective:
- prepare the feature for merge-quality review

Tasks:
- run visual checks across desktop and tablet widths
- check image sizing, loading behavior, and layout stability
- verify no nested-pin conflicts with the rest of the page
- run `npm run lint`
- run `npm run build`
- perform one final copy and spacing polish pass
- update docs and changelog for the implemented feature

Deliverables:
- verified feature build
- updated implementation documentation

Exit criteria:
- feature is visually stable, technically clean, and fully documented

## Immediate Next Moves

These are the next actions to take before any implementation starts:

1. Confirm the stage proportions for the orange-box area.
2. Finalize the five panel wireframes.
3. Write the shared image direction rules and the five image prompts.

## Suggested Asset Strategy

For image generation, use one strict prompt system across all panels:
- same lighting logic
- same realism level
- same lens and crop philosophy
- same premium editorial tone
- same women-in-engineering credibility standard

Do not generate images panel-by-panel with unrelated prompt styles.

## Risks to Watch

- imagery may become too glossy or generic if prompts are too broad
- panel copy may feel crowded if content limits are not enforced early
- horizontal scroll may feel heavy if pin duration is too long
- too much parallax on text can reduce readability
- different panel layouts can drift into inconsistency if the shared visual system is weak

## Notes for Future Sessions

When resuming this work:
- start with the design note first
- then use this execution plan to choose the active phase
- do not begin GSAP implementation until Phases 1 through 3 are locked
