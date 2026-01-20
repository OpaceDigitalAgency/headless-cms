import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getCategories, getCategoryContent } from '@/lib/api'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const categories = await getCategories({ limit: 1000 })
    return categories.docs.map((category) => ({
      slug: category.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const data = await getCategoryContent(slug)
    return {
      title: data.category.title,
      description: data.category.description || `All content in ${data.category.title}`,
    }
  } catch {
    return { title: 'Category Not Found' }
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  let data
  try {
    data = await getCategoryContent(slug)
  } catch {
    notFound()
  }

  const { category, content, counts } = data

  // Group content by collection type
  const contentByType = {
    posts: content.filter(item => item.collection === 'posts'),
    archiveItems: content.filter(item => item.collection === 'archive-items'),
    events: content.filter(item => item.collection === 'events'),
    people: content.filter(item => item.collection === 'people'),
    customItems: content.filter(item => item.collection === 'custom-items'),
  }

  const collectionLabels: Record<string, string> = {
    posts: 'Posts',
    'archive-items': 'Archive Items',
    events: 'Events',
    people: 'People',
    'custom-items': 'Custom Items',
  }

  const collectionPaths: Record<string, string> = {
    posts: '/blog',
    'archive-items': '/archive-items',
    events: '/events',
    people: '/people',
    'custom-items': '/items',
  }

  // Build breadcrumb trail for hierarchical categories
  const breadcrumbs: any[] = []
  let currentCat = category
  while (currentCat) {
    breadcrumbs.unshift(currentCat)
    currentCat = currentCat.parent && typeof currentCat.parent === 'object' ? currentCat.parent : null
  }

  return (
    <div className="container py-16">
      <header className="mb-12 text-center">
        {/* Breadcrumb navigation for hierarchical categories */}
        {breadcrumbs.length > 1 && (
          <nav className="mb-4 flex justify-center">
            <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.id} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  {index < breadcrumbs.length - 1 ? (
                    <Link
                      href={`/categories/${crumb.slug}`}
                      className="hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {crumb.title}
                    </Link>
                  ) : (
                    <span className="font-medium text-gray-900 dark:text-white">{crumb.title}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Category</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          {category.title}
        </h1>
        {category.description && (
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {category.description}
          </p>
        )}
        <div className="mt-6 flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>{counts.total} total items</span>
          {counts.posts > 0 && <span>• {counts.posts} posts</span>}
          {counts.archiveItems > 0 && <span>• {counts.archiveItems} archive items</span>}
          {counts.events > 0 && <span>• {counts.events} events</span>}
          {counts.people > 0 && <span>• {counts.people} people</span>}
          {counts.customItems > 0 && <span>• {counts.customItems} custom items</span>}
        </div>
      </header>

      {content.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No content found in this category.</p>
        </div>
      )}

      {/* Render content grouped by type */}
      {Object.entries(contentByType).map(([type, items]) => {
        if (items.length === 0) return null

        return (
          <section key={type} className="mb-16">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              {collectionLabels[type]} ({items.length})
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={`${collectionPaths[item.collection]}/${item.slug}`}
                  className="card overflow-hidden transition-shadow hover:shadow-md"
                >
                  {item.featuredImage?.url && (
                    <div className="relative h-48">
                      <Image
                        src={item.featuredImage.url}
                        alt={item.featuredImage.alt || item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
                        {item.excerpt}
                      </p>
                    )}
                    {item.publishedAt && (
                      <p className="mt-4 text-sm text-gray-400">
                        {new Date(item.publishedAt).toLocaleDateString('en-GB', {
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
          </section>
        )
      })}
    </div>
  )
}

export const dynamicParams = false
export const dynamic = 'force-static'
