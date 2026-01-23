import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Minimal Payload config used only for running DB migrations in production.
 *
 * Why this exists:
 * - The Next.js standalone runtime image may not include every optional Payload plugin/editor package.
 * - Running migrations should not require loading the full CMS config (richtext editor, plugins, etc).
 */
export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',

  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL || 'postgresql://payload:payload_secret@localhost:5432/payload',
    },
    push: false,
    migrationDir: path.resolve(dirname, '../../db/migrations'),
  }),

  collections: [],
  globals: [],
})

