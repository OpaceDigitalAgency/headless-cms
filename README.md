# Payload CMS + Jamstack Platform

**A super-powered, WordPress-like headless CMS with modular frontends — built for rapid multi-project deployment.**

Deploy once. Re-use everywhere. This platform gives you a production-ready Payload CMS with 20+ content blocks, a full block library, 16+ collection types, and one-command setup.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/payload-jamstack?referralCode=payload)

> **Note**: The one-click deploy button requires the Railway template to be published first. See [RAILWAY_TEMPLATE_SETUP.md](RAILWAY_TEMPLATE_SETUP.md) for instructions. For manual deployment, see [DEPLOY_TO_RAILWAY.md](DEPLOY_TO_RAILWAY.md).

---

## Table of Contents

- [Quick Start](#quick-start)
- [What You Get](#what-you-get)
- [Built-in Collections](#built-in-collections)
- [Content Blocks](#content-blocks)
- [Block Library](#block-library)
- [Feature Settings](#feature-settings)
- [Admin UI](#admin-ui)
- [Project Structure](#project-structure)
- [Makefile Commands](#makefile-commands)
- [Deployment](#deployment)
- [About Opace](#about-opace-digital-agency)

---

## Quick Start

### Local Development (Recommended)

```bash
# 1. Clone
git clone https://github.com/OpaceDigitalAgency/headless-cms.git
cd headless-cms

# 2. One-command setup (installs deps, starts Postgres, runs migrations, seeds, starts server)
make quickstart
```

Then visit **http://localhost:3000/admin/create-first-user** to create your admin account.

Once logged in: go to the **Dashboard → 🌱 Sample Data Manager** and click **Seed All** to populate all collections with example content.

### Manual Steps (if you prefer control)

```bash
make env-setup       # Copy .env.example → .env
make install         # Install all dependencies
make db-up           # Start PostgreSQL via Docker
make db-migrate      # Run all database migrations
make dev             # Start CMS dev server at http://localhost:3000
```

Then seed via the admin dashboard, or run:

```bash
make db-seed         # CLI seed (optional)
```

### Railway / Production

Push to GitHub → Railway auto-deploys via the `start.sh` boot script, which:

1. Runs Payload migrations
2. Ensures all required tables exist (including `feature_settings`)
3. Starts the Next.js server

---

## What You Get

| Feature                   | Detail                                                                                                                                                                              |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **16+ Collection Types**  | Pages, Posts, Events, People, Places, Locations, FAQs, Testimonials, Logo Clouds, Block Library, Global Blocks, and more                                                            |
| **20+ Content Blocks**    | Hero, CTA, Features, Stats, Gallery, FAQ, Testimonials, Team, Timeline, Pricing, Grid, Form, Embed, and more                                                                        |
| **Block Library**         | 10 pre-seeded reusable block templates (TRC-inspired: Hero, Trust Bar, 10 Reasons, Testimonials Carousel, CTA Banner, Process Steps, Stats Row, Gallery, FAQ Section, Team Section) |
| **Feature Settings**      | Admin-controlled feature flags — enable/disable module groups without code changes                                                                                                  |
| **Dynamic Content Types** | Create custom content types (e.g. "Classic Cars") from the admin UI — no code or restarts                                                                                           |
| **Sample Data Manager**   | Collapsible dashboard panel to seed, re-seed, or clear all sample data per collection                                                                                               |
| **Two-Panel Admin Nav**   | Custom collapsible sidebar with icon navigation and section grouping                                                                                                                |
| **Dual Frontend Support** | Next.js 15 (ISR) and Astro 4 (SSG) included                                                                                                                                         |
| **Railway-Ready**         | `start.sh` handles migrations + safety checks on every boot                                                                                                                         |
| **S3 Storage**            | Local or S3-compatible file storage with signed URLs                                                                                                                                |
| **Version History**       | Full version control on all content collections                                                                                                                                     |

---

## Built-in Collections

These collections are ready to use out of the box:

### Core Content

| Collection | Slug         | Description                       |
| ---------- | ------------ | --------------------------------- |
| Pages      | `pages`      | Block-based pages with 20+ blocks |
| Posts      | `posts`      | Blog / news articles              |
| Categories | `categories` | Taxonomy for posts and content    |
| Tags       | `tags`       | Additional taxonomy               |
| Media      | `media`      | Images, files, and uploads        |

### Extended Content

| Collection    | Slug            | Description                                          |
| ------------- | --------------- | ---------------------------------------------------- |
| Events        | `events`        | Calendar events with type, date, and location        |
| People        | `people`        | Team members, historical figures, staff              |
| Places        | `places`        | Geographical or physical locations with coordinates  |
| Locations     | `locations`     | Site/branch locations with opening hours and contact |
| Archive Items | `archive-items` | Museum/archive catalogue items                       |
| FAQs          | `faqs`          | Q&A pairs with category grouping                     |
| Testimonials  | `testimonials`  | Reviews with rating, author, and company             |
| Logo Clouds   | `logo-clouds`   | Groups of logos with links                           |

### Content Management

| Collection    | Slug            | Description                                          |
| ------------- | --------------- | ---------------------------------------------------- |
| Block Library | `block-library` | Named, reusable block instances for use across pages |
| Global Blocks | `global-blocks` | Site-wide reusable content sections                  |
| Content Types | `content-types` | Dynamic content type definitions                     |
| Custom Items  | `custom-items`  | Instances of dynamic content types                   |
| Forms         | `forms`         | Form builder forms                                   |
| Users         | `users`         | Admin and editor accounts                            |
| Redirects     | `redirects`     | URL redirect rules                                   |

### Globals (Settings Pages)

| Global           | Slug                  | Description                                       |
| ---------------- | --------------------- | ------------------------------------------------- |
| Header           | `header`              | Navigation and branding                           |
| Footer           | `footer`              | Footer links and copyright                        |
| Site Settings    | `settings`            | Site name, description, integrations              |
| SEO Settings     | `seo-settings`        | Global SEO defaults                               |
| Admin Navigation | `navigation-settings` | Control which collections appear in the sidebar   |
| Feature Settings | `feature-settings`    | Enable/disable feature modules (no code required) |

---

## Content Blocks

All page types support these pre-built blocks:

| Block                | Description                                                                            |
| -------------------- | -------------------------------------------------------------------------------------- |
| **Hero**             | Full-width hero with heading, subheading, image, overlay, and CTAs                     |
| **Content**          | Rich text with optional column layouts                                                 |
| **CTA**              | Call-to-action banner with buttons and background colour                               |
| **Features**         | Icon + text feature grid (supports TRC variants: trust bar, 10 reasons, process steps) |
| **Stats**            | Key metrics row with value, label, and description                                     |
| **Testimonials**     | Quote cards with star ratings (supports carousel and grid variants)                    |
| **FAQ**              | Collapsible Q&A accordion                                                              |
| **Team**             | Staff cards with avatar, bio, and social links                                         |
| **Gallery**          | Image grid with lightbox (supports 2, 3, 4 columns + captions)                         |
| **Pricing**          | Pricing tier cards with feature lists and featured plan highlight                      |
| **Grid**             | Flexible card grid for features, solutions, or any repeating content                   |
| **Timeline**         | Chronological event display (vertical or horizontal)                                   |
| **Logo Cloud**       | Brand or partner logo grid                                                             |
| **Archive**          | Auto-populated listing from any collection                                             |
| **Form**             | Form builder integration                                                               |
| **Embed**            | Responsive iframe (YouTube, maps, etc.)                                                |
| **Quote**            | Pull quote with attribution                                                            |
| **Media**            | Single image or video with caption                                                     |
| **Spacer / Divider** | Vertical spacing and separator lines                                                   |
| **Custom HTML**      | Raw HTML for advanced use                                                              |

---

## Block Library

The Block Library (`/admin/collections/block-library`) stores named, reusable block instances. Instead of rebuilding a "Main CTA" or "10 Reasons" section on every page, you save it once and reference it via `sharedBlocks` on any page.

**10 pre-seeded templates** (available after running Seed All):

| Name                                     | Block Type     | Based On                                              |
| ---------------------------------------- | -------------- | ----------------------------------------------------- |
| Hero — Full Width with Overlay           | `hero`         | TRC full-width dark-overlay hero with trust bar items |
| Trust Bar — Key Credentials              | `features`     | TRC horizontal trust strip (4 items, icons)           |
| 10 Reasons to Visit                      | `features`     | TRC "10 Reasons" numbered dark grid                   |
| Testimonials — Verified Reviews Carousel | `testimonials` | TRC 3-column verified reviews                         |
| CTA — Primary Banner                     | `cta`          | Accent background with dual CTA buttons               |
| Process Steps — How It Works             | `features`     | TRC 4-step horizontal process                         |
| Stats Row — Key Numbers                  | `stats`        | 4-stat headline row                                   |
| Gallery — Photo Grid                     | `gallery`      | 3-column lightbox gallery                             |
| FAQ Section — Visitor Questions          | `faq`          | 4-item accordion FAQ                                  |
| Team Section — Meet the Curators         | `team`         | 3-person team card grid                               |

---

## Feature Settings

Navigate to **Settings → Feature Settings** to enable or disable feature modules:

- ✅ Pages
- ✅ Blog Posts
- ✅ FAQs
- ✅ Testimonials
- ✅ People & Team Members
- ✅ Events
- ✅ Locations
- ✅ Block Library & Global Blocks

Changes here drive CMS visibility. To enable eCommerce (Products, Orders, Shop), follow the instructions on the Feature Settings page.

---

## Admin UI

### Sample Data Manager

The dashboard includes a **collapsible Sample Data Manager** panel. On a fresh install (empty CMS), it auto-expands. Once data exists, it collapses to avoid clutter. Use it to:

- **Seed** — populate a collection with example content
- **Re-seed** — clear and re-populate
- **Delete** — remove all sample data

### Custom Dashboard

- Collection counts at a glance (all 16+ collections)
- Recent updates list
- Drafts needing review
- Quick create buttons
- Site configuration shortcuts

### Navigation

- Organised sidebar sections: Collections, Content, Forms, Media, Settings, Admin
- Controlled via the `Admin Navigation` global — customise what appears without code changes

---

## Project Structure

```
headless-cms/
├── apps/
│   ├── cms/                         # Payload CMS (Next.js 15)
│   │   ├── src/
│   │   │   ├── admin/               # Custom admin UI (Dashboard, icons, views)
│   │   │   ├── blocks/              # Block schema definitions
│   │   │   ├── collections/         # Collection configs (16+ collections)
│   │   │   ├── components/          # React components (SeedDataManager, etc.)
│   │   │   ├── endpoints/           # Custom API endpoints (navigation, seed, tools)
│   │   │   ├── globals/             # Global configs (Header, Footer, FeatureSettings)
│   │   │   ├── lib/                 # Utilities (navigationConfig, transformBlockUrls)
│   │   │   └── seed/                # Seed data (seed-data.ts covers all collections)
│   │   ├── start.sh                 # Railway/Docker startup script
│   │   └── package.json
│   ├── web/                         # Next.js frontend
│   └── astro/                       # Astro SSG frontend
├── apps/db/migrations/              # Drizzle migration files
├── packages/
│   ├── shared/                      # Shared types & utilities
│   ├── ui/                          # Shared UI components
│   └── templates/                   # Page templates
├── scripts/                         # Automation scripts
├── Makefile                         # All commands
├── docker-compose.yml               # Local PostgreSQL
└── .env.example                     # Environment variable template
```

---

## Makefile Commands

### Getting Started

| Command           | Description                                                                        |
| ----------------- | ---------------------------------------------------------------------------------- |
| `make quickstart` | **One command**: installs, starts Postgres, migrates, seeds, and starts dev server |
| `make setup`      | Setup only: copies .env + installs dependencies                                    |
| `make env-setup`  | Copy `.env.example` → `.env` and create CMS symlink                                |
| `make install`    | Install all pnpm dependencies                                                      |

### Development

| Command          | Description                            |
| ---------------- | -------------------------------------- |
| `make dev`       | Start all services in development mode |
| `make dev-cms`   | Start CMS only                         |
| `make dev-fresh` | Start CMS dev server (no push mode)    |
| `make dev-astro` | Start Astro frontend only              |

### Database

| Command                    | Description                                                                       |
| -------------------------- | --------------------------------------------------------------------------------- |
| `make db-up`               | Start PostgreSQL via Docker                                                       |
| `make db-down`             | Stop PostgreSQL                                                                   |
| `make db-migrate`          | Run Payload migrations (standard)                                                 |
| `make db-seed`             | Seed database from CLI                                                            |
| `make db-reset`            | Drop all tables and re-migrate (interactive)                                      |
| `make db-fresh`            | Quick dev reset — drops volume, recreates DB, push mode on first boot             |
| `make db-fresh-migrations` | Full reset: drops volume, regenerates migration files, runs them (for production) |
| `make db-studio`           | Open Drizzle Studio (visual DB browser)                                           |

### Seeding

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `make db-seed`         | Seed all collections with sample data |
| `make seed-blog`       | Seed blog-specific sample data        |
| `make seed-archive`    | Seed archive-specific sample data     |
| `make seed-ecommerce`  | Seed ecommerce-specific sample data   |
| `make seed-with-media` | Seed with Unsplash sample images      |

### Build & Deploy

| Command               | Description                       |
| --------------------- | --------------------------------- |
| `make build`          | Build all packages for production |
| `make build-cms`      | Build CMS only                    |
| `make build-astro`    | Build Astro frontend              |
| `make railway-deploy` | Deploy to Railway                 |
| `make railway-logs`   | View Railway logs                 |

### Utilities

| Command                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `make generate-secret` | Generate a random `PAYLOAD_SECRET`          |
| `make generate-types`  | Regenerate Payload TypeScript types         |
| `make lint`            | Run ESLint                                  |
| `make typecheck`       | TypeScript type check                       |
| `make format`          | Format with Prettier                        |
| `make clean`           | Remove all build artefacts and node_modules |

---

## Deployment

### Railway (Recommended)

1. Push to GitHub — Railway auto-deploys on merge to `main`
2. On first deploy, set `FRESH_INSTALL=true` in Railway env vars to auto-create schema on boot
3. Add admin user at `yourdomain.com/admin/create-first-user`
4. Seed sample data via the admin dashboard

**Required environment variables:**

```
DATABASE_URL=postgresql://...
PAYLOAD_SECRET=your-32-char-secret
PAYLOAD_PUBLIC_SERVER_URL=https://yourdomain.com
NODE_ENV=production
```

### Boot Sequence (start.sh)

Every deploy runs these steps automatically:

1. Runs Payload migrations (if `AUTO_MIGRATE=true`, the default)
2. **Ensures `feature_settings` table exists** (idempotent SQL safety check)
3. Starts the Next.js production server

This means Feature Settings and all admin globals are guaranteed to work on first boot with zero manual SQL.

### Environment Variables

| Variable                    | Where Used | Description                                         |
| --------------------------- | ---------- | --------------------------------------------------- |
| `DATABASE_URL`              | CMS + Web  | PostgreSQL connection string                        |
| `PAYLOAD_SECRET`            | CMS        | 32+ char secret for JWT signing                     |
| `PAYLOAD_PUBLIC_SERVER_URL` | CMS        | Public CMS URL (e.g. `https://cms.yourdomain.com`)  |
| `PUBLIC_CMS_URL`            | Astro      | CMS URL for REST API fetches                        |
| `PUBLIC_SITE_URL`           | Astro      | Frontend URL                                        |
| `NEXT_PUBLIC_CMS_URL`       | Next.js    | CMS URL for client-side fetches                     |
| `FRESH_INSTALL`             | CMS        | Set `true` on first Railway deploy to use push mode |
| `AUTO_MIGRATE`              | CMS        | Set `false` to skip migrations on boot              |

---

## Documentation

- [AGENT_CONTRACT.md](AGENT_CONTRACT.md) — Developer guidelines and coding standards
- [DEPLOY_TO_RAILWAY.md](DEPLOY_TO_RAILWAY.md) — Step-by-step Railway deployment
- [RAILWAY_TEMPLATE_SETUP.md](RAILWAY_TEMPLATE_SETUP.md) — Publishing the Railway one-click template
- [docs/REVALIDATION_RULES.md](docs/REVALIDATION_RULES.md) — Cache invalidation rules
- [docs/VERSIONING_POLICY.md](docs/VERSIONING_POLICY.md) — Version management

---

## License

MIT. See [LICENSE](LICENSE).

---

## About Opace Digital Agency

Developed and maintained by **[Opace Digital Agency](https://opace.agency)** — a Birmingham-based agency specialising in headless CMS, Next.js, and open-source solutions.

- **Website**: [opace.agency](https://opace.agency)
- **GitHub**: [@OpaceDigitalAgency](https://github.com/OpaceDigitalAgency)
- **Location**: Birmingham, UK
