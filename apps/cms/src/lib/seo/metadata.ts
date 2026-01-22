// @ts-nocheck
import type { Metadata } from 'next'

interface SEOData {
  title?: string | null
  description?: string | null
  image?: {
    url?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
  } | null
  noindex?: boolean
  canonical?: string
}

interface Settings {
  siteName?: string | null
  siteDescription?: string | null
  siteUrl?: string | null
  defaultMeta?: {
    title?: string | null
    description?: string | null
    image?: {
      url?: string | null
      alt?: string | null
      width?: number | null
      height?: number | null
    } | null
  } | null
  twitterHandle?: string | null
}

/**
 * Transform Payload settings to match the Settings interface
 * Handles Media objects that might be IDs or populated objects
 */
export function transformSettings(settings: any): Settings {
  const defaultMetaImage = settings.defaultMeta?.image && typeof settings.defaultMeta.image === 'object'
    ? {
        url: settings.defaultMeta.image.url || null,
        alt: settings.defaultMeta.image.alt || null,
        width: settings.defaultMeta.image.width || null,
        height: settings.defaultMeta.image.height || null,
      }
    : null

  return {
    ...settings,
    defaultMeta: settings.defaultMeta ? {
      ...settings.defaultMeta,
      image: defaultMetaImage,
    } : null,
  }
}

/**
 * Generate enhanced metadata with SEO best practices
 */
export function generateEnhancedMetadata(
  seo: SEOData | undefined,
  settings: Settings | any,
  path: string = ''
): Metadata {
  // Transform settings if needed
  const transformedSettings = settings.defaultMeta?.image && typeof settings.defaultMeta.image !== 'object'
    ? transformSettings(settings)
    : settings

  const siteUrl = transformedSettings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const siteName = transformedSettings.siteName || 'Website'

  // Title with fallbacks
  const title = seo?.title || transformedSettings.defaultMeta?.title || siteName
  const description = seo?.description || transformedSettings.defaultMeta?.description || transformedSettings.siteDescription || ''

  // Image with fallbacks
  const ogImage = seo?.image?.url || transformedSettings.defaultMeta?.image?.url
  const ogImageAlt = seo?.image?.alt || transformedSettings.defaultMeta?.image?.alt || title
  const ogImageWidth = seo?.image?.width || transformedSettings.defaultMeta?.image?.width || 1200
  const ogImageHeight = seo?.image?.height || transformedSettings.defaultMeta?.image?.height || 630

  // Canonical URL
  const canonical = seo?.canonical || `${siteUrl}${path}`

  // Robots
  const robots = seo?.noindex
    ? {
      index: false,
      follow: false,
    }
    : {
      index: true,
      follow: true,
    }

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical,
    },
    robots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      type: 'website',
      locale: 'en_GB',
      images: ogImage
        ? [
          {
            url: ogImage,
            alt: ogImageAlt,
            width: ogImageWidth,
            height: ogImageHeight,
          },
        ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
      creator: settings.twitterHandle ? `@${settings.twitterHandle}` : undefined,
      site: settings.twitterHandle ? `@${settings.twitterHandle}` : undefined,
    },
  }

  return metadata
}

/**
 * Generate article-specific metadata
 */
export function generateArticleMetadata(
  article: {
    title: string
    excerpt?: string | null
    publishedAt?: string | null
    updatedAt?: string | null
    author?: { name?: string | null } | null
    featuredImage?: {
      url?: string | null
      alt?: string | null
      width?: number | null
      height?: number | null
    } | null
    meta?: SEOData
  },
  settings: Settings | any,
  path: string
): Metadata {
  const baseMetadata = generateEnhancedMetadata(
    article.meta || {
      title: article.title,
      description: article.excerpt,
      image: article.featuredImage,
    },
    settings,
    path
  )

  // Add article-specific OpenGraph data
  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: article.author?.name ? [article.author.name] : undefined,
    },
  }
}

