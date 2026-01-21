# Payload v3 + Next.js Front‑end: Themes/Skins, Reusable Layout, Templates, and SEO (Implementation Brief)

Date: 2026-01-21

## 1) The problem (what we’re fixing)
You’ve got a custom Payload v3 CMS fork with strong admin enhancements, but the bundled Next.js front‑end is visually “starter‑plain”. You want:

- **Skin/theme presets** (not just light/dark) that can be switched to change the overall look/feel quickly.
- **SEO-first rendering** (canonical, robots, schema, Open Graph, Twitter, etc.) with a reusable, future-proof layout system.
- **Reusable components + layout primitives** (header/footer/containers/sections/sidebars) so templates and skins stay consistent.
- **Fix current layout/spacing issues** that make pages look broken or unfinished.

> Important: Payload itself doesn’t offer WordPress-style “front-end themes from the admin”. The right approach is to implement a **theme/skin system in your Next.js layer**, with optional management in Payload Admin via a Global. For SEO metadata management, Payload has an official SEO plugin you can enable per collection/global and render on the front-end.  
Refs:  
- Payload SEO plugin docs: https://payloadcms.com/docs/plugins/seo  
- Official SEO plugin repo: https://github.com/payloadcms/plugin-seo  
- Official Payload Website Template repo: https://github.com/payloadcms/template-website  
- Vercel template page: https://vercel.com/templates/next.js/payload-website-starter

---

## 2) Goals
### Must-haves
1. **Skin presets** (e.g., 6–10) that affect:
   - Colour system (primary/accent, neutrals, borders)
   - Typography (font stacks, headings, body sizing, prose)
   - Surface style (radius, shadow, outlines)
   - Spacing density (comfortable vs compact)
   - Component styling (buttons/cards/forms)
2. **Light + Dark modes remain**, and *each skin* supports both.
3. **Switching**:
   - User-level switcher (cookie/localStorage) **and**
   - Optional “Site default skin” controlled via Payload Admin (Global), with overrides.
4. **SEO architecture**:
   - One shared **SEO generator** that outputs metadata + JSON-LD based on page type.
   - Canonicals, robots, OpenGraph/Twitter, structured data, sitemap, RSS.
   - Zero “missing title/description” situations (sensible fallbacks).
5. **Reusable layout**:
   - Shared Layout wrapper (header/footer).
   - Global Container + Section primitives (consistent spacing & max-width).
   - Optional sidebar layout (blog/doc style).
6. **Fix layout issues shown in screenshots** (section 4 below).

### Nice-to-haves
- Per-page “style variant” (e.g., hero variant A/B, background style) in Blocks.
- Admin “Preview skin” for editors.
- Tailwind + design tokens approach that makes future skins trivial to add.

---

## 3) Recommended approach (how to do skins properly)
### 3.1 Choose a theming strategy
You want “skins” without rewriting every component. The cleanest pattern is:

- **CSS variables as the source of truth** (design tokens)
- Tailwind reads variables (or uses them via arbitrary values)
- A skin is **just a different token set**
- Light/dark is **another dimension**, not a separate theme system

Concretely:
- Use `data-skin="minimal"` and `data-mode="light|dark"` (or use `class="dark"` for mode)
- Tokens live at `:root` / `[data-skin="X"]` / `.dark[data-skin="X"]`

Example structure:
- `app/globals.css`
  - `:root { --bg: ...; --fg: ...; --primary: ...; ... }`
  - `[data-skin="editorial"] { ... }`
  - `.dark[data-skin="editorial"] { ... }`

Then your components always use tokens:
- `bg-[hsl(var(--bg))]`
- `text-[hsl(var(--fg))]`
- `border-[hsl(var(--border))]`

#### Why this beats “duplicate Tailwind configs”
- Skins become **data**, not code.
- You avoid “copy-paste component variants per theme”.

### 3.2 Implement switching (site default + user override)
**Data sources**
1. **Site default skin** (Payload Global): `siteSettings.defaultSkin`, `siteSettings.defaultMode`.
2. **User override** (cookie/localStorage): `skin`, `mode`.

**Priority**
1. User override
2. Payload Global default
3. System preference (for mode only, if not set)

**Implementation**
- A small script in `<head>` (or Next.js `layout.tsx`) that sets `document.documentElement.dataset.skin = ...` before paint to prevent FOUC.
- Use `next-themes` if you want a polished mode switcher, but keep skins separate (or store them in the same provider).

### 3.3 “Skin presets” via reusable libraries (fast win)
If you want ready-made tasteful palettes quickly, you have two solid options:

#### Option A: daisyUI (themes out-of-the-box)
- daisyUI ships many theme palettes and supports `data-theme="..."` on any element.
- You can map `data-skin` → `data-theme` or just use daisyUI’s `data-theme` directly.
- It integrates well with `next-themes` for light/dark and multi-theme switching.

