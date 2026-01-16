# Architecture Explained: Understanding Your CMS Setup

## Quick Answer: What Am I Using?

When you're working at `http://localhost:3000`, you're using **Next.js** (the CMS app), NOT Astro.

## The Three Apps in Your Monorepo

Your project has **three separate applications**, but you're currently only using **one** of them:

### 1. **apps/cms** - The CMS (Next.js) ✅ CURRENTLY ACTIVE
- **Port:** `http://localhost:3000`
- **What it is:** A Next.js application that contains:
  - Payload CMS admin interface at `/admin`
  - Built-in live preview frontend at `/blog/test`, `/page`, etc.
- **What you see:** When you view blog posts or pages at `localhost:3000`, you're viewing the CMS's built-in Next.js frontend
- **Purpose:** Content management + live preview

### 2. **apps/web** - Standalone Next.js Frontend ❌ NOT RUNNING
- **Port:** `http://localhost:3001` (when running)
- **What it is:** A separate Next.js frontend that fetches content from the CMS via API
- **Purpose:** Production frontend for complex, interactive sites
- **Status:** Not currently running, but available if needed

### 3. **apps/astro** - Astro Frontend ❌ NOT RUNNING
- **Port:** `http://localhost:4321` (when running)
- **What it is:** An Astro frontend that fetches content from the CMS using the Local API
- **Purpose:** Production frontend for high-performance static sites
- **Status:** Not currently running, but now configured and ready to use

## Why Three Apps?

This is a **dual-frontend strategy**:

1. **CMS (Next.js)** - For content editing and live preview
2. **Next.js Frontend** - For production sites that need SSR/ISR
3. **Astro Frontend** - For production sites that need maximum performance

You can choose which frontend to use for your production site, or use both for different projects.

## Current Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  You're Here: http://localhost:3000                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Payload CMS Admin (/admin)                          │   │
│  │  - Create/edit content                               │   │
│  │  - Manage users, media, etc.                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Live Preview Frontend (/, /blog/*, /page, etc.)     │   │
│  │  - See content as you edit                           │   │
│  │  - Built with Next.js                                │   │
│  │  - Uses RenderBlocks, PostRenderer, etc.             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Why Astro Wasn't Working

The Astro app needs to connect to the same PostgreSQL database as the CMS to use Payload's "Local API" (direct database access). It was missing the required environment variables:

- `DATABASE_URL` - Connection to PostgreSQL
- `PAYLOAD_SECRET` - Encryption key (must match CMS)
- `PAYLOAD_PUBLIC_SERVER_URL` - CMS URL

**Fixed:** Created `apps/astro/.env` with these variables.

## Running Different Frontends

### To run ONLY the CMS (current setup):
```bash
cd apps/cms
pnpm dev
```
Access at: `http://localhost:3000`

### To run ALL apps (CMS + both frontends):
```bash
make dev
```
This starts:
- CMS at `http://localhost:3000`
- Next.js frontend at `http://localhost:3001`
- Astro frontend at `http://localhost:4321`

### To run ONLY Astro:
```bash
cd apps/astro
pnpm dev
```
Access at: `http://localhost:4321`

## When to Use Each Frontend

### Use CMS Built-in Frontend (localhost:3000) for:
- ✅ Content editing and live preview
- ✅ Quick testing
- ✅ Development

### Use Next.js Frontend (localhost:3001) for:
- ✅ Production sites with dynamic features
- ✅ Sites that need ISR (Incremental Static Regeneration)
- ✅ Sites with user authentication
- ✅ Complex interactive applications

### Use Astro Frontend (localhost:4321) for:
- ✅ Maximum performance static sites
- ✅ Content-heavy sites (blogs, documentation)
- ✅ Marketing sites
- ✅ Sites that don't need client-side JavaScript

## Key Takeaway

**You are NOT using Astro right now.** You're using the CMS's built-in Next.js frontend for live preview. The Astro app is a separate option you can use if you want a high-performance static site for production.

