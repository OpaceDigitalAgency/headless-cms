# SKIN SYSTEM: COMPLETE IMPLEMENTATION GUIDE

**Date:** 2026-01-22
**Status:** CANONICAL - This document overrides all other skin/theme documentation
**Purpose:** Single source of truth for creating custom skins using the Bolt.new → Payload workflow

---

## 🎯 CRITICAL: READ THIS FIRST

This document describes the **ACTUAL IMPLEMENTATION** of the skin system, not a theoretical ideal. It provides the complete, scalable workflow for creating hundreds of custom site designs.

**What this replaces:**
- `payload-frontend-themes-brief.md` (missing/outdated)
- Theoretical descriptions in `FRONTEND_STRATEGY_SUMMARY.md`
- Partial information in `frontend-implementation-plan.md`

**What this is:**
- The ONLY guide you need for creating custom skins
- Step-by-step Bolt → Skin translation process
- Complete reference for the actual codebase

---

## 1) HOW THE SKIN SYSTEM ACTUALLY WORKS

### Architecture Overview

The platform uses a **CSS variable-based skin system** controlled **exclusively by admin settings** (NOT user-switchable).

**Key Files:**
- **Skin definitions:** `apps/cms/src/styles/globals.css`
- **Admin control:** `apps/cms/src/globals/Settings.ts` → Appearance tab → Default Skin dropdown
- **Application:** `packages/ui/src/components/ThemeProvider.tsx`
- **Attribute:** `data-skin="skinname"` on `<html>` element

### Current Skins (10 total)

1. minimal (default)
2. editorial
3. saas
4. soft
5. bold
6. monochrome
7. glass
8. high-contrast
9. neon-grid
10. agency

### What Skins Control

Each skin defines CSS variables for:

**Colours (RGB values, space-separated, NO rgb() wrapper):**
- `--color-background` - Main background colour
- `--color-foreground` - Main text colour
- `--color-accent` - Primary accent colour
- `--color-accent-light` - Secondary accent colour
- `--color-muted` - Muted text colour
- `--color-border` - Border colour
- `--color-card` - Card/surface background colour

**Typography:**
- `--font-sans` - Sans-serif font stack
- `--font-serif` - Serif font stack
- `--letter-spacing` - Letter spacing for headings

**Effects:**
- `--radius` - Border radius
- `--shadow` - Default shadow
- `--shadow-lg` - Large shadow
- `--border-width` - Border width

**Layout:**
- `--container-max` - Maximum container width

**Backgrounds:**
- `--skin-bg-image` - Background image URL
- `--skin-bg-size` - Background size
- `--skin-bg-position` - Background position
- `--skin-bg-repeat` - Background repeat

### Light/Dark Mode

Each skin supports both modes:
- **Light mode:** `[data-skin="skinname"]`
- **Dark mode:** `[data-skin="skinname"].dark`

Mode switching uses `next-themes` with `class="dark"` attribute.

---

## 2) THE SCALABLE WORKFLOW: Bolt.new → Custom Skin

### The Problem This Solves

You need to create **hundreds of custom site designs** quickly without manually coding each one.

### The Workflow (4 Steps)

1. **Bolt.new** creates a beautiful standalone page with hardcoded Tailwind classes
2. **Drop the file** into `/custom skins/` folder as complete reference
3. **Agent translates** the design into the CSS variable-based skin system
4. **Result:** New skin option in Settings that works globally across all pages/blocks

### Why This Was Failing Before

**Bolt creates:** Component-specific hardcoded classes
```tsx
<h1 className="text-6xl font-black bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent animate-gradient-x">
```

**Your system needs:** Generic components using CSS variables
```tsx
<h1 className="text-foreground">
```

**The gap:** No translation guide existed. This document fixes that.

---

## 3) BOLT → SKIN TRANSLATION GUIDE (THE CORE PROCESS)

### Step 1: Analyze the Bolt Files

Open `/custom skins/page.tsx` and `/custom skins/globals.css`. Identify:

1. **Colour palette** - All colours used (backgrounds, text, accents, borders)
2. **Typography** - Font sizes, weights, letter-spacing, line-heights
3. **Animations** - Custom @keyframes and animation classes
4. **Effects** - Gradients, shadows, blurs, borders, border-radius
5. **Layout** - Container widths, spacing patterns

### Step 2: Extract Colour Values

From Bolt's hardcoded Tailwind classes, extract RGB values.

