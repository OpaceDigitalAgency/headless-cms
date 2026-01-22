# BOLT.NEW — Retro Services Page (Fully Instantiated Prompt)

Use this prompt **as-is** when asking Bolt.new to generate a complete retro-style services page.

This file includes:
- The full **Dynamic Skin + Component Contract**
- A concrete **build brief** (no placeholders)
- Clear visual, structural, and behavioural intent

---

## 🔒 Component Scope (NON-NEGOTIABLE)

You are generating a **presentational React component only**.

You MUST follow these rules exactly:

- **Props-only**: accept props and render UI. No data fetching.
- **No runtime side effects**:
  - No `fetch`
  - No `useEffect` for data
  - No `localStorage`, `sessionStorage`, or cookies
  - No `process.env`
- **No routing or app logic**:
  - No `next/navigation`
  - No `useRouter`
  - No server actions
- **No new dependencies**
- **No CMS or app imports**
- **No global state**
- **No assumptions about where the component is used**

The output must be safe to drop into shared UI packages, Astro builds, and CMS previews.

---

## 🧱 WHAT TO BUILD (EXPLICIT)

### Component
**Marketing services page** (single-page layout component)

### Purpose
A retro-inspired services page for a digital / creative agency, designed to feel nostalgic but premium — playful, bold, and intentionally stylised rather than kitsch.

The page should showcase:
- Core services
- Social proof
- Clear calls to action

---

## 🎨 Visual Style

**Style:** Retro-futurist / 90s tech / early web nostalgia — done tastefully

Visual cues to draw from:
- Soft neon accents
- Subtle scanline or grain effects
- Rounded UI panels
- Pixel or terminal-inspired dividers
- Bold typography contrast

This should feel like a modern reinterpretation of retro design, not a parody.

---

## 🧩 Page Structure (REQUIRED SECTIONS)

Build the page using clear visual sections:

1. **Hero Section**
   - Bold headline
   - Subheading
   - Primary CTA button
   - Secondary text link
   - Abstract animated background or subtle motion layer

2. **Services Grid**
   - 3–6 service cards
   - Icon or abstract graphic per service
   - Title + short description
   - Hover interactions (lift, glow, scanline sweep)

3. **Testimonials**
   - 2–4 testimonials
   - Quote, name, company
   - Card-based or marquee-style presentation
   - Gentle motion (fade, slide, float)

4. **Process / How It Works**
   - Simple step-based layout
   - Retro divider elements
   - Clear flow without diagrams

5. **Call to Action**
   - High-contrast section
   - Strong copy
   - Single focused CTA

---

## ⚙️ CRITICAL TECH STACK

You MUST use:

- **Tailwind CSS v4 (latest)**
  - No `@config`
  - No deprecated syntax
- **Modern CSS features**
  - `backdrop-filter`
  - `mask-image`
  - `mix-blend-mode`
  - layered gradients
  - transforms (2D + subtle 3D)

---

## ✨ Animation & Motion (PUSH HARD)

This page should feel **alive** and tactile.

Use:
- `group-hover` interaction chains
- `transition-all duration-500 ease-out`
- subtle scale + lift effects
- glow, blur, grain, or scanline illusions
- staggered entrance animations (`animate-in`, `fade-in`, `slide-in`)

DO NOT:
- Add animation libraries
- Use JS-driven animation unless unavoidable

### Custom Animations
If required:
- Apply class names only
- Add a short note at the end of the file:

```ts
// Required global CSS:
// - keyframes: scanlineSweep, neonPulse
// - classes: retro-grain, gradient-text-retro
```

---

## 🧠 Theme & Skin Architecture (ABSOLUTE RULES)

### ❌ Forbidden
- NO hardcoded colours
- NO greyscale utility colours
- NO `dark:` modifiers
- NO inline styles (except CSS variables from props)

### ✅ Semantic Tokens ONLY

**Backgrounds**
- `bg-base`
- `bg-card`
- `bg-muted`

**Text**
- `text-foreground`
- `text-muted`
- `text-accent`

**Borders**
- `border-border`
- `border-input`

Accent colour meaning is defined globally — do not invent colours.

---

## 🌈 Gradients

DO NOT use Tailwind colour chains.

Use semantic utility classes instead:
- `.gradient-bg-retro`
- `.gradient-text-retro`
- `.gradient-border-retro`

Briefly describe required CSS in a comment if used.

---

## ♿ Accessibility (REQUIRED)

- Semantic HTML structure
- Logical heading hierarchy
- Alt text for images
- Proper button types
- ARIA labels where interaction is unclear

---

## 📦 OUTPUT CONTRACT (STRICT)

- Output a **single `.tsx` file only**
- Use a **named export**
- No markdown
- No explanations
- No comments except required CSS notes
- Tailwind classes only
- No `<style>` blocks

The file must be ready to paste directly into the repository.

---

## 🧪 FINAL CHECK

Before responding, verify:
- No data access
- No routing
- No hardcoded colours
- Fully theme-safe
- Animation-rich
- Accessible
- Drop-in compatible

---

## 🚀 FINAL INSTRUCTION

Build a **retro-inspired, motion-rich services page** that feels nostalgic, confident, and modern.

Be expressive.
Be controlled.
Respect the contract.

Output only the final TSX file.
