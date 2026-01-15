import type { Endpoint } from 'payload'

/**
 * Custom endpoint to trigger frontend revalidation
 * Called by collection hooks after publish
 */
export const revalidateEndpoint: Endpoint = {
  path: '/revalidate',
  method: 'post',
  handler: async (req) => {
    const { payload } = req

    try {
      const body = await req.json?.()
      
      if (!body) {
        return Response.json(
          { error: 'Request body is required' },
          { status: 400 }
        )
      }

      const { collection, slug, id, secret } = body

      // Verify secret if configured
      const revalidationSecret = process.env.REVALIDATION_SECRET
      if (revalidationSecret && secret !== revalidationSecret) {
        return Response.json(
          { error: 'Invalid revalidation secret' },
          { status: 401 }
        )
      }

      // Log the revalidation request
      payload.logger.info(`Revalidation requested for ${collection}/${slug || id}`)

      // Forward to frontend revalidation endpoint
      const frontendUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
      
      try {
        const response = await fetch(`${frontendUrl}/api/revalidate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            secret: revalidationSecret,
            collection,
            slug,
            id,
          }),
        })

        if (response.ok) {
          payload.logger.info(`Successfully revalidated ${collection}/${slug || id}`)
          return Response.json({
            revalidated: true,
            collection,
            slug,
            id,
          })
        } else {
          const errorText = await response.text()
          payload.logger.error(`Revalidation failed: ${errorText}`)
          return Response.json(
            { error: 'Revalidation failed', details: errorText },
            { status: 500 }
          )
        }
      } catch (fetchError) {
        // Frontend might not be running, log but don't fail
        payload.logger.warn(`Could not reach frontend for revalidation: ${fetchError}`)
        return Response.json({
          revalidated: false,
          message: 'Frontend not reachable',
          collection,
          slug,
          id,
        })
      }
    } catch (error) {
      payload.logger.error(`Revalidation error: ${error}`)
      return Response.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  },
}

export default revalidateEndpoint