Useful references:
- daisyUI themes docs: https://daisyui.com/docs/themes/
- Example repo combining `next-themes` + daisyUI theme switching: https://github.com/raaaahman/next-themes-daisyui-switcher

#### Option B: shadcn/ui + CSS variable presets
- shadcn uses CSS variables and Tailwind, perfect for token-based skins.
- You create multiple token sets (skins), keep components identical.

Useful reference:
- Multi-theme with Next.js + Tailwind + shadcn: https://jitendra.dev/build-dynamic-themes-in-nextjs-with-tailwind-shadcn-ui

**Recommendation:** If you want “lots of skins fast”, start with **daisyUI**.  
If you want maximum control and a design-system feel, start with **shadcn + tokens**.

---

## 4) Current layout issues (from your screenshots) and fixes
### 4.1 Home page issues (screencapture-localhost-3000…)
Observed:
- Hero section is **overly tall** and visually empty.
- “Latest Posts” card area looks **mis-sized** and “floating” on a wide canvas.
- Large dead-space gaps before the footer.
- Page feels like it lacks a consistent **container width** and **vertical rhythm**.

Fixes:
1. Introduce a `Container` primitive with max width:
   - e.g. `max-w-6xl` or `max-w-7xl` and consistent horizontal padding.
2. Introduce `Section` primitive for spacing:
   - e.g. `py-12 md:py-16` default.
3. Hero:
   - Replace any `min-h-screen` with a bounded range (e.g. `py-20` + optional background).
   - Use a proper hero layout: title, subtitle, CTAs, optional image/illustration.
4. Cards grid:
   - Use a responsive grid, fixed card max width, consistent gap.
5. Footer spacing:
   - Ensure `main` has no accidental `margin-bottom` or `min-height` pushing footer down.
   - Use `min-h-[calc(100vh-HEADER-FOOTER)]` only if needed.

### 4.2 About page issues
Observed:
- Sections are widely spaced with inconsistent alignment.
- Large unused whitespace to the right; content feels “stuck” left.
- “Join our community” banner appears narrow and misaligned relative to other sections.
- “Core Values” panel looks like it’s not following a consistent container width.

Fixes:
- Ensure every section uses the same `Container`.
- Standardise headings and spacing via a `PageHeader` component and `Section` wrappers.
- Make promo banners full-width within the container, or deliberately “break out” to full-bleed with a consistent pattern.

### 4.3 Article page issues
Observed:
- Typography is readable but bland; lots of empty lower space.
- Footer separation feels disconnected from main content.

Fixes:
- Use a `Prose` component (Tailwind `prose` with your token colours).
- Add related posts, author bio, table of contents (optional) to reduce emptiness.
- Keep the same `Container` and `Section` primitives so the footer is visually anchored.

---

## 5) Front-end templates (Blocks) + reuse
Even if you’ve already built Blocks, it’s worth standardising how they render:

### 5.1 Template types (page “layout”)
Implement a small set of page shells (not page designs):
- **Standard page** (header → content)
- **Landing page** (hero + sections, wide CTA patterns)
- **Blog index** (list + filters)
- **Blog post** (prose + meta + related)
- **Archive/listing** (grid/list + pagination)
- **Contact** (form + map, optional)

Each shell should:
- Use shared layout primitives
- Use the same SEO generator
- Render Blocks consistently

### 5.2 Block rendering rules (consistency)
- Every block supports:
  - `backgroundStyle` (default / subtle / full-bleed)
  - `spacing` (default/compact/airy)
  - `containerWidth` (narrow/standard/wide)
- Blocks should not “free style” spacing; they rely on `Section` defaults.

---

## 6) SEO: complete plan (Next.js + Payload)
### 6.1 Where SEO data comes from
You have two streams:
1. **Author-managed meta** via Payload SEO plugin (title, description, image, noindex, canonical override, etc.)
   - Docs: https://payloadcms.com/docs/plugins/seo
   - Repo: https://github.com/payloadcms/plugin-seo
2. **Computed SEO** from templates/page type:
   - Article schema, breadcrumbs, website schema, organisation schema, etc.
   - Canonical derived from slug + site URL.
   - Robots rules based on environment + doc flags.

### 6.2 Next.js Metadata API (App Router)
Use Next.js App Router `generateMetadata()` per route type, pulling:
- Page/post data from Payload
- `meta` group from plugin-seo
- Global site settings (site name, default OG image, social handles)

Output:
- `title` (template: “Page Title | Site Name”)
- `description`
- `alternates.canonical`
- `openGraph`
- `twitter`
- `robots`
- `icons`
- `verification` (Search Console / Bing)
- `metadataBase`

### 6.3 JSON-LD (schema)
Add a tiny library in `lib/seo/schema.ts` that returns JSON-LD objects per page type:
- **WebSite** + SearchAction (optional)
- **Organization** (logo, socials)
- **Article / BlogPosting** (headline, image, author, datePublished, dateModified)
- **BreadcrumbList**
- **FAQPage** (for FAQ blocks)

