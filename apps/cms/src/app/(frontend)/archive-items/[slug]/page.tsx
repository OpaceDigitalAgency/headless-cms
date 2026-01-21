import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getArchiveItemBySlug, getArchiveItems, getSettings } from '@/lib/payload-api'
import { ArchiveItemRenderer } from '@/components/ArchiveItemRenderer'
import { generateEnhancedMetadata } from '@/lib/seo/metadata'
import { Container, Section } from '@repo/ui/primitives'

interface ArchiveItemPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const items = await getArchiveItems(1000)
    return items.docs.map((item: any) => ({
      slug: item.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: ArchiveItemPageProps): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  try {
    const [item, settings] = await Promise.all([
      getArchiveItemBySlug(slug, isDraftMode),
      getSettings(),
    ])

    if (!item) {
      return { title: 'Archive Item Not Found' }
    }

    return generateEnhancedMetadata(
      {
        title: item.title,
        description: item.description || item.shortDescription || `Archive item: ${item.title}`,
        image: item.gallery?.[0]?.image,
      },
      settings,
      `/archive-items/${slug}`
    )
  } catch (error) {
    return { title: 'Archive Item Not Found' }
  }
}

export default async function ArchiveItemPage({ params }: ArchiveItemPageProps) {
  const { slug } = await params
  const { isEnabled: isDraftMode } = await draftMode()

  try {
    const item = await getArchiveItemBySlug(slug, isDraftMode)

    if (!item) {
      notFound()
    }

    return (
      <Section spacing="lg" background="default">
        <Container>
          <ArchiveItemRenderer item={item} />
        </Container>
      </Section>
    )
  } catch (error) {
    console.error(`Error loading archive item ${slug}:`, error)
    notFound()
  }
}

export const revalidate = 60
