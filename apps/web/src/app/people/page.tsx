import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPeople } from '@/lib/api'

export const metadata: Metadata = {
  title: 'People',
  description: 'Historical figures and artists in our collection',
}

export default async function PeoplePage() {
  const people = await getPeople({ limit: 500, where: { _status: { equals: 'published' } } })

  return (
    <div className="container py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">People</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Historical figures and artists connected to our collection
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {people.docs.map((person) => (
          <Link
            key={person.id}
            href={`/people/${person.slug}`}
            className="card overflow-hidden transition-shadow hover:shadow-md"
          >
            {person.portrait?.url && (
              <div className="relative h-64">
                <Image
                  src={person.portrait.url}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="font-semibold text-gray-900 dark:text-white">{person.name}</h2>
              {(person.birthDate || person.deathDate) && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {person.birthDate}
                  {person.birthDate && person.deathDate && ' – '}
                  {person.deathDate}
                </p>
              )}
              {person.nationality && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{person.nationality}</p>
              )}
              {person.role && person.role.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {person.role.slice(0, 2).map((role: string, index: number) => (
                    <span
                      key={index}
                      className="rounded bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs capitalize text-gray-600 dark:text-gray-300"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {people.docs.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No people found.</p>
        </div>
      )}
    </div>
  )
}

// Static generation - revalidation only via on-demand webhook
export const dynamic = 'force-static'
