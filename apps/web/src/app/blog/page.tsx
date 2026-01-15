import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest news and articles',
}

export default async function BlogPage() {
  const posts = await getPosts({ limit: 20 })

  return (
    <div className="container py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Blog</h1>
        <p className="mt-4 text-lg text-gray-600">
          Latest news, articles, and updates
        </p>
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
              {post.categories && post.categories.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {post.categories.map((cat: any) => (
                    <span
                      key={cat.id}
                      className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700"
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
              {post.excerpt && (
                <p className="mt-2 text-gray-600 line-clamp-2">{post.excerpt}</p>
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
        <div className="text-center text-gray-500">
          <p>No posts found.</p>
        </div>
      )}
    </div>
  )
}

export const revalidate = 60
