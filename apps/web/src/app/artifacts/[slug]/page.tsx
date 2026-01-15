import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getArtifact, getArtifacts } from '@/lib/api'
import { ArtifactRenderer } from '@/components/ArtifactRenderer'

interface ArtifactPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const artifacts = await getArtifacts({ limit: 100 })
    return artifacts.docs.map((artifact) => ({
      slug: artifact.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params for artifacts:', error)
    return []
  }
}

export async function generateMetadata({ params }: ArtifactPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const artifact = await getArtifact(slug)
    
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
        images: primaryImage?.url ? [primaryImage.url] : undefined,
      },
    }
  } catch (error) {
    return { title: 'Artifact Not Found' }
  }
}

export default async function ArtifactPage({ params }: ArtifactPageProps) {
  const { slug } = await params
  
  try {
    const artifact = await getArtifact(slug)

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

export const revalidate = 60
export const dynamicParams = true
