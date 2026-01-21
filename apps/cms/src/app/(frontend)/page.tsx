import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getPageBySlug, getPosts, getArchiveItems, getSettings } from '@/lib/payload-api'
import { PageRenderer } from '@/components/PageRenderer'
import { HomeTemplate } from '@repo/templates'
import { generateEnhancedMetadata } from '@/lib/seo/metadata'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [page, settings] = await Promise.all([
      getPageBySlug('home').catch(() => null),
      getSettings(),
    ])

    if (page?.meta) {
      return generateEnhancedMetadata(page.meta, settings, '/')
    }

    // Fallback metadata
    return generateEnhancedMetadata(
      {
        title: settings.siteName || 'Home',
        description: settings.siteDescription || 'Welcome to our site',
        image: settings.defaultMeta?.image,
      },
      settings,
      '/'
    )
  } catch (error) {
    return {
      title: 'Home',
      description: 'Welcome',
    }
  }
}

export default async function HomePage() {
  const { isEnabled: isDraftMode } = await draftMode()

  // Try to fetch a home page from CMS
  const [page, settings] = await Promise.all([
    getPageBySlug('home', isDraftMode).catch(() => null),
    getSettings().catch(() => null),
  ])

  if (page) {
    return <PageRenderer page={page} settings={settings} />
  }

  // Fallback: render default home page with latest content
  const [posts, archiveItems] = await Promise.all([
    getPosts(3).catch(() => ({ docs: [] })),
    getArchiveItems(3).catch(() => ({ docs: [] })),
  ])

  return (
    <HomeTemplate
      hero={{
        heading: 'Welcome to Payload CMS + Jamstack',
        subheading: 'A modern, open-source CMS platform with static-first delivery',
        links: [
          { label: 'Get Started', url: '/admin', variant: 'primary' },
          { label: 'Learn More', url: '/about', variant: 'secondary' },
        ],
      }}
      sections={[
        {
          id: 'posts',
          type: 'featured',
          heading: 'Latest Posts',
          subheading: 'Stay updated with our latest content',
          items: posts.docs.map((post: any) => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            url: `/blog/${post.slug}`,
            image: post.featuredImage?.url
              ? { url: post.featuredImage.url, alt: post.featuredImage.alt }
              : undefined,
            date: post.publishedAt,
          })),
          cta: { label: 'View All Posts', url: '/blog' },
        },
        {
          id: 'archive-items',
          type: 'grid',
          heading: 'Featured Archive Items',
          subheading: 'Explore our collection',
          items: archiveItems.docs.map((item: any) => ({
            id: item.id,
            title: item.title,
            url: `/archive-items/${item.slug}`,
            image: item.gallery?.[0]?.image?.url
              ? { url: item.gallery[0].image.url, alt: item.title }
              : undefined,
          })),
          cta: { label: 'View All Items', url: '/archive-items' },
        },
        {
          id: 'cta',
          type: 'cta',
          heading: 'Ready to get started?',
          subheading: 'Create your first page in the admin panel',
          cta: { label: 'Open Admin', url: '/admin' },
        },
      ]}
    />
  )
}

// Static generation with ISR
export const revalidate = 60
