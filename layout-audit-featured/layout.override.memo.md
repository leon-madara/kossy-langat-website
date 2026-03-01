# Layout Override Proposal (Proposal-only)

Escalation triggered due to multiple systemic layout health red flags:
- fragmentation.spacing: Unique spacing values: 35 (threshold 35).
- fragmentation.radii: Unique radii values: 8 (threshold 8).

This memo proposes higher-level direction changes. Do not apply automatically.

## Options

### Option A: Polish-in-place (keep current look)
- Enforce inferred spacing/radius/type tokens and fix tap targets first.
- Pros: fastest, minimal visual risk. Cons: may keep some legacy inconsistencies.

### Option B: Soft refresh (system-level refinement)
- Keep brand direction but reset layout primitives: spacing scale, radii system, button sizing, typographic rhythm.
- Pros: big quality jump with controlled scope. Cons: needs design review and QA across pages.

### Option C: Rebrand-level reset (new design system)
- Reconsider typography + layout density holistically; optionally revise color and font choices.
- Pros: maximum coherence. Cons: highest time cost and requires explicit approval.

## Notes

- If you accept font/color changes, pair this with a theme/palette workflow to keep contrast and brand consistency.
- Next step: approve or reject an option, then run the audit again to measure improvement.

