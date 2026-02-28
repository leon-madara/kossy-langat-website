# Theme Generator Report

## Inputs
- url: `http://127.0.0.1:3000`
- steps: `auto` (resolved: `11` tokens)
- target: `aa-plus`
- semantic_preset: `colorffy`

## Runtime audit (URL)
### Light
- page_bg: `rgb(248, 246, 243)`
- page_text: `rgb(30, 41, 41)`
- css_vars_found: `133`
- samples: `210`

- contrast_target_normal: `4.5`
- contrast_target_large: `3.0`
- failures: `0`

### Dark
- page_bg: `rgb(17, 26, 26)`
- page_text: `rgb(248, 246, 243)`
- css_vars_found: `133`
- samples: `209`

- contrast_target_normal: `4.5`
- contrast_target_large: `3.0`
- failures: `0`

## Outputs
- css: `C:\Users\Leon\DevMode\kossy-langat-website\docs\reports\themegen-url-after-theme-toggle-2026-02-28-v4\themes.generated.css`
- swatches: `C:\Users\Leon\DevMode\kossy-langat-website\docs\reports\themegen-url-after-theme-toggle-2026-02-28-v4\themes.swatches.svg`

## Recommendations
- **light**: no contrast failures found in sampled elements.
- **dark**: no contrast failures found in sampled elements.

## Notes
- Use `--apply-css <path>` only after reviewing the report (default is non-destructive).
- URL background detection is best-effort; heavy gradients/images/blend-modes can require manual review.
