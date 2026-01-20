import type { Payload } from 'payload'
import { isDefaultEnabled } from './navigationConfig'

interface CollectionOverride {
  slug?: string
  enabled?: boolean
  uninstalled?: boolean
}

const normalizeOverrides = (raw: unknown): Map<string, CollectionOverride> => {
  if (!Array.isArray(raw)) {
    return new Map()
  }
  const entries = raw
    .filter((item): item is CollectionOverride => typeof item === 'object' && item !== null)
    .filter((item) => typeof item.slug === 'string')
    .map((item) => [item.slug as string, item])
  return new Map(entries)
}

export const resolveCollectionEnabled = (
  slug: string,
  overrides: Map<string, CollectionOverride>
): boolean => {
  const override = overrides.get(slug)
  if (override?.uninstalled) return false
  if (typeof override?.enabled === 'boolean') return override.enabled
  return isDefaultEnabled(slug)
}

export const getCollectionOverrides = async (payload: Payload): Promise<Map<string, CollectionOverride>> => {
  const navigationSettings = await payload.findGlobal({ slug: 'navigation-settings', depth: 0 }).catch(() => null)
  return normalizeOverrides(navigationSettings?.collections)
}

export const isCollectionEnabled = async (payload: Payload, slug: string): Promise<boolean> => {
  const overrides = await getCollectionOverrides(payload)
  return resolveCollectionEnabled(slug, overrides)
}
