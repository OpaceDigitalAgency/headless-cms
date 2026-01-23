#!/bin/sh
set -e

# Run migrations (idempotent) before starting the server.
# Disable with AUTO_MIGRATE=false.
if [ "${AUTO_MIGRATE:-true}" != "false" ]; then
  echo "Running Payload migrations..."
  cd /app/apps/cms
  node --import /opt/tsx/node_modules/tsx/dist/esm/index.mjs ./node_modules/payload/bin.js migrate
fi

# Ensure we run the Next standalone server from the correct directory.
cd /app
exec node apps/cms/server.js
