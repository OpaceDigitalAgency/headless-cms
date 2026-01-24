# Database Reset Notes and Command Reference

This document records why `db-fresh` became unreliable, why `db-fresh-migrations` works, and how to use the Makefile commands safely in local and production environments.

## Findings and Decisions

### Why `db-fresh` was unusable

`make db-fresh` used Drizzle "push" mode (schema sync) and expected you to answer prompts when the schema didn't line up with the DB. If your schema has lots of renamed tables/columns (or Drizzle can't infer a rename), it treats them as drop/create and prompts for each change. That is why you saw thousands of rename questions and could not proceed.

Push mode is controlled by `push:` in `apps/cms/src/payload.config.ts`, which is enabled when `DRIZZLE_PUSH=true` or `FRESH_INSTALL=true`. When push mode runs against a DB that has drifted or a schema with many changes, it is intentionally cautious and becomes highly interactive.

### Why `db-fresh-migrations` works

`make db-fresh-migrations` avoids that interactive push step. It:

- wipes the DB volume,
- deletes old migration files,
- generates fresh migrations from the current schema,
- applies them in standard migration mode.

So it rebuilds the DB from scratch without interactive rename prompts. That is why it works reliably in both local and production setups.

### In short

`db-fresh` = push mode, interactive, good for small dev changes but painful when schema drift is big.  
`db-fresh-migrations` = regenerate + apply migrations, non-interactive, best for a full reset and clean slate.

### Decision applied

To keep local and production deploys reliable, `make db-fresh` now calls `make db-fresh-migrations` and no longer uses push mode. The `dev-fresh` helper no longer enables push mode either. This keeps resets non-interactive and consistent with the migration workflow.

## Makefile Commands (Grouped)

### Database Reset and Cleanup

- `make db-fresh`  
  Fresh database reset using migrations (non-interactive). This is now the safe default and runs the same flow as `db-fresh-migrations`.

- `make db-fresh-migrations`  
  Fresh database with regenerated migrations (destructive). It stops dev servers, wipes the DB volume, clears old migrations, generates new migrations from the current schema, and applies them. Use this for a clean slate that matches the current schema.

- `make db-reset`  
  Drop all tables and re-run migrations. This is destructive but keeps existing migration history instead of regenerating it.

- `make clean-docker`  
  Remove Docker volumes and prune Docker resources. This is a broad cleanup and will delete DB volumes.

### Database Startup and Schema Management

- `make db-up`  
  Start PostgreSQL only via Docker. Use this when you want the DB running without the rest of the stack.

- `make db-down`  
  Stop PostgreSQL only. Useful for freeing the port or resetting the container.

- `make db-migrate`  
  Run the existing migration set against the database. This is the standard, non-interactive schema update path.

- `make db-studio`  
  Open Drizzle Studio for database inspection and management.

### Seeding (Sample Data)

- `make db-seed`  
  Seed the database with the default sample data set.

- `make seed-blog`  
  Seed blog-specific sample data (preset-focused).

- `make seed-archive`  
  Seed archive-specific sample data (preset-focused).

- `make seed-ecommerce`  
  Seed ecommerce-specific sample data (preset-focused).

- `make seed-with-media`  
  Seed sample data and download sample media assets.

### Development Startup

- `make dev`  
  Start PostgreSQL with Docker and then run all dev servers (`pnpm dev`).

- `make dev-cms`  
  Start only the CMS dev server.

- `make dev-astro`  
  Start only the Astro dev server.

- `make dev-fresh`  
  Start the CMS dev server after a fresh reset. Does not enable push mode.

### Build and Production

- `make build`  
  Build all packages for production.

- `make build-cms`  
  Build only the CMS.

- `make build-astro`  
  Build only the Astro frontend.

- `make start`  
  Start all services in production mode.

- `make stop`  
  Stop all running Docker services.

### Docker Utilities

- `make docker-up`  
  Start all services with Docker Compose (DB + CMS).

- `make docker-down`  
  Stop all Docker services.

- `make docker-build`  
  Build Docker images.

- `make docker-clean`  
  Remove Docker containers, volumes, and images (destructive).

- `make docker-logs`  
  Tail logs for all Docker services.

- `make docker-logs-cms`  
  Tail logs for the CMS container only.

### Project Scaffolding

- `make create`  
  Run the interactive project scaffold script.

- `make blog`  
  Create a blog project (prompts for a name).

- `make brochure`  
  Create a brochure site (prompts for a name).

- `make archive`  
  Create an archive site (prompts for a name).

- `make ecommerce`  
  Create an ecommerce site (prompts for a name).

### Code Quality and Testing

- `make lint`  
  Run ESLint across packages.

- `make lint-fix`  
  Run ESLint with auto-fix.

- `make typecheck`  
  Run TypeScript type checks.

- `make format`  
  Format code with Prettier.

- `make test`  
  Run all tests.

### Railway Deployment

- `make railway-provision`  
  Provision Railway services using the script.

- `make railway-deploy`  
  Deploy to Railway.

- `make railway-logs`  
  View Railway logs.

- `make railway-status`  
  Check Railway deployment status.

### Utilities

- `make help`  
  Show available Makefile commands with descriptions.

- `make install`  
  Install all dependencies.

- `make clean`  
  Remove build artifacts and node_modules.

- `make env-setup`  
  Create root `.env` from `.env.example` and symlink `apps/cms/.env`.

- `make generate-secret`  
  Generate a random secret key.

- `make generate-types`  
  Generate TypeScript types from Payload.

- `make generate-graphql`  
  Generate the GraphQL schema.

- `make check-deps`  
  Check for outdated dependencies.

- `make update-deps`  
  Update all dependencies.

- `make setup`  
  Run `env-setup` and `install` for new developer onboarding.

- `make quickstart`  
  One-command quickstart: setup, start DB, run migrations, seed, and launch dev.
