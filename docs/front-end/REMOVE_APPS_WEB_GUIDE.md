# Guide: Safely Removing `apps/web`

**Date:** 2026-01-21  
**Status:** Ready to execute after shared UI package is created

## Why Remove `apps/web`?

You currently have **two Next.js frontends** running simultaneously:
- `apps/cms` (port 3000) - Bundled with Payload CMS ✅ **CANONICAL**
- `apps/web` (port 3001) - Separate Next.js app ❌ **DUPLICATE**

**Problems this causes:**
1. **Block component drift:** `apps/cms` has 21 blocks, `apps/web` has only 9 (missing 12)
2. **Maintenance burden:** Every UI change must be duplicated in both apps
3. **Confusion:** Which app is the source of truth?
4. **Wasted resources:** Running two identical Next.js apps in dev/production

**Solution:** Remove `apps/web` and use only `apps/cms` (bundled Next.js).

---

## Prerequisites (Must Complete First)

Before removing `apps/web`, you **must** complete these steps:

### 1. Create Shared UI Package

Create `packages/ui/` with this structure:

```
packages/ui/
├── src/
│   ├── blocks/              # All 21 block components
│   │   ├── HeroBlock.tsx
│   │   ├── ContentBlock.tsx
│   │   ├── MediaBlock.tsx
│   │   ├── CTABlock.tsx
│   │   ├── QuoteBlock.tsx
│   │   ├── FeaturesBlock.tsx
│   │   ├── StatsBlock.tsx
│   │   ├── LogoCloudBlock.tsx
│   │   ├── TestimonialsBlock.tsx
│   │   ├── FaqBlock.tsx
│   │   ├── PricingBlock.tsx
│   │   ├── TeamBlock.tsx
│   │   ├── EmbedBlock.tsx
│   │   ├── ArchiveBlock.tsx
│   │   ├── FormBlock.tsx
│   │   ├── GalleryBlock.tsx
│   │   ├── GridBlock.tsx
│   │   ├── TimelineBlock.tsx
│   │   ├── SpacerBlock.tsx
│   │   ├── HtmlBlock.tsx
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
│   │   └── index.ts
│   ├── RenderBlocks.tsx     # Single block renderer
│   └── index.ts
├── package.json
└── tsconfig.json
```

**Source:** Copy all blocks from `apps/cms/src/components/blocks/` (has all 21 blocks).

### 2. Update `apps/cms` to Import from Shared UI

Update all imports in `apps/cms/src/app/(frontend)/` to use `@repo/ui`:

```typescript
// Before
import { RenderBlocks } from '@/components/RenderBlocks'
import { HeroBlock } from '@/components/blocks/HeroBlock'

// After
import { RenderBlocks, HeroBlock } from '@repo/ui'
```

### 3. Test `apps/cms` Thoroughly

```bash
make dev-cms
# Visit http://localhost:3000
# Test all routes, all block types, preview mode
```

Verify:
- ✅ All pages render
- ✅ All 21 block types work
- ✅ Preview mode works
- ✅ Admin panel works
- ✅ Live preview works

---

## Removal Steps (Execute in Order)

### Step 1: Update Makefile

Edit `headless-cms/Makefile`:

```makefile
# Find the dev target (around line 75-82) and update:
dev: ## Start all services in development mode (requires Docker)
	@echo "$(CYAN)Starting development environment...$(NC)"
	docker compose up -d postgres
	@echo "$(YELLOW)Waiting for PostgreSQL to be ready...$(NC)"
	@sleep 5
	@echo "$(CYAN)Starting CMS...$(NC)"
	pnpm --filter @repo/cms dev  # Remove the parallel dev command

# Remove or comment out the dev-web target (around line 87-89):
# dev-web: ## Start only the Next.js frontend in development mode
# 	@echo "$(CYAN)Starting Next.js development server...$(NC)"
# 	pnpm --filter @repo/web dev

# Update build target (around line 99-102):
build: ## Build all packages for production
	@echo "$(CYAN)Building packages...$(NC)"
	pnpm --filter @repo/cms build  # Remove @repo/web
	@echo "$(GREEN)Build completed successfully!$(NC)"

# Remove or comment out build-web target (around line 108-110):
# build-web: ## Build only the Next.js frontend
# 	@echo "$(CYAN)Building Next.js frontend...$(NC)"
# 	pnpm --filter @repo/web build
```

### Step 2: Update Root `package.json`

Edit `headless-cms/package.json`:

```json
{
  "scripts": {
    "dev": "pnpm --filter @repo/cms dev",
    "dev:cms": "pnpm --filter @repo/cms dev",
    // Remove: "dev:web": "pnpm --filter @repo/web dev",
    "build": "pnpm --filter @repo/cms build",
    "build:cms": "pnpm --filter @repo/cms build",
    // Remove: "build:web": "pnpm --filter @repo/web build",
    "start": "pnpm --filter @repo/cms start",
    "start:cms": "pnpm --filter @repo/cms start",
    // Remove: "start:web": "pnpm --filter @repo/web start",
    // Keep other scripts unchanged
  }
}
```

### Step 3: Update `pnpm-workspace.yaml`

Edit `headless-cms/pnpm-workspace.yaml`:

```yaml
packages:
  - 'apps/cms'
  # - 'apps/web'  # Remove this line
  - 'apps/astro'
  - 'packages/*'
```

### Step 4: Remove the Directory

