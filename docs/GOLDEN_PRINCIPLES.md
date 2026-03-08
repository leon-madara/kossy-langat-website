# Golden Principles — Kossy Portfolio

> "Opinionated laws that keep the codebase premium and predictable."

Each principle is a **law**, not a guideline. Violations must be remediated immediately.

---

### GP-01: GSAP Exclusive Animations
**Rule:** All scroll-triggered or timeline-based animations must use GSAP + ScrollTrigger. No CSS `@keyframes` animations for interaction-driven movement.  
**Why:** Mixing animation systems creates synchronization conflicts and makes performance optimization impossible. GSAP provides the precision required for a premium feel.  
**Enforced by:** `docs/animation_strategy.md` compliance.  
**Remediation:** Port the CSS animation to a GSAP timeline using `useGSAP` or standard timelines.

### GP-02: Tailwind-Free Zone
**Rule:** Strictly NO Tailwind CSS. All styling must be written in Vanilla CSS within `.css` files.  
**Why:** This project prioritizes custom, pixel-perfect design and complex textures that Tailwind's utility-first approach makes brittle and difficult to maintain.  
**Enforced by:** Architecture lint / manual review.  
**Remediation:** Convert utility classes to semantic CSS classes in the corresponding stylesheet.

### GP-03: Deliberate Surface Treatment
**Rule:** Use depth treatments only when they improve readability or composition. Do not add grain/noise overlays by default.  
**Why:** Forced texture can degrade clarity and make imagery feel dirty instead of intentional.  
**Enforced by:** Review of visual layers in the section itself.  
**Remediation:** Remove decorative noise layers and keep only the gradients, masks, and overlays that materially help the composition.

### GP-04: Boundary Validation
**Rule:** Any external data (Form inputs, CMS data, API results) must be validated before entering the View layer.  
**Why:** Prevents "guess-work" in components and ensures the UI remains robust.  
**Enforced by:** TypeScript interfaces and Zod schemas (where applicable).  
**Remediation:** Wrap the data entry point in a validator or type guard.

---

## Technical Strategy References
- [CSS Architecture](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/css_architecture.md)
- [Animation Strategy](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/animation_strategy.md)
- [Design Tokens](file:///c:/Users/Leon/DevMode/kossy-langat-website/docs/design_tokens.md)
