# Live Preview Setup Guide

## Overview

All collections in this CMS have **automatic live preview** configured. This means:

1. ✅ **Preview button** in the admin UI shows the full URL
2. ✅ **Live preview panel** updates in real-time as you edit
3. ✅ **Automatic configuration** for new collections

## How It Works

### For Existing Collections

All core collections already have live preview configured:

- **Pages** → `/[slug]` (home page → `/`)
- **Posts** → `/blog/[slug]`
- **Archive Items** → `/archive-items/[slug]`
- **Events** → `/events/[slug]`
- **People** → `/people/[slug]`
- **Places** → `/places/[slug]`
- **Categories** → `/categories/[slug]`
- **Tags** → `/tags/[slug]`
- **Custom Items** → `/items/[type]/[slug]`

### For New Collections

When creating a new collection, use the `withLivePreview()` helper:

```typescript
import type { CollectionConfig } from 'payload'
import { withLivePreview } from '../utils/livePreviewConfig'

export const MyNewCollection: CollectionConfig = {
  slug: 'my-collection',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    ...withLivePreview('my-collection'), // ← Add this line
  },
  // rest of config...
}
```

This automatically adds:
- Preview button with URL: `http://localhost:3001/my-collection/[slug]`
- Live preview panel
- Draft mode support

### Custom URL Paths

If your collection uses a different URL structure:

```typescript
import { withLivePreview } from '../utils/livePreviewConfig'

// Example: Services at /services/[slug]
...withLivePreview('services')

// Example: Case studies at /work/case-studies/[slug]
...withLivePreview('case-studies', {
  urlPath: (slug) => `/work/case-studies/${slug}`
})
```

### Using Presets

For common patterns, use the presets:

```typescript
import { livePreviewPresets } from '../utils/livePreviewConfig'

// Standard content collection
...livePreviewPresets.content('services')

// Blog-style with /blog prefix
...livePreviewPresets.blogPost()

// Taxonomy (categories/tags)
...livePreviewPresets.taxonomy('categories')
```

## Frontend Requirements

For live preview to work, you need:

### 1. Collection Page Routes

Create pages in `apps/cms/src/app/(frontend)/[collection]/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation'
import { getMyCollectionBySlug, getMyCollection } from '@/lib/payload-api'

export async function generateStaticParams() {
  const items = await getMyCollection(1000)
  return items.docs.map((item) => ({ slug: item.slug }))
}

export default async function MyCollectionPage({ params }) {
  const { slug } = await params
  const item = await getMyCollectionBySlug(slug)
  
  if (!item) notFound()
  
  return <div>{/* Render your content */}</div>
}

export const dynamicParams = false
export const dynamic = 'force-static'
```

### 2. API Functions

Add to `apps/cms/src/lib/payload-api.ts`:

```typescript
export const getMyCollection = unstable_cache(
  async (limit = 100) => {
    const payload = await getPayloadClient()
    return payload.find({
      collection: 'my-collection',
      limit,
      where: { _status: { equals: 'published' } },
      depth: 2,
    })
  },
  ['my-collection'],
  { tags: ['my-collection'] }
)

export const getMyCollectionBySlug = async (slug: string, draft = false) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'my-collection',
    where: { slug: { equals: slug } },
    depth: 2,
    draft,
    limit: 1,
  })
  return result.docs[0] || null
}
```

### 3. Draft API Route

The draft route (`apps/cms/src/app/(frontend)/api/draft/route.ts`) needs to handle your collection:

```typescript
case 'my-collection':
  redirectUrl = `/my-collection/${slug}`
  break
```

## Troubleshooting

### Preview Shows 404

**Problem**: Clicking preview shows "Page Not Found"

**Solution**: 
1. Check that the frontend page exists at the correct path
2. Verify the collection slug matches the URL path
3. Check the draft API route includes your collection

### Preview Shows Error

**Problem**: Preview panel shows error message

**Solution**:
1. Check that the page component renders without errors
2. Verify all required fields are populated
3. Check browser console for JavaScript errors

### No Preview Button

**Problem**: No preview button appears in admin

**Solution**:
1. Ensure `withLivePreview()` is added to admin config
2. Check that the document has a `slug` field
3. Verify `versions.drafts` is enabled for the collection

## Best Practices

1. **Always use `withLivePreview()`** for new collections
2. **Create frontend pages** before enabling preview
3. **Test preview** with draft content before publishing
4. **Use consistent URL patterns** across collections
5. **Document custom URL paths** in collection comments

