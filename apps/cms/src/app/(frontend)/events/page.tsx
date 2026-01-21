import Link from 'next/link'
import type { Metadata } from 'next'
import { getEvents, getSettings } from '@/lib/payload-api'
import { generateEnhancedMetadata } from '@/lib/seo/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return generateEnhancedMetadata(
    {
      title: 'Events',
      description: 'Upcoming and past events, exhibitions, and workshops',
    },
    settings,
    '/events'
  )
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function EventsPage() {
  const events = await getEvents(100)

  return (
    <div className="container py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">Events</h1>
        <p className="mt-4 text-lg text-gray-600">
          Upcoming and past events, exhibitions, and workshops
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.docs.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.slug}`}
            className="card overflow-hidden transition-shadow hover:shadow-md"
          >
            {event.featuredImage?.url && (
              <div className="relative h-48">
                <img
                  src={event.featuredImage.url}
                  alt={event.featuredImage.alt || event.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              {event.startDate && (
                <p className="mt-2 text-sm text-gray-500">
                  {new Date(event.startDate).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
              {event.excerpt && (
                <p className="mt-2 text-gray-600 line-clamp-2">{event.excerpt}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

