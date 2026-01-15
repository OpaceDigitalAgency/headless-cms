import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Disable draft mode and redirect to home
 * GET request for easy linking from preview banner
 */
export async function GET() {
  const draft = await draftMode()
  draft.disable()
  
  redirect('/')
}
