import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getMuseumCollection, getMuseumCollections } from '@/lib/api'
import { CollectionRenderer } from '@/components/CollectionRenderer'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static params for all published collections
 * This runs at build time to pre-render all collection pages
 */
export async function generateStaticParams() {
  try {
    const collections = await getMuseumCollections({ limit: 1000, where: { _status: { equals: 'published' } } })
    return collections.docs.map((collection) => ({
      slug: collection.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params for collections:', error)
    return []
  }
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const collection = await getMuseumCollection(slug)
    
    if (!collection) {
      return { title: 'Collection Not Found' }
    }

    return {
      title: collection.meta?.title || collection.title,
      description: collection.meta?.description || collection.shortDescription,
      openGraph: {
        title: collection.meta?.title || collection.title,
        description: collection.meta?.description || collection.shortDescription || undefined,
        images: collection.featuredImage?.url ? [collection.featuredImage.url] : undefined,
      },
    }
  } catch (error) {
    return { title: 'Collection Not Found' }
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  
  try {
    const collection = await getMuseumCollection(slug)

    if (!collection) {
      notFound()
    }

    return (
      <div className="container py-16">
        <CollectionRenderer collection={collection} />
      </div>
    )
  } catch (error) {
    console.error(`Failed to fetch collection ${slug}:`, error)
    notFound()
  }
}

// CRITICAL: Static generation only
// - dynamicParams = false: Unknown slugs return 404, no server generation
// - No revalidate: Updates only via on-demand revalidation from Payload hooks
export const dynamicParams = false
export const dynamic = 'force-static'
