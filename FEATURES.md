# Opace Headless CMS Platform vs. Vanilla Payload CMS

### Feature Comparison & USPs

> **Context**: Vanilla Payload CMS (the official "website" starter template — the most feature-complete starting point Payload ships) is compared against the Opace Headless CMS Platform. This is not a comparison against a plain `npx create-payload-app` blank install — that ships with even less.

---

## The Short Version

|                                       | Vanilla Payload (Website Template) | Opace Headless CMS Platform |
| ------------------------------------- | :--------------------------------: | :-------------------------: |
| Collections out of the box            |               **5**                |           **25**            |
| Content blocks                        |               **7**                |           **28**            |
| Globals (settings pages)              |               **3**                |            **7**            |
| Custom admin dashboard                |                 ❌                 |             ✅              |
| Block library (reusable blocks)       |                 ❌                 |      ✅ 10 pre-seeded       |
| Sample data / seed system             |                 ❌                 |     ✅ All collections      |
| Two-panel collapsible sidebar         |                 ❌                 |             ✅              |
| Dark / light theme toggle             |                 ❌                 |             ✅              |
| Navigation control panel              |                 ❌                 |    ✅ (admin-controlled)    |
| Feature flags (no-code toggle)        |                 ❌                 |             ✅              |
| Tools & SEO audit page                |                 ❌                 |             ✅              |
| Visual template gallery               |                 ❌                 |             ✅              |
| One-command setup                     |                 ❌                 |    ✅ `make quickstart`     |
| Railway auto-deploy + safety checks   |                 ❌                 |             ✅              |
| Dual frontend (Next.js + Astro)       |                 ❌                 |             ✅              |
| Dynamic content types (no restarts)   |                 ❌                 |             ✅              |
| Save block to library (1-click)       |                 ❌                 |             ✅              |
| Ecommerce collections ready           |                 ❌                 |             ✅              |
| Archive / museum collections ready    |                 ❌                 |             ✅              |
| People, events, locations collections |                 ❌                 |             ✅              |
| On-demand cache revalidation          |                 ❌                 |             ✅              |
| Clear cache button in admin           |                 ❌                 |             ✅              |

---

## 1. Collections

Vanilla Payload's website template ships with just enough to prove the concept works. Everything beyond that requires a developer to build from scratch.

| Collection          | Vanilla Payload | Opace Platform | Notes                                                            |
| ------------------- | :-------------: | :------------: | ---------------------------------------------------------------- |
| Pages               |       ✅        |       ✅       |                                                                  |
| Posts               |       ✅        |       ✅       |                                                                  |
| Categories          |       ✅        |       ✅       |                                                                  |
| Media               |       ✅        |       ✅       | Opace: custom file size cell, generated sizes cell               |
| Users               |       ✅        |       ✅       | Opace: role-based access, extended profile                       |
| Tags                |       ❌        |       ✅       | Full taxonomy with parent/child hierarchy                        |
| Events              |       ❌        |       ✅       | Type, date range, location field                                 |
| People              |       ❌        |       ✅       | Bio, DOB, nationality, roles, coordinates                        |
| Places              |       ❌        |       ✅       | Coordinates, country, region, featured media                     |
| Locations           |       ❌        |       ✅       | Address, opening hours, email, phone, map embed                  |
| Archive Items       |       ❌        |       ✅       | Museum/archive catalogue with item type, date, origin, condition |
| FAQs                |       ❌        |       ✅       | Question, rich text answer, category grouping                    |
| Testimonials        |       ❌        |       ✅       | Quote, author, role, company, star rating                        |
| Logo Clouds         |       ❌        |       ✅       | Named logo groups with URLs                                      |
| Block Library       |       ❌        |       ✅       | Named reusable block instances, referenced across pages          |
| Global Blocks       |       ❌        |       ✅       | Site-wide content sections with full block layout                |
| Content Types       |       ❌        |       ✅       | Dynamic content type definitions (WordPress-style CPT)           |
| Custom Items        |       ❌        |       ✅       | Instances of dynamic content types — all in one table            |
| Products            |       ❌        |       ✅       | Ready to activate via Feature Settings                           |
| Product Categories  |       ❌        |       ✅       | Ready to activate via Feature Settings                           |
| Product Collections |       ❌        |       ✅       | Ready to activate via Feature Settings                           |
| Product Reviews     |       ❌        |       ✅       | Ready to activate via Feature Settings                           |
| Orders              |       ❌        |       ✅       | Ready to activate via Feature Settings                           |
| Carts               |       ❌        |       ✅       | Ready to activate via Feature Settings                           |
| **Total**           |      **5**      |     **25**     |                                                                  |

---

## 2. Content Blocks

Vanilla Payload's blocks are minimal and largely developer-facing (e.g. a Code block that renders a code snippet). The Opace platform ships with a full production block library.

