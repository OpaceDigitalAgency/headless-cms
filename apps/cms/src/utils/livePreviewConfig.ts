import type { CollectionConfig } from 'payload'
import { getPreviewUrl } from './preview'

/**
 * Standard Live Preview Configuration
 * 
 * This provides a consistent preview configuration for all collections.
 * Use this helper to ensure all collections (including new ones) automatically
 * get working live preview with proper URL display.
 * 
 * @param collection - The collection slug
 * @param options - Optional configuration
 * @returns Admin config with preview and livePreview configured
 */
export function createLivePreviewConfig(
  collection: string,
  options: {
    /** Custom URL path builder. Defaults to `/${collection}/${slug}` */
    urlPath?: (slug: string) => string
    /** Whether to use draft API route. Defaults to true for collections with drafts */
    useDraftApi?: boolean
  } = {}
) {
  const { urlPath, useDraftApi = true } = options

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'

  // Default URL builder
  const buildUrl = (slug: string) => {
    if (urlPath) {
      return `${baseUrl}${urlPath(slug)}`
    }
    return `${baseUrl}/${collection}/${slug}`
  }

  return {
    preview: (doc: any) => {
      if (useDraftApi) {
        return getPreviewUrl({ collection, slug: doc.slug })
      }
      return buildUrl(doc.slug)
    },
    livePreview: {
      url: ({ data }: { data: any }) => {
        if (!data?.slug) return null
        return buildUrl(data.slug)
      },
    },
  }
}

/**
 * Preset configurations for common collection types
 */
export const livePreviewPresets = {
  /** Standard content collection (posts, events, people, etc.) */
  content: (collection: string) => createLivePreviewConfig(collection),

  /** Blog posts with /blog prefix */
  blogPost: () => createLivePreviewConfig('posts', {
    urlPath: (slug) => `/blog/${slug}`,
  }),

  /** Pages (handles home page special case) */
  page: () => createLivePreviewConfig('pages', {
    urlPath: (slug) => slug === 'home' ? '/' : `/${slug}`,
  }),

  /** Taxonomy (categories/tags) - direct URL, no draft API */
  taxonomy: (collection: 'categories' | 'tags') => createLivePreviewConfig(collection, {
    useDraftApi: false,
  }),

  /** Custom items with dynamic type prefix */
  customItem: () => ({
    preview: (doc: any) => {
      if (doc.contentType && typeof doc.contentType === 'object' && doc.contentType.slug) {
        const typeSlug = doc.contentType.archiveSlug
          ? doc.contentType.archiveSlug.replace(/^\/?items\//, '')
          : doc.contentType.slug
        return getPreviewUrl({ collection: 'custom-items', slug: `${typeSlug}/${doc.slug}` })
      }
      return getPreviewUrl({ collection: 'custom-items', slug: doc.slug })
    },
    livePreview: {
      url: ({ data }: { data: any }) => {
        if (!data?.slug || !data?.contentType) return null

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'

        if (typeof data.contentType === 'object' && data.contentType.slug) {
          const typeSlug = data.contentType.archiveSlug
            ? data.contentType.archiveSlug.replace(/^\/?items\//, '')
            : data.contentType.slug
          return `${baseUrl}/items/${typeSlug}/${data.slug}`
        }

        return `${baseUrl}/items/${data.slug}`
      },
    },
  }),
}

/**
 * Helper to add live preview to a collection config
 * 
 * Usage:
 * ```ts
 * export const MyCollection: CollectionConfig = {
 *   slug: 'my-collection',
 *   admin: {
 *     ...withLivePreview('my-collection'),
 *     // other admin config
 *   },
 *   // rest of config
 * }
 * ```
 */
export function withLivePreview(
  collection: string,
  options?: Parameters<typeof createLivePreviewConfig>[1]
) {
  return createLivePreviewConfig(collection, options)
}

