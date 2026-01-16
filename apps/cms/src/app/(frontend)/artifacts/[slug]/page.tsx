import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { ArtifactRenderer } from '@/components/ArtifactRenderer'

interface ArtifactPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static params for all published artifacts
 */
export async function generateStaticParams() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const artifacts = await payload.find({
      collection: 'artifacts',
      where: { _status: { equals: 'published' } },
      limit: 1000,
    })
    return artifacts.docs.map((artifact) => ({ slug: artifact.slug }))
  } catch (error) {
    console.error('Failed to generate static params for artifacts:', error)
    return []
  }
}

export async function generateMetadata({ params }: ArtifactPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'artifacts',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const artifact = docs[0]
    
    if (!artifact) {
      return { title: 'Artifact Not Found' }
    }

    const primaryImage = artifact.media?.[0]?.image

    return {
      title: artifact.meta?.title || artifact.title,
      description: artifact.meta?.description,
      openGraph: {
        title: artifact.meta?.title || artifact.title,
        description: artifact.meta?.description || undefined,
        images: typeof primaryImage === 'object' && primaryImage?.url ? [primaryImage.url] : undefined,
      },
    }
  } catch {
    return { title: 'Artifact Not Found' }
  }
}

export default async function ArtifactPage({ params }: ArtifactPageProps) {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()
  
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'artifacts',
      where: { slug: { equals: slug } },
      limit: 1,
      draft: isDraft,
    })
    const artifact = docs[0]

    if (!artifact) {
      notFound()
    }

    return (
      <div className="container py-16">
        <ArtifactRenderer artifact={artifact} />
      </div>
    )
  } catch (error) {
    console.error(`Failed to fetch artifact ${slug}:`, error)
    notFound()
  }
}

// Static generation with ISR
export const revalidate = 60

