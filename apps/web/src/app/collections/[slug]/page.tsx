import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getMuseumCollection, getMuseumCollections } from '@/lib/api'
import { CollectionRenderer } from '@/components/CollectionRenderer'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const collections = await getMuseumCollections({ limit: 100 })
    return collections.docs.map((collection) => ({
      slug: collection.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params for collections:', error)
    return []
  }
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const collection = await getMuseumCollection(slug)
    
    if (!collection) {
      return { title: 'Collection Not Found' }
    }

    return {
      title: collection.meta?.title || collection.title,
      description: collection.meta?.description || collection.shortDescription,
      openGraph: {
        title: collection.meta?.title || collection.title,
        description: collection.meta?.description || collection.shortDescription || undefined,
        images: collection.featuredImage?.url ? [collection.featuredImage.url] : undefined,
      },
    }
  } catch (error) {
    return { title: 'Collection Not Found' }
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  
  try {
    const collection = await getMuseumCollection(slug)

    if (!collection) {
      notFound()
    }

    return (
      <div className="container py-16">
        <CollectionRenderer collection={collection} />
      </div>
    )
  } catch (error) {
    console.error(`Failed to fetch collection ${slug}:`, error)
    notFound()
  }
}

export const revalidate = 60
export const dynamicParams = true
