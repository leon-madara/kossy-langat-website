# Plan - Work Real Projects Refresh

Status: Implemented
Feature slug: `work-real-projects-refresh`
Branch: `main`
Related docs:
- `public/projects done/PROJECTS_IMAGE_GUIDE.md`
- [docs/ARCHITECTURE.md](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/ARCHITECTURE.md)

## Goal

Make the Work section credible by replacing placeholder case studies with real structural engineering projects, real local imagery, and grounded copy tied to EPS 3D and delivered site work.

## Non-Goals

- Rebuilding the card interaction system or GSAP choreography.
- Renaming or relocating the underlying project images.
- Inventing quantitative claims not supported by the source material.

## Success Criteria

- `/work`, homepage featured cards, and `/work/[slug]` all read from the same real project source.
- Every showcased project uses local client imagery and grounded copy.
- The hostel project remains credible and stage-aware without overstating what the photos prove.

## Phases

### Phase 1
- Audit project folders, markdown guidance, and current shared project model.

### Phase 2
- Replace placeholder project data with real project records and local asset references.

### Phase 3
- Expand the case-study template, update continuity docs, and verify lint/build.

## Immediate Next Step

- Keep future edits to Work content anchored to the same `public/projects done` source set unless new verified project material is added.
