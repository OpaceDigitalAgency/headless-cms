import Link from 'next/link'
import type { Metadata } from 'next'
import { getPlaces, getSettings } from '@/lib/payload-api'
import { generateEnhancedMetadata } from '@/lib/seo/metadata'
import { Container, Section } from '@repo/ui/primitives'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings()
    return generateEnhancedMetadata(
      {
        title: 'Places',
        description: 'Geographic locations, venues, and historical sites',
      },
      settings,
      '/places'
    )
  } catch {
    return {
      title: 'Places',
      description: 'Geographic locations, venues, and historical sites',
    }
  }
}

export const revalidate = 60

export default async function PlacesPage() {
  const places = await getPlaces(100).catch(() => ({ docs: [] }))

  return (
    <Section spacing="lg" background="default">
      <Container>
        <header className="mb-12">
          <h1 className="text-4xl font-bold">Places</h1>
          <p className="mt-4 text-lg text-muted">
            Geographic locations, venues, and historical sites
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {places.docs.map((place) => {
            const placeImage = typeof (place as any).featuredImage === 'object' ? (place as any).featuredImage : null
            return (
              <Link
                key={place.id}
                href={`/places/${place.slug}`}
                className="card overflow-hidden transition-shadow hover:shadow-md"
              >
                {placeImage?.url && (
                  <div className="relative h-48">
                    <img
                      src={placeImage.url}
                      alt={placeImage.alt || place.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{place.name}</h2>
                  {place.placeType && (
                    <p className="mt-1 text-sm text-muted">{place.placeType}</p>
                  )}
                  {typeof place.description === 'string' && (
                    <p className="mt-2 text-muted line-clamp-2">{place.description}</p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

