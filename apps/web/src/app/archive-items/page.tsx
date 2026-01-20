import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getArchiveItems } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Archive Items',
  description: 'Browse archive items and collections',
}

export default async function ArchiveItemsPage() {
  const items = await getArchiveItems({ limit: 500 }).catch(() => ({ docs: [] } as any))

  return (
    <div className="container py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Archive Items</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Explore curated archive items
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.docs.map((item) => (
          <Link
            key={item.id}
            href={`/archive-items/${item.slug}`}
            className="card group overflow-hidden transition-shadow hover:shadow-lg"
          >
            {item.featuredImage?.url && (
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={item.featuredImage.url}
                  alt={item.featuredImage.alt || item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-xl font-bold text-white">{item.title}</h2>
                </div>
              </div>
            )}
            {!item.featuredImage?.url && (
              <div className="bg-gray-100 dark:bg-gray-800 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h2>
              </div>
            )}
          </Link>
        ))}
      </div>

      {items.docs.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No archive items found.</p>
        </div>
      )}
    </div>
  )
}

export const dynamic = 'force-static'
