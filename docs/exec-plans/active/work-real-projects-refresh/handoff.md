# Handoff - Work Real Projects Refresh

## Current State

- The Work experience now renders real projects from local source imagery and a richer shared content model.
- The case-study template supports summary, stage, system, overview, and gallery content without disturbing the overall site language.

## Next Recommended Step

- Perform a browser-level visual pass on `/work`, the homepage featured row, and each `/work/[slug]` page to confirm image cropping and copy rhythm on mobile and desktop.

## Files Touched

- `src/data/projects.ts`
- `src/components/ui/ProjectCard.tsx`
- `src/app/work/page.tsx`
- `src/app/work/WorkPage.css`
- `src/app/work/[slug]/page.tsx`
- `src/app/work/[slug]/CaseStudy.css`
- `CHANGELOG.md`

## Risks and Open Questions

- The current image filenames contain spaces and WhatsApp-style names; they work, but future asset cleanup may improve maintainability.
- Homepage featured order currently follows project array order, so any future curation change should be made explicitly rather than by accidental reordering.
