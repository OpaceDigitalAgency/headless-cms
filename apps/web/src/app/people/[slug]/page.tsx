import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPerson, getPeople } from '@/lib/api'
import { PersonRenderer } from '@/components/PersonRenderer'

interface PersonPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const people = await getPeople({ limit: 100 })
    return people.docs.map((person) => ({
      slug: person.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params for people:', error)
    return []
  }
}

export async function generateMetadata({ params }: PersonPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const person = await getPerson(slug)
    
    if (!person) {
      return { title: 'Person Not Found' }
    }

    return {
      title: person.meta?.title || person.name,
      description: person.meta?.description || person.shortBio,
      openGraph: {
        title: person.meta?.title || person.name,
        description: person.meta?.description || person.shortBio || undefined,
        images: person.portrait?.url ? [person.portrait.url] : undefined,
      },
    }
  } catch (error) {
    return { title: 'Person Not Found' }
  }
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { slug } = await params
  
  try {
    const person = await getPerson(slug)

    if (!person) {
      notFound()
    }

    return (
      <div className="container py-16">
        <PersonRenderer person={person} />
      </div>
    )
  } catch (error) {
    console.error(`Failed to fetch person ${slug}:`, error)
    notFound()
  }
}

export const revalidate = 60
export const dynamicParams = true
