#!/bin/sh
set -e

# Run migrations (idempotent) before starting the server.
# Disable with AUTO_MIGRATE=false.
if [ "${AUTO_MIGRATE:-true}" != "false" ]; then
  echo "Running Payload migrations..."
  export PAYLOAD_CONFIG_PATH="${PAYLOAD_CONFIG_PATH:-/app/apps/cms/src/payload.config.ts}"
  export PAYLOAD_MIGRATING="true"

  cd /app
  node --import /opt/tsx/node_modules/tsx/dist/esm/index.mjs /app/node_modules/payload/dist/bin/index.js migrate
fi

# Ensure we run the Next standalone server from the correct directory.
cd /app
exec node apps/cms/server.js
