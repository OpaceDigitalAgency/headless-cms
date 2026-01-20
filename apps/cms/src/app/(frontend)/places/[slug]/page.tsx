import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPlaces, getPlaceBySlug } from '@/lib/payload-api'
import { RenderBlocks } from '@/components/RenderBlocks'

interface PlacePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const places = await getPlaces(1000)
  return places.docs.map((place) => ({
    slug: place.slug,
  }))
}

export async function generateMetadata({ params }: PlacePageProps): Promise<Metadata> {
  const { slug } = await params
  const place = await getPlaceBySlug(slug)

  if (!place) {
    return { title: 'Place Not Found' }
  }

  return {
    title: place.name,
    description: place.description || `Information about ${place.name}`,
  }
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { slug } = await params
  const place = await getPlaceBySlug(slug)

  if (!place) {
    notFound()
  }

  return (
    <article className="container py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">{place.name}</h1>
        {place.placeType && (
          <p className="mt-4 text-lg text-gray-600">{place.placeType}</p>
        )}
      </header>

      {place.featuredImage?.url && (
        <div className="mb-12">
          <img
            src={place.featuredImage.url}
            alt={place.featuredImage.alt || place.name}
            className="w-full rounded-lg"
          />
        </div>
      )}

      {place.description && (
        <div className="prose prose-lg mb-12">
          <p>{place.description}</p>
        </div>
      )}

      {place.content && <RenderBlocks blocks={place.content} />}
    </article>
  )
}

export const dynamicParams = false
export const dynamic = 'force-static'