**Example from agency skin:**
```
Bolt Class          →  CSS Variable (Light)      →  CSS Variable (Dark)
─────────────────────────────────────────────────────────────────────────
bg-white            →  --color-background: 255 255 255  →  3 7 10
text-slate-900      →  --color-foreground: 15 23 42     →  255 255 255
text-gray-400       →  --color-muted: 100 116 139       →  156 163 175
border-gray-200     →  --color-border: 226 232 240      →  31 41 55
bg-gray-50          →  --color-card: 248 250 252        →  17 24 39
bg-emerald-500      →  --color-accent: 16 185 129       →  16 185 129
bg-teal-400         →  --color-accent-light: 52 211 153 →  52 211 153
```

**CRITICAL FORMAT RULE:**
- ✅ Correct: `--color-accent: 16 185 129` (space-separated RGB values)
- ❌ Wrong: `--color-accent: rgb(16, 185, 129)` (NO rgb() wrapper)
- ❌ Wrong: `--color-accent: #10b981` (NO hex values)

**Why:** Tailwind uses `rgb(var(--color-accent))` to apply the values.

### Step 3: Extract Typography Patterns

Look for font-related classes and convert to variables:

```
Bolt Class          →  CSS Variable
──────────────────────────────────────────────
font-black          →  font-weight: 900 (for headings)
tracking-tighter    →  --letter-spacing: -0.02em
text-6xl            →  font-size: clamp(3rem, 8vw, 6rem)
leading-tight       →  line-height: 1.1
```



### Step 4: Extract and Add Animations

**Copy ALL @keyframes from `/custom skins/globals.css` to `apps/cms/src/styles/globals.css`**

Place them in the `@layer base` section BEFORE skin definitions.

**Example from agency skin:**

```css
@layer base {
  /* ... existing base styles ... */

  /* ============================================
     CUSTOM ANIMATIONS (from Bolt designs)
     ============================================ */

  @keyframes blob {
    0%, 100% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes text-shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @keyframes pulse-slow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes button-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.5); }
    50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.8); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  /* Animation utility classes */
  .animate-blob {
    animation: blob 7s infinite;
  }

  .animate-gradient-x {
    animation: gradient-shift 8s ease infinite;
    background-size: 200% 200%;
  }

  .animate-text-shimmer {
    animation: text-shimmer 3s ease-in-out infinite;
    background-size: 200% auto;
  }

  .animate-pulse-slow {
    animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-button-glow {
    animation: button-glow 2s ease-in-out infinite;
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-rotate-slow {
    animation: rotate-slow 20s linear infinite;
  }
}
```

**Important:** These animations are global and can be used by any skin.

### Step 5: Create the Skin Definition

Add to `apps/cms/src/styles/globals.css` in the `@layer base` section, AFTER animations:

```css
/* ===========================================
   Skin: Your-Skin-Name
   =========================================== */

[data-skin="your-skin-name"] {
  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-serif: 'Merriweather', Georgia, serif;
  --letter-spacing: -0.02em;

  /* Light mode colours (RGB values, space-separated) */
  --color-background: 255 255 255;
  --color-foreground: 15 23 42;
  --color-muted: 100 116 139;
  --color-border: 226 232 240;
  --color-card: 248 250 252;
  --color-accent: 16 185 129;
  --color-accent-light: 52 211 153;

  /* Effects */
  --radius: 0.75rem;
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --border-width: 1px;

  /* Layout */
  --container-max: 90rem;

  /* Background (if needed) */
  --skin-bg-image: none;
  --skin-bg-size: auto;
  --skin-bg-position: center;
  --skin-bg-repeat: no-repeat;
}

[data-skin="your-skin-name"].dark {
  /* Dark mode colours */
  --color-background: 3 7 10;
  --color-foreground: 255 255 255;
  --color-muted: 156 163 175;
  --color-border: 31 41 55;
  --color-card: 17 24 39;
  --color-accent: 16 185 129;
  --color-accent-light: 52 211 153;

  /* Effects can be adjusted for dark mode if needed */
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3);
  --shadow-lg: 0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3);
}
```

### Step 6: Add Skin-Specific Component Styling

After the variable definitions, add component-specific overrides if needed:

```css
/* Typography overrides for your-skin-name */
[data-skin="your-skin-name"] h1,
[data-skin="your-skin-name"] h2,
[data-skin="your-skin-name"] h3,
[data-skin="your-skin-name"] h4,
[data-skin="your-skin-name"] h5,
[data-skin="your-skin-name"] h6 {
  font-family: var(--font-sans) !important;
  letter-spacing: var(--letter-spacing) !important;
  font-weight: 700 !important;
}

[data-skin="your-skin-name"] h1 {
  font-size: clamp(3rem, 8vw, 6rem) !important;
  line-height: 1.1 !important;
  font-weight: 900 !important;
}

[data-skin="your-skin-name"] h2 {
  font-size: clamp(2rem, 5vw, 3.75rem) !important;
  line-height: 1.2 !important;
}

/* Button overrides */
[data-skin="your-skin-name"] .btn,
[data-skin="your-skin-name"] button {
  border-radius: 9999px !important;
  font-weight: 600;
  padding-left: 2rem !important;
  padding-right: 2rem !important;
  transition: all 0.3s ease;
}

[data-skin="your-skin-name"] .btn-primary {
  background-color: rgb(var(--color-accent)) !important;
  color: rgb(var(--color-background)) !important;
}

[data-skin="your-skin-name"] .btn-primary:hover {
  background-color: rgb(var(--color-accent-light)) !important;
  transform: translateY(-2px);
}

/* Card overrides */
[data-skin="your-skin-name"] .card {
  background-color: rgb(var(--color-card)) !important;
  border: var(--border-width) solid rgb(var(--color-border)) !important;
  border-radius: var(--radius) !important;
  box-shadow: var(--shadow) !important;
}
```

