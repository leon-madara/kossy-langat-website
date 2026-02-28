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
- failures: `40`

Top failures (lowest ratios):
- `1.05:1` (need `4.5`) fg `#1e2929` on bg `#1a2e2e` section #hero relative — “01.0 / THE ORCHESTRATORI don’t just build structures. I build alignment between the people…”
- `1.05:1` (need `4.5`) fg `#1e2929` on bg `#1a2e2e` div relative — “01.0 / THE ORCHESTRATORI don’t just build structures. I build alignment between the people…”
- `1.05:1` (need `4.5`) fg `#1e2929` on bg `#1a2e2e` div w-full — “01.0 / THE ORCHESTRATORI don’t just build structures. I build alignment between the people…”
- `1.16:1` (need `4.5`) fg `#1e2929` on bg `#1a3636` section #gap-problem relative — “02.0/THE GAPMost projects fail in the spaces between people.01Technical vs. ExecutiveBridg…”
- `1.16:1` (need `4.5`) fg `#1e2929` on bg `#1a3636` div relative — “02.0/THE GAPMost projects fail in the spaces between people.01Technical vs. ExecutiveBridg…”
- `1.16:1` (need `4.5`) fg `#1e2929` on bg `#1a3636` div flex — “02.0/THE GAP”
- `1.16:1` (need `4.5`) fg `#1e2929` on bg `#1a3636` div grid — “Most projects fail in the spaces between people.01Technical vs. ExecutiveBridging the gap …”
- `1.16:1` (need `4.5`) fg `#1e2929` on bg `#1a3636` div grid — “01Technical vs. ExecutiveBridging the gap between engineering precision and management dec…”
- `1.16:1` (need `4.5`) fg `#1e2929` on bg `#1a3636` div group — “01Technical vs. ExecutiveBridging the gap between engineering precision and management dec…”
- `1.16:1` (need `4.5`) fg `#1e2929` on bg `#1a3636` div group — “02Integrity vs. Instant GainProtecting long-term structural truth against short-term budge…”
- `1.16:1` (need `4.5`) fg `#1e2929` on bg `#1a3636` div group — “03Human Welfare vs. Pure MetricsAligning workforce morale with peak project performance.”
- `1.16:1` (need `4.5`) fg `#1e2929` on bg `#1a3636` div group — “04Vision vs. FeasibilityAnchoring client expectations in structural reality.”

### Dark
- page_bg: `rgb(17, 26, 26)`
- page_text: `rgb(248, 246, 243)`
- css_vars_found: `125`
- samples: `208`

- contrast_target_normal: `4.5`
- contrast_target_large: `3.0`
- failures: `21`

Top failures (lowest ratios):
- `1.05:1` (need `4.5`) fg `#f8f6f3` on bg `#f4f1ea` section #featured-projects py-24 — “03.0/FEATURED WORKExecution over abstraction.View all case studies→StructuralHealthcareOpe…”
- `1.05:1` (need `4.5`) fg `#f8f6f3` on bg `#f4f1ea` div max-w-7xl — “03.0/FEATURED WORKExecution over abstraction.View all case studies→StructuralHealthcareOpe…”
- `1.05:1` (need `4.5`) fg `#f8f6f3` on bg `#f4f1ea` div flex — “03.0/FEATURED WORKExecution over abstraction.View all case studies→”
- `1.05:1` (need `4.5`) fg `#f8f6f3` on bg `#f4f1ea` div max-w-2xl — “03.0/FEATURED WORKExecution over abstraction.”
- `1.05:1` (need `4.5`) fg `#f8f6f3` on bg `#f4f1ea` div flex — “03.0/FEATURED WORK”
- `1.05:1` (need `4.5`) fg `#f8f6f3` on bg `#f4f1ea` div grid — “StructuralHealthcareOperationsNairobi, KenyaApplewood HospitalChallengeA funding misalignm…”
- `1.34:1` (need `3.0`) fg `#decfc7` on bg `#f4f1ea` h2 font-serif — “Execution over abstraction.”
- `1.34:1` (need `3.0`) fg `#decfc7` on bg `#f4f1ea` span italic — “abstraction”
- `1.34:1` (need `4.5`) fg `#decfc7` on bg `#f4f1ea` a group — “View all case studies→”
- `1.34:1` (need `4.5`) fg `#decfc7` on bg `#f4f1ea` span transition-transform — “→”
- `2.05:1` (need `4.5`) fg `#754d37` on bg `#1e2929` a project-card-link — “View Case Study →”
- `2.05:1` (need `4.5`) fg `#754d37` on bg `#1e2929` span — “→”

## Outputs
- css: `C:\Users\Leon\DevMode\kossy-langat-website\docs\reports\themegen-url-baseline-2026-02-28-v2\themes.generated.css`
- swatches: `C:\Users\Leon\DevMode\kossy-langat-website\docs\reports\themegen-url-baseline-2026-02-28-v2\themes.swatches.svg`

## Recommendations
- **light**: worst sampled pair is `1.05:1` (need `4.5`) `#1e2929` on `#1a2e2e`. Try `--clr-primary-a05` (`#cb8b41`) for text on that background.
- **dark**: worst sampled pair is `1.05:1` (need `4.5`) `#f8f6f3` on `#f4f1ea`. Try adjusting to `#706e6c` (same hue, contrast-tuned).
  - For primary text on base bg `#111a1a`, start with `--clr-primary-a0` (`#c58232`) for ≥4.5:1.

## Notes
- Use `--apply-css <path>` only after reviewing the report (default is non-destructive).
- URL background detection is best-effort; heavy gradients/images/blend-modes can require manual review.
