import Image from 'next/image'
import Link from 'next/link'
import type { ArchiveItem } from '@/lib/api'
import { RichText } from './RichText'

interface ArchiveItemRendererProps {
  item: ArchiveItem
}

export function ArchiveItemRenderer({ item }: ArchiveItemRendererProps) {
  const {
    title,
    description,
    richContent,
    featuredImage,
    gallery,
    creators,
    origins,
    template,
    specifications,
    dateCreated,
    dateAcquired,
    provenance,
    catalogNumber,
    onDisplay,
    location,
    relatedItems,
  } = item

  const primaryImage = featuredImage || gallery?.[0]?.image
  const bodyContent = richContent || description

  return (
    <article className="detail-template">
      <header className="detail-header">
        <h1 className="detail-heading">{title}</h1>
        {template && (
          <p className="mt-2 text-sm uppercase tracking-wide text-gray-500">{template}</p>
        )}
      </header>

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

      <div className="detail-content-wrapper">
        <div className="detail-main">
          {bodyContent && (
            <div className="detail-body">
              <RichText content={bodyContent} />
            </div>
          )}

          {specifications && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">Specifications</h2>
              <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {specifications.height && (
                  <div>
                    <dt className="text-sm text-gray-500">Height</dt>
                    <dd className="font-medium">{specifications.height}</dd>
                  </div>
                )}
                {specifications.width && (
                  <div>
                    <dt className="text-sm text-gray-500">Width</dt>
                    <dd className="font-medium">{specifications.width}</dd>
                  </div>
                )}
                {specifications.depth && (
                  <div>
                    <dt className="text-sm text-gray-500">Depth</dt>
                    <dd className="font-medium">{specifications.depth}</dd>
                  </div>
                )}
                {specifications.weight && (
                  <div>
                    <dt className="text-sm text-gray-500">Weight</dt>
                    <dd className="font-medium">{specifications.weight}</dd>
                  </div>
                )}
              </dl>
              {specifications.materials && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700">Materials</h3>
                  <p className="mt-1 text-sm text-gray-600">{specifications.materials}</p>
                </div>
              )}
              {specifications.condition && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700">Condition</h3>
                  <p className="mt-1 text-sm text-gray-600">{specifications.condition}</p>
                </div>
              )}
            </div>
          )}

          {provenance && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">Provenance</h2>
              <div className="mt-4 prose prose-sm">
                <RichText content={provenance} />
              </div>
            </div>
          )}
        </div>

        <aside className="detail-sidebar">
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900">Quick Facts</h3>
            <dl className="mt-4 space-y-3 text-sm">
              {dateCreated && (
                <div>
                  <dt className="text-gray-500">Date Created</dt>
                  <dd className="font-medium">{dateCreated}</dd>
                </div>
              )}
              {dateAcquired && (
                <div>
                  <dt className="text-gray-500">Date Acquired</dt>
                  <dd className="font-medium">{dateAcquired}</dd>
                </div>
              )}
              {catalogNumber && (
                <div>
                  <dt className="text-gray-500">Catalog Number</dt>
                  <dd className="font-medium">{catalogNumber}</dd>
                </div>
              )}
              {onDisplay && (
                <div>
                  <dt className="text-gray-500">Location</dt>
                  <dd className="font-medium">{location || 'On Display'}</dd>
                </div>
              )}
            </dl>
          </div>

          {creators && creators.length > 0 && (
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900">Creators</h3>
              <ul className="mt-4 space-y-3">
                {creators.map((person: any) => (
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

          {origins && origins.length > 0 && (
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900">Places of Origin</h3>
              <ul className="mt-4 space-y-2">
                {origins.map((place: any) => (
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

      {gallery && gallery.length > 1 && (
        <div className="detail-gallery">
          <h2 className="text-xl font-semibold text-gray-900">Gallery</h2>
          <div className="gallery-grid">
            {gallery.slice(1).map((entry: any, index: number) => (
              <div key={index} className="gallery-item">
                {entry.image?.url && (
                  <Image
                    src={entry.image.url}
                    alt={entry.caption || `${title} - Image ${index + 2}`}
                    width={400}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                )}
                {entry.caption && (
                  <p className="mt-2 text-sm text-gray-500">{entry.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedItems && relatedItems.length > 0 && (
        <div className="detail-related">
          <h2 className="text-xl font-semibold text-gray-900">Related Items</h2>
          <div className="related-grid">
            {relatedItems.map((related: any) => (
              <Link
                key={related.id}
                href={`/archive-items/${related.slug}`}
                className="related-item"
              >
                {related.featuredImage?.url && (
                  <Image
                    src={related.featuredImage.url}
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

export default ArchiveItemRenderer
