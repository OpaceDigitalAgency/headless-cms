/**
 * Payload Local API Utilities
 * 
 * These functions use Payload's Local API for direct database access.
 * This is more efficient than REST API calls since we're in the same process.
 * 
 * Benefits:
 * - No network overhead
 * - Direct database access
 * - Native TypeScript types
 * - Simpler revalidation (direct revalidatePath/revalidateTag calls)
 */

import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { unstable_cache } from 'next/cache'

// Get Payload instance
export const getPayloadClient = async () => {
  return await getPayload({ config: configPromise })
}

// ===========================================
// Pages
// ===========================================

export const getPages = unstable_cache(
  async (limit = 100) => {
    const payload = await getPayloadClient()
    return payload.find({
      collection: 'pages',
      limit,
      where: { _status: { equals: 'published' } },
      depth: 2,
    })
  },
  ['pages'],
  { tags: ['pages'] }
)

export const getPageBySlug = async (slug: string, draft = false) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    depth: 2,
    draft,
    limit: 1,
  })

  return result.docs[0] || null
}

// ===========================================
// Posts
// ===========================================

export const getPosts = unstable_cache(
  async (limit = 100) => {
    const payload = await getPayloadClient()
    return payload.find({
      collection: 'posts',
      limit,
      where: { _status: { equals: 'published' } },
      depth: 2,
      sort: '-publishedAt',
    })
  },
  ['posts'],
  { tags: ['posts'] }
)

export const getPostBySlug = async (slug: string, draft = false) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    depth: 2,
    draft,
    limit: 1,
  })

  return result.docs[0] || null
}

export const getPostsByCategory = async (categoryId: string | number, limit = 100) => {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'posts',
    limit,
    where: {
      _status: { equals: 'published' },
      categories: { in: [categoryId] },
    },
    depth: 2,
    sort: '-publishedAt',
  })
}

export const getPostsByTag = async (tagId: string | number, limit = 100) => {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'posts',
    limit,
    where: {
      _status: { equals: 'published' },
      tags: { in: [tagId] },
    },
    depth: 2,
    sort: '-publishedAt',
  })
}

// ===========================================
// Categories
// ===========================================

export const getCategories = async (limit = 1000) => {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'categories',
    limit,
    depth: 1,
  })
}

export const getCategoryBySlug = async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  return result.docs[0] || null
}

// ===========================================
// Tags
// ===========================================

export const getTags = async (limit = 1000) => {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'tags',
    limit,
    depth: 1,
  })
}

export const getTagBySlug = async (slug: string) => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'tags',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  return result.docs[0] || null
}

// ===========================================
// Archive Items (replaces artifacts)
// ===========================================

export const getArchiveItems = unstable_cache(
  async (limit = 100) => {
    const payload = await getPayloadClient()
    return payload.find({
      collection: 'archive-items',
      limit,
      where: { _status: { equals: 'published' } },
      depth: 2,
    })
  },
  ['archive-items'],
  { tags: ['archive-items'] }
)

export const getArchiveItemBySlug = async (slug: string, draft = false) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'archive-items',
    where: { slug: { equals: slug } },
    depth: 2,
    draft,
    limit: 1,
  })

  return result.docs[0] || null
}

// ===========================================
// Events
// ===========================================

export const getEvents = unstable_cache(
  async (limit = 100) => {
    const payload = await getPayloadClient()
    return payload.find({
      collection: 'events',
      limit,
      where: { _status: { equals: 'published' } },
      depth: 2,
      sort: '-startDate',
    })
  },
  ['events'],
  { tags: ['events'] }
)

export const getEventBySlug = async (slug: string, draft = false) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    depth: 2,
    draft,
    limit: 1,
  })

  return result.docs[0] || null
}

// ===========================================
// People
// ===========================================

export const getPeople = unstable_cache(
  async (limit = 100) => {
    const payload = await getPayloadClient()
    return payload.find({
      collection: 'people',
      limit,
      where: { _status: { equals: 'published' } },
      depth: 2,
    })
  },
  ['people'],
  { tags: ['people'] }
)

export const getPersonBySlug = async (slug: string, draft = false) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'people',
    where: { slug: { equals: slug } },
    depth: 2,
    draft,
    limit: 1,
  })

  return result.docs[0] || null
}

// ===========================================
// Places
// ===========================================

export const getPlaces = unstable_cache(
  async (limit = 100) => {
    const payload = await getPayloadClient()
    return payload.find({
      collection: 'places',
      limit,
      where: { _status: { equals: 'published' } },
      depth: 2,
    })
  },
  ['places'],
  { tags: ['places'] }
)

export const getPlaceBySlug = async (slug: string, draft = false) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'places',
    where: { slug: { equals: slug } },
    depth: 2,
    draft,
    limit: 1,
  })

  return result.docs[0] || null
}

// ===========================================
// Custom Items
// ===========================================

export const getCustomItems = unstable_cache(
  async (limit = 100, contentTypeId?: string) => {
    const payload = await getPayloadClient()
    const where: any = { _status: { equals: 'published' } }
    if (contentTypeId) {
      where.contentType = { equals: contentTypeId }
    }
    return payload.find({
      collection: 'custom-items',
      limit,
      where,
      depth: 2,
    })
  },
  ['custom-items'],
  { tags: ['custom-items'] }
)

// ===========================================
// Globals
// ===========================================

export const getHeader = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({
      slug: 'header',
      depth: 2,
    })
  },
  ['header'],
  { tags: ['header'] }
)

export const getFooter = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({
      slug: 'footer',
      depth: 2,
    })
  },
  ['footer'],
  { tags: ['footer'] }
)

export const getSettings = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({
      slug: 'settings',
      depth: 2,
    })
  },
  ['settings'],
  { tags: ['settings'] }
)
