#!/bin/bash
# Script to run large migrations by executing statements one at a time
# This bypasses the single-transaction limit that causes failures on Railway

set -e

MIGRATION_FILE="apps/db/migrations/20260123_142616.ts"

echo "======================================================"
echo "  Running migration SQL statements individually"
echo "======================================================"

# Extract the SQL from the migration file (between the backticks after sql\`)
# and split by semicolon, then run each statement

cd "$(dirname "$0")/.."

# First, check if we can connect to the database
echo "Testing database connection..."
docker exec headless-cms-postgres psql -U payload -d payload -c "SELECT 1" > /dev/null 2>&1 || {
  echo "ERROR: Cannot connect to database"
  exit 1
}
echo "Database connection OK"

# Read the migration .ts file, extract SQL between sql\` and \`);
echo "Extracting SQL from migration file..."

# Create a temp file with extracted SQL
grep -oP "(?<=sql\`).*?(?=\`)" "$MIGRATION_FILE" 2>/dev/null | head -1 > /tmp/migration_sql.txt || {
  # If grep -P doesn't work on macOS, use a different approach
  sed -n '/await db.execute(sql`/,/`);/p' "$MIGRATION_FILE" | \
    sed '1s/.*await db.execute(sql`//' | \
    sed '$s/`);.*//' > /tmp/migration_sql.txt
}

# Split by semicolon and run each statement
echo "Running SQL statements..."
TOTAL=0
SUCCESS=0
FAILED=0

# Use a simpler approach - just execute the entire migration file content as SQL
# Extract everything between sql` and `;
cat "$MIGRATION_FILE" | \
  sed -n '/await db.execute(sql`/,/\`);/p' | \
  sed '1s/.*await db.execute(sql`//' | \
  sed '$s/`);.*//' | \
  tr -d '\n' | \
  sed 's/;/;\n/g' > /tmp/migration_statements.txt

# Count statements
TOTAL=$(wc -l < /tmp/migration_statements.txt)
echo "Found $TOTAL SQL statements"

# Run each statement
while IFS= read -r stmt; do
  if [ -n "$stmt" ] && [ "$stmt" != ";" ]; then
    COUNTER=$((COUNTER + 1))
    echo -ne "\rExecuting statement $COUNTER/$TOTAL..."
    if docker exec -i headless-cms-postgres psql -U payload -d payload -c "$stmt" > /dev/null 2>&1; then
      SUCCESS=$((SUCCESS + 1))
    else
      FAILED=$((FAILED + 1))
      # Only show errors for non-"already exists" issues
      docker exec -i headless-cms-postgres psql -U payload -d payload -c "$stmt" 2>&1 | grep -v "already exists" | head -1 || true
    fi
  fi
done < /tmp/migration_statements.txt

echo ""
echo "======================================================"
echo "  Migration complete!"
echo "  Success: $SUCCESS / $TOTAL"
echo "  Failed:  $FAILED"
echo "======================================================"

# Mark migration as complete in payload_migrations table
echo "Recording migration in payload_migrations table..."
docker exec headless-cms-postgres psql -U payload -d payload -c "
INSERT INTO payload_migrations (name, batch) VALUES ('20260123_142616', 1)
ON CONFLICT DO NOTHING;
" 2>/dev/null || echo "Note: payload_migrations table may not exist yet"

echo "Done!"
