import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { CustomItemRenderer } from '@/components/CustomItemRenderer'

interface CustomItemPageProps {
  params: Promise<{ type: string; slug: string }>
}

/**
 * Generate static params for all published custom items
 */
export async function generateStaticParams() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    
    // Get all content types
    const contentTypes = await payload.find({
      collection: 'content-types',
      limit: 1000,
    })
    
    const params: Array<{ type: string; slug: string }> = []
    
    // For each content type, get all published items
    for (const contentType of contentTypes.docs) {
      const items = await payload.find({
        collection: 'custom-items',
        where: {
          contentType: { equals: contentType.id },
          _status: { equals: 'published' },
        },
        limit: 1000,
      })
      
      const typeSlug = contentType.archiveSlug 
        ? contentType.archiveSlug.replace(/^\/?items\//, '')
        : contentType.slug
      
      for (const item of items.docs) {
        params.push({
          type: typeSlug,
          slug: item.slug,
        })
      }
    }
    
    return params
  } catch (error) {
    console.error('Failed to generate static params for custom items:', error)
    return []
  }
}

export async function generateMetadata({ params }: CustomItemPageProps): Promise<Metadata> {
  const { type, slug } = await params
  
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    
    // Find content type
    const contentTypes = await payload.find({
      collection: 'content-types',
      where: {
        or: [
          { slug: { equals: type } },
          { archiveSlug: { equals: `items/${type}` } },
          { archiveSlug: { equals: type } },
        ],
      },
      limit: 1,
    })
    
    const contentType = contentTypes.docs[0]
    if (!contentType) {
      return { title: 'Item Not Found' }
    }
    
    // Find item
    const { docs } = await payload.find({
      collection: 'custom-items',
      where: {
        slug: { equals: slug },
        contentType: { equals: contentType.id },
      },
      limit: 1,
    })
    
    const item = docs[0]
    if (!item) {
      return { title: 'Item Not Found' }
    }
    
    const featuredImage = typeof item.featuredImage === 'object' ? item.featuredImage : null
    
    return {
      title: item.meta?.title || item.title,
      description: item.meta?.description || item.excerpt,
      openGraph: {
        title: item.meta?.title || item.title,
        description: item.meta?.description || item.excerpt || undefined,
        images: featuredImage?.url ? [featuredImage.url] : undefined,
      },
    }
  } catch {
    return { title: 'Item Not Found' }
  }
}

export default async function CustomItemPage({ params }: CustomItemPageProps) {
  const { type, slug } = await params
  const { isEnabled: isDraft } = await draftMode()
  
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    
    // Find content type
    const contentTypes = await payload.find({
      collection: 'content-types',
      where: {
        or: [
          { slug: { equals: type } },
          { archiveSlug: { equals: `items/${type}` } },
          { archiveSlug: { equals: type } },
        ],
      },
      limit: 1,
      depth: 0,
    })
    
    const contentType = contentTypes.docs[0]
    if (!contentType) {
      notFound()
    }
    
    // Find item
    const { docs } = await payload.find({
      collection: 'custom-items',
      where: {
        slug: { equals: slug },
        contentType: { equals: contentType.id },
      },
      limit: 1,
      draft: isDraft,
      depth: 2,
    })
    
    const item = docs[0]
    if (!item) {
      notFound()
    }
    
    return (
      <div className="container py-16">
        <CustomItemRenderer item={item} contentType={contentType as any} />
      </div>
    )
  } catch (error) {
    console.error(`Failed to fetch custom item ${type}/${slug}:`, error)
    notFound()
  }
}

// Static generation with ISR
export const revalidate = 60

