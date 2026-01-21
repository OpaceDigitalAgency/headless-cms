import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { PostRenderer } from '@/components/PostRenderer'
import { getSettings } from '@/lib/payload-api'
import { generateArticleMetadata } from '@/lib/seo/metadata'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static params for all published posts
 */
export async function generateStaticParams() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const posts = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      limit: 1000,
    })
    return posts.docs.map((post) => ({ slug: post.slug }))
  } catch (error) {
    console.error('Failed to generate static params for posts:', error)
    return []
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const [settings, payload] = await Promise.all([
      getSettings(),
      getPayloadHMR({ config: configPromise }),
    ])

    const { docs } = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const post = docs[0]

    if (!post) {
      return { title: 'Post Not Found' }
    }

    const featuredImage = typeof post.featuredImage === 'object' ? post.featuredImage : null
    const author = typeof post.author === 'object' ? post.author : null

    return generateArticleMetadata(
      {
        title: post.title,
        excerpt: post.excerpt,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        author: author ? { name: author.name } : undefined,
        featuredImage: featuredImage || undefined,
        meta: post.meta,
      },
      settings,
      `/blog/${slug}`
    )
  } catch {
    return { title: 'Post Not Found' }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()
  
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
      draft: isDraft,
    })
    const post = docs[0]

    if (!post) {
      notFound()
    }

    return (
      <div className="container py-16">
        <PostRenderer post={post} />
      </div>
    )
  } catch (error) {
    console.error(`Failed to fetch post ${slug}:`, error)
    notFound()
  }
}

// Static generation with ISR
export const revalidate = 60

