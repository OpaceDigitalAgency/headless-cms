# Railway Deployment Investigation (Next.js + Payload + Postgres)

This document summarises the full Railway deployment debugging journey for this repo, from the initial problem report to the current state.

## Why I asked for help (original problem)

Local development worked with no issues, but Railway deployments repeatedly failed or deployed without creating any database tables.

Key symptoms:
- Frontend/CMS UI could appear, but **no Postgres tables were created**.
- Many deploy attempts over ~2 days, with different Railway configurations (Nixpacks, Dockerfile, etc).
- Build/runtime logs kept changing depending on how Railway detected the project.

## The repo layout (important context)

This is a monorepo containing multiple apps:
- `apps/cms` = **Next.js + Payload CMS** (this is what we deploy to Railway)
- `apps/astro` = Astro site (not intended to be deployed as a Railway service right now)
- `apps/db/migrations` = generated Payload/Drizzle migration files used by the CMS

Because this is a monorepo:
- `pnpm build` at the repo root runs `pnpm -r build` and will build **everything**, including `apps/astro`.
- A Railway service that runs root scripts (like `pnpm build`) will try to build Astro too.

## What Railway was doing (and why it was confusing)

### 1) Nixpacks build failure (early logs)

Railway built using Nixpacks and failed during `next build` because required env vars were missing at build time:
- `PAYLOAD_SECRET`
- `PAYLOAD_PUBLIC_SERVER_URL`

This explained why some builds failed, but it didn’t fully explain “CMS is running but no tables”.

### 2) “Postgres build logs” were actually a Node service (misconfigured)

At one point, “Postgres” logs showed:
- Node/Railpack installing pnpm
- Running `pnpm run build`
- Building `apps/astro` and failing in `astro build` with a `fetch failed` error

That behaviour is **not** how a real Railway Postgres database service behaves.

Conclusion:
- There was an extra Node/Railpack service in the Railway project (likely misnamed), pointing at the repo root.
- It was building the whole monorepo and failing on Astro.

Fix on Railway:
- Remove/disable the extra Node service.
- Keep only:
  - `headless-cms` (the app service)
  - Railway Postgres (the blue elephant database service)

### 3) Variable wiring

We confirmed the correct pattern for the CMS service:
- `DATABASE_URL` should be set to `${{Postgres.DATABASE_URL}}` (internal connection string).

## Strategy we moved to (goal: reliable + repeatable)

The main goal became:
- **A single, reliable Git-based deploy** that:
  - builds without needing Railway-only manual steps
  - automatically runs migrations on start (so tables appear)
  - is repeatable for future instances

We chose a “run migrations on container startup” approach because:
- On Railway, the database is guaranteed to exist at runtime, but not necessarily at build time.

## Code changes made (high level)

### A) Prefer Dockerfile (not Nixpacks)

We removed Nixpacks config files that were steering Railway into inconsistent behaviour:
- `railway.toml` (previously forced Nixpacks plan)
- `nixpacks.toml`

### B) Add auto-migrate before the Next server starts

We updated the CMS Docker setup to:
- build Next.js in `standalone` mode
- run migrations on startup (before `node apps/cms/server.js`)

Key files:
- `headless-cms/apps/cms/Dockerfile`
- `headless-cms/apps/cms/start.sh`

This startup approach is intended to be:
- idempotent (safe to run every start)
- disableable via `AUTO_MIGRATE=false`

### C) Reduce environment “chicken-and-egg” during first deploy

We adjusted env validation so the app doesn’t hard-fail before it can even come online.

Key idea:
- `PAYLOAD_PUBLIC_SERVER_URL` should not be required just to boot/run migrations (Railway domain can be provisioned later).

### D) Use a minimal migration-only Payload config

We hit a crash during migrations:
- `ERR_MODULE_NOT_FOUND: Cannot find package '@payloadcms/richtext-lexical' imported from payload.config.ts`

Cause:
- The Next.js standalone runtime image did not include every optional Payload plugin/editor dependency.
- Migrations importing the full CMS config caused runtime module resolution to fail.

Fix implemented:
- Added `headless-cms/apps/cms/src/payload.migrate.config.ts` (minimal config)
- Updated `headless-cms/apps/cms/start.sh` to use that minimal config for migrations.

### E) Migration file compatibility adjustment

We later hit a different error while running migrations:
- `Cannot find module '@payloadcms/db-postgres'` (CJS require-style)

