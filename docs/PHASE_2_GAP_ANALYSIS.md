# Phase 2 Gap Analysis

## Current State Assessment

### Phase 1 Completed Features ✅

| Feature | Status | Notes |
|---------|--------|-------|
| Core Architecture | ✅ Complete | Monorepo with PNPM workspaces |
| PostgreSQL + Drizzle | ✅ Complete | Working database adapter |
| Payload CMS v3 | ✅ Complete | Full configuration |
| Next.js Frontend | ✅ Complete | SSG + ISR support |
| Astro Frontend | ✅ Complete | Pure SSG |
| Template System | ✅ Complete | 7 templates (Home, Landing, Detail, List, Article, Timeline, Archive) |
| Block System | ✅ Complete | 6 blocks (Hero, Content, Media, CTA, Archive, Form) |
| Live Preview | ✅ Complete | Working for pages, posts, artifacts |
| On-Demand Revalidation | ✅ Complete | Tag-based revalidation |
| SEO Plugin | ✅ Complete | Meta tags, Open Graph |
| Docker Compose | ✅ Complete | Local development |
| Railway Deployment | ✅ Complete | One-click deploy |
| Makefile Commands | ✅ Complete | All essential commands |
| Museum Collections | ✅ Complete | Artifacts, People, Places, Collections |
| Seed Data | ✅ Partial | Basic seed exists but needs enhancement |
| Admin Dashboard | ✅ Partial | Has reset data button |

---

## Phase 2 Requirements Gap Analysis

### 1. Starter Site Types (REQUIRED)

| Starter | Status | Gap |
|---------|--------|-----|
| Blog/Brochure (Astro) | ❌ Missing | Need dedicated preset with schema, templates, seed data |
| Museum/Archive (Next.js) | ✅ Partial | Exists but needs formalization as preset |
| Ecommerce (Next.js) | ❌ Missing | Need Products, Categories, Collections schema |

**Actions Required:**
- Create `presets/` directory structure
- Create `blog/` preset
- Create `brochure/` preset
- Create `archive/` preset (formalize existing)
- Create `ecommerce/` preset

### 2. Presets & Packs System

| Component | Status | Gap |
|-----------|--------|-----|
| Presets directory | ❌ Missing | Need `presets/` folder structure |
| Feature Packs | ❌ Missing | Need `packs/` folder structure |
| Preset structure | ❌ Missing | Need standardized preset format |

**Actions Required:**
- Create preset directory structure
- Define preset manifest format
- Create base preset utilities

### 3. Scaffolding Layer (CRITICAL)

| Component | Status | Gap |
|-----------|--------|-----|
| `scripts/create.sh` | ❌ Missing | Need generator script |
| Makefile shortcuts | ❌ Missing | Need `make blog-next`, etc. |
| Preset selection | ❌ Missing | Need interactive/arg-based selection |

**Actions Required:**
- Create `scripts/create.sh` generator
- Add Makefile shortcuts for each starter
- Implement preset copying logic

### 4. Template Mapping Contract

| Component | Status | Gap |
|-----------|--------|-----|
| TS/JSON Shape | ✅ Partial | Exists in `packages/shared/src/types.ts` |
| Validation | ❌ Missing | Need fail-fast validation |
| Safe rendering | ✅ Partial | Templates handle missing slots |

**Actions Required:**
- Add validation functions
- Create mapping validation tests
- Document mapping contract

### 5. Blocks Library

| Block | Status | Notes |
|-------|--------|-------|
| Hero | ✅ Complete | Full featured |
| Gallery | ❌ Missing | Need image gallery block |
| Grid | ❌ Missing | Need grid layout block |
| CTA | ✅ Complete | CallToAction block |
| Timeline | ❌ Missing | Need timeline block (separate from template) |
| Rich Text | ✅ Complete | Content block |

**Actions Required:**
- Create Gallery block
- Create Grid block
- Create Timeline block

### 6. Publish Invalidation Rules

| Component | Status | Gap |
|-----------|--------|-----|
| Tag naming convention | ✅ Partial | Basic tags exist |
| Dependency rules | ✅ Partial | Basic implementation |
| Security | ✅ Complete | Secret-based auth |

**Actions Required:**
- Formalize tag naming convention
- Document dependency rules
- Add archive/index page invalidation

### 7. Seed & Bulk Import Tooling

| Component | Status | Gap |
|-----------|--------|-----|
| `pnpm seed` | ✅ Complete | Working |
| Sample datasets per starter | ❌ Missing | Need preset-specific seed data |
| JSON/CSV import | ❌ Missing | Need import scripts |
| Admin UI for seed | ✅ Partial | Has Re-seed and Clear buttons |
| Template-specific seed | ❌ Missing | Need conditional logic |

**Actions Required:**
- Create preset-specific seed data modules
- Add JSON/CSV import utilities
- Enhance admin UI with template selection
- Add "Seed Sample Data and Media" option
- Make seed options conditional based on template type

### 8. Agent Contract Document

| Component | Status | Gap |
|-----------|--------|-----|
| AGENT_CONTRACT.md | ❌ Missing | Need dedicated document |

**Actions Required:**
- Create `AGENT_CONTRACT.md` with all required sections

---

## Admin UX Seed Data Assessment

### Current Implementation

The current implementation has:
1. **ResetDataButton component** - Shows in dashboard
2. **Two options**: "Re-seed Sample Data" and "Clear All Data"
3. **Confirmation dialogs** - Before destructive actions
4. **API endpoint** - `/api/admin/reset-data`

### Missing Features

1. **"Seed Sample Data and Media"** - Initial seed option (not just re-seed)
2. **Template/Preset Selection** - No dropdown to choose which starter's data to seed
3. **Conditional Logic** - All starters use same museum data
4. **Media Download Option** - No separate option for downloading sample images

### Required Enhancements

1. Add template type selector dropdown
2. Add "Seed Sample Data and Media" button for fresh installs
3. Make seed data conditional based on selected template:
   - Blog: Posts, Categories, Pages
   - Museum: Artifacts, People, Places, Collections
   - Ecommerce: Products, Categories, Collections
4. Add progress indicator for seeding
5. Add option to seed with/without media

---

## Priority Implementation Order

1. **High Priority (Core Productisation)**
   - Create presets directory structure
   - Create `scripts/create.sh` generator
   - Add Makefile shortcuts
   - Create preset-specific seed data modules
   - Enhance admin seed UI with template selection

2. **Medium Priority (Feature Completeness)**
   - Add missing blocks (Gallery, Grid, Timeline)
   - Create Ecommerce starter collections
   - Create Agent Contract document
   - Add JSON/CSV import utilities

3. **Lower Priority (Polish)**
   - Add mapping validation
   - Formalize tag naming convention
   - Add versioning policy documentation
