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
  if (process.env.SKIP_STATIC_GENERATION === "1") {
    return []
  }

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

    // Transform settings defaultMeta image if it's a Media object
    const defaultMetaImage = settings.defaultMeta?.image && typeof settings.defaultMeta.image === 'object'
      ? {
          url: settings.defaultMeta.image.url || null,
          alt: settings.defaultMeta.image.alt || null,
          width: settings.defaultMeta.image.width || null,
          height: settings.defaultMeta.image.height || null,
        }
      : null

    return generateEnhancedMetadata(
      {
        title: item.title,
        description: (item as any).description || (item as any).shortDescription || `Archive item: ${item.title}`,
        image: undefined,
      },
      {
        ...settings,
        defaultMeta: settings.defaultMeta ? {
          ...settings.defaultMeta,
          image: defaultMetaImage,
        } : null,
      },
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

export const dynamic = 'force-dynamic'
export const revalidate = 60
