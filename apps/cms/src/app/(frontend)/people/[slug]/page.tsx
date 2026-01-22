import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getPeople, getPersonBySlug, getSettings } from '@/lib/payload-api'
import { RenderBlocks } from '@/components/RenderBlocks'
import { RichText } from '@/components/RichText'
import { generateEnhancedMetadata } from '@/lib/seo/metadata'
import { generatePersonSchema, generateOrganizationSchema, generateBreadcrumbSchema, renderJsonLd } from '@/lib/seo/schema'
import { Container, Section } from '@repo/ui/primitives'

interface PersonPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  if (process.env.SKIP_STATIC_GENERATION === "1") {
    return []
  }

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
        description: (person as any).bio || person.shortBio || `Profile of ${person.name}`,
        image: undefined,
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
      const personImage = (person as any).featuredImage && typeof (person as any).featuredImage === 'object' ? (person as any).featuredImage : null
      schemas.push(generatePersonSchema(
        {
          name: person.name,
          slug,
          bio: (person as any).bio || person.shortBio,
          image: personImage,
          jobTitle: typeof person.role === 'string' ? person.role : undefined,
          email: person.email || undefined,
        },
        settings
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
                  <p className="mt-4 text-lg text-muted">{Array.isArray(person.role) ? person.role[0] : person.role}</p>
                )}
              </header>

              {(person as any).featuredImage?.url && (
                <div className="mb-12">
                  <img
                    src={(person as any).featuredImage.url}
                    alt={(person as any).featuredImage.alt || person.name}
                    className="w-full rounded-lg"
                  />
                </div>
              )}

              {(person as any).bio && (
                <div className="mb-12">
                  <RichText content={(person as any).bio} />
                </div>
              )}

              {(person as any).content && <RenderBlocks blocks={(person as any).content} />}
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

export const dynamic = 'force-dynamic'
export const revalidate = 60

