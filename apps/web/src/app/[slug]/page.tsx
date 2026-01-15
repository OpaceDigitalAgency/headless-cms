import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPage, getPages } from '@/lib/api'
import { PageRenderer } from '@/components/PageRenderer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const pages = await getPages({ limit: 100 })
    return pages.docs
      .filter((page) => page.slug !== 'home')
      .map((page) => ({
        slug: page.slug,
      }))
  } catch (error) {
    console.error('Failed to generate static params for pages:', error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const page = await getPage(slug)
    
    if (!page) {
      return {
        title: 'Page Not Found',
      }
    }

    return {
      title: page.meta?.title || page.title,
      description: page.meta?.description,
      openGraph: {
        title: page.meta?.title || page.title,
        description: page.meta?.description || undefined,
        images: page.meta?.image?.url ? [page.meta.image.url] : undefined,
      },
    }
  } catch (error) {
    return {
      title: 'Page Not Found',
    }
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  
  try {
    const page = await getPage(slug)

    if (!page) {
      notFound()
    }

    return <PageRenderer page={page} />
  } catch (error) {
    console.error(`Failed to fetch page ${slug}:`, error)
    notFound()
  }
}

export const revalidate = 60
export const dynamicParams = true
