# Frontend Strategy Summary

**Date:** 2026-01-21  
**Status:** Comprehensive plan ready for execution

## The Situation

You discovered you have **two Next.js frontends** running simultaneously:
- `apps/cms` (port 3000) - Bundled with Payload CMS ✅ **KEEP THIS**
- `apps/web` (port 3001) - Separate Next.js app ❌ **REMOVE THIS**

This is causing:
- **Component drift:** 12 blocks missing from `apps/web`
- **Maintenance burden:** Duplicate code in both apps
- **Confusion:** Which app is canonical?

## The Solution

**Three-track approach:**

### Track 1: Baseline Skins (Quick, Professional Sites)
- Token-based theme system
- 6-8 pre-built skins (Minimal, Editorial, SaaS, etc.)
- Reusable layout primitives
- Complete SEO implementation
- **Use for:** 80% of sites, fast deployment

### Track 2: Bolt Integration (Custom Designs)
- Bolt generates presentational components
- Components copied to shared UI package
- Wired to CMS data by you
- **Use for:** Unique brand requirements, complex UX

### Track 3: Astro (Optional, High-Performance)
- Pure SSG for content-heavy sites
- Imports from shared UI package
- Zero client-side JS
- **Use for:** Blogs, marketing sites, maximum performance

## The Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Payload CMS                          │
│                  (apps/cms)                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Admin Panel (port 3000/admin)                   │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Bundled Next.js Frontend (port 3000)           │  │
│  │  - Imports from @repo/ui                         │  │
│  │  - SSG + ISR                                     │  │
│  │  - Live preview support                          │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ imports from
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Shared UI Package                          │
│              (packages/ui)                              │
│  - 21 block components                                  │
│  - Layout primitives (Container, Section, etc.)         │
│  - Theme system (skins + tokens)                        │
│  - RenderBlocks (single renderer)                       │
└─────────────────────────────────────────────────────────┘
                          │
                          │ imports from
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Astro Frontend (Optional)                  │
│              (apps/astro)                               │
│  - Pure SSG                                             │
│  - Imports from @repo/ui                                │
│  - Port 4321                                            │
└─────────────────────────────────────────────────────────┘
```

## The Documents

### 1. `frontend-implementation-plan.md` ⭐ **MASTER PLAN**
**Complete source of truth** with:
- Current state audit (block drift, SEO gaps)
- Third-party resource assessment (Payload templates, plugins, theme options)
- SEO implementation checklist (sitemap, robots, JSON-LD)
- Shared UI package structure
- Decision matrix (when to use what)
- Phased execution plan
- Safe removal strategy for `apps/web`

**Read this first for the big picture.**

### 2. `REMOVE_APPS_WEB_GUIDE.md` 🔧 **REMOVAL GUIDE**
**Step-by-step instructions** for:
- Prerequisites (create shared UI package first)
- Removal steps (Makefile, package.json, workspace, directory)
- Post-removal verification
- Rollback plan
- Success criteria

**Use this when ready to remove `apps/web`.**

### 3. `payload-frontend-themes-brief.md` 🎨 **THEME SYSTEM SPEC**
**Detailed specification** for:
- Skin/theme system architecture
- Layout primitives (Container, Section, PageHeader, Prose)
- SEO implementation (metadata, JSON-LD, sitemap, robots)
- Component inventory
- 8 skin presets
- Implementation phases

**Use this for Phase 1-2 implementation.**

### 4. `bolt_payload_cms_integration_assessment.md` 🤖 **BOLT INTEGRATION**
**Bolt strategy** for:
- Why Bolt can't run full Payload stack
- Component-only approach (presentational components)
- Integration options (theme layer, mock API, static blueprint)
- Recommended approach (Option 1: Theme Layer)
- Component contract definition

**Use this for Phase 3 implementation.**

## Execution Order

### Phase 0: Remove Drift (Do First)
1. ✅ Create `packages/ui` with all 21 blocks from `apps/cms`
2. ✅ Create layout primitives (Container, Section, PageHeader, Prose)
3. ✅ Update `apps/cms` to import from `@repo/ui`
4. ✅ Test thoroughly
5. ✅ Remove `apps/web` (see `REMOVE_APPS_WEB_GUIDE.md`)

**Why first:** Establishes single source of truth, prevents future drift.

### Phase 1: Baseline Skins (Do Second)
1. ✅ Implement token-based skin system in `globals.css`
2. ✅ Create 6-8 skin presets
3. ✅ Add ThemeSwitcher component
4. ✅ Wire Settings global for defaults
5. ✅ Add FOUC prevention

**Why second:** Provides professional baseline for all sites.

### Phase 2: SEO Baseline (Do Third)
1. ✅ Create `sitemap.ts` route
2. ✅ Create `robots.ts` route
3. ✅ Create `lib/seo/schema.ts` (JSON-LD generators)
4. ✅ Update all `generateMetadata()` functions
5. ✅ Add JSON-LD injection to templates

**Why third:** SEO is critical, must work regardless of design approach.

### Phase 3: Bolt Integration (Do Fourth)
1. ✅ Define component contract (props-only, no data fetching)
2. ✅ Create Bolt prompt template
3. ✅ Test workflow: generate → copy to `packages/ui` → wire

**Why fourth:** Bolt needs stable shared UI package and component contract.

### Phase 4: Astro Alignment (Optional)
1. ✅ Update Astro to import from `@repo/ui`
2. ✅ Ensure same block contract

**Why last:** Optional, depends on whether you use Astro.

## Quick Reference

| Need | Use | Document |
|------|-----|----------|
| **Big picture** | Read master plan | `frontend-implementation-plan.md` |
| **Remove apps/web** | Follow removal guide | `REMOVE_APPS_WEB_GUIDE.md` |
| **Implement skins** | Follow theme spec | `payload-frontend-themes-brief.md` |
| **Bolt integration** | Follow Bolt strategy | `bolt_payload_cms_integration_assessment.md` |
| **SEO checklist** | See section 7.3 | `frontend-implementation-plan.md` |
| **Decision matrix** | See section 7.5 | `frontend-implementation-plan.md` |

## Key Decisions Made

✅ **Canonical frontend:** `apps/cms` (bundled Next.js)  
✅ **Remove:** `apps/web` (duplicate, causes drift)  
✅ **Shared UI:** `packages/ui` (single source of truth)  
✅ **Theme approach:** Custom token system (most flexible)  
✅ **Bolt role:** Component generator only (not full stack)  
✅ **Execution order:** Baseline first, Bolt second  

## Success Criteria

You'll know you're done when:

✅ Only one Next.js app runs (`apps/cms` on port 3000)  
✅ All 21 blocks work from `@repo/ui`  
✅ 6-8 skins available and switchable  
✅ Sitemap, robots, JSON-LD all working  
✅ Bolt can generate components that drop into `@repo/ui`  
✅ No component drift between apps  
✅ Documentation updated  

## Next Action

**Start here:**
1. Read `frontend-implementation-plan.md` in full
2. Create `packages/ui` package
3. Follow `REMOVE_APPS_WEB_GUIDE.md` to remove `apps/web`
4. Implement Phase 1 (skins) using `payload-frontend-themes-brief.md`
5. Implement Phase 2 (SEO) using checklist in `frontend-implementation-plan.md`
6. Implement Phase 3 (Bolt) using `bolt_payload_cms_integration_assessment.md`

**Questions?** All answers are in `frontend-implementation-plan.md` section 7.

