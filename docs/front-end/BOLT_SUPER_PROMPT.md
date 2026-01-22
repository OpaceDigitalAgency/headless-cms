# BOLT.NEW — Dynamic Skin + Component Contract (Authoritative Prompt)

Use this prompt **every time** you ask Bolt.new to generate components, blocks, templates, or UI skins for this project.

This is a **hard contract**, not guidance.

---

## 🔒 Component Scope (NON‑NEGOTIABLE)

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

This component must be safe to drop into:
- `packages/ui`
- `packages/templates`
- Astro builds
- CMS previews

If you break these rules, the output is invalid.

---

## 🎨 Design Brief

Design a **[Page / Component Name]** with a **[Style Name – e.g. Cyberpunk, Minimalist, Editorial, Agency]** aesthetic.

The goal is **premium, experimental, modern UI** that would not look out of place on Awwwards.

Push visual ambition hard — but stay within the architectural rules below.

---

## ⚙️ CRITICAL TECH STACK

You MUST comply with all of the following:

- **Tailwind CSS v4 (LATEST ONLY)**
  - Use Tailwind v4 syntax
  - Do NOT use `@config`
  - Do NOT rely on deprecated utilities
- **Modern CSS is REQUIRED**
  - `backdrop-filter`
  - `mask-image`
  - `mix-blend-mode`
  - `filter`
  - layered gradients
  - transforms (2D + 3D)
- **Animations are expected**
  - entrance animations
  - hover / focus micro-interactions
  - layered motion (foreground + background)

---

## ✨ Animation & Motion Rules (PUSH HARD)

This UI should feel **alive**, tactile, and responsive.

Use:
- `group-hover` chains
- `transition-all duration-500 ease-out`
- subtle scaling, lifting, glow, blur, parallax illusion
- opacity + transform combinations
- staggered entrance effects (`animate-in`, `fade-in`, `slide-in`)

**DO NOT**:
- Add animation libraries
- Use JS-driven animation unless unavoidable

### Custom Animations
If custom keyframes or utilities are required:
- Apply class names only
- Add a short comment at the end of the file:

```ts
// Required global CSS:
// - keyframes: shimmer, floatSlow
// - classes: gradient-text-hero
```

---

## 🧠 Theme & Skin Architecture (ABSOLUTE RULES)

### ❌ Forbidden
- NO hardcoded colours:
  - `bg-black`
  - `text-white`
  - `bg-slate-*`
  - `bg-zinc-*`
  - `text-gray-*`
- NO `dark:` modifiers
- NO inline `style` (except for CSS variables from props)

### ✅ Required Semantic Tokens

Use ONLY system variables:

**Backgrounds**
- `bg-base` — main surface
- `bg-card` — cards / panels
- `bg-muted` — secondary surfaces

**Text**
- `text-foreground` — primary
- `text-muted` — secondary
- `text-accent` — highlights

**Borders**
- `border-border`
- `border-input`

### Accent Colours
Do NOT pick colours manually.

If something needs emphasis:
- `text-accent`
- `bg-accent`

Accent meaning is defined globally.

---

## 🌈 Gradients (MANDATORY PATTERN)

DO NOT use Tailwind colour chains such as:
- `from-green-400`
- `to-purple-600`

Instead:
- Use semantic utility classes:
  - `.gradient-text-hero`
  - `.gradient-bg-section`
  - `.gradient-border-card`

If a gradient is required, **describe the CSS** briefly in a comment.

---

## ♿ Accessibility (REQUIRED)

- Use semantic HTML
- Correct heading hierarchy
- `alt` text for images
- Explicit button types
- ARIA labels where interaction is non-obvious

Visual ambition must NOT break usability.

---

## 📦 Output Contract (STRICT)

- **Return a single `.tsx` file only**
- **Named export only**
  ```ts
  export function ComponentName(...) {}
  ```
- **NO markdown**
- **NO explanations**
- **NO comments except required CSS notes**
- Tailwind classes ONLY
- No CSS files
- No `<style>` blocks

The output must be ready to paste directly into the repo.

---

## 🧪 Mental Checklist Before Output

Before responding, verify:

- No app logic
- No data fetching
- No routing
- No hardcoded colours
- Fully theme-safe
- Animation-rich but CSS-only
- Accessible
- Drop-in compatible

If any item fails, fix it before responding.

---

## 🚀 Final Instruction

This is a **high‑end, motion‑first UI system**.

Be bold.
Be precise.
Respect the contract.

Output only the final TSX file.
