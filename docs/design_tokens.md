# Kossy Portfolio Website - Design Tokens

This document outlines the core design tokens (colors, typography, spacing) that will drive the visual identity of the Kossy Portfolio Website. These tokens will be implemented via Tailwind CSS configuration.

## 1. Color Palette

The color scheme is designed to feel "engineered, not decorated," reflecting stability, professionalism, and the built environment.

### Primary Colors
*   **Deep Teal (Brand Primary):** `#1A3636` - Used for heavy backgrounds, primary buttons, and strong typographic elements. Conveys authority and depth.
*   **Warm Neutral (Base Background):** `#F4F1EA` - Soft, parchment-like background color. Reduces eye strain and provides a premium, editorial feel compared to stark white.
*   **Architectural Gray (Secondary/Borders):** `#8C9294` - Used for subtle lines, blueprint overlays, and secondary text.

### Accents
*   **Terracotta / Rust (Action/Highlight):** `#C86B5E` - Used sparingly for key calls to action, highlights, and to draw attention to metrics. Represents raw materials like brick and earth.
*   **Soft Sand (Secondary Background):** `#E8E3D9` - Used for cards or contrasting sections against the primary Warm Neutral.

### Text Colors
*   **Primary Text:** `#2C3E3E` - Very dark teal/charcoal for maximum readability without the harshness of pure black.
*   **Muted Text:** `#6B7280` - For secondary information and captions.
*   **Inverse Text:** `#FFFFFF` - For text on Deep Teal backgrounds.

## 2. Typography

The typographic pairing is crucial for the editorial, authoritative feel.

### Headings (Serif)
*   **Font Family:** `Playfair Display` or `Merriweather`
*   **Usage:** Primary headlines (e.g., "01.0 / THE ORCHESTRATOR"), section titles, and pull quotes.
*   **Weights:** Regular (400), Semi-Bold (600)

### Body & UI (Sans-Serif)
*   **Font Family:** `Inter` or `HK Grotesk`
*   **Usage:** Body paragraphs, navigation, buttons, metrics, and micro-copy.
*   **Weights:** Light (300), Regular (400), Medium (500)

## 3. Spacing & Layout Grid

*   **Grid System:** 12-column fluid grid for desktop, cascading to appropriate column structures for tablet (8) and mobile (4).
*   **Spacing Scale:** A strict 4px/8px scale (e.g., 4, 8, 12, 16, 24, 32, 48, 64, 96, 128) to maintain vertical rhythm.
*   **Section Padding:** Generous white space is required to achieve the "calm" and "premium" aesthetic. Sections will typically have `py-24` or `py-32` (96px or 128px) on desktop.

## 4. Textures
*   **Blueprint overlay:** A subtle repeating pattern (SVG or CSS `backgroundImage`) set to `mix-blend-mode: multiply` with low opacity (e.g., 5-10%) to create the architectural feel over images or solid backgrounds.
