import { getPayload } from 'payload'
import config from '@payload-config'

async function resetDatabase() {
  console.log('🗑️  Resetting database...')
  
  const payload = await getPayload({ config })
  const db = payload.db
  
  try {
    // Drop all tables and types
    await db.execute({
      sql: `
        DO $$ DECLARE
          r RECORD;
        BEGIN
          -- Drop all tables
          FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
            EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
          END LOOP;
          
          -- Drop all types
          FOR r IN (SELECT typname FROM pg_type WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public') AND typtype = 'e') LOOP
            EXECUTE 'DROP TYPE IF EXISTS public.' || quote_ident(r.typname) || ' CASCADE';
          END LOOP;
          
          -- Drop all sequences
          FOR r IN (SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'public') LOOP
            EXECUTE 'DROP SEQUENCE IF EXISTS public.' || quote_ident(r.sequence_name) || ' CASCADE';
          END LOOP;
        END $$;
      `
    })
    
    console.log('✅ Database reset successfully!')
    console.log('Now run: pnpm db:migrate to recreate the schema')
  } catch (error) {
    console.error('❌ Error resetting database:', error)
    process.exit(1)
  }
  
  process.exit(0)
}

resetDatabase()

