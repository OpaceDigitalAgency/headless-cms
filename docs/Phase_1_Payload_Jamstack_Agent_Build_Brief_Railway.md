
# Payload CMS + Jamstack Platform — Agent Build Brief (PoC, Railway-Ready)

> **Audience**: Agentic AI developer (Claude Code, Roo, Cursor, etc.)  
> **Goal**: Build a complete, working proof-of-concept in ONE PASS  
> **Outcome**: Localhost-ready + Railway one-click deployable system

This document is a **build contract**.  
Follow it literally. Do not infer or redesign.

---

## 1. Purpose

Build an **opinionated, open-source, WordPress-like CMS + Jamstack platform** using:

- Payload CMS v3
- PostgreSQL
- Static-first frontends
- Template-driven rendering
- Instant draft preview
- Deterministic structure suitable for AI agents and non-coders

The PoC must run **locally** and deploy **out-of-the-box to Railway** using a single account.

---

## 2. Core Non‑Negotiables

1. **Static public delivery**
   - All public routes = static HTML
   - No SSR for public users

2. **Editorial UX**
   - Draft preview = instant
   - Publish updates public pages without full rebuild (Next.js mode)

3. **Scalable architecture**
   - No per-collection rendering logic
   - Finite templates + field mapping only

4. **AI‑agent friendly**
   - Predictable file locations
   - No magic conventions
   - Safe to modify via language

5. **One‑provider deployment**
   - CMS, frontend, DB inside one Railway project

---

## 3. Fixed Technology Choices

These are NOT optional.

- CMS: Payload CMS v3
- Database: PostgreSQL ONLY
- ORM: Drizzle (via Payload adapter)
- Primary frontend: Next.js (App Router)
- Secondary frontend: Astro (SSG + local loader only)
- Styling: Tailwind CSS
- Repo: Monorepo (PNPM workspaces)
- Local orchestration: Docker Compose
- Hosting target: Railway

---

## 4. Repository Structure (MANDATORY)

```
repo-root/
├── apps/
│   ├── cms/                 # Payload CMS app
│   └── web/                 # Frontend app (Next.js or Astro)
├── packages/
│   ├── shared/              # Shared types, utilities
│   └── templates/           # Rendering templates
├── db/
│   └── migrations/
├── docker/
│   ├── docker-compose.yml
│   └── postgres/
├── railway/
│   ├── cms.toml
│   └── web.toml
├── scripts/
│   └── railway-provision.sh
├── .env.example
├── package.json
└── README.md
```

---

## 5. Local Development (MUST WORK)

### Startup
```
docker compose up
```

This must start:
- PostgreSQL
- Payload CMS
- Frontend app

### Local URLs
- CMS Admin: http://localhost:3000/admin
- Frontend: http://localhost:3001

---

## 6. Payload CMS Configuration

### Required
- PostgreSQL via `@payloadcms/db-postgres`
- Drizzle migrations enabled
- Users collection with auth
- Drafts + versions enabled
- Media collection enabled

### PoC Collections (MINIMUM)

1. **Pages**
   - title
   - slug
   - blocks/body
   - template (enum)
   - status (draft/published)

2. **Artifacts** (museum example)
   - title
   - description
   - media
   - relationships:
     - people (many)
     - places (many)
     - collections (hierarchical)
   - template

3. **People**
4. **Places**
5. **Collections** (hierarchical)

---

## 7. Template System (CRITICAL)

### Finite Templates
All content MUST render through one of:

- DetailTemplate
- ListTemplate
- LandingTemplate
- TimelineTemplate
- ArticleTemplate

Templates live in:
```
packages/templates/
```

### Field Mapping (REQUIRED)

Each collection defines a mapping object that maps its fields to template slots.

Example:
```
title        -> heading
description  -> body
media        -> gallery
relationships-> relatedItems
```

NO hard-coded per-collection rendering allowed.

---

## 8. Live Preview Architecture

### Rules
- Preview is draft-only
- Preview is authenticated
- Preview does NOT affect public output

### Implementation (Next.js)
- Route:
  `/preview/[collection]/[slug]`
- Uses Payload Local API (draft access)
- Uses templates + mapping
- Reusable for ALL collections

Preview ≠ Publish (strict separation).

---

## 9. Publishing Behaviour

### Next.js (PRIMARY)
- Public pages = SSG
- On publish:
  - Trigger on-demand revalidation
  - Use TAG-BASED revalidation
  - Only affected pages regenerate

### Astro (SECONDARY)
- Uses Payload Local Loader
- Publish triggers FULL rebuild
- Intended only for small / rarely-updated sites

---

## 10. Frontend Requirements (Next.js)

- App Router
- SSG only for public routes
- No client JS unless required
- SEO-complete HTML output
- Uses `packages/templates`
- Uses `packages/shared`

---

## 11. AI‑Agent Compatibility Rules

The agent MUST be able to:

