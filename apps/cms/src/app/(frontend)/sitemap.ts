import { MetadataRoute } from 'next'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'

export const revalidate = 3600 // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const urls: MetadataRoute.Sitemap = [
    // Add homepage
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    }
  ]

  try {
    const payload = await getPayloadHMR({ config: configPromise })

    // Fetch all pages
    const pages = await payload.find({
      collection: 'pages',
      where: {
        _status: { equals: 'published' },
      },
      limit: 1000,
      depth: 0,
    })

    pages.docs.forEach((page) => {
      if (page.slug && page.slug !== 'home') {
        urls.push({
          url: `${siteUrl}/${page.slug}`,
          lastModified: new Date(page.updatedAt),
          changeFrequency: 'weekly',
          priority: 0.8,
        })
      }
    })

    // Fetch all posts
    const posts = await payload.find({
      collection: 'posts',
      where: {
        _status: { equals: 'published' },
      },
      limit: 1000,
      depth: 0,
    })

    posts.docs.forEach((post) => {
      if (post.slug) {
        urls.push({
          url: `${siteUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    })

    // Fetch all people
    const people = await payload.find({
      collection: 'people',
      where: {
        _status: { equals: 'published' },
      },
      limit: 1000,
      depth: 0,
    })

    people.docs.forEach((person) => {
      if (person.slug) {
        urls.push({
          url: `${siteUrl}/people/${person.slug}`,
          lastModified: new Date(person.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    })

    // Fetch all places
    const places = await payload.find({
      collection: 'places',
      where: {
        _status: { equals: 'published' },
      },
      limit: 1000,
      depth: 0,
    })

    places.docs.forEach((place) => {
      if (place.slug) {
        urls.push({
          url: `${siteUrl}/places/${place.slug}`,
          lastModified: new Date(place.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    })

    // Fetch all archive items
    const archiveItems = await payload.find({
      collection: 'archive-items',
      where: {
        _status: { equals: 'published' },
      },
      limit: 1000,
      depth: 0,
    })

    archiveItems.docs.forEach((item) => {
      if (item.slug) {
        urls.push({
          url: `${siteUrl}/archive-items/${item.slug}`,
          lastModified: new Date(item.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    })

    // Fetch all events
    const events = await payload.find({
      collection: 'events',
      where: {
        _status: { equals: 'published' },
      },
      limit: 1000,
      depth: 0,
    })

    events.docs.forEach((event) => {
      if (event.slug) {
        urls.push({
          url: `${siteUrl}/events/${event.slug}`,
          lastModified: new Date(event.updatedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }

  return urls
}

