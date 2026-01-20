import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPeople, getPersonBySlug } from '@/lib/payload-api'
import { RenderBlocks } from '@/components/RenderBlocks'

interface PersonPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const people = await getPeople(1000)
  return people.docs.map((person) => ({
    slug: person.slug,
  }))
}

export async function generateMetadata({ params }: PersonPageProps): Promise<Metadata> {
  const { slug } = await params
  const person = await getPersonBySlug(slug)

  if (!person) {
    return { title: 'Person Not Found' }
  }

  return {
    title: person.name,
    description: person.bio || `Profile of ${person.name}`,
  }
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { slug } = await params
  const person = await getPersonBySlug(slug)

  if (!person) {
    notFound()
  }

  return (
    <article className="container py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">{person.name}</h1>
        {person.role && (
          <p className="mt-4 text-lg text-gray-600">{person.role}</p>
        )}
      </header>

      {person.featuredImage?.url && (
        <div className="mb-12">
          <img
            src={person.featuredImage.url}
            alt={person.featuredImage.alt || person.name}
            className="w-full rounded-lg"
          />
        </div>
      )}

      {person.bio && (
        <div className="prose prose-lg mb-12">
          <p>{person.bio}</p>
        </div>
      )}

      {person.content && <RenderBlocks blocks={person.content} />}
    </article>
  )
}

export const dynamicParams = false
export const dynamic = 'force-static'