Render JSON-LD via a `<script type="application/ld+json">` in the template’s layout.

### 6.4 Sitemap + robots.txt
- Generate sitemap from Payload collections (pages/posts/categories).
- Include image sitemap optionally if media is strong.
- robots.txt:
  - Block non-prod environments.
  - Respect per-page `noindex` from SEO plugin.

### 6.5 Performance / SEO fundamentals
- SSR/SSG appropriately, avoid client-only rendering for main content.
- Ensure headings are semantic (one H1).
- Avoid layout shift: define image sizes, use Next/Image.
- Ensure internal links are crawlable.
- Make sure the dark/light + skins do not break contrast and accessibility.

---

## 7) Suggested “skin preset” lineup (clean but not bland)
Below are presets that stay modern, professional, and SEO-friendly (good readability). Each is just token changes + a few component-level tweaks.

1. **Minimal** (default)
   - Neutral greys, soft borders, slight radius.
2. **Editorial**
   - Serif headings + strong typographic rhythm, wider prose, subtle underline links.
3. **SaaS**
   - Higher contrast, bolder primary colour, modern gradients in hero, sharper buttons.
4. **Soft**
   - Pastel accents, larger radius, gentle shadows, friendly cards.
5. **Bold**
   - Strong primary + accent, thicker borders, slightly condensed headings.
6. **Monochrome**
   - Very limited palette, heavy emphasis on spacing and type.
7. **Glass**
   - Semi-transparent surfaces, blur, good for dark mode (use carefully for performance).
8. **High-Contrast Accessibility**
   - Meets WCAG AA/AAA more aggressively, larger focus rings and clearer borders.

**Implementation note:** keep component structure constant. Skins should not require new components—only token changes and a handful of safe “variant” toggles (e.g., button style).

---

## 8) Reusable component inventory (deliverables)
### Layout primitives
- `Layout` (Header + Footer + main)
- `Container`
- `Section`
- `PageHeader`
- `SidebarLayout` (optional)

### Global UI
- `Header` (nav, search optional, mode/skin switcher)
- `Footer` (links, socials, legal)
- `ThemeSwitcher` (skin + light/dark)
- `Breadcrumbs`
- `Pagination`
- `Card`, `Button`, `Badge`, `Input`, `Select`

### Content
- `Prose` wrapper for rich text
- `Media` component (Payload Media → Next/Image)
- `BlocksRenderer` (your existing blocks, but standardised)

---

## 9) Suggested codebases to borrow patterns from (GitHub links)
### Payload official template
- https://github.com/payloadcms/template-website  
(Use as reference for production-ready structure and Payload integration.)

### Payload SEO plugin
- https://github.com/payloadcms/plugin-seo  
(Use to manage meta fields in Admin; your front-end still renders them.)

### Theme switching patterns
- next-themes + daisyUI switcher example:
  - https://github.com/raaaahman/next-themes-daisyui-switcher
- daisyUI themes docs:
  - https://daisyui.com/docs/themes/
- shadcn multi-theme guide:
  - https://jitendra.dev/build-dynamic-themes-in-nextjs-with-tailwind-shadcn-ui

---

## 10) Implementation phases (recommended)
### Phase 1 — Layout + spacing fixes (fast, unblocks everything)
- Add `Container` + `Section` primitives.
- Refactor Home/About/Article to use them.
- Fix hero height and footer spacing.
- Add `Prose` wrapper for articles.

### Phase 2 — Skin system foundation
- Implement token-based skins (6 initial skins).
- Add user switcher (persisted).
- Add Payload Global `siteSettings` with `defaultSkin` and `defaultMode`.
- Ensure no FOUC (inline head script).

### Phase 3 — SEO system
- Install/enable Payload SEO plugin fields where needed.
- Build `generateMetadata()` for each page type.
- Build schema generator + JSON-LD injection.
- Add sitemap + robots.

### Phase 4 — Templates + Blocks hardening
- Standardise block spacing + backgrounds.
- Add a few “page shells” (landing, article, listing).
- Add components for common patterns (feature grids, CTA strips, testimonials, FAQ).

---

## 11) Acceptance criteria (definition of done)
- Switching skins updates the entire site look without breaking layout.
- Light/dark works for every skin; contrast is acceptable.
- Home/About/Article match consistent spacing and alignment.
- Every page has:
  - title, meta description, canonical
  - OG/Twitter meta (with fallbacks)
  - robots (respects noindex)
  - correct JSON-LD for its type
- Shared header/footer across all templates.
- Lighthouse/Pagespeed shows strong SEO + accessibility signals.

---

## 12) Notes / questions to resolve (can be answered later)
- App Router or Pages Router?
- Tailwind already in use? (appears yes)
- Are you using MDX, rich text, or Lexical/Slate?
- Do you want skins editable by admins, or just selectable from presets? (recommended: presets only)

