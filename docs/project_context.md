Markdown# Payload CMS: The Master User Manual

## 1. Core Architecture & Introduction
Payload is a Next.js-native, serverless-ready Headless CMS and application framework. It installs directly into your application folder, eliminating the need for third-party SaaS hosting.

### Key Technical Specs
* **Tech Stack:** 100% TypeScript, Node.js, React (Admin UI).
* **Next.js Native:** Lives entirely within the Next.js `app` directory. There is no separation between "CMS" and "Frontend" unless desired.
* **Database:** Supports PostgreSQL (via Drizzle ORM), MongoDB, and SQLite.
* **Portability:** Works in any Node environment (Remix, Astro, SvelteKit) via Local API; deployable on Vercel, Docker, or Cloudflare.

### Folder Structure (Payload 3.0+)
```text
my-app/
├── src/
│   ├── app/
│   │   ├── (frontend)/      <-- Your Next.js Website
│   │   ├── (payload)/
│   │   │   ├── admin/       <-- Payload Admin Panel
│   │   │   ├── api/         <-- Payload API
│   │   │   └── layout.tsx
│   ├── collections/
│   ├── payload.config.ts
└── package.json
2. Installation & Database SetupStep 1: ScaffoldingRun the official generator:Bashnpx create-payload-app@latest
Interactive Prompts:Project Name: (e.g., fancy or what-is-payload).Template: Choose Blank (scratch), Website (suite), or E-commerce.Database: Choose PostgreSQL, MongoDB, or SQLite.Step 2: Database ConfigurationPayload 2.0+ supports Postgres natively via Drizzle ORM.Option A: Vercel PostgresVercel: Create a Storage/Postgres database.Connection String: Copy the string ending in .com/verceldb.Critical Step: You must append ?ssl=true to the connection string.Example: postgres://...vercel-storage.com:5432/verceldb?ssl=true.Env File: The CLI adds this to .env:Code snippetDATABASE_URI=postgres://default:***@[Region.postgres.vercel-storage.com:5432/verceldb?ssl=true](https://Region.postgres.vercel-storage.com:5432/verceldb?ssl=true)
Option B: Local/DockerUse a local Postgres instance for development to avoid production data loss.Use Payload Migrations to control schema changes when deploying.Step 3: Running the ProjectBashyarn dev
# Server: http://localhost:3000 | Admin: http://localhost:3000/admin
Automatic Schema Sync: When running in dev, Drizzle ORM automatically pushes config changes to the database (creating tables like users).3. Configuration & CollectionsPayload is "Code-First". The entire backend structure starts in src/payload.config.ts.Basic ConfigTypeScriptimport { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres'; // or mongooseAdapter
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export default buildConfig({
  collections: [ Users, Media, Cars ], // Add collections here
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI }
  }),
});
Defining Collections (Schema)Collections are your database tables. Below are two examples showing different relationship types.Example A: The "Cars" Collection (Basic Relationships)TypeScript// src/collections/Cars.ts
import { CollectionConfig } from 'payload/types';

export const Cars: CollectionConfig = {
  slug: 'cars',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text' },
    { 
      name: 'manufacturer', 
      type: 'relationship', 
      relationTo: 'manufacturers' 
    },
    { 
      name: 'image', 
      type: 'upload', 
      relationTo: 'media' 
    },
    // Bidirectional Join: See cars related to a manufacturer inside this doc
    {
      name: 'relatedCars',
      type: 'join',
      collection: 'cars',
      on: 'manufacturer',
    }
  ],
};
Example B: Movies & Directors (Bi-directional)This replaces traditional WP/ACF setups.Directors.tsTypeScriptfields: [
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
Movies.tsTypeScriptfields: [
  { name: 'title', type: 'text', required: true },
  { 
    name: 'director', 
    type: 'relationship', 
    relationTo: 'directors', 
    hasMany: false, 
    required: true 
  },
]
Media Collection FeaturesConfigure automatic resizing and focal points in your Media collection.TypeScript// Media.ts
imageSizes: [
  { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
  { name: 'banner', width: 1600, height: 900 }
],
4. Rich Text Editor (Lexical)Payload uses the extensible Lexical editor.Custom Blocks & Inline BlocksYou can inject React components directly into the editor.1. Block-Level Component (e.g., "Banner")TypeScriptblocksFeature([
  {
    slug: 'banner',
    fields: [
      { name: 'type', type: 'select', options: ['info', 'warning'] },
      { name: 'content', type: 'textarea' }
    ]
  }
])
2. Inline Blocks (e.g., Dynamic Price)Insert dynamic data into the text flow.TypeScripteditor: lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    inlineBlocks([{
      slug: 'carPrice',
      fields: [{ name: 'car', type: 'select', options: ['McLaren F1', 'Porsche 911'] }]
    }])
  ]
})
3. Custom Admin UI ComponentsRender custom labels in the admin (e.g., showing a price alongside a car name).TypeScriptadmin: {
   components: {
      Label: '/components/CarPriceLabel.tsx', 
   }
}
5. Access ControlAccess control runs on the server. It uses 5 primary patterns to determine who can Read, Create, Update, or Delete.1. Basic Role (isAdmin): Returns a boolean.TypeScriptexport const isAdmin: Access = ({ req: { user } }) => Boolean(user?.roles?.includes('admin'));
2. Ownership (isAdminOrSelf): Admins see all; users see only their own data.TypeScriptexport const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.roles?.includes('admin')) return true;
  return { id: { equals: user.id } }; // Query Constraint
}
3. Draft vs Published: Public only sees published; Logged-in sees all.TypeScriptaccess: {
  read: ({ req: { user } }) => {
    if (user) return true;
    return { _status: { equals: 'published' } };
  },
},
4. Field-Level Access: Restrict specific fields.TypeScriptfields: [
  {
    name: 'roles',
    type: 'select',
    access: { update: isAdmin } // Only admin can change roles
  }
]
5. Public Access: Open to everyone (e.g., Contact Form submission).TypeScriptaccess: { create: () => true }
6. Next.js Integration (Frontend)Local API (Server Components)Query the database directly without HTTP overhead.TypeScript// src/app/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Page() {
  const payload = await getPayload({ config })

  // Type-safe query
  const data = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
  })
  return <main>{data.docs[0].title}</main>
}
Route Handlers (Custom Endpoints)TypeScript// src/app/my-route/route.ts
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { getHeaders } from 'next/headers';

export const GET = async () => {
  const payload = await getPayload({ config: configPromise });
  const headers = await getHeaders();

  // Auth Check
  const { user } = await payload.auth({ headers });
  if (!user) return new Response('Unauthorized', { status: 401 });

  // Data Fetch
  const cars = await payload.find({
    collection: 'cars',
    select: { title: true, manufacturer: true } // Optimization
  });

  return Response.json({ user, cars });
};
Live PreviewEnables real-time previews using Next.js Server Components.Backend: Configure admin.livePreview in payload.config.ts.Frontend: Use the useLivePreview hook.TypeScript'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'

export const PageClient = ({ data }) => {
  const { data: liveData } = useLivePreview({
    initialData: data,
    serverURL: 'http://localhost:3000' 
  })
  return <h1>{liveData.title}</h1>
}
7. Advanced Features & OptimizationJobs QueueNative background processing (e.g., syncing data, sending emails).TypeScript// payload.config.ts
jobs: {
  tasks: [{
    slug: 'syncMovie',
    inputSchema: [{ name: 'movieId', type: 'text', required: true }],
    handler: async ({ input }) => { /* logic */ }
  }]
}
// Triggering
await payload.jobs.queue({ task: 'syncMovie', input: { movieId: '12345' } })
defaultPopulateOptimizes API responses by preventing over-fetching in relationships.TypeScript// Collections/Pages.ts
export const Pages: CollectionConfig = {
  // Only return title/slug when this page is referenced by another doc
  defaultPopulate: { title: true, slug: true }, 
  fields: [ ... ]
}
HooksInject logic into operations.TypeScripthooks: {
  afterRead: [
    ({ doc }) => {
      doc.doILikeIt = doc.title.includes('Vantage'); // Virtual field
      return doc;
    }
  ]
}
MCP Plugin (AI Integration)Allows AI tools (Cursor, Claude) to read/write your schema.TypeScript// payload.config.ts
plugins: [
  mcpPlugin({
    enabled: true,
    collections: {
      posts: { actions: { find: true, update: true } }
    }
  })
]
8. Migration: WordPress to Payload (v3)Schema MappingPost Types $\rightarrow$ CollectionsACF Fields $\rightarrow$ FieldsLayout $\rightarrow$ BlocksMigration Script (migration.js)Requires fast-xml-parser, cheerio, mime, jsdom. Place WP XML exports (media.xml, posts.xml) in root.Key Logic Snippets:Media: Parses XML, fetches URL, converts to buffer, uploads to Payload.JavaScriptawait payload.create({
  collection: 'media',
  data: { alt: item.title },
  file: { data: buffer, name: fileName, mimetype: mime.getType(fileName), size: buffer.length }
})
HTML to Lexical: Uses headlessEditor to parse WP HTML content into Lexical JSON blocks.Posts: Maps authors (by slug), categories (by ID map), and content.Frontend Migration (Next.js)Rebuild, don't copy. Use the RenderBlocks pattern.Get Data: generateStaticParams fetches pages at build time.Render: Pass layout data to a block engine.TypeScript// src/utils/RenderBlocks.tsx
export const RenderBlocks = ({ blocks }) => {
  return blocks.map((block, i) => {
    const BlockComponent = blockComponents[block.blockType]
    return BlockComponent ? <BlockComponent key={i} {...block} /> : null
  })
}
9. DeploymentOption A: Vercel (One-Click)Deploy: Click "Deploy" on the repo/template.Integrations: Add Neon Postgres (Database) and Vercel Blob (Storage) during the flow.Env Vars: PAYLOAD_SECRET (generate a random string). Database vars populate automatically.Seed: After deployment, log in to Admin and click "Seed Database" to populate demo content.Option B: Cloudflare (Workers + D1 + R2)Requires Paid Workers Plan.Deploy: Use the Cloudflare One-Click template.Config: Select Region, name D1 database.Updates:Clone the repo.Run pnpm run deploy to update the Worker.10. Templates & Specific Use CasesWebsite TemplateArchitecture: Uses a Component Architecture (Heroes + Layout Blocks).Rendering: Static Site Generation (SSG) with On-Demand Revalidation.Revalidation Hook:TypeScriptconst revalidatePage: CollectionAfterChangeHook = ({ doc }) => {
  if (doc._status === 'published') revalidatePath(`/${doc.slug}`)
  return doc
}
E-commerce Template (Beta)Features: Cart management, inventory, payment adapters (Stripe).Structure: Uses a specialized E-commerce plugin to abstract logic.Quality of Life Features (Recent Updates)Soft Deletes: Restore from Trash.Find Distinct: Query unique values (e.g., tags).UploadThing Adapter: Alternative to S3/R2.React Compiler: Admin panel uses memoization automatically.Document Locking: Prevents simultaneous edits.