'use client'

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

/**
 * Live Preview Listener Component
 * 
 * This component enables real-time preview updates when editing content in Payload CMS.
 * It listens for changes from the CMS admin panel and refreshes the preview iframe.
 */
export function LivePreviewListener({ serverURL }: { serverURL: string }) {
  const router = useRouter()

  return (
    <PayloadLivePreview
      refresh={router.refresh}
      serverURL={serverURL}
    />
  )
}

