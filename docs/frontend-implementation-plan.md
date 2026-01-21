# Frontend Implementation Plan (Bundled Next.js + Astro + Bolt)

Date: 2026-01-21

This plan assumes the canonical frontend is the bundled Next.js app in `apps/cms`, with Astro as an optional static alternative. Bolt is used only as a UI/component generator.

## 1) Current State (Observed)

- Two Next.js apps exist: `apps/cms` (bundled with Payload) and `apps/web` (separate).
- `make dev` starts both Next apps, so both are actively used today.
- Block rendering and UI are duplicated in both apps, which guarantees drift.
- The SEO plugin is installed and configured in `apps/cms/src/payload.config.ts`, but front-end rendering of meta/schema/sitemap/robots is not implemented.
- A theme/skin system is described in `docs/payload-frontend-themes-brief.md` but not implemented.

## 2) Decision (Lock This In)

- Canonical frontend: `apps/cms` only.
- Astro: optional, but must consume shared UI to avoid drift.
- `apps/web`: freeze or remove once the shared UI package is in place.

## 3) Phase Plan

### Phase 0 — Remove Frontend Drift

Goal: single UI source of truth.

- Create or reuse a shared UI package (prefer `packages/templates` or `packages/ui`).
- Move block components, templates, header/footer, and layout primitives into the shared package.
- Update `apps/cms` to import from the shared package.
- If Astro is kept, update it to import from the shared package.
- Freeze `apps/web` (no new UI edits) or remove it after verification.

### Phase 1 — Layout + Skin System (Baseline Sites)

Goal: usable, good-looking default skins that replace the current plain UI.

- Implement `Container`, `Section`, `PageHeader`, and `Prose` primitives.
- Implement token-based skins (CSS variables) as described in the brief.
- Add a skin + mode switcher:
  - Default from Payload Global
  - Optional user override via localStorage or cookie
  - No FOUC (inline theme script in layout)
- Ensure all shared UI uses tokens (no hard-coded colors).

### Phase 2 — SEO Baseline (Must-Have)

Goal: SEO-complete frontend with Payload SEO plugin data.

- Render SEO plugin fields in `generateMetadata` for each route type.
- Add JSON-LD (WebSite, Organization, Article, Breadcrumbs).
- Add `sitemap.xml` and `robots.txt` routes (use `Settings.robotsTxt` as override).
- Add canonical URLs and OG/Twitter defaults with fallbacks.

### Phase 3 — Bolt Integration (Custom Designs)

Goal: Bolt outputs components that drop into the shared UI without data logic.

- Define a strict component contract for:
  - Blocks (props only, no data fetching)
  - Templates (props only)
  - Header/Footer (props only)
- Bolt generates React components using Tailwind and that contract.
- Components are copied into the shared UI package and wired by `RenderBlocks`.

### Phase 4 — Astro Alignment (Optional)

Goal: Astro keeps parity without rebuilding UI.

- Reuse shared UI package in Astro.
- Ensure Astro uses the same block/template contract.

## 4) Order of Work (Recommended)

1. Phase 0 (remove drift)
2. Phase 1 (skins + layout)
3. Phase 2 (SEO baseline)
4. Phase 3 (Bolt integration)
5. Phase 4 (Astro optional parity)

## 5) Why This Order

- Bolt needs a stable component contract and shared UI.
- Skins + SEO should be stable, shared defaults for all basic sites.
- Bolt is an add-on, not the base system.

## 6) Risks to Avoid

- Updating `apps/web` UI instead of `apps/cms` (drift risk).
- Letting Bolt generate data-fetching or Next-specific code (breaks reuse).
- Skipping token-based theming (locks you into one design).

---

## 7) EXPANDED DETAILS (Added 2026-01-21)

### 7.1 Current State: Detailed Audit

