import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPlaces } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Places',
  description: 'Geographic locations connected to our collection',
}

export default async function PlacesPage() {
  const places = await getPlaces({ limit: 500, where: { _status: { equals: 'published' } } })

  return (
    <div className="container py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Places</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Geographic locations connected to our collection
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {places.docs.map((place) => (
          <Link
            key={place.id}
            href={`/places/${place.slug}`}
            className="card overflow-hidden transition-shadow hover:shadow-md"
          >
            {place.featuredImage?.url && (
              <div className="relative h-48">
                <Image
                  src={place.featuredImage.url}
                  alt={place.featuredImage.alt || place.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="font-semibold text-gray-900 dark:text-white">{place.name}</h2>
              {place.country && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{place.country}</p>
              )}
              {place.placeType && (
                <span className="mt-2 inline-block rounded bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs capitalize text-gray-600 dark:text-gray-300">
                  {place.placeType}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {places.docs.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No places found.</p>
        </div>
      )}
    </div>
  )
}

// Static generation - revalidation only via on-demand webhook
export const dynamic = 'force-static'
