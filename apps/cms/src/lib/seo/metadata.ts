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
  siteName?: string
  siteDescription?: string
  siteUrl?: string
  defaultMeta?: {
    title?: string
    description?: string
    image?: {
      url?: string
      alt?: string
      width?: number
      height?: number
    }
  }
  twitterHandle?: string
}

/**
 * Generate enhanced metadata with SEO best practices
 */
export function generateEnhancedMetadata(
  seo: SEOData | undefined,
  settings: Settings,
  path: string = ''
): Metadata {
  const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const siteName = settings.siteName || 'Website'

  // Title with fallbacks
  const title = seo?.title || settings.defaultMeta?.title || siteName
  const description = seo?.description || settings.defaultMeta?.description || settings.siteDescription || ''

  // Image with fallbacks
  const ogImage = seo?.image?.url || settings.defaultMeta?.image?.url
  const ogImageAlt = seo?.image?.alt || settings.defaultMeta?.image?.alt || title
  const ogImageWidth = seo?.image?.width || settings.defaultMeta?.image?.width || 1200
  const ogImageHeight = seo?.image?.height || settings.defaultMeta?.image?.height || 630

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
    excerpt?: string
    publishedAt?: string
    updatedAt?: string
    author?: { name?: string }
    featuredImage?: {
      url?: string
      alt?: string
      width?: number
      height?: number
    }
    meta?: SEOData
  },
  settings: Settings,
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