**Block Component Drift:**
- `apps/cms/src/components/blocks/` has **20 block components** (Hero, Content, Media, CTA, Archive, Form, Gallery, Grid, Timeline, Quote, Features, Stats, LogoCloud, Testimonials, FAQ, Pricing, Team, Embed, Spacer, HTML).
- `apps/web/src/components/blocks/` currently mirrors the same **20 block components**.
- **Result:** No immediate parity gaps today, but duplication still creates drift risk if either side evolves independently.

**Route Parity:**
- Both apps have nearly identical route structures
- `apps/cms` has one additional route: `/events` (not in `apps/web`)
- Both have preview routes, revalidation endpoints, and dynamic collection routes

**SEO Implementation Gaps:**
- ✅ `@payloadcms/plugin-seo` installed and configured in `payload.config.ts`
- ✅ Basic `generateMetadata()` exists in both apps (title, description, basic OG)
- ❌ **No `sitemap.xml` route** in either app
- ❌ **No `robots.txt` route** in either app
- ❌ **No JSON-LD schema** (WebSite, Organization, Article, Breadcrumbs)
- ❌ **No canonical URLs** in metadata
- ❌ **No Twitter Card metadata** (only basic OG)
- ❌ **No fallback OG images** from Settings global
- ❌ Settings global has `robotsTxt` field but it's not rendered

**Shared Packages Status:**
- `packages/templates` exists but only contains **page-level templates** (LandingTemplate, ArticleTemplate, etc.)
- **No shared block components** - all blocks are duplicated per app
- **No shared layout primitives** (Container, Section, PageHeader, Prose)
- **No shared theme/skin system**

### 7.2 Third-Party Resources Assessment

