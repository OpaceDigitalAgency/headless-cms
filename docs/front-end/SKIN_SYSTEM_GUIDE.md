# SKIN SYSTEM: COMPLETE IMPLEMENTATION GUIDE

**Date:** 2026-01-22 (Updated after Tailwind v4 discovery)
**Status:** CANONICAL - This document overrides all other skin/theme documentation
**Purpose:** Single source of truth for creating custom skins using the Bolt.new → Payload workflow

---

## 🎯 CRITICAL: READ THIS FIRST

This document describes the **ACTUAL IMPLEMENTATION** of the skin system, including critical lessons learned from the agency skin implementation attempt.

**What this replaces:**
- `payload-frontend-themes-brief.md` (missing/outdated)
- Theoretical descriptions in `FRONTEND_STRATEGY_SUMMARY.md`
- Partial information in `frontend-implementation-plan.md`

**What this is:**
- The ONLY guide you need for creating custom skins
- Step-by-step Bolt → Skin translation process
- Complete reference for the actual codebase
- **Critical context on Tailwind v4 compatibility issues**

---

## ⚠️ CRITICAL DISCOVERY: TAILWIND V4 COMPATIBILITY

### The Problem We Encountered

During the agency skin implementation (January 2026), we discovered a **fundamental incompatibility** between:
- **Bolt.new output:** Generates Tailwind v3-style utility classes
- **This project:** Uses Tailwind CSS v4 (`^4.1.18`)

### What Doesn't Work

Tailwind v4 **DOES NOT generate** many gradient and text effect utilities that Bolt.new uses:

**Missing utilities in Tailwind v4:**
- ❌ `bg-gradient-to-r`, `bg-gradient-to-l`, `bg-gradient-to-t`, `bg-gradient-to-b`
- ❌ `from-{color}`, `via-{color}`, `to-{color}` gradient color stops
- ❌ `bg-clip-text` for gradient text effects
- ❌ `text-transparent` for gradient text
- ❌ Many other v3 utilities

**What we observed:**
- Bolt generates: `<span className="bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">`
- Browser DevTools shows: `backgroundImage: "none"` (classes not generated)
- Result: No gradient effect, just plain white text

### The Solution: Pure Skin System

The **ONLY reliable solution** is to:
1. Use Bolt.new as a **visual reference only**
2. Extract colors, spacing, fonts → **CSS variables**
3. Create **custom CSS classes** for gradients and effects in `globals.css`
4. Use **CSS variables for gradients** (`--bg-primary-btn`) to allow for Light/Dark mode switching
5. Components use **semantic classes** that reference associated variables

---

## 🛠 COMMON PITFALLS TO AVOID

### ❌ FAILURE MODE: Hardcoded Overrides & !important

**The Mistake:**
Creating a skin that forces dark mode styles using `!important`, breaking the ability to switch between Light and Dark modes.

**Don't do this:**
```css
[data-skin="agency"] .card {
  /* This forces a dark background even in Light Mode! */
  background: linear-gradient(135deg, rgb(0,0,0), rgb(20,20,20)) !important; 
}
```

**Do this instead (Variable-based):**
```css
[data-skin="agency"] {
  /* Light Mode Definition */
  --bg-card-gradient: linear-gradient(135deg, rgb(255,255,255), rgb(240,240,240));
}

[data-skin="agency"].dark {
  /* Dark Mode Definition */
  --bg-card-gradient: linear-gradient(135deg, rgb(0,0,0), rgb(20,20,20));
}

[data-skin="agency"] .card {
  /* Uses the variable, so it switches automatically */
  background: var(--bg-card-gradient) !important;
}
```

### ❌ FAILURE MODE: "Bleeding" Styles

**The Mistake:**
If a skin isn't properly scoped or if global styles are added without `[data-skin="name"]` protection, it can affect other skins.

**The Fix:**
Ensure EVERY custom style for a skin is prefixed with `[data-skin="skin-name"]`.

---

## 🚀 ADVANCED: THE "BOLT" HIGH-FIDELITY WORKFLOW

*Use this workflow when implementing complex, animated skins (like Retro, Cyberpunk, Agency) that must match a reference design pixel-perfectly.*

### 🏗️ Phase 1: The "Deep Read" (Before You Code)
**Goal:** Understand *why* the reference looks the way it does.

