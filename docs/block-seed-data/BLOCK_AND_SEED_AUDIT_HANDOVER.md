# Handover Protocol: Block & Seed Audit Agent

**Date:** 2026-01-23
**Status:** DEFINITIVE INSTRUCTIONS
**Pre-requisites:** Read `docs/front-end/SKIN_SYSTEM_GUIDE.md` and `docs/front-end/SKIN_IMPLEMENTATION_PROMPT.md` before starting.

---

## 🛑 The Core Directive
You are tasked with auditing, improving, and seeding the "perfect" block library. 
**CRITICAL:** You must not break the **Skin System** while doing this. The Skin System relies on specific architectural rules (`variant` props, pure tokens) that strict adherence to is mandatory.

---

## 🧱 1. Block Architecture Rules

### ❌ What Not To Do
*   **No Hardcoded Styles:** Never use classes like `bg-white`, `text-slate-900`, or `border-gray-200` in the default block render.
    *   *Why?* This breaks dark mode and skins (like Retro/Agency) that need to inject their own palette.
*   **No "Simple" Logic:** Do not assume a block layout handles every skin. If "Agency" needs a radically different Grid layout (e.g., overlapping cards), do not try to hack the standard Grid with CSS. Create a **Variant**.

### ✅ The "Skin-Compatible" Standard
Every Block (`HeroBlock`, `GridBlock`, `TimelineBlock`, etc.) must follow this patterns:

1.  **Pure Tokens:** Use semantic classes.
    *   `bg-card` (not `bg-white`)
    *   `text-muted` (not `text-gray-500`)
    *   `border-default` (not `border-gray-200`)
    *   `text-accent` (for brand colors)
2.  **Structural Variants:**
    If a skin (like `agency` or `retro`) demands a DOM structure that differs from the default (e.g., extra decorative divs, different text alignment logic), you **MUST** implement it as a conditional variant inside the block:
    ```tsx
    // Correct Approach
    if (variant === 'agency') return <AgencyHero {...props} />
    if (variant === 'retro') return <RetroHero {...props} />
    return <DefaultHero {...props} />
    ```
3.  **Field Consistency:**
    *   Ensure all blocks expose `variant` or `style` fields in their Payload config so editors can select these skins.

---

## 🌱 2. Seed Data Strategy

### ❌ The "Blob" Anti-Pattern
Do not dump huge JSON blobs into `seed/index.ts`. All seed data must be modular per page/collection.

### ✅ The "Skin-Audit" Seed Plan
Your task is to re-seed the database to showcase the best versions of each block.

1.  **The "Agency" Page Check:**
    *   **Slug:** `/agency`
    *   **Hero:** `type: 'fullscreen'`, `variant: 'agency'`, `eyebrow: 'DIGITAL EXCELLENCE'`
    *   **Grid 1:** `style: 'agency-cards'`, `columns: 3` (e.g., "Built for Scale")
    *   **Grid 2:** `style: 'agency-list'`, `columns: 1` (e.g., "Case Studies")
    *   **Testimonials:** `style: 'agency'`
    *   **Note:** If the page `seed/agency-page.ts` does not exist, CREATE IT using these exact specs.

2.  **The "Retro" Page Check:**
    *   **Slug:** `/retro`
    *   **Hero:** `type: 'none'` (Page level), `blockType: 'hero', variant: 'retro'` (Block level)
    *   **Timeline:** `blockType: 'timeline'`, `heading: 'The Creative Process'` (with 4 steps)
    *   **Note:** This page is already working. **DO NOT BREAK IT.** Use it as a reference for how to structure seed data for high-fidelity skins.

3.  **Global Settings:**
    *   Ensure `defaultSkin` in `seed/settings.ts` is set to something sensible (e.g., `'agency'` or `'minimal'`) to demonstrate the system immediately upon reset.

---

## ⚠️ 3. Technical Trap: Tailwind v4
**WARNING:** This project uses Tailwind v4.
*   **Do NOT use:** `@apply` in your CSS for custom utilities unless you are 100% sure they resolve.
*   **Do NOT use:** `bg-gradient-to-r` utilities in React components. They often fail to generate.
*   **USE:** CSS Variables defined in `globals.css` (e.g., `background: var(--bg-card-gradient)`).

---

## 📝 Impact Summary for Your Audit
1.  **Audit:** When you audit a block, check: "Can I skin this just by changing CSS variables?" If NO, refactor the block to use tokens (`bg-card`, etc.).
2.  **Improve:** If a block is boring, add a `variant` (e.g., `HoverEffect`, `SplitLayout`) rather than changing the default.
3.  **Seed:** When seeding, explicitly use these new `variant` props to show off the system capabilities.

**Your Goal:** A robust, skinnable block library where "Retro", "Agency", and "Minimal" can coexist on the same codebase without fighting for CSS specificity.
