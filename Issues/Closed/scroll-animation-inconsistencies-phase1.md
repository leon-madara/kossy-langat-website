# Scroll Animation Inconsistencies & Performance Issues

**Status:** Open  
**Priority:** High  
**Date Identified:** March 2, 2026  
**Affected Sections:** Hero, GapProblem, FeaturedProjects, ImpactMetrics, Representation  

---

## Problems Identified

### 1. **Inconsistent Animation Libraries (Architecture Violation)**
The codebase mixes GSAP and Framer Motion for similar tasks, creating:
- Increased bundle size (both libraries loaded)
- Inconsistent timing/easing between sections
- Maintenance complexity (two different APIs for same goal)
- Violates the "single source of truth" principle from GOLDEN_PRINCIPLES.md

**Affected Sections:**
- Hero: GSAP ScrollTrigger + Framer Motion for initial load
- GapProblem: Pure Framer Motion
- FeaturedProjects: GSAP + Framer Motion hybrid
- ImpactMetrics: Pure GSAP
- Representation: Pure GSAP

### 2. **Hero Section Over-Engineering**
The Hero parallax logic is unnecessarily complex:
- Different timelines for desktop/mobile increase maintenance burden
- Magic numbers (0.28, 0.34, 0.66 durations) lack documentation
- Reaches into next section's DOM (`document.getElementById("gap-problem")`) creating tight coupling
- GapProblem content animation is split between Hero and GapProblem components

### 3. **Performance Concerns**
- `will-change-transform` and `will-change-opacity` applied statically in JSX rather than dynamically during animation
- SplitText in FeaturedProjects creates DOM manipulation overhead
- No cleanup of SplitText instances (memory leak potential)
- ScrollTrigger.refresh() called unconditionally in FeaturedProjects

### 4. **Accessibility Issues**
- No `prefers-reduced-motion` check in GapProblem, ImpactMetrics, or Representation
- Only Hero and FeaturedProjects respect user motion preferences
- Inconsistent implementation of reduced motion handling

### 5. **Mobile Experience Gaps**
- FeaturedProjects rail animation completely disabled on mobile (no alternative provided)
- Hero mobile animation is simplified but loses the "premium" feel
- No consideration for tablet breakpoints (only mobile vs desktop)

---

## Proposed Solutions

### Solution A: Standardize on GSAP (Recommended)
**Rationale:** GSAP is already used for complex animations and provides better performance/control

**Implementation:**
1. Replace all Framer Motion `AnimatedReveal` usage with a GSAP-based equivalent
2. Consolidate Hero initial load animations into GSAP timeline
3. Create reusable GSAP animation utilities in `src/lib/animations.ts`
4. Reduce bundle size by ~30KB (Framer Motion removal)

**Benefits:**
- Single animation API across entire site
- Better scroll-linked performance
- Aligns with animation_strategy.md mandate
- Easier to maintain timing consistency

### Solution B: Decouple Hero from GapProblem
**Implementation:**
1. Remove `document.getElementById("gap-problem")` from Hero
2. Move GapProblem content animation entirely into GapProblem component
3. Use CSS custom properties or data attributes for coordination if needed
4. Document the intended visual relationship without code coupling

**Benefits:**
- Components become independently testable
- Easier to reorder sections
- Clearer separation of concerns

### Solution C: Optimize Performance
**Implementation:**
1. Apply `will-change` dynamically via GSAP's `onStart`/`onComplete` callbacks
2. Clean up SplitText instances: `split.revert()` in cleanup function
3. Debounce ScrollTrigger.refresh() or remove if unnecessary
4. Use `gsap.set()` for initial states instead of inline styles

**Benefits:**
- Reduced compositor overhead
- No memory leaks
- Smoother animations on lower-end devices

### Solution D: Universal Reduced Motion Support
**Implementation:**
1. Create a global reduced motion utility in `src/lib/animations.ts`
2. Apply consistent fallback: instant opacity changes, no transforms
3. Add to all animated components
4. Consider adding a user toggle in addition to system preference

**Benefits:**
- WCAG 2.1 compliance (Success Criterion 2.3.3)
- Better user experience for motion-sensitive users
- Consistent behavior across all sections

### Solution E: Enhanced Mobile Experience
**Implementation:**
1. Design alternative rail animation for mobile (vertical or simplified horizontal)
2. Maintain Hero parallax feel on mobile with lighter-weight approach
3. Add tablet-specific breakpoint (768-1023px) with intermediate animations
4. Test on actual devices, not just browser DevTools

**Benefits:**
- Premium feel maintained across all devices
- Better engagement on mobile (majority of traffic)
- Smoother experience on mid-range devices

---

## Recommended Implementation Priority

**Phase 1 (Critical):**
- Solution D: Add reduced motion support everywhere
- Solution C: Performance optimizations (will-change, SplitText cleanup)

**Phase 2 (High Impact):**
- Solution A: Standardize on GSAP
- Solution B: Decouple Hero/GapProblem

**Phase 3 (Enhancement):**
- Solution E: Mobile experience improvements

---

## Related Files

- `src/components/sections/home/Hero.tsx`
- `src/components/sections/home/GapProblem.tsx`
- `src/components/sections/home/FeaturedProjects.tsx`
- `src/components/sections/home/ImpactMetrics.tsx`
- `src/components/sections/home/Representation.tsx`
- `src/components/shared/AnimatedReveal.tsx`
- `docs/animation_strategy.md`
- `docs/GOLDEN_PRINCIPLES.md`
