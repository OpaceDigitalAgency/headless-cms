#!/bin/sh
set -e

# Run migrations (idempotent) before starting the server.
# Disable with AUTO_MIGRATE=false.
if [ "${AUTO_MIGRATE:-true}" != "false" ]; then
  echo "Running Payload migrations..."
  export PAYLOAD_CONFIG_PATH="${PAYLOAD_CONFIG_PATH:-/app/apps/cms/src/payload.config.ts}"
  export PAYLOAD_MIGRATING="true"

  cd /app/apps/cms
  node --import /opt/tsx/node_modules/tsx/dist/esm/index.mjs --input-type=module -e "import { getPayload } from 'payload'; const configMod = await import(process.env.PAYLOAD_CONFIG_PATH); const config = configMod.default ?? configMod; const payload = await getPayload({ config, disableOnInit: true }); await payload.db.migrate(); await payload.destroy();"
fi

# Ensure we run the Next standalone server from the correct directory.
cd /app
exec node apps/cms/server.js
