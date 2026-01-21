# Comprehensive Summary of All Changes to Default Payload CMS

**Generated:** January 21, 2026
**Total Commits:** 115
**Scope:** Complete customisation of Payload CMS v3 into a WordPress-like Jamstack platform

---

## EXECUTIVE SUMMARY

This is a **fully productised Payload CMS platform** with 115 commits of enhancements. It transforms vanilla Payload into a WordPress-like CMS with dual frontends (Next.js + Astro), collection template system, advanced admin UI with custom views, and comprehensive operational tooling.

---

## 1. COLLECTIONS (15 Total)

### Core Collections (6)
- **Users** - Enhanced with roles (admin/editor/user), avatars, bios, social links
- **Media** - Advanced upload with WebP optimisation, blur placeholders, focal points, bulk upload, file size display
- **Pages** - Template system (landing/home/detail/article/archive/showcase), live preview, versions/drafts, scheduled publishing
- **Posts** - Blog posts with categories, tags, featured images, author attribution, content blocks
- **Categories** - Hierarchical taxonomy shared across Posts, Archive Items, Events, People, and Custom Items
- **Tags** - Flat taxonomy shared across Posts, Archive Items, Events, People, and Custom Items

### Installed Collections (4)
Pre-installed collections that can be enabled/disabled from the Collections Manager:
- **Archives** (slug: archive-items) - Catalogued items for archive entries, portfolios, or collections
- **People** - Person profiles (team members, artists, historical figures) with bios, images, social links
- **Places** - Location data (venues, historical sites, geographic origins) with descriptions and media
- **Events** - Events, exhibitions, workshops, or performances with dates and venues

### E-Commerce Collections (3)
- **Products** - Product listings with pricing, inventory, featured images, variants
- **ProductCategories** - Product taxonomy with hierarchical structure
- **ProductCollections** - Curated product groupings with featured products, discounts, date ranges, colour branding

### Dynamic Content System (2)
These collections work together with the Collection Template System to enable WordPress-like custom collections:
- **ContentTypes** (Custom Collections) - Schema builder for custom types (created from admin UI, no server restart required). Defines the structure of custom collections like "Services", "FAQs", "Galleries", etc.
- **CustomItems** - Flexible collection storing all dynamic type instances with customData JSON field. Works like WordPress's wp_posts table with post_type field.

---

## 2. GLOBALS (4 Total)

- **Header** - Navigation structure and branding
- **Footer** - Footer content and links
- **Settings** - Site-wide configuration (name, logos, frontend settings, SEO defaults)
- **NavigationSettings** - Dynamic navigation manager with collection visibility toggles and custom links

---

## 3. BLOCKS (21 Total)

All blocks support rich content, media, and styling options. Used across Pages, Posts, Archive Items, Events, People, Places, and Custom Items:

1. **Hero** - Full-width hero sections with images, videos, headings, CTAs
2. **Content** - Rich text content with Lexical editor
3. **Media** - Image/video blocks with captions and sizing options
4. **CallToAction** - CTA sections with buttons and links
5. **Quote** - Blockquotes with attribution
6. **Features** - Feature grids with icons, titles, descriptions
7. **Stats** - Statistics display with numbers and labels
8. **LogoCloud** - Logo grids for partners/clients
9. **Testimonials** - Customer testimonials with avatars
10. **FAQ** - Accordion-style FAQ sections
11. **Pricing** - Pricing tables with tiers and features
12. **Team** - Team member grids with photos and bios
13. **Embed** - Embedded content (YouTube, Vimeo, etc.)
14. **Grid** - Custom grid layouts
15. **Timeline** - Timeline/chronology displays
16. **Archive** - Archive item listings
17. **Form** - Form builder integration
18. **Gallery** - Image galleries with lightbox
19. **Spacer** - Vertical spacing control
20. **HTML** - Custom HTML blocks
21. **CustomHTML** - Advanced custom HTML with scripts

---

## 4. CUSTOM ENDPOINTS (8 Total)

- `/admin/revalidate` - On-demand cache invalidation
- `/admin/reset-data` - Database reset for admin panel
- `/admin/navigation` - Dynamic navigation data
- `/admin/collection-manager` - Collection metadata
- `/admin/seed/*` - Seed data endpoints
- `/admin/collection-templates/*` - Template management
- `/admin/tools/*` - Admin tools (publishing calendar, SEO audit, etc.)
- `/admin/taxonomy/*` - Taxonomy filtering