| Block                        | Vanilla Payload | Opace Platform | Notes                                                             |
| ---------------------------- | :-------------: | :------------: | ----------------------------------------------------------------- |
| Hero                         |       ✅        |       ✅       | Opace: overlay style, dark/light, check items, multi-CTA          |
| Content (rich text)          |       ✅        |       ✅       | Opace: column layouts, background colour, padding control         |
| CTA (Call to Action)         |       ✅        |       ✅       | Opace: banner variant, dual buttons, colour options               |
| Media block                  |       ✅        |       ✅       |                                                                   |
| Archive (collection listing) |       ✅        |       ✅       | Opace: any collection, pagination, filters                        |
| Form (form builder)          |       ✅        |       ✅       |                                                                   |
| Banner                       |       ✅        |       ❌       | Merged into CTA with variants                                     |
| Code                         |       ✅        |       ❌       | Not relevant for most client sites                                |
| Related Posts                |       ✅        |       ❌       | Handled via Archive block                                         |
| Features                     |       ❌        |       ✅       | Icon grid with TRC variants: trust bar, 10 reasons, process steps |
| Stats                        |       ❌        |       ✅       | Value, label, description — 4-column row                          |
| Testimonials                 |       ❌        |       ✅       | Cards with star rating, carousel and grid variants                |
| FAQ accordion                |       ❌        |       ✅       | Q&A collapsible list                                              |
| Team                         |       ❌        |       ✅       | Staff cards with bio and social links                             |
| Gallery                      |       ❌        |       ✅       | Grid/masonry/carousel/lightbox, 2–4 columns, captions             |
| Pricing                      |       ❌        |       ✅       | Tier cards with feature lists, featured plan highlight            |
| Grid                         |       ❌        |       ✅       | Flexible card grid for any repeating content                      |
| Timeline                     |       ❌        |       ✅       | Chronological vertical or horizontal layout                       |
| Logo cloud                   |       ❌        |       ✅       | Branded partner/client logo grid                                  |
| Quote                        |       ❌        |       ✅       | Pull quote with attribution                                       |
| Spacer / Divider             |       ❌        |       ✅       | Vertical spacing and separator lines                              |
| Embed                        |       ❌        |       ✅       | Responsive iframe (YouTube, maps, etc.)                           |
| Custom HTML                  |       ❌        |       ✅       | Raw HTML for advanced use                                         |
| Reusable Block               |       ❌        |       ✅       | Reference a Block Library entry inline                            |
| Posts block                  |       ❌        |       ✅       | Latest posts widget                                               |
| Contact Form                 |       ❌        |       ✅       | Extended form with map embed support                              |
| Video Feature                |       ❌        |       ✅       | Video + caption with thumbnail                                    |
| Social Links                 |       ❌        |       ✅       | Icon-based social link row                                        |
| **Total**                    |      **7**      |     **28**     |                                                                   |

---

## 3. Globals (Settings Pages)

| Global                            | Vanilla Payload | Opace Platform |
| --------------------------------- | :-------------: | :------------: |
| Header                            |       ✅        |       ✅       |
| Footer                            |       ✅        |       ✅       |
| Settings (site name, description) |       ✅        |       ✅       |
| Navigation Settings               |       ❌        |       ✅       |
| Feature Settings                  |       ❌        |       ✅       |
| Page Templates                    |       ❌        |       ✅       |
| Block Template Builder            |       ❌        |       ✅       |
| **Total**                         |      **3**      |     **7**      |

---

## 4. Admin Interface

This is where the real-world difference shows up. Vanilla Payload's admin works but is a blank slate — exactly what you'd expect from an open-source framework.

| Feature                     |    Vanilla Payload    |                                                 Opace Platform                                                  |
| --------------------------- | :-------------------: | :-------------------------------------------------------------------------------------------------------------: |
| **Dashboard**               | Default stats widget  |  Custom dashboard with collection counts, recent updates, drafts, quick-create buttons, site config shortcuts   |
| **Sample Data Manager**     |        ❌ None        |              ✅ Collapsible panel — seed, re-seed, or clear individual collections or all at once               |
| **Sidebar navigation**      | Standard single-panel | ✅ Two-panel: collapsible icon sidebar + section grouping (Collections, Content, Forms, Media, Settings, Admin) |
| **Navigation control**      |  Hardcoded in config  |         ✅ Admin-controlled via Navigation Settings global — enable/disable any collection without code         |
| **Theme toggle**            |          ❌           |                                  ✅ Dark/light mode, persists across sessions                                   |
| **Global search**           |          ❌           |                      ✅ Keyboard-driven search across all content, settings, and nav items                      |
| **Tools page**              |          ❌           |                         ✅ Publishing calendar, SEO audit, media management, user admin                         |
| **Block icons**             |          ❌           |                             ✅ Every block has a matching icon in the block picker                              |
| **Visual template gallery** |          ❌           |                        ✅ Browse and apply page layouts visually — auto-populates blocks                        |
| **Save block to library**   |          ❌           |                            ✅ One-click save of any page block to the Block Library                             |
| **Preview button cells**    |          ❌           |                 ✅ Per-row preview links on Archive Items, Events, People, Places, Custom Items                 |
| **Clear cache button**      |          ❌           |                            ✅ Admin UI button to trigger on-demand ISR revalidation                             |
| **Version display**         |          ❌           |                              ✅ Shows current platform version in the admin footer                              |
| **Sticky bottom bar**       |          ❌           |                             ✅ Context-aware sticky action bar in collection forms                              |

