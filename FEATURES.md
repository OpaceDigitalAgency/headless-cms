# Opace Headless CMS Platform vs. Vanilla Payload CMS

### Exhaustive Feature Comparison & USPs

> **Context**: This compares the official Payload CMS **website template** (the richest starting point Payload ships) against the Opace Headless CMS Platform. The website template is the best-case vanilla install — a blank install is even more sparse.

---

## At a Glance

| Metric                   | Vanilla Payload (Website Template) |        **Opace Platform**        |
| ------------------------ | :--------------------------------: | :------------------------------: |
| Collections              |                 5                  |              **25**              |
| Content blocks           |                 7                  |              **28**              |
| Globals / settings pages |                 3                  |              **7**               |
| Settings global tabs     |                 1                  |              **6**               |
| Settings global fields   |                 ~8                 |             **30+**              |
| Admin sub-pages (Tools)  |                 0                  |              **12**              |
| SEO API endpoints        |                 0                  |              **7**               |
| Custom API endpoints     |           1 (revalidate)           |              **14**              |
| Admin UI custom views    |                 0                  | **14 views + 12 tool sub-pages** |
| Pre-installed plugins    |                 4                  |              **8**               |
| Skin / theme options     |                 0                  |              **11**              |
| One-command setup        |                 ❌                 |                ✅                |
| Sample data manager      |                 ❌                 |                ✅                |
| Block library            |                 ❌                 |         ✅ 10 pre-seeded         |
| Feature flags            |                 ❌                 |                ✅                |

---

## 1. Collections

| Collection          | Slug                  |   Vanilla   |    Opace     | Notes                                                                        |
| ------------------- | --------------------- | :---------: | :----------: | ---------------------------------------------------------------------------- |
| Pages               | `pages`               |     ✅      |      ✅      | Opace adds template gallery, section templates, 28 blocks                    |
| Posts               | `posts`               |     ✅      |      ✅      | Opace adds publishedAt, reading time, custom renderers                       |
| Categories          | `categories`          |     ✅      |      ✅      | Opace adds parent/child nesting, featured image, description                 |
| Media               | `media`               |     ✅      |      ✅      | Opace: custom file size cell, generated sizes display, alt text enforcement  |
| Users               | `users`               |     ✅      |      ✅      | Opace: role field (admin/editor), avatar, extended profile                   |
| Tags                | `tags`                |     ❌      |      ✅      | Full taxonomy with parent/child                                              |
| Events              | `events`              |     ❌      |      ✅      | Type, date range, description, location field                                |
| People              | `people`              |     ❌      |      ✅      | Bio, DOB, nationality, roles, lat/long, featured media, social links         |
| Places              | `places`              |     ❌      |      ✅      | Coordinates, country, region, map embed, featured media                      |
| Locations           | `locations`           |     ❌      |      ✅      | Address, opening hours, phone, email, website, map embed, logo               |
| Archive Items       | `archive-items`       |     ❌      |      ✅      | Museum/archive catalogue with item type, date, origin, condition, dimensions |
| FAQs                | `faqs`                |     ❌      |      ✅      | Question, rich text answer, category, sort order                             |
| Testimonials        | `testimonials`        |     ❌      |      ✅      | Quote, author, role, company, star rating (1–5)                              |
| Logo Clouds         | `logo-clouds`         |     ❌      |      ✅      | Named logo groups with URLs for partner/supporter grids                      |
| Block Library       | `block-library`       |     ❌      |      ✅      | Named, reusable block instances referenced across pages                      |
| Global Blocks       | `global-blocks`       |     ❌      |      ✅      | Site-wide content sections with full block layout                            |
| Content Types       | `content-types`       |     ❌      |      ✅      | Dynamic CPT definitions (WordPress-style)                                    |
| Custom Items        | `custom-items`        |     ❌      |      ✅      | Instances of dynamic CPTs — stored in one shared table                       |
| Products            | `products`            |     ❌      |      ✅      | Ready to activate via Feature Settings                                       |
| Product Categories  | `product-categories`  |     ❌      |      ✅      | Ready to activate via Feature Settings                                       |
| Product Collections | `product-collections` |     ❌      |      ✅      | Ready to activate via Feature Settings                                       |
| Product Reviews     | `product-reviews`     |     ❌      |      ✅      | Ready to activate via Feature Settings                                       |
| Orders              | `orders`              |     ❌      |      ✅      | Ready to activate via Feature Settings                                       |
| Carts               | `carts`               |     ❌      |      ✅      | Ready to activate via Feature Settings                                       |
| Forms               | `forms`               | Plugin only | ✅ Pre-wired |                                                                              |
| **Total**           |                       |    **5**    |    **25**    |                                                                              |

