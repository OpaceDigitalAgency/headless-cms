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