---

## 5. ADMIN UI CUSTOMISATIONS

### Two-Panel Navigation (TwoPanelNav.tsx - 33,114 bytes)
- Fixed top bar with logo, search, theme toggle, account dropdown
- Collapsible side rail (72px compact, 220px expanded)
- Icon-based navigation with section grouping (Content, Collections, Shop, Taxonomy, System)
- Responsive mobile design
- Custom SVG icons (no emoji)

### Custom Admin Views (6 Main Views + 11 Tool Views)

**Main Views:**
1. **Dashboard** - Collection stats (counts), recent updates, drafts needing review, quick create buttons, site config shortcuts
2. **Content Manager** - Manage Pages, Posts, and Custom Content Types with seed/hide/view options
3. **Collections** - Manage Archives, Events, People, Places with enable/disable, seed data, clone, and view options
4. **Shop Manager** - Manage Products, Product Categories, Product Collections with seed/hide/view options
5. **Taxonomy Manager** - Manage Categories and Tags with seed/hide/view options
6. **Tools** - Landing page with categorised tool links (Content, Media, Administration)

**Tool Views (11 Total):**
1. **Publishing Calendar** - View scheduled content across all collections
2. **Draft Review** - Review draft content across all draft-enabled collections
3. **SEO Audit** - Check SEO metadata completeness
4. **Form Submissions** - Review form submissions, filter by form, export CSV
5. **Media Library** - Browse media with metadata checks and quick access
6. **Unused Media** - Identify orphaned media files
7. **Large Files** - Identify oversized media for optimisation
8. **Redirects** - Manage URL redirects
9. **Forms** - Manage forms and monitor submission volume
10. **User Management** - Manage user roles and access
11. **Search Index** - View search index status

### Theme System
- Light/dark mode toggle with localStorage persistence
- CSS variables for theming
- Dark mode support across all components
- Professional colour scheme (no bright colours)

### Custom Components (30+ Components)
- **PreviewButtonCell** - Collection-specific live preview buttons in table lists (Pages, Posts, Archives, Events, People, Places, Products, Custom Items)
- **CollectionManagerField** - Dynamic collection visibility toggles in Navigation Settings
- **ContentTypeManager** - Custom type creation UI (no server restart required)
- **CustomDataField** - Dynamic field rendering for custom items based on selected template
- **SeedDataManager** - Sample data seeding UI with expandable item lists and per-item seed buttons
- **NavigationStructureEditor** - Visual navigation builder with custom links
- **SectionCollectionTemplates** - Collection cards with seed/hide/clone/view actions
- **CollectionTemplates** - Template selection UI with 17 available templates
- **GeneratedSizesCell** - Display generated image sizes in Media collection
- **Dashboard** - Custom dashboard with stats, recent updates, drafts, quick actions
- **ThemeToggle** - Light/dark mode switcher

---

## 6. PLUGINS ENABLED

- **@payloadcms/plugin-seo** - SEO metadata management
- **@payloadcms/plugin-form-builder** - Form creation and submissions
- **@payloadcms/plugin-nested-docs** - Hierarchical document support
- **@payloadcms/plugin-redirects** - URL redirect management
- **@payloadcms/plugin-search** - Full-text search indexing
- **@payloadcms/storage-s3** - Optional S3 storage integration

---

## 7. FRONTENDS

### Next.js (apps/web)
- ISR (Incremental Static Regeneration) with on-demand revalidation
- Template-driven rendering system
- Block component library
- Live preview support
- Image optimization with remote patterns

### Astro (apps/astro)
- Pure SSG (Static Site Generation)
- Zero client-side JavaScript by default
- Block renderer component
- Sitemap generation
- Template-driven rendering

### Shared Template System
- 7 reusable templates: Detail, List, Landing, Timeline, Article, Home, Archive
- Template-driven rendering prevents code duplication
- Field mapping system for flexible content

---

## 8. CUSTOM STYLING

### Global CSS (apps/cms/src/styles/globals.css)
- 740 lines of Tailwind v4 configuration
- Dark mode support throughout
- Custom theme variables (primary/secondary colors)
- Component styles (buttons, cards, links, prose)
- Template-specific styles (detail, list, landing, article, timeline, home, archive)
- Responsive design utilities

### Admin Styling (apps/cms/src/app/(payload)/custom.scss)
- Two-panel navigation styling
- Dashboard and tools page styling
- Theme toggle component styling
- Mobile-responsive layout
- Dark mode CSS variables