We changed the generated migration file to avoid a top-level import that could be transformed into CJS require by the loader:
- `headless-cms/apps/db/migrations/20260122_095124.ts` now imports `@payloadcms/db-postgres` dynamically inside `up()`/`down()`.

That change was meant to make the migration file loader-friendly in the container environment.

## Where we are now (current blocker)

Railway is currently crashing during migrations with:

> `Cannot find package '@payloadcms/db-postgres' imported from /app/apps/db/migrations/20260122_095124.ts`  
> `code: ERR_MODULE_NOT_FOUND`

Important detail:
- This is **no longer** “CJS vs ESM import style” — it is a straight “package not found”.

What this likely means (most probable explanation):
- In the **Next.js standalone** runtime image, the resulting `/app/node_modules` does **not** include `@payloadcms/db-postgres`.
- The migration runner (`tsx` in `/opt/tsx`) can load TypeScript, but it cannot import a package that isn’t present in the final container filesystem.

Net effect:
- Migrations start, but fail before creating tables.
- Therefore Postgres remains empty (no Payload tables).

## Notes about the local `pnpm build` failure (Astro)

The local failure you pasted:
- is coming from `pnpm build` at repo root, which runs `pnpm -r build`
- and it fails in `apps/astro build` because it tries to fetch data during static generation

This is real, but it is separate from the CMS Docker deploy:
- The CMS Dockerfile builds only `@repo/cms`.
- Astro is only relevant if a Railway service is mistakenly building the monorepo root.

## What’s been proven so far

- Railway service structure is now sane (one app + real Postgres DB).
- `DATABASE_URL` wiring is correct.
- The system reaches “Running Payload migrations…” consistently.
- The remaining failures are now **runtime dependency packaging** problems (standalone image missing required server packages for migrations).

## What to do next (next task)

The next task should focus on **ensuring `@payloadcms/db-postgres` exists in the runtime image** when migrations run.

Likely solutions to evaluate:
1) Adjust the Dockerfile so the production image includes required packages for migrations (at least `@payloadcms/db-postgres`, and whatever it depends on).
2) Adjust Next standalone tracing config so those packages are included in `.next/standalone/node_modules`.
3) As a fallback, stop using standalone for the CMS runtime image and ship a fuller `node_modules` (bigger image, but simpler and more reliable).

## Useful evidence to capture for the next task

If the crash persists, the fastest proof is whether the package exists in the container:
- From Railway “Shell” (or logs if available), check:
  - does `/app/node_modules/@payloadcms/db-postgres` exist?
  - does `/app/apps/cms/node_modules/@payloadcms/db-postgres` exist?

That single check will confirm whether we need to change Docker packaging vs something else.

## Fix Applied (2026-01-23)

**Problem**: Migration files import `@payloadcms/db-postgres` but this package is not included in the Next.js standalone runtime image.

**Root Cause**: Next.js standalone build only traces dependencies that are imported by the Next.js application code. Migration files are copied separately and their dependencies are not traced.

**Solution**: Install migration dependencies directly in the production Docker image:
- Added `npm install` step in production stage to install:
  - `@payloadcms/db-postgres@3.71.1`
  - `payload@3.71.1`
  - `drizzle-orm@0.44.7`
  - `pg@8.16.3`

These packages are now available at runtime when migrations execute, allowing the migration files to successfully import and use `@payloadcms/db-postgres`.

**Files Changed**:
- `headless-cms/apps/cms/Dockerfile` - Added migration dependency installation in production stage

## Critical Fix #2: Migration Directory Path Mismatch (2026-01-23 13:15 GMT)

**Problem**: Even after installing migration dependencies, Railway was still trying to run the OLD migration file (`20260122_095124`) that had been deleted.

**Root Cause**: The `payload.config.ts` was configured to look for migrations in `apps/cms/migrations` (via `../migrations` relative path), but the actual migrations were in `apps/db/migrations`. This caused:
- Payload to not find the new migration file
- Railway to potentially cache or reference old migration locations
- Local `make db-fresh` to fail because it was cleaning the wrong directory

**Solution**: Updated the migration directory configuration to be consistent:
- Changed `payload.config.ts` migrationDir from `../migrations` to `../../db/migrations`
- Updated `Makefile` db-fresh target to clean `apps/db/migrations` instead of `apps/cms/migrations`
- Both main config and migrate config now point to the same location: `apps/db/migrations`

**Files Changed**:
- `headless-cms/apps/cms/src/payload.config.ts` - Fixed migrationDir path
- `headless-cms/Makefile` - Fixed db-fresh to clean correct directory

