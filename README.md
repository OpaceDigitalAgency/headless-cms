# Payload CMS v3 + Jamstack Platform

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/payload-jamstack?referralCode=payload)

A production-ready, headless CMS platform built with **Payload CMS v3**, **Next.js 15**, and **Astro 4**. Features static site generation (SSG), on-demand revalidation, live preview, and one-command deployment.

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Local Development](#local-development)
- [Project Structure](#project-structure)
- [Collections](#collections)
- [Templates](#templates)
- [Live Preview](#live-preview)
- [Static Generation](#static-generation)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Makefile Commands](#makefile-commands)
- [Plugins](#plugins)
- [Customization](#customization)

---

## Features

### Core Platform
- **Payload CMS v3.14** - Latest version with all features
- **PostgreSQL** with Drizzle ORM adapter
- **Lexical Rich Text Editor** - Modern block-based editing
- **TypeScript** throughout the entire codebase
- **PNPM Monorepo** - Efficient workspace management

### Frontend Options
- **Next.js 15** - React 19, App Router, Server Components
- **Astro 4** - Pure static HTML output via Payload Local Loader
- **Tailwind CSS** - Utility-first styling
- **Dark/Light Mode** - User preference with system detection

### Content Features
- **7 Templates** - Home, Landing, Detail, List, Article, Timeline, Archive
- **6 Block Types** - Hero, Content, Media, CTA, Archive, Form
- **Versions & Drafts** - Full revision history
- **Live Preview** - Real-time editing preview
- **SEO Plugin** - Meta tags, Open Graph, Twitter Cards

### Publishing
- **Pure SSG** - All public pages are static HTML
- **On-Demand Revalidation** - Targeted regeneration on publish
- **No Server Rendering** - For public traffic
- **Preview Mode** - SSR for draft content only

### Deployment
- **One-Click Railway Deploy** - Instant production setup
- **Docker Compose** - Local development environment
- **Makefile** - All commands in one place

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        MONOREPO                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   apps/cms   │  │   apps/web   │  │  apps/astro  │          │
│  │              │  │              │  │              │          │
│  │  Payload CMS │  │   Next.js    │  │    Astro     │          │
│  │  Admin Panel │  │   Frontend   │  │   Frontend   │          │
│  │  REST/GraphQL│  │   (SSG+ISR)  │  │  (Pure SSG)  │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                 │                   │
│         │    ┌────────────┴────────────┐    │                   │
│         │    │     packages/shared     │    │                   │
│         │    │     packages/templates  │    │                   │
│         │    └─────────────────────────┘    │                   │
│         │                                   │                   │
│  ┌──────┴───────────────────────────────────┴───────┐          │
│  │                   PostgreSQL                      │          │
│  └───────────────────────────────────────────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
Editor Publishes → Payload Hook → Revalidate API → Static Regeneration
                                        ↓
                              Only affected pages rebuilt
```

---

## Quick Start

### One-Click Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/payload-jamstack?referralCode=payload)

### Local Development (One Command)

```bash
# Clone the repository
git clone https://github.com/OpaceDigitalAgency/headless-cms.git
cd headless-cms

# Start everything with one command
make quickstart
```

This will:
1. Copy `.env.example` to `.env`
2. Start PostgreSQL via Docker
3. Install all dependencies
4. Run database migrations
5. Seed sample data with images
6. Start CMS on http://localhost:3000
7. Start frontend on http://localhost:3001

**Default Login:**
- Email: `admin@example.com`
- Password: `admin123`

---

## Local Development

### Prerequisites

- Node.js 20+
- PNPM 9+
- Docker & Docker Compose
- Git

### Manual Setup

```bash
# 1. Clone and enter directory
git clone https://github.com/OpaceDigitalAgency/headless-cms.git
cd headless-cms

# 2. Copy environment file
cp .env.example .env

# 3. Start PostgreSQL
docker compose up -d postgres

# 4. Install dependencies
pnpm install

# 5. Run migrations
pnpm --filter @repo/cms migrate

# 6. Seed the database
pnpm --filter @repo/cms seed

# 7. Start development servers
pnpm dev
```

### Access Points

| Service | URL | Description |
|---------|-----|-------------|
| CMS Admin | http://localhost:3000/admin | Payload admin panel |
| CMS API | http://localhost:3000/api | REST API endpoints |
| GraphQL | http://localhost:3000/api/graphql | GraphQL endpoint |
| GraphQL Playground | http://localhost:3000/api/graphql-playground | Interactive explorer |
| Next.js Frontend | http://localhost:3001 | SSG frontend |
| Astro Frontend | http://localhost:4321 | Pure SSG frontend |

---

## Project Structure

```
headless-cms/
├── apps/
│   ├── cms/                    # Payload CMS application
│   │   ├── src/
│   │   │   ├── collections/    # Collection definitions
│   │   │   ├── globals/        # Global configurations
│   │   │   ├── blocks/         # Reusable content blocks
│   │   │   ├── fields/         # Custom field definitions
│   │   │   ├── endpoints/      # Custom API endpoints
│   │   │   ├── seed/           # Database seeding
│   │   │   └── payload.config.ts
│   │   └── package.json
│   │
│   ├── web/                    # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/            # App Router pages
│   │   │   ├── components/     # React components
│   │   │   ├── lib/            # Utilities & API client
│   │   │   └── styles/         # Global styles
│   │   └── package.json
│   │
│   └── astro/                  # Astro frontend (pure SSG)
│       ├── src/
│       │   ├── pages/          # Static pages
│       │   ├── layouts/        # Page layouts
│       │   └── lib/            # Payload Local Loader
│       └── package.json
│
├── packages/
│   ├── shared/                 # Shared types & utilities
│   └── templates/              # Shared template components
│
├── docker-compose.yml          # Local development services
├── Makefile                    # All commands
├── pnpm-workspace.yaml         # Monorepo configuration
└── .env.example                # Environment template
```

---

## Collections

### Core Collections

| Collection | Slug | Description |
|------------|------|-------------|
| Users | `users` | Admin users with roles |
| Media | `media` | Images with auto-optimization |
| Pages | `pages` | CMS-managed pages with blocks |
| Posts | `posts` | Blog posts with categories |
| Categories | `categories` | Hierarchical categorization |

### Museum Example Collections

| Collection | Slug | Description |
|------------|------|-------------|
| Artifacts | `artifacts` | Museum artifacts with metadata |
| People | `people` | Historical figures & artists |
| Places | `places` | Geographic locations |
| Collections | `museum-collections` | Hierarchical artifact groupings |

### Globals

| Global | Slug | Description |
|--------|------|-------------|
| Header | `header` | Site navigation & branding |
| Footer | `footer` | Footer links & social |
| Settings | `settings` | Site-wide configuration |

---

## Templates

Templates define the layout and available fields for pages.

| Template | Use Case | Key Features |
|----------|----------|--------------|
| `home` | Homepage | Hero, featured content, CTAs |
| `landing` | Marketing pages | Full-width sections, forms |
| `detail` | Content pages | Rich text, sidebar |
| `list` | Archive pages | Filterable grid/list |
| `article` | Blog posts | Author, date, categories |
| `timeline` | Chronological | Date-based entries |
| `archive` | Collection browse | Pagination, filters |

---

## Live Preview

Live Preview enables real-time editing with instant visual feedback.

### How It Works

1. Editor opens a document in the admin panel
2. Clicks "Live Preview" button
3. Preview iframe loads the frontend with draft data
4. Changes appear instantly as the editor types

### Configuration

Live Preview is enabled for:
- Pages
- Posts
- Artifacts
- Header (global)
- Footer (global)

Preview URLs follow the pattern:
```
/preview/{collection}/{slug}
```

---

## Static Generation

### SSG Strategy

All public pages are **pre-rendered as static HTML** at build time:

```typescript
// All dynamic routes use generateStaticParams
export async function generateStaticParams() {
  const pages = await getPublishedPages()
  return pages.map((page) => ({ slug: page.slug }))
}

// No time-based revalidation
// export const revalidate = 60  ❌ NOT USED

// Unknown slugs return 404
export const dynamicParams = false
```

### On-Demand Revalidation

When content is published, Payload triggers targeted regeneration:

```typescript
// Payload afterChange hook
afterChange: [
  async ({ doc, req }) => {
    if (doc._status === 'published') {
      await fetch(`${FRONTEND_URL}/api/revalidate`, {
        method: 'POST',
        headers: { 'x-revalidate-secret': REVALIDATION_SECRET },
        body: JSON.stringify({
          collection: 'pages',
          slug: doc.slug,
        }),
      })
    }
  },
]
```

### Preview Mode

Draft content uses SSR via Next.js Draft Mode:

```typescript
// Preview route - SSR only
export const dynamic = 'force-dynamic'

export default async function PreviewPage({ params }) {
  const { isEnabled } = draftMode()
  if (!isEnabled) redirect('/')
  
  // Fetch draft content
  const doc = await getDocument(params.collection, params.slug, true)
  return <Renderer data={doc} />
}
```

---

## Deployment

### Railway (Recommended)

#### One-Click Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/payload-jamstack?referralCode=payload)

#### Manual Deploy

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login to Railway
railway login

# 3. Initialize project
railway init

# 4. Provision PostgreSQL
railway add --plugin postgresql

# 5. Set environment variables
railway variables set PAYLOAD_SECRET=$(openssl rand -base64 32)
railway variables set REVALIDATION_SECRET=$(openssl rand -base64 32)

# 6. Deploy
railway up
```

### Docker

```bash
# Build and run all services
docker compose up --build

# Or build images separately
docker compose build cms
docker compose build web
```

### Vercel / Netlify

The Next.js frontend can be deployed to Vercel or Netlify:

```bash
# Build for production
pnpm --filter @repo/web build

# Output in apps/web/.next
```

---

## Environment Variables

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `PAYLOAD_SECRET` | JWT signing secret | `openssl rand -base64 32` |
| `REVALIDATION_SECRET` | ISR revalidation secret | `openssl rand -base64 32` |

### URLs

| Variable | Description | Default |
|----------|-------------|---------|
| `PAYLOAD_PUBLIC_SERVER_URL` | CMS public URL | `http://localhost:3000` |
| `NEXT_PUBLIC_SITE_URL` | Frontend public URL | `http://localhost:3001` |
| `CMS_URL` | Internal CMS URL | `http://localhost:3000` |

### Optional

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | Email server hostname |
| `SMTP_PORT` | Email server port |
| `SMTP_USER` | Email username |
| `SMTP_PASS` | Email password |
| `S3_BUCKET` | S3 bucket for media |
| `S3_REGION` | S3 region |
| `S3_ACCESS_KEY_ID` | S3 access key |
| `S3_SECRET_ACCESS_KEY` | S3 secret key |

---

## Makefile Commands

```bash
# Development
make dev              # Start all dev servers
make dev-cms          # Start CMS only
make dev-web          # Start Next.js only
make dev-astro        # Start Astro only

# Database
make db-up            # Start PostgreSQL
make db-down          # Stop PostgreSQL
make db-migrate       # Run migrations
make db-seed          # Seed sample data
make db-reset         # Reset database

# Build
make build            # Build all apps
make build-cms        # Build CMS
make build-web        # Build Next.js
make build-astro      # Build Astro

# Docker
make docker-up        # Start all services
make docker-down      # Stop all services
make docker-build     # Build Docker images

# Deployment
make railway-provision  # Set up Railway project
make railway-deploy     # Deploy to Railway

# Utilities
make install          # Install dependencies
make clean            # Clean build artifacts
make typecheck        # Run TypeScript checks
make lint             # Run linting
make quickstart       # Full setup + start
```

---

## Plugins

### Included Plugins

| Plugin | Description |
|--------|-------------|
| `@payloadcms/plugin-seo` | SEO meta tags, Open Graph, Twitter Cards |
| `@payloadcms/plugin-form-builder` | Dynamic form creation |
| `@payloadcms/plugin-nested-docs` | Hierarchical collections |
| `@payloadcms/plugin-redirects` | URL redirect management |
| `@payloadcms/plugin-search` | Full-text search |
| `@payloadcms/storage-s3` | S3-compatible media storage |

### Enabling Localization

Uncomment in `payload.config.ts`:

```typescript
localization: {
  locales: [
    { label: 'English', code: 'en' },
    { label: 'Spanish', code: 'es' },
    { label: 'French', code: 'fr' },
  ],
  defaultLocale: 'en',
  fallback: true,
},
```

### Email Configuration

Set environment variables:

```bash
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-username
SMTP_PASS=your-password
EMAIL_FROM_NAME=Museum Collection
EMAIL_FROM_ADDRESS=noreply@example.com
```

---

## Customization

### Adding a New Collection

1. Create collection file in `apps/cms/src/collections/`:

```typescript
// apps/cms/src/collections/Events.ts
import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'date', type: 'date', required: true },
    { name: 'description', type: 'richText' },
  ],
}
```

2. Add to `payload.config.ts`:

```typescript
import { Events } from './collections/Events'

collections: [
  // ... existing collections
  Events,
],
```

### Adding a New Block

1. Create block file in `apps/cms/src/blocks/`:

```typescript
// apps/cms/src/blocks/Gallery.ts
import type { Block } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  fields: [
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'caption', type: 'text' },
      ],
    },
  ],
}
```

2. Add to Pages collection blocks array.

3. Create frontend component in `apps/web/src/components/blocks/`.

---

## Support

- **Documentation**: [Payload CMS Docs](https://payloadcms.com/docs)
- **GitHub Issues**: [Report bugs](https://github.com/OpaceDigitalAgency/headless-cms/issues)
- **Discord**: [Payload Community](https://discord.com/invite/payload)

---

## License

MIT License - see [LICENSE](LICENSE) for details.
