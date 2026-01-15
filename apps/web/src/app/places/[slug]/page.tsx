import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPlace, getPlaces } from '@/lib/api'
import { PlaceRenderer } from '@/components/PlaceRenderer'

interface PlacePageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static params for all published places
 * This runs at build time to pre-render all place pages
 */
export async function generateStaticParams() {
  try {
    const places = await getPlaces({ limit: 1000, where: { _status: { equals: 'published' } } })
    return places.docs.map((place) => ({
      slug: place.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params for places:', error)
    return []
  }
}

export async function generateMetadata({ params }: PlacePageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const place = await getPlace(slug)
    
    if (!place) {
      return { title: 'Place Not Found' }
    }

    return {
      title: place.meta?.title || place.name,
      description: place.meta?.description,
      openGraph: {
        title: place.meta?.title || place.name,
        description: place.meta?.description || undefined,
        images: place.featuredImage?.url ? [place.featuredImage.url] : undefined,
      },
    }
  } catch (error) {
    return { title: 'Place Not Found' }
  }
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { slug } = await params
  
  try {
    const place = await getPlace(slug)

    if (!place) {
      notFound()
    }

    return (
      <div className="container py-16">
        <PlaceRenderer place={place} />
      </div>
    )
  } catch (error) {
    console.error(`Failed to fetch place ${slug}:`, error)
    notFound()
  }
}

// CRITICAL: Static generation only
// - dynamicParams = false: Unknown slugs return 404, no server generation
// - No revalidate: Updates only via on-demand revalidation from Payload hooks
export const dynamicParams = false
export const dynamic = 'force-static'
