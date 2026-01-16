import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

/**
 * Exit Draft Mode API Route
 * 
 * Disables Next.js draft mode and redirects back to the public version of the page.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const redirectUrl = searchParams.get('redirect') || '/'

  // Disable draft mode
  const draft = await draftMode()
  draft.disable()

  // Redirect back to the page
  redirect(redirectUrl)
}

