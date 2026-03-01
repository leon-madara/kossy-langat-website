# Layout Patch Plan (Near-token, Report-only)

This file lists safe normalization candidates within the configured tolerance.
Apply changes only after approving `layout.tokens.suggested.css`.

## Spacing

- Tolerance: +/- 2px
- Candidates: 12

| From (px) | To (px) | Delta | Token |
|---:|---:|---:|---|
| -1 | 0 | 1 | --space-0 |
| 1 | 0 | -1 | --space-0 |
| 2 | 0 | -2 | --space-0 |
| 3 | 4 | 1 | --space-1 |
| 6 | 4 | -2 | --space-1 |
| 9 | 8 | -1 | --space-2 |
| 10 | 8 | -2 | --space-2 |
| 11 | 12 | 1 | --space-3 |
| 14 | 12 | -2 | --space-3 |
| 15 | 16 | 1 | --space-4 |
| 18 | 16 | -2 | --space-4 |
| 26 | 24 | -2 | --space-5 |

## Radii

- Tolerance: +/- 2px
- Candidates: 3

| From (px) | To (px) | Delta | Token |
|---:|---:|---:|---|
| 2 | 0 | -2 | --radius-0 |
| 3 | 4 | 1 | --radius-1 |
| 6 | 4 | -2 | --radius-1 |

## Type Sizes

- Tolerance: +/- 2px
- Candidates: 8

| From (px) | To (px) | Delta | Token |
|---:|---:|---:|---|
| 10 | 12 | 2 | --text-xs |
| 11 | 12 | 1 | --text-xs |
| 13 | 12 | -1 | --text-xs |
| 15 | 14 | -1 | --text-sm |
| 17 | 16 | -1 | --text-md |
| 19 | 18 | -1 | --text-lg |
| 21 | 20 | -1 | --text-xl |
| 22 | 20 | -2 | --text-xl |

