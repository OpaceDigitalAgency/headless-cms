import { getContentTypes } from '@/lib/api'

const getArchivePath = (archiveSlug?: string, slug?: string) => {
  if (archiveSlug) {
    const normalized = archiveSlug.replace(/^\//, '')
    return `/${normalized}`
  }
  return slug ? `/items/${slug}` : '/items'
}

export default async function ContentTypesIndex() {
  const types = await getContentTypes({ limit: 100 }).catch(() => ({ docs: [] } as any))

  return (
    <div className="container py-16">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Content Types</h1>
        <p className="mt-4 text-lg text-gray-600">Browse all dynamic content archives.</p>
      </header>

      {types.docs.length === 0 ? (
        <p className="text-center text-gray-500">No content types found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {types.docs
            .filter((type: any) => type.hasArchive !== false)
            .map((type: any) => (
            <a
              key={type.id}
              href={getArchivePath(type.archiveSlug, type.slug)}
              className="block rounded-lg border border-gray-100 p-6 shadow-sm hover:shadow-md"
            >
              <h2 className="text-xl font-semibold">{type.pluralLabel || type.name}</h2>
              {type.description && <p className="mt-2 text-sm text-gray-600">{type.description}</p>}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export const dynamic = 'force-static'
