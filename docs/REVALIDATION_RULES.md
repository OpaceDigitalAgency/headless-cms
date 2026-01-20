# Publish Invalidation Rules

> **Version:** 1.0.0  
> **Last Updated:** January 2025

This document defines the cache invalidation and revalidation rules for the Payload CMS + Jamstack platform. It ensures that content changes are properly reflected on the frontend without unnecessary cache busting.

---

## Overview

The platform uses **tag-based revalidation** to efficiently invalidate only the affected pages when content changes. This approach:

- Minimizes unnecessary rebuilds
- Ensures content freshness
- Maintains fast page loads through caching
- Supports both ISR (Incremental Static Regeneration) and on-demand revalidation

---

## Tag Naming Convention

### Standard Tag Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| `collection:{slug}` | All items in a collection | `collection:posts` |
| `{collection}:{id}` | Specific document by ID | `posts:abc123` |
| `{collection}:slug:{slug}` | Specific document by slug | `posts:slug:my-post` |
| `archive:{collection}` | Archive/listing pages | `archive:posts` |
| `taxonomy:{type}:{slug}` | Taxonomy term pages | `taxonomy:category:tech` |
| `global:{slug}` | Global settings | `global:header` |
| `page:{slug}` | Specific page by slug | `page:home` |

### Collection-Specific Tags

#### Pages
```
collection:pages
pages:{id}
pages:slug:{slug}
page:{slug}
```

#### Posts
```
collection:posts
posts:{id}
posts:slug:{slug}
archive:posts
taxonomy:category:{category-slug}
taxonomy:author:{author-slug}
```

#### Archive Items
```
collection:archive-items
archive-items:{id}
archive-items:slug:{slug}
archive:archive-items
taxonomy:category:{category-slug}
taxonomy:tag:{tag-slug}
```

#### People
```
collection:people
people:{id}
people:slug:{slug}
archive:people
```

#### Places
```
collection:places
places:{id}
places:slug:{slug}
archive:places
```

#### Products (Ecommerce)
```
collection:products
products:{id}
products:slug:{slug}
archive:products
taxonomy:product-category:{slug}
taxonomy:product-collection:{slug}
```

---

## Dependency Matrix

This matrix shows which tags should be invalidated when specific content changes.

### Content Changes

| When This Changes | Invalidate These Tags |
|-------------------|----------------------|
| Page published | `pages:{id}`, `page:{slug}`, `collection:pages` |
| Post published | `posts:{id}`, `posts:slug:{slug}`, `archive:posts`, `taxonomy:category:{cat}` for each category |
| Archive Item published | `archive-items:{id}`, `archive:archive-items`, `taxonomy:category:{cat}`, `taxonomy:tag:{tag}` |
| Person published | `people:{id}`, `archive:people`, `archive:archive-items` (related items) |
| Place published | `places:{id}`, `archive:places`, `archive:archive-items` (related items) |
| Category updated | `categories:{id}`, `taxonomy:category:{slug}`, `archive:posts` |
| Product published | `products:{id}`, `archive:products`, `taxonomy:product-category:{cat}`, `taxonomy:product-collection:{col}` |

### Global Changes

| When This Changes | Invalidate These Tags |
|-------------------|----------------------|
| Header updated | `global:header`, ALL pages |
| Footer updated | `global:footer`, ALL pages |
| Settings updated | `global:settings`, ALL pages |

### Media Changes

| When This Changes | Invalidate These Tags |
|-------------------|----------------------|
| Media updated | `media:{id}`, all documents referencing this media |
| Media deleted | `media:{id}`, all documents referencing this media |

---

## Implementation

### Revalidation Endpoint

The CMS provides a revalidation endpoint that the frontend can call:

```typescript
// POST /api/revalidate
interface RevalidateRequest {
  secret: string           // REVALIDATION_SECRET
  collection: string       // Collection slug
  slug?: string           // Document slug
  id?: string             // Document ID
  tags?: string[]         // Additional tags to invalidate
  operation: 'create' | 'update' | 'delete'
}
```

### Hook Implementation

Each collection should implement revalidation in its `afterChange` hook:

```typescript
// apps/cms/src/collections/Posts.ts
hooks: {
  afterChange: [
    async ({ doc, req, operation }) => {
      if (doc._status === 'published') {
        const tags = [
          `posts:${doc.id}`,
          `posts:slug:${doc.slug}`,
          `archive:posts`,
        ]
        
        // Add category tags
        if (doc.categories?.length) {
          for (const cat of doc.categories) {
            const category = typeof cat === 'string' 
              ? await req.payload.findByID({ collection: 'categories', id: cat })
              : cat
            tags.push(`taxonomy:category:${category.slug}`)
          }
        }
        
        await triggerRevalidation(req, tags)
      }
      return doc
    },
  ],
}
```

