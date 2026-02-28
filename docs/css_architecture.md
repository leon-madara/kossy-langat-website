# Kossy Portfolio Website - CSS Architecture

This document defines the CSS architecture and best practices for the project, primarily leveraging Tailwind CSS within the Next.js framework.

## 1. Core Methodology: Utility-First (Tailwind CSS)

We will use Tailwind CSS as the primary styling solution. This ensures rapid development, highly maintainable code, and a unified design system.

### Principles:
*   **Avoid Custom CSS:** Rely on Tailwind utility classes whenever possible. Custom CSS (via `@apply` or standard CSS) should be a last resort, used only for highly complex animations or specific pseudo-element styling that is cumbersome with utilities.
*   **Component Encapsulation:** Complex UI components (like the Case Study Cards or Hero Section) should encapsulate their styles within their respective React component files.
*   **Responsive Design:** Use Tailwind's responsive modifiers (`md:`, `lg:`, `xl:`) strategically. Always follow a Mobile-First approach: base classes define the mobile view, and modifiers define changes for larger screens.

## 2. Global Styles (`app/globals.css`)

The global CSS file will be kept minimal. It should only contain:
*   Tailwind's `@tailwind base`, `@tailwind components`, and `@tailwind utilities` directives.
*   Font face declarations (if not using `next/font`).
*   Global base styles for raw HTML elements (e.g., setting the default background color on the `body` tag, default text color, base font size).
*   Any necessary CSS variables defining the design tokens (colors, spacing) that Tailwind will consume.

### Example Global Setup
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: #F4F1EA;
    --foreground: #2C3E3E;
    --primary: #1A3636;
    --accent: #C86B5E;
    --muted: #6B7280;
    --border: #8C9294;
    --card: #E8E3D9;
  }

  body {
    @apply bg-background text-foreground antialiased font-sans;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-serif text-primary;
  }
}
```

## 3. Tailwind Configuration (`tailwind.config.ts`)

The `tailwind.config.ts` file will act as the single source of truth for all design tokens. We will extend the default theme to include our custom:
*   Colors (referencing the CSS variables).
*   Font families (mapping generic sans/serif to our specific typography).
*   Custom spacing or sizing utilities if necessary (e.g., specific container widths for the "Orchestrator" layout).
*   Custom animations or keyframes if they are too simple to require Framer Motion/GSAP.

## 4. Class Organization (Best Practices)

When writing long Tailwind class strings, order matters for readability. We will follow a consistent pattern (consider using a tool/plugin like `prettier-plugin-tailwindcss` to automate this):
1.  **Layout/Positioning:** (`position`, `z-index`, `top`, `display`)
2.  **Box Model:** (`w-`, `h-`, `margin`, `padding`)
3.  **Typography:** (`text-color`, `font-size`, `font-weight`, `leading`, `tracking`)
4.  **Visuals:** (`bg-color`, `border`, `rounded`, `shadow`, `opacity`)
5.  **Interactivity/Transitions:** (`hover:`, `focus:`, `transition`, `duration`)

## 5. CSS Modules/SCSS (Optional)

If highly complex, scoped CSS is absolutely required that Tailwind cannot efficiently handle (e.g., extremely intricate, multi-layered mesh gradients or complex structural CSS grid layouts that defy utility classes), we may opt-in to standard CSS Modules (`[name].module.css`) on a per-component basis. However, this should be the exception, not the rule.
