import Image from 'next/image'
import Link from 'next/link'

import { RichText } from './RichText'

interface PersonRendererProps {
  person: any
}

export function PersonRenderer({ person }: PersonRendererProps) {
  const {
    name,
    portrait,
    biography,
    birthDate,
    deathDate,
  } = person

  return (
    <article className="detail-template">
      <div className="grid gap-12 lg:grid-cols-3">
        {/* Sidebar with Portrait */}
        <aside className="lg:col-span-1">
          {portrait?.url && (
            <div className="overflow-hidden rounded-xl">
              <Image
                src={portrait.url}
                alt={name}
                width={portrait.width || 400}
                height={portrait.height || 500}
                className="w-full object-cover"
                priority
              />
            </div>
          )}

          <div className="mt-6 card p-6">
            <h2 className="font-semibold text-gray-900">Details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {birthDate && (
                <div>
                  <dt className="text-gray-500">Born</dt>
                  <dd className="font-medium">{birthDate}</dd>
                </div>
              )}
              {deathDate && (
                <div>
                  <dt className="text-gray-500">Died</dt>
                  <dd className="font-medium">{deathDate}</dd>
                </div>
              )}
              {person.nationality && (
                <div>
                  <dt className="text-gray-500">Nationality</dt>
                  <dd className="font-medium">{person.nationality}</dd>
                </div>
              )}
              {person.role && person.role.length > 0 && (
                <div>
                  <dt className="text-gray-500">Roles</dt>
                  <dd className="font-medium capitalize">
                    {person.role.join(', ')}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Movements */}
          {person.movements && person.movements.length > 0 && (
            <div className="mt-6 card p-6">
              <h3 className="font-semibold text-gray-900">Artistic Movements</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {person.movements.map((item: any, index: number) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {item.movement}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <header className="detail-header">
            <h1 className="detail-heading">{name}</h1>
            {person.shortBio && (
              <p className="detail-subheading">{person.shortBio}</p>
            )}
          </header>

          {biography && (
            <div className="detail-body mt-8">
              <RichText content={biography} />
            </div>
          )}

          {/* Influences */}
          {person.influences && person.influences.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-gray-900">Influenced By</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {person.influences.map((influence: any) => (
                  <Link
                    key={influence.id}
                    href={`/people/${influence.slug}`}
                    className="card flex items-center gap-4 p-4 transition-shadow hover:shadow-md"
                  >
                    {influence.portrait?.url && (
                      <Image
                        src={influence.portrait.url}
                        alt={influence.name}
                        width={60}
                        height={60}
                        className="h-15 w-15 rounded-full object-cover"
                      />
                    )}
                    <span className="font-medium">{influence.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Influenced */}
          {person.influenced && person.influenced.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-gray-900">Influenced</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {person.influenced.map((influence: any) => (
                  <Link
                    key={influence.id}
                    href={`/people/${influence.slug}`}
                    className="card flex items-center gap-4 p-4 transition-shadow hover:shadow-md"
                  >
                    {influence.portrait?.url && (
                      <Image
                        src={influence.portrait.url}
                        alt={influence.name}
                        width={60}
                        height={60}
                        className="h-15 w-15 rounded-full object-cover"
                      />
                    )}
                    <span className="font-medium">{influence.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Items */}
          {person.relatedItems?.docs && person.relatedItems.docs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-gray-900">Related Items</h2>
              <div className="related-grid">
                {person.relatedItems.docs.map((artifact: any) => (
                  <Link
                    key={artifact.id}
                    href={`/archive-items/${artifact.slug}`}
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
        </div>
      </div>
    </article>
  )
}
