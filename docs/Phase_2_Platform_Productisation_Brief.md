
# Phase 2 Brief — Platform Starters, Scaffolding & Productisation

## Context

This document defines **Phase 2** of the Payload CMS + Jamstack Platform project.

Phase 1 delivered:
- Core architecture
- Static-first guarantees
- Live Preview vs Publish separation
- Template-driven rendering
- One-command local + Railway deployment

Phase 2 focuses on **productisation**:
- Starter site types
- Scaffolding & presets
- Stronger AI-agent contracts
- Operational completeness

This brief must be read **in addition to** the Phase 1 Agent Build Brief.

---

## Phase 2 Objectives

1. Ship **starter site types** that work out of the box
2. Introduce a **scaffolding layer** (CLI / scripted generator)
3. Formalise the **template + mapping contract**
4. Complete **publish invalidation rules**
5. Improve **agent safety and determinism**
6. Prepare the project for **open-source distribution**

---

## 1. Starter Site Types (REQUIRED)

As well as Payload's actual website template as the base, the platform MUST ship with at least the following starters:

### 1.1 Blog / Brochure Starter
- Frontend: Astro (SSG + local loader)
- Use case: small marketing sites, blogs, docs
- Collections:
  - Pages
  - Posts
  - Categories / Tags
- Features:
  - Archive pages
  - SEO-ready output
  - Rebuild-on-publish acceptable

### 1.2 Museum / Archive / Gallery Starter (Flagship)
- Frontend: Next.js (SSG + revalidation)
- Use case: archives, catalogues, complex relational data
- Collections:
  - Pages
  - Artifacts
  - People
  - Places
  - Collections (hierarchical)
  - Categories / Tags
- Features:
  - Relationship-heavy views
  - Timeline support
  - Tag-based revalidation

### 1.3 Ecommerce Starter
- Frontend: Next.js (SSG + revalidation)
- Use case: product catalogues (payments optional in PoC)
- Collections:
  - Pages
  - Products
  - Categories
  - Collections
  - Categories / Tags
- Features:
  - Product detail pages
  - Category listings
  - SEO-first static output

Each starter must include:
- CMS schema
- Template mappings
- Sample content
- Working preview + publish flow

---

## 2. Presets & Packs System

Introduce a filesystem-based packaging system.

### 2.1 Presets (Site Types)
```
presets/
├── blog-astro/
├── brochure-astro/
├── archive-next/
├── ecommerce-next/
```

Each preset includes:
- CMS collections
- Globals
- Template mappings
- Seed data
- Frontend routes/layouts

### 2.2 Feature Packs (Future)
```
packs/
├── search/
├── forms/
├── redirects/
├── seo/
```

Packs must be installable without altering core architecture.

---

## 3. Scaffolding Layer (CRITICAL)

Introduce a generator to scaffold projects.

### 3.1 Scripted Generator
Provide:
```
scripts/create.sh
```

Responsibilities:
- Accept arguments:
  - preset
  - frontend (next|astro)
- Scaffold `apps/cms` and `apps/web`
- Copy preset schema, templates, seed data
- Ensure fixed ports and env vars
- Print next steps (`make up`)

### 3.2 Makefile Shortcuts
Commands such as:
- `make blog-next`
- `make brochure-astro`
- `make ecommerce-next`
- `make archive-next`

These wrap the generator for non-technical users.

---

## 4. Template Mapping Contract

Formalise the mapping system.

### 4.1 Mapping Shape
Define a strict TS/JSON shape:
- Required slots (title, body, media)
- Optional slots (relations, meta)
- Relationship handling rules

### 4.2 Validation
- Invalid mappings must fail fast
- Templates must render safely if optional slots are missing

---

## 5. Blocks Library (Landing Pages)

Introduce a core block system.

Required blocks:
- Hero
- Gallery
- Grid
- CTA
- Timeline
- Rich text

Blocks must:
- Be reusable across presets
- Render consistently in preview and public output

---

## 6. Publish Invalidation Rules

Complete the revalidation system.

### 6.1 Tag Naming Convention
Examples:
- `collection:posts`
- `post:{id}`
- `archive:posts`
- `home`
- `taxonomy:{type}:{slug}`

### 6.2 Dependency Rules
Publishing content must invalidate:
- Its own page
- Relevant index/archive pages
- Any parent/related pages

### 6.3 Security
- Dedicated revalidation endpoint
- Secret-based auth
- Drafts MUST NOT trigger public invalidation

---

## 7. Versioning & Maintenance Policy

Define rules for “latest components”.

- Starter templates pinned to known-good versions
- Integrations support version ranges
- CI matrix tests:
  - current
  - previous minor
- Explicit upgrade path documentation

---

## 8. Railway Template Completion

Enhance Railway support.

- Publish a Railway multi-service template
- Auto-wire:
  - DATABASE_URL
  - CMS_URL
  - PAYLOAD_PUBLIC_SERVER_URL
- Document domain/URL linking behaviour

---

## 9. Seed & Bulk Import Tooling

Provide:
- `pnpm seed` or equivalent
- Sample datasets per starter
- JSON/CSV import scripts
- Clear folder structure:
```
apps/cms/src/seed/
```

---

## 10. Agent Contract (NEW DOCUMENT)

Create a dedicated “Agent Contract” file defining:

- How to add a collection
- How to add a template
- How to map fields
- How to add blocks
- How to seed data
- How preview vs publish works
- What MUST NOT be changed

This document is authoritative for AI agents.

---

## Phase 2 Acceptance Criteria

Phase 2 is complete when:

- All three starters scaffold correctly
- One-command creation works
- Templates + blocks are reusable
- Revalidation behaves deterministically
- Agent contract enables safe iteration
- Project is ready for OSS release

---

## Guiding Principle

> Phase 1 proved the architecture.
> Phase 2 turns it into a **product**.

Do not compromise Phase 1 constraints.