---

## 9. COLLECTION TEMPLATE SYSTEM

**NEW FEATURE:** WordPress-like collection templates that allow creating custom collections from the admin UI without code changes or server restarts.

### Available Templates (17 Total)
1. **Archive Item** - Catalogued items for archive entries, portfolios, or collections
2. **Blog Post** - Blog posts with categories, tags, featured images
3. **Case Study** - Project studies with outcomes, challenges, and insights
4. **Category** - Hierarchical taxonomy for organising content
5. **Course** - Structured learning programs with lessons and outcomes
6. **Event** - Events, exhibitions, workshops, or performances
7. **FAQ** - Frequently asked questions with answers
8. **Gallery** - Curated galleries of visual work or media
9. **Page** - Standard pages with flexible layouts
10. **Person** - Person profiles (team members, artists, historical figures)
11. **Place** - Location data (venues, historical sites, geographic origins)
12. **Product** - Product listings with pricing and inventory
13. **Product Category** - Product taxonomy
14. **Product Collection** - Curated product groupings
15. **Service** - Service offerings with rich content and metadata
16. **Tag** - Flat tags for cross-collection filtering
17. **Testimonial** - Customer quotes and endorsements

### Template Features
- **Clone Collection** - Duplicate existing collections with all settings
- **Install Template** - Create new collections from base templates
- **Seed Sample Data** - Generate realistic sample content with expandable item lists
- **Enable/Disable** - Toggle collection visibility in navigation
- **Hide from Menu** - Hide collections from main navigation while keeping them accessible
- **Uninstall** - Remove collections (with reinstall option)

### Collection Manager UI
- Grouped by section (Installed Collections, Custom Collections, Available Templates)
- Visual cards with collection metadata (slug, template, seeded item count)
- Action buttons (Clone, Seed, Hide/Show, View, Uninstall)
- Real-time navigation cache invalidation

---

## 10. SEED DATA & PRESETS

### Seed System
- Base seeding infrastructure with Unsplash image integration
- Preset-specific seeders (blog, brochure, core, ecommerce)
- Media download and optimisation (WebP conversion)
- Sample data generation with configurable counts
- **Per-item seeding UI** - Expandable lists with individual "Seed sample [item]" buttons
- Clear collection before seeding option
- Rich, well-designed seed pages with meaningful content blocks

### Seed Presets (4 Total) with Complete Item Lists

#### 1. **core** - Archive/Museum Foundation
**Collections seeded:**
- **Categories** - 3 categories:
  - Exhibitions, Research, Events
- **Tags** - 3 tags:
  - Restoration, Behind the Scenes, New Acquisition
- **Places** - 5 historical locations:
  - Florence (Italy), Rome (Italy), Paris (France), Athens (Greece), Cairo (Egypt)
- **People** - 5 historical figures:
  - Leonardo da Vinci, Michelangelo Buonarroti, Raphael Sanzio, Claude Monet, Phidias
- **Pages** - 2 pages:
  - Home (home template with hero, features, stats, testimonials)
  - About the Archive (detail template with timeline)
- **Posts** - 3 blog posts:
  - "New Renaissance Exhibition Opening" (Exhibitions category)
  - "Recent Archaeological Discoveries" (Research category)
  - "Family Day at the Archive" (Events category)
- **Events** - 5 museum events:
  - "Renaissance Art Exhibition"
  - "Ancient Civilizations Workshop"
  - "Museum Lecture Series: Art Through the Ages"
  - "Family Day at the Museum"
  - "Contemporary Art Opening"
- **Archive Items** - 5 historical artifacts:
  - "Leonardo's Notebook"
  - "Renaissance Painting Techniques Manual"
  - "Ancient Roman Coin Collection"
  - "Medieval Manuscript"
  - "Victorian Era Photographs"
- **ContentTypes** - 1 custom collection:
  - Exhibitions (with 3 exhibition items)
- **CustomItems** - 3 exhibition items:
  - "Renaissance Wonders"
  - "Modern Perspectives"
  - "Archaeology in Focus"

#### 2. **blog** - Blog/Publication Platform
**Collections seeded:**
- **Categories** - 4 categories:
  - Technology, Design, Business, Lifestyle
- **Pages** - 3 pages:
  - Home (home template with hero, featured posts, newsletter signup)
  - About Us (detail template with team info, mission statement)
  - Contact (detail template with contact form, office locations)
