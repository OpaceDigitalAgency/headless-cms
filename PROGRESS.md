# Project Progress

## Latest Update: Shared Taxonomy System Implementation

**Date:** 19 January 2026
**Objective:** Implement a comprehensive shared taxonomy system with hierarchical categories across all content collections.

### Changes Implemented

#### 1. Hierarchical Categories
- **Added parent field** to Categories collection for unlimited nesting depth
- **Updated nestedDocsPlugin** configuration to support category hierarchies
- Categories now support parent-child relationships (e.g., History > Ancient History > Ancient Rome)

#### 2. Shared Taxonomy Across Collections
- Categories and Tags are now **shared across**:
  - Posts
  - Archive Items
  - Events
  - People
  - Custom Items
- **Separate taxonomy** for ecommerce (Product Categories & Product Collections)

#### 3. Admin Navigation Reorganisation
- **New "Taxonomy" section** in admin navigation (separate from Content)
- Categories and Tags moved from "Content" group to "Taxonomy" group
- Improved mobile accessibility with dedicated taxonomy section

#### 4. Enhanced Usage Tracking
- Categories and Tags now count usage across **all collections**
- Sidebar displays breakdown by collection type:
  - Total Items
  - Posts Count
  - Archive Items Count
  - Events Count
  - People Count
  - Custom Items Count

#### 5. Improved Revalidation
- Updated revalidation hooks for:
  - Archive Items
  - Events
  - People
- All collections now properly invalidate taxonomy-related cache tags
- Cross-collection filtering support on frontend

### Files Modified

**Collections:**
- `apps/cms/src/collections/Categories.ts` - Added parent field, hierarchical support, cross-collection counting
- `apps/cms/src/collections/Tags.ts` - Added cross-collection counting
- `apps/cms/src/collections/ArchiveItems.ts` - Added taxonomy revalidation hooks
- `apps/cms/src/collections/Events.ts` - Added taxonomy revalidation hooks
- `apps/cms/src/collections/People.ts` - Added taxonomy revalidation hooks

**Configuration:**
- `apps/cms/src/payload.config.ts` - Updated nestedDocsPlugin for categories
- `apps/cms/src/admin/navData.ts` - Added support for nested navigation items

**Templates:**
- Event and Archive Item templates already had taxonomy fields (no changes needed)
- People collection already had taxonomy fields (no changes needed)

### Benefits

✅ **Unified Content Discovery** - Find all content about a topic across different types
✅ **Hierarchical Organisation** - Nested categories prevent flat, overwhelming lists
✅ **Better Mobile UX** - Dedicated Taxonomy section accessible on all devices
✅ **Cross-Collection Filtering** - Filter by category/tag across Posts, Events, People, etc.
✅ **Flexible Customisation** - Custom Content Types automatically inherit taxonomy
✅ **Improved Analytics** - See exactly where each category/tag is used

### Next Steps

- [ ] Create comprehensive seed data demonstrating hierarchical categories
- [ ] Add "Manage Categories/Tags" buttons to collection list pages (mobile UX enhancement)
- [ ] Implement frontend category archive pages with cross-collection content
- [ ] Add breadcrumb navigation for hierarchical categories
- [ ] Update documentation with taxonomy usage examples

---

## Previous Update: Architecture Consolidation

**Objective:** Consolidate the separate Payload CMS (`apps/cms`) and Next.js frontend (`apps/web`) applications into a single unified Next.js application.

**Requested by:** User
**Date Started:** 16 January 2026

---

## Why This Change?

### Previous Architecture (Two Separate Apps)

```
headless-cms/
├── apps/
│   ├── cms/          # Payload CMS on port 3000
│   └── web/          # Next.js frontend on port 3001
```

**Problems with the two-app approach:**

1. **Unnecessary Complexity** - Two separate Next.js apps means double the configuration, dependencies, and maintenance burden.

2. **Network Overhead** - The frontend had to make REST API calls to the CMS for all content, adding latency and complexity.

3. **Revalidation Complexity** - Required webhook-based revalidation where the CMS would POST to the frontend's `/api/revalidate` endpoint to trigger cache invalidation.

4. **Deployment Overhead** - Two separate deployments to manage, with potential CORS issues and inter-service communication concerns.

