import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getPlaces, getPlaceBySlug } from '@/lib/payload-api'
import { RenderBlocks } from '@/components/RenderBlocks'
import { RichText } from '@/components/RichText'
import { Container, Section } from '@repo/ui/primitives'

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
  const { isEnabled: isDraftMode } = await draftMode()

  try {
    const place = await getPlaceBySlug(slug, isDraftMode)

    if (!place) {
      return { title: 'Place Not Found' }
    }

    return {
      title: place.name,
      description: place.description || `Information about ${place.name}`,
    }
  } catch (error) {
    console.error(`Error generating metadata for place ${slug}:`, error)
    return { title: 'Place Not Found' }
  }
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  try {
    const place = await getPlaceBySlug(slug, isDraftMode)

    if (!place) {
      notFound()
    }

    return (
      <Section spacing="lg" background="default">
        <Container>
          <article>
            <header className="mb-12">
              <h1 className="text-4xl font-bold">{place.name}</h1>
              {place.placeType && (
                <p className="mt-4 text-lg text-muted">{place.placeType}</p>
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
              <div className="mb-12">
                <RichText content={place.description} />
              </div>
            )}

            {place.contentBlocks && place.contentBlocks.length > 0 && (
              <RenderBlocks blocks={place.contentBlocks} />
            )}
          </article>
        </Container>
      </Section>
    )
  } catch (error) {
    console.error(`Error loading place ${slug}:`, error)
    notFound()
  }
}

export const revalidate = 60

