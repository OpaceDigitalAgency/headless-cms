#!/bin/sh
set -e

# Ensure we run the Next standalone server from the correct directory.
cd /app

exec node server.js
