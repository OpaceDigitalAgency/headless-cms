import { Metadata } from 'next'
import { getContentTypes } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Browse archive-based collections',
}

export default async function CollectionsPage() {
  const types = await getContentTypes({ limit: 500 }).catch(() => ({ docs: [] } as any))
  const collections = types.docs
    .filter((type: any) => type.hasArchive !== false && type.template === 'archive-item')
    .map((type: any) => {
      const archivePath = type.archiveSlug ? `/${type.archiveSlug.replace(/^\\//, '')}` : `/items/${type.slug}`
      return {
        id: type.id,
        title: type.pluralLabel || type.name,
        description: type.description,
        url: archivePath,
      }
    })

  return (
    <div className="container py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Collections</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Browse curated archive collections
        </p>
      </header>

      {collections.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection: any) => (
            <a
              key={collection.id}
              href={collection.url}
              className="card group overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="bg-gray-100 dark:bg-gray-800 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{collection.title}</h2>
                {collection.description && (
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {collection.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>
      )}

      {collections.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>No archive collections found.</p>
        </div>
      )}
    </div>
  )
}

// Static generation - revalidation only via on-demand webhook
export const dynamic = 'force-static'
