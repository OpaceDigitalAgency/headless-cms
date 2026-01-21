import { MetadataRoute } from 'next'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'

export const revalidate = 3600 // Revalidate every hour

export default async function robots(): Promise<MetadataRoute.Robots> {
  const payload = await getPayloadHMR({ config: configPromise })
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const isProduction = process.env.NODE_ENV === 'production'

  try {
    // Fetch settings to check for custom robots.txt
    const settings = await payload.findGlobal({
      slug: 'settings',
      depth: 0,
    })

    // If custom robots.txt is provided, parse and return it
    if (settings?.robotsTxt) {
      return parseCustomRobotsTxt(settings.robotsTxt)
    }
  } catch (error) {
    console.error('Error fetching settings for robots.txt:', error)
  }

  // Default robots.txt configuration
  if (!isProduction) {
    // Block all crawlers in non-production environments
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  // Production default configuration
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/api',
          '/api/*',
          '/preview',
          '/preview/*',
          '/_next',
          '/_next/*',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

/**
 * Parse custom robots.txt content into MetadataRoute.Robots format
 */
function parseCustomRobotsTxt(customContent: string): MetadataRoute.Robots {
  const lines = customContent.split('\n').map(line => line.trim())
  const rules: MetadataRoute.Robots['rules'] = []
  let currentRule: any = null
  let sitemap: string | undefined

  for (const line of lines) {
    if (!line || line.startsWith('#')) continue

    const [key, ...valueParts] = line.split(':')
    const value = valueParts.join(':').trim()

    if (key.toLowerCase() === 'user-agent') {
      if (currentRule) {
        rules.push(currentRule)
      }
      currentRule = {
        userAgent: value,
        allow: [],
        disallow: [],
      }
    } else if (key.toLowerCase() === 'allow' && currentRule) {
      if (!Array.isArray(currentRule.allow)) {
        currentRule.allow = []
      }
      currentRule.allow.push(value)
    } else if (key.toLowerCase() === 'disallow' && currentRule) {
      if (!Array.isArray(currentRule.disallow)) {
        currentRule.disallow = []
      }
      currentRule.disallow.push(value)
    } else if (key.toLowerCase() === 'sitemap') {
      sitemap = value
    } else if (key.toLowerCase() === 'crawl-delay' && currentRule) {
      currentRule.crawlDelay = parseInt(value, 10)
    }
  }

  if (currentRule) {
    rules.push(currentRule)
  }

  // Clean up empty arrays
  const cleanedRules = rules.map(rule => {
    const cleaned: any = { userAgent: rule.userAgent }
    if (rule.allow && rule.allow.length > 0) cleaned.allow = rule.allow
    if (rule.disallow && rule.disallow.length > 0) cleaned.disallow = rule.disallow
    if (rule.crawlDelay) cleaned.crawlDelay = rule.crawlDelay
    return cleaned
  })

  const result: MetadataRoute.Robots = {
    rules: cleanedRules.length === 1 ? cleanedRules[0] : cleanedRules,
  }

  if (sitemap) {
    result.sitemap = sitemap
  }

  return result
}

