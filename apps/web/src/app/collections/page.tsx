import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getMuseumCollections } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Browse our museum collections',
}

export default async function CollectionsPage() {
  const collections = await getMuseumCollections({ limit: 500, where: { _status: { equals: 'published' } } })

  return (
    <div className="container py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Collections</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Browse our curated museum collections
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {collections.docs.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.slug}`}
            className="card group overflow-hidden transition-shadow hover:shadow-lg"
          >
            {collection.featuredImage?.url && (
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={collection.featuredImage.url}
                  alt={collection.featuredImage.alt || collection.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-xl font-bold text-white">{collection.title}</h2>
                </div>
              </div>
            )}
            {!collection.featuredImage?.url && (
              <div className="bg-gray-100 dark:bg-gray-800 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{collection.title}</h2>
              </div>
            )}
            <div className="p-4">
              {collection.shortDescription && (
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{collection.shortDescription}</p>
              )}
              {collection.artifactCount !== undefined && (
                <p className="mt-2 text-sm text-gray-400">
                  {collection.artifactCount} artifacts
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {collections.docs.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No collections found.</p>
        </div>
      )}
    </div>
  )
}

// Static generation - revalidation only via on-demand webhook
export const dynamic = 'force-static'
