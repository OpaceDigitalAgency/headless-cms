import type { Thing, WithContext } from 'schema-dts'

interface Settings {
  siteName?: string
  siteDescription?: string
  siteUrl?: string
  logo?: {
    url?: string
    alt?: string
  }
  socialProfiles?: Array<{
    platform?: string
    url?: string
  }>
}

interface Article {
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  updatedAt?: string
  author?: {
    name?: string
  }
  featuredImage?: {
    url?: string
    alt?: string
    width?: number
    height?: number
  }
  categories?: Array<{
    title?: string
    slug?: string
  }>
}

interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Generate WebSite schema with SearchAction
 */
export function generateWebsiteSchema(settings: Settings): WithContext<Thing> {
  const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.siteName || 'Website',
    description: settings.siteDescription,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(settings: Settings): WithContext<Thing> {
  const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const socialUrls = settings.socialProfiles?.map(profile => profile.url).filter(Boolean) || []

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.siteName || 'Organization',
    url: siteUrl,
    logo: settings.logo?.url ? {
      '@type': 'ImageObject',
      url: settings.logo.url,
    } : undefined,
    sameAs: socialUrls,
  }
}

/**
 * Generate Article schema (for blog posts)
 */
export function generateArticleSchema(
  article: Article,
  settings: Settings
): WithContext<Thing> {
  const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const articleUrl = `${siteUrl}/blog/${article.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url: articleUrl,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: article.author?.name ? {
      '@type': 'Person',
      name: article.author.name,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: settings.siteName || 'Publisher',
      logo: settings.logo?.url ? {
        '@type': 'ImageObject',
        url: settings.logo.url,
      } : undefined,
    },
    image: article.featuredImage?.url ? {
      '@type': 'ImageObject',
      url: article.featuredImage.url,
      width: article.featuredImage.width,
      height: article.featuredImage.height,
    } : undefined,
    articleSection: article.categories?.[0]?.title,
  }
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[]
): WithContext<Thing> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate FAQPage schema (for FAQ blocks)
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): WithContext<Thing> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate Person schema
 */
export function generatePersonSchema(
  person: {
    name: string
    slug: string
    bio?: string
    image?: { url?: string }
    jobTitle?: string
    email?: string
    socialProfiles?: Array<{ url?: string }>
  },
  settings: Settings
): WithContext<Thing> {
  const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const personUrl = `${siteUrl}/people/${person.slug}`
  const socialUrls = person.socialProfiles?.map(profile => profile.url).filter(Boolean) || []

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    url: personUrl,
    description: person.bio,
    image: person.image?.url,
    jobTitle: person.jobTitle,
    email: person.email,
    sameAs: socialUrls,
  }
}

/**
 * Generate Event schema
 */
export function generateEventSchema(
  event: {
    title: string
    slug: string
    description?: string
    startDate?: string
    endDate?: string
    location?: {
      name?: string
      address?: string
    }
    image?: { url?: string }
  },
  settings: Settings
): WithContext<Thing> {
  const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const eventUrl = `${siteUrl}/events/${event.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    url: eventUrl,
    startDate: event.startDate,
    endDate: event.endDate,
    image: event.image?.url,
    location: event.location?.name ? {
      '@type': 'Place',
      name: event.location.name,
      address: event.location.address,
    } : undefined,
    organizer: {
      '@type': 'Organization',
      name: settings.siteName || 'Organizer',
      url: siteUrl,
    },
  }
}

/**
 * Render JSON-LD script tag
 */
export function renderJsonLd(schema: WithContext<Thing> | WithContext<Thing>[]): string {
  return JSON.stringify(schema, null, 0)
}

