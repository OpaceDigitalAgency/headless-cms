# Shared Taxonomy System & Hierarchical Categories

## Admin Menu Design

The CMS admin navigation is organized into logical sections to improve usability and accessibility:

```
Dashboard
├── Dashboard (overview)

Content
├── Pages
├── Posts
├── Events
├── Custom Items

Taxonomy (NEW - Separate Section)
├── Categories (hierarchical, shared across content)
├── Tags (shared across content)

Collections
├── Archive Items (flexible, customizable base collection)
├── People
├── Places
├── Museum Collections (galleries/exhibitions)

Shop
├── Products
├── Product Categories
├── Product Collections

Media
├── Media Library

Forms
├── Forms
├── Form Submissions

Settings
├── Settings
├── Header
├── Footer
├── Redirects
├── Search Index

Admin
├── Users
├── Content Types (for creating custom collections)
```

### Key Design Decisions

1. **Taxonomy Section Separated** - Categories and Tags are now in their own section, making them easily accessible on mobile and desktop
2. **Archive Items as Base** - Single flexible collection that can be customized for any use case (museum artifacts, gallery pieces, portfolio items, etc.)
3. **No Redundant Collections** - Removed "Artifacts" collection (was redundant with Archive Items)
4. **Shared Taxonomy** - Categories and Tags are shared across Posts, Archive Items, Events, People, and Custom Items (NOT ecommerce)
5. **Hierarchical Categories** - Categories support parent-child relationships for unlimited nesting depth

---

## Overview

This document describes the unified taxonomy system for content collections, addressing:
- **Nested Items Inaccessible on Mobile** (Issue: Categories/Tags hidden when sidebar collapsed)
- **Shared Taxonomy System** (Categories/Tags across all content types)
- **Hierarchical Category Architecture** (Parent-child category relationships)
- **Generic Archive System** (Flexible, customizable for any collection type)

---

## Architecture

### Collections Using Shared Taxonomy

**Content Collections** (share `categories` and `tags`):
- Posts
- Archive Items (museum artifacts, gallery pieces, portfolio items, collectibles)
- Events
- People
- Custom Items (via Custom Content Types)

**Ecommerce Collections** (separate taxonomy):
- Products → `product-categories` and `product-collections`

**Grouping Collections** (no taxonomy):
- Museum Collections (galleries/exhibitions)
- Places

---

## Why Shared Taxonomy?

### Use Case: Museum Website

```
Category: "Ancient Egypt"
├── Archive Item: "Egyptian Sarcophagus"
├── Event: "Egyptian Mummies Exhibition"
├── Post: "Blog: Discovering Ancient Egypt"
└── Person: "Cleopatra"

Tag: "1960s"
├── Archive Item: "1965 Ford Mustang"
├── Archive Item: "1967 Chevrolet Camaro"
├── Event: "60s Car Rally"
└── Post: "The Swinging Sixties in Automotive Design"
```

### Benefits

✅ **Cross-Collection Filtering** - "Show me everything about Ancient Egypt"
✅ **Unified Content Discovery** - Users find related content across types
✅ **Fewer Collections to Manage** - One category list, not separate ones
✅ **Thematic Organization** - Perfect for museums, educational sites, archives
✅ **Flexible Customization** - Custom Content Types inherit taxonomy

---

## Hierarchical Categories

### Structure

Categories support **parent-child relationships** for nested organization:

```
History
├── Ancient History
│   ├── Ancient Rome
│   ├── Ancient Egypt
│   └── Ancient Greece
├── Medieval History
│   ├── Early Medieval
│   └── High Medieval
└── Modern History
    ├── Industrial Era
    └── Digital Age

Art
├── Renaissance
├── Impressionism
└── Modern Art
    ├── Abstract
    └── Surrealism
```

### Admin UI Display

**Categories List View:**
```
📁 History (12 items)
   📁 Ancient History (8 items)
      📄 Ancient Rome (3 items)
      📄 Ancient Egypt (2 items)
      📄 Ancient Greece (3 items)
   📁 Medieval History (2 items)
   📁 Modern History (2 items)

📁 Art (8 items)
   📄 Renaissance (2 items)
   📄 Impressionism (1 item)
   📁 Modern Art (5 items)
      📄 Abstract (3 items)
      📄 Surrealism (2 items)
```

### Benefits

✅ **Cleaner Organization** - Prevents flat, overwhelming category lists
✅ **Better Navigation** - Users drill down to specific topics
✅ **Breadcrumb Support** - Shows path: History > Ancient History > Ancient Rome
✅ **Flexible Depth** - No limit on nesting levels
✅ **Prevents Duplicates** - "Ancient Rome" appears once, not in multiple places

