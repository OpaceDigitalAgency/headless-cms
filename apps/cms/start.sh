#!/bin/sh
set -e

# Database initialization for Railway deployments.
# For fresh installs, use FRESH_INSTALL=true to auto-create schema.
# For existing installs, use AUTO_MIGRATE=true to run migrations.

echo "======================================================"
echo "  Payload CMS - Railway Startup"
echo "======================================================"

cd /app/apps/cms

# Check if this is a fresh install (no payload_migrations table)
echo "Checking database state..."
if [ "${FRESH_INSTALL:-false}" = "true" ]; then
  echo "FRESH_INSTALL=true - Schema will be created via push mode on server start"
  # Push mode is enabled by default - Payload will create schema on init
else
  # Try to run migrations for existing installs
  if [ "${AUTO_MIGRATE:-true}" != "false" ]; then
    echo "Running Payload migrations..."
    
    # Check if we have the direct migration script (Fix for large migrations)
    if [ -f "/app/scripts/run-migration-direct.sh" ]; then
      echo "Using direct SQL execution mode (bypasses transaction limits)..."
      chmod +x /app/scripts/run-migration-direct.sh
      /app/scripts/run-migration-direct.sh
    else
      # Fallback to standard migration
      echo "Using standard Payload migration..."
      PAYLOAD_MIGRATING="true" \
      PAYLOAD_CONFIG_PATH="${PAYLOAD_CONFIG_PATH:-/app/apps/cms/src/payload.migrate.config.ts}" \
      node --import /opt/tsx/node_modules/tsx/dist/esm/index.mjs --input-type=module -e "
        import { getPayload } from 'payload';
        const configMod = await import(process.env.PAYLOAD_CONFIG_PATH);
        const config = configMod.default ?? configMod;
        const payload = await getPayload({ config, disableOnInit: true });
        await payload.db.migrate();
        await payload.destroy();
      "
    fi
  fi
fi

echo "Starting Next.js server..."
cd /app
exec node apps/cms/server.js
