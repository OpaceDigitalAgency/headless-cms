import type { PayloadHandler } from 'payload'

/**
 * Reset Data Endpoint
 * 
 * Provides API endpoints for clearing and re-seeding sample data.
 * Only accessible to authenticated admin users.
 */
export const resetDataHandler: PayloadHandler = async (req) => {
  const { payload, user } = req

  // Check authentication
  if (!user) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Check admin role
  if (user.role !== 'admin') {
    return Response.json(
      { error: 'Forbidden - Admin access required' },
      { status: 403 }
    )
  }

  try {
    const body = await req.json?.() || {}
    const { action } = body

    if (action === 'clear') {
      // Clear all data except the current user
      const collections = [
        'pages',
        'posts',
        'categories',
        'tags',
        'archive-items',
        'people',
        'places',
        'media',
        'forms',
        'form-submissions',
        'redirects',
        'search',
      ]

      for (const collection of collections) {
        try {
          // Get all documents
          const docs = await payload.find({
            collection: collection as any,
            limit: 1000,
            depth: 0,
          })

          // Delete each document
          for (const doc of docs.docs) {
            await payload.delete({
              collection: collection as any,
              id: doc.id,
            })
          }
        } catch (e) {
          // Collection might not exist or be empty
          console.log(`Skipping collection ${collection}:`, e)
        }
      }

      return Response.json({
        success: true,
        message: 'All sample data cleared successfully! Users and settings preserved.',
      })
    }

    if (action === 'reseed') {
      // First clear data
      const collections = [
        'pages',
        'posts',
        'categories',
        'tags',
        'archive-items',
        'people',
        'places',
        'media',
      ]

      for (const collection of collections) {
        try {
          const docs = await payload.find({
            collection: collection as any,
            limit: 1000,
            depth: 0,
          })

          for (const doc of docs.docs) {
            await payload.delete({
              collection: collection as any,
              id: doc.id,
            })
          }
        } catch (e) {
          console.log(`Skipping collection ${collection}:`, e)
        }
      }

      // Now run the seed script
      try {
        const { seedBasicData } = await import('../seed/seed-data')
        await seedBasicData(payload)

        return Response.json({
          success: true,
          message: 'Database cleared and re-seeded with fresh sample data!',
        })
      } catch (seedError) {
        console.error('Seed error:', seedError)
        return Response.json({
          success: true,
          message: 'Data cleared. Note: Re-seeding requires running `pnpm seed` from command line for full sample data with images.',
        })
      }
    }

    return Response.json(
      { error: 'Invalid action. Use "clear" or "reseed".' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Reset data error:', error)
    return Response.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 }
    )
  }
}
