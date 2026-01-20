/**
 * Payload Local Loader for Astro
 * 
 * This module provides access to Payload CMS data at build time using the Local API.
 * The Local API bypasses HTTP and directly accesses the database, making it ideal
 * for static site generation.
 * 
 * Usage:
 * - Import getPayloadClient() to get a configured Payload instance
 * - Use the Local API methods (find, findByID, etc.) to fetch content
 * - All data is fetched at build time for static generation
 */

import { getPayload as getPayloadInstance, type Payload } from 'payload';
import config from '../../../cms/src/payload.config';

// Cache the Payload instance
let cachedPayload: Payload | null = null;

/**
 * Get a configured Payload client instance
 * Uses the Local API for direct database access
 */
export async function getPayloadClient(): Promise<Payload> {
  if (cachedPayload) {
    return cachedPayload;
  }

  cachedPayload = await getPayloadInstance({
    config,
  });

  return cachedPayload;
}

/**
 * Fetch all published pages
 */
export async function getPages(options?: { limit?: number; draft?: boolean }) {
  const payload = await getPayloadClient();
  
  return payload.find({
    collection: 'pages',
    limit: options?.limit || 100,
    draft: options?.draft || false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 2,
  });
}

/**
 * Fetch a single page by slug
 */
export async function getPageBySlug(slug: string, options?: { draft?: boolean }) {
  const payload = await getPayloadClient();
  
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
      ...(options?.draft ? {} : { _status: { equals: 'published' } }),
    },
    draft: options?.draft || false,
    depth: 2,
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch all published posts
 */
export async function getPosts(options?: { limit?: number; draft?: boolean }) {
  const payload = await getPayloadClient();
  
  return payload.find({
    collection: 'posts',
    limit: options?.limit || 100,
    draft: options?.draft || false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    depth: 2,
  });
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string, options?: { draft?: boolean }) {
  const payload = await getPayloadClient();
  
  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
      ...(options?.draft ? {} : { _status: { equals: 'published' } }),
    },
    draft: options?.draft || false,
    depth: 2,
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch all published archive items
 */
export async function getArchiveItems(options?: { limit?: number; draft?: boolean }) {
  const payload = await getPayloadClient();

  return payload.find({
    collection: 'archive-items',
    limit: options?.limit || 100,
    draft: options?.draft || false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 2,
  });
}

/**
 * Fetch a single archive item by slug
 */
