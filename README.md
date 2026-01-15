# Payload CMS v3 + Jamstack Platform

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/payload-jamstack?referralCode=payload)

A production-ready, headless CMS platform built with **Payload CMS v3**, **Next.js 15**, and **Astro 4**. Features a WordPress-like experience with cloneable **Collection Templates**, static site generation (SSG), on-demand revalidation, live preview, and one-command deployment.

---

## Table of Contents

- [The Vision: A Better WordPress](#the-vision-a-better-wordpress)
- [How It Works: Collection Templates](#how-it-works-collection-templates)
- [Quick Start](#quick-start)
- [Core Features](#core-features)
- [Project Structure](#project-structure)
- [Available Collection Templates](#available-collection-templates)
- [Customization Guide](#customization-guide)
- [Makefile Commands](#makefile-commands)
- [Deployment](#deployment)

---

## The Vision: A Better WordPress

This platform is designed to be a **super powerful but simple CMS**, inspired by the best parts of WordPress but with a modern, headless architecture.

### Core Principles

1.  **Shared Foundation**: Every site starts with a common base of essential features:
    *   **Pages**: A flexible page builder with all content blocks.
    *   **Categories & Tags**: For universal taxonomy.
    *   **Media Library**: With image optimization.
    *   **Globals**: For site-wide content like headers and footers.

2.  **Add Content Types as Needed**: Instead of a fixed set of content types, you add what you need from a library of **Collection Templates**. Need a blog? Add the `Blog Post` template. Need a portfolio? Add the `Portfolio Item` template.

3.  **Clone and Customize**: Liked the `Museum/Archive` template but need it for a `Car Collection`? Simply clone it, rename it, and tweak the fields. No code required for basic changes.

4.  **Intuitive UX**: The admin panel is designed for content editors, not just developers. Everything should feel familiar and easy to use.

---

## How It Works: Collection Templates

This is the core concept that makes the CMS so flexible. Instead of being locked into pre-defined collections, you build your site by adding and customizing templates.

### The Workflow

1.  **Go to the Dashboard**: Navigate to the `Dashboard` in the admin panel.
2.  **Open Collection Templates**: Click the `📦 Collection Templates` tab.
3.  **Browse the Library**: You'll see a list of available templates like `Blog Post`, `Product`, `Archive Item`, etc.
4.  **Add or Clone a Template**:
    *   **Add**: Click "Add" to create a new collection with the default name (e.g., `posts`).
    *   **Clone**: Click "Clone" to create a copy with a custom name (e.g., clone `Archive Item` to create a `Classic Cars` collection).
5.  **Preview with Sample Data**: Go to the `🌱 Sample Data` tab. Each of your new collections will have its own set of buttons:
    *   `🌱 Seed Sample Data`: Populates the collection with sample content so you can see how it looks.
    *   `🔄 Re-seed`: Clears and re-seeds the data.
    *   `🗑️ Delete Sample Data`: Clears all sample data from that collection.

This workflow allows you to rapidly prototype, preview, and build out your site's content structure.

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
1.  Copy `.env.example` to `.env`
2.  Start PostgreSQL via Docker
3.  Install all dependencies
4.  Run database migrations
5.  Start CMS on http://localhost:3000
6.  Start frontend on http://localhost:3001

**Default Login:**
- Email: `admin@example.com`
- Password: `admin123`

---

## Core Features

- **Payload CMS v3.14** with PostgreSQL
- **Next.js 15** & **Astro 4** frontends
- **9+ Content Blocks** for all content types (Hero, Gallery, Grid, etc.)
- **Full Version History** with restore capability on all collections
- **Live Preview** for real-time editing
- **On-Demand Revalidation** for fast, static pages
- **Admin UI** for managing Collection Templates and Seed Data

---

## Project Structure

```
headless-cms/
├── apps/
│   ├── cms/                    # Payload CMS application
│   │   ├── src/
│   │   │   ├── collections/    # Core & pre-configured collections
│   │   │   ├── collection-templates/ # Reusable template definitions
│   │   │   ├── components/     # Custom admin components
│   │   │   ├── endpoints/      # Custom API endpoints
│   │   │   └── seed/           # Database seeding logic
│   └── web/                    # Next.js frontend
│
├── packages/
│   └── shared/                 # Shared types & utilities
│
├── docs/
│   ├── REVALIDATION_RULES.md   # Cache invalidation rules
│   └── VERSIONING_POLICY.md    # Version management policy
│
├── AGENT_CONTRACT.md           # Developer/AI agent contract
└── Makefile                    # All commands
```

---

## Available Collection Templates

These are the pre-built templates you can add or clone from the admin panel.

| Template | Default Slug | Description |
|---|---|---|
| **Blog Post** | `posts` | A standard blog post with rich text, blocks, categories, and tags. |
| **Archive Item** | `artifacts` | For museum, gallery, or portfolio items. Rich metadata fields. |
| **Product** | `products` | For ecommerce. Includes pricing, SKU, and inventory fields. |
| **Person** | `people` | For team members, authors, or historical figures. |
| **Place** | `places` | For locations, venues, or points of interest. |
| **Event** | `events` | For time-based events with start/end dates and location. |

---

## Customization Guide

### Example: Creating a "Classic Cars" Collection

Let's say you want a collection for classic cars, based on the `Archive Item` template.

1.  **Navigate to Collection Templates**: Go to `Dashboard` -> `📦 Collection Templates`.
2.  **Find `Archive Item`**: Locate the "Archive Item" template in the library.
3.  **Click "Clone"**: A dialog will appear.
4.  **Enter Custom Names**:
    *   **Collection Name**: `Classic Cars`
    *   **Slug**: `classic-cars` (auto-generated, can be changed)
    *   **Singular Name**: `Classic Car`
    *   **Plural Name**: `Classic Cars`
5.  **Confirm**: The system will create a new `classic-cars` collection.

> **Note**: In the current implementation, cloning requires a server restart for the new collection to appear in the sidebar. A future update will make this process dynamic.

### Modifying Fields

To modify the fields of your new `classic-cars` collection:

1.  **Open the Code**: Navigate to `apps/cms/src/collections/`.
2.  **Find the File**: You'll see a new file, `classic-cars.ts` (or similar).
3.  **Edit the Fields**: You can now add, remove, or modify the fields in this file just like any other Payload collection.

For example, you could change the `accessionNumber` field to `vinNumber`.

---

## Makefile Commands

All common commands are in the `Makefile`.

| Command | Description |
|---|---|
| `make quickstart` | **Best for first-time use.** Clones, installs, and starts everything. |
| `make up` | Starts all services (Postgres, CMS, Web) via Docker Compose. |
| `make down` | Stops all running services. |
| `make install` | Installs all dependencies using `pnpm`. |
| `make dev` | Starts all development servers (CMS, Web, Astro). |
| `make build` | Builds all applications for production. |
| `make migrate` | Runs database migrations. |
| `make seed` | Seeds the database with sample data for the **museum** preset. |
| `make clear-seed` | Clears all sample data from the database. |
| `make logs` | Tails the logs for all running services. |
| `make format` | Formats the entire codebase with Prettier. |
| `make lint` | Lints the entire codebase with ESLint. |
| `make typecheck` | Runs TypeScript type checking. |

---

## Deployment

This project is optimized for deployment on **Railway**.

- **Automatic Builds**: Railway will automatically detect the monorepo and build the `cms` and `web` applications.
- **Environment Variables**: All required environment variables are pre-configured in the template.
- **Database**: A PostgreSQL database is automatically provisioned and linked.

Simply click the "Deploy on Railway" button at the top of this README.
