import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { Metadata } from 'next'
import { getPages, getPageBySlug, getSettings } from '@/lib/payload-api'
import { PageRenderer } from '@/components/PageRenderer'
import { generateEnhancedMetadata } from '@/lib/seo/metadata'

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
    const [page, settings] = await Promise.all([
      getPageBySlug(slug, isDraftMode),
      getSettings(),
    ])

    if (!page) {
      return {
        title: 'Page Not Found',
      }
    }

    // Transform meta image if it's a Media object
    const metaImage = page.meta?.image && typeof page.meta.image === 'object'
      ? {
          url: page.meta.image.url || null,
          alt: page.meta.image.alt || null,
          width: page.meta.image.width || null,
          height: page.meta.image.height || null,
        }
      : null

    // Transform settings defaultMeta image if it's a Media object
    const defaultMetaImage = settings.defaultMeta?.image && typeof settings.defaultMeta.image === 'object'
      ? {
          url: settings.defaultMeta.image.url || null,
          alt: settings.defaultMeta.image.alt || null,
          width: settings.defaultMeta.image.width || null,
          height: settings.defaultMeta.image.height || null,
        }
      : null

    return generateEnhancedMetadata(
      {
        ...page.meta,
        title: page.meta?.title || page.title,
        image: metaImage,
      },
      {
        ...settings,
        defaultMeta: settings.defaultMeta ? {
          ...settings.defaultMeta,
          image: defaultMetaImage,
        } : null,
      },
      `/${slug}`
    )
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
    const [page, settings] = await Promise.all([
      getPageBySlug(slug, isDraftMode),
      getSettings().catch(() => null),
    ])

    if (!page) {
      notFound()
    }

    return <PageRenderer page={page} settings={settings} />
  } catch (error) {
    console.error(`Failed to fetch page ${slug}:`, error)
    notFound()
  }
}

// Static generation with ISR fallback
export const revalidate = 60

