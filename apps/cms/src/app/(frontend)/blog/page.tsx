import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts, getSettings } from '@/lib/payload-api'
import { generateEnhancedMetadata } from '@/lib/seo/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return generateEnhancedMetadata(
    {
      title: 'Blog',
      description: 'Latest news, articles, and updates',
    },
    settings,
    '/blog'
  )
}

export default async function BlogPage() {
  const posts = await getPosts(100)

  return (
    <div className="container py-16">
      <header className="mb-12 text-centre">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Blog</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Latest news, articles, and updates
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.docs.map((post: any) => (
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
              {post.categories && post.categories.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {post.categories.map((cat: any) => (
                    <span
                      key={cat.id}
                      className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{post.title}</h2>
              {post.excerpt && (
                <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">{post.excerpt}</p>
              )}
              {post.publishedAt && (
                <p className="mt-4 text-sm text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString('en-GB', {
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
        <div className="text-centre text-gray-500 dark:text-gray-400">
          <p>No posts found.</p>
        </div>
      )}
    </div>
  )
}

// Static generation with ISR
export const revalidate = 60

