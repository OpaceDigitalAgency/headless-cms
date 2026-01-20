import { notFound, redirect } from 'next/navigation'
import { Metadata } from 'next'
import { getContentTypeBySlugOrArchiveSlug, getContentTypes } from '@/lib/api'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static params for all published collections
 * This runs at build time to pre-render all collection pages
 */
export async function generateStaticParams() {
  try {
    const types = await getContentTypes({ limit: 1000 })
    return types.docs
      .filter((type: any) => type.hasArchive !== false && type.template === 'archive-item')
      .map((type: any) => ({
        slug: type.archiveSlug ? type.archiveSlug.replace(/^\\/?items\\//, '') : type.slug,
      }))
  } catch (error) {
    console.error('Failed to generate static params for collections:', error)
    return []
  }
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params

  const contentType = await getContentTypeBySlugOrArchiveSlug(slug).catch(() => null)
  if (!contentType) {
    return { title: 'Collection Not Found' }
  }

  return {
    title: contentType.pluralLabel || contentType.name,
    description: contentType.description || undefined,
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const contentType = await getContentTypeBySlugOrArchiveSlug(slug).catch(() => null)
  if (!contentType || contentType.hasArchive === false) {
    notFound()
  }

  const archivePath = contentType.archiveSlug
    ? `/${contentType.archiveSlug.replace(/^\\//, '')}`
    : `/items/${contentType.slug}`
  redirect(archivePath)
}

// CRITICAL: Static generation only
// - dynamicParams = false: Unknown slugs return 404, no server generation
// - No revalidate: Updates only via on-demand revalidation from Payload hooks
export const dynamicParams = false
export const dynamic = 'force-static'