---

## Mobile UX: Manage Categories/Tags Buttons

### Problem

When sidebar is collapsed on mobile, Categories/Tags are hidden:
```
❌ BEFORE (Sidebar Collapsed)
Content
├── Pages
├── Posts
└── Archive Items
   (Categories/Tags hidden!)
```

### Solution: Quick-Access Buttons

Add "Manage Categories" and "Manage Tags" buttons to collection list pages:

**Posts List View:**
```
┌─────────────────────────────────────┐
│ Posts                               │
├─────────────────────────────────────┤
│ [+ New Post] [Manage Categories] [Manage Tags] │
├─────────────────────────────────────┤
│ ✓ Blog Post 1                       │
│ ✓ Blog Post 2                       │
│ ✓ Blog Post 3                       │
└─────────────────────────────────────┘
```

**Archive Items List View:**
```
┌─────────────────────────────────────┐
│ Archive Items                       │
├─────────────────────────────────────┤
│ [+ New Item] [Manage Categories] [Manage Tags] │
├─────────────────────────────────────┤
│ ✓ Roman Vase                        │
│ ✓ Ancient Coin                      │
│ ✓ Medieval Sword                    │
└─────────────────────────────────────┘
```

### Implementation

Buttons appear on:
- Posts list page
- Archive Items list page
- Events list page
- People list page

Clicking opens the Categories/Tags collection in a modal or new tab.

---

## Navigation Structure

### Correct Sidebar Organization

```
Dashboard
├── Overview
└── Tools

Content
├── Pages
├── Posts
├── Archive Items
├── Events
└── Custom Items

Taxonomy (NEW SECTION - Shared Across All Content)
├── Categories (hierarchical, parent-child relationships)
└── Tags

Collections
├── People
├── Places
└── Museum Collections (galleries/exhibitions)

Shop (Ecommerce - Separate Taxonomy)
├── Products
├── Product Categories
└── Product Collections

Media
└── Media Library

Forms
├── Forms
└── Form Submissions

Settings
├── Settings
├── Header
├── Footer
├── Redirects
└── Search Index

Admin
└── Users
```

**Key Points:**
- ✅ Categories/Tags are **independent**, not nested under Posts
- ✅ Clearly shows they're **shared** across Posts, Archive Items, Events, People, Custom Items
- ✅ Product taxonomy is **separate** (ecommerce-specific)
- ✅ Museum Collections is a **grouping collection**, not taxonomy
- ✅ Archive Items is the **flexible base** for any collection type
- ✅ **No Artifacts collection** - use Archive Items instead

---

## Generic Archive System

### Base: Archive Items Collection

The `archive-items` collection is the flexible foundation:

```typescript
Archive Item
├── Title, Slug, Featured Image
├── Description (Rich Text)
├── Media Gallery
├── Specifications (Height, Width, Depth, Weight, Materials, Condition)
├── Provenance (Date Created, Date Acquired, Catalog Number)
├── Relationships (Creators, Origins, Related Items, Collections)
├── Taxonomy (Categories, Tags)
└── Content Blocks (Flexible sections)
```

### Customization via Custom Content Types

Create specialized versions without duplicating code:

**Example 1: Museum Artifacts**
```
Based on: Archive Items template
Renamed to: "Artifacts"
Added fields: Exhibition History, Conservation Notes
Categories: "Roman Era", "Medieval", "Modern"
```

**Example 2: Classic Cars**
```
Based on: Archive Items template
Renamed to: "Vehicles"
Added fields: Engine Specs, Restoration History, Top Speed
Categories: "American Muscle", "European Sports", "Japanese Classics"
```

**Example 3: Art Gallery**
```
Based: Archive Items template
Renamed to: "Artworks"
Added fields: Artist, Medium, Period, Dimensions
Categories: "Renaissance", "Impressionism", "Modern Art"
```

---

## Filtering Examples

### Single Collection Filtering

```typescript
// Get ONLY posts tagged "ancient-rome"
const posts = await getPosts({ tag: 'ancient-rome' })

// Get ONLY archive items tagged "ancient-rome"
const artifacts = await getArchiveItems({ tag: 'ancient-rome' })

// Get ONLY events in "Ancient History" category
const events = await getEvents({ category: 'ancient-history' })
```

### Cross-Collection Filtering

