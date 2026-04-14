# Work Real Projects Refresh

Status: Implemented
Feature slug: `work-real-projects-refresh`
Started: 2026-04-14

## Goal

Replace fabricated Work portfolio content with real client projects sourced from `public/projects done`, and keep the shared project story consistent across the homepage featured cards, the `/work` index, and the `/work/[slug]` case-study pages.

## Scope Notes

- Uses four real client projects already present in the repository.
- Keeps the existing visual system and GSAP reveal behavior intact.
- Expands the shared content model only enough to support stage, system, overview, and gallery storytelling.

## Source Material

- `public/projects done/PROJECTS_IMAGE_GUIDE.md`
- Client-provided project folders and images under `public/projects done/`

## Current Status

- Shared project data is rewritten around real work.
- Work and case-study surfaces are updated to render richer, grounded narratives.
- Continuity docs and changelog are in place for future maintenance.
