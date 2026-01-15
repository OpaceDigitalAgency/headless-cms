import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import {
  getPageBySlug,
  getPostBySlug,
  getArtifactBySlug,
  getPersonBySlug,
  getPlaceBySlug,
  getMuseumCollectionBySlug,
} from '@/lib/api'
import { PageRenderer } from '@/components/PageRenderer'
import { PostRenderer } from '@/components/PostRenderer'
import { ArtifactRenderer } from '@/components/ArtifactRenderer'
import { PersonRenderer } from '@/components/PersonRenderer'
import { PlaceRenderer } from '@/components/PlaceRenderer'
import { CollectionRenderer } from '@/components/CollectionRenderer'

interface PreviewPageProps {
  params: Promise<{
    collection: string
    slug: string
  }>
}

/**
 * Universal preview page for all collections
 * Route: /preview/[collection]/[slug]
 * Uses Payload Local API with draft access
 */
export default async function PreviewPage({ params }: PreviewPageProps) {
  const { collection, slug } = await params
  const draft = await draftMode()
  const isDraft = draft.isEnabled

  // Fetch options for draft mode
  const fetchOptions = {
    draft: isDraft,
    cache: 'no-store' as const,
  }

  // Fetch document based on collection
  let document: any = null

  switch (collection) {
    case 'pages':
      document = await getPageBySlug(slug, fetchOptions)
      break
    case 'posts':
      document = await getPostBySlug(slug, fetchOptions)
      break
    case 'artifacts':
      document = await getArtifactBySlug(slug, fetchOptions)
      break
    case 'people':
      document = await getPersonBySlug(slug, fetchOptions)
      break
    case 'places':
      document = await getPlaceBySlug(slug, fetchOptions)
      break
    case 'museum-collections':
      document = await getMuseumCollectionBySlug(slug, fetchOptions)
      break
    default:
      notFound()
  }

  if (!document) {
    notFound()
  }

  // Render preview banner
  const PreviewBanner = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-amber-500 px-4 py-2 text-center text-sm font-medium text-amber-900">
      <span>Preview Mode</span>
      <span className="mx-2">•</span>
      <span>
        {collection}/{slug}
      </span>
      <span className="mx-2">•</span>
      <span className={document._status === 'draft' ? 'text-amber-700' : 'text-green-700'}>
        {document._status || 'published'}
      </span>
      <form action="/api/draft" method="POST" className="ml-4 inline">
        <button
          type="submit"
          className="rounded bg-amber-700 px-2 py-1 text-xs text-white hover:bg-amber-800"
        >
          Exit Preview
        </button>
      </form>
    </div>
  )

  // Render based on collection type
  return (
    <>
      {isDraft && <PreviewBanner />}
      <div className={isDraft ? 'pb-12' : ''}>
        {collection === 'pages' && <PageRenderer page={document} />}
        {collection === 'posts' && <PostRenderer post={document} />}
        {collection === 'artifacts' && <ArtifactRenderer artifact={document} />}
        {collection === 'people' && <PersonRenderer person={document} />}
        {collection === 'places' && <PlaceRenderer place={document} />}
        {collection === 'museum-collections' && <CollectionRenderer collection={document} />}
      </div>
    </>
  )
}

// Disable static generation for preview pages
export const dynamic = 'force-dynamic'