```typescript
// Get EVERYTHING tagged "ancient-rome" across all collections
const allContent = await Promise.all([
  getPosts({ tag: 'ancient-rome' }),
  getArchiveItems({ tag: 'ancient-rome' }),
  getEvents({ tag: 'ancient-rome' }),
  getPeople({ tag: 'ancient-rome' }),
])

// Combine and sort by date
const combined = allContent.flat().sort((a, b) => 
  new Date(b.updatedAt) - new Date(a.updatedAt)
)
```

### Frontend: Category Archive Page

```
Category: "Ancient Rome"

📦 Archive Items (12)
  - Roman Vase
  - Ancient Coin Collection
  - ...

📅 Upcoming Events (3)
  - Roman History Lecture - March 15
  - Ancient Rome Exhibition - April 1
  - ...

📝 Related Articles (5)
  - Blog: Life in Ancient Rome
  - Guide: Roman Architecture
  - ...

👥 Related People (8)
  - Julius Caesar
  - Augustus
  - ...
```

---

## Implementation Checklist

- [x] Remove `artifacts` collection (redundant with archive-items)
- [x] Update navigation to show Taxonomy section separately
- [ ] Add "Manage Categories/Tags" buttons to collection list pages
- [ ] Implement hierarchical category display in admin UI
- [ ] Add breadcrumb support for category navigation
- [ ] Create cross-collection filtering API endpoints
- [ ] Update frontend to support category archive pages
- [ ] Add category/tag filtering to Archive blocks
- [ ] Test mobile UX with sidebar collapsed
- [ ] Document Custom Content Type creation workflow

---

## Related Issues

- **Nested Items Inaccessible on Mobile** - Solved by "Manage Categories/Tags" buttons
- **Shared Taxonomy System** - Implemented across Posts, Archive Items, Events, People
- **Generic Archive Architecture** - Archive Items as flexible base for Custom Content Types

---

## Implementation Progress

### ✅ Completed

1. **Removed Artifacts Collection**
   - Deleted `/artifacts` page routes from web and astro apps
   - Removed artifacts from all API functions (getArtifacts, getArtifactBySlug)
   - Updated all references in blocks and components to use archive-items
   - Removed artifacts from icon maps and navigation configuration

2. **Separated Taxonomy Section**
   - Categories and Tags now in dedicated "Taxonomy" section in admin navigation
   - No longer nested under Posts (fixes mobile accessibility issue)
   - Clearly visible as shared resources across all content types
   - Updated navigation.ts to create separate Taxonomy section

3. **Updated Navigation Structure**
   - Dashboard section: Overview, Tools
   - Content section: Pages, Posts, Archive Items, Events, Custom Items
   - **Taxonomy section (NEW)**: Categories, Tags
   - Collections section: People, Places, Museum Collections
   - Shop section: Products, Product Categories, Product Collections
   - Media, Forms, Settings, Admin sections

4. **Updated All References to Archive Items**
   - Web app: Updated getArchiveItems() API functions
   - Astro app: Updated getArchiveItems() API functions
   - Archive.ts block: Changed relationTo from 'artifacts' to 'archive-items'
   - ArchiveBlock.tsx (web): Updated switch case to use archive-items
   - ArchiveBlock.tsx (cms): Updated switch case to use archive-items
   - ArchiveBlock.astro: Updated paths and field references
   - CollectionRenderer.tsx (web): Updated to use archiveItems field
   - CollectionRenderer.tsx (cms): Updated to use archiveItems field
   - Collections page (astro): Updated to use archiveItems field

5. **Fixed InvalidFieldRelationship Error**
   - Removed all references to 'artifacts' collection from codebase
   - Updated seed data to use 'archive-items' instead of 'artifacts'
   - Updated Timeline block to use 'archive-items' relationTo
   - Updated all API endpoints (draft, revalidate) to use 'archive-items'
   - Updated preview page to use 'archive-items' collection
   - Updated home page to use getArchiveItems() function
   - Updated payload.config.ts plugins to reference 'archive-items'
   - Updated SeedDataManager component to use 'archive-items'
   - Updated ArchiveBlock component to use 'archive-items'
   - Updated core seeder to remove artifacts seeding
   - Updated resetData endpoint to use 'archive-items'
   - **✅ Dev server now starts successfully with no InvalidFieldRelationship errors**
   - **✅ All artifacts references removed from codebase**

### 📋 Remaining Tasks

- [ ] Test Archive Items functionality
- [ ] Test cross-collection filtering with shared taxonomy
- [ ] Test hierarchical category display in admin UI
- [ ] Test mobile navigation with collapsed sidebar
- [ ] Document Custom Content Type creation workflow

