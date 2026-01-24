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
      const metaImage = page.meta.image && typeof page.meta.image === 'object'
        ? {
          url: page.meta.image.url || null,
          alt: page.meta.image.alt || null,
          width: page.meta.image.width || null,
          height: page.meta.image.height || null,
        }
        : null

      return generateEnhancedMetadata(
        {
          ...page.meta,
          image: metaImage,
        },
        settings,
        '/'
      )
    }

    // Fallback metadata


    return generateEnhancedMetadata(
      {
        title: settings.siteName || 'Home',
        description: settings.siteDescription || 'Welcome to our site',
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

  const hasSettings = Boolean(settings)
  const hasContent = posts.docs.length > 0 || archiveItems.docs.length > 0
  const showSetupState = !hasSettings

  const sections = [
    ...(showSetupState
      ? [
        {
          id: 'setup-state',
          type: 'content' as const,
          heading: 'Setup required',
          content: (
            <div className="setup-grid">
              <div className="setup-card">
                <p className="setup-kicker">Status</p>
                <p className="setup-status">CMS globals are missing</p>
                <p className="setup-note">
                  The admin and API rely on a database connection. This page is a safe fallback
                  while your CMS is still bootstrapping.
                </p>
              </div>
              <div className="setup-card">
                <p className="setup-kicker">Next steps</p>
                <ol className="setup-list">
                  <li>Provision the database and run migrations.</li>
                  <li>Open the admin panel to create site settings.</li>
                  <li>Publish a homepage to replace this fallback.</li>
                </ol>
              </div>
            </div>
          ),
        },
      ]
      : []),
    {
      id: 'posts',
      type: 'featured' as const,
      heading: 'Latest Posts',
      subheading: hasContent ? 'Stay updated with our latest content' : 'No posts yet. Add your first post in the admin panel.',
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
      type: 'grid' as const,
      heading: 'Featured Archive Items',
      subheading: hasContent ? 'Explore our collection' : 'No archive items yet. Add content once the CMS is ready.',
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
      type: 'cta' as const,
      heading: hasSettings ? 'Ready to get started?' : 'Finish setup in the admin panel',
      subheading: hasSettings
        ? 'Create your first page in the admin panel'
        : 'Once the database is online, you can configure site settings and publish content.',
      cta: { label: 'Open Admin', url: '/admin' },
    },
  ]

  return (
    <HomeTemplate
      hero={{
        heading: showSetupState ? 'Your site is almost ready' : 'Welcome to Payload CMS + Jamstack',
        subheading: showSetupState
          ? 'The frontend is deployed, but the CMS needs a database connection to load content.'
          : 'A modern, open-source CMS platform with static-first delivery',
        links: [
          { label: 'Get Started', url: '/admin', variant: 'primary' },
          { label: 'Learn More', url: '/about', variant: 'secondary' },
        ],
      }}
      sections={sections}
    />
  )
}

// Static generation with ISR
export const revalidate = 60
