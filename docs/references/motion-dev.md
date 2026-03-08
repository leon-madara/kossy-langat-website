# Motion.dev — Comprehensive Agent Reference

> **Source:** [motion.dev/docs](https://motion.dev/docs/quick-start)
> **Package:** `motion` (npm install motion)
> **Import (JS):** `import { animate, scroll, inView, spring, stagger } from "motion"`
> **Import (React):** `import { motion, AnimatePresence, useScroll, useAnimate, useMotionValue } from "motion/react"`
> **Sizes:** Mini (2.3kb) — HTML/SVG only | Hybrid (18kb) — full engine

---

## Table of Contents

1. [Installation](#installation)
2. [animate()](#animate)
3. [scroll()](#scroll)
4. [inView()](#inview)
5. [spring()](#spring)
6. [stagger()](#stagger)
7. [React: motion component](#react-motion-component)
8. [React: Gestures](#react-gestures)
9. [React: Variants & Orchestration](#react-variants--orchestration)
10. [React: AnimatePresence & Exit Animations](#react-animatepresence--exit-animations)
11. [React: Layout Animations](#react-layout-animations)
12. [React: Hooks](#react-hooks)
13. [Easing Functions Reference](#easing-functions-reference)
14. [Common Patterns & Recipes](#common-patterns--recipes)

---

## Installation

```bash
npm install motion
```

**CDN (script tag):**
```html
<script type="module">
  import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"
</script>
```

**Mini vs Hybrid imports:**
```js
// Hybrid — full engine (18kb), supports independent transforms, sequences, CSS vars, SVG paths
import { animate } from "motion"

// Mini — browser-native only (2.3kb), HTML/SVG styles via Web Animations API
import { animate } from "motion/mini"
```

---

## animate()

The core animation function. Animates HTML, SVG, CSS variables, SVG paths, single values, motion values, objects, and WebGL.

### Basic Usage

```js
import { animate } from "motion"

// CSS selector
animate(".box", { rotate: 360 })

// DOM element(s)
const el = document.getElementById("box")
animate(el, { opacity: 0 }, { duration: 0.5 })

// Multiple elements
const boxes = document.querySelectorAll(".box")
animate(boxes, { rotate: 360 })
```

### Animatable Targets

| Target | Example |
|--------|---------|
| **HTML/SVG elements** | `animate("div", { opacity: 1 })` |
| **Independent transforms** | `animate(el, { x: 100, rotateY: 45, scale: 1.2 })` |
| **CSS variables** | `animate(el, { "--rotate": "360deg" })` |
| **SVG paths** | `animate("circle", { pathLength: [0, 1] })` |
| **Single values** | `animate(0, 100, { onUpdate: v => ... })` |
| **Motion values** | `animate(motionValue, 200, { duration: 0.5 })` |
| **Objects** | `animate(obj, { x: 200, color: "#00f" })` |
| **Three.js** | `animate(camera.rotation, { y: 360 })` |

### Independent Transform Axes

```
Translate:   x, y, z
Scale:       scale, scaleX, scaleY
Rotate:      rotate, rotateX, rotateY, rotateZ
Skew:        skewX, skewY
Perspective: transformPerspective
```

### SVG Path Drawing

```js
// pathLength, pathSpacing, pathOffset — values between 0 and 1
animate("circle", { pathLength: [0, 1] })
// Compatible with: circle, ellipse, line, path, polygon, polyline, rect
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `type` | auto | `"tween"`, `"spring"`, or `"inertia"` |
| `duration` | `0.3` (single), `0.8` (keyframes) | Duration in seconds |
| `ease` | auto | Easing function name, cubic bezier `[a,b,c,d]`, or function `(p) => p` |
| `times` | evenly spread | Array of 0-1 values for keyframe positions |
| `delay` | `0` | Delay in seconds (negative = start mid-animation) |
| `repeat` | `0` | Number of repetitions (`Infinity` for perpetual) |
| `repeatType` | `"loop"` | `"loop"`, `"reverse"`, or `"mirror"` |
| `repeatDelay` | `0` | Delay between repetitions |
| `onUpdate` | — | Callback receiving latest value |

**Spring-specific options:**

| Option | Default | Description |
|--------|---------|-------------|
| `bounce` | `0.25` | Bounciness (0 = none, 1 = extreme). Overridden by physics options. |
| `visualDuration` | — | Time in seconds for the visual bulk of the transition |
| `stiffness` | `1` | Higher = more sudden movement |
| `damping` | `10` | Opposing force. `0` = oscillate forever |
| `mass` | `1` | Higher = more lethargic |
| `velocity` | current | Initial velocity |
| `restSpeed` | `0.1` | Speed threshold for completion |
| `restDelta` | `0.01` | Distance threshold for completion |

**Per-value overrides:**
```js
animate(el, { x: 100, rotate: 0 }, {
  duration: 1,
  rotate: { duration: 0.5, ease: "easeOut" }
})
```

### Timeline Sequences

```js
const sequence = [
  ["ul", { opacity: 1 }, { duration: 0.5 }],
  ["li", { x: [-100, 0] }, { at: 1 }],          // absolute time
  ["li", { opacity: 1 }, { at: "-0.5" }],        // relative time
  ["li", { y: 0 }, { at: "<" }],                 // with previous
]
animate(sequence)

// Override sequence duration
animate(sequence, { duration: 10, repeat: 2 })

// Default transition for all segments
animate(sequence, { defaultTransition: { duration: 0.2 } })
```

**Callbacks in sequences:**
```js
const sequence = [
  [(progress) => console.log(progress)],           // progress 0-1
  [(color) => setColor(color), ["#000", "#fff"]],   // custom keyframes
]
```

### Controls

`animate()` returns playback controls:

```js
const animation = animate(el, { opacity: 1 })

animation.time = 0.5      // get/set current time
animation.speed = 2        // get/set playback speed (-1 = reverse)
animation.duration         // read-only duration

animation.pause()          // pause
animation.play()           // resume/restart
animation.complete()       // jump to end
animation.cancel()         // revert to initial state
animation.stop()           // stop (commits styles, not restartable)

// Promise-like
await animation
animation.then(() => console.log("done"))
```

---

## scroll()

Scroll-linked and scroll-triggered animations. 5.1kb. Uses `ScrollTimeline` API for hardware acceleration.

### Basic Usage

```js
import { scroll } from "motion"

// Callback — receives progress 0-1
scroll(progress => console.log(progress))

// Link an animation to scroll
const animation = animate("div", { rotate: [0, 360] }, { ease: "linear" })
scroll(animation)
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `container` | `window` | Scrollable element to track |
| `axis` | `"y"` | `"x"` or `"y"` |
| `target` | scrollable area | Element to track position of |
| `offset` | `["start start", "end end"]` | Intersections defining tracking range |
| `trackContentSize` | — | Re-measure on content size changes |

### Offset Intersections

Format: `"targetPoint containerPoint"` — values can be:
- **Names:** `"start"`, `"center"`, `"end"` (shortcuts for 0, 0.5, 1)
- **Numbers:** `0`-`1` (e.g. `"0 0.5"`)
- **Pixels:** `"100px"`, `"-50px"`
- **Percent:** `"0%"` to `"100%"`
- **Viewport:** `"vh"`, `"vw"` units

```js
// Track element entering from bottom to leaving at top
scroll(animation, {
  target: document.getElementById("item"),
  offset: ["start end", "end start"]
})
```

### Scroll Information

```js
scroll((progress, info) => {
  console.log(info.y.current)       // current scroll position
  console.log(info.y.progress)      // 0-1 progress
  console.log(info.y.velocity)      // scroll velocity
  console.log(info.y.scrollLength)  // total scrollable length
  console.log(info.y.offset)        // offsets in pixels
  console.log(info.time)            // timestamp
})
```

### Pinning

Use CSS `position: sticky` for best performance. Use a larger container with `target` to define scroll distance:

```js
scroll(animation, { target: document.getElementById("sticky-section") })
```

### Cancel

```js
const cancel = scroll(animation)
cancel()  // stop scroll tracking
```

---

## inView()

Viewport detection using Intersection Observer. 0.5kb.

```js
import { inView } from "motion"

// Fire once when entering viewport
inView("section", (element, info) => {
  animate(element, { opacity: 1 })
})

// Fire on enter AND return cleanup for leave
inView(element, (el) => {
  const anim = animate(el, { opacity: 1 })
  return () => anim.stop()  // cleanup on leave
})

// Stop detection
const stop = inView(element, callback)
stop()
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `root` | `window` | Scrollable parent to use as viewport |
| `margin` | `0` | Extend/contract viewport bounds (e.g. `"0px 100px 0px 0px"`) |
| `amount` | `"some"` | `"some"`, `"all"`, or number 0-1 |

```js
inView("#carousel li", callback, {
  root: document.querySelector("#carousel"),
  margin: "0px 100px 0px 0px",
  amount: "all"
})
```

---

## spring()

Spring physics generator for advanced use cases and CSS generation.

```js
import { spring } from "motion"

// Returns a generator
const gen = spring({ keyframes: [0, 100], stiffness: 400 })

// Sample at specific times (milliseconds)
const { value, done } = gen.next(10)

// Use with mini animate
import { animate } from "motion/mini"
animate(el, { transform: "translateX(100px)" }, {
  type: spring,
  bounce: 0.3,
  duration: 0.8
})
```

### CSS Generation

```js
element.style.transition = "all " + spring(0.5)
```

### Options

**Time options** (overridden by physics options):

| Option | Default | Description |
|--------|---------|-------------|
| `duration` | `800` | Duration in **milliseconds** |
| `visualDuration` | — | Perceived duration (seconds) — overrides `duration` |
| `bounce` | `0.25` | 0 = no bounce, 1 = max bounce |

**Physics options:**

| Option | Default | Description |
|--------|---------|-------------|
| `stiffness` | `1` | Higher = more sudden |
| `damping` | `10` | 0 = oscillate forever |
| `mass` | `1` | Higher = more lethargic |
| `velocity` | current | Initial velocity |
| `restSpeed` | `0.1` | Speed threshold |
| `restDelta` | `0.01` | Distance threshold |

---

## stagger()

Offset animation delay for multiple elements.

```js
import { animate, stagger } from "motion"

// Basic stagger — 0.1s between each element
animate("li", { opacity: 1, y: 0 }, { delay: stagger(0.1) })

// In sequences
animate([
  ["ul", { opacity: 1 }],
  ["li", { x: [100, 0] }, { delay: stagger(0.05) }]
])
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `startDelay` | `0` | Initial delay offset |
| `from` | `"first"` | Origin: `"first"`, `"center"`, `"last"`, or index number |
| `ease` | `"linear"` | Redistribute stagger timing with an easing function |

```js
stagger(0.1, { startDelay: 0.2 })         // 0.2, 0.3, 0.4...
stagger(0.05, { from: "last" })            // reverse order
stagger(0.05, { from: "center" })          // radiate from center
stagger(0.1, { ease: "easeOut" })          // ease distribution
stagger(0.1, { ease: [.32, .23, .4, .9] }) // cubic bezier
```

### Negative Stagger (start mid-animation)

```js
// Start all elements mid-way through their animation
animate("li", keyframes, {
  delay: stagger(0.05, { startDelay: -1 }),
  duration: 2
})
```

---

## React: motion component

The `<motion />` component is the foundation. Prefix any HTML/SVG tag with `motion.`:

```jsx
import { motion } from "motion/react"

<motion.div animate={{ opacity: 1 }} />
<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />
<motion.circle animate={{ pathLength: 1 }} />
```

### Animation Props

| Prop | Description |
|------|-------------|
| `initial` | Values to animate from on mount (or `false` to disable) |
| `animate` | Target values — auto-transitions when changed |
| `exit` | Target on unmount (requires `<AnimatePresence>`) |
| `transition` | Default transition for all animations |
| `whileHover` | Animation while pointer hovers |
| `whileTap` | Animation while pressed |
| `whileFocus` | Animation while focused (`:focus-visible` rules) |
| `whileDrag` | Animation while dragging |
| `whileInView` | Animation while in viewport |
| `layout` | Enable automatic layout animation |
| `layoutId` | Shared layout animation identifier |
| `variants` | Named animation state definitions |
| `custom` | Custom data for dynamic variants |
| `drag` | Enable drag (`true`, `"x"`, `"y"`) |

### Enter Animation

```jsx
<motion.article
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
/>

// Disable enter animation
<motion.div initial={false} animate={{ scale: 1 }} />
```

### Transitions

```jsx
// Inline transition
<motion.div
  animate={{ x: 100 }}
  transition={{ ease: "easeOut", duration: 2 }}
/>

// Per-prop transition override
<motion.div
  animate={{ opacity: 1 }}
  whileHover={{
    opacity: 0.7,
    transition: { duration: 0.3 }
  }}
  transition={{ duration: 0.5 }}
/>

// Global default via MotionConfig
<MotionConfig transition={{ duration: 0.3 }}>
  <motion.div animate={{ opacity: 1 }} />
</MotionConfig>
```

### Animatable Values

```
Transforms (independent): x, y, z, scale, scaleX, scaleY, rotate, rotateX, rotateY, rotateZ, skewX, skewY, transformPerspective
Transform origin:         originX, originY, originZ
CSS properties:           opacity, backgroundColor, color, border*, filter, etc.
CSS variables:            "--custom-prop"
SVG attributes:           pathLength, pathSpacing, pathOffset, attrX, attrY
Display/Visibility:       display "none"/"block", visibility "hidden"/"visible"
Auto sizing:              height "auto", width "auto"
```

**Value type conversion** works for: `x`, `y`, `width`, `height`, `top`, `left`, `right`, `bottom` — can animate between px, %, vh, vw, calc().

### Custom Components

```jsx
import { motion } from "motion/react"

const MotionComponent = motion.create(MyComponent)
// MyComponent must forward ref and spread props
```

### Style Props

```jsx
// Use transform shorthands in style
<motion.section style={{ x: -20, rotate: 45 }} />
```

---

## React: Gestures

### Hover

```jsx
<motion.a
  whileHover={{ scale: 1.2 }}
  onHoverStart={(e) => {}}
  onHoverEnd={(e) => {}}
/>
```

### Tap

```jsx
<motion.button
  whileTap={{ scale: 0.9, rotate: 3 }}
  onTap={(e, info) => {}}
  onTapStart={(e, info) => {}}
  onTapCancel={(e, info) => {}}
/>
// Keyboard accessible — Enter key triggers tap
```

### Pan

```jsx
<motion.div onPan={(e, pointInfo) => {}} />
// Requires touch-action CSS rule for touch input
```

### Drag

```jsx
<motion.div
  drag               // both axes
  drag="x"           // x-axis only
  dragConstraints={{ left: 0, right: 300 }}
  dragElastic={0.2}
  whileDrag={{ scale: 1.2 }}
/>
```

### Focus

```jsx
<motion.a whileFocus={{ scale: 1.2 }} href="#" />
// Uses :focus-visible rules
```

### Viewport (whileInView)

```jsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: "-100px" }}
/>
```

---

## React: Variants & Orchestration

Variants are named animation states that propagate through component trees.

```jsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      delayChildren: stagger(0.3),
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
}

<motion.ul
  initial="hidden"
  whileInView="visible"
  variants={container}
>
  <motion.li variants={item} />
  <motion.li variants={item} />
  <motion.li variants={item} />
</motion.ul>
```

### Orchestration Options (in variant transitions)

| Option | Description |
|--------|-------------|
| `when` | `"beforeChildren"`, `"afterChildren"` |
| `delayChildren` | Delay before children start (or `stagger()`) |
| `staggerChildren` | Time between each child start |
| `staggerDirection` | 1 (first→last) or -1 (last→first) |

### Dynamic Variants

```jsx
const variants = {
  visible: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.3 },
  }),
}

items.map((item, i) => (
  <motion.div custom={i} variants={variants} animate="visible" />
))
```

---

## React: AnimatePresence & Exit Animations

```jsx
import { AnimatePresence, motion } from "motion/react"

<AnimatePresence>
  {isVisible && (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

---

## React: Layout Animations

Automatically animate between layout changes using performant transforms.

```jsx
// Auto-animate layout changes
<motion.div layout />

// Shared layout animation between elements
<motion.div layoutId="underline" />

// Animate width/height to "auto"
<motion.div
  initial={{ height: 0 }}
  animate={{ height: "auto" }}
/>
```

---

## React: Hooks

### useAnimate

Imperative animation control:

```jsx
import { useAnimate } from "motion/react"

function MyComponent() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const controls = animate([
      [scope.current, { x: "100%" }],
      ["li", { opacity: 1 }],
    ])
    controls.speed = 0.8
    return () => controls.stop()
  }, [])

  return <ul ref={scope}><li /><li /></ul>
}
```

### useScroll

```jsx
import { useScroll, motion } from "motion/react"

function Component() {
  const { scrollYProgress } = useScroll()
  return <motion.div style={{ scaleX: scrollYProgress }} />
}

// Track element position
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start end", "end start"]
})
```

### useMotionValue

```jsx
import { useMotionValue, motion, animate } from "motion/react"

function Counter() {
  const count = useMotionValue(0)

  useEffect(() => {
    const controls = animate(count, 100, { duration: 5 })
    return () => controls.stop()
  }, [])

  return <motion.pre>{count}</motion.pre>
}
```

---

## Easing Functions Reference

| Name | Description |
|------|-------------|
| `"linear"` | Constant speed |
| `"easeIn"` | Starts slow |
| `"easeOut"` | Ends slow |
| `"easeInOut"` | Starts and ends slow |
| `"circIn"` | Circular-in |
| `"circOut"` | Circular-out |
| `"circInOut"` | Circular in-out |
| `"backIn"` | Slight overshoot at start |
| `"backOut"` | Slight overshoot at end |
| `"backInOut"` | Overshoot both |
| `"anticipate"` | Wind up then release |
| `[a, b, c, d]` | Custom cubic bezier |
| `(p) => p` | Custom JS function (0→1 input, 0→1 output) |

---

## Common Patterns & Recipes

### Fade In on Scroll

```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: "easeOut" }}
/>
```

### Staggered List Entry

```jsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

<motion.ul initial="hidden" whileInView="visible" variants={container}>
  {items.map(i => <motion.li key={i} variants={item} />)}
</motion.ul>
```

### Scroll-Linked Progress Bar

```jsx
const { scrollYProgress } = useScroll()
<motion.div
  style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
  className="progress-bar"
/>
```

### SVG Line Drawing

```jsx
<motion.path
  d="M0,0 L100,100"
  initial={{ pathLength: 0 }}
  whileInView={{ pathLength: 1 }}
  transition={{ duration: 2, ease: "easeInOut" }}
/>
```

### Interactive Button

```jsx
<motion.button
  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

### Scroll-Triggered Animation (JS)

```js
inView(".section", (el) => {
  animate(el, { opacity: 1, y: 0 }, {
    duration: 0.8,
    delay: stagger(0.1),
  })
})
```

### Complex Sequence (JS)

```js
animate([
  [".backdrop", { opacity: [0, 1] }, { duration: 0.3 }],
  [".modal", { y: [50, 0], opacity: [0, 1] }, { at: "-0.1" }],
  [".modal h2", { opacity: 1 }, { at: "-0.2" }],
  [".modal p", { opacity: 1 }, { at: "<", delay: stagger(0.05) }],
])
```

### Reduced Motion

```jsx
// Respect prefers-reduced-motion
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
  // Motion automatically respects prefers-reduced-motion
/>
```

---

> **Official Docs:** [motion.dev/docs](https://motion.dev/docs/quick-start)
> **Examples:** [motion.dev/examples](https://motion.dev/examples)
> **React Installation:** [motion.dev/docs/react-installation](https://motion.dev/docs/react-installation)
