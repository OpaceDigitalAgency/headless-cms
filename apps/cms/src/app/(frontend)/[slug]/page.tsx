import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { Metadata } from 'next'
import { getPages, getPageBySlug } from '@/lib/payload-api'
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
    const pages = await getPages(1000)
    return pages.docs
      .filter((page: any) => page.slug !== 'home') // Home is handled by /page.tsx
      .map((page: any) => ({
        slug: page.slug,
      }))
  } catch (error) {
    console.error('Failed to generate static params for pages:', error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  try {
    const page = await getPageBySlug(slug, isDraftMode)

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
  const { isEnabled: isDraftMode } = await draftMode()

  try {
    const page = await getPageBySlug(slug, isDraftMode)

    if (!page) {
      notFound()
    }

    return <PageRenderer page={page} />
  } catch (error) {
    console.error(`Failed to fetch page ${slug}:`, error)
    notFound()
  }
}

// Static generation with ISR fallback
export const revalidate = 60

