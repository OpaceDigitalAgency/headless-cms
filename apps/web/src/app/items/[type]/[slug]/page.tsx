import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getContentTypeBySlugOrArchiveSlug, getCustomItemBySlug, getCustomItems } from '@/lib/api'
import { CustomItemRenderer } from '@/components/CustomItemRenderer'

interface PageProps {
  params: Promise<{ type: string; slug: string }>
}

export async function generateStaticParams() {
  const items = await getCustomItems({ limit: 1000, status: 'published', depth: 2 }).catch(() => ({ docs: [] } as any))
  return items.docs
    .map((item: any) => {
      const typeSlug = typeof item.contentType === 'object'
        ? item.contentType.archiveSlug
          ? item.contentType.archiveSlug.replace(/^\\/?items\\//, '')
          : item.contentType.slug
        : null
      if (!typeSlug) return null
      return { type: typeSlug, slug: item.slug }
    })
    .filter(Boolean)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type, slug } = await params
  const contentType = await getContentTypeBySlugOrArchiveSlug(type)

  if (!contentType) {
    return { title: 'Not Found' }
  }

  const item = await getCustomItemBySlug(slug, {
    contentTypeId: contentType.id,
    status: 'published',
    depth: 2,
  })

  if (!item) {
    return { title: 'Not Found' }
  }

  return {
    title: item.meta?.title || item.title,
    description: item.meta?.description || item.excerpt,
    openGraph: {
      title: item.meta?.title || item.title,
      description: item.meta?.description || item.excerpt || undefined,
      images: item.meta?.image?.url ? [item.meta.image.url] : undefined,
    },
  }
}

export default async function CustomItemPage({ params }: PageProps) {
  const { type, slug } = await params
  
  const contentType = await getContentTypeBySlugOrArchiveSlug(type)
  if (!contentType) {
    notFound()
  }

  const item = await getCustomItemBySlug(slug, {
    contentTypeId: contentType.id,
    status: 'published',
    depth: 2,
  })

  if (!item) {
    notFound()
  }

  return (
    <div className="container py-16">
      <CustomItemRenderer item={item} contentType={contentType} />
    </div>
  )
}

export const dynamicParams = false
export const dynamic = 'force-static'