---

## 2. Content Blocks (Page Builder)

| Block                        | Vanilla | Opace  | Notable Opace Variants / Features                                       |
| ---------------------------- | :-----: | :----: | ----------------------------------------------------------------------- |
| Hero                         |   ✅    |   ✅   | Dark/light overlay, check item list, badge, dual CTAs, background image |
| Content (rich text)          |   ✅    |   ✅   | Column layouts, background colour, padding control                      |
| Call to Action               |   ✅    |   ✅   | Banner and card variants, dual buttons, colour options                  |
| Media block                  |   ✅    |   ✅   | Caption, display size options                                           |
| Archive / Collection listing |   ✅    |   ✅   | Works with any collection, pagination, sort, filters                    |
| Form                         |   ✅    |   ✅   |                                                                         |
| Banner                       |   ✅    |   ❌   | Merged into CTA with variants                                           |
| Code                         |   ✅    |   ❌   | Not needed for client sites                                             |
| Related Posts                |   ✅    |   ❌   | Handled by Archive block                                                |
| Features / Icon grid         |   ❌    |   ✅   | Trust bar, 10-reasons grid, process steps variants; icon + title + body |
| Stats row                    |   ❌    |   ✅   | Value, label, description per stat; 4-column layout                     |
| Testimonials                 |   ❌    |   ✅   | Star rating cards; carousel and grid variants                           |
| FAQ accordion                |   ❌    |   ✅   | Collapsible Q&A; category filter option                                 |
| Team                         |   ❌    |   ✅   | Staff cards with avatar, bio, social links                              |
| Gallery                      |   ❌    |   ✅   | 2–4 column grid; masonry / carousel / lightbox variants; captions       |
| Pricing tiers                |   ❌    |   ✅   | Feature lists per tier; featured plan highlight; CTA per tier           |
| Grid (flexible card)         |   ❌    |   ✅   | Any repeating content (features, solutions, case studies)               |
| Timeline                     |   ❌    |   ✅   | Chronological vertical or horizontal; date + icon + body                |
| Logo cloud                   |   ❌    |   ✅   | Partner/client logos with optional links                                |
| Quote / pull quote           |   ❌    |   ✅   | Attribution, dark/light alignment options                               |
| Spacer / Divider             |   ❌    |   ✅   | Configurable spacing and separator styles                               |
| Embed                        |   ❌    |   ✅   | Responsive iframe (YouTube, Vimeo, maps, etc.)                          |
| Custom HTML                  |   ❌    |   ✅   | Trusted raw HTML for advanced use                                       |
| Reusable Block               |   ❌    |   ✅   | Inline reference to any Block Library entry                             |
| Posts widget                 |   ❌    |   ✅   | Latest posts with count control                                         |
| Contact Form                 |   ❌    |   ✅   | Extended form with optional map embed                                   |
| Video Feature                |   ❌    |   ✅   | Video + thumbnail + caption                                             |
| Social Links                 |   ❌    |   ✅   | Icon-based social profile row                                           |
| **Total**                    |  **7**  | **28** |                                                                         |

---

## 3. Globals (Settings Pages)