5. **Development Experience** - Running two dev servers simultaneously, managing environment variables for cross-app communication.

### New Architecture (Single Unified App)

```
headless-cms/
├── apps/
│   └── cms/          # Payload CMS + Frontend on port 3000
│       ├── src/app/(payload)/   # Admin panel routes
│       └── src/app/(frontend)/  # Public website routes
```

**Benefits of consolidation:**

1. **Direct Database Access** - Frontend uses Payload's Local API (`getPayload()`) for zero-network-overhead data fetching.

2. **Simplified Revalidation** - Can call `revalidatePath()` and `revalidateTag()` directly in Payload hooks without webhooks.

3. **Single Deployment** - One application to deploy, configure, and monitor.

4. **Shared Code** - Components, utilities, and types naturally shared between admin and frontend.

5. **Better DX** - Single dev server, unified configuration, simpler debugging.

---

## Current Progress

### ✅ Completed

1. **Created frontend route group** - `apps/cms/src/app/(frontend)/` with its own layout

2. **Created Payload Local API utilities** - `apps/cms/src/lib/payload-api.ts` with functions:
   - `getPages`, `getPageBySlug`
   - `getPosts`, `getPostBySlug`
   - `getArtifacts`, `getArtifactBySlug`
   - `getPeople`, `getPlaces`, `getMuseumCollections`, `getCustomItems`
   - `getHeader`, `getFooter`, `getSettings`

3. **Created revalidation utilities** - `apps/cms/src/lib/revalidate.ts` with direct cache invalidation functions

4. **Updated collection hooks** - Modified `Pages.ts`, `Posts.ts`, `Artifacts.ts` to use direct revalidation instead of webhook calls

5. **Updated global hooks** - Modified `Header.ts`, `Footer.ts`, `Settings.ts` for direct revalidation

6. **Copied frontend components** - All renderers (Page, Post, Artifact, etc.) and block components

7. **Created frontend pages**:
   - `/` - Home page
   - `/[slug]` - Dynamic pages
   - `/blog` and `/blog/[slug]` - Blog listing and detail
   - `/artifacts` and `/artifacts/[slug]` - Artifacts listing and detail

8. **Created API routes**:
   - `/api/draft` - Draft mode for preview
   - `/api/exit-draft` - Exit draft mode
   - `/api/revalidate` - External revalidation endpoint (for compatibility)

9. **Updated Next.js config** - Added `transpilePackages`, updated headers for preview iframe support

10. **Updated tsconfig** - Added `@payload-config` path alias

---

## Current Issues

### � Live Preview Partially Working

The live preview iframe is now showing content, but there are still issues to resolve:

1. **Preview URL Configuration** - Need to verify the correct preview URLs are being generated
2. **Content Rendering** - Need to test that all block types render correctly in preview mode
3. **Real-time Updates** - Need to verify live preview updates work when editing content

### ✅ Fixed Issues

1. **X-Frame-Options Header** - Preview was blocked because Next.js set `X-Frame-Options: DENY`. Fixed by changing to `SAMEORIGIN` for all routes in `next.config.mjs`.

2. **Tailwind v4 Configuration** - Build was failing with "require is not defined" error because the old `tailwind.config.ts` was being loaded via `@config` directive. Fixed by:
   - Updating `globals.css` to use Tailwind v4's `@plugin` directive for typography
   - Adding `@theme` block with custom colour and font variables
   - Removing the `@config "../../tailwind.config.ts"` directive

### 🔴 Previous Issue - Server/Client Component Boundary (RESOLVED)

**Error:** `You're importing a component that needs "revalidatePath". That only works in a Server Component`

**Resolution:** This was addressed by restructuring how components are imported and ensuring proper server/client boundaries.

---

## Remaining Tasks

### High Priority
- [ ] Test live preview functionality end-to-end
- [ ] Verify revalidation works correctly after content changes
- [ ] Test draft mode for unpublished content
- [ ] Debug any remaining preview issues

### Medium Priority
- [ ] Create remaining frontend pages (people, places, collections, items)
- [ ] Copy and update `not-found.tsx` and `error.tsx` for all routes
- [ ] Test all content types render correctly
- [ ] Verify image optimisation works

