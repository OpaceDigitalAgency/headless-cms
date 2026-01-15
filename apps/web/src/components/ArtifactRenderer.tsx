import Image from 'next/image'
import Link from 'next/link'
import type { Artifact } from '@/lib/api'
import { RichText } from './RichText'

interface ArtifactRendererProps {
  artifact: Artifact
}

export function ArtifactRenderer({ artifact }: ArtifactRendererProps) {
  const {
    title,
    description,
    media,
    people,
    places,
    collections,
    template,
  } = artifact

  // Get primary image
  const primaryImage = media?.[0]?.image

  return (
    <article className="detail-template">
      {/* Header */}
      <header className="detail-header">
        <h1 className="detail-heading">{title}</h1>
        
        {collections && collections.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {collections.map((collection: any) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 hover:bg-primary-200"
              >
                {collection.title}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Featured Image */}
      {primaryImage?.url && (
        <div className="detail-featured-image">
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || title}
            width={primaryImage.width || 1200}
            height={primaryImage.height || 800}
            priority
            className="rounded-xl"
          />
        </div>
      )}

      {/* Content Layout */}
      <div className="detail-content-wrapper">
        {/* Main Content */}
        <div className="detail-main">
          {description && (
            <div className="detail-body">
              <RichText content={description} />
            </div>
          )}

          {/* Dimensions */}
          {artifact.dimensions && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">Dimensions</h2>
              <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {artifact.dimensions.height && (
                  <div>
                    <dt className="text-sm text-gray-500">Height</dt>
                    <dd className="font-medium">{artifact.dimensions.height} cm</dd>
                  </div>
                )}
                {artifact.dimensions.width && (
                  <div>
                    <dt className="text-sm text-gray-500">Width</dt>
                    <dd className="font-medium">{artifact.dimensions.width} cm</dd>
                  </div>
                )}
                {artifact.dimensions.depth && (
                  <div>
                    <dt className="text-sm text-gray-500">Depth</dt>
                    <dd className="font-medium">{artifact.dimensions.depth} cm</dd>
                  </div>
                )}
                {artifact.dimensions.weight && (
                  <div>
                    <dt className="text-sm text-gray-500">Weight</dt>
                    <dd className="font-medium">{artifact.dimensions.weight} kg</dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {/* Materials */}
          {artifact.materials && artifact.materials.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">Materials</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {artifact.materials.map((item: any, index: number) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {item.material}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Provenance */}
          {artifact.provenance && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">Provenance</h2>
              <div className="mt-4 prose prose-sm">
                <RichText content={artifact.provenance} />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="detail-sidebar">
          {/* Quick Facts */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900">Quick Facts</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {artifact.dateCreated && (
                <div>
                  <dt className="text-gray-500">Date Created</dt>
                  <dd className="font-medium">{artifact.dateCreated}</dd>
                </div>
              )}
              {artifact.accessionNumber && (
                <div>
                  <dt className="text-gray-500">Accession Number</dt>
                  <dd className="font-medium">{artifact.accessionNumber}</dd>
                </div>
              )}
              {artifact.onDisplay && (
                <div>
                  <dt className="text-gray-500">Location</dt>
                  <dd className="font-medium">{artifact.gallery || 'On Display'}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Related People */}
          {people && people.length > 0 && (
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900">Related People</h3>
              <ul className="mt-4 space-y-3">
                {people.map((person: any) => (
                  <li key={person.id}>
                    <Link
                      href={`/people/${person.slug}`}
                      className="flex items-center gap-3 text-sm hover:text-primary-600"
                    >
                      {person.portrait?.url && (
                        <Image
                          src={person.portrait.url}
                          alt={person.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      )}
                      <span>{person.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Places */}
          {places && places.length > 0 && (
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900">Related Places</h3>
              <ul className="mt-4 space-y-2">
                {places.map((place: any) => (
                  <li key={place.id}>
                    <Link
                      href={`/places/${place.slug}`}
                      className="text-sm hover:text-primary-600"
                    >
                      {place.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* Image Gallery */}
      {media && media.length > 1 && (
        <div className="detail-gallery">
          <h2 className="text-xl font-semibold text-gray-900">Gallery</h2>
          <div className="gallery-grid">
            {media.slice(1).map((item: any, index: number) => (
              <div key={index} className="gallery-item">
                {item.image?.url && (
                  <Image
                    src={item.image.url}
                    alt={item.caption || `${title} - Image ${index + 2}`}
                    width={400}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                )}
                {item.caption && (
                  <p className="mt-2 text-sm text-gray-500">{item.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Artifacts */}
      {artifact.relatedArtifacts && artifact.relatedArtifacts.length > 0 && (
        <div className="detail-related">
          <h2 className="text-xl font-semibold text-gray-900">Related Artifacts</h2>
          <div className="related-grid">
            {artifact.relatedArtifacts.map((related: any) => (
              <Link
                key={related.id}
                href={`/artifacts/${related.slug}`}
                className="related-item"
              >
                {related.media?.[0]?.image?.url && (
                  <Image
                    src={related.media[0].image.url}
                    alt={related.title}
                    width={400}
                    height={200}
                    className="h-40 w-full object-cover"
                  />
                )}
                <h3>{related.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
