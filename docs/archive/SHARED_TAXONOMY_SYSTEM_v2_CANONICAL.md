
# Shared Taxonomy System & Hierarchical Categories (v2 – Canonical)

This document defines a unified, scalable content architecture built on top of a **collections-first data model**, with a **UX-first CMS design**.  
It is intended to be the single source of truth for developers, designers, and content editors.

The system is designed to:
- Preserve Payload-style collections as the underlying primitive
- Present a CMS that aligns with how humans think about content
- Enable shared, hierarchical taxonomy across multiple content types
- Support reuse, cross-filtering, and long-term extensibility

---

## Core Design Principle

**Collections are a technical implementation detail.  
CMS navigation and UX are organised around editor intent.**

Editors should never need to understand:
- what a collection is
- how schemas are composed
- how data is queried

They should only see:
- what they can create
- how content is grouped
- where to manage shared structures

---

## CMS Admin Navigation (High-Level Sitemap)

```
Dashboard
├── Overview
├── Tools

Content
├── Pages
├── Posts
├── Archive Items
├── Events
└── Custom Items

Taxonomy
├── Categories (hierarchical, shared)
└── Tags (shared)

Reusable Content
├── Galleries
├── FAQs
├── Testimonials
├── Feature Lists
├── Stats / Highlights
└── CTAs / Promo Blocks

Collections
├── People
├── Places
└── Museum Collections

Shop
├── Products
├── Product Categories
└── Product Collections

Media
└── Media Library

Forms
├── Forms
└── Form Submissions

Site Settings
├── Global Settings
├── Header
├── Footer
├── Redirects
└── Search Index

Users & Access
├── Users
├── Roles
└── Permissions

System (Restricted)
├── Webhooks
├── API Keys
├── Migrations
└── Logs / Versions
```

---

## Content

**Content** represents items that are written, published, and consumed directly by end users.

Characteristics:
- editorial workflow (draft / published)
- often URL-backed
- may appear in feeds, listings, or search results

Collections in this section:
- Pages
- Posts
- Events
- Custom Items
- Archive Items (see below)

---

## Archive Items (Generic Base Collection)

The `archive-items` collection is the flexible foundation used to model:
- museum artefacts
- artworks
- portfolio items
- vehicles
- collectibles
- historical records

### Why a Generic Archive System?
- avoids duplicating near-identical collections
- enables shared blocks, taxonomy, and filters
- allows customisation without fragmentation

### Example Structure

```
Archive Item
├── Title, Slug, Featured Image
├── Description (Rich Text)
├── Media Gallery
├── Specifications (dimensions, materials, condition)
├── Provenance (dates, catalog numbers)
├── Relationships (people, places, collections)
├── Taxonomy (categories, tags)
└── Content Blocks
```

Specialised content types (e.g. Artworks, Vehicles) are derived from this base rather than reimplemented.

---

## Reusable Content

Reusable Content represents **supporting content** that is not standalone editorial output.

Examples:
- Galleries
- FAQs
- Testimonials
- Feature Lists
- Stats / Highlights
- CTAs / Promotional Blocks

Characteristics:
- reused across multiple pages
- embedded via relationships or blocks
- edited independently of page content
- rarely have their own URLs

Separating these from Content:
- prevents page clutter
- encourages reuse
- makes ownership clearer for editors

---

## Taxonomy (Shared Classification Layer)

Taxonomy is a **first-class CMS concept**, not a side-effect of posts or pages.

It is:
- not content
- not layout
- not settings
- not media

It is a **classification layer** shared across collections.

### Shared Taxonomy Collections
- Categories (hierarchical)
- Tags (flat)

Used by:
- Posts
- Archive Items
- Events
- People
- Custom Items

Explicitly *not* used by ecommerce.

---

## Hierarchical Categories

Categories support unlimited parent-child nesting.

### Example

```
History
├── Ancient History
│   ├── Ancient Rome
│   ├── Ancient Egypt
│   └── Ancient Greece
├── Medieval History
└── Modern History
```

Benefits:
- cleaner organisation
- breadcrumb generation
- avoids duplicated category names
- enables deep thematic browsing

---

## Tags

Tags are:
- flat
- optional
- cross-cutting

They complement categories rather than replacing them.

---

## Cross-Collection Discovery

Shared taxonomy enables:

- “Show everything related to Ancient Rome”
- Combined category archive pages
- Mixed listings (events + posts + archive items)

Example use case:

```
Category: Ancient Egypt
- Archive Items: artefacts
- Events: exhibitions
- Posts: articles
- People: historical figures
```

---

## Media

Media is infrastructure, not editorial content.

UX characteristics:
- grid-first interface
- usage tracking (“used in X items”)
- safe replacement of assets
- metadata without editorial workflow

Implemented as a collection, surfaced as a Media Library.

---

## Collections (Entity-Based)

Collections like People and Places represent **entities**, not content output.

They:
- are referenced by content
- rarely published directly
- enrich Archive Items and Posts

They do not use shared taxonomy unless explicitly required.

---

## Shop (Separate Taxonomy)

Ecommerce content uses **its own taxonomy**:
- Product Categories
- Product Collections

This avoids:
- polluting editorial taxonomy
- accidental cross-filtering

---

## Mobile UX Considerations

To ensure taxonomy remains accessible on mobile:
- Categories and Tags live in their own top-level section
- Collection list views include “Manage Categories” and “Manage Tags” actions

This prevents hidden navigation when sidebars collapse.

---

## Mental Model for Editors

Editors should understand the CMS as:

- Content → what we write
- Reusable Content → parts we drop into pages
- Taxonomy → how things are grouped
- Media → files
- Structure → how pages are built
- Settings → site-wide behaviour
- Users → people and access

If this explanation takes longer than 30 seconds, the CMS is too complex.

---

## Summary

This system:
- preserves collections as the core data primitive
- presents a CMS organised by human intent
- treats taxonomy as a shared, visible foundation
- supports reuse, scalability, and clarity
- avoids duplication and accidental complexity

This document represents the **canonical v2 specification**.