| Global                 | Slug                     |         Vanilla          |              Opace              |
| ---------------------- | ------------------------ | :----------------------: | :-----------------------------: |
| Header                 | `header`                 |            ✅            |               ✅                |
| Footer                 | `footer`                 |            ✅            |               ✅                |
| Settings               | `settings`               | Basic (1 tab, ~8 fields) | **6 tabs, 30+ fields** (see §4) |
| Navigation Settings    | `navigation-settings`    |            ❌            |               ✅                |
| Feature Settings       | `feature-settings`       |            ❌            |               ✅                |
| Page Templates         | `page-templates`         |            ❌            |               ✅                |
| Block Template Builder | `block-template-builder` |            ❌            |               ✅                |
| **Total**              |                          |          **3**           |              **7**              |

---

## 4. Site Settings Global — 6 Full Tabs

Vanilla Payload's Settings global has roughly a site name and a handful of fields. The Opace platform's Settings global has **6 fully-built tabs**:

### Tab 1 — General

| Field            | Type         | Notes                                                               |
| ---------------- | ------------ | ------------------------------------------------------------------- |
| Seed Preset      | Select       | Blog / Brochure / Archive / Ecommerce — drives collection templates |
| Site Name        | Text         |                                                                     |
| Site Description | Textarea     |                                                                     |
| Site URL         | Text         |                                                                     |
| Favicon          | Media upload |                                                                     |
| Site Logo        | Media upload |                                                                     |

### Tab 2 — Appearance

| Field        | Type   | Notes                                                                                                          |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------------- |
| Default Skin | Select | **11 skins**: Minimal, Editorial, SaaS, Soft, Bold, Monochrome, Glass, High Contrast, Neon Grid, Agency, Retro |
| Default Mode | Select | Light / Dark / System Preference                                                                               |

### Tab 3 — Frontend

| Field                     | Type     | Notes                                                       |
| ------------------------- | -------- | ----------------------------------------------------------- |
| Frontend Framework        | Select   | Next.js / Astro — persisted setting drives preview links    |
| Site Type                 | Select   | Brochure / Blog / Archive / Ecommerce / Portfolio / Custom  |
| Frontend URL              | Text     | For preview links                                           |
| Revalidation Secret       | Text     | Auto-generated on first save via `crypto.getRandomValues()` |
| Blog enabled              | Checkbox | Feature toggle                                              |
| Site Search enabled       | Checkbox | Feature toggle                                              |
| Contact Forms enabled     | Checkbox | Feature toggle                                              |
| Comments enabled          | Checkbox | Feature toggle                                              |
| Newsletter Signup enabled | Checkbox | Feature toggle                                              |
| Multi-Language Support    | Checkbox | Feature toggle                                              |

### Tab 4 — Social

| Field           | Type  | Notes                                                                               |
| --------------- | ----- | ----------------------------------------------------------------------------------- |
| Social Profiles | Array | Platform (Facebook/Twitter/Instagram/LinkedIn/YouTube/TikTok/GitHub) + URL + Handle |
| Twitter Handle  | Text  | For Twitter Card meta tags                                                          |

### Tab 5 — Contact

| Field         | Type  | Notes                                     |
| ------------- | ----- | ----------------------------------------- |
| Contact Email | Email |                                           |
| Contact Phone | Text  |                                           |
| Address       | Group | Street, City, State, Postal Code, Country |

### Tab 6 — Advanced

| Field               | Type        | Notes                                                       |
| ------------------- | ----------- | ----------------------------------------------------------- |
| Custom CSS          | Code editor | Live CSS injection, syntax highlighted                      |
| Head Scripts        | Code editor | Add analytics, tag managers, consent tools to `<head>`      |
| Body Scripts        | Code editor | Scripts before `</body>`                                    |
| Maintenance Mode    | Checkbox    | Activates maintenance page for visitors                     |
| Maintenance Message | Textarea    | Shown only when maintenance mode is on (conditional render) |

There is also a hidden **SEO** sub-group (exposed via the SEO admin views) covering:

- Default meta title pattern
- Default meta description
- Title separator character
- Twitter card type
- Default robots meta (index/noindex)
- Google Search Console verification code
- Bing Webmaster verification code
- Facebook Domain verification code
- Schema.org Organisation type
- Schema.org Organisation name