### Frontend Tag Usage

The frontend should tag pages with appropriate cache tags:

```typescript
// Next.js example
import { unstable_cache } from 'next/cache'

export const getPost = unstable_cache(
  async (slug: string) => {
    const post = await fetchPost(slug)
    return post
  },
  ['post'],
  {
    tags: [`posts:slug:${slug}`, 'collection:posts'],
    revalidate: 3600, // 1 hour fallback
  }
)
```

### Astro Implementation

For Astro (SSG), revalidation triggers a rebuild:

```typescript
// Webhook handler
export async function POST({ request }) {
  const { tags } = await request.json()
  
  // Trigger rebuild via CI/CD
  await fetch(process.env.BUILD_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({ tags }),
  })
  
  return new Response('OK')
}
```

---

## Security

### Authentication

All revalidation requests must include the `REVALIDATION_SECRET`:

```typescript
// Validate secret
if (request.headers.get('x-revalidation-secret') !== process.env.REVALIDATION_SECRET) {
  return new Response('Unauthorized', { status: 401 })
}
```

### Rate Limiting

Implement rate limiting to prevent abuse:

```typescript
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Max 100 requests per minute
}
```

### IP Allowlist (Optional)

For additional security, restrict revalidation to known IPs:

```typescript
const ALLOWED_IPS = [
  process.env.CMS_IP,
  '127.0.0.1',
]
```

---

## Best Practices

### 1. Be Specific with Tags

Prefer specific tags over broad ones:

```typescript
// ✅ Good - specific
tags: [`posts:${id}`, `taxonomy:category:${categorySlug}`]

// ❌ Bad - too broad
tags: ['collection:posts', 'collection:categories']
```

### 2. Handle Relationships

When content has relationships, invalidate related content:

```typescript
// When a person is updated, also invalidate their archive items
const relatedItems = await payload.find({
  collection: 'archive-items',
  where: { creators: { contains: personId } },
})

for (const item of relatedItems.docs) {
  tags.push(`archive-items:${item.id}`)
}
```

### 3. Batch Invalidations

Group related invalidations to reduce API calls:

```typescript
// ✅ Good - single call with multiple tags
await revalidate({ tags: ['posts:1', 'posts:2', 'archive:posts'] })

// ❌ Bad - multiple calls
await revalidate({ tags: ['posts:1'] })
await revalidate({ tags: ['posts:2'] })
await revalidate({ tags: ['archive:posts'] })
```

### 4. Use Fallback Revalidation

Always set a fallback revalidation time:

```typescript
{
  tags: ['posts:slug:my-post'],
  revalidate: 3600, // Fallback: revalidate after 1 hour even without explicit invalidation
}
```

### 5. Log Revalidations

Log all revalidation events for debugging:

```typescript
payload.logger.info(`Revalidating tags: ${tags.join(', ')}`)
```

---

## Troubleshooting

### Content Not Updating

1. Check that the document is published (`_status: 'published'`)
2. Verify the `afterChange` hook is firing
3. Check revalidation endpoint logs
4. Verify `REVALIDATION_SECRET` matches between CMS and frontend

### Too Many Revalidations

1. Review tag specificity
2. Check for circular dependencies
3. Implement debouncing for bulk operations

### Stale Content After Deploy

1. Clear CDN cache
2. Trigger full site rebuild
3. Check environment variables are correct

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REVALIDATION_SECRET` | Shared secret for auth | Yes |
| `NEXT_PUBLIC_SITE_URL` | Frontend URL | Yes |
| `PAYLOAD_PUBLIC_SERVER_URL` | CMS URL | Yes |

---

## API Reference

### Trigger Revalidation

```typescript
async function triggerRevalidation(
  req: PayloadRequest,
  tags: string[]
): Promise<void> {
  const frontendUrl = process.env.NEXT_PUBLIC_SITE_URL
  
  await fetch(`${frontendUrl}/api/revalidate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-revalidation-secret': process.env.REVALIDATION_SECRET,
    },
    body: JSON.stringify({ tags }),
  })
}
```

### Revalidate by Path

```typescript
// For path-based revalidation (Next.js)
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  const { path } = await request.json()
  revalidatePath(path)
  return Response.json({ revalidated: true })
}
```

### Revalidate by Tag

```typescript
// For tag-based revalidation (Next.js)
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const { tags } = await request.json()
  tags.forEach(tag => revalidateTag(tag))
  return Response.json({ revalidated: true, tags })
}
```
