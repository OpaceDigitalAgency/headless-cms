// @ts-nocheck
import type { Endpoint } from 'payload'
import { execSync } from 'child_process'

export const versionEndpoint: Endpoint = {
  path: '/admin/version',
  method: 'get',
  handler: async (req) => {
    try {
      let branch = 'unknown'
      let version = 'unknown'

      try {
        branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim()
      } catch (e) {
        // Railway doesn't have git — use Railway env vars as fallback
        branch = process.env.RAILWAY_GIT_BRANCH || process.env.NODE_ENV || 'unknown'
      }

      try {
        version = execSync('git describe --tags --always', { encoding: 'utf-8' }).trim()
      } catch (e) {
        // Use Railway commit SHA (short) or fall back to environment label
        const commitSha = process.env.RAILWAY_GIT_COMMIT_SHA
        version = commitSha ? commitSha.substring(0, 7) : (process.env.NODE_ENV === 'production' ? 'prod' : 'dev')
      }

      const database = process.env.DATABASE_URL?.split('/').pop()?.split('?')[0] || 'unknown'
      const port = process.env.PORT || process.env.CMS_PORT || '3000'

      return Response.json({
        branch,
        version,
        database,
        port,
      })
    } catch (error) {
      console.error('Error fetching version info:', error)
      return Response.json(
        {
          branch: 'unknown',
          version: 'unknown',
          database: 'unknown',
          port: 'unknown',
        },
        { status: 500 }
      )
    }
  },
}

