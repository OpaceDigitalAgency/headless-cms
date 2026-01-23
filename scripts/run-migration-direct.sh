#!/bin/bash
# Script to run large migrations by piping SQL directly to psql
# This bypasses the single-transaction limit and interactive prompts

set -e

# Find the latest migration file
MIGRATION_FILE=$(ls -t apps/db/migrations/*.ts | head -1)

if [ -z "$MIGRATION_FILE" ]; then
  echo "Error: No migration file found in apps/db/migrations/"
  exit 1
fi

echo "======================================================"
echo "  Running migration via psql (direct)"
echo "  File: $MIGRATION_FILE"
echo "======================================================"

cd "$(dirname "$0")/.."

# Extract SQL:
# 1. Start from line 4 (skip imports/func def)
# 2. Remove the opening `  await db.execute(sql`
# 3. Remove the closing `  `);` and everything after
# 4. Remove the closing `}` at the end
# 5. Pipe result to psql

echo "Extracting and executing SQL..."

# Use sed to extract the SQL content
# The pattern matches between sql` and `);
cat "$MIGRATION_FILE" | \
  sed -n '/await db.execute(sql`/,/`);/p' | \
  sed '1s/.*await db.execute(sql`//' | \
  sed '$s/`);.*//' > /tmp/migration_run.sql

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
  exit 1
fi
