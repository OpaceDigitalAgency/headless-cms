import { notFound } from 'next/navigation'
import { getContentTypeBySlugOrArchiveSlug, getCustomItems } from '@/lib/api'
import { ListTemplate } from '@repo/templates'

interface PageProps {
  params: Promise<{ type: string }>
}

export default async function CustomItemsArchive({ params }: PageProps) {
  const { type } = await params
  const contentType = await getContentTypeBySlugOrArchiveSlug(type)

  if (!contentType || contentType.hasArchive === false) {
    notFound()
  }

  const typeSlug = contentType.archiveSlug
    ? contentType.archiveSlug.replace(/^\\/?items\\//, '')
    : contentType.slug

  const items = await getCustomItems({
    limit: 100,
    contentTypeId: contentType.id,
    status: 'published',
  }).catch(() => ({ docs: [] } as any))

  return (
    <div className="container py-16">
      <ListTemplate
        heading={contentType.pluralLabel || contentType.name}
        subheading={contentType.description}
        items={items.docs.map((item) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          url: `/items/${typeSlug}/${item.slug}`,
          excerpt: item.excerpt,
          image: item.featuredImage?.url ? { url: item.featuredImage.url, alt: item.featuredImage.alt } : undefined,
          date: item.publishedAt,
        }))}
        layout="grid"
      />
    </div>
  )
}

export const dynamic = 'force-static'
