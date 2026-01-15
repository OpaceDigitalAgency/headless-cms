# Payload CMS + Jamstack Platform

A modern, open-source headless CMS platform built with Payload CMS v3, Next.js 15, and PostgreSQL. Designed for static-first delivery with real-time preview capabilities.

## Features

- **Payload CMS v3** - Latest version with Lexical rich text editor
- **PostgreSQL** - Production-ready database with Drizzle ORM
- **Next.js 15** - React 19 with App Router and Server Components
- **Static-First** - ISR/SSG with on-demand revalidation
- **Live Preview** - Real-time content preview in the admin panel
- **Museum Example** - Complete PoC with Artifacts, People, Places, and Collections
- **Block-Based Pages** - Flexible page builder with reusable blocks
- **Docker Ready** - One-command local development setup
- **Railway Deploy** - Production deployment configuration included

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 8+
- Docker & Docker Compose (for local development)

### Installation

```bash
# Clone the repository
git clone https://github.com/OpaceDigitalAgency/headless-cms.git
cd headless-cms

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env

# Start with Docker (recommended)
make quickstart

# Or start manually
docker-compose up -d postgres
pnpm dev
```

### Access Points

- **CMS Admin**: http://localhost:3000/admin
- **Frontend**: http://localhost:3001
- **GraphQL Playground**: http://localhost:3000/api/graphql-playground

### Default Credentials

After running the seed script:
- **Email**: admin@example.com
- **Password**: admin123

## Project Structure

```
headless-cms/
├── apps/
│   ├── cms/                 # Payload CMS application
│   │   ├── src/
│   │   │   ├── collections/ # Content type definitions
│   │   │   ├── globals/     # Site-wide settings
│   │   │   ├── blocks/      # Reusable content blocks
│   │   │   ├── fields/      # Custom field definitions
│   │   │   └── seed/        # Database seeding
│   │   └── Dockerfile
│   └── web/                 # Next.js frontend
│       ├── src/
│       │   ├── app/         # App Router pages
│       │   ├── components/  # React components
│       │   ├── lib/         # API client & utilities
│       │   └── styles/      # Global styles
│       └── Dockerfile
├── packages/
│   ├── shared/              # Shared types & utilities
│   └── templates/           # Page templates
├── scripts/                 # Deployment & utility scripts
├── docker-compose.yml       # Local development setup
├── Makefile                 # One-command workflows
└── railway.toml             # Railway deployment config
```

## Collections

### Content Collections

| Collection | Description | Features |
|------------|-------------|----------|
| **Pages** | CMS-managed pages | Templates, Blocks, SEO, Versions |
| **Posts** | Blog posts | Categories, Tags, Author, Versions |
| **Categories** | Content organization | Hierarchical, Nested |

### Museum Collections (PoC)

| Collection | Description | Features |
|------------|-------------|----------|
| **Artifacts** | Museum objects | Media gallery, Dimensions, Provenance |
| **People** | Historical figures | Biography, Dates, Relationships |
| **Places** | Geographic locations | Coordinates, Historical names |
| **Collections** | Museum galleries | Hierarchical, Curator |

### System Collections

| Collection | Description |
|------------|-------------|
| **Users** | Authentication & roles |
| **Media** | File uploads with image processing |
| **Forms** | Dynamic form builder |
| **Form Submissions** | Form response storage |
| **Redirects** | URL redirect management |
| **Search** | Full-text search index |

## Templates

The platform includes 7 pre-built templates:

1. **Home** - Homepage with hero and featured sections
2. **Landing** - Marketing pages with hero and blocks
3. **Detail** - Single item display with sidebar
4. **List** - Grid/list view for collections
5. **Article** - Blog post layout with TOC
6. **Timeline** - Chronological event display
7. **Archive** - Paginated collection browser

## Blocks

Available content blocks for page building:

- **Hero** - Full-width header with image/video
- **Content** - Multi-column rich text
- **Media** - Image/video with caption
- **CTA** - Call-to-action section
- **Archive** - Dynamic content listing
- **Form** - Embedded form display

## API Endpoints

### REST API

```
GET  /api/pages              # List pages
GET  /api/pages/:id          # Get page by ID
GET  /api/artifacts          # List artifacts
GET  /api/artifacts/:id      # Get artifact by ID
POST /api/revalidate         # Trigger revalidation
```

### GraphQL

```graphql
query {
  Pages {
    docs {
      id
      title
      slug
      template
    }
  }
}
```

## Commands

```bash
# Development
make dev              # Start all services
make cms-dev          # Start CMS only
make web-dev          # Start frontend only

# Docker
make docker-up        # Start Docker services
make docker-down      # Stop Docker services
make docker-logs      # View logs

# Database
make db-seed          # Seed sample data
make db-migrate       # Run migrations
make db-reset         # Reset database

# Build
make build            # Build all packages
make build-cms        # Build CMS only
make build-web        # Build frontend only

# Deployment
make railway-provision  # Setup Railway
make railway-deploy     # Deploy to Railway
```

## Environment Variables

```env
# Database
DATABASE_URI=postgres://user:pass@localhost:5432/payload
POSTGRES_USER=payload
POSTGRES_PASSWORD=payload_secret
POSTGRES_DB=payload

# Payload
PAYLOAD_SECRET=your-secret-key
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Frontend
NEXT_PUBLIC_CMS_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3001
REVALIDATION_SECRET=revalidation-secret

# S3 Storage (optional)
S3_ENABLED=false
S3_BUCKET=your-bucket
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=your-key
S3_SECRET_ACCESS_KEY=your-secret
```

## Deployment

### Railway (Recommended)

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Provision: `make railway-provision`
4. Deploy: `make railway-deploy`

### Docker Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

1. Build: `pnpm build`
2. Start CMS: `cd apps/cms && pnpm start`
3. Start Web: `cd apps/web && pnpm start`

## Live Preview

The platform supports real-time preview:

1. Enable preview in collection config
2. Click "Preview" in admin panel
3. See changes instantly in frontend

Preview URL pattern: `/preview/[collection]/[slug]`

## Revalidation

On-demand revalidation is triggered automatically:

1. Content is published in CMS
2. CMS calls `/api/revalidate` endpoint
3. Frontend cache is invalidated by tag
4. Next request gets fresh content

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## License

MIT License - see LICENSE file for details.

## Support

- Documentation: [Payload CMS Docs](https://payloadcms.com/docs)
- Issues: GitHub Issues
- Community: [Payload Discord](https://discord.com/invite/payload)