### Step 7: Register the Skin in Settings

Add to `apps/cms/src/globals/Settings.ts` in the `defaultSkin` field options array:

```typescript
{
  label: 'Your Skin Name',
  value: 'your-skin-name',
},
```

### Step 8: Register in ThemeProvider

Add to `packages/ui/src/components/ThemeProvider.tsx` in the SKINS array:

```typescript
const SKINS = [
  'minimal',
  'editorial',
  'saas',
  'soft',
  'bold',
  'monochrome',
  'glass',
  'high-contrast',
  'neon-grid',
  'agency',
  'your-skin-name', // Add your new skin here
] as const
```

Add to `packages/ui/src/components/ThemeSwitcher.tsx` in SKIN_LABELS:

```typescript
const SKIN_LABELS: Record<Skin, string> = {
  minimal: 'Minimal',
  editorial: 'Editorial',
  saas: 'SaaS',
  soft: 'Soft',
  bold: 'Bold',
  monochrome: 'Monochrome',
  glass: 'Glass',
  'high-contrast': 'High Contrast',
  'neon-grid': 'Neon Grid',
  agency: 'Agency',
  'your-skin-name': 'Your Skin Name', // Add your new skin here
}
```

---

## 4) HOW SKINS ARE APPLIED (TECHNICAL DETAILS)

### Application Flow

1. **Server-side:** `apps/cms/src/app/(frontend)/layout.tsx` fetches Settings global
2. **Gets:** `defaultSkin` and `defaultMode` values from Settings
3. **Passes to:** `ThemeProvider` component as props
4. **ThemeProvider:** Sets `data-skin` attribute on `<html>` element via `useEffect`
5. **CSS:** Matches `[data-skin="value"]` selectors and applies variables
6. **Components:** Use semantic classes that reference the variables

### Component Class Usage

Components should ONLY use these semantic classes:

**Colours:**
- `bg-background` or `bg-[rgb(var(--color-background))]`
- `text-foreground` or `text-[rgb(var(--color-foreground))]`
- `text-muted` or `text-[rgb(var(--color-muted))]`
- `border-border` or `border-[rgb(var(--color-border))]`
- `bg-card` or `bg-[rgb(var(--color-card))]`
- `bg-accent` or `bg-[rgb(var(--color-accent))]`
- `bg-accent-light` or `bg-[rgb(var(--color-accent-light))]`

**Effects:**
- `rounded-[var(--radius)]`
- `shadow-[var(--shadow)]`
- `shadow-[var(--shadow-lg)]`
- `border-[length:var(--border-width)]`

**Typography:**
- `font-sans` (uses `var(--font-sans)`)
- `font-serif` (uses `var(--font-serif)`)
- `tracking-[var(--letter-spacing)]`

**Layout:**
- `max-w-[var(--container-max)]`

### Block Variants (Hybrid System - Temporary)

Some blocks currently have `variant` props (e.g., `variant: 'agency'`) for layout/structure differences. This is TEMPORARY during transition to pure skin system.

**Current approach (Hybrid):**
- Blocks check `variant` prop for special layout/structure
- Styling still comes from `[data-skin]` selectors

**Target approach (Pure Skin System):**
- NO variant checks in components
- ALL styling from `[data-skin]` selectors
- Blocks use only semantic classes

---

## 5) TESTING A NEW SKIN

After implementing a skin, follow these steps:

### 1. Restart Dev Server
```bash
make dev
```

### 2. Go to Admin
Navigate to: http://localhost:3000/admin

### 3. Update Settings
1. Go to **Globals** → **Settings**
2. Click **Appearance** tab
3. Select your new skin from **Default Skin** dropdown
4. Click **Save**

### 4. View Frontend
Navigate to: http://localhost:3000

### 5. Verify
- ✅ All pages reflect the new skin
- ✅ Colours match your design
- ✅ Typography is correct
- ✅ Animations work (if applicable)
- ✅ Effects (shadows, borders, radius) are correct

