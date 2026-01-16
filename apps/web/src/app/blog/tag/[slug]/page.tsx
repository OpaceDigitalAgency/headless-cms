import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getTags, getTagBySlug, getPosts } from '@/lib/api'

interface TagPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const tags = await getTags({ limit: 1000 })
    return tags.docs.map((tag) => ({
      slug: tag.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params
  const tag = await getTagBySlug(slug)

  if (!tag) {
    return { title: 'Tag Not Found' }
  }

  return {
    title: tag.title,
    description: tag.description || `Posts tagged ${tag.title}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  const tag = await getTagBySlug(slug)

  if (!tag) {
    notFound()
  }

  const posts = await getPosts({
    limit: 100,
    tag: tag.id,
    tags: [`taxonomy:tag:${tag.slug}`],
  })

  return (
    <div className="container py-16">
      <header className="mb-12 text-center">
        <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Tag</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{tag.title}</h1>
        {tag.description && (
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {tag.description}
          </p>
        )}
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.docs.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="card overflow-hidden transition-shadow hover:shadow-md"
          >
            {post.featuredImage?.url && (
              <div className="relative h-48">
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{post.title}</h2>
              {post.excerpt && (
                <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">{post.excerpt}</p>
              )}
              {post.publishedAt && (
                <p className="mt-4 text-sm text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {posts.docs.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No posts found with this tag.</p>
        </div>
      )}
    </div>
  )
}

export const dynamicParams = true