---

## 5. Content Features

| Feature                          |    Vanilla Payload    |                          Opace Platform                          |
| -------------------------------- | :-------------------: | :--------------------------------------------------------------: |
| Version history                  |          ✅           |                                ✅                                |
| Draft / publish workflow         |          ✅           |                                ✅                                |
| Live preview                     |    ✅ (configured)    |                                ✅                                |
| SEO fields                       |      Plugin only      | ✅ Custom SEO global + per-collection meta fields with templates |
| SEO audit endpoint               |          ❌           |    ✅ `/api/seo` — checks title, description, og tags, scores    |
| SEO templates                    |          ❌           |         ✅ Auto-suggested title/description from content         |
| On-demand cache revalidation     | Requires custom setup |   ✅ `/api/revalidate` endpoint, wired to all collection hooks   |
| Redirects                        |        Plugin         |            ✅ Plugin pre-installed + admin accessible            |
| Search                           |        Plugin         |                     ✅ Plugin pre-installed                      |
| Form builder                     |        Plugin         |                     ✅ Plugin pre-installed                      |
| Nested docs (parent/child pages) |        Plugin         |                     ✅ Plugin pre-installed                      |
| Sitemap                          |      Via package      |                 ✅ Pre-configured in Astro build                 |
| Rich text (Lexical)              |          ✅           |           ✅ With custom helper functions for seeding            |

---

## 6. Dynamic Content Types (WordPress-Style CPTs)

This is a flagship feature with **no Payload equivalent** out of the box.

| Feature                                                     | Vanilla Payload | Opace Platform |
| ----------------------------------------------------------- | :-------------: | :------------: |
| Create custom content types from admin UI                   | ❌ (code only)  |       ✅       |
| No server restart required                                  |       ❌        |       ✅       |
| Template selection (Archive Item, Product, Person, etc.)    |       ❌        |       ✅       |
| Custom fields per type                                      |       ❌        |       ✅       |
| Items stored in shared table (WordPress `wp_posts` pattern) |       ❌        |       ✅       |
| Preview links for custom types                              |       ❌        |       ✅       |
| Custom list header with type filter                         |       ❌        |       ✅       |

---

## 7. Block Library & Reusable Blocks

| Feature                           | Vanilla Payload |                                                 Opace Platform                                                  |
| --------------------------------- | :-------------: | :-------------------------------------------------------------------------------------------------------------: |
| Block Library collection          |       ❌        |                                                       ✅                                                        |
| 10 pre-seeded block templates     |       ❌        | ✅ Hero, Trust Bar, 10 Reasons, Testimonials Carousel, CTA Banner, Process Steps, Stats Row, Gallery, FAQ, Team |
| Reference library blocks in pages |       ❌        |                           ✅ Via `sharedBlocks` array + `Reusable Block` inline block                           |
| Save any page block to library    |       ❌        |                                      ✅ One-click "Save to Library" button                                      |
| Global Blocks collection          |       ❌        |                           ✅ Site-wide sections (e.g. newsletter CTA, header banner)                            |
| Block Template Builder global     |       ❌        |                                                       ✅                                                        |

---

## 8. Feature Settings (No-Code Module Control)

No equivalent exists in vanilla Payload. Feature flags require code changes.

| Feature                            | Vanilla Payload |   Opace Platform   |
| ---------------------------------- | :-------------: | :----------------: |
| Enable/disable Pages module        |   Code change   | ✅ Toggle in admin |
| Enable/disable Blog/Posts module   |   Code change   | ✅ Toggle in admin |
| Enable/disable FAQs module         |   Code change   | ✅ Toggle in admin |
| Enable/disable Testimonials module |   Code change   | ✅ Toggle in admin |
| Enable/disable People module       |   Code change   | ✅ Toggle in admin |
| Enable/disable Events module       |   Code change   | ✅ Toggle in admin |
| Enable/disable Locations module    |   Code change   | ✅ Toggle in admin |
| Enable/disable Block Library       |   Code change   | ✅ Toggle in admin |

