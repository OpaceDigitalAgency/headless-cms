import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getEvents, getEventBySlug, getSettings } from '@/lib/payload-api'
import { RenderBlocks } from '@/components/RenderBlocks'
import { generateEnhancedMetadata } from '@/lib/seo/metadata'
import { generateEventSchema, generateOrganizationSchema, generateBreadcrumbSchema, renderJsonLd } from '@/lib/seo/schema'
import { Container, Section } from '@repo/ui/primitives'

interface EventPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  if (process.env.SKIP_STATIC_GENERATION === "1") {
    return []
  }

  const events = await getEvents(1000)
  return events.docs.map((event) => ({
    slug: event.slug,
  }))
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  try {
    const [event, settings] = await Promise.all([
      getEventBySlug(slug, isDraftMode),
      getSettings(),
    ])

    if (!event) {
      return { title: 'Event Not Found' }
    }

    return generateEnhancedMetadata(
      {
        title: event.title,
        description: (event as any).excerpt || (event as any).description || `Event: ${event.title}`,
        image: undefined,
      },
      settings,
      `/events/${slug}`
    )
  } catch (error) {
    return { title: 'Event Not Found' }
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  try {
    const event = await getEventBySlug(slug, isDraftMode)

    if (!event) {
      notFound()
    }

    // Extract featuredImage early so it's available throughout the component
    const featuredImage = typeof event.featuredImage === 'object' ? event.featuredImage : null

    // Generate JSON-LD schemas
    const settings = await getSettings().catch(() => null)
    const schemas = []

    if (settings) {
      // Add Event schema
      schemas.push(generateEventSchema(
        {
          title: event.title,
          slug,
          description: (event as any).excerpt || (event as any).description,
          startDate: event.startDate,
          endDate: event.endDate,
          location: (event as any).location,
          image: featuredImage,
        },
        settings
      ))

      // Add Organization schema
      schemas.push(generateOrganizationSchema(settings))

      // Add Breadcrumb schema
      const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      const breadcrumbs = [
        { name: 'Home', url: siteUrl },
        { name: 'Events', url: `${siteUrl}/events` },
        { name: event.title, url: `${siteUrl}/events/${slug}` },
      ]
      schemas.push(generateBreadcrumbSchema(breadcrumbs))
    }

    return (
      <>
        {schemas.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: renderJsonLd(schemas) }}
          />
        )}
        <Section spacing="lg" background="default">
          <Container>
            <article>
              <header className="mb-12">
                <h1 className="text-4xl font-bold">{event.title}</h1>
                {event.startDate && (
                  <p className="mt-4 text-lg text-muted">
                    {new Date(event.startDate).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    {event.endDate && event.endDate !== event.startDate && (
                      <> - {new Date(event.endDate).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}</>
                    )}
                  </p>
                )}
              </header>

              {featuredImage?.url && (
                <div className="mb-12">
                  <img
                    src={featuredImage.url}
                    alt={featuredImage.alt || event.title}
                    className="w-full rounded-lg"
                  />
                </div>
              )}

              {(event as any).content && <RenderBlocks blocks={(event as any).content} />}
            </article>
          </Container>
        </Section>
      </>
    )
  } catch (error) {
    console.error(`Error loading event ${slug}:`, error)
    notFound()
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 60

