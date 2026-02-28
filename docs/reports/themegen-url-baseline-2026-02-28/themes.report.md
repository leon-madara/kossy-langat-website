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
- samples: `208`

- contrast_target_normal: `4.5`
- contrast_target_large: `3.0`
- failures: `54`

Top failures (lowest ratios):
- `1.00:1` (need `4.5`) fg `#000000` on bg `#010101` span site-header__brand-subtitle — “Structural Engineer”
- `1.00:1` (need `4.5`) fg `#000000` on bg `#010101` a site-header__link — “About”
- `1.00:1` (need `4.5`) fg `#000000` on bg `#010101` a site-header__link — “Expertise”
- `1.00:1` (need `4.5`) fg `#000000` on bg `#010101` a site-header__link — “Work”
- `1.00:1` (need `4.5`) fg `#000000` on bg `#010101` a site-header__link — “Insights”
- `1.00:1` (need `4.5`) fg `#000000` on bg `#010101` a site-header__link — “Mentorship”
- `1.00:1` (need `4.5`) fg `#000000` on bg `#010101` a site-header__link — “Contact”
- `1.00:1` (need `4.5`) fg `#000000` on bg `#010101` a site-header__link — “Home”
- `1.05:1` (need `4.5`) fg `#1e2929` on bg `#1a2e2e` section #hero relative — “01.0 / THE ORCHESTRATORI don’t just build structures. I build alignment between the people…”
- `1.05:1` (need `4.5`) fg `#1e2929` on bg `#1a2e2e` div relative — “01.0 / THE ORCHESTRATORI don’t just build structures. I build alignment between the people…”
- `1.05:1` (need `4.5`) fg `#1e2929` on bg `#1a2e2e` div w-full — “01.0 / THE ORCHESTRATORI don’t just build structures. I build alignment between the people…”
- `1.16:1` (need `4.5`) fg `#1e2929` on bg `#1a3636` section #gap-problem relative — “02.0/THE GAPMost projects fail in the spaces between people.01Technical vs. ExecutiveBridg…”

### Dark
- page_bg: `rgb(17, 26, 26)`
- page_text: `rgb(248, 246, 243)`
- css_vars_found: `125`
- samples: `208`

- contrast_target_normal: `4.5`
- contrast_target_large: `3.0`
- failures: `29`

Top failures (lowest ratios):
- `1.00:1` (need `4.5`) fg `#000101` on bg `#000000` span site-header__brand-subtitle — “Structural Engineer”
- `1.00:1` (need `4.5`) fg `#000101` on bg `#000000` a site-header__link — “About”
- `1.00:1` (need `4.5`) fg `#000101` on bg `#000000` a site-header__link — “Expertise”
- `1.00:1` (need `4.5`) fg `#000101` on bg `#000000` a site-header__link — “Work”
- `1.00:1` (need `4.5`) fg `#000101` on bg `#000000` a site-header__link — “Insights”
- `1.00:1` (need `4.5`) fg `#000101` on bg `#000000` a site-header__link — “Mentorship”
- `1.00:1` (need `4.5`) fg `#000101` on bg `#000000` a site-header__link — “Contact”
- `1.00:1` (need `4.5`) fg `#010100` on bg `#000000` a site-header__link — “Home”
- `1.05:1` (need `4.5`) fg `#f8f6f3` on bg `#f4f1ea` section #featured-projects py-24 — “03.0/FEATURED WORKExecution over abstraction.View all case studies→StructuralHealthcareOpe…”
- `1.05:1` (need `4.5`) fg `#f8f6f3` on bg `#f4f1ea` div max-w-7xl — “03.0/FEATURED WORKExecution over abstraction.View all case studies→StructuralHealthcareOpe…”
- `1.05:1` (need `4.5`) fg `#f8f6f3` on bg `#f4f1ea` div flex — “03.0/FEATURED WORKExecution over abstraction.View all case studies→”
- `1.05:1` (need `4.5`) fg `#f8f6f3` on bg `#f4f1ea` div max-w-2xl — “03.0/FEATURED WORKExecution over abstraction.”

## Outputs
- css: `C:\Users\Leon\DevMode\kossy-langat-website\docs\reports\themegen-url-baseline-2026-02-28\themes.generated.css`
- swatches: `C:\Users\Leon\DevMode\kossy-langat-website\docs\reports\themegen-url-baseline-2026-02-28\themes.swatches.svg`

## Recommendations
- **light**: worst sampled pair is `1.00:1` (need `4.5`) `#000000` on `#010101`. Try `--clr-primary-a0` (`#c58232`) for text on that background.
- **dark**: worst sampled pair is `1.00:1` (need `4.5`) `#000101` on `#000000`. Try `--clr-primary-a0` (`#c58232`) for text on that background.
  - For primary text on base bg `#111a1a`, start with `--clr-primary-a0` (`#c58232`) for ≥4.5:1.

## Notes
- Use `--apply-css <path>` only after reviewing the report (default is non-destructive).
- URL background detection is best-effort; heavy gradients/images/blend-modes can require manual review.
