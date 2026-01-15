/**
 * Shared Utilities for Payload CMS + Jamstack Platform
 */

/**
 * Generate a URL-friendly slug from a string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Format a date string for display
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', options);
}

/**
 * Truncate text to a specified length
 */
export function truncate(text: string, length: number = 150): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

/**
 * Check if a value is a populated document or just an ID
 */
export function isPopulated<T extends { id: string }>(
  value: T | string | null | undefined
): value is T {
  return value !== null && value !== undefined && typeof value === 'object' && 'id' in value;
}

/**
 * Get the ID from a document or ID string
 */
export function getDocumentId<T extends { id: string }>(value: T | string | null | undefined): string | null {
  if (!value) return null;
  if (typeof value === 'string') return value;
  return value.id;
}

/**
 * Build a full URL from a path
 */
export function buildUrl(path: string, baseUrl?: string): string {
  const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

/**
 * Get media URL with fallback
 */
export function getMediaUrl(
  media: { url?: string } | string | null | undefined,
  fallback: string = '/placeholder.jpg'
): string {
  if (!media) return fallback;
  if (typeof media === 'string') return media;
  return media.url || fallback;
}

/**
 * Deep merge objects
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const output = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (
        source[key] &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key]) &&
        target[key] &&
        typeof target[key] === 'object' &&
        !Array.isArray(target[key])
      ) {
        output[key] = deepMerge(target[key], source[key] as any);
      } else {
        output[key] = source[key] as any;
      }
    }
  }
  
  return output;
}

/**
 * Generate cache tags for revalidation
 */
export function generateCacheTags(collection: string, slug?: string, id?: string): string[] {
  const tags: string[] = [collection];
  
  if (slug) {
    tags.push(`${collection}:${slug}`);
  }
  
  if (id) {
    tags.push(`${collection}:id:${id}`);
  }
  
  return tags;
}

/**
 * Parse query string parameters
 */
export function parseQueryParams(searchParams: URLSearchParams): Record<string, string | string[]> {
  const params: Record<string, string | string[]> = {};
  
  searchParams.forEach((value, key) => {
    if (params[key]) {
      if (Array.isArray(params[key])) {
        (params[key] as string[]).push(value);
      } else {
        params[key] = [params[key] as string, value];
      }
    } else {
      params[key] = value;
    }
  });
  
  return params;
}

/**
 * Validate environment variables
 */
export function validateEnv(required: string[]): void {
  const missing = required.filter((key) => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if running on server
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}
