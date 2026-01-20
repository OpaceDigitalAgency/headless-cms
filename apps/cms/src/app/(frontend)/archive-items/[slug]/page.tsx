import { notFound } from 'next/navigation'
import { getArchiveItemBySlug, getArchiveItems } from '@/lib/payload-api'
import { ArchiveItemRenderer } from '@/components/ArchiveItemRenderer'

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
