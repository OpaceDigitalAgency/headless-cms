import { notFound, redirect } from 'next/navigation'
import { draftMode } from 'next/headers'
import {
  getPageBySlug,
  getPostBySlug,
  getArchiveItemBySlug,
  getPersonBySlug,
  getPlaceBySlug,
} from '@/lib/api'
import { PageRenderer } from '@/components/PageRenderer'
import { PostRenderer } from '@/components/PostRenderer'
import { ArchiveItemRenderer } from '@/components/ArchiveItemRenderer'
import { PersonRenderer } from '@/components/PersonRenderer'
import { PlaceRenderer } from '@/components/PlaceRenderer'

interface PreviewPageProps {
  params: Promise<{
    collection: string
    slug: string
  }>
}

/**
 * Universal preview page for all collections
 * Route: /preview/[collection]/[slug]
 * 
 * SECURITY: This route is SSR-only and requires draft mode to be enabled.
 * Draft mode is enabled via /api/draft route with a secret token.
 * Without valid draft mode cookie, users are redirected to the public page.
 */
export default async function PreviewPage({ params }: PreviewPageProps) {
  const { collection, slug } = await params
  const draft = await draftMode()
  const isDraft = draft.isEnabled

  // SECURITY: Redirect to public page if draft mode is not enabled
  // This prevents unauthorized access to draft content
  if (!isDraft) {
    const publicPath = collection === 'pages'
      ? `/${slug}`
      : `/${collection}/${slug}`
    redirect(publicPath)
  }

  // Fetch options for draft mode - always no-store for fresh content
  const fetchOptions = {
    draft: true,
    cache: 'no-store' as const,
  }

  // Fetch document based on collection
  let document: any = null

  try {
    switch (collection) {
      case 'pages':
        document = await getPageBySlug(slug, fetchOptions)
        break
      case 'posts':
        document = await getPostBySlug(slug, fetchOptions)
        break
      case 'archive-items':
        document = await getArchiveItemBySlug(slug, fetchOptions)
        break
      case 'people':
        document = await getPersonBySlug(slug, fetchOptions)
        break
      case 'places':
        document = await getPlaceBySlug(slug, fetchOptions)
        break
      default:
        notFound()
    }
  } catch (error) {
    console.error('Preview fetch error:', error)
    notFound()
  }

  if (!document) {
    notFound()
  }

  // Preview banner component
  const PreviewBanner = () => (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 px-4 py-2 text-center text-sm font-medium text-amber-900 shadow-md">
      <span className="font-bold">Preview Mode</span>
      <span className="mx-2">•</span>
      <span>
        {collection}/{slug}
      </span>
      <span className="mx-2">•</span>
      <span className={document._status === 'draft' ? 'text-red-700 font-bold' : 'text-green-700'}>
        {document._status || 'published'}
      </span>
      <a
        href="/api/draft/disable"
        className="ml-4 rounded bg-amber-700 px-3 py-1 text-xs text-white hover:bg-amber-800"
      >
        Exit Preview
      </a>
    </div>
  )

  // Render based on collection type
  return (
    <>
      <PreviewBanner />
      <div className="pt-12">
        {collection === 'pages' && <PageRenderer page={document} />}
        {collection === 'posts' && (
          <div className="container py-16">
            <PostRenderer post={document} />
          </div>
        )}
        {collection === 'archive-items' && (
          <div className="container py-16">
            <ArchiveItemRenderer item={document} />
          </div>
        )}
        {collection === 'people' && (
          <div className="container py-16">
            <PersonRenderer person={document} />
          </div>
        )}
        {collection === 'places' && (
          <div className="container py-16">
            <PlaceRenderer place={document} />
          </div>
        )}
      </div>
    </>
  )
}

// CRITICAL: Preview routes use SSR (force-dynamic), NOT static generation
// This ensures:
// 1. Fresh draft content is always fetched
// 2. Draft mode cookie is checked on every request
// 3. No static HTML is generated for preview routes
export const dynamic = 'force-dynamic'