- Add/edit collections
- Modify templates
- Update field mappings
- Insert bulk data
- Change styling
- Preview instantly
- Publish and see static output

Conventions:
- One collection = one file
- One template = one file
- No runtime filesystem magic
- No hidden logic

---

## 12. Railway Deployment (NEW – REQUIRED)

### Goal
User clicks **Deploy on Railway** and gets:
- CMS service
- Frontend service
- Managed PostgreSQL
All inside ONE Railway project/account.

---

### 12.1 Railway Template

The repo MUST be deployable as a **Railway multi-service template**.

Services:
1. `postgres` (Railway-managed)
2. `cms` (Node)
3. `web` (Node)

---

### 12.2 Railway Config as Code

Create:
```
railway/cms.toml
railway/web.toml
```

Each must define:
- root directory
- build command
- start command
- healthcheck

---

### 12.3 Environment Variables (CONTRACT)

At minimum:

**Shared**
- DATABASE_URL (from Railway Postgres)
- NODE_ENV=production

**CMS**
- PAYLOAD_SECRET
- PAYLOAD_PUBLIC_SERVER_URL

**Frontend**
- NEXT_PUBLIC_SITE_URL
- REVALIDATION_SECRET
- CMS_URL

All vars must be documented in `.env.example`.

---

### 12.4 Agent‑Driven Provisioning (OPTIONAL POWER MODE)

Provide:
```
scripts/railway-provision.sh
```

This script:
- Uses Railway CLI
- Requires `RAILWAY_API_TOKEN`
- Creates project + services
- Attaches Postgres
- Sets variables
- Triggers deploy

Script MUST be non-interactive.

---

## 13. Proof of Concept Acceptance Criteria

PoC is COMPLETE when:

- `docker compose up` works
- Admin UI loads
- Editor can:
  - create draft
  - preview instantly
  - publish
  - see static page updated
- Museum example works end-to-end
- Railway one-click deploy works
- Codebase is reusable and documented

---

## 14. Guiding Principle

> This is not a demo.  
> This is the first stable brick of a reusable CMS platform.

Do not over-engineer.
Do not simplify constraints.
Do not add features beyond this spec.

---

## Non-technical Commands (One-Command Workflows)

> Goal: a non-technical user can run **one command** to do common tasks without knowing Docker, PNPM, or Railway.
> All commands must use **fixed ports** to avoid conflicts:
>
> - CMS: `http://localhost:3000`
> - WEB: `http://localhost:3001`
> - Postgres: `localhost:5432`

### Required: Provide a `Makefile` (or `scripts/run.sh`) wrapper

Create a `Makefile` at repo root implementing the targets below.  
Each target must run non-interactively and be safe to run multiple times.

#### 1) Start everything locally (clean + predictable)
**Command:**
- `make up`

**Behaviour (must):**
- Start Postgres + CMS + Web using Docker Compose
- Use fixed ports (3000/3001/5432)
- Print the URLs at the end

#### 2) Stop everything locally
**Command:**
- `make down`

**Behaviour (must):**
- Stop and remove containers created by this project only

#### 3) Reset local environment (fresh database)
**Command:**
- `make reset`

**Behaviour (must):**
- Stop containers
- Remove the local Postgres volume for this project
- Restart everything
- Run migrations/seed automatically (if implemented)

#### 4) Run only CMS locally (for schema work)
**Command:**
- `make cms`

**Behaviour (must):**
- Start Postgres + CMS only on fixed ports
- Web should not start

#### 5) Run only Web locally (assumes CMS is running)
**Command:**
- `make web`

**Behaviour (must):**
- Start Web only, bound to port 3001
- Fail fast with a clear message if CMS isn’t reachable

#### 6) Railway deploy (template mode)
**Command:**
- `make railway`

**Behaviour (must):**
- Print “Deploy on Railway” instructions (template link + required env vars)
- Do not require any tokens

#### 7) Railway deploy (agent automation mode, fully automatic)
**Command:**
- `make railway-auto`

**Behaviour (must):**
- Require `RAILWAY_API_TOKEN` to be set
- Run `scripts/railway-provision.sh` end-to-end:
  - create project + services (postgres/cms/web)
  - set env vars
  - deploy services
- Must be non-interactive
- Must print the final service URLs

---

### Implementation Notes (Agent Must Follow)

- All fixed ports must be defined in:
  - `docker/docker-compose.yml`
  - `.env.example`
- Docker Compose service names must be stable:
  - `postgres`, `cms`, `web`
- The Makefile must only shell out to:
  - `docker compose ...`
  - optional `pnpm` commands inside containers if needed
  - `scripts/railway-provision.sh` for automation

### Example Makefile Targets (names only)

Required targets:
- `up`, `down`, `reset`, `logs`, `cms`, `web`, `railway`, `railway-auto`

Optional niceties:
- `status` (show container/service status)
- `open` (open localhost URLs in a browser where possible)

---