---

## 5. SEO System (Full Suite)

Vanilla Payload ships the basic `@payloadcms/plugin-seo` which adds a meta title + description field to individual posts. The Opace platform builds a complete SEO management system on top:

### SEO API Endpoints (`/api/admin/seo/...`)

| Endpoint                  | Method | What it does                                                                                                                                                                      |
| ------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/admin/seo/content`      | GET    | Fetches all SEO-able content across **all collections** — filterable by content type, missing title, missing description, text query; sortable by title/slug/meta/date; paginated |
| `/admin/seo/content/:id`  | PATCH  | Updates meta title and/or description for a single doc with conflict detection via `lockVersion` (optimistic locking — prevents overwriting concurrent saves)                     |
| `/admin/seo/content/bulk` | PATCH  | **Bulk updates** meta title and description across multiple docs in one request; returns per-item pass/fail results                                                               |
| `/admin/seo/templates`    | GET    | Reads global SEO templates (title pattern, description, separator, Twitter card type)                                                                                             |
| `/admin/seo/templates`    | POST   | Saves SEO templates back to Settings global                                                                                                                                       |
| `/admin/seo/advanced`     | GET    | Reads advanced SEO settings (robots, site verifications, Schema.org)                                                                                                              |
| `/admin/seo/advanced`     | POST   | Saves advanced SEO settings                                                                                                                                                       |

### SEO Admin Views

| View            | File                        | Description                                                                                                                                                                        |
| --------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEO Bulk Editor | `SeoBulkEditor.tsx` (25kb)  | Full data table of all content across all collections with inline meta editing, column sort, filter by type / missing title / missing description, live search, conflict detection |
| SEO Templates   | `SeoTemplatesTab.tsx` (8kb) | UI for setting global meta title patterns and default descriptions                                                                                                                 |
| SEO Advanced    | `SeoAdvancedTab.tsx` (10kb) | UI for robots meta, Google/Bing/Facebook site verification, Schema.org org type/name                                                                                               |
| SEO Settings    | `SeoSettings.tsx`           | Wrapper with tabbed navigation for the three SEO sub-sections above                                                                                                                |

---

## 6. Tools Page — 12 Dedicated Sub-Pages

Vanilla Payload has no admin Tools page. The Opace platform has a dedicated `/admin/tools` page with **12 sub-pages**, each backed by a custom endpoint and custom React UI:

### Content Management

| Tool                | URL                                | What it does                                                                                        |
| ------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| Publishing Calendar | `/admin/tools/publishing-calendar` | Shows all published/scheduled content across Pages, Posts, Custom Items filtered by date range      |
| Draft Review        | `/admin/tools/draft-review`        | Lists every unpublished draft across all collections that support versioning with direct edit links |
| SEO Audit           | `/admin/tools/seo-audit`           | Lists all content items with a missing meta title or meta description with direct edit links        |

### Media & Assets

| Tool          | URL                          | What it does                                                                                                     |
| ------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Media Library | `/admin/tools/media-library` | Browsable media collection within the Tools context                                                              |
| Unused Media  | `/admin/tools/unused-media`  | Crawls every collection and global to find media files not referenced anywhere — shows filename, size, MIME type |
| Large Files   | `/admin/tools/large-files`   | Lists media files above a configurable threshold (default 5 MB), sorted by size descending                       |

### Site Configuration

| Tool               | URL                                  | What it does                                        |
| ------------------ | ------------------------------------ | --------------------------------------------------- |
| Navigation Manager | `/admin/globals/navigation-settings` | Shortcut to the Navigation Settings global          |
| Redirects          | `/admin/tools/redirects`             | Inline list of all redirect rules with status codes |
| Forms              | `/admin/tools/forms`                 | Lists all forms with submission counts              |
| Form Submissions   | `/admin/tools/form-submissions`      | Lists all submissions per form with field values    |

### Administration

| Tool            | URL                            | What it does                                                                                         |
| --------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| User Management | `/admin/tools/user-management` | Lists all users with roles and last-active; direct edit links                                        |
| Search Index    | `/admin/tools/search-index`    | Shows search index row count, last updated timestamp, indexed collections list, and reindex endpoint |
| API Explorer    | `/api/graphql-playground`      | Links to the built-in GraphQL playground (external tab)                                              |

### Form Submissions CSV Export

The Tools API also includes a dedicated CSV export endpoint:

| Endpoint                                         | What it does                                                                                                   |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `/admin/tools/form-submissions-export?form=<id>` | Exports all form submissions (or submissions for a specific form) as a downloadable CSV with field/value pairs |

---

## 7. Admin Interface — Custom Views & Navigation

| Feature                       | Vanilla | Opace | Detail                                                                                                                       |
| ----------------------------- | :-----: | :---: | ---------------------------------------------------------------------------------------------------------------------------- |
| Custom Dashboard              |   ❌    |  ✅   | Collection counts for all 25 collections, recent updates, drafts needing review, quick-create buttons, site config shortcuts |
| Sample Data Manager panel     |   ❌    |  ✅   | Collapsible — auto-expands on fresh install; collapses once data exists; seed/re-seed/delete per collection                  |
| Two-panel collapsible sidebar |   ❌    |  ✅   | Icon rail + content panel; smooth transitions; custom sections (Collections, Content, Forms, Media, Settings, Admin)         |
| Dark / light theme toggle     |   ❌    |  ✅   | Persists in localStorage across sessions                                                                                     |
| Global search                 |   ❌    |  ✅   | Keyboard-driven; indexes all content, settings, and nav items; Enter to navigate, Escape to close                            |
| Tools page                    |   ❌    |  ✅   | 12 tools in 4 categories (see §6)                                                                                            |
| System info panel             |   ❌    |  ✅   | Shows CMS version, database type, environment at a glance                                                                    |
| Documentation panel           |   ❌    |  ✅   | Quick links to Payload docs, REST API, Agent Contract                                                                        |
| Visual Template Gallery       |   ❌    |  ✅   | Browse and apply page layout templates with visual preview; auto-populates blocks                                            |
| Section Collection Templates  |   ❌    |  ✅   | 71kb component: 16 base templates that populate block layouts for any collection type                                        |
| Block icons in picker         |   ❌    |  ✅   | Custom SVG icon for every block type in the block picker                                                                     |
| Save block to library         |   ❌    |  ✅   | One-click button in any page editor to save a block as a named Block Library entry                                           |
| Save to library button        |   ❌    |  ✅   | Separate template save workflow                                                                                              |
| Preview button cells          |   ❌    |  ✅   | Per-row live-preview links in: Archive Items, Events, People, Places, Custom Items, Content Types                            |
| Clear cache button            |   ❌    |  ✅   | Triggers on-demand ISR revalidation from the admin                                                                           |
| Export templates button       |   ❌    |  ✅   | Exports current page and post templates as JSON                                                                              |
| Content type manager (UI)     |   ❌    |  ✅   | Full CRUD UI for creating WordPress-style custom post types without code                                                     |
| Interactive location map      |   ❌    |  ✅   | Embedded map preview in Locations collection editor                                                                          |
| Trustpilot widget             |   ❌    |  ✅   | Trustpilot review embed component                                                                                            |
| Version display               |   ❌    |  ✅   | Platform version shown in admin footer                                                                                       |
| Sticky bottom bar             |   ❌    |  ✅   | Context-aware sticky action bar in collection forms                                                                          |
| Reusable block renderer       |   ❌    |  ✅   | `RenderBlocksClient.tsx` — renders all 28 blocks; wired to live preview                                                      |

---

## 8. Dynamic Content Types (WordPress-Style CPTs)

No Payload equivalent exists for this feature.

| Capability                                                         | Vanilla | Opace |
| ------------------------------------------------------------------ | :-----: | :---: |
| Create content types from admin UI                                 |   ❌    |  ✅   |
| No server restart or code change required                          |   ❌    |  ✅   |
| Choose a base template (Archive Item, Product, Person, Event etc.) |   ❌    |  ✅   |
| Add custom JSON data per item                                      |   ❌    |  ✅   |
| All items stored in one shared `custom-items` table                |   ❌    |  ✅   |
| Custom list header with type filter                                |   ❌    |  ✅   |
| Per-type preview links                                             |   ❌    |  ✅   |
| SEO fields per item                                                |   ❌    |  ✅   |
| Collection template export                                         |   ❌    |  ✅   |

---

## 9. Block Library & Reusable Blocks

| Feature                                              | Vanilla |                                                                   Opace                                                                    |
| ---------------------------------------------------- | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------: |
| Block Library collection                             |   ❌    |                                                                     ✅                                                                     |
| 10 pre-seeded TRC-inspired block templates           |   ❌    | ✅ Hero full-width, Trust Bar, 10 Reasons, Testimonials Carousel, CTA Banner, Process Steps, Stats Row, Gallery, FAQ Section, Team Section |
| Inline `Reusable Block` block type                   |   ❌    |                                                                     ✅                                                                     |
| Save any block from page editor to library (1-click) |   ❌    |                                                                     ✅                                                                     |
| Global Blocks collection                             |   ❌    |                                                                     ✅                                                                     |
| Block Template Builder global                        |   ❌    |                                                                     ✅                                                                     |

---

## 10. Feature Settings (No-Code Module Control)

Vanilla Payload has no equivalent — any module change requires a code push and restart.

| Module toggle                 |    Vanilla     |       Opace       |
| ----------------------------- | :------------: | :---------------: |
| Pages                         | Code + restart | ✅ Admin checkbox |
| Blog / Posts                  | Code + restart | ✅ Admin checkbox |
| FAQs                          | Code + restart | ✅ Admin checkbox |
| Testimonials                  | Code + restart | ✅ Admin checkbox |
| People                        | Code + restart | ✅ Admin checkbox |
| Events                        | Code + restart | ✅ Admin checkbox |
| Locations                     | Code + restart | ✅ Admin checkbox |
| Block Library & Global Blocks | Code + restart | ✅ Admin checkbox |

---

## 11. Navigation Control (Admin-Managed Sidebar)

| Feature                                           | Vanilla |           Opace           |
| ------------------------------------------------- | :-----: | :-----------------------: |
| Enable/disable any collection in the sidebar      |   ❌    |            ✅             |
| Sidebar controlled via Navigation Settings global |   ❌    |            ✅             |
| Always-on collections (cannot be hidden)          |   ❌    |     ✅ fallback list      |
| Navigation endpoint (`/api/navigation`)           |   ❌    | ✅ 15.5kb custom endpoint |
| No code change or restart required                |   ❌    |            ✅             |

---

## 12. Custom API Endpoints (14 total)

Vanilla Payload's website template has 1 custom endpoint (revalidate). The Opace platform has 14:

| Endpoint Group             | Endpoints                                                       | Description                                                             |
| -------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------- |
| SEO Content                | `GET/PATCH /admin/seo/content`, `PATCH /admin/seo/content/bulk` | Read all SEO fields, update single, bulk update with conflict detection |
| SEO Templates              | `GET/POST /admin/seo/templates`                                 | Global meta title/description template patterns                         |
| SEO Advanced               | `GET/POST /admin/seo/advanced`                                  | Robots meta, site verifications, Schema.org                             |
| Tools: Drafts              | `GET /admin/tools/drafts`                                       | All draft documents across all collections                              |
| Tools: Publishing Calendar | `GET /admin/tools/publishing-calendar`                          | Scheduled/published content by date range                               |
| Tools: SEO Audit           | `GET /admin/tools/seo-audit`                                    | Content missing meta title or description                               |
| Tools: Media Usage         | `GET /admin/tools/media-usage`                                  | Finds orphaned/unused media by crawling all fields                      |
| Tools: Large Files         | `GET /admin/tools/large-files`                                  | Media above configurable size threshold                                 |
| Tools: Forms Summary       | `GET /admin/tools/forms-summary`                                | All forms with submission counts                                        |
| Tools: Form Export         | `GET /admin/tools/form-submissions-export`                      | CSV export of all form submissions                                      |
| Tools: Search Index        | `GET /admin/tools/search-index-summary`                         | Search index count, last updated, indexed collections                   |
| Navigation                 | `GET /api/navigation`                                           | Dynamic sidebar nav based on Navigation Settings global                 |
| Revalidate                 | `POST /api/revalidate`                                          | On-demand ISR cache revalidation                                        |
| Seed                       | `POST /api/seed`                                                | Trigger seed data from admin dashboard                                  |
| Reset                      | `POST /api/reset-data`                                          | Clear seed data                                                         |
| Collection Manager         | `GET/POST /api/collection-manager`                              | Manage dynamic content type definitions                                 |
| Collection Templates       | `GET /api/collection-templates`                                 | Get and apply page/post/product templates                               |
| Taxonomy                   | `GET /api/taxonomy`                                             | Hierarchical tag/category tree                                          |
| Save Block to Library      | `POST /api/save-block-to-library`                               | Save page block as Block Library entry                                  |
| Clear Cache                | `POST /api/clear-cache`                                         | Trigger full ISR revalidation                                           |
| Version                    | `GET /api/version`                                              | Returns current platform version                                        |

---

## 13. Developer Experience

| Feature                                              | Vanilla  |                        Opace                        |
| ---------------------------------------------------- | :------: | :-------------------------------------------------: |
| One-command setup                                    |    ❌    |                ✅ `make quickstart`                 |
| Environment auto-setup                               |    ❌    |                 ✅ `make env-setup`                 |
| Makefile with 30+ commands                           |    ❌    |                         ✅                          |
| Docker Compose for PostgreSQL                        |    ✅    |                         ✅                          |
| db-fresh (nuke DB in seconds)                        |    ❌    |                         ✅                          |
| db-fresh-migrations (production-safe reset)          |    ❌    |                         ✅                          |
| CLI seed command                                     |    ❌    |                  ✅ `make db-seed`                  |
| Preset-specific CLI seed                             |    ❌    | ✅ `make seed-blog / seed-archive / seed-ecommerce` |
| Seed with media downloads                            |    ❌    |              ✅ `make seed-with-media`              |
| Drizzle Studio                                       |    ❌    |                 ✅ `make db-studio`                 |
| Railway auto-deploy                                  | ✅ Basic |            ✅ + `start.sh` safety checks            |
| `feature_settings` table auto-created on boot        |    ❌    |           ✅ Idempotent SQL in `start.sh`           |
| Dual frontend (Next.js + Astro)                      |    ❌    |  ✅ Both included, framework selector in Settings   |
| Monorepo (pnpm workspaces)                           |    ❌    |                         ✅                          |
| Shared packages (types, UI, templates)               |    ❌    |                         ✅                          |
| Collection template system (16 base templates)       |    ❌    |                         ✅                          |
| Site preset system (blog/brochure/archive/ecommerce) |    ❌    |                         ✅                          |
| AGENT_CONTRACT.md (developer guidelines)             |    ❌    |                         ✅                          |
| TypeScript types auto-generated                      |    ❌    |              ✅ `make generate-types`               |
| Revalidation secret auto-generated on first save     |    ❌    |       ✅ via `crypto.getRandomValues()` hook        |
| Frontend URL auto-populated from Site URL            |    ❌    |            ✅ via `beforeValidate` hook             |

---

## 14. Pre-Installed & Pre-Configured Plugins

| Plugin                           | Vanilla (website template) |                           Opace                            |
| -------------------------------- | :------------------------: | :--------------------------------------------------------: |
| SEO (`@payloadcms/plugin-seo`)   |          ✅ Basic          | ✅ Extended with bulk editor, templates, advanced settings |
| Form Builder                     |             ✅             |             ✅ + Forms tool page + CSV export              |
| Redirects                        |             ✅             |                  ✅ + Redirects tool page                  |
| Search                           |             ✅             |                ✅ + Search index tool page                 |
| Nested Docs (parent/child pages) |             ❌             |                             ✅                             |
| S3 Cloud Storage                 |             ❌             |          ✅ Pre-configured, optional via env var           |
| Live Preview React               |             ❌             |                             ✅                             |
| GraphQL                          |             ❌             |            ✅ + API Explorer shortcut in Tools             |

---

## 15. Skin System (11 Visual Themes)

No equivalent in vanilla Payload.

| Skin          | Opace |
| ------------- | :---: |
| Minimal       |  ✅   |
| Editorial     |  ✅   |
| SaaS          |  ✅   |
| Soft          |  ✅   |
| Bold          |  ✅   |
| Monochrome    |  ✅   |
| Glass         |  ✅   |
| High Contrast |  ✅   |
| Neon Grid     |  ✅   |
| Agency        |  ✅   |
| Retro         |  ✅   |

Default skin and default mode (light/dark/system) are selectable in the Settings global — no code changes required.

---

## 16. Presets & Site Types

| Preset                    | Vanilla |                        Opace                        |
| ------------------------- | :-----: | :-------------------------------------------------: |
| Blog                      |   ❌    |            ✅ Pages + Posts + Categories            |
| Brochure site             |   ❌    |                    ✅ Pages only                    |
| Archive / Museum          |   ❌    |     ✅ Pages + Archive Items + People + Places      |
| Ecommerce                 |   ❌    |      ✅ Pages + Products + Product Categories       |
| Scaffold via Makefile     |   ❌    |   ✅ `make blog / brochure / archive / ecommerce`   |
| Seed preset-specific data |   ❌    | ✅ `make seed-blog / seed-archive / seed-ecommerce` |

---

## Summary: What a Developer Must Build in Vanilla Payload to Match This Platform

| You need                        | In Vanilla Payload                                            | Opace Platform                        |
| ------------------------------- | ------------------------------------------------------------- | ------------------------------------- |
| More than 5 collections         | Build every schema from scratch                               | ✅ 25 collections included            |
| Useful admin dashboard          | Build custom React view + data fetching + wiring              | ✅ Included                           |
| Block library                   | Design system + collection + UI + endpoint + inline picker    | ✅ Included                           |
| Reusable blocks                 | Architecture decision + build UI                              | ✅ Included + 1-click Save to Library |
| Seed data for any collection    | Write per-collection seed scripts                             | ✅ Dashboard panel, all collections   |
| On-demand cache revalidation    | Write endpoint + hook on every collection + frontend listener | ✅ Included                           |
| Navigation control without code | Write global + endpoint + sidebar override                    | ✅ Included                           |
| Feature flags                   | Write global + conditional logic everywhere                   | ✅ Included                           |
| SEO bulk editor                 | Full custom admin page + paginated API + conflict detection   | ✅ Included                           |
| Publishing calendar             | Custom endpoint + filterable date UI                          | ✅ Included                           |
| Orphaned media finder           | Write crawler that walks all collection + global fields       | ✅ Included                           |
| Form submission CSV export      | Custom endpoint + streaming CSV generator                     | ✅ Included                           |
| Two-panel sidebar               | Custom admin layout + state management                        | ✅ Included                           |
| 11 CSS themes                   | Build CSS token architecture for each                         | ✅ Included                           |
| Dynamic content types           | Design CPT architecture + admin UI + preview links            | ✅ Included                           |
| One-command project setup       | Write Makefile + Docker + scripts                             | ✅ Included                           |
| Railway safety boot checks      | Write `start.sh` + idempotent SQL                             | ✅ Included                           |

---

> _"When your previous agency handed you a vanilla Payload install, they handed you a framework — not a product. Every capability above required custom development on top of that base install. The Opace Headless CMS Platform ships all of it as standard."_

---

_Opace Digital Agency · [opace.agency](https://opace.agency) · Birmingham, UK_