### Low Priority / Cleanup
- [ ] Remove or archive `apps/web` directory after full migration
- [ ] Remove unused `tailwind.config.ts` file (no longer needed with Tailwind v4)
- [ ] Update environment variable documentation
- [ ] Clean up any unused dependencies

---

## Documentation Updates Required

> **Note:** When this migration is complete, the following documentation must be updated:

### README.md
- Update architecture diagram
- Remove references to separate web app
- Update development instructions (single `pnpm dev` command)
- Update deployment instructions
- Update environment variables section

### MASTER.md
- Document the new unified architecture
- Update folder structure documentation
- Document the `(frontend)` and `(payload)` route groups
- Update any references to REST API (now uses Local API)
- Document revalidation approach (direct vs webhook)

---

## Files Modified/Created

### New Files
- `apps/cms/src/app/(frontend)/layout.tsx`
- `apps/cms/src/app/(frontend)/page.tsx`
- `apps/cms/src/app/(frontend)/[slug]/page.tsx`
- `apps/cms/src/app/(frontend)/blog/page.tsx`
- `apps/cms/src/app/(frontend)/blog/[slug]/page.tsx`
- `apps/cms/src/app/(frontend)/artifacts/page.tsx`
- `apps/cms/src/app/(frontend)/artifacts/[slug]/page.tsx`
- `apps/cms/src/app/(frontend)/not-found.tsx`
- `apps/cms/src/app/(frontend)/error.tsx`
- `apps/cms/src/app/(frontend)/api/draft/route.ts`
- `apps/cms/src/app/(frontend)/api/exit-draft/route.ts`
- `apps/cms/src/app/(frontend)/api/revalidate/route.ts`
- `apps/cms/src/lib/payload-api.ts`
- `apps/cms/src/lib/revalidate.ts`
- `apps/cms/src/components/RenderBlocksClient.tsx`

### Modified Files
- `apps/cms/src/payload.config.ts` - No changes yet needed
- `apps/cms/src/collections/Pages.ts` - Updated revalidation hooks
- `apps/cms/src/collections/Posts.ts` - Updated revalidation hooks
- `apps/cms/src/collections/Artifacts.ts` - Updated revalidation hooks
- `apps/cms/src/globals/Header.ts` - Updated revalidation hooks
- `apps/cms/src/globals/Footer.ts` - Updated revalidation hooks
- `apps/cms/src/globals/Settings.ts` - Updated revalidation hooks
- `apps/cms/src/utils/preview.ts` - Updated URLs for same-origin
- `apps/cms/next.config.mjs` - Added transpilePackages, updated headers to allow SAMEORIGIN for iframe preview
- `apps/cms/tsconfig.json` - Added @payload-config alias
- `apps/cms/src/components/blocks/ArchiveBlock.tsx` - Updated imports
- `apps/cms/src/styles/globals.css` - Updated for Tailwind v4 (removed @config, added @plugin and @theme)

### Components Copied from apps/web
- All block components (`HeroBlock`, `ContentBlock`, etc.)
- All renderer components (`PageRenderer`, `PostRenderer`, etc.)
- `Header.tsx`, `Footer.tsx`
- `RichText.tsx`
- `styles/globals.css`

---

## Technical Notes

### Route Groups in Next.js App Router

The new architecture uses Next.js route groups:
- `(payload)` - Admin panel routes (existing)
- `(frontend)` - Public website routes (new)

Route groups don't affect URLs - they're for organisation and can have separate layouts.

### Payload Local API vs REST API

**Before (REST):**
```typescript
const response = await fetch(`${CMS_URL}/api/pages?where[slug][equals]=${slug}`)
const data = await response.json()
```

**After (Local API):**
```typescript
const payload = await getPayload({ config: configPromise })
const result = await payload.find({
  collection: 'pages',
  where: { slug: { equals: slug } },
})
```

### Direct Revalidation

**Before (Webhook):**
```typescript
// In Payload hook
await fetch(`${SITE_URL}/api/revalidate`, {
  method: 'POST',
  body: JSON.stringify({ collection: 'pages', slug }),
})
```

**After (Direct):**
```typescript
// In Payload hook
import { revalidatePage } from '../lib/revalidate'
revalidatePage(slug)
```

