# Technical Changes & Implementation Details

## Overview

This document tracks technical implementation details, outstanding issues, and code changes related to the CMS architecture. For navigation structure and taxonomy design, see **SHARED_TAXONOMY_SYSTEM.md**.

---

## ✅ **Completed Technical Changes**

### 1. Removed Artifacts Collection Completely
**Status:** ✅ Complete

**Files Modified:**
- Deleted: `apps/web/src/app/artifacts/page.tsx` and `apps/web/src/app/artifacts/[slug]/page.tsx`
- Updated: `apps/web/src/lib/api.ts` - Replaced Artifact interface with ArchiveItem
- Updated: `apps/astro/src/lib/payload.ts` - Replaced getArtifacts with getArchiveItems
- Updated: `apps/cms/src/blocks/Archive.ts` - Changed relationTo from 'artifacts' to 'archive-items'
- Updated: `apps/web/src/components/blocks/ArchiveBlock.tsx` - Updated switch case
- Updated: `apps/cms/src/components/blocks/ArchiveBlock.tsx` - Updated switch case
- Updated: `apps/astro/src/components/blocks/ArchiveBlock.astro` - Updated paths
- Updated: `apps/web/src/components/CollectionRenderer.tsx` - Updated field references
- Updated: `apps/cms/src/components/CollectionRenderer.tsx` - Updated field references
- Updated: `apps/astro/src/pages/collections/[slug].astro` - Updated field references

### 2. Navigation Endpoint Updated
**Status:** ✅ Complete

**File:** `apps/cms/src/endpoints/navigation.ts`

**Changes:**
- Added `Taxonomy` section to sectionOrder array
- Created `taxonomySlugs` array: ['categories', 'tags']
- Created `shopSlugs` array: ['products', 'product-categories', 'product-collections']
- Removed nested collections from Posts (categories/tags no longer nested)
- Added separate Taxonomy section building logic
- Shop section now separate from Collections section

**Result:** Navigation now shows:
```
Dashboard → Content → Taxonomy → Collections → Shop → Media → Forms → Settings → Admin
```

---

## ❌ **Outstanding Technical Issues**

### 1. Menu Flashing on Navigation
**Problem:** Navigation component unmounts/remounts when navigating between pages
**Cause:** Payload's routing causes full page reload
**Impact:** Minor UX issue - menu briefly disappears
**Status:** Partially mitigated by caching

### 2. Nested Items Inaccessible on Mobile
**Problem:** When sidebar is collapsed on mobile, nested items are hidden
**Affected:** Product Categories/Collections (under Products)
**Note:** Categories/Tags now in separate Taxonomy section, so this is less critical
**Status:** Needs "Manage" buttons on collection list pages

### 3. Collection Management Requires Code Changes
**Problem:** Can't add/remove/reorganize collections from CMS UI
**What Requires Code:**
- Adding new collections → Edit `payload.config.ts`
- Hiding collections → Edit collection file
- Reorganizing navigation → Edit `navigation.ts`
- Renaming collections → Edit multiple files

**Future Enhancement:** Build a Collection Manager UI

---

## 📋 **Remaining Implementation Tasks**

- [ ] Add "Manage Categories/Tags" buttons to collection list pages
- [ ] Implement hierarchical category display in admin UI
- [ ] Add breadcrumb support for category navigation
- [ ] Create cross-collection filtering API endpoints
- [ ] Update frontend to support category archive pages
- [ ] Add category/tag filtering to Archive blocks
- [ ] Test mobile UX with sidebar collapsed
- [ ] Document Custom Content Type creation workflow

---

## 🔧 **Code References**

**Navigation Configuration:**
- `apps/cms/src/endpoints/navigation.ts` - Dynamic navigation builder
- `apps/cms/src/admin/navData.ts` - Navigation search configuration

**Archive Items:**
- `apps/cms/src/collections/ArchiveItems.ts` - Collection definition
- `apps/cms/src/collection-templates/templates/archive-item.ts` - Template

**API Functions:**
- `apps/web/src/lib/api.ts` - Web app API functions
- `apps/astro/src/lib/payload.ts` - Astro app API functions

**Components:**
- `apps/web/src/components/blocks/ArchiveBlock.tsx` - Web archive block
- `apps/cms/src/components/blocks/ArchiveBlock.tsx` - CMS archive block
- `apps/astro/src/components/blocks/ArchiveBlock.astro` - Astro archive block

