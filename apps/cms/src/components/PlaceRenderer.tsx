import Image from 'next/image'
import Link from 'next/link'

import { RichText } from './RichText'

interface PlaceRendererProps {
  place: any
}

export function PlaceRenderer({ place }: PlaceRendererProps) {
  const {
    name,
    description,
    featuredImage,
    location,
  } = place

  return (
    <article className="detail-template">
      {/* Header */}
      <header className="detail-header">
        <h1 className="detail-heading">{name}</h1>
        {place.country && (
          <p className="detail-subheading">{place.country}</p>
        )}
      </header>

      {/* Featured Image */}
      {featuredImage?.url && (
        <div className="detail-featured-image">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || name}
            width={featuredImage.width || 1200}
            height={featuredImage.height || 600}
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

          {/* Historical Significance */}
          {place.historicalSignificance && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Historical Significance</h2>
              <div className="mt-4 prose prose-lg">
                <RichText content={place.historicalSignificance} />
              </div>
            </div>
          )}

          {/* Historical Names */}
          {place.historicalNames && place.historicalNames.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Historical Names</h2>
              <dl className="mt-4 space-y-3">
                {place.historicalNames.map((item: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <dt className="font-medium">{item.name}</dt>
                    {item.period && (
                      <dd className="text-gray-500">({item.period})</dd>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="detail-sidebar">
          {/* Location Info */}
          <div className="card p-6">
            <h3 className="font-semibold text-gray-900">Location</h3>
            {place.address && (
              <address className="mt-4 not-italic text-sm text-gray-600">
                {place.address.street && <div>{place.address.street}</div>}
                {(place.address.city || place.address.region) && (
                  <div>
                    {place.address.city}
                    {place.address.city && place.address.region && ', '}
                    {place.address.region}
                  </div>
                )}
                {place.address.postalCode && <div>{place.address.postalCode}</div>}
                {place.address.country && <div>{place.address.country}</div>}
              </address>
            )}
            
            {location && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Coordinates: {location.latitude?.toFixed(4)}, {location.longitude?.toFixed(4)}
                </p>
                <a
                  href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-primary-600 hover:text-primary-700"
                >
                  View on Google Maps →
                </a>
              </div>
            )}
          </div>

          {/* Place Type */}
          {place.placeType && (
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900">Type</h3>
              <p className="mt-2 capitalize text-gray-600">{place.placeType}</p>
            </div>
          )}

          {/* Related Places */}
          {place.relatedPlaces && place.relatedPlaces.length > 0 && (
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900">Related Places</h3>
              <ul className="mt-4 space-y-2">
                {place.relatedPlaces.map((related: any) => (
                  <li key={related.id}>
                    <Link
                      href={`/places/${related.slug}`}
                      className="text-sm hover:text-primary-600"
                    >
                      {related.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {/* Gallery */}
      {place.gallery && place.gallery.length > 0 && (
        <div className="detail-gallery">
          <h2 className="text-xl font-semibold text-gray-900">Gallery</h2>
          <div className="gallery-grid">
            {place.gallery.map((item: any, index: number) => (
              <div key={index} className="gallery-item">
                {item.image?.url && (
                  <Image
                    src={item.image.url}
                    alt={item.caption || `${name} - Image ${index + 1}`}
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
      {place.relatedArtifacts?.docs && place.relatedArtifacts.docs.length > 0 && (
        <div className="detail-related">
          <h2 className="text-xl font-semibold text-gray-900">Related Artifacts</h2>
          <div className="related-grid">
            {place.relatedArtifacts.docs.map((artifact: any) => (
              <Link
                key={artifact.id}
                href={`/artifacts/${artifact.slug}`}
                className="related-item"
              >
                {artifact.media?.[0]?.image?.url && (
                  <Image
                    src={artifact.media[0].image.url}
                    alt={artifact.title}
                    width={400}
                    height={200}
                    className="h-40 w-full object-cover"
                  />
                )}
                <h3>{artifact.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
