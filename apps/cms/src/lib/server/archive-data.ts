import 'server-only'
import { getPayloadClient } from '@/lib/payload-api'

/**
 * Re-export getPayloadClient from a server-only module
 * This prevents webpack from trying to bundle Payload's Node.js dependencies
 */
export { getPayloadClient }

export async function fetchArchiveItems(
  relationTo: string,
  limit: number,
  contentType?: any
) {
  try {
    const payload = await getPayloadClient()
    const where: any = { _status: { equals: 'published' } }

    if (relationTo === 'custom-items' && contentType) {
      const contentTypeId = typeof contentType === 'object' ? contentType?.id : contentType
      where.contentType = { equals: contentTypeId }
    }

    const result = await payload.find({
      collection: relationTo as any,
      where,
      limit,
      depth: 2,
    })
    return result.docs || []
  } catch (error) {
    console.error('Failed to fetch archive items:', error)
    return []
  }
}

