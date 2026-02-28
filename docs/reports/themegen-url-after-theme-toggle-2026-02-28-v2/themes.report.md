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
- failures: `20`

Top failures (lowest ratios):
- `1.96:1` (need `4.5`) fg `#685a54` on bg `#1a3636` span font-sans — “05.0”
- `1.96:1` (need `4.5`) fg `#685a54` on bg `#1a3636` span font-sans — “REPRESENTATION”
- `2.28:1` (need `4.5`) fg `#1e2929` on bg `#48616b` div project-card-image-wrapper — “StructuralHealthcareOperations”
- `2.28:1` (need `4.5`) fg `#1e2929` on bg `#48616b` div project-card-tags — “StructuralHealthcareOperations”
- `2.28:1` (need `4.5`) fg `#1e2929` on bg `#48616b` div project-card-image-wrapper — “ResidentialEPS SystemsCost Alignment”
- `2.28:1` (need `4.5`) fg `#1e2929` on bg `#48616b` div project-card-tags — “ResidentialEPS SystemsCost Alignment”
- `2.28:1` (need `4.5`) fg `#1e2929` on bg `#48616b` div project-card-image-wrapper — “IndustrialOperationsPort Logistics”
- `2.28:1` (need `4.5`) fg `#1e2929` on bg `#48616b` div project-card-tags — “IndustrialOperationsPort Logistics”
- `4.33:1` (need `4.5`) fg `#48616b` on bg `#decfc7` h3 project-card-title — “Applewood Hospital”
- `4.33:1` (need `4.5`) fg `#48616b` on bg `#decfc7` h3 project-card-title — “Kiambu Residential Complex”
- `4.33:1` (need `4.5`) fg `#48616b` on bg `#decfc7` h3 project-card-title — “ABC Logistics Hub”
- `4.36:1` (need `4.5`) fg `#685a54` on bg `#decfc7` p project-card-location — “Nairobi, Kenya”

### Dark
- page_bg: `rgb(17, 26, 26)`
- page_text: `rgb(248, 246, 243)`
- css_vars_found: `133`
- samples: `209`

- contrast_target_normal: `4.5`
- contrast_target_large: `3.0`
- failures: `0`

## Outputs
- css: `C:\Users\Leon\DevMode\kossy-langat-website\docs\reports\themegen-url-after-theme-toggle-2026-02-28-v2\themes.generated.css`
- swatches: `C:\Users\Leon\DevMode\kossy-langat-website\docs\reports\themegen-url-after-theme-toggle-2026-02-28-v2\themes.swatches.svg`

## Recommendations
- **light**: worst sampled pair is `1.96:1` (need `4.5`) `#685a54` on `#1a3636`. Try `--clr-primary-a10` (`#d29450`) for text on that background.
- **dark**: no contrast failures found in sampled elements.

## Notes
- Use `--apply-css <path>` only after reviewing the report (default is non-destructive).
- URL background detection is best-effort; heavy gradients/images/blend-modes can require manual review.
