import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getCategories, getCategoryBySlug, getPostsByCategory } from '@/lib/payload-api'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const categories = await getCategories(1000)
    return categories.docs.map((category: any) => ({
      slug: category.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: category.title,
    description: category.description || `Posts in ${category.title}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id, 100)

  return (
    <div className="container py-16">
      <header className="mb-12 text-centre">
        <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Category</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{category.title}</h1>
        {category.description && (
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {category.description}
          </p>
        )}
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
          <p>No posts found in this category.</p>
        </div>
      )}
    </div>
  )
}

export const dynamicParams = true
