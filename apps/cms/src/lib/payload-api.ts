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

// ===========================================
// Artifacts
// ===========================================

export const getArtifacts = unstable_cache(
  async (limit = 100) => {
    const payload = await getPayloadClient()
    return payload.find({
      collection: 'artifacts',
      limit,
      where: { _status: { equals: 'published' } },
      depth: 2,
    })
  },
  ['artifacts'],
  { tags: ['artifacts'] }
)

export const getArtifactBySlug = async (slug: string, draft = false) => {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'artifacts',
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

// ===========================================
// Museum Collections
// ===========================================

export const getMuseumCollections = unstable_cache(
  async (limit = 100) => {
    const payload = await getPayloadClient()
    return payload.find({
      collection: 'museum-collections',
      limit,
      where: { _status: { equals: 'published' } },
      depth: 2,
    })
  },
  ['museum-collections'],
  { tags: ['museum-collections'] }
)

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