---

## 9. Developer Experience & Setup

| Feature                                 |    Vanilla Payload     |                         Opace Platform                         |
| --------------------------------------- | :--------------------: | :------------------------------------------------------------: |
| One-command local setup                 | ❌ (multi-step manual) |                      ✅ `make quickstart`                      |
| Environment setup automation            |           ❌           | ✅ `make env-setup` copies `.env.example` and creates symlinks |
| Database migration automation           |         Manual         |                      ✅ `make db-migrate`                      |
| Sample data seed from CLI               |           ❌           |            ✅ `make db-seed` or via admin dashboard            |
| Makefile with 30+ commands              |           ❌           |                               ✅                               |
| Dual frontend (Next.js + Astro)         | ❌ (one or the other)  |                        ✅ Both included                        |
| Monorepo structure                      |           ❌           |                       ✅ pnpm workspaces                       |
| Docker Compose for local Postgres       | ✅ (website template)  |                               ✅                               |
| Railway deployment ready                |       ✅ (basic)       |                ✅ + safety checks in `start.sh`                |
| `feature_settings` auto-created on boot |           ❌           |             ✅ Idempotent SQL check in `start.sh`              |
| Drizzle migrations pre-configured       |           ❌           |                               ✅                               |
| `db-fresh` (nuke + rebuild in seconds)  |           ❌           |                               ✅                               |
| TypeScript types pre-generated          |           ❌           |                               ✅                               |
| Collection template system              |           ❌           |         ✅ 16 base templates for scaffolding new types         |
| Export templates button                 |           ❌           |                               ✅                               |

---

## 10. Plugins Pre-Installed

Vanilla Payload's website template includes some plugins but they require individual wiring. The Opace platform ships all of these pre-installed, pre-configured, and admin-accessible.

| Plugin                     | Vanilla Payload |                   Opace Platform                   |
| -------------------------- | :-------------: | :------------------------------------------------: |
| SEO                        |   ✅ (basic)    | ✅ Extended with custom templates + audit endpoint |
| Form Builder               |       ✅        |                         ✅                         |
| Redirects                  |       ✅        |                         ✅                         |
| Search                     |       ✅        |                         ✅                         |
| Nested Docs (parent/child) |       ❌        |                         ✅                         |
| S3 Cloud Storage           |       ❌        |            ✅ Pre-configured, optional             |
| Live Preview React         |       ❌        |                         ✅                         |
| GraphQL                    |       ❌        |                         ✅                         |

---

## 11. Presets & Quick-Start Site Types

| Preset                | Vanilla Payload |                   Opace Platform                   |
| --------------------- | :-------------: | :------------------------------------------------: |
| Blog                  |       ❌        |           ✅ Pages + Posts + Categories            |
| Brochure site         |       ❌        |                   ✅ Pages only                    |
| Archive / Museum      |       ❌        |     ✅ Pages + Archive Items + People + Places     |
| Ecommerce             |       ❌        |      ✅ Pages + Products + Product Categories      |
| Scaffold via Makefile |       ❌        | ✅ `make blog` / `make archive` / `make ecommerce` |

---

## Summary: What Developers Must Build Themselves in Vanilla Payload

When your previous agency handed you a vanilla Payload install, they handed you a framework — not a product. Everything in the right-hand column below required custom development work on top of that install:

| You Needed                      | Vanilla Payload | How Much Custom Dev Required                          |
| ------------------------------- | :-------------: | ----------------------------------------------------- |
| More than 5 content types       |       ❌        | Build each collection from scratch                    |
| A useful admin dashboard        |       ❌        | Custom React component, data fetching, wiring         |
| Seed / sample data              |       ❌        | Write seeding scripts per collection                  |
| Reusable blocks                 |       ❌        | Design Block Library system, build UI, wire endpoints |
| Navigation control without code |       ❌        | Custom global, endpoint, sidebar override             |
| Feature flags                   |       ❌        | Custom global + conditional logic throughout          |
| Two-panel sidebar               |       ❌        | Custom admin layout, state management                 |
| On-demand revalidation          |       ❌        | Custom endpoint + hooks on every collection           |
| SEO audit tooling               |       ❌        | Custom endpoint with scoring logic                    |
| One-command setup               |       ❌        | Makefile, scripts, Docker config                      |
| Railway safety boot checks      |       ❌        | Custom `start.sh` with idempotent SQL                 |

**The Opace Headless CMS Platform ships all of this as standard.** It is not a vanilla Payload install. It is a productised, opinionated platform built on top of Payload, designed for rapid multi-site deployment with everything a content team and developer team needs from day one.

---

_Generated: February 2026 · Opace Digital Agency · [opace.agency](https://opace.agency)_
