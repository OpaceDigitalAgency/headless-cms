'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { PageRenderer } from '@/components/PageRenderer'
import { PostRenderer } from '@/components/PostRenderer'
import { ArchiveItemRenderer } from '@/components/ArchiveItemRenderer'

interface LivePreviewPageProps {
  initialData: any
  collection: string
  slug: string
}

/**
 * Client component for live preview with real-time updates.
 * Uses Payload's useLivePreview hook for instant updates as content is edited.
 */
export function LivePreviewPage({ initialData, collection, slug }: LivePreviewPageProps) {
  const serverURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  const { data } = useLivePreview({
    initialData,
    serverURL,
    depth: 2,
  })

  // Preview banner component
  const PreviewBanner = () => (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 px-4 py-2 text-center text-sm font-medium text-amber-900 shadow-md">
      <span className="font-bold">🔴 Live Preview</span>
      <span className="mx-2">•</span>
      <span>
        {collection}/{slug}
      </span>
      <span className="mx-2">•</span>
      <span className={data._status === 'draft' ? 'text-red-700 font-bold' : 'text-green-700'}>
        {data._status || 'published'}
      </span>
      <a
        href="/"
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
        {collection === 'pages' && <PageRenderer page={data} />}
        {collection === 'posts' && (
          <div className="container py-16">
            <PostRenderer post={data} />
          </div>
        )}
        {collection === 'archive-items' && (
          <div className="container py-16">
            <ArchiveItemRenderer item={data} />
          </div>
        )}
      </div>
    </>
  )
}
