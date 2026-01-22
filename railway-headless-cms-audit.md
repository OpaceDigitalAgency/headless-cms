
# Railway Deployment Audit – Headless CMS (Payload + Astro)

## Project Overview
- Platform: Railway
- Repo: OpaceDigitalAgency/headless-cms
- Architecture:
  - Service 1: headless-cms (Payload CMS, Next.js, Dockerfile)
  - Service 2: headless-cms-evzo (Astro frontend, Railpack)
  - Database: Postgres (Railway-managed)

---

## Current Status
- Postgres: ✅ Online, no tables yet
- headless-cms: ❌ Build failing
- headless-cms-evzo: ❌ Build failing
- Frontend (Astro) planned to be **disabled for next deploy**

---

## headless-cms (Payload CMS)

### Build
- Builder: Dockerfile
- Dockerfile path: `apps/cms/Dockerfile`
- Repo root: `.`
- Branch: `main`

### Environment Variables (Service)
- PAYLOAD_PUBLIC_SERVER_URL = https:// (❌ invalid)
- PAYLOAD_SECRET = empty (❌ required)
- REVALIDATION_SECRET = empty (❌ required)

### Database
- Postgres service connected
- DATABASE_URL available via Railway vars
- No tables yet (expected before first successful boot)

### Known Issues
- Payload requires PAYLOAD_SECRET at build/runtime
- Invalid public server URL causes config evaluation issues
- CMS has never successfully booted, so DB not initialised

---

## headless-cms-evzo (Astro)

### Build
- Builder: Railpack (default)
- No custom build command
- pnpm workspace build inferred

### Environment Variables
- PUBLIC_CMS_URL = https:// (❌ invalid)
- PUBLIC_SITE_URL = https://headless-cms-evzo-production-9c78.up.railway.app
- ENABLE_SITEMAP = true

### Known Issues
- Astro resolves PUBLIC_* vars at build time
- Invalid PUBLIC_CMS_URL causes:
  - new URL() failure
  - fetchCollection()
  - getStaticPaths()
- Build fails before deploy phase

### Decision
- Astro frontend will **not be deployed next**
- CMS to be stabilised first

---

## Postgres

### Status
- Image: ghcr.io/railwayapp-templates/postgres-ssl:17
- Deployment: Successful
- Private DNS: postgres.railway.internal
- Public TCP proxy enabled

### Variables (examples)
- DATABASE_URL (internal)
- DATABASE_PUBLIC_URL (proxy)
- POSTGRES_USER / PASSWORD / DB
- PGHOST / PGPORT

### Notes
- Empty DB is expected until CMS boots
- No issues found here

---

## Root Causes (Confirmed)
1. Invalid URLs in env vars (`https://` only)
2. Missing Payload secrets
3. Astro attempting CMS access during build
4. Mixed build strategies in monorepo (Docker + Railpack)

---

## Recommended Next Steps
1. Disable or remove Astro service
2. Fix CMS env vars:
   - Set PAYLOAD_SECRET
   - Set REVALIDATION_SECRET
   - Set valid PAYLOAD_PUBLIC_SERVER_URL
3. Redeploy **headless-cms only**
4. Confirm CMS boots and creates DB tables
5. Reintroduce Astro later with runtime fetch strategy

---

## Notes for Payload AI Agent
- CMS is monorepo-based
- Payload runs in Docker on Railway
- DB is internal Railway Postgres
- Frontend build-time fetching must be avoided
- Secrets MUST be present at build time

---

Generated: 2026-01-22
