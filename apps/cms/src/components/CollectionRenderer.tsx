import Image from 'next/image'
import Link from 'next/link'

import { RichText } from './RichText'

interface CollectionRendererProps {
  collection: any
}

export function CollectionRenderer({ collection }: CollectionRendererProps) {
  const {
    title,
    description,
    featuredImage,
  } = collection

  return (
    <article className="archive-template">
      {/* Header */}
      <header className="archive-header">
        {featuredImage?.url && (
          <div className="archive-hero-image">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="archive-header-content">
          {/* Breadcrumbs */}
          {collection.breadcrumbs && collection.breadcrumbs.length > 0 && (
            <nav className="mb-4 text-sm">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/collections" className="text-gray-600 hover:text-gray-900">
                    Collections
                  </Link>
                </li>
                {collection.breadcrumbs.map((crumb: any, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-gray-400">/</span>
                    {index === collection.breadcrumbs.length - 1 ? (
                      <span className="text-gray-900">{crumb.label}</span>
                    ) : (
                      <Link
                        href={crumb.url || `/collections/${crumb.doc?.slug}`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <h1 className="archive-heading">{title}</h1>
          
          {collection.shortDescription && (
            <p className="mt-4 text-lg text-gray-600">{collection.shortDescription}</p>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="archive-layout">
        <div className="archive-main">
          {/* Description */}
          {description && (
            <div className="prose prose-lg mb-12">
              <RichText content={description} />
            </div>
          )}

          {/* Featured Artifacts */}
          {collection.featuredArtifacts && collection.featuredArtifacts.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Featured Artifacts</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {collection.featuredArtifacts.map((artifact: any) => (
                  <Link
                    key={artifact.id}
                    href={`/artifacts/${artifact.slug}`}
                    className="card overflow-hidden transition-shadow hover:shadow-md"
                  >
                    {artifact.media?.[0]?.image?.url && (
                      <div className="relative h-48">
                        <Image
                          src={artifact.media[0].image.url}
                          alt={artifact.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{artifact.title}</h3>
                      {artifact.dateCreated && (
                        <p className="mt-1 text-sm text-gray-500">{artifact.dateCreated}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* All Artifacts in Collection */}
          {collection.artifacts?.docs && collection.artifacts.docs.length > 0 && (
            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">All Artifacts</h2>
              <div className="archive-items">
                {collection.artifacts.docs.map((artifact: any) => (
                  <Link
                    key={artifact.id}
                    href={`/artifacts/${artifact.slug}`}
                    className="archive-item"
                  >
                    <div className="archive-item-link">
                      {artifact.media?.[0]?.image?.url && (
                        <div className="archive-item-image">
                          <Image
                            src={artifact.media[0].image.url}
                            alt={artifact.title}
                            width={200}
                            height={200}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="archive-item-content">
                        <h3 className="archive-item-title">{artifact.title}</h3>
                        {artifact.dateCreated && (
                          <p className="mt-1 text-sm text-gray-500">{artifact.dateCreated}</p>
                        )}
                        {artifact.materials && artifact.materials.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {artifact.materials.slice(0, 3).map((item: any, index: number) => (
                              <span
                                key={index}
                                className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                              >
                                {item.material}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="archive-sidebar">
          {/* Curator */}
          {collection.curator && (
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900">Curator</h3>
              <p className="mt-2 text-gray-600">
                {collection.curator.name || collection.curator.email}
              </p>
            </div>
          )}

          {/* Stats */}
          {collection.artifactCount !== undefined && (
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900">Collection Stats</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Total Artifacts</dt>
                  <dd className="font-medium">{collection.artifactCount}</dd>
                </div>
              </dl>
            </div>
          )}

          {/* Parent Collection */}
          {collection.parent && typeof collection.parent === 'object' && (
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900">Parent Collection</h3>
              <Link
                href={`/collections/${collection.parent.slug}`}
                className="mt-2 block text-primary-600 hover:text-primary-700"
              >
                {collection.parent.title}
              </Link>
            </div>
          )}
        </aside>
      </div>
    </article>
  )
}
