import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPlace, getPlaces } from '@/lib/api'
import { PlaceRenderer } from '@/components/PlaceRenderer'

interface PlacePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const places = await getPlaces({ limit: 100 })
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

export const revalidate = 60
export const dynamicParams = true