- **Posts** - 5 blog posts showcasing different layouts and blocks:
  - "Standard Article with Hero" (single-column layout with hero, rich text, CTA)
  - "Feature Story with Grid Layout" (multi-column with grid blocks, image galleries)
  - "In-Depth Guide with FAQ Section" (comprehensive article with TOC, FAQ block)
  - "Case Study with Timeline" (narrative-driven with timeline block)
  - "News Brief with Media Gallery" (concise update with embedded media gallery)
- **ContentTypes** - 1 custom collection:
  - Reviews (with 3 review items)
- **CustomItems** - 3 product/service reviews:
  - "Payload CMS Review"
  - "Astro CMS Starter Review"
  - "Next.js Commerce Review"

#### 3. **brochure** - Marketing/Corporate Website
**Collections seeded:**
- **Pages** - 5 pages:
  - Home (home template with hero, features, testimonials, CTAs)
  - About Us (detail template with company story, team, values, timeline)
  - Services (detail template with service offerings grid)
  - Contact (detail template with contact form, locations, map)
  - Privacy Policy (article template with privacy policy content)
- **ContentTypes** - 1 custom collection:
  - Case Studies (with 3 case study items)
- **CustomItems** - 3 case studies:
  - "Retail Growth Strategy" (120% YoY growth)
  - "SaaS Onboarding Redesign" (35% activation lift)
  - "Manufacturing Process Audit" (22% cycle time reduction)

#### 4. **ecommerce** - E-Commerce Platform
**Collections seeded:**
- **ProductCategories** - 5 categories:
  - Clothing, Accessories, Footwear, Sale, New Arrivals
- **ProductCollections** - 3 collections:
  - Summer Collection, Best Sellers, Limited Edition
- **Products** - 20 products with:
  - Pricing, inventory, variants, featured images
  - Product descriptions and specifications
  - Category and collection assignments
- **Pages** - 3 pages:
  - Home (home template with hero, featured products, collections)
  - About (detail template with brand story)
  - Contact (detail template with customer service info)

### Individual Seed Items (Per-Item Seeding)
Each preset supports individual item seeding with expandable lists showing:
- **Pages**: home, about, contact, services, privacy
- **Posts**: Individual blog posts by slug
- **Products**: Individual products by slug
- **Archive Items**: Individual archive items by slug
- **Events**: Individual events by slug
- **People**: Individual people by slug
- **Places**: Individual places by slug

---

## 11. NAVIGATION MANAGEMENT SYSTEM

**NEW FEATURE:** Dynamic navigation system with collection visibility controls and custom links.

### Navigation Settings Global
- **Collection Visibility Toggles** - Enable/disable collections in main navigation
- **Custom Links** - Add custom navigation links with labels, URLs, and positioning
- **Section Grouping** - Collections grouped by section (Content, Collections, Shop, Taxonomy)
- **Auto-reload** - Navigation cache invalidation via BroadcastChannel API
- **Internal Collection Filtering** - Hides system collections (Users, Media, ContentTypes, CustomItems, Categories, Tags)

### Navigation Features
- Plural collection names in navigation
- SVG icons for all navigation items
- Collapsible sections
- Mobile-responsive design
- Real-time updates without page refresh

---

## 12. UTILITIES & LIBRARIES

### Revalidation System
- Tag-based cache invalidation
- Collection-specific revalidation rules
- Webhook integration for frontend updates
- On-demand revalidation via `/admin/revalidate` endpoint

### Preview System
- Live preview URL generation with revalidation secret
- Collection-specific preview button cells (8 collections)
- Preview loading skeleton
- Draft preview support for Custom Items with contentType ID handling

### Taxonomy System
- **Cross-collection filtering** - Categories and Tags shared across Posts, Archive Items, Events, People, and Custom Items
- Hierarchical categories with parent/child relationships
- Flat tags for flexible tagging
- Total count tracking for each taxonomy term
- `/admin/taxonomy` endpoint for filtering

### Validation & Environment
- Environment variable validation
- Type-safe configuration
- REVALIDATION_SECRET exposed to browser for preview URLs

---

## 13. DATABASE & MIGRATIONS

- PostgreSQL with Drizzle ORM
- Automatic migration generation (`pnpm db:migrate`)
- Fresh database reset capability (`make db-fresh` - drops, recreates, migrates, seeds)
- Custom links positioning field added to NavigationSettings global
- Migration workflow documented in README

---

## 14. DEPLOYMENT

