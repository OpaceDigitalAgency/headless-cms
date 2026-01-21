import Link from 'next/link'
import type { Metadata } from 'next'
import { getPlaces, getSettings } from '@/lib/payload-api'
import { generateEnhancedMetadata } from '@/lib/seo/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return generateEnhancedMetadata(
    {
      title: 'Places',
      description: 'Geographic locations, venues, and historical sites',
    },
    settings,
    '/places'
  )
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function PlacesPage() {
  const places = await getPlaces(100)

  return (
    <div className="container py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">Places</h1>
        <p className="mt-4 text-lg text-gray-600">
          Geographic locations, venues, and historical sites
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {places.docs.map((place) => (
          <Link
            key={place.id}
            href={`/places/${place.slug}`}
            className="card overflow-hidden transition-shadow hover:shadow-md"
          >
            {place.featuredImage?.url && (
              <div className="relative h-48">
                <img
                  src={place.featuredImage.url}
                  alt={place.featuredImage.alt || place.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold">{place.name}</h2>
              {place.placeType && (
                <p className="mt-1 text-sm text-gray-500">{place.placeType}</p>
              )}
              {place.description && (
                <p className="mt-2 text-gray-600 line-clamp-2">{place.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

