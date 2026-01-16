import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getArtifacts } from '@/lib/payload-api'

export const metadata: Metadata = {
  title: 'Artifacts',
  description: 'Explore our collection of artifacts',
}

export default async function ArtifactsPage() {
  const artifacts = await getArtifacts(500)

  return (
    <div className="container py-16">
      <header className="mb-12 text-centre">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Artifacts</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Explore our collection of historical artifacts
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {artifacts.docs.map((artifact: any) => {
          const primaryImage = artifact.media?.[0]?.image
          
          return (
            <Link
              key={artifact.id}
              href={`/artifacts/${artifact.slug}`}
              className="card overflow-hidden transition-shadow hover:shadow-md"
            >
              {primaryImage?.url && (
                <div className="relative h-48">
                  <Image
                    src={primaryImage.url}
                    alt={primaryImage.alt || artifact.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="font-semibold text-gray-900 dark:text-white">{artifact.title}</h2>
                {artifact.dateCreated && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{artifact.dateCreated}</p>
                )}
                {artifact.materials && artifact.materials.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {artifact.materials.slice(0, 2).map((item: any, index: number) => (
                      <span
                        key={index}
                        className="rounded bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300"
                      >
                        {item.material}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>

      {artifacts.docs.length === 0 && (
        <div className="text-centre text-gray-500 dark:text-gray-400">
          <p>No artifacts found.</p>
        </div>
      )}
    </div>
  )
}

// Static generation with ISR
export const revalidate = 60

