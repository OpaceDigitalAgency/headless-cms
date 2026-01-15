import { getPayload as getPayloadInstance } from 'payload'
import config from './payload.config'

/**
 * Get Payload instance for server-side operations
 * Cached to prevent multiple initializations
 */
export const getPayload = async () => {
  return getPayloadInstance({ config })
}

export default getPayload
