import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { PostRenderer } from '@/components/PostRenderer'
import { getSettings } from '@/lib/payload-api'
import { generateArticleMetadata } from '@/lib/seo/metadata'
import { Container, Section } from '@repo/ui/primitives'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

/**
 * Generate static params for all published posts
 */
export async function generateStaticParams() {
  if (process.env.SKIP_STATIC_GENERATION === "1") {
    return []
  }

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

    // Transform meta image if it's a Media object
    const metaImage = post.meta?.image && typeof post.meta.image === 'object'
      ? {
          url: post.meta.image.url || null,
          alt: post.meta.image.alt || null,
          width: post.meta.image.width || null,
          height: post.meta.image.height || null,
        }
      : null

    return generateArticleMetadata(
      {
        title: post.title,
        excerpt: post.excerpt,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        author: author ? { name: author.name } : undefined,
        featuredImage: featuredImage || undefined,
        meta: post.meta ? {
          ...post.meta,
          image: metaImage,
        } : undefined,
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
    const [settings, payload] = await Promise.all([
      getSettings().catch(() => null),
      getPayloadHMR({ config: configPromise }),
    ])
    
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

    return <PostRenderer post={post} settings={settings} />
  } catch (error) {
    console.error(`Failed to fetch post ${slug}:`, error)
    notFound()
  }
}

// Static generation with ISR
export const revalidate = 60

