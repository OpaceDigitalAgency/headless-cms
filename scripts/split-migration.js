/**
 * Split the massive migration file into smaller chunks
 * This prevents Railway/PostgreSQL from choking on the huge SQL statement
 */

const fs = require('fs');
const path = require('path');

const migrationFile = path.join(__dirname, '../apps/db/migrations/20260123_131944.ts');
const migrationContent = fs.readFileSync(migrationFile, 'utf-8');

// Extract the SQL content between the backticks
const sqlMatch = migrationContent.match(/await db\.execute\(sql`([\s\S]*?)`\)/);
if (!sqlMatch) {
  console.error('Could not find SQL content in migration file');
  process.exit(1);
}

const sqlContent = sqlMatch[1];

// Split by CREATE statements
const statements = sqlContent
  .split(/(?=CREATE TYPE|CREATE TABLE|CREATE INDEX|ALTER TABLE|CREATE UNIQUE INDEX)/g)
  .map(s => s.trim())
  .filter(s => s.length > 0);

console.log(`Found ${statements.length} SQL statements`);

// Group statements into chunks of 50
const CHUNK_SIZE = 50;
const chunks = [];
for (let i = 0; i < statements.length; i += CHUNK_SIZE) {
  chunks.push(statements.slice(i, i + CHUNK_SIZE));
}

console.log(`Split into ${chunks.length} chunks`);

// Create new migration files
const timestamp = '20260123_131944';
const migrationsDir = path.join(__dirname, '../apps/db/migrations');

// Delete the old migration file
fs.unlinkSync(migrationFile);
fs.unlinkSync(migrationFile.replace('.ts', '.json'));
console.log('Deleted old migration file');

// Create new chunked migration files
chunks.forEach((chunk, index) => {
  const chunkTimestamp = `${timestamp}_part${index + 1}`;
  const chunkFile = path.join(migrationsDir, `${chunkTimestamp}.ts`);
  const chunkJsonFile = path.join(migrationsDir, `${chunkTimestamp}.json`);
  
  const chunkContent = `import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql\`
  ${chunk.join('\n  ')}
  \`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Down migration not implemented
}
`;

  fs.writeFileSync(chunkFile, chunkContent);
  fs.writeFileSync(chunkJsonFile, JSON.stringify({ name: chunkTimestamp }, null, 2));
  
  console.log(`Created ${chunkTimestamp}.ts (${chunk.length} statements)`);
});

// Update index.ts
const indexFile = path.join(migrationsDir, 'index.ts');
const imports = chunks.map((_, i) => {
  const chunkTimestamp = `${timestamp}_part${i + 1}`;
  return `import * as migration_${timestamp}_part${i + 1} from './${chunkTimestamp}'`;
}).join('\n');

const exports = chunks.map((_, i) => {
  return `  migration_${timestamp}_part${i + 1},`;
}).join('\n');

const indexContent = `${imports}

export default [
${exports}
]
`;

fs.writeFileSync(indexFile, indexContent);
console.log('Updated index.ts');

console.log('\n✅ Migration split complete!');
console.log(`Created ${chunks.length} migration files with ~${CHUNK_SIZE} statements each`);

