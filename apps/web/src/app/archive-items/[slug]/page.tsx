import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getArchiveItemBySlug, getArchiveItems } from '@/lib/api'
import { ArchiveItemRenderer } from '@/components/ArchiveItemRenderer'

interface ArchiveItemPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const items = await getArchiveItems({ limit: 1000 })
    return items.docs.map((item) => ({
      slug: item.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params for archive items:', error)
    return []
  }
}

export async function generateMetadata({ params }: ArchiveItemPageProps): Promise<Metadata> {
  const { slug } = await params
  const item = await getArchiveItemBySlug(slug)

  if (!item) {
    return { title: 'Item Not Found' }
  }

  return {
    title: item.meta?.title || item.title,
    description: item.meta?.description || undefined,
    openGraph: {
      title: item.meta?.title || item.title,
      description: item.meta?.description || undefined,
      images: item.meta?.image?.url ? [item.meta.image.url] : undefined,
    },
  }
}

export default async function ArchiveItemPage({ params }: ArchiveItemPageProps) {
  const { slug } = await params
  const item = await getArchiveItemBySlug(slug)

  if (!item) {
    notFound()
  }

  return (
    <div className="container py-16">
      <ArchiveItemRenderer item={item} />
    </div>
  )
}

export const dynamicParams = false
export const dynamic = 'force-static'
