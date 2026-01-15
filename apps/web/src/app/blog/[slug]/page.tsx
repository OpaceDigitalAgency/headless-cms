import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPost, getPosts } from '@/lib/api'
import { PostRenderer } from '@/components/PostRenderer'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const posts = await getPosts({ limit: 100 })
    return posts.docs.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Failed to generate static params for posts:', error)
    return []
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const post = await getPost(slug)
    
    if (!post) {
      return { title: 'Post Not Found' }
    }

    return {
      title: post.meta?.title || post.title,
      description: post.meta?.description || post.excerpt,
      openGraph: {
        title: post.meta?.title || post.title,
        description: post.meta?.description || post.excerpt || undefined,
        images: post.featuredImage?.url ? [post.featuredImage.url] : undefined,
        type: 'article',
        publishedTime: post.publishedAt || undefined,
      },
    }
  } catch (error) {
    return { title: 'Post Not Found' }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  
  try {
    const post = await getPost(slug)

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

export const revalidate = 60
export const dynamicParams = true
