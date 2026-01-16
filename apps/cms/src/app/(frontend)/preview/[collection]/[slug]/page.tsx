import { notFound, redirect } from 'next/navigation'
import { draftMode } from 'next/headers'
import { LivePreviewPage } from './LivePreviewPage'
import { getPayloadClient } from '@/lib/payload-api'

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
 * This page uses Payload's Live Preview feature for real-time updates.
 * Changes in the admin panel appear instantly without page refresh.
 */
export default async function PreviewPage({ params }: PreviewPageProps) {
  const { collection, slug } = await params
  const draft = await draftMode()
  const isDraft = draft.isEnabled

  // SECURITY: Redirect to public page if draft mode is not enabled
  if (!isDraft) {
    const publicPath = collection === 'pages' 
      ? `/${slug}` 
      : `/${collection === 'museum-collections' ? 'collections' : collection}/${slug}`
    redirect(publicPath)
  }

  const payload = await getPayloadClient()
  
  // Fetch initial data
  let document: any = null

  try {
    const result = await payload.find({
      collection: collection as any,
      where: { slug: { equals: slug } },
      depth: 2,
      draft: true,
      limit: 1,
    })
    document = result.docs[0]
  } catch (error) {
    console.error('Preview fetch error:', error)
    notFound()
  }

  if (!document) {
    notFound()
  }

  // Pass to client component for live preview
  return (
    <LivePreviewPage 
      initialData={document} 
      collection={collection}
      slug={slug}
    />
  )
}

// Preview routes are always dynamic (SSR)
export const dynamic = 'force-dynamic'

