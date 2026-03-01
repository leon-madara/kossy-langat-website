# Layout Polisher Audit

## Summary

- Static scan: 20 CSS files

## Health Checks

- Unique spacing values: 35
- Unique radii values: 8
- Unique font sizes: 30
- Tap target check: not measured (no runtime interactive samples)

### Red Flags
- fragmentation.spacing: Unique spacing values: 35 (threshold 35).
- fragmentation.radii: Unique radii values: 8 (threshold 8).

## Suggested Tokens (Approval Required)

- Spacing base: 4px
- Radius style: soft
- Output file: `layout.tokens.suggested.css`

Note: This run does not apply changes. Review the suggested tokens and approve before refactoring.

## Near-token Fix Plan (Report-only)

- Spacing near-token replacements: 12
- Radii near-token replacements: 3
- Type size near-token replacements: 8
- Output file: `layout.patch.plan.md`

## Override Proposal

- Escalation triggered (multiple systemic red flags). See: `layout.override.memo.md`

Note: Override mode is proposal-only. If it suggests font/color direction changes, consider pairing with a theme audit workflow.
