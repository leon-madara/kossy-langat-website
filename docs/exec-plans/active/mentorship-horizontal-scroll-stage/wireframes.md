# Wireframes - Mentorship Horizontal Scroll Stage

Status: Working specification
Last updated: 2026-03-05
Related overview: [README.md](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/exec-plans/active/mentorship-horizontal-scroll-stage/README.md)

## Desktop Stage Specification

This section locks the initial desktop geometry for the horizontal advice stage.

### Measured Baseline

Reference measurements taken from the current Mentorship advice area:

- `1920x1080`
  - heading height: about `201px`
  - heading-to-stage gap: `64px`
  - current centered zone width: `1068px`
  - current card height: about `430px`
- `1440x900`
  - heading height: about `201px`
  - heading-to-stage gap: `64px`
  - current centered zone width: `810px`
  - current card height: about `358px`
- `1280x800`
  - heading height: about `201px`
  - heading-to-stage gap: `64px`
  - current centered zone width: `720px`
  - current card height: about `318px`

These measurements confirm that the current advice card is too narrow and too short for the intended horizontal storytelling system.

### Locked Stage Rules

Desktop stage direction:
- The heading remains the stable intro above the stage.
- The horizontal stage occupies the full orange-box region below the heading.
- The stage should no longer read as a centered card floating inside empty space.

Outer stage:
- width: full viewport width
- horizontal padding: `clamp(24px, 4vw, 56px)`
- top gap under heading: `64px`
- height: `clamp(460px, 54vh, 600px)`

Inner content safe area:
- width: `min(1380px, calc(100vw - 96px))`
- centered within each panel
- all text and key imagery align to this safe area

Panel sizing:
- each panel width: `100vw`
- each panel height: stage height
- horizontal track width: `panelCount * 100vw`

Content rules:
- split panels use roughly `56 / 44` or `44 / 56` image-to-content balance
- title max: 2 lines on desktop, hard cap `34` characters
- body copy target: `150` to `210` characters, hard cap `220` characters
- body copy max visual height: about 4 comfortable desktop lines in split panels

Progress cue:
- global numeric progress, not panel-local duplication
- position: bottom center of the stage
- format: `01 / 05`

### Fallback Direction

Mobile fallback:
- use a vertical editorial stack
- no pinned horizontal track on narrow screens

Reduced-motion fallback:
- use the same content structure without pinned scrubbed motion
- keep all content readable in document flow

## Panel Grid Logic

All panels should share:
- one typography system
- one number scale logic
- one image treatment logic
- one spacing logic
- one overlay language

The layouts vary, but the system must stay coherent.

## Panel 01 - Master Fundamentals

Archetype: `A`

```text
|--------------------------------------------------------------|
| IMAGE LEFT (56%)           | 01                              |
| technical desk / study     | Title                           |
| environment                | gold line                       |
|                            | body copy                       |
|                            |                                 |
|                      progress centered at stage bottom       |
|--------------------------------------------------------------|
```

Composition rules:
- image occupies the left majority of the panel
- number sits in the upper-right content column and overlaps the image seam slightly
- title block sits below the number with a tight relationship
- body copy sits directly under the title block

Image intent:
- core technical study
- codes, drawings, technical references

## Panel 02 - Speak with Clarity

Archetype: `B`

```text
|--------------------------------------------------------------|
| 02                              | IMAGE RIGHT (56%)          |
| Title                           | site briefing / review     |
| gold line                       | setting                    |
| body copy                       |                            |
|                                  progress centered below     |
|--------------------------------------------------------------|
```

Composition rules:
- content leads on the left
- image carries the right side
- number anchors the upper-left
- text should feel like it is stepping forward into the panel while the image holds the right edge

Image intent:
- presenting, briefing, explaining, clarifying

## Panel 03 - Understand Financial Language

Archetype: `C`

```text
|--------------------------------------------------------------|
| FULL-WIDTH IMAGE ACROSS PANEL                                |
|                                                              |
|                                      small top-right label   |
|                                                              |
| Title bottom-left                                            |
| gold line                                                    |
| floating copy slab across lower third                  03    |
|                 progress centered below                      |
|--------------------------------------------------------------|
```

Composition rules:
- cinematic center panel
- image fills nearly the full stage
- title anchors one lower corner
- description sits in a floating slab that can move faster than the image
- number can crop near the far edge

Image intent:
- commercial judgment
- engineering and finance in one frame

## Panel 04 - Build Physical Resilience

Archetype: `B`, vertical-energy variant

```text
|--------------------------------------------------------------|
| 04                              | TALL IMAGE RIGHT           |
| Title                           | training / endurance       |
| gold line                       |                            |
| body copy                       |                            |
|                                  progress centered below     |
|--------------------------------------------------------------|
```

Composition rules:
- same left-right logic as Panel 02
- image crop should feel taller and more energetic
- text remains stable and readable

Image intent:
- disciplined physical training
- resilience, control, endurance

## Panel 05 - Develop a Disciplined Routine

Archetype: `A`, resolved closing variant

```text
|--------------------------------------------------------------|
| IMAGE LEFT (50%)           | 05                              |
| dawn routine / workflow    | Title                           |
| planning scene             | gold line                       |
|                            | body copy                       |
|                            |                                 |
|                      progress centered at stage bottom       |
|--------------------------------------------------------------|
```

Composition rules:
- quieter close than Panel 01
- image and text feel more balanced
- motion should be calmer than the earlier panels

Image intent:
- early routine
- order, systems, preparation

## Motion Hierarchy Notes

These wireframes assume:
- image moves slowest
- number moves least
- title moves slightly
- description moves faster than the image

Do not over-animate the title or body copy.

## Implementation Implications

The current centered `advice-content-zone` card system will need to be replaced with:
- full-width stage wrapper
- full-width pinned viewport
- horizontal track
- panel-level safe-area layout

This is a replacement, not an overlay on top of the current card system.
