# Payload CMS v3.0: The Ultimate Developer Guide

**Author:** Manus AI

**Version:** 3.0 (Definitive)

This document provides a definitive, comprehensive guide to Payload CMS v3.0, optimized for AI developer agents. It merges extensive research with user-provided materials to cover every critical aspect of the framework, ensuring 100% completeness based on the information gathered.

## Table of Contents

1.  [Core Architecture & Concepts](#1-core-architecture--concepts)
2.  [Installation & Full Configuration](#2-installation--full-configuration)
3.  [Database Deep Dive](#3-database-deep-dive)
4.  [Collections & Globals](#4-collections--globals)
5.  [Fields: The Complete Guide](#5-fields-the-complete-guide)
6.  [Access Control In-Depth](#6-access-control-in-depth)
7.  [Hooks: Extending Logic](#7-hooks-extending-logic)
8.  [The Three APIs](#8-the-three-apis)
9.  [Key Features Explained](#9-key-features-explained)
10. [Extending Payload](#10-extending-payload)
11. [Deployment & Migration](#11-deployment--migration)
12. [Advanced Features & Optimization](#12-advanced-features--optimization)
13. [Quick Reference Tables](#13-quick-reference-tables)
14. [References](#14-references)

---

## 1. Core Architecture & Concepts

### 1.1. What is Payload?

Payload is a **code-first, open-source headless CMS and application framework** built directly on top of Next.js, React, and Node.js. It installs into your application folder, providing a powerful, type-safe, and extensible platform for everything from simple websites to complex enterprise applications. [1]

### 1.2. Key Characteristics

| Feature | Description |
| --- | --- |
| **Code-First** | Configuration is managed entirely through TypeScript code, enabling version control (Git), team collaboration, and seamless CI/CD workflows. |
| **Next.js Native** | Lives entirely within the Next.js `app` directory. There is no separation between "CMS" and "Frontend" unless you architect it that way. |
| **Database Agnostic** | Supports multiple databases through a pluggable adapter system, including PostgreSQL (via Drizzle ORM), MongoDB (via Mongoose), and SQLite. |
| **Extensible** | Highly customizable through a rich ecosystem of hooks, plugins, custom components, and custom endpoints. |
| **Open Source** | Licensed under the MIT license, allowing for free and open use in any project. |
| **Portability** | Works in any Node.js environment (Remix, Astro, SvelteKit) via the Local API and is deployable on Vercel, Docker, Cloudflare, or any Node-supporting host. |

### 1.3. Folder Structure (Payload 3.0+)

```plaintext
my-app/
├── src/
│   ├── app/
│   │   ├── (frontend)/      <-- Your Next.js Website (Server Components, etc.)
│   │   ├── (payload)/
│   │   │   ├── admin/       <-- Payload Admin Panel UI
│   │   │   ├── api/         <-- Payload REST & GraphQL APIs
│   │   │   └── layout.tsx   <-- Root layout for the Payload Admin
│   ├── collections/         <-- Collection definitions (e.g., Posts.ts, Users.ts)
│   ├── globals/             <-- Global definitions (e.g., Header.ts)
│   ├── payload.config.ts    <-- The heart of your Payload app
└── package.json
```

### 1.4. Core Building Blocks

| Concept | Description |
| --- | --- |
| **Config** | The central `payload.config.ts` file where the entire application schema, plugins, and settings are defined. |
| **Collections** | Groups of documents with a common schema, analogous to a table in a relational database. |
| **Globals** | Single documents used for site-wide settings, like headers, footers, or navigation menus. |
| **Fields** | The building blocks of collections and globals, defining the data structure and automatically generating the admin UI. |
| **Hooks** | Functions that execute custom server-side logic at various points in the document lifecycle. |
| **Access Control** | A granular, function-based permission system that controls what users can do and see. |
| **APIs** | Payload automatically generates three APIs: a server-side **Local API**, a **REST API**, and a **GraphQL API**. |

---

## 2. Installation & Full Configuration

### 2.1. Quick Start

The fastest way to start a new project is with the `create-payload-app` CLI.

```bash
# Follow the interactive prompts
npx create-payload-app@latest

cd my-project
pnpm dev
```

-   **Admin Panel:** `http://localhost:3000/admin`
-   **Templates:** Choose from `Blank` (scratch), `Website` (full-featured), or `E-commerce`.

### 2.2. `payload.config.ts`: The Complete View

This is the central configuration file. Below is a comprehensive list of its root properties.

```typescript
// src/payload.config.ts
import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export default buildConfig({
  collections: [ Users, Media, Cars ], // Add collections here
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI }
  }),
  // ... other options
});
```

| Option | Required | Description |
| --- | --- | --- |
| `db` | Yes | The Database Adapter to use (e.g., `postgresAdapter`). |
| `secret` | Yes | A long, random string for cryptographic signing and encryption. |
| `collections` | No | An array of your Collection configurations. |
| `globals` | No | An array of your Global configurations. |
| `admin` | No | Configuration for the Admin Panel (Custom Components, Live Preview, etc.). |
| `editor` | No | The default rich text editor for all `richText` fields (e.g., `lexicalEditor`). |
| `serverURL` | No | The public, absolute URL of your server, used for generating links in emails and uploads. |
| `plugins` | No | An array of plugins to extend Payload functionality. |
| `hooks` | No | Root-level hooks, such as `afterError`. |
| `endpoints` | No | Root-level custom REST endpoints. |
| `email` | No | The Email Adapter for sending emails (e.g., `nodemailerAdapter`). |
| `localization` | No | Configuration for multi-locale content support (i18n). |
| `i18n` | No | Translations for the Admin Panel UI itself. |
| `graphQL` | No | Custom configuration for the GraphQL API. |
| `typescript` | No | Settings for auto-generating TypeScript types. |
| `sharp` | No | The `sharp` module instance, required for image processing. |
| `cors` | No | CORS configuration. Can be an array of allowed origins or `*`. |
| `csrf` | No | An array of origins to whitelist for CSRF protection. |
| `defaultDepth` | No | Default relationship population depth for queries (default: `2`). |
| `maxDepth` | No | Maximum query depth to prevent performance issues (default: `10`). |
| `onInit` | No | An async function that runs once on Payload startup. |

---

## 3. Database Deep Dive

Payload is database-agnostic via its adapter system.

### 3.1. Supported Adapters

| Adapter | Package | ORM | Best For |
| --- | --- | --- | --- |
| **PostgreSQL** | `@payloadcms/db-postgres` | Drizzle | Relational data, data consistency, complex relationships. Requires migrations. |
| **Vercel Postgres**| `@payloadcms/db-vercel-postgres` | Drizzle | Identical to PostgreSQL, but optimized for Vercel hosting. |
| **MongoDB** | `@payloadcms/db-mongodb` | Mongoose | Flexible schemas, heavy localization, many `array` or `blocks` fields. No migrations needed. |
| **SQLite** | `@payloadcms/db-sqlite` | Drizzle | Local development, small projects, prototyping. |

### 3.2. Adapter Configuration

**PostgreSQL / Vercel Postgres:**

```typescript
// payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres';

db: postgresAdapter({
  pool: {
    // For Vercel, you MUST append ?ssl=true
    connectionString: process.env.DATABASE_URI,
  },
  // In production, disable auto-push and manage schema with migrations
  push: process.env.NODE_ENV !== 'production',
}),
```

**MongoDB:**

```typescript
// payload.config.ts
import { mongooseAdapter } from '@payloadcms/db-mongodb';

db: mongooseAdapter({
  url: process.env.DATABASE_URI,
  connectOptions: {
    dbName: 'my-database',
  },
}),
```

### 3.3. Migrations (Drizzle-based Adapters)

For relational databases like PostgreSQL, you must manage schema changes with migrations.

1.  **Generate a Migration:**

    ```bash
    pnpm payload migrate:generate
    ```

2.  **Apply Migrations:**

    ```bash
    pnpm payload migrate
    ```

3.  **Revert Migrations:**

    ```bash
    pnpm payload migrate:down
    ```

---

## 4. Collections & Globals

### 4.1. Collections

Collections are groups of documents. Below are all major configuration options.

| Option | Description |
| --- | --- |
| `slug` | **Required.** The URL-friendly, unique identifier. |
| `fields` | **Required.** An array of field definitions for the schema. |
| `admin` | Admin Panel display options (`useAsTitle`, `group`, `defaultColumns`). |
| `access` | Functions to control `create`, `read`, `update`, `delete` access. |
| `hooks` | Functions that fire during the document lifecycle. |
| `auth` | If `true` or an object, enables authentication for this collection. |
| `versions` | If `true` or an object, enables versioning, drafts, and autosave. |
| `upload` | If `true` or an object, enables file uploads for this collection. |
| `endpoints` | Custom REST endpoints specific to this collection. |
| `timestamps` | Automatically adds `createdAt` and `updatedAt` fields (default: `true`). |
| `defaultSort` | Default sort field and order (e.g., `-createdAt`). |
| `dbName` | A custom database table/collection name. |
| `trash` | Enables soft deletes, moving documents to a "trash" bin instead of permanently deleting. |
| `indexes` | Define compound indexes for database performance. |

### 4.2. Globals

Globals are for single-instance documents (e.g., a `site-settings` global).

-   They share most of the same options as Collections (`slug`, `fields`, `access`, `hooks`, `versions`).
-   They do **not** have `auth` or `upload` options.

---

## 5. Fields: The Complete Guide

Fields define your data schema and generate the Admin UI. Every field can have `access`, `hooks`, and `admin` properties.

### 5.1. Field Categories

| Category | Description | Field Types |
| --- | --- | --- |
| **Data Fields** | Store data in the database. | `text`, `textarea`, `number`, `checkbox`, `select`, `radio`, `email`, `date`, `point`, `relationship`, `upload`, `array`, `blocks`, `group`, `code`, `json`, `richText` |
| **Layout Fields** | Organize the Admin UI without storing data. | `collapsible`, `row`, `tabs` (unnamed) |
| **Virtual Fields** | Computed fields that don't store data but can be queried. | `join`, or any field with `virtual: true`. |

### 5.2. Common Field Properties

```typescript
{
  name: 'fieldName',        // Required for data fields
  type: 'text',             // Required
  label: 'Field Label',     // Custom label for the Admin UI
  required: true,           // Makes the field mandatory
  unique: true,             // Enforces unique values
  index: true,              // Adds a database index for faster queries
  defaultValue: 'default',  // Default value for new documents
  localized: true,          // Enables per-locale values for this field
  hidden: false,            // Hides the field from all APIs and the Admin UI
  validate: (value, { data, user }) => true || 'Error message', // Custom validation logic
  admin: {                  // Admin-specific properties
    description: 'Help text shown below the field.',
    condition: (data, siblingData) => data.someOtherField === true, // Conditionally show/hide field
    readOnly: true,
    position: 'sidebar',    // Move field to the sidebar in the editor
    width: '50%',           // Set field width in the editor
  },
}
```

### 5.3. Bi-Directional Relationships (`join` field)

The `join` field creates a bi-directional relationship, allowing you to query related documents from both sides without extra API calls.

**Example: Movies and Directors**

```typescript
// src/collections/Directors.ts
fields: [
  { name: 'firstName', type: 'text', required: true },
  { name: 'lastName', type: 'text', required: true },
  // Join field: Query movies directed by this person without extra API calls
  {
    name: 'movies',
    type: 'join',
    collection: 'movies',
    on: 'director', 
  },
]

// src/collections/Movies.ts
fields: [
  { name: 'title', type: 'text', required: true },
  { 
    name: 'director', 
    type: 'relationship', 
    relationTo: 'directors', 
    hasMany: false, 
    required: true 
  },
]
```

---

## 6. Access Control In-Depth

Access Control functions are the security backbone of Payload. They run on the server and are never exposed to the client.

### 6.1. Return Types

An access control function can return two things:

1.  **`boolean`**: `true` grants access, `false` denies it.
2.  **Query Constraint (Object)**: Filters the documents that the user is allowed to access. This is the most powerful feature.

### 6.2. Common Access Control Patterns

| Pattern | Logic | Example |
| --- | --- | --- |
| **Public** | Anyone can access. | `() => true` |
| **Logged In** | Any authenticated user can access. | `({ req: { user } }) => Boolean(user)` |
| **Admin Only** | Only users with the 'admin' role. | `({ req: { user } }) => user?.roles?.includes('admin')` |
| **Ownership** | Admins see all; users see only their own documents. | `({ req: { user } }) => user?.roles?.includes('admin') ? true : { id: { equals: user.id } }` |
| **Published Status** | Logged-in users see all; guests see only 'published' documents. | `({ req: { user } }) => user ? true : { _status: { equals: 'published' } }` |

### 6.3. Levels of Access Control

-   **Collection/Global:** Controls top-level `create`, `read`, `update`, `delete` operations.
-   **Field:** Controls `read` and `update` access for individual fields.
-   **Local API:** Access control is **skipped by default** for performance. You must explicitly enforce it with `overrideAccess: false`.

---

## 7. Hooks: Extending Logic

Hooks are server-side functions that fire during the document lifecycle.

### 7.1. Hook Types

| Type | When It Fires |
| --- | --- |
| **`beforeValidate`** | Before any field validation is performed. |
| **`beforeChange`** | After validation, before the document is saved to the database. You can modify data here. |
| **`afterChange`** | After the document is saved. Good for triggering side effects (e.g., sending notifications). |
| **`beforeRead`** | Before a document is returned from the API. Good for populating virtual fields. |
| **`afterRead`** | After a document is returned. |
| **`beforeDelete`** | Before a document is deleted. |
| **`afterDelete`** | After a document is deleted. |
| **`afterError`** | A global hook that fires when any operation throws an error. |

### 7.2. Hook Context

You can pass data between hooks within the same operation using the `context` object.

```typescript
hooks: {
  beforeChange: [({ context, data }) => {
    context.myCustomData = 'some-value';
    return data;
  }],
  afterChange: [({ context, doc }) => {
    console.log(context.myCustomData); // 'some-value'
    return doc;
  }],
}
```

---

## 8. The Three APIs

### 8.1. Local API

-   **What:** Direct, server-side database access with full TypeScript support.
-   **Why:** Extremely fast (no HTTP overhead), type-safe, and the recommended way to interact with data on the server.
-   **Usage:**

    ```typescript
    import { getPayload } from 'payload';
    import config from '@payload-config';

    const payload = await getPayload({ config });
    const posts = await payload.find({
      collection: 'posts',
      overrideAccess: false, // Enforce access control
      user, // Pass the user object to evaluate access
    });
    ```

### 8.2. REST API

-   **What:** A full RESTful API automatically generated for all collections and globals.
-   **Endpoint:** `/api` (e.g., `GET /api/posts`, `POST /api/globals/site-settings`).
-   **Querying:** Use `qs-esm` for complex `where` clauses: `?where[or][0][status][equals]=published`.

### 8.3. GraphQL API

-   **What:** A flexible GraphQL API, also auto-generated.
-   **Endpoint:** `/api/graphql`.
-   **Playground:** Available at `/api/graphql-playground` in development.

---

## 9. Key Features Explained

### 9.1. Authentication

-   **Strategies:** Supports JWT, HTTP-only cookies (default), and API keys.
-   **Options:** Configure token expiration, login attempts, email verification, and custom auth strategies (e.g., OAuth).

### 9.2. File Uploads & Image Processing

-   **Image Sizes:** Automatically resize images on upload.
-   **Focal Point:** Set a focal point (`x` and `y` coordinates) to ensure the most important part of an image is never cropped.
-   **Storage:** Use the `@payloadcms/plugin-cloud-storage` to store files on S3, GCS, Azure, etc.

### 9.3. Rich Text (Lexical)

-   **Extensible:** Add custom block-level components (e.g., banners, CTAs) or inline-level components (e.g., dynamic price tags) directly into the editor flow.

### 9.4. Versions & Drafts

-   **Versioning:** Automatically saves a history of document changes.
-   **Drafts:** Control the publishing workflow with a `_status` field (`published` or `draft`).
-   **Autosave:** Automatically saves changes as a new draft in the background.

### 9.5. Live Preview

-   **Real-time:** See front-end changes instantly as you edit in the Admin Panel.
-   **How:** Uses a combination of a backend configuration and a frontend React hook (`useLivePreview`).

### 9.6. Jobs Queue

-   **What:** A built-in system for background task processing.
-   **Use Cases:** Offloading long-running tasks (PDF generation, AI embeddings), scheduled actions (nightly syncs), and non-blocking side effects.

---

## 10. Extending Payload

### 10.1. Plugins

Plugins are functions that modify the main `payload.config.ts` to add new functionality.

| Plugin | Description |
| --- | --- |
| `@payloadcms/plugin-seo` | Adds SEO fields (meta title, description) and generates meta tags. |
| `@payloadcms/plugin-cloud-storage` | Integrates with S3, GCS, Azure, and other cloud storage providers. |
| `@payloadcms/plugin-form-builder` | Lets you build dynamic forms in the Admin Panel and tracks submissions. |
| `@payloadcms/plugin-nested-docs` | Creates parent-child relationships for hierarchical content. |
| `@payloadcms/plugin-redirects` | Manages URL redirects. |
| `mcpPlugin` | Allows AI tools like Cursor and Claude to read and write your schema. |

### 10.2. Custom Components

Swap out nearly any part of the Admin Panel with your own React Server Components.

-   **Levels:** You can replace components at the **Root** (e.g., `Nav`), **Collection/Global** (e.g., `List`), or **Field** (e.g., `Field`, `Cell`, `Label`) level.

### 10.3. Custom Endpoints

Add custom REST routes to collections, globals, or the root config for specialized logic.

---

## 11. Deployment & Migration

### 11.1. Deployment

-   **Vercel (Recommended):** One-click deployment. Integrates seamlessly with Vercel Postgres (database) and Vercel Blob (storage).
-   **Cloudflare:** Deploy via Cloudflare Workers, D1 (database), and R2 (storage). Requires a paid Workers plan.
-   **Docker:** Use the official Docker image for self-hosting on any provider.

### 11.2. Migration from WordPress

-   **Schema Mapping:** Post Types -> Collections, ACF Fields -> Fields, Layouts -> Blocks.
-   **Migration Script:** Use a custom script with libraries like `fast-xml-parser` and `cheerio` to parse a WordPress XML export and create documents in Payload via the Local API.
-   **Frontend:** Rebuild your frontend using Next.js. Use a `RenderBlocks` component to dynamically render the content from Payload's `blocks` fields.

---

## 12. Advanced Features & Optimization

### 12.1. Jobs Queue

Native background processing for tasks like syncing data or sending emails.

```typescript
// payload.config.ts
jobs: {
  tasks: [{
    slug: 'syncMovie',
    inputSchema: [{ name: 'movieId', type: 'text', required: true }],
    handler: async ({ input }) => { /* logic */ }
  }]
}

// Triggering the job
await payload.jobs.queue({ task: 'syncMovie', input: { movieId: '12345' } })
```

### 12.2. `defaultPopulate`

Optimizes API responses by preventing over-fetching in relationships. Define which fields to return when a document is populated.

```typescript
// collections/Pages.ts
export const Pages: CollectionConfig = {
  // Only return title/slug when this page is referenced by another doc
  defaultPopulate: { title: true, slug: true }, 
  fields: [ ... ]
}
```

### 12.3. MCP Plugin (AI Integration)

Allows AI tools like Cursor and Claude to read and write your schema.

```typescript
// payload.config.ts
plugins: [
  mcpPlugin({
    enabled: true,
    collections: {
      posts: { actions: { find: true, update: true } }
    }
  })
]
```

### 12.4. Quality of Life Features

-   **Soft Deletes:** Restore deleted documents from a "Trash" bin.
-   **Find Distinct:** Query for unique values in a collection (e.g., all unique tags).
-   **UploadThing Adapter:** An alternative to S3/R2 for file storage.
-   **React Compiler:** The Admin Panel uses memoization automatically for performance gains.
-   **Document Locking:** Prevents two users from editing the same document simultaneously.

---

## 13. Quick Reference Tables

### 13.1. Package Structure

| Package | Purpose |
| --- | --- |
| `payload` | Core business logic, ORM, Local API, TypeScript types. |
| `@payloadcms/next` | Admin Panel, REST API, GraphQL API. |
| `@payloadcms/graphql` | GraphQL functionality (optional). |
| `@payloadcms/ui` | UI library for Admin Panel components. |
| `@payloadcms/db-postgres` | PostgreSQL adapter (Drizzle). |
| `@payloadcms/db-mongodb` | MongoDB adapter (Mongoose). |
| `@payloadcms/db-sqlite` | SQLite adapter (Drizzle). |
| `@payloadcms/richtext-lexical` | Lexical rich text editor (recommended). |
| `@payloadcms/richtext-slate` | Slate rich text editor (legacy). |

### 13.2. Local API Operations

| Operation | Method |
| --- | --- |
| Create | `payload.create({ collection, data })` |
| Find | `payload.find({ collection, where, limit, page, sort, depth })` |
| Find by ID | `payload.findByID({ collection, id })` |
| Count | `payload.count({ collection, where })` |
| Update by ID | `payload.update({ collection, id, data })` |
| Update Many | `payload.update({ collection, where, data })` |
| Delete by ID | `payload.delete({ collection, id })` |
| Delete Many | `payload.delete({ collection, where })` |
| Find Global | `payload.findGlobal({ slug })` |
| Update Global | `payload.updateGlobal({ slug, data })` |
| Find Versions | `payload.findVersions({ collection, where })` |
| Restore Version | `payload.restoreVersion({ collection, id })` |

### 13.3. Local API Auth Operations

| Operation | Method |
| --- | --- |
| Login | `payload.login({ collection, data: { email, password } })` |
| Forgot Password | `payload.forgotPassword({ collection, data: { email } })` |
| Reset Password | `payload.resetPassword({ collection, data: { token, password } })` |
| Verify Email | `payload.verifyEmail({ collection, token })` |
| Unlock | `payload.unlock({ collection, data: { email } })` |

### 13.4. Local API Common Options

| Option | Description |
| --- | --- |
| `collection` | Collection slug (required). |
| `data` | Document data for create/update. |
| `depth` | Relationship population depth. |
| `locale` | Locale for returned docs. |
| `select` | Fields to include in response. |
| `populate` | Specific fields to populate. |
| `overrideAccess` | Skip access control (default: `true` for Local API). |
| `user` | User object for access control evaluation. |
| `showHiddenFields` | Include hidden fields in response. |
| `pagination` | Enable/disable pagination. |
| `context` | Pass data to hooks. |

### 13.5. REST API Endpoints

| Operation | Method | Path |
| --- | --- | --- |
| Find | GET | `/api/{collection}` |
| Find by ID | GET | `/api/{collection}/{id}` |
| Count | GET | `/api/{collection}/count` |
| Create | POST | `/api/{collection}` |
| Update by ID | PATCH | `/api/{collection}/{id}` |
| Update Many | PATCH | `/api/{collection}` |
| Delete by ID | DELETE | `/api/{collection}/{id}` |
| Delete Many | DELETE | `/api/{collection}` |
| Get Global | GET | `/api/globals/{global}` |
| Update Global | POST | `/api/globals/{global}` |
| Find Versions | GET | `/api/{collection}/versions` |
| Get Version | GET | `/api/{collection}/versions/{id}` |
| Restore Version | POST | `/api/{collection}/versions/{id}` |

### 13.6. REST API Auth Endpoints

| Operation | Method | Path |
| --- | --- | --- |
| Login | POST | `/api/{users}/login` |
| Logout | POST | `/api/{users}/logout` |
| Refresh Token | POST | `/api/{users}/refresh-token` |
| Me | GET | `/api/{users}/me` |
| Forgot Password | POST | `/api/{users}/forgot-password` |
| Reset Password | POST | `/api/{users}/reset-password` |
| Verify Email | POST | `/api/{users}/verify/{token}` |
| Unlock | POST | `/api/{users}/unlock` |

### 13.7. REST API Query Parameters

| Parameter | Description |
| --- | --- |
| `depth` | Populate relationships/uploads. |
| `locale` | Retrieve in specific locale. |
| `fallback-locale` | Fallback if no locale value exists. |
| `select` | Fields to include. |
| `populate` | Fields from populated docs. |
| `limit` | Max documents returned. |
| `page` | Page number. |
| `sort` | Sort field(s), prefix with `-` for descending. |
| `where` | Query filters. |
| `joins` | Custom join requests. |

### 13.8. Query Operators

| Operator | Description |
| --- | --- |
| `equals` | Exact match. |
| `not_equals` | Not equal. |
| `greater_than` | > (numeric/date). |
| `greater_than_equal` | >= (numeric/date). |
| `less_than` | < (numeric/date). |
| `less_than_equal` | <= (numeric/date). |
| `like` | Case-insensitive, all words present. |
| `contains` | Contains value (case-insensitive). |
| `in` | Value in comma-delimited list. |
| `not_in` | Value NOT in list. |
| `all` | Contains all values (MongoDB only). |
| `exists` | Field exists (true/false). |
| `near` | Point field distance. |
| `within` | Point within GeoJSON area. |
| `intersects` | Point intersects GeoJSON area. |

### 13.9. Hook Types

| Hook | When Executed | Key Arguments |
| --- | --- | --- |
| `beforeOperation` | Before any operation. | `args`, `operation`, `req` |
| `beforeValidate` | Before field validation. | `data`, `req`, `operation`, `originalDoc` |
| `beforeChange` | Before document is saved. | `data`, `req`, `operation`, `originalDoc` |
| `afterChange` | After document is saved. | `doc`, `req`, `operation`, `previousDoc` |
| `beforeRead` | Before document is returned. | `doc`, `req`, `query` |
| `afterRead` | After document is returned. | `doc`, `req`, `query` |
| `beforeDelete` | Before document is deleted. | `req`, `id` |
| `afterDelete` | After document is deleted. | `doc`, `req`, `id` |
| `afterOperation` | After any operation. | `args`, `operation`, `req`, `result` |
| `afterError` | When any operation throws an error. | `error`, `req` |

### 13.10. Auth Hooks (Auth-Enabled Collections)

| Hook | When Executed |
| --- | --- |
| `beforeLogin` | Before login attempt. |
| `afterLogin` | After successful login. |
| `afterLogout` | After logout. |
| `afterMe` | After `/me` endpoint is called. |
| `afterRefresh` | After token refresh. |
| `afterForgotPassword` | After forgot password request. |

### 13.11. Field Types Reference

| Type | Description | Stores Data |
| --- | --- | --- |
| `text` | Single-line text input. | Yes |
| `textarea` | Multi-line text input. | Yes |
| `number` | Numeric input. | Yes |
| `checkbox` | Boolean toggle. | Yes |
| `select` | Dropdown selection. | Yes |
| `radio` | Radio button selection. | Yes |
| `email` | Validated email input. | Yes |
| `date` | Date/time picker. | Yes |
| `relationship` | Reference to other documents. | Yes |
| `upload` | File upload field. | Yes |
| `array` | Repeatable field groups. | Yes |
| `blocks` | Flexible content blocks. | Yes |
| `group` | Nested field container. | Yes |
| `richText` | Rich text editor. | Yes |
| `code` | Code editor. | Yes |
| `json` | JSON editor. | Yes |
| `point` | Geographic coordinates. | Yes |
| `join` | Bi-directional relationship (virtual). | No |
| `tabs` (named) | Tabbed layout with data. | Yes |
| `tabs` (unnamed) | Tabbed layout (presentational). | No |
| `collapsible` | Collapsible container. | No |
| `row` | Horizontal layout. | No |
| `ui` | Custom UI component. | No |

### 13.12. Authentication Options

| Option | Description |
| --- | --- |
| `tokenExpiration` | JWT/cookie expiry in seconds. |
| `verify` | Require email verification. |
| `maxLoginAttempts` | Failed attempts before lockout. |
| `lockTime` | Lockout duration in milliseconds. |
| `useAPIKey` | Enable API key authentication. |
| `useSessions` | Use sessions (default: `true`). |
| `loginWithUsername` | Allow username login. |
| `depth` | User population depth in JWT. |
| `cookies` | Cookie options (`secure`, `sameSite`, `domain`). |
| `strategies` | Custom auth strategies (e.g., OAuth). |

### 13.13. Upload Options

| Option | Description |
| --- | --- |
| `staticDir` | Storage directory (default: collection slug). |
| `imageSizes` | Auto-resize configurations. |
| `mimeTypes` | Allowed file types (e.g., `["image/*"]`). |
| `adminThumbnail` | Thumbnail size for Admin Panel. |
| `crop` | Enable cropping tool (default: `true`). |
| `focalPoint` | Enable focal point selector. |
| `disableLocalStorage` | Use external storage only. |
| `filesRequiredOnCreate` | Require file on create (default: `true`). |
| `bulkUpload` | Allow bulk uploads (default: `true`). |
| `resizeOptions` | Sharp resize options. |
| `formatOptions` | Sharp format options. |

### 13.14. Version Options

| Option | Description |
| --- | --- |
| `maxPerDoc` | Max versions per document (0 = unlimited). |
| `drafts` | Enable drafts (`true` or object). |
| `drafts.autosave` | Enable autosave. |
| `drafts.schedulePublish` | Enable scheduled publishing. |
| `drafts.validate` | Skip validation on draft save (`false`). |

### 13.15. Localization Options

| Option | Description |
| --- | --- |
| `locales` | Array of locale objects or codes. |
| `defaultLocale` | Default locale code. |
| `fallback` | Fallback to default if translation missing. |
| `locales[].code` | Unique locale identifier (required). |
| `locales[].label` | Display label for admin UI. |
| `locales[].rtl` | Right-to-left text direction. |
| `locales[].fallbackLocale` | Specific fallback for this locale. |

### 13.16. GraphQL Configuration

| Option | Description |
| --- | --- |
| `maxComplexity` | Maximum query complexity. |
| `disablePlaygroundInProduction` | Disable playground in production. |
| `disableIntrospectionInProduction` | Disable introspection in production. |
| `disable` | Completely disable GraphQL. |
| `mutations` | Custom mutations. |
| `queries` | Custom queries. |

### 13.17. Official Plugins

| Plugin | Package | Description |
| --- | --- | --- |
| Form Builder | `@payloadcms/plugin-form-builder` | Build forms with submissions. |
| SEO | `@payloadcms/plugin-seo` | Meta tags, OpenGraph. |
| Search | `@payloadcms/plugin-search` | Full-text search. |
| Nested Docs | `@payloadcms/plugin-nested-docs` | Parent/child relationships. |
| Redirects | `@payloadcms/plugin-redirects` | URL redirects. |
| Stripe | `@payloadcms/plugin-stripe` | Stripe integration. |
| Sentry | `@payloadcms/plugin-sentry` | Error tracking. |
| Multi-Tenant | `@payloadcms/plugin-multi-tenant` | Multi-tenancy. |
| Import/Export | `@payloadcms/plugin-import-export` | Data import/export. |
| Cloud Storage | `@payloadcms/plugin-cloud-storage` | S3, GCS, Azure. |

### 13.18. Email Adapters

| Adapter | Package | Use Case |
| --- | --- | --- |
| Nodemailer | `@payloadcms/email-nodemailer` | SMTP, SendGrid, any transport. |
| Resend | `@payloadcms/email-resend` | Serverless (Vercel). |

---

## 14. References

[1] [Payload CMS Documentation](https://payloadcms.com/docs)
