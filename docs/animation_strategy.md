# Kossy Portfolio Website - Animation & Interaction Strategy

The animation strategy for this project is critical to achieving the "engineered, not decorated" aesthetic. Animations must feel deliberate, structured, and heavy (like physical materials), rather than light, bouncy, or whimsical.

We will bridge the gap between simple CSS transitions and complex scroll-driven narratives using a combination of technologies.

## 1. The Tools

1.  **Tailwind CSS (Transitions):** For simple state changes (hover, focus, active).
2.  **Framer Motion:** For React-based component entering/exiting, presence, layout animations, and declarative, physics-based UI interactions.
3.  **GSAP (GreenSock Animation Platform):** For complex, timeline-based or heavily scroll-linked sequences (e.g., pinning sections, complex horizontal scrolling through case studies, SVG path animations).

## 2. Core Animation Principles

*   **Friction & Mass:** Animations should feel like they have physical weight. Use easing curves that start quickly but ease out slowly and deliberately. Avoid "spring" animations with high oscillation/bounciness.
*   **Staggered Reveals:** When revealing lists or grids (like the Case Studies or Metrics), stagger the entrance of the items slightly to create a cascading effect.
*   **Opacity + Y-Axis Transform:** The primary entrance animation for text blocks and images should be a fade-in combined with a slight upward translation (`translateY(20px)` to `translateY(0)`). This prevents harsh flashing and feels rising and structured.
*   **Purpose over Flair:** Never animate something just because you can. Animations must serve a purpose: drawing attention to key metrics, revealing information progressively to avoid cognitive overload, or guiding the user down the page.

## 3. Tool Selection Guide

### When to use Tailwind CSS Transitions
*   Button hover effects (background color changes, slight opacity shifts).
*   Link hover underlines.
*   Simple color transitions on interactive elements.

**Example:** `transition-colors duration-300 ease-in-out hover:bg-accent hover:text-white`

### When to use Framer Motion
*   Page transitions (if required).
*   Initial load animations (revealing the Hero section components sequentially).
*   Mounting/Unmounting components (e.g., a modal or notification).
*   Simple, independent scroll-reveals (e.g., fading in a block of text when it enters the viewport using `whileInView`).

**Example (Framer Motion - Subtle Fade Up):**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true, margin: "-100px" }}
>
  Content...
</motion.div>
```

### When to use GSAP (ScrollTrigger)
*   Pinning the "Systems Thinking" diagram while the user scrolls past explanatory text.
*   Complex parallax effects where background architectural blueprints move at a different rate than the foreground text.
*   Horizontal scrolling sections (e.g., swiping through the Case Studies cards while scrolling down).
*   Chaining multiple overlapping animations on a single scroll event.

## 4. GSAP Implementation Strategy in React

GSAP integrates well with React but requires careful management of references and component lifecycles to avoid memory leaks.
*   Always use `useRef` to target DOM elements for GSAP.
*   Ideally, use the `useGSAP` hook (provided by GreenSock) to manage context, scope, and automatic cleanup.

## 5. Performance Considerations

*   **will-change:** Use the `will-change` CSS property (or Tailwind's `will-change-transform`, `will-change-opacity`) judiciously on elements that undergo complex GSAP animations to hint the browser's compositor.
*   **Hardware Acceleration:** Always prefer animating `transform` (translates, scales) and `opacity` properties over properties that trigger layout recalculations (like `width`, `height`, `margin`, `top/left`).
