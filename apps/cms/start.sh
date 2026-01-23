#!/bin/sh
set -e

# Ensure we run the Next standalone server from the correct directory.
cd /app

# Run the server from the apps/cms directory where it is located in the standalone build
exec node apps/cms/server.js
