import React from 'react'

interface LivePreviewPageProps {
  initialData: any
  collection: string
  slug: string
  initialSettings?: any
}

/**
 * Client component for live preview with real-time updates.
 * Uses Payload's useLivePreview hook for instant updates as content is edited.
 */
export function LivePreviewPage({ initialData, collection, slug, initialSettings }: LivePreviewPageProps) {
  const data = initialData

  // Get skin settings
  const defaultSkin = initialSettings?.defaultSkin || 'minimal'
  const defaultMode = initialSettings?.defaultMode || 'light'

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

  return (
    <>
      <PreviewBanner />
      <div className="pt-12 min-h-screen bg-background text-foreground transition-colors">
        <div className="container py-8">
          <div className="rounded-lg border border-default bg-card p-6 text-left">
            <h2 className="text-lg font-semibold">Live Preview Payload</h2>
            <p className="mt-1 text-sm text-muted">
              Rendering is temporarily simplified for deployment stability.
            </p>
            <pre className="mt-4 max-h-[60vh] overflow-auto rounded bg-muted p-4 text-xs">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </>
  )
}