export async function getArchiveItemBySlug(slug: string, options?: { draft?: boolean }) {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: 'archive-items',
    where: {
      slug: {
        equals: slug,
      },
      ...(options?.draft ? {} : { _status: { equals: 'published' } }),
    },
    draft: options?.draft || false,
    depth: 2,
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch all published people
 */
export async function getPeople(options?: { limit?: number; draft?: boolean }) {
  const payload = await getPayloadClient();
  
  return payload.find({
    collection: 'people',
    limit: options?.limit || 100,
    draft: options?.draft || false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 2,
  });
}

/**
 * Fetch a single person by slug
 */
export async function getPersonBySlug(slug: string, options?: { draft?: boolean }) {
  const payload = await getPayloadClient();
  
  const result = await payload.find({
    collection: 'people',
    where: {
      slug: {
        equals: slug,
      },
      ...(options?.draft ? {} : { _status: { equals: 'published' } }),
    },
    draft: options?.draft || false,
    depth: 2,
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch all content types
 */
export async function getContentTypes() {
  const payload = await getPayloadClient();

  return payload.find({
    collection: 'content-types',
    limit: 100,
    depth: 1,
  });
}

/**
 * Fetch content type by slug
 */
export async function getContentTypeBySlug(slug: string) {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: 'content-types',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  });

  return result.docs[0] || null;
}

export async function getContentTypeBySlugOrArchiveSlug(slug: string) {
  const payload = await getPayloadClient();
  const archiveSlug = slug.startsWith('items/') ? slug : `items/${slug}`;

  const result = await payload.find({
    collection: 'content-types',
    where: {
      or: [
        { slug: { equals: slug } },
        { archiveSlug: { equals: archiveSlug } },
      ],
    },
    depth: 1,
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch custom items by content type id
 */
export async function getCustomItemsByType(contentTypeId: string, options?: { limit?: number }) {
  const payload = await getPayloadClient();

  return payload.find({
    collection: 'custom-items',
    limit: options?.limit || 100,
    where: {
      contentType: {
        equals: contentTypeId,
      },
      status: {
        equals: 'published',
      },
    },
    sort: '-updatedAt',
    depth: 2,
  });
}

/**
 * Fetch custom item by slug and content type id
 */
export async function getCustomItemBySlug(slug: string, contentTypeId: string) {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: 'custom-items',
    where: {
      slug: {
        equals: slug,
      },
      contentType: {
        equals: contentTypeId,
      },
      status: {
        equals: 'published',
      },
    },
    depth: 2,
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch all published places
 */
export async function getPlaces(options?: { limit?: number; draft?: boolean }) {
  const payload = await getPayloadClient();
  
  return payload.find({
    collection: 'places',
    limit: options?.limit || 100,
    draft: options?.draft || false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    depth: 2,
  });
}

/**
 * Fetch a single place by slug
 */
export async function getPlaceBySlug(slug: string, options?: { draft?: boolean }) {
  const payload = await getPayloadClient();
  
  const result = await payload.find({
    collection: 'places',
    where: {
      slug: {
        equals: slug,
      },
      ...(options?.draft ? {} : { _status: { equals: 'published' } }),
    },
    draft: options?.draft || false,
    depth: 2,
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch global settings
 */
export async function getSettings() {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: 'settings' });
}

/**
 * Fetch header global
 */
export async function getHeader() {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: 'header' });
}

/**
 * Fetch footer global
 */
export async function getFooter() {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: 'footer' });
}

/**
 * Fetch categories
 */
export async function getCategories(options?: { limit?: number }) {
  const payload = await getPayloadClient();

  return payload.find({
    collection: 'categories',
    limit: options?.limit || 100,
    depth: 1,
  });
}

/**
 * Fetch a single category by slug
 */
export async function getCategoryBySlug(slug: string) {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch tags
 */
export async function getTags(options?: { limit?: number }) {
  const payload = await getPayloadClient();

  return payload.find({
    collection: 'tags',
    limit: options?.limit || 100,
  });
}

/**
 * Fetch a single tag by slug
 */
export async function getTagBySlug(slug: string) {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: 'tags',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  });

  return result.docs[0] || null;
}

/**
 * Fetch all content across collections for a specific category
 */
export async function getCategoryContent(slug: string) {
  const payload = await getPayloadClient();

  // Find the category first
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return null;
  }

  // Fetch content from all collections that use categories
  const [posts, archiveItems, events, people, customItems] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: {
        categories: { in: [category.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
    payload.find({
      collection: 'archive-items',
      where: {
        categories: { in: [category.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
    payload.find({
      collection: 'events',
      where: {
        categories: { in: [category.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
    payload.find({
      collection: 'people',
      where: {
        categories: { in: [category.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-updatedAt',
    }),
    payload.find({
      collection: 'custom-items',
      where: {
        categories: { in: [category.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
  ]);

  // Combine and format content
  const allContent = [
    ...posts.docs.map((doc: any) => ({ ...doc, collection: 'posts' })),
    ...archiveItems.docs.map((doc: any) => ({ ...doc, collection: 'archive-items' })),
    ...events.docs.map((doc: any) => ({ ...doc, collection: 'events' })),
    ...people.docs.map((doc: any) => ({ ...doc, collection: 'people' })),
    ...customItems.docs.map((doc: any) => ({ ...doc, collection: 'custom-items' })),
  ];

  // Sort by date
  allContent.sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.updatedAt).getTime();
    const dateB = new Date(b.publishedAt || b.updatedAt).getTime();
    return dateB - dateA;
  });

  return {
    category,
    content: allContent,
    counts: {
      total: allContent.length,
      posts: posts.docs.length,
      archiveItems: archiveItems.docs.length,
      events: events.docs.length,
      people: people.docs.length,
      customItems: customItems.docs.length,
    },
  };
}

/**
 * Fetch all content across collections for a specific tag
 */
export async function getTagContent(slug: string) {
  const payload = await getPayloadClient();

  // Find the tag first
  const tag = await getTagBySlug(slug);
  if (!tag) {
    return null;
  }

  // Fetch content from all collections that use tags
  const [posts, archiveItems, events, people, customItems] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: {
        tags: { in: [tag.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
    payload.find({
      collection: 'archive-items',
      where: {
        tags: { in: [tag.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
    payload.find({
      collection: 'events',
      where: {
        tags: { in: [tag.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
    payload.find({
      collection: 'people',
      where: {
        tags: { in: [tag.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-updatedAt',
    }),
    payload.find({
      collection: 'custom-items',
      where: {
        tags: { in: [tag.id] },
        _status: { equals: 'published' },
      },
      limit: 100,
      sort: '-publishedAt',
    }),
  ]);

  // Combine and format content
  const allContent = [
    ...posts.docs.map((doc: any) => ({ ...doc, collection: 'posts' })),
    ...archiveItems.docs.map((doc: any) => ({ ...doc, collection: 'archive-items' })),
    ...events.docs.map((doc: any) => ({ ...doc, collection: 'events' })),
    ...people.docs.map((doc: any) => ({ ...doc, collection: 'people' })),
    ...customItems.docs.map((doc: any) => ({ ...doc, collection: 'custom-items' })),
  ];

  // Sort by date
  allContent.sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.updatedAt).getTime();
    const dateB = new Date(b.publishedAt || b.updatedAt).getTime();
    return dateB - dateA;
  });

  return {
    tag,
    content: allContent,
    counts: {
      total: allContent.length,
      posts: posts.docs.length,
      archiveItems: archiveItems.docs.length,
      events: events.docs.length,
      people: people.docs.length,
      customItems: customItems.docs.length,
    },
  };
}
