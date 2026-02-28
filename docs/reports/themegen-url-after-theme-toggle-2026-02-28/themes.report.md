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
- css_vars_found: `125`
- samples: `209`

- contrast_target_normal: `4.5`
- contrast_target_large: `3.0`
- failures: `32`

Top failures (lowest ratios):
- `1.40:1` (need `4.5`) fg `#ffffff` on bg `#decfc7` span project-card-tag — “Structural”
- `1.40:1` (need `4.5`) fg `#ffffff` on bg `#decfc7` span project-card-tag — “Healthcare”
- `1.40:1` (need `4.5`) fg `#ffffff` on bg `#decfc7` span project-card-tag — “Operations”
- `1.40:1` (need `4.5`) fg `#ffffff` on bg `#decfc7` span project-card-tag — “Residential”
- `1.40:1` (need `4.5`) fg `#ffffff` on bg `#decfc7` span project-card-tag — “EPS Systems”
- `1.40:1` (need `4.5`) fg `#ffffff` on bg `#decfc7` span project-card-tag — “Cost Alignment”
- `1.40:1` (need `4.5`) fg `#ffffff` on bg `#decfc7` span project-card-tag — “Industrial”
- `1.40:1` (need `4.5`) fg `#ffffff` on bg `#decfc7` span project-card-tag — “Operations”
- `1.40:1` (need `4.5`) fg `#ffffff` on bg `#decfc7` span project-card-tag — “Port Logistics”
- `1.95:1` (need `3.0`) fg `#754d37` on bg `#1a2e2e` span text-[#754D37] — “alignment”
- `1.96:1` (need `4.5`) fg `#685a54` on bg `#1a3636` span font-sans — “02.0”
- `1.96:1` (need `4.5`) fg `#685a54` on bg `#1a3636` span font-sans — “THE GAP”

### Dark
- page_bg: `rgb(17, 26, 26)`
- page_text: `rgb(248, 246, 243)`
- css_vars_found: `125`
- samples: `209`

- contrast_target_normal: `4.5`
- contrast_target_large: `3.0`
- failures: `7`

Top failures (lowest ratios):
- `1.95:1` (need `3.0`) fg `#754d37` on bg `#1a2e2e` span text-[#754D37] — “alignment”
- `2.16:1` (need `4.5`) fg `#685a54` on bg `#1a2e2e` a inline-flex — “See How I Work”
- `4.07:1` (need `4.5`) fg `#c58232` on bg `#1a3636` span item-title — “The Reality”
- `4.07:1` (need `4.5`) fg `#c58232` on bg `#1a3636` span item-title — “The Objective”
- `4.07:1` (need `4.5`) fg `#c58232` on bg `#1a3636` span item-title — “The Mission”
- `4.33:1` (need `4.5`) fg `#decfc7` on bg `#48616b` a site-header__cta-btn — “Start a Conversation”
- `4.33:1` (need `4.5`) fg `#decfc7` on bg `#48616b` a inline-flex — “Start a Conversation”

## Outputs
- css: `C:\Users\Leon\DevMode\kossy-langat-website\docs\reports\themegen-url-after-theme-toggle-2026-02-28\themes.generated.css`
- swatches: `C:\Users\Leon\DevMode\kossy-langat-website\docs\reports\themegen-url-after-theme-toggle-2026-02-28\themes.swatches.svg`

## Recommendations
- **light**: worst sampled pair is `1.40:1` (need `4.5`) `#ffffff` on `#decfc7`. Try adjusting to `#5b5b5b` (same hue, contrast-tuned).
- **dark**: worst sampled pair is `1.95:1` (need `3.0`) `#754d37` on `#1a2e2e`. Try `--clr-primary-a0` (`#c58232`) for text on that background.
  - For primary text on base bg `#111a1a`, start with `--clr-primary-a0` (`#c58232`) for ≥4.5:1.

## Notes
- Use `--apply-css <path>` only after reviewing the report (default is non-destructive).
- URL background detection is best-effort; heavy gradients/images/blend-modes can require manual review.
