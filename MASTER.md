# MASTER DEVELOPER & AGENT GUIDE

**Version:** 1.0
**Last Updated:** January 16, 2026

> **Purpose:** This document is the single source of truth for any AI agent or human developer working on the Payload CMS + Jamstack Platform. It provides all the necessary background, technical details, and operational procedures to understand, develop, and maintain the project without needing to consult multiple scattered sources. **Read this document in its entirety before making any changes.**

---

## Table of Contents

1.  [**Project Vision & Core Principles**](#1-project-vision--core-principles)
2.  [**Getting Started: The 5-Minute Setup**](#2-getting-started-the-5-minute-setup)
3.  [**Core Architecture**](#3-core-architecture)
    *   [Technology Stack](#technology-stack)
    *   [Monorepo Structure](#monorepo-structure)
4.  [**The CMS: In-Depth Guide**](#4-the-cms-in-depth-guide)
    *   [The Superpower: Dynamic Content Types](#the-superpower-dynamic-content-types)
    *   [Core Collections & Globals](#core-collections--globals)
    *   [The Blocks Library](#the-blocks-library)
5.  [**The Frontends: Next.js & Astro**](#5-the-frontends-nextjs--astro)
    *   [Dual-Frontend Strategy](#dual-frontend-strategy)
    *   [Template-Driven Rendering](#template-driven-rendering)
6.  [**Development Workflow & Commands**](#6-development-workflow--commands)
    *   [Makefile: Your Command Center](#makefile-your-command-center)
    *   [Database, Migrations & Seeding](#database-migrations--seeding)
7.  [**Environment Variables**](#7-environment-variables)
8.  [**Deployment to Railway**](#8-deployment-to-railway)
9.  [**CRITICAL: Developer Contracts & Guides**](#9-critical-developer-contracts--guides)
10. [**Appendices**](#10-appendices)

---

## 1. Project Vision & Core Principles

The project is an **opinionated, open-source, WordPress-like CMS + Jamstack platform**. It is designed to provide the intuitive, user-friendly content management of WordPress while leveraging the performance, security, and scalability of a modern, decoupled Jamstack architecture. [1][2]

*   **Principle 1: Dynamic, User-Driven Content Modeling.** The platform’s cornerstone feature is the ability for non-developers to create custom content types directly from the admin UI without code changes or server restarts. [1]
*   **Principle 2: Static-First Delivery.** All public-facing content is delivered as static HTML for maximum performance and security. The system uses modern regeneration techniques (ISR, on-demand revalidation) to keep content fresh. [2]
*   **Principle 3: Template-Driven Architecture.** Content rendering is decoupled from the content itself. A finite set of reusable templates can render any type of content, preventing code duplication and ensuring consistency. [2]
*   **Principle 4: AI & Human Developer Parity.** The project is explicitly structured to be understood and modified safely by both human developers and AI agents, with clear contracts and predictable file structures. [4]

## 2. Getting Started: The 5-Minute Setup

To get a fully working local environment running, execute the `quickstart` command. This single command handles everything from dependency installation to database setup and seeding.

```bash
# This is the only command you need to run to get started.
make quickstart
```

This command will:
1.  Create `.env` files from examples.
2.  Install all `pnpm` dependencies.
3.  Start a PostgreSQL database via Docker.
4.  Run database migrations.
5.  Seed the database with sample data.
6.  Start the CMS and frontend development servers.

Once complete, you can access the services at:
*   **CMS Admin & Frontend:** `http://localhost:3000`
*   **Astro Frontend:** `http://localhost:4321`

## 3. Core Architecture

The platform is a PNPM monorepo that logically separates the different applications and shared packages.

### Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **CMS** | Payload CMS v3 | The core headless CMS, built with Node.js and React. |
| **Database** | PostgreSQL | The exclusive relational database, managed via the Drizzle ORM. |
| **Primary Frontend** | Next.js 15 | For dynamic sites using SSG with Incremental Static Regeneration (ISR). |
| **Secondary Frontend**| Astro 4 | For highly performant static sites using a pure SSG approach. |
| **Local Environment** | Docker Compose | Manages the local PostgreSQL instance. |
| **Deployment** | Railway | The entire stack is optimized for one-click deployment to Railway. |

### Monorepo Structure

```plaintext
/headless-cms
├── apps/
│   ├── cms/          # Payload CMS application. All backend logic lives here.
│   ├── web/          # Next.js frontend application.
│   └── astro/        # Astro frontend application.
├── packages/
│   └── shared/       # Shared TypeScript types and utilities for all apps.
├── presets/          # Pre-configured starter sites (blog, museum, etc.).
├── docs/             # All project documentation, including briefs and guides.
├── AGENT_CONTRACT.md # CRITICAL: The rules for developing on this platform.
├── Makefile          # The central entry point for all development commands.
└── payload_cms_v3_final_guide.md # CRITICAL: The master guide for Payload CMS development.
```

## 4. The CMS: In-Depth Guide

The heart of the platform is the Payload CMS application located in `apps/cms`.

### The Superpower: Dynamic Content Types

This is the platform's most important feature. It allows users to create new content models directly from the admin UI. This is achieved through two specialized collections:

1.  **`content-types` (`apps/cms/src/collections/ContentTypes.ts`):** This collection acts as a schema builder. When a user creates a "Content Type" (e.g., "Recipe"), they are defining its name, slug, and custom fields (e.g., `prepTime` as a number, `ingredients` as a text area).
2.  **`custom-items` (`apps/cms/src/collections/CustomItems.ts`):** This is a single, flexible collection that stores the actual entries for *all* dynamic types. Each document in this collection has a relationship to its definition in `content-types`, and its custom field data is stored in a `customData` JSON field. The system includes custom components and validation hooks to render and enforce the correct fields for each item based on its type.

This architecture provides WordPress-like flexibility in a fully decoupled, modern environment.

### Core Collections & Globals

In addition to the dynamic system, the platform includes a set of standard, pre-defined collections and globals.

*   **Collections (`apps/cms/src/collections/`):**
    *   `Pages`: For standard website pages (e.g., Home, About Us).
    *   `Users`: Manages admin users and authentication.
    *   `Media`: The central library for all uploaded images and files.
    *   `Posts`, `Categories`: Standard collections for blogging.
    *   `Artifacts`, `People`, `Places`: Example collections for the "Museum" starter.
*   **Globals (`apps/cms/src/globals/`):**
    *   `Settings`: A central place to manage site-wide settings, including site name, logos, frontend configuration, and SEO defaults.
    *   `Header`: Manages the main site navigation.
    *   `Footer`: Manages the site footer content.

### The Blocks Library

All content types (including Pages and Custom Items) can use a rich, block-based editor. The platform includes a library of 9+ pre-built blocks, defined in `apps/cms/src/blocks/`.

| Block | Slug | Description |
| :--- | :--- | :--- |
| **Hero** | `hero` | A large, customizable hero section with headings, images, and calls-to-action. |
| **Content** | `content` | A standard rich-text block for flexible content. |
| **Media** | `media` | A block for embedding single images or videos. |
| **Call to Action** | `cta` | A dedicated section for prompting user action. |
| **Gallery** | `gallery` | An image gallery with multiple layout options (grid, masonry, carousel). |
| **Grid** | `grid` | A flexible grid layout for displaying features or cards. |
| **Timeline** | `timeline` | A chronological display for events or historical data. |
| **Archive** | `archive` | A block that lists items from any other collection. |
| **Form** | `form` | Embeds a form built with the Form Builder plugin. |

## 5. The Frontends: Next.js & Astro

The platform embraces a dual-frontend strategy to provide the right tool for the job.

### Dual-Frontend Strategy

*   **Next.js (`apps/web`):** The primary choice for complex, interactive sites. It uses **SSG with on-demand revalidation (ISR)**. When content is published in the CMS, a webhook is sent to Next.js, which intelligently re-builds only the affected pages. This provides the speed of a static site with the freshness of a dynamic one.
*   **Astro (`apps/astro`):** The choice for content-heavy, high-performance sites like blogs and marketing pages. It uses a **pure SSG** approach, where the entire site is rebuilt on every publish. This results in an extremely fast user experience with zero client-side JavaScript by default.

### Template-Driven Rendering

Neither frontend contains rendering logic specific to any collection. Instead, they use a generic, template-driven approach. A page route (e.g., `/[slug].astro` or `/[slug]/page.tsx`) fetches data from the CMS and passes it to a generic `RenderBlocks` component, which iterates through the page's blocks and renders the corresponding block component. This ensures that new content types and blocks automatically work on the frontend without requiring new frontend code.

## 6. Development Workflow & Commands

All common tasks are automated via a `Makefile` at the root of the project.

### Makefile: Your Command Center

The `Makefile` provides simple, one-word commands for complex operations. Run `make help` to see all available commands.

| Command | Description |
| :--- | :--- |
| `make quickstart` | **(For new devs)** Sets up and starts the entire local environment in one go. |
| `make dev` | Starts all services in development mode (CMS, Next.js, Astro). |
| `make stop` | Stops all running Docker containers and services. |
| `make build` | Builds all applications for production. |
| `make db-migrate` | Runs database migrations after you change a collection's schema. |
| `make db-seed` | Seeds the database with sample data for the configured preset. |
| `make db-reset` | **(Destructive)** Wipes the local database and starts fresh. |
| `make lint` | Runs the linter to check for code quality issues. |
| `make format` | Formats all code using Prettier. |
| `make typecheck` | Runs the TypeScript compiler to check for type errors. |
| `make create` | Starts an interactive script to scaffold a new project from a preset. |

### Database, Migrations & Seeding

*   **Migrations:** When you change the schema of a collection (e.g., add a field), you **must** generate a migration file. Run `pnpm payload migrate:generate` and give it a descriptive name. Then, run `make db-migrate` to apply it.
*   **Seeding:** The project includes sample data for different presets. You can seed the database by running `make db-seed`. To seed for a specific preset, use commands like `make seed-blog` or `make seed-museum`.

## 7. Environment Variables

All configuration is managed via environment variables, defined in the `.env` file at the project root. An example file, `.env.example`, is provided with all required variables documented.

| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | **Required.** The connection string for your PostgreSQL database. | `postgresql://payload:payload_secret@localhost:5432/payload` |
| `PAYLOAD_SECRET` | **Required.** A long, random string for cryptographic signing. | `your-super-secret-key` |
| `PAYLOAD_PUBLIC_SERVER_URL` | **Required.** The public URL of your CMS. | `http://localhost:3000` |
| `NEXT_PUBLIC_SITE_URL` | **Required.** The public URL of your frontend application. | `http://localhost:3001` |
| `REVALIDATION_SECRET` | **Required.** A shared secret to secure the on-demand revalidation endpoint. | `your-revalidation-secret` |

## 8. Deployment to Railway

The project is configured for seamless, one-click deployment to Railway. The repository contains a `railway.toml` file that instructs Railway how to build and deploy the `cms` and `web` services, as well as provision a PostgreSQL database. Simply click the "Deploy on Railway" button in the `README.md` to get started.

## 9. CRITICAL: Developer Contracts & Guides

To ensure stability and safe development, especially by AI agents, the project includes several critical contract documents. **You must read and adhere to these.**

*   ### **[AGENT_CONTRACT.md](./AGENT_CONTRACT.md)**
    > **This is the most important document for any developer.** It is the authoritative guide that defines the rules of engagement for modifying the platform. It specifies what can and cannot be changed, and provides step-by-step instructions for common tasks like adding collections, blocks, and templates. **Failure to follow this contract will likely break the system.**

*   ### **[payload_cms_v3_final_guide.md](./payload_cms_v3_final_guide.md)**
    > This is a comprehensive, master guide to Payload CMS v3 itself. It covers every aspect of Payload development, from configuration and access control to hooks and APIs. Use this as your primary reference for any questions about how to use Payload's features.

*   ### **[docs/REVALIDATION_RULES.md](./docs/REVALIDATION_RULES.md)**
    > This document explains the tag-based revalidation strategy in detail, including the tag naming convention and the dependency matrix for cache invalidation.

*   ### **[docs/VERSIONING_POLICY.md](./docs/VERSIONING_POLICY.md)**
    > This document outlines the project's versioning strategy, dependency management, and release process.

## 10. Safe Branch Switching

**⚠️ CRITICAL:** Never use `git checkout` directly when the dev server is running. This causes the server to reload with different code, leading to errors and confusion.

### The Problem

Switching branches while `make dev` is running causes:
- Runtime errors from code/database mismatches
- Collection errors (main branch doesn't have experimental collections)
- Wasted time debugging phantom issues
- **Silent failures** - happens in background, you just see things break

### The Solution: Two Layers of Protection

#### First Time Setup
```bash
# Install Git hooks (one-time setup)
./scripts/install-git-hooks.sh
```

This installs a Git hook that **automatically warns you** whenever you switch branches while dev server is running.

#### Daily Use: Always Use Safe Checkout

```bash
# Switch to main branch
make checkout BRANCH=main

# Switch to development branch
make checkout BRANCH=development
```

The script will:
1. Check if dev server is running
2. Block the switch if it is
3. Show you how to proceed safely

**If you forget and use `git checkout` directly**, the Git hook will immediately warn you and tell you to restart the dev server.

### Safe Workflow

```bash
# 1. Stop dev server (Ctrl+C)
# 2. Switch branches
make checkout BRANCH=main
# 3. Restart dev server
make dev
```

### For AI Agents

**Instead of switching branches, use:**
```bash
# View file from another branch
git show main:path/to/file.ts

# Compare branches
git diff main development -- path/to/file.ts
```

See [docs/SAFE_BRANCH_SWITCHING.md](./docs/SAFE_BRANCH_SWITCHING.md) for complete guide.

---

## 11. Appendices

*For a complete, up-to-date list of all collections, globals, blocks, and commands, please refer to the source code and the `Makefile`.* The information provided in this master guide is intended to be a comprehensive starting point.

---

## References

[1] OpaceDigitalAgency, *headless-cms/README.md*, GitHub Repository.

[2] OpaceDigitalAgency, *Phase_1_Payload_Jamstack_Agent_Build_Brief_Railway.md*, Project Documentation.

[3] OpaceDigitalAgency, *payload_cms_v3_final_guide.md*, Project Documentation.

[4] OpaceDigitalAgency, *AGENT_CONTRACT.md*, GitHub Repository.
