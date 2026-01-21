import Link from 'next/link'
import type { Metadata } from 'next'
import { getPeople, getSettings } from '@/lib/payload-api'
import { generateEnhancedMetadata } from '@/lib/seo/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return generateEnhancedMetadata(
    {
      title: 'People',
      description: 'Historical figures, artists, team members, and notable people',
    },
    settings,
    '/people'
  )
}

export const dynamic = 'force-static'
export const revalidate = 60

export default async function PeoplePage() {
  const people = await getPeople(100)

  return (
    <div className="container py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">People</h1>
        <p className="mt-4 text-lg text-gray-600">
          Historical figures, artists, team members, and notable people
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {people.docs.map((person) => (
          <Link
            key={person.id}
            href={`/people/${person.slug}`}
            className="card overflow-hidden transition-shadow hover:shadow-md"
          >
            {person.featuredImage?.url && (
              <div className="relative h-48">
                <img
                  src={person.featuredImage.url}
                  alt={person.featuredImage.alt || person.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold">{person.name}</h2>
              {person.role && (
                <p className="mt-1 text-sm text-gray-500">{person.role}</p>
              )}
              {person.bio && (
                <p className="mt-2 text-gray-600 line-clamp-2">{person.bio}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

