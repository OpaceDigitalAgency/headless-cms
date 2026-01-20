import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getEvents, getEventBySlug } from '@/lib/payload-api'
import { RenderBlocks } from '@/components/RenderBlocks'

interface EventPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const events = await getEvents(1000)
  return events.docs.map((event) => ({
    slug: event.slug,
  }))
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()
  const event = await getEventBySlug(slug, isDraftMode)

  if (!event) {
    return { title: 'Event Not Found' }
  }

  return {
    title: event.title,
    description: event.excerpt || `Event: ${event.title}`,
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()
  const event = await getEventBySlug(slug, isDraftMode)

  if (!event) {
    notFound()
  }

  return (
    <article className="container py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">{event.title}</h1>
        {event.startDate && (
          <p className="mt-4 text-lg text-gray-600">
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

      {event.featuredImage?.url && (
        <div className="mb-12">
          <img
            src={event.featuredImage.url}
            alt={event.featuredImage.alt || event.title}
            className="w-full rounded-lg"
          />
        </div>
      )}

      {event.content && <RenderBlocks blocks={event.content} />}
    </article>
  )
}

export const revalidate = 60

