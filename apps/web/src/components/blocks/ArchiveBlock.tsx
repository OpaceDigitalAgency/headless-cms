import Link from 'next/link'
import Image from 'next/image'
import { getPosts, getArchiveItems, getPeople, getPlaces, getCustomItems } from '@/lib/api'

interface ArchiveBlockProps {
  block: {
    heading?: string
    description?: string
    populateBy?: string
    relationTo?: string
    categories?: any[]
    limit?: number
    selectedDocs?: any[]
    contentType?: any
    layout?: string
    columns?: string
    showImage?: boolean
    showExcerpt?: boolean
    showDate?: boolean
    showAuthor?: boolean
    link?: {
      show?: boolean
      label?: string
      url?: string
    }
  }
}

export async function ArchiveBlock({ block }: ArchiveBlockProps) {
  const {
    heading,
    description,
    populateBy = 'collection',
    relationTo = 'posts',
    categories,
    tags,
    limit = 6,
    selectedDocs,
    contentType,
    layout = 'grid',
    columns = '3',
    showImage = true,
    showExcerpt = true,
    showDate = true,
    link,
  } = block

  let items: any[] = []

  if (populateBy === 'selection' && selectedDocs) {
    items = selectedDocs
  } else {
    // Fetch from collection with optional category/tag filtering
    try {
      // Extract category and tag IDs
      const categoryIds = categories?.map((cat: any) => typeof cat === 'object' ? cat.id : cat).filter(Boolean)
      const tagIds = tags?.map((tag: any) => typeof tag === 'object' ? tag.id : tag).filter(Boolean)

      const filterOptions = {
        limit,
        ...(categoryIds && categoryIds.length > 0 && { category: categoryIds[0] }),
        ...(tagIds && tagIds.length > 0 && { tag: tagIds[0] }),
      }

      switch (relationTo) {
        case 'posts':
          const posts = await getPosts(filterOptions)
          items = posts.docs
          break
        case 'archive-items':
          const archiveItems = await getArchiveItems(filterOptions)
          items = archiveItems.docs
          break
        case 'people':
          const people = await getPeople(filterOptions)
          items = people.docs
          break
        case 'places':
          const places = await getPlaces(filterOptions)
          items = places.docs
          break
        case 'custom-items':
          const contentTypeId = typeof contentType === 'object' ? contentType?.id : contentType
          const customItems = await getCustomItems({ ...filterOptions, contentTypeId, status: 'published' })
          items = customItems.docs
          break
      }
    } catch (error) {
      console.error('Failed to fetch archive items:', error)
    }
  }

  const getItemUrl = (item: any) => {
    switch (relationTo) {
      case 'posts':
        return `/blog/${item.slug}`
      case 'archive-items':
        return `/archive-items/${item.slug}`
      case 'people':
        return `/people/${item.slug}`
      case 'places':
        return `/places/${item.slug}`
      case 'pages':
        return `/${item.slug}`
      case 'custom-items':
        if (typeof item.contentType === 'object' && item.contentType?.slug) {
          const typeSlug = item.contentType.archiveSlug
            ? item.contentType.archiveSlug.replace(/^\/?items\//, '')
            : item.contentType.slug
          return `/items/${typeSlug}/${item.slug}`
        }
        return `/items/${item.slug}`
      default:
        return `/${relationTo}/${item.slug}`
    }
  }

  const getItemImage = (item: any) => {
    return item.featuredImage?.url || item.portrait?.url || item.media?.[0]?.image?.url
  }

  const getItemExcerpt = (item: any) => {
    return item.excerpt || item.shortBio || item.shortDescription
  }

  const columnClasses = {
    '2': 'sm:grid-cols-2',
    '3': 'sm:grid-cols-2 lg:grid-cols-3',
    '4': 'sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="container py-16">
      {(heading || description) && (
        <div className="mb-8 text-center">
          {heading && (
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-2 text-lg text-gray-600">{description}</p>
          )}
        </div>
      )}

      {layout === 'grid' || layout === 'cards' ? (
        <div className={`grid gap-6 ${columnClasses[columns as keyof typeof columnClasses]}`}>
          {items.map((item) => (
            <Link
              key={item.id}
              href={getItemUrl(item)}
              className="card overflow-hidden transition-shadow hover:shadow-md"
            >
              {showImage && getItemImage(item) && (
                <div className="relative h-48">
                  <Image
                    src={getItemImage(item)}
                    alt={item.title || item.name || ''}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">
                  {item.title || item.name}
                </h3>
                {showExcerpt && getItemExcerpt(item) && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {getItemExcerpt(item)}
                  </p>
                )}
                {showDate && item.publishedAt && (
                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={getItemUrl(item)}
              className="card flex overflow-hidden transition-shadow hover:shadow-md"
            >
              {showImage && getItemImage(item) && (
                <div className="relative w-48 flex-shrink-0">
                  <Image
                    src={getItemImage(item)}
                    alt={item.title || item.name || ''}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 p-4">
                <h3 className="font-semibold text-gray-900">
                  {item.title || item.name}
                </h3>
                {showExcerpt && getItemExcerpt(item) && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {getItemExcerpt(item)}
                  </p>
                )}
                {showDate && item.publishedAt && (
                  <p className="mt-2 text-xs text-gray-400">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {link?.show && link.label && (
        <div className="mt-8 text-center">
          <Link href={link.url || '#'} className="link font-medium">
            {link.label} →
          </Link>
        </div>
      )}
    </section>
  )
}
