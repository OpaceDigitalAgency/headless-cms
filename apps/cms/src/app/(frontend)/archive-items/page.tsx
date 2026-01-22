import type { Metadata } from 'next'
import { getArchiveItems, getSettings } from '@/lib/payload-api'
import { generateEnhancedMetadata } from '@/lib/seo/metadata'
import Link from 'next/link'
import Image from 'next/image'
import { Container, Section } from '@repo/ui/primitives'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return generateEnhancedMetadata(
    {
      title: 'Archive Items',
      description: 'Explore curated archive items',
    },
    settings,
    '/archive-items'
  )
}

export default async function ArchiveItemsPage() {
  const items = await getArchiveItems(500).catch(() => ({ docs: [] }))

  return (
    <Section spacing="lg" background="default">
      <Container>
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Archive Items</h1>
          <p className="mt-4 text-lg text-muted">Explore curated archive items.</p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.docs.map((item: any) => (
            <Link
              key={item.id}
              href={`/archive-items/${item.slug}`}
              className="card group overflow-hidden transition-shadow hover:shadow-lg"
            >
              {item.featuredImage?.url && (
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.featuredImage.url}
                    alt={item.featuredImage.alt || item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-xl font-bold text-white">{item.title}</h2>
                  </div>
                </div>
              )}
              {!item.featuredImage?.url && (
                <div className="bg-card p-6">
                  <h2 className="text-xl font-bold text-foreground">{item.title}</h2>
                </div>
              )}
            </Link>
          ))}
        </div>

        {items.docs.length === 0 && (
          <div className="text-center text-muted">
            <p>No archive items found.</p>
          </div>
        )}
      </Container>
    </Section>
  )
}

export const dynamic = 'force-static'
