# Collection Management - Current Status & Roadmap

## ❌ **Current Limitation: Code Changes Required**

**You asked:** "Can I add/remove/reorganize collections from the CMS admin UI?"

**Answer:** **NO - Currently requires code changes**

### What Requires Code Changes:

1. **Adding a new collection** → Edit `payload.config.ts`
2. **Removing a collection** → Edit `payload.config.ts` and `navigation.ts`
3. **Renaming a collection** → Edit collection file + all references
4. **Reorganizing navigation** → Edit `navigation.ts`

---

## 🔴 **Immediate Actions Needed (Code Changes)**

### 1. Hide `artifacts` Collection (Redundant)

**Why:** We have both `artifacts` and `archive-items` - they're the same thing!

**How to hide:**
```typescript
// File: apps/cms/src/collections/Artifacts.ts
export const Artifacts: CollectionConfig = {
  slug: 'artifacts',
  admin: {
    hidden: true, // ← Add this line
    // ... rest of config
  },
}
```

**Result:** `artifacts` disappears from navigation and dashboard

---

### 2. Rename `museum-collections` to `galleries`

**Why:** "Museum" is too specific - it's just ONE type of gallery

**How to rename:**

**Step 1:** Rename the collection file
```bash
mv apps/cms/src/collections/Collections.ts apps/cms/src/collections/Galleries.ts
```

**Step 2:** Update the collection config
```typescript
// File: apps/cms/src/collections/Galleries.ts
export const Galleries: CollectionConfig = {
  slug: 'galleries', // ← Change from 'museum-collections'
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Collections', // ← Change from 'Museum'
    description: 'Galleries and curated collections',
    // ...
  },
}
```

**Step 3:** Update payload.config.ts
```typescript
import { Galleries } from './collections/Galleries' // ← Change import

collections: [
  // ...
  Galleries, // ← Change from MuseumCollections
]
```

**Step 4:** Update navigation.ts
```typescript
const collectionsSectionSlugs = [
  'archive-items',
  'people',
  'places',
  'events',
  'products',
  'product-categories',
  'product-collections',
  'galleries', // ← Change from 'museum-collections'
]
```

**Step 5:** Update icon map
```typescript
const iconMap: Record<string, string> = {
  // ...
  galleries: 'collection', // ← Add this
}
```

---

## ✅ **What's Already Fixed**

1. ✅ **Navigation is dynamic** - Reads from Payload collections
2. ✅ **Dashboard is dynamic** - Shows all collections automatically
3. ✅ **No section labels** - Direct links to collections
4. ✅ **Nested items only for Posts and Products**
5. ✅ **Collapsed sidebar hides nested items**
6. ✅ **Menu caching** - Loads instantly

---

## 🚀 **Future Enhancement: CMS UI for Collection Management**

### What Would Be Needed:

**1. Collection Manager UI** (New admin page)
- List all collections
- Enable/disable collections
- Reorder navigation
- Assign to sections (Content vs Collections)
- Configure nesting

**2. Dynamic Collection Creator** (Advanced)
- Create collections from templates
- No code changes required
- Store config in database
- Generate collection on-the-fly

**3. Navigation Configurator**
- Drag-and-drop navigation builder
- Create custom sections
- Nest collections
- Save to database

### Implementation Complexity:

| Feature | Complexity | Time Estimate |
|---------|-----------|---------------|
| Hide/Show collections | Easy | 2 hours |
| Reorder navigation | Medium | 4 hours |
| Dynamic collection creator | Hard | 2-3 days |
| Full UI configurator | Very Hard | 1-2 weeks |

---

## 📋 **Current Collections**

### Content Section:
- `pages` - Static pages
- `posts` - Blog posts
  - `categories` (nested)
  - `tags` (nested)

### Collections Section:
- `archive-items` - Generic archive items ✅ **KEEP**
- `artifacts` - Museum artifacts 🔴 **HIDE (redundant)**
- `people` - Historical figures
- `places` - Geographic locations
- `events` - Events and exhibitions
- `products` - Shop products
  - `product-categories` (nested)
  - `product-collections` (nested)
- `museum-collections` - Galleries 🔴 **RENAME to `galleries`**

### Other:
- `media` - Media library
- `forms` - Contact forms
- `form-submissions` - Form submissions
- `redirects` - URL redirects
- `users` - Admin users
- `content-types` - Dynamic content types
- `custom-items` - Custom content items

---

## ✅ **Recommended Actions**

### Do Now (Code Changes):
1. Hide `artifacts` collection
2. Rename `museum-collections` to `galleries`
3. Test navigation and dashboard

### Do Later (Future Enhancement):
1. Build Collection Manager UI
2. Add drag-and-drop navigation builder
3. Implement dynamic collection creator

---

## 🎯 **Summary**

**Current State:**
- ❌ Collection management requires code changes
- ✅ Navigation is dynamic (reads from collections)
- ✅ Dashboard is dynamic (shows all collections)

**To Make It Fully Dynamic:**
- Need to build a Collection Manager UI
- Store navigation config in database
- Create dynamic collection generator

**For Now:**
- Make code changes to hide/rename collections
- Use the dynamic navigation system
- Plan for future UI enhancements