### 6. Toggle Dark Mode
Click the theme toggle in the header and verify dark mode works correctly.

---

## 6) COMMON MISTAKES TO AVOID

### ❌ Don't Do This:
```css
/* Wrong - hardcoded colours */
[data-skin="agency"] .btn {
  background-color: #10b981;
}
```

### ✅ Do This:
```css
/* Correct - uses variables */
[data-skin="agency"] .btn {
  background-color: rgb(var(--color-accent));
}
```

---

### ❌ Don't Do This:
```tsx
// Wrong - checking variant in component
if (variant === 'agency') {
  return <div className="bg-emerald-500">
}
```

### ✅ Do This:
```tsx
// Correct - using semantic classes
return <div className="bg-accent">
```

---

### ❌ Don't Do This:
```css
/* Wrong - RGB wrapper */
--color-accent: rgb(16, 185, 129);
```

### ✅ Do This:
```css
/* Correct - space-separated values */
--color-accent: 16 185 129;
```

---

### ❌ Don't Do This:
```css
/* Wrong - hex values */
--color-accent: #10b981;
```

### ✅ Do This:
```css
/* Correct - RGB values */
--color-accent: 16 185 129;
```

---

## 7) TROUBLESHOOTING

### Skin not applying

**Check:**
- `data-skin` attribute on `<html>` element in browser DevTools
- Skin name matches exactly (case-sensitive)
- Dev server was restarted after adding new skin
- Skin is registered in Settings.ts, ThemeProvider.tsx, and ThemeSwitcher.tsx

### Colours not working

**Check:**
- CSS variable format (space-separated RGB, no wrapper)
- You're using `rgb(var(--color-name))` in classes
- Both light and dark mode definitions exist
- No typos in variable names

### Animations not working

**Check:**
- @keyframes are in `@layer base` section
- Animation utility classes are defined
- Animation names match between keyframes and classes
- No syntax errors in CSS

### Dark mode not working

**Check:**
- `[data-skin="name"].dark` selector exists
- `next-themes` is applying `class="dark"` to `<html>`
- Both selectors are needed: `[data-skin="name"].dark`
- Dark mode colours are defined

---

## 8) CURRENT STATE vs TARGET STATE

### Current State (Hybrid - Being Fixed)
- ✅ Skins control colours, typography, effects via CSS variables
- ✅ Admin controls default skin in Settings
- ⚠️ Some blocks have hardcoded variant checks (e.g., HeroBlock agency variant)
- ⚠️ Animations partially in globals.css, some missing
- ❌ No user override capability (admin-only by design)

### Target State (Pure Skin System)
- ✅ ALL styling from `[data-skin]` selectors
- ✅ NO hardcoded variant checks in components
- ✅ ALL animations in globals.css
- ✅ Blocks use only semantic classes
- ✅ 100% scalable - new skins work everywhere automatically

---

## 9) NEXT STEPS: IMPLEMENTING OPTION B (HYBRID) FOR AGENCY SKIN

Now that you understand the system, let's fix the agency skin using Option B (Hybrid System):

### Task 1: Copy ALL Animations
Copy all @keyframes and animation classes from `/custom skins/globals.css` to `apps/cms/src/styles/globals.css` in the `@layer base` section.

### Task 2: Complete Agency Skin Variables
Ensure the agency skin in `globals.css` has all the correct colour values extracted from the Bolt design.

### Task 3: Add Agency-Specific Component Overrides
Add typography, button, and card overrides for the agency skin.

### Task 4: Test
1. Set default skin to "Agency" in Settings
2. Visit http://localhost:3000/agency
3. Verify it matches the Bolt design

### Task 5: Once Confirmed Working
Move to Option A (Pure Skin System) by removing hardcoded variant checks from block components.

---

## 10) SUMMARY: THE SCALABLE WORKFLOW

**For every new custom design:**

1. **Bolt.new** creates standalone page → Drop into `/custom skins/`
2. **Extract** colours, typography, animations, effects
3. **Create** skin definition in `globals.css`
4. **Register** in Settings.ts, ThemeProvider.tsx, ThemeSwitcher.tsx
5. **Test** by selecting skin in admin
6. **Result:** New skin works globally across all pages/blocks

**This workflow scales to hundreds of custom sites.**

---

## 11) RELATED DOCUMENTATION

- `FRONTEND_STRATEGY_SUMMARY.md` - High-level overview of frontend architecture
- `frontend-implementation-plan.md` - Complete implementation plan (Phases 0-4)
- `BOLT_COMPONENT_CONTRACT.md` - Rules for Bolt-generated components
- `PHASE_0_1_2_REVIEW.md` - Status of completed phases

**This document (SKIN_SYSTEM_GUIDE.md) is the CANONICAL guide for skin creation and overrides all others for this specific workflow.**