**Payload Official Templates** (https://github.com/payloadcms/payload/tree/main/templates)

Available templates to review:
- `ecommerce` - Full e-commerce with products, cart, checkout
- `website` - Production-ready website template with SEO, blocks, and best practices
- `blank` - Minimal starter
- `with-postgres`, `with-vercel-postgres` - Database integration examples

**Recommendation:**
- ✅ **Review `website` template** - likely has production-ready SEO implementation (sitemap, robots, JSON-LD)
- ✅ **Review `ecommerce` template** - has product schema, cart blocks, checkout flow we're missing
- ⚠️ Don't wholesale merge - cherry-pick patterns and components

**Payload Official Plugins** (https://github.com/payloadcms/payload/tree/main/packages)

Already installed:
- ✅ `@payloadcms/plugin-seo` - Installed and configured
- ✅ `@payloadcms/plugin-redirects` - Installed
- ✅ `@payloadcms/plugin-search` - Installed
- ✅ `@payloadcms/plugin-form-builder` - Installed
- ✅ `@payloadcms/plugin-nested-docs` - Installed

Not installed but potentially useful:
- ❓ `@payloadcms/plugin-cloud-storage` - Already installed for S3
- ❓ Additional plugins as needed

**SEO Plugin Documentation** (https://payloadcms.com/docs/plugins/seo)

The plugin provides:
- Meta title, description, image fields per document
- Preview snippets in admin
- Auto-generation functions
- **But:** Frontend rendering is YOUR responsibility

**What we need to implement:**
1. Render `meta.title`, `meta.description`, `meta.image` in `generateMetadata()`
2. Add canonical URLs
3. Add Twitter Card metadata
4. Add JSON-LD schema based on document type
5. Generate `sitemap.xml` from all published documents
6. Generate `robots.txt` (with Settings.robotsTxt override)

**Theme Implementation Options**

**Option A: daisyUI** (https://daisyui.com/docs/themes/)
- **Pros:** 30+ pre-built themes, fast implementation, `data-theme` attribute switching
- **Cons:** Less control, adds dependency, opinionated component styles
- **Best for:** Quick multi-theme sites, prototyping
- **Example:** https://github.com/raaaahman/next-themes-daisyui-switcher

**Option B: shadcn/ui + CSS Variables** (https://jitendra.dev/build-dynamic-themes-in-nextjs-with-tailwind-shadcn-ui)
- **Pros:** Full control, token-based, Tailwind-native, no runtime overhead
- **Cons:** More setup, need to define all tokens manually
- **Best for:** Custom design systems, maximum flexibility
- **Approach:** Define CSS variables per theme, use Tailwind arbitrary values

**Option C: Custom Token System** (as described in `payload-frontend-themes-brief.md`)
- **Pros:** Tailored to your needs, no external dependencies, lightweight
- **Cons:** Most work upfront
- **Best for:** Long-term maintainability, specific brand requirements

**Recommendation:**
- Start with **Option C (Custom Token System)** for baseline
- Tokens defined in `apps/cms/src/app/globals.css`
- Use `data-skin` and `data-mode` attributes
- Store defaults in Settings global
- User overrides via cookie/localStorage
- This gives you the foundation; you can add daisyUI later for rapid theme expansion

### 7.3 SEO Implementation Checklist

**Files to Create in `apps/cms/src/app/(frontend)/`:**

1. **`sitemap.ts`** (Next.js App Router sitemap route)
   ```typescript
   // Generate sitemap from all published pages, posts, etc.
   // Use Payload API to fetch all documents
   // Return MetadataRoute.Sitemap format
   ```

2. **`robots.ts`** (Next.js App Router robots route)
   ```typescript
   // Check Settings.robotsTxt for custom content
   // Fall back to default rules
   // Block /admin, /api, /preview in production
   ```

3. **`lib/seo/schema.ts`** (JSON-LD schema generators)
   ```typescript
   // generateWebsiteSchema()
   // generateOrganizationSchema()
   // generateArticleSchema()
   // generateBreadcrumbSchema()
   // generateFAQSchema() - for FAQ blocks
   ```

4. **Update all `generateMetadata()` functions** in route files:
   - Add `alternates.canonical`
   - Add `twitter` metadata
   - Add fallback OG image from Settings
   - Add proper `robots` directives
   - Pull from SEO plugin `meta` fields

5. **Add JSON-LD to layouts/pages:**
   - Inject schema scripts in appropriate templates
   - Use `<script type="application/ld+json">`

**Priority Order:**
1. `sitemap.ts` - Critical for SEO
2. `robots.txt` - Critical for crawl control
3. Enhanced `generateMetadata()` - Improves all pages
4. JSON-LD schema - Enhances rich results
5. Breadcrumbs component - UX + schema

### 7.4 Shared UI Package Structure

**Proposed: `packages/ui` (new package)**

```
packages/ui/
├── src/
│   ├── blocks/              # All block components (21 total)
│   │   ├── HeroBlock.tsx
│   │   ├── ContentBlock.tsx
│   │   ├── ... (all 21 blocks)
│   │   └── index.ts
│   ├── primitives/          # Layout primitives
│   │   ├── Container.tsx
│   │   ├── Section.tsx
│   │   ├── PageHeader.tsx
│   │   ├── Prose.tsx
│   │   └── index.ts
│   ├── components/          # Shared components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Breadcrumbs.tsx
│   │   ├── ThemeSwitcher.tsx
│   │   └── index.ts
│   ├── RenderBlocks.tsx     # Single block renderer
│   └── index.ts
├── package.json
└── tsconfig.json
```

**Migration Steps:**
1. Create `packages/ui` package
2. Copy all 21 blocks from `apps/cms/src/components/blocks/` to `packages/ui/src/blocks/`
3. Create primitives (Container, Section, etc.)
4. Update `apps/cms` to import from `@repo/ui`
5. Update `apps/astro` to import from `@repo/ui` (if kept)
6. Remove `apps/web` (see section 7.5)

### 7.5 Decision Matrix: When to Use What

| Scenario | Approach | Rationale |
|----------|----------|-----------|
| **Quick marketing site** | Baseline skins (Phase 1) | Fast, professional, no custom design needed |
| **Brand-specific site** | Baseline + custom skin | Define new token set, reuse all components |
| **Complex custom UI** | Bolt → shared UI | Generate components, copy to `packages/ui`, wire to data |
| **E-commerce** | Review Payload ecommerce template | Cherry-pick product blocks, cart, checkout |
| **Blog/content-heavy** | Astro + shared UI | Maximum performance, zero JS |
| **Interactive app** | Next.js (apps/cms) + shared UI | SSG + ISR, client interactivity |

**Execution Order:**
1. **Complete `payload-frontend-themes-brief.md` first** (Phase 0-2)
   - Establishes shared UI package
   - Implements baseline skins
   - Implements SEO baseline
   - Creates stable foundation

2. **Then `bolt_payload_cms_integration_assessment.md`** (Phase 3)
   - Bolt targets the stable shared UI package
   - Component contract is defined
   - No risk of breaking baseline sites

**Why this order:**
- Bolt needs a stable target (shared UI package)
- Baseline skins provide fallback for all sites
- SEO must work regardless of design approach
- Custom Bolt designs are additive, not foundational

### 7.6 Concrete Next Steps (Prioritised)

**Immediate (Do First):**
1. ✅ Review Payload `website` template for SEO patterns
2. ✅ Create `packages/ui` package structure
3. ✅ Migrate all 21 blocks from `apps/cms` to `packages/ui`
4. ✅ Create layout primitives (Container, Section, PageHeader, Prose)
5. ✅ Update `apps/cms` to import from `@repo/ui`
6. ✅ Remove `apps/web` (see section 8 below)

**Phase 1 (Baseline):**
7. ✅ Implement token-based skin system in `apps/cms/src/app/globals.css`
8. ✅ Create 6-8 skin presets (Minimal, Editorial, SaaS, Soft, Bold, Monochrome, Glass, High-Contrast)
9. ✅ Add ThemeSwitcher component
10. ✅ Wire Settings global to provide default skin/mode
11. ✅ Add FOUC prevention script

**Phase 2 (SEO):**
12. ✅ Create `apps/cms/src/app/(frontend)/sitemap.ts`
13. ✅ Create `apps/cms/src/app/(frontend)/robots.ts`
14. ✅ Create `apps/cms/src/lib/seo/schema.ts` with JSON-LD generators
15. ✅ Update all `generateMetadata()` functions with full SEO fields
16. ✅ Add JSON-LD injection to page templates

**Phase 3 (Bolt):**
17. ✅ Define Bolt component contract (props-only, no data fetching)
18. ✅ Create Bolt prompt template for generating components
19. ✅ Test Bolt workflow: generate → copy to `packages/ui` → wire to RenderBlocks

**Phase 4 (Astro - Optional):**
20. ✅ Update Astro to import from `@repo/ui`
21. ✅ Ensure Astro uses same block contract

---

## 8) Removing `apps/web` Safely

### 8.1 Why Remove It?

- **Drift is guaranteed:** 12 blocks already missing, will only get worse
- **Maintenance burden:** Every change must be duplicated
- **Confusion:** Which app is canonical? (Answer: `apps/cms`)
- **No unique value:** All routes exist in `apps/cms` already

### 8.2 Pre-Removal Checklist

**Before removing `apps/web`, verify:**

1. ✅ All routes in `apps/web` exist in `apps/cms/(frontend)/`
   - ✅ `/` (home)
   - ✅ `/[slug]` (pages)
   - ✅ `/blog`, `/blog/[slug]`
   - ✅ `/people`, `/people/[slug]`
   - ✅ `/places`, `/places/[slug]`
   - ✅ `/archive-items`, `/archive-items/[slug]`
   - ✅ `/items/[type]/[slug]` (custom items)
   - ✅ `/preview/[collection]/[id]`
   - ✅ `/api/revalidate`
   - ⚠️ **Missing in `apps/cms`:** None (cms has `/events` which web doesn't)

2. ✅ All block components exist in `apps/cms`
   - ✅ `apps/cms` has all 21 blocks
   - ❌ `apps/web` only has 9 blocks (missing 12)

3. ✅ Shared UI package is in place
   - ⚠️ **Not yet** - must create `packages/ui` first

### 8.3 Removal Steps (Execute in Order)

**Step 1: Create Shared UI Package**
```bash
# Create packages/ui with all blocks from apps/cms
# See section 7.4 for structure
```

**Step 2: Update `apps/cms` to Use Shared UI**
```bash
# Update imports in apps/cms/src/app/(frontend)/ routes
# Update RenderBlocks to import from @repo/ui
```

**Step 3: Test `apps/cms` Thoroughly**
```bash
make dev-cms
# Visit http://localhost:3000
# Test all routes, all block types, preview mode
```

**Step 4: Update Makefile**
```makefile
# Remove dev-web, build-web, start-web targets
# Update dev target to only start cms (and optionally astro)
```

**Step 5: Update Root package.json**
```json
{
  "scripts": {
    "dev": "pnpm --filter @repo/cms dev",  // Remove --parallel, remove @repo/web
    "build": "pnpm --filter @repo/cms build",
    // Remove all web-specific scripts
  }
}
```

**Step 6: Update pnpm-workspace.yaml** (if needed)
```yaml
packages:
  - 'apps/cms'
  # - 'apps/web'  # Remove this line
  - 'apps/astro'
  - 'packages/*'
```

**Step 7: Remove the Directory**
```bash
rm -rf apps/web
```

**Step 8: Update Documentation**
- Update `MASTER.md` to remove references to `apps/web`
- Update `README.md` to show single Next.js app
- Update any deployment docs

**Step 9: Commit**
```bash
git add -A
git commit -m "Remove apps/web - consolidate to bundled Next.js in apps/cms

- Created packages/ui with shared block components
- Migrated all 21 blocks to shared package
- Updated apps/cms to import from @repo/ui
- Removed duplicate apps/web to prevent drift
- Updated Makefile and package.json scripts
- All routes now served from apps/cms on port 3000"
git push
```

### 8.4 Post-Removal Verification

**Test these scenarios:**
1. ✅ `make dev` starts only `apps/cms` (port 3000)
2. ✅ All pages render correctly at `http://localhost:3000`
3. ✅ All 21 block types render correctly
4. ✅ Preview mode works (`/preview/[collection]/[id]`)
5. ✅ Revalidation endpoint works (`/api/revalidate`)
6. ✅ Admin panel works (`http://localhost:3000/admin`)
7. ✅ Live preview works in admin
8. ✅ Build succeeds (`make build-cms`)
9. ✅ Production mode works (`make start`)

### 8.5 Rollback Plan (If Needed)

If removal causes issues:
```bash
git revert HEAD
pnpm install
make dev
```

This restores `apps/web` immediately.

---

## 9) Summary: Complete Source of Truth

This document now contains:

✅ **Original plan** (sections 1-6)
✅ **Detailed current state audit** (section 7.1)
✅ **Third-party resource assessment** (section 7.2)
  - Payload templates to review
  - Plugin recommendations
  - Theme implementation options
✅ **SEO implementation checklist** (section 7.3)
  - Files to create
  - Priority order
✅ **Shared UI package structure** (section 7.4)
✅ **Decision matrix** (section 7.5)
  - When to use baseline skins vs Bolt
  - Execution order with rationale
✅ **Concrete next steps** (section 7.6)
  - Prioritised action items
✅ **Safe removal strategy for apps/web** (section 8)
  - Pre-removal checklist
  - Step-by-step removal process
  - Post-removal verification
  - Rollback plan

**This is now the single, complete source of truth for frontend implementation.**