```bash
cd headless-cms
rm -rf apps/web
```

### Step 5: Clean and Reinstall Dependencies

```bash
pnpm install
```

This will update the workspace to reflect the removed package.

### Step 6: Update Documentation

Update these files to remove references to `apps/web`:

**`headless-cms/MASTER.md`:**
- Remove `apps/web` from monorepo structure diagram
- Update "Dual-Frontend Strategy" section to mention only `apps/cms` and `apps/astro`
- Update port references (only 3000 for CMS, 4321 for Astro)

**`headless-cms/README.md`:**
- Update architecture diagram
- Remove `apps/web` from features list
- Update "Getting Started" to show only port 3000

**`headless-cms/docs/ARCHITECTURE_EXPLAINED.md`** (if exists):
- Update to reflect single Next.js app

### Step 7: Update Environment Variables

Check `.env` and `.env.example`:

```bash
# Update NEXT_PUBLIC_SITE_URL to point to apps/cms
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Was 3001 for apps/web

# In production, this should be your actual domain
# NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Step 8: Test Everything

```bash
# Start development
make dev

# Should start only:
# - PostgreSQL (Docker)
# - apps/cms on port 3000

# Visit and test:
# - http://localhost:3000 (frontend)
# - http://localhost:3000/admin (CMS admin)
```

**Test checklist:**
- ✅ Home page loads
- ✅ All page routes work (`/about`, `/contact`, etc.)
- ✅ Blog routes work (`/blog`, `/blog/[slug]`)
- ✅ People routes work (`/people`, `/people/[slug]`)
- ✅ Archive items work (`/archive-items`, `/archive-items/[slug]`)
- ✅ Custom items work (`/items/[type]/[slug]`)
- ✅ All 21 block types render correctly
- ✅ Preview mode works (`/preview/[collection]/[id]`)
- ✅ Admin panel works
- ✅ Live preview works in admin
- ✅ Publishing triggers revalidation

### Step 9: Test Build

```bash
make build-cms
# Should complete without errors

make start
# Should start production server on port 3000
```

### Step 10: Commit Changes

```bash
git add -A
git commit -m "Remove apps/web - consolidate to bundled Next.js in apps/cms

BREAKING CHANGE: Removed duplicate Next.js frontend (apps/web)

- Created packages/ui with shared block components (21 blocks)
- Migrated all blocks from apps/cms to packages/ui
- Updated apps/cms to import from @repo/ui
- Removed apps/web to prevent component drift
- Updated Makefile to remove web-specific targets
- Updated package.json scripts
- Updated pnpm-workspace.yaml
- Updated documentation (MASTER.md, README.md)
- All routes now served from apps/cms on port 3000

Rationale:
- apps/web had only 9 blocks vs apps/cms with 21 blocks (drift)
- Duplicate maintenance burden
- No unique value - all routes existed in apps/cms
- Bundled Next.js with Payload is the intended architecture

Migration path:
- Shared UI package prevents future drift
- Astro can import from @repo/ui for consistency
- Bolt will target @repo/ui for custom components"

git push
```

---

## Post-Removal Verification

### Verify Development Workflow

```bash
# Clean start
make stop
make clean
make quickstart

# Should complete successfully and start only apps/cms
```

### Verify Production Build

```bash
make build
# Should build only apps/cms

make start
# Should start only apps/cms on port 3000
```

### Verify Railway Deployment (if applicable)

Update `railway.toml` to remove `apps/web` service:

```toml
# Remove the [services.web] section entirely
# Keep only [services.cms] and [services.postgres]
```

---

## Rollback Plan (If Issues Arise)

If you encounter problems after removal:

```bash
# Revert the commit
git revert HEAD

# Reinstall dependencies
pnpm install

# Restart development
make dev
```

This will restore `apps/web` immediately.

**When to rollback:**
- Critical routes don't work in `apps/cms`
- Block rendering fails
- Preview mode breaks
- Production build fails

**When NOT to rollback:**
- Minor styling differences (expected, fix in `apps/cms`)
- Port confusion (update bookmarks to 3000)
- Documentation outdated (update docs, don't rollback)

---

## Success Criteria

You've successfully removed `apps/web` when:

✅ `make dev` starts only `apps/cms` (port 3000)
✅ All routes work at `http://localhost:3000`
✅ All 21 block types render correctly
✅ Preview mode works
✅ Admin panel works
✅ Live preview works
✅ `make build` succeeds
✅ Production mode works
✅ No references to `apps/web` in code or docs
✅ `pnpm-workspace.yaml` doesn't list `apps/web`
✅ Makefile has no `dev-web` or `build-web` targets

---

## Benefits After Removal

1. **No more drift:** Single source of truth for UI components
2. **Easier maintenance:** Update components once in `packages/ui`
3. **Clearer architecture:** Bundled Next.js is the canonical frontend
4. **Faster development:** No need to run two Next.js apps
5. **Simpler deployment:** One less service to deploy
6. **Better DX:** No confusion about which app to edit

---

## Next Steps After Removal

Once `apps/web` is removed and `packages/ui` is in place:

1. ✅ Implement baseline skin system (Phase 1)
2. ✅ Implement SEO baseline (Phase 2)
3. ✅ Define Bolt component contract (Phase 3)
4. ✅ Update Astro to use `@repo/ui` (Phase 4)

See `frontend-implementation-plan.md` for full details.


