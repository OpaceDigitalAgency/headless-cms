import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'revalidation-secret-key'

/**
 * Enable draft mode for preview
 * Called from Payload CMS admin panel when clicking "Preview"
 * 
 * SECURITY: Requires secret token to enable draft mode
 * Without valid secret, draft mode cannot be enabled
 * 
 * Query params:
 * - secret: Must match REVALIDATION_SECRET
 * - collection: The collection slug (pages, posts, artifacts, etc.)
 * - slug: The document slug
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')
  const collection = searchParams.get('collection')

  // SECURITY: Verify secret token
  if (secret !== REVALIDATION_SECRET) {
    return NextResponse.json(
      { error: 'Invalid preview secret' },
      { status: 401 }
    )
  }

  // Validate required params
  if (!collection || !slug) {
    return NextResponse.json(
      { error: 'Missing collection or slug parameter' },
      { status: 400 }
    )
  }

  // Enable draft mode - sets secure cookie
  const draft = await draftMode()
  draft.enable()

  // Redirect to the preview route (SSR, not static)
  // All preview routes go through /preview/[collection]/[slug]
  // This ensures draft content is always fetched fresh
  redirect(`/preview/${collection}/${slug}`)
}

/**
 * Disable draft mode
 * POST request to exit preview mode
 */
export async function POST() {
  const draft = await draftMode()
  draft.disable()
  
  return NextResponse.json({ 
    success: true, 
    draftMode: false,
    message: 'Draft mode disabled' 
  })
}