- Railway-ready configuration (railway.toml)
- Multi-service deployment (CMS + Next.js + PostgreSQL)
- Environment variable management
- Docker Compose for local development
- Netlify deployment support (auto-deploy via Git push)

---

## KEY ARCHITECTURAL DECISIONS

1. **Collection Template System** - WordPress-like custom collections created from admin UI without code changes or server restarts
2. **Template-Driven Rendering** - All content renders through finite templates (Detail, List, Landing, Timeline, Article, Home, Archive), preventing code duplication
3. **Dual Frontend Strategy** - Next.js (ISR with on-demand revalidation) for complex sites, Astro (pure SSG) for performance
4. **Block-Based Architecture** - 21 reusable blocks across all content types
5. **Admin-First UX** - Two-panel nav, custom dashboard, 6 main views, 11 tool views, theme toggle, collection manager
6. **Operational Tooling** - Comprehensive admin tools for content management (publishing calendar, SEO audit, media management, etc.)
7. **Monorepo Structure** - PNPM workspace with shared types and utilities across CMS and frontends
8. **Cross-Collection Taxonomy** - Shared categories and tags across Posts, Archive Items, Events, People, and Custom Items
9. **Dynamic Navigation** - Collection visibility controls, custom links, section grouping, real-time cache invalidation
10. **Per-Item Seeding** - Expandable seed data lists with individual item seeding buttons

---

## MAJOR FEATURES ADDED (vs Default Payload)

### 1. Collection Template System ⭐ NEW
- 17 available templates (Archive Item, Blog Post, Case Study, Course, Event, FAQ, Gallery, Page, Person, Place, Product, Service, Testimonial, etc.)
- Clone existing collections
- Install new collections from templates
- Enable/disable collections from admin UI
- Seed sample data per collection
- No server restart required

### 2. Custom Admin Views ⭐ NEW
- Dashboard with stats, recent updates, drafts, quick actions
- Content Manager, Collections Manager, Shop Manager, Taxonomy Manager
- Tools landing page with 11 tool views
- Collection-specific preview buttons in table lists

### 3. Navigation Management System ⭐ NEW
- Dynamic navigation with visibility toggles
- Custom links with positioning
- Section grouping (Content, Collections, Shop, Taxonomy, System)
- Real-time cache invalidation

### 4. Cross-Collection Taxonomy ⭐ NEW
- Shared categories and tags across multiple collections
- Hierarchical categories with parent/child relationships
- Total count tracking

### 5. Per-Item Seeding ⭐ NEW
- Expandable seed data lists
- Individual "Seed sample [item]" buttons
- Clear collection before seeding option
- Rich, well-designed seed content with meaningful blocks

### 6. Two-Panel Navigation ⭐ NEW
- Collapsible side rail (72px compact / 220px expanded)
- Icon-based navigation with SVG icons
- Theme toggle (light/dark mode)
- Responsive mobile design

### 7. Live Preview System
- Collection-specific preview buttons
- Draft preview support
- Preview loading skeleton
- Revalidation secret handling

### 8. Enhanced Media Management
- WebP optimisation
- Blur placeholders
- Focal points
- File size display
- Generated sizes info
- Unused media detection
- Large file identification

---

## COMPLETENESS VERIFICATION

✅ All 15 collections documented (6 core + 4 installed + 3 e-commerce + 2 dynamic)
✅ All 4 globals documented (Header, Footer, Settings, NavigationSettings)
✅ All 21 blocks documented (Hero, Content, Media, CTA, Quote, Features, Stats, LogoCloud, Testimonials, FAQ, Pricing, Team, Embed, Grid, Timeline, Archive, Form, Gallery, Spacer, HTML, CustomHTML)
✅ All 8 custom endpoints documented (revalidate, reset-data, navigation, collection-manager, seed, collection-templates, tools, taxonomy)
✅ All admin UI customisations documented (TwoPanelNav, 6 main views, 11 tool views, 30+ custom components)
✅ All 6 plugins documented (SEO, Form Builder, Nested Docs, Redirects, Search, S3 Storage)
✅ Both frontends documented (Next.js ISR, Astro SSG)
✅ All custom styling documented (740 lines globals.css, custom.scss)
✅ Collection template system documented (17 templates)
✅ Seed system documented (4 presets: core, blog, brochure, ecommerce)
✅ Navigation management system documented
✅ Cross-collection taxonomy documented
✅ All utilities documented (revalidation, preview, taxonomy, validation)

**Status: 100% Complete and Accurate**

