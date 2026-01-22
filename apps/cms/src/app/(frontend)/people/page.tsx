import Link from 'next/link'
import type { Metadata } from 'next'
import { getPeople, getSettings } from '@/lib/payload-api'
import { generateEnhancedMetadata } from '@/lib/seo/metadata'
import { Container, Section } from '@repo/ui/primitives'

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

export const revalidate = 60

export default async function PeoplePage() {
  const people = await getPeople(100).catch(() => ({ docs: [] }))

  return (
    <Section spacing="lg" background="default">
      <Container>
        <header className="mb-12">
          <h1 className="text-4xl font-bold">People</h1>
          <p className="mt-4 text-lg text-muted">
            Historical figures, artists, team members, and notable people
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {people.docs.map((person) => {
            const personImage = (person as any).featuredImage && typeof (person as any).featuredImage === 'object' ? (person as any).featuredImage : null
            return (
              <Link
                key={person.id}
                href={`/people/${person.slug}`}
                className="card overflow-hidden transition-shadow hover:shadow-md"
              >
                {personImage?.url && (
                  <div className="relative h-48">
                    <img
                      src={personImage.url}
                      alt={personImage.alt || person.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{person.name}</h2>
                  {person.role && (
                    <p className="mt-1 text-sm text-muted">{Array.isArray(person.role) ? person.role[0] : person.role}</p>
                  )}
                  {(person as any).bio && (
                    <p className="mt-2 text-muted line-clamp-2">{(person as any).bio}</p>
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

