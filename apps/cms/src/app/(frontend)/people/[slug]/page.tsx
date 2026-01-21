import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getPeople, getPersonBySlug, getSettings } from '@/lib/payload-api'
import { RenderBlocks } from '@/components/RenderBlocks'
import { generateEnhancedMetadata } from '@/lib/seo/metadata'
import { generatePersonSchema, generateOrganizationSchema, generateBreadcrumbSchema, renderJsonLd } from '@/lib/seo/schema'
import { Container, Section, Prose } from '@repo/ui/primitives'

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
  const { isEnabled: isDraftMode } = await draftMode()

  try {
    const [person, settings] = await Promise.all([
      getPersonBySlug(slug, isDraftMode),
      getSettings(),
    ])

    if (!person) {
      return { title: 'Person Not Found' }
    }

    return generateEnhancedMetadata(
      {
        title: person.name,
        description: person.bio || person.shortBio || `Profile of ${person.name}`,
        image: person.featuredImage,
      },
      settings,
      `/people/${slug}`
    )
  } catch (error) {
    return { title: 'Person Not Found' }
  }
}

export default async function PersonPage({ params }: PersonPageProps) {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  try {
    const person = await getPersonBySlug(slug, isDraftMode)

    if (!person) {
      notFound()
    }

    // Generate JSON-LD schemas
    const settings = await getSettings().catch(() => null)
    const schemas = []

    if (settings) {
      // Add Person schema
      schemas.push(generatePersonSchema(
        {
          name: person.name,
          bio: person.bio || person.shortBio,
          image: person.featuredImage?.url,
          jobTitle: person.role,
          email: person.email,
        },
        settings,
        slug
      ))

      // Add Organization schema
      schemas.push(generateOrganizationSchema(settings))

      // Add Breadcrumb schema
      const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      const breadcrumbs = [
        { name: 'Home', url: siteUrl },
        { name: 'People', url: `${siteUrl}/people` },
        { name: person.name, url: `${siteUrl}/people/${slug}` },
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
                <Prose className="mb-12">
                  <p>{person.bio}</p>
                </Prose>
              )}

              {person.content && <RenderBlocks blocks={person.content} />}
            </article>
          </Container>
        </Section>
      </>
    )
  } catch (error) {
    console.error(`Error loading person ${slug}:`, error)
    notFound()
  }
}

export const revalidate = 60

