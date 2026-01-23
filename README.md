# Payload CMS + Jamstack Platform

**A super-powered, WordPress-like CMS with a decoupled Jamstack frontend.**

This platform provides a powerful, flexible, and developer-friendly CMS experience with a modern, fast, and scalable frontend. It combines the best of a traditional CMS with the performance and security of the Jamstack.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/payload-jamstack?referralCode=payload)

> **⚠️ Note**: The one-click deploy button requires the Railway template to be published first. See [RAILWAY_TEMPLATE_SETUP.md](RAILWAY_TEMPLATE_SETUP.md) for instructions on creating and publishing the template. For manual deployment, see [DEPLOY_TO_RAILWAY.md](DEPLOY_TO_RAILWAY.md).

---

## Table of Contents

- [The Vision](#the-vision)
- [Why This Isn’t Just Payload](#why-this-isnt-just-payload)
- [Quick Start](#quick-start)
- [Core Features](#core-features)
- [Dynamic Content Types](#dynamic-content-types)
- [Admin UI Features](#admin-ui-features)
- [Project Structure](#project-structure)
- [Built-in Content Types](#built-in-content-types)
- [Content Blocks](#content-blocks)
- [Frontend Selection](#frontend-selection)
- [Makefile Commands](#makefile-commands)
- [Deployment](#deployment)

---

## The Vision

This platform is designed to be a **super powerful but simple CMS**, inspired by the best parts of WordPress but with a modern, headless architecture.

### Core Principles

1. **Shared Foundation**: Every site starts with essential features like Pages, Categories, Tags, Media, and Globals.

2. **Dynamic Content Types**: Create custom content types like "Classic Cars", "Recipes", or "Products" directly from the admin UI - no server restart required.

3. **Block-Based Editing**: All content types support flexible block-based layouts with 9+ pre-built blocks.

4. **Intuitive UX**: The admin panel is designed for content editors, not just developers.

---

## Why This Isn’t Just Payload

This repo is a productised platform on top of Payload CMS, not a vanilla clone:

- **Dynamic Content Types**: WordPress-style custom post types you can create from the dashboard (Content Type Manager) with no code or restarts; items live in `custom-items` with shared blocks and media.
- **Dual Frontends Included**: Next.js (ISR-ready, on-demand revalidation) and Astro (pure SSG) ship together, wired to the same CMS contracts and template system.
- **Template + Block System**: Finite, shared templates and 9+ reusable blocks across CMS/Next/Astro for consistent rendering without per-collection view code.
- **Presets & Starters**: Prebuilt starters (blog, brochure, archive, ecommerce) plus Makefile and `scripts/create.sh` workflows to scaffold quickly.
- **Enhanced Admin UX**: Two-panel nav, custom dashboard (stats, drafts, quick create, seed + collection templates + content types tabs), theme toggle, tools view.
- **Operational Extras**: Railway-ready multi-service deploy, Makefile one-command workflows, seed/reset endpoints, search/SEO/redirects/nested docs/form-builder plugins enabled, optional S3 storage.

---

## Quick Start

### One-Click Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/payload-jamstack?referralCode=payload)

> **Note**: Template must be published first. See [RAILWAY_TEMPLATE_SETUP.md](RAILWAY_TEMPLATE_SETUP.md) for setup instructions.

### Local Development

```bash
# Clone the repository
git clone https://github.com/OpaceDigitalAgency/headless-cms.git
cd headless-cms

# Start everything with one command
make quickstart
```

This will:
1. ✅ Create `.env` files from examples
2. ✅ Install all dependencies
3. ✅ Start PostgreSQL via Docker
4. ✅ Run database migrations
5. ✅ Seed sample data
6. ✅ Start CMS on http://localhost:3000

**Then create your first admin user:**
1. Open http://localhost:3000/admin/create-first-user
2. Fill in your credentials
3. Start using the CMS!

**See [QUICK_START.md](QUICK_START.md) for detailed setup instructions.**

### Astro Frontend (SSG via REST API)

The Astro app now fetches content from the CMS REST API (no direct DB access).
This keeps builds portable and avoids DB driver issues in build environments.

Required env vars for Astro builds:
- `PUBLIC_CMS_URL` (e.g. `http://localhost:3000`)
- `PUBLIC_SITE_URL` (e.g. `http://localhost:4321`)

If you want sitemap generation, set `ENABLE_SITEMAP=true` before building.

---

## Core Features

| Feature | Description |
|---------|-------------|
| **Dynamic Content Types** | Create custom content types from the admin UI without server restarts |
| **Block-Based Page Builder** | 20+ pre-built blocks for flexible layouts |
| **Dual Frontend Support** | Next.js 15 and Astro 4 frontends included |
| **Version History** | Full version control with restore capability on all collections |
| **Live Preview** | Real-time editing preview |
| **On-Demand Revalidation** | Fast, static pages with instant updates |
| **One-Click Deploy** | Deploy to Railway instantly |
| **S3 Storage** | Local or S3-compatible file storage |

---

## Dynamic Content Types

The key feature that makes this CMS WordPress-like is the **Dynamic Content Types** system.

### How It Works

1. **Go to Dashboard** → Click the **🗂️ Content Types** tab
2. **Create a new type** (e.g., "Classic Cars", "Recipes", "Products")
3. **Choose a base template** (Archive Item, Product, Person, Place, Event, Article)
4. **Add custom fields** specific to your content type
5. **Start creating content** - no server restart needed!

### Example: Creating a "Classic Cars" Collection

1. Navigate to **Dashboard → 🗂️ Content Types**
2. Click **+ New**
3. Enter "Classic Cars" as the name
4. Select "Archive Item" as the template
5. Click **Create**
6. Your new content type is ready to use immediately!

All items are stored in the `custom-items` collection with a `contentType` field, similar to how WordPress stores all post types in `wp_posts`.

---

## Admin UI Features

The admin UI has been completely redesigned for a modern, intuitive experience:

### Two-Panel Navigation
- Collapsible sidebar with icons
- Top bar with quick access to all sections
- Smooth transitions between states

### Global Search
- Search content, settings, and navigation items
- Keyboard shortcuts (Enter to navigate, Escape to close)

### Theme Toggle
- Light and dark mode support
- Persists across sessions

### Custom Dashboard
- Collection stats at a glance
- Recent updates list
- Drafts needing review
- Quick create buttons
- Site configuration shortcuts

### Tools Page
- Publishing calendar
- SEO audit tools
- Media management
- User administration

---

## Project Structure

```
headless-cms/
├── apps/
│   ├── cms/                    # Payload CMS application
│   │   ├── src/
│   │   │   ├── admin/          # Custom admin components
│   │   │   ├── blocks/         # Content block definitions
│   │   │   ├── collections/    # Collection configurations
│   │   │   ├── components/     # React components
│   │   │   ├── endpoints/      # Custom API endpoints
│   │   │   ├── globals/        # Global configurations
│   │   │   └── seed/           # Database seeding
│   ├── web/                    # Next.js frontend
│   └── astro/                  # Astro frontend
├── packages/
│   └── shared/                 # Shared types & utilities
├── presets/                    # Project presets
├── docs/                       # Documentation
├── AGENT_CONTRACT.md           # Developer contract
└── Makefile                    # All commands
```

---

## Built-in Content Types

These are the content types available out of the box (plus Dynamic Content Types you create in the admin):

### Collections
- **Pages** (`pages`)
- **Posts** (`posts`)
- **Categories** (`categories`)
- **Media** (`media`)
- **Archive Items** (`archive-items`)
- **People** (`people`)
- **Places** (`places`)
- **Content Types** (`content-types`) - dynamic content type definitions
- **Custom Items** (`custom-items`) - instances of dynamic content types
- **Users** (`users`)

### Globals
- **Header** (`header`)
- **Footer** (`footer`)
- **Settings** (`settings`)

---

## Content Blocks

All content types support these pre-built blocks:

| Block | Description |
|-------|-------------|
| **Hero** | Full-width hero section with heading, subheading, background, and CTAs |
| **Content** | Rich text with optional column layouts |
| **Media** | Images and videos with captions |
| **CTA** | Call-to-action sections with buttons |
| **Quote** | Pull-quote with attribution and alignment options |
| **Features** | Feature list with icons or media |
| **Stats** | Key metrics and KPI highlights |
| **Logo Cloud** | Brand/logo grid with optional links |
| **Testimonials** | Quote cards with avatar and rating |
| **FAQ** | Collapsible Q&A list |
| **Pricing** | Pricing tiers with feature lists |
| **Team** | Team members with bios and social links |
| **Embed** | Responsive iframe embeds (video, maps, etc.) |
| **Grid** | Flexible grid layouts for cards and features |
| **Timeline** | Chronological timeline displays |
| **Archive** | Collection listings from any content type |
| **Form** | Form builder integration |
| **Gallery** | Image galleries (grid, masonry, carousel, lightbox) |
| **Spacer / Divider** | Vertical spacing and separators |
| **Custom HTML** | Render trusted HTML markup |

---

## Frontend Selection

You can choose your frontend framework in the admin panel:

1. Go to **Settings → Frontend**
2. Select your **Framework** (Next.js or Astro)
3. Select your **Site Type** (Brochure, Blog, Museum, Ecommerce, Portfolio, Custom)
4. Configure **Frontend URL** for preview links
5. Toggle **Features** (Blog, Search, Forms, Comments, Newsletter, Multi-language)

---

## Makefile Commands

| Command | Description |
|---------|-------------|
| `make quickstart` | First-time setup: installs, configures, and starts everything |
| `make dev` | Start all development servers |
| `make build` | Build all applications for production |
| `make up` | Start services via Docker Compose |
| `make down` | Stop all running services |
| `make db-fresh` | **Fresh database with regenerated migrations** (use after schema changes) |
| `make db-migrate` | Run database migrations |
| `make db-reset` | Reset database (drop all tables and re-migrate) |
| `make db-seed` | Seed database with sample data |
| `make seed` | Seed database with sample data |
| `make clear-seed` | Clear all sample data |
| `make lint` | Run ESLint |
| `make typecheck` | Run TypeScript type checking |
| `make format` | Format code with Prettier |

### Database Management

When making **core schema changes** (adding/removing/renaming collections, fields, etc.), use:

```bash
make db-fresh
```

This will:
1. Stop any running dev servers
2. Remove the database volume and recreate PostgreSQL
3. Clear all old migration files
4. Generate fresh migrations from your current Payload schema
5. Run the new migrations

Then:
```bash
make dev
```

Create your admin user at http://localhost:3000/admin/create-first-user and run seed scripts from within the CMS.

### Preset Commands

| Command | Description |
|---------|-------------|
| `make blog-astro` | Create a new blog project with Astro |
| `make brochure-astro` | Create a new brochure site with Astro |
| `make archive-next` | Create a new archive site with Next.js |
| `make ecommerce-next` | Create a new ecommerce site with Next.js |

---

## Deployment

This project is optimized for deployment on **Railway**.

### One-Click Deploy (Recommended)

Once the Railway template is published, users can deploy with a single click:

1. Click the "Deploy on Railway" button
2. Wait for automatic provisioning (PostgreSQL, CMS, Web services)
3. All environment variables are auto-configured
4. Access your CMS at the provided URL

**What Gets Deployed Automatically:**
- ✅ PostgreSQL database
- ✅ CMS service (Payload CMS)
- ✅ Web service (Next.js frontend)
- ✅ All environment variables configured
- ✅ Services linked together
- ✅ Public domains generated

### Manual Deployment

For detailed manual deployment instructions, see [DEPLOY_TO_RAILWAY.md](DEPLOY_TO_RAILWAY.md).

### Publishing Your Own Template

To create your own Railway template for one-click deployment:

1. Deploy the project manually first (see [DEPLOY_TO_RAILWAY.md](DEPLOY_TO_RAILWAY.md))
2. Verify everything works correctly
3. Follow the template creation guide in [RAILWAY_TEMPLATE_SETUP.md](RAILWAY_TEMPLATE_SETUP.md)
4. Publish the template through Railway dashboard
5. Update the deploy button URL in this README

### Environment Variables

The following environment variables are automatically configured when using the template:

**CMS Service:**
- `DATABASE_URL` - Auto-linked from PostgreSQL
- `PAYLOAD_SECRET` - Auto-generated
- `PAYLOAD_PUBLIC_SERVER_URL` - Auto-set from domain
- `NODE_ENV` - Set to `production`

**Web Service:**
- `DATABASE_URL` - Auto-linked from PostgreSQL
- `CMS_URL` - Auto-linked from CMS service
- `NEXT_PUBLIC_CMS_URL` - Auto-linked from CMS service
- `NEXT_PUBLIC_SITE_URL` - Auto-set from domain
- `REVALIDATION_SECRET` - Auto-generated
- `NODE_ENV` - Set to `production`

---

## Documentation

- [Agent Contract](AGENT_CONTRACT.md) - Developer guidelines
- [Revalidation Rules](docs/REVALIDATION_RULES.md) - Cache invalidation
- [Versioning Policy](docs/VERSIONING_POLICY.md) - Version management

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


---

## About Opace Digital Agency

This project is developed and maintained by **Opace Digital Agency**, a Birmingham-based digital agency specializing in open-source solutions and custom developments.

We provide expert [decoupled Next.js and Astro development](https://opace.agency/services/web-design/next-js-react-development) services, creating modern, high-performance web applications and headless CMS solutions.

### Our Services

- **Next.js & React Development** - Custom web applications and JAMstack solutions
- **Headless CMS Solutions** - Payload CMS, Strapi, and custom implementations
- **Frontend Development** - Modern frameworks including Astro, React, and Vue
- **WordPress Development** - Custom themes, plugins, and headless WordPress
- **E-commerce Solutions** - Magento, WooCommerce, and custom platforms

### Get in Touch

- **Website**: [https://opace.agency](https://opace.agency)
- **Services**: [Web Design & Development](https://opace.agency/services/web-design)
- **Location**: Birmingham, UK
- **GitHub**: [@OpaceDigitalAgency](https://github.com/OpaceDigitalAgency)

For project inquiries, technical support, or collaboration opportunities, visit our website or reach out through our contact page.