1.  **Identify Global Animations:**
    *   Open the reference `index.css`.
    *   Search for `@keyframes`.
    *   **Action:** These MUST be ported to `src/styles/globals.css` immediately. Do not rely on local block styles for global effects like scanlines, shimmers, or floating elements.
    *   **Naming:** Prefix with the skin name if specific (e.g., `scanline` is generic, but `retro-pulse` is better if unique).

2.  **Identify "Magic" Assets:**
    *   Look for data URIs (SVG background noise, grain, patterns) in the CSS.
    *   **Action:** Add these to `globals.css` under the `[data-skin="your-skin"]` selector using variables like `--skin-bg-image`.

3.  **Map the DOM Structure:**
    *   Look at the reference HTML/TSX.
    *   Does it use standard Tailwind classes?
    *   **Crucial:** Does it have *extra* DOM elements for decoration (e.g., pulsing circles, absolute positioned stars, glow effects)?
    *   *If YES:* You CANNOT just use CSS variables. You MUST create a **Variant** in the React Block component (see Phase 3).

---

### 🎨 Phase 2: Global Foundations (`globals.css`)
**Goal:** Make the "canvas" ready before painting.

1.  **Define the Skin Scope:**
    ```css
    [data-skin="retro"] {
      /* Map Reference Colors to System Tokens */
      --color-background: 15 23 42; /* Convert hex to R G B */
      --color-accent: 124 58 237;   /* Your primary brand color */
      
      /* Define Custom Hooks for Blocks */
      --skin-bg-image: url('...'); 
      --radius: 0px;                /* Match border-radius strategy */
    }
    ```

2.  **Port Keyframes & Utilities:**
    *   Copy all `@keyframes` from reference to the root of `globals.css` (or `theme` config).
    *   Create scoped utility classes if the reference uses them:
        ```css
        [data-skin="retro"] .text-shimmer {
          animation: text-shimmer 2s infinite;
        }
        ```

3.  **Typography & Base Elements:**
    *   Force font families and heading sizes if the skin deviates significantly from the system default.
    *   Override `.btn` and `.card` styles globally within the scope.

---

### 🧩 Phase 3: Block Configuration (`HeroBlock`, `GridBlock`)
**Goal:** Match the DOM structure exactly.

**Rule of Thumb:** If the reference design has decorative elements (stars, textures, complex hover layouts) that are *not* in the standard block, **DO NOT** try to hack the standard block with CSS.

1.  **Create a Structural Variant:**
    *   Inside `HeroBlock.tsx` or `GridBlock.tsx`, add a specific check:
        ```tsx
        const isRetro = variant === 'retro';
        
        if (isRetro) {
          return (
             // COMPELTE COPY-PASTE OF REFERENCE HTML STRUCTURE
             // Replace hardcoded text with props ({heading}, {description})
             // Keep all decorative <div>s and <svg>s
          );
        }
        ```
    *   This ensures 100% fidelity to the reference design animations and interactions.

2.  **Handle "None" Hero:**
    *   If the skin needs a custom Hero block (not the page default), ensure `PageRenderer.tsx` respects `hero.type: 'none'` to avoid layout gaps.

---

### 💾 Phase 4: Seed Data & Content
**Goal:** Populate the page with the exact content structure.

1.  **Block Type Matching:**
    *   Does the reference use a generic list or a specific "Process" flow?
    *   If it's a specific flow, use the `TimelineBlock` or `FeaturesBlock` and ensure your new Variant (Phase 3) handles it.

2.  **Exact Text & Assets:**
    *   In your seed script (`src/seed/retro-page.ts`):
    *   Use the exact headings ("Creative Process", "Services").
    *   **Crucial:** Hardcode the `variant: 'retro'` prop for every block that needs your custom structure.

3.  **Color Variables in Blocks:**
    *   Ensure your custom variants use `rgb(var(--color-accent))` instead of hardcoded hex values like `#7c3aed`. This keeps them compatible if you tweak `globals.css` later.

---

### ✅ Phase 5: The "One-Shot" Verification
Before submitting:

1.  **The "Gap" Check:** Is there unwanted white space at the top? (Check `hero.type`).
2.  **The "Color" Check:** Does the hover state use the right neon glow? (Check `globals.css` variables).
3.  **The "Animation" Check:** Do the scanlines/stars move? (Check Keyframes in `globals.css`).
4.  **The "Missing Content" Check:** Did you forget a section like "Testimonials" or "Process"? (Check the Seed script).
