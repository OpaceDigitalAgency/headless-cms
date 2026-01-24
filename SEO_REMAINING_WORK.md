# SEO Remaining Work

## ⚠️ CRITICAL: Settings Schema Issues (2026-01-24)

### Problem
The Settings.ts schema had a **critical syntax error** that broke Railway deployments:
- SEO field groups (`seo` and `seoAdvanced`) were placed **outside** the fields array
- This caused webpack compilation errors: "Unexpected token `{`"

### Fix Applied
**Moved SEO groups into the tabs array as a new "SEO" tab:**
```typescript
{
  label: 'SEO',
  fields: [
    {
      name: 'seo',
      type: 'group',
      admin: { hidden: true },
      fields: [...]
    },
    {
      name: 'seoAdvanced',
      type: 'group',
      admin: { hidden: true },
      fields: [...]
    }
  ]
}
```

### Features Temporarily Disabled

#### 1. **defaultMeta Image Support**
- **What broke:** Frontend pages referenced `settings.defaultMeta` which no longer exists
- **Files affected:**
  - `apps/cms/src/app/(frontend)/page.tsx`
  - `apps/cms/src/app/(frontend)/[slug]/page.tsx`
  - `apps/cms/src/app/(frontend)/archive-items/[slug]/page.tsx`
- **Fix applied:** Removed all `settings.defaultMeta` references
- **To restore:** Need to add a proper `defaultMeta` group with image field to Settings schema

#### 2. **Custom robots.txt Support**
- **What broke:** `apps/cms/src/app/(frontend)/robots.ts` referenced `settings.robotsTxt`
- **Fix applied:** Commented out the custom robotsTxt logic (lines 20-27)
- **To restore:** 
  1. Add `robotsTxt` field to Settings schema (likely in SEO or Advanced tab)
  2. Uncomment the logic in `robots.ts`

### Schema Restructure Summary

**Before (BROKEN):**
```typescript
fields: [
  { type: 'tabs', tabs: [...] }
],
{ name: 'seo', ... },      // ❌ Outside fields array!
{ name: 'seoAdvanced', ... } // ❌ Outside fields array!
```

**After (WORKING):**
```typescript
fields: [
  {
    type: 'tabs',
    tabs: [
      ...existing tabs,
      { label: 'SEO', fields: [seo, seoAdvanced] }
    ]
  }
]
```

### Other Fixes
- Fixed `CustomItems.ts`: `BeforeList` → `beforeList` (Payload naming convention)
- Fixed `seo-templates.ts`: Added null check for `req.json()`

---

## Next Steps to Fully Restore SEO Features

### 1. Add Missing Fields to Settings Schema
Add to the appropriate tab in `apps/cms/src/globals/Settings.ts`:

```typescript
{
  name: 'defaultMeta',
  type: 'group',
  label: 'Default Meta',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Default Meta Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Default Meta Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Default OG Image',
    },
  ],
},
{
  name: 'robotsTxt',
  type: 'textarea',
  label: 'Custom robots.txt',
  admin: {
    description: 'Custom robots.txt content (advanced users only)',
  },
}
```

### 2. Restore Frontend Code
Once fields are added:
1. Uncomment robotsTxt logic in `apps/cms/src/app/(frontend)/robots.ts`
2. Add back defaultMeta image handling in frontend pages if needed

### 3. Test Build Before Deploying
```bash
pnpm --filter @repo/cms build
```

---

## Original SEO Work Items

*(Keep existing items below this section)*
