import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPage, getPages } from '@/lib/api'
import { PageRenderer } from '@/components/PageRenderer'

interface PageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static params for all published pages
 * This runs at build time to pre-render all pages
 */
export async function generateStaticParams() {
  try {
    const pages = await getPages({ limit: 1000, where: { _status: { equals: 'published' } } })
    return pages.docs
      .filter((page) => page.slug !== 'home') // Home is handled by /page.tsx
      .map((page) => ({
        slug: page.slug,
      }))
  } catch (error) {
    console.error('Failed to generate static params for pages:', error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const page = await getPage(slug)
    
    if (!page) {
      return {
        title: 'Page Not Found',
      }
    }

    return {
      title: page.meta?.title || page.title,
      description: page.meta?.description,
      openGraph: {
        title: page.meta?.title || page.title,
        description: page.meta?.description || undefined,
        images: page.meta?.image?.url ? [page.meta.image.url] : undefined,
      },
    }
  } catch (error) {
    return {
      title: 'Page Not Found',
    }
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  
  try {
    const page = await getPage(slug)

    if (!page) {
      notFound()
    }

    return <PageRenderer page={page} />
  } catch (error) {
    console.error(`Failed to fetch page ${slug}:`, error)
    notFound()
  }
}

// CRITICAL: Static generation only
// - dynamicParams = false: Unknown slugs return 404, no server generation
// - No revalidate: Updates only via on-demand revalidation from Payload hooks
export const dynamicParams = false
export const dynamic = 'force-static'
