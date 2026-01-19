# Technical Changes & Implementation Details

## Overview

This document tracks technical implementation details, outstanding issues, code changes, and future roadmap for the CMS architecture.

**Related Documentation:**
- **SHARED_TAXONOMY_SYSTEM.md** - Navigation structure, taxonomy design, and architecture
- **TECHNICAL_CHANGES.md** (this file) - Implementation details, issues, and roadmap

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

**Possible Solutions:**
- Use React Router's Link component instead of `<a>` tags
- Keep navigation in a persistent layout component
- Accept as Payload's default behaviour

### 2. Nested Items Inaccessible on Mobile
**Problem:** When sidebar is collapsed on mobile, nested items are hidden
**Affected:** Product Categories/Collections (under Products)
**Note:** Categories/Tags now in separate Taxonomy section, so this is less critical
**Status:** Needs solution

**Recommended Solutions (in order of preference):**

**Option A: Always Show Nested Items (SIMPLE - 5 minutes)**
```scss
// Remove from custom.scss:
.ra-side-nav--collapsed .ra-side-nav__link--nested {
  display: none;
}
```
Pros: Quick fix, no code complexity
Cons: Might look cluttered on mobile

**Option B: Add Buttons to Collection Pages (BETTER UX - 1-2 hours)**
Add "Manage Categories" and "Manage Tags" buttons to Posts/Products list views
```typescript
// apps/cms/src/collections/Posts.ts
admin: {
  components: {
    BeforeListTable: ['/admin/components/PostsListActions'],
  },
}
```
Pros: Better UX, clear access to nested collections
Cons: Requires custom Payload component

**Option C: Don't Auto-Collapse Sidebar on Mobile (SIMPLE)**
Let users manually collapse if needed
Pros: No hidden items
Cons: Takes up screen space on mobile

### 3. Collection Management Requires Code Changes
**Problem:** Can't add/remove/reorganize collections from CMS UI

**Current Process:**
- Adding new collections → Edit `payload.config.ts`
- Hiding collections → Edit collection file
- Reorganizing navigation → Edit `navigation.ts`
- Renaming collections → Edit multiple files
- Restart server required

**Future Enhancement:** Build Collection Manager UI (see ROADMAP section below)

### 4. Museum Collections Should Be Renamed to Galleries
**Current:** `museum-collections`
**Desired:** `galleries`

**Why Not Done Yet:** Requires:
1. Renaming collection file
2. Updating slug in collection config
3. Updating all code references
4. Migrating existing data in database

**Impact:** Breaking change - requires careful data migration planning

---

## 📋 **Remaining Implementation Tasks**

### Taxonomy & Filtering
- [ ] Add "Manage Categories/Tags" buttons to collection list pages
- [ ] Implement hierarchical category display in admin UI
- [ ] Add breadcrumb support for category navigation
- [ ] Create cross-collection filtering API endpoints
- [ ] Update frontend to support category archive pages
- [ ] Add category/tag filtering to Archive blocks

### Mobile & UX
- [ ] Fix nested items accessibility on mobile (choose Option A, B, or C above)
- [ ] Test mobile UX with sidebar collapsed
- [ ] Investigate menu flashing on navigation

### Documentation & Customization
- [ ] Document Custom Content Type creation workflow
- [ ] Create templates for common use cases (FAQ, Team Member, Testimonial, Location, Service, Recipe, Course, Job Posting, Press Release, Case Study)

### Dashboard & Collection Management
- [ ] Add collection statistics to dashboard
- [ ] Implement bulk operations (publish, delete, duplicate, export)
- [ ] Build Collection Manager UI for drag-and-drop navigation
- [ ] Add import/export functionality (CSV/JSON)
- [ ] Implement duplicate collection feature
- [ ] Add batch edit capability
- [ ] Create saved views for filter combinations
- [ ] Add activity log for tracking changes
- [ ] Visualize collection relationships graph

---

## � **Roadmap & Future Enhancements**

### Priority: HIGH (1-2 weeks)

**1. Fix Mobile Nested Items Accessibility**
- Choose and implement one of the three options above
- Test on actual mobile devices
- Estimated effort: 5 minutes to 2 hours depending on option

**2. Dashboard Improvements**
- Add collection statistics (item counts, recent activity)
- Quick action buttons for common tasks
- Activity feed showing recent changes
- Estimated effort: 4-6 hours

### Priority: MEDIUM (2-4 weeks)

**3. Collection Manager UI**
- Enable/disable collections from admin UI
- Drag-and-drop menu reordering
- No code changes required
- Estimated effort: 8-12 hours

**4. Shared Taxonomy Features**
- Cross-collection filtering API endpoints
- Category archive pages showing all content types
- Breadcrumb navigation for hierarchical categories
- Estimated effort: 6-8 hours

**5. Additional Content Templates**
- FAQ Template: Question/answer pairs
- Team Member Template: Staff profiles with bios
- Testimonial Template: Customer reviews and quotes
- Location Template: Physical locations with maps
- Service Template: Service offerings with pricing
- Recipe Template: Cooking recipes with ingredients
- Course Template: Educational courses with lessons
- Job Posting Template: Career opportunities
- Press Release Template: News and announcements
- Case Study Template: Project showcases
- Estimated effort: 2-3 hours per template

### Priority: LOW (1+ months)

**6. Bulk Operations & Advanced Features**
- Bulk select and perform actions (publish, delete, duplicate, export)
- Import/Export: CSV/JSON data migration
- Duplicate entire collections with all items
- Batch edit multiple items at once
- Collection Templates: Save configurations as reusable templates
- Advanced Filters: Multiple criteria, date ranges, custom fields
- Saved Views: Save filter combinations for quick access
- Activity Log: Track who changed what and when
- Collection Relationships Graph: Visualize connections

**7. Rename museum-collections to galleries**
- Plan data migration strategy
- Update all code references
- Test thoroughly
- Estimated effort: 4-6 hours

---

## �🔧 **Code References**

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

---

## ❓ **FAQ - Common Questions Answered**

**Q: Can I add/remove/reorganize collections from the CMS admin without code changes?**
A: NO - Currently requires editing `payload.config.ts` and `navigation.ts`. This could be built as a future enhancement (Collection Manager UI).

**Q: Why does the menu still vanish when I navigate?**
A: Payload's routing causes the navigation component to unmount/remount. Caching helps but doesn't eliminate the flash. This is a Payload limitation that could be addressed with React Router integration.

**Q: Where is the artifacts collection? I can't see it in the CMS.**
A: It's been completely removed. Use `archive-items` instead - they're the same thing but more flexible.

**Q: Where is museum-collections? I can't see it to rename it.**
A: It exists as `museum-collections` in the code. Renaming to `galleries` requires renaming the collection file, updating the slug, updating all code references, and migrating database data. This is a breaking change that needs careful planning.

**Q: How do I create a custom collection type?**
A: Use the Archive Items template as a base and create a Custom Content Type. This allows you to add custom fields without duplicating code. See SHARED_TAXONOMY_SYSTEM.md for examples.

