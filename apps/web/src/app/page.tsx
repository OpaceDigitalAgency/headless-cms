import { getPageBySlug, getPosts, getArchiveItems } from '@/lib/api'
import { PageRenderer } from '@/components/PageRenderer'
import { HomeTemplate } from '@repo/templates'

export default async function HomePage() {
  // Try to fetch a home page from CMS
  const page = await getPageBySlug('home').catch(() => null)

  if (page) {
    return <PageRenderer page={page} />
  }

  // Fallback: render default home page with latest content
  const [posts, archiveItems] = await Promise.all([
    getPosts({ limit: 3 }).catch(() => ({ docs: [] })),
    getArchiveItems({ limit: 3 }).catch(() => ({ docs: [] })),
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
          items: posts.docs.map((post) => ({
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
          subheading: 'Explore our archive items',
          items: archiveItems.docs.map((item) => ({
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

// Static generation - revalidation only via on-demand webhook
export const dynamic = 'force-static'
