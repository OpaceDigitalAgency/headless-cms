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
 * Fetch all published artifacts
 */
export async function getArtifacts(options?: { limit?: number; draft?: boolean }) {
  const payload = await getPayloadClient();
  
  return payload.find({
    collection: 'artifacts',
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
 * Fetch a single artifact by slug
 */
export async function getArtifactBySlug(slug: string, options?: { draft?: boolean }) {
  const payload = await getPayloadClient();
  
  const result = await payload.find({
    collection: 'artifacts',
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
 * Fetch all published museum collections
 */
export async function getMuseumCollections(options?: { limit?: number; draft?: boolean }) {
  const payload = await getPayloadClient();
  
  return payload.find({
    collection: 'museum-collections',
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
 * Fetch a single museum collection by slug
 */
export async function getMuseumCollectionBySlug(slug: string, options?: { draft?: boolean }) {
  const payload = await getPayloadClient();
  
  const result = await payload.find({
    collection: 'museum-collections',
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
