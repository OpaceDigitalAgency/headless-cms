// @ts-nocheck
import type { Endpoint } from 'payload'

/**
 * Taxonomy Filtering Endpoints
 *
 * Provides cross-collection filtering by category or tag.
 * Returns all content across Posts, Archive Items, Events, People, and Custom Items
 * that match the specified taxonomy term.
 */

/**
 * Helper function to fetch all docs from a collection by taxonomy
 */
async function fetchByTaxonomy(
  payload: any,
  collectionSlug: string,
  taxonomyField: 'categories' | 'tags',
  taxonomyId: string,
  limit: number = 100
) {
  try {
    const result = await payload.find({
      collection: collectionSlug,
      where: {
        [taxonomyField]: {
          in: [taxonomyId],
        },
        _status: {
          equals: 'published',
        },
      },
      limit,
      sort: '-publishedAt',
    })

    return result.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title || doc.name,
      slug: doc.slug,
      collection: collectionSlug,
      publishedAt: doc.publishedAt,
      updatedAt: doc.updatedAt,
      excerpt: doc.excerpt,
      featuredImage: doc.featuredImage,
      _status: doc._status,
    }))
  } catch (error) {
    // Collection might not exist or be enabled
    return []
  }
}

/**
 * GET /api/taxonomy/category/:slug
 * Returns all content tagged with a specific category
 */
export const getCategoryContentEndpoint: Endpoint = {
  path: '/taxonomy/category/:slug',
  method: 'get',
  handler: async (req) => {
    try {
      const { payload, routeParams } = req
      const categorySlug = routeParams?.slug

      if (!categorySlug) {
        return Response.json(
          { error: 'Category slug is required' },
          { status: 400 }
        )
      }

      // Find the category
      const categoryResult = await payload.find({
        collection: 'categories',
        where: {
          slug: {
            equals: categorySlug,
          },
        },
        limit: 1,
      })

      if (!categoryResult.docs.length) {
        return Response.json(
          { error: 'Category not found' },
          { status: 404 }
        )
      }

      const category = categoryResult.docs[0]

      // Fetch content from all collections that use categories
      const [posts, archiveItems, events, people, customItems] = await Promise.all([
        fetchByTaxonomy(payload, 'posts', 'categories', category.id),
        fetchByTaxonomy(payload, 'archive-items', 'categories', category.id),
        fetchByTaxonomy(payload, 'events', 'categories', category.id),
        fetchByTaxonomy(payload, 'people', 'categories', category.id),
        fetchByTaxonomy(payload, 'custom-items', 'categories', category.id),
      ])

      // Combine and sort by date
      const allContent = [...posts, ...archiveItems, ...events, ...people, ...customItems]
      allContent.sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.updatedAt).getTime()
        const dateB = new Date(b.publishedAt || b.updatedAt).getTime()
        return dateB - dateA
      })

      return Response.json({
        category: {
          id: category.id,
          title: category.title,
          slug: category.slug,
          description: category.description,
          featuredImage: category.featuredImage,
          parent: category.parent,
        },
        content: allContent,
        counts: {
          total: allContent.length,
          posts: posts.length,
          archiveItems: archiveItems.length,
          events: events.length,
          people: people.length,
          customItems: customItems.length,
        },
      })
    } catch (error) {
      payload.logger.error(`Error fetching category content: ${error}`)
      return Response.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  },
}

/**
 * GET /api/taxonomy/tag/:slug
 * Returns all content tagged with a specific tag
 */
export const getTagContentEndpoint: Endpoint = {
  path: '/taxonomy/tag/:slug',
  method: 'get',
  handler: async (req) => {
    try {
      const { payload, routeParams } = req
      const tagSlug = routeParams?.slug

      if (!tagSlug) {
        return Response.json(
          { error: 'Tag slug is required' },
          { status: 400 }
        )
      }

      // Find the tag
      const tagResult = await payload.find({
        collection: 'tags',
        where: {
          slug: {
            equals: tagSlug,
          },
        },
        limit: 1,
      })

      if (!tagResult.docs.length) {
        return Response.json(
          { error: 'Tag not found' },
          { status: 404 }
        )
      }

      const tag = tagResult.docs[0]

      // Fetch content from all collections that use tags
      const [posts, archiveItems, events, people, customItems] = await Promise.all([
        fetchByTaxonomy(payload, 'posts', 'tags', tag.id),
        fetchByTaxonomy(payload, 'archive-items', 'tags', tag.id),
        fetchByTaxonomy(payload, 'events', 'tags', tag.id),
        fetchByTaxonomy(payload, 'people', 'tags', tag.id),
        fetchByTaxonomy(payload, 'custom-items', 'tags', tag.id),
      ])

      // Combine and sort by date
      const allContent = [...posts, ...archiveItems, ...events, ...people, ...customItems]
      allContent.sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.updatedAt).getTime()
        const dateB = new Date(b.publishedAt || b.updatedAt).getTime()
        return dateB - dateA
      })

      return Response.json({
        tag: {
          id: tag.id,
          title: tag.title,
          slug: tag.slug,
          description: tag.description,
        },
        content: allContent,
        counts: {
          total: allContent.length,
          posts: posts.length,
          archiveItems: archiveItems.length,
          events: events.length,
          people: people.length,
          customItems: customItems.length,
        },
      })
    } catch (error) {
      payload.logger.error(`Error fetching tag content: ${error}`)
      return Response.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  },
}

export const taxonomyEndpoints: Endpoint[] = [
  getCategoryContentEndpoint,
  getTagContentEndpoint,
]

