#!/bin/bash
# Script to run large migrations by piping SQL directly to psql
# This bypasses the single-transaction limit and interactive prompts

set -e

# Find location of this script
cd "$(dirname "$0")/.."
echo "Current directory: $(pwd)"
echo "Listing apps/db/migrations directory content:"
ls -la apps/db/migrations || echo "Directory not found"

# Find the latest migration file (ignoring index.ts)
MIGRATION_FILE=$(ls -t apps/db/migrations/*.ts | grep -v "index.ts" | head -1)

if [ -z "$MIGRATION_FILE" ]; then
  echo "Error: No migration file found in apps/db/migrations/"
  ls -R apps/db
  exit 1
fi

echo "======================================================"
echo "  Running migration via psql (direct)"
echo "  File: $MIGRATION_FILE"
echo "======================================================"

# Extract SQL using robust line-number calculation

# Extract SQL using robust line-number calculation
# This is safer than regex which might fail on large files or special chars

echo "Calculating extraction range..."
UP_START=$(grep -n "export async function up" "$MIGRATION_FILE" | cut -d: -f1)
DOWN_START=$(grep -n "export async function down" "$MIGRATION_FILE" | cut -d: -f1)

if [ -z "$UP_START" ] || [ -z "$DOWN_START" ]; then
  echo "Error: Could not find up/down functions in migration file"
  exit 1
fi

# We want from the line after 'up' start, to a few lines before 'down' start
# 'up' starts at X. 'await db.execute' is at X+1.
# 'down' starts at Y. Closing brace '}' is at Y-2. Closing ');' is at Y-3.
START_LINE=$((UP_START + 1))
END_LINE=$((DOWN_START - 2))

echo "Extracting SQL from lines $START_LINE to $END_LINE..."

# Extract lines and clean up start/end markers
sed -n "${START_LINE},${END_LINE}p" "$MIGRATION_FILE" | \
  sed '1s/.*await db.execute(sql`//' | \
  sed '$s/`);.*//' | \
  sed '$s/}$//' > /tmp/migration_run.sql

# Verify extraction wasn't empty
if [ ! -s /tmp/migration_run.sql ]; then
  echo "Error: Extracted SQL file is empty!"
  exit 1
fi

echo "SQL extracted size: $(wc -l < /tmp/migration_run.sql) lines"

# Inspect first and last few lines to verify correctness
echo "--- SQL Start ---"
head -3 /tmp/migration_run.sql
echo "..."
echo "--- SQL End ---"
tail -3 /tmp/migration_run.sql

echo "Executing SQL..."

# Execute via docker psql
if docker exec -i headless-cms-postgres psql -U payload -d payload < /tmp/migration_run.sql; then
  echo ""
  echo "✅ SQL execution successful"
  
  # Mark migration as complete
  MIGRATION_NAME=$(basename "$MIGRATION_FILE" .ts)
  echo "Recording migration '$MIGRATION_NAME' in payload_migrations table..."
  
  docker exec headless-cms-postgres psql -U payload -d payload -c "
    CREATE TABLE IF NOT EXISTS payload_migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL,
      batch INTEGER NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW(),
      created_at TIMESTAMP DEFAULT NOW()
    );
    INSERT INTO payload_migrations (name, batch) VALUES ('$MIGRATION_NAME', 1)
    ON CONFLICT DO NOTHING;
  "
  
  echo "✅ Migration recorded successfully"
else
  echo "❌ SQL execution failed"
  # Show last few lines of log if possible
  rm -f /tmp/migration_run.sql
  exit 1
fi

rm -f /tmp/migration_run.sql
