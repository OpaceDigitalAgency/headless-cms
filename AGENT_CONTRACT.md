# Agent Contract

> **Version:** 1.0.0  
> **Last Updated:** January 2025

This document defines the contract for AI agents and developers working with the Payload CMS + Jamstack platform. It specifies how to extend the system correctly while maintaining consistency and avoiding breaking changes.

---

## Table of Contents

1. [Core Principles](#core-principles)
2. [Adding a Collection](#adding-a-collection)
3. [Adding a Template](#adding-a-template)
4. [Field Mapping Contract](#field-mapping-contract)
5. [Adding Blocks](#adding-blocks)
6. [Seeding Data](#seeding-data)
7. [Preview vs Publish Flow](#preview-vs-publish-flow)
8. [Revalidation Rules](#revalidation-rules)
9. [What MUST NOT Be Changed](#what-must-not-be-changed)
10. [Version Control Guidelines](#version-control-guidelines)

---

## Core Principles

### Single Source of Truth

Every concept in the system should have **exactly one definition**:

- **Collection definitions** live in `apps/cms/src/collections/`
- **Block definitions** live in `apps/cms/src/blocks/`
- **Type definitions** live in `packages/shared/src/types.ts`
- **Field mappings** live in `packages/shared/src/field-mappings.ts`
- **Templates** live in `packages/templates/src/`

### OOP Patterns and Reuse

- Use **composition over duplication**
- Create **base classes** for common functionality
- Use **shared field definitions** for repeated field patterns
- Create **utility functions** for common operations

### Fail-Fast Validation

- Invalid configurations should fail at build time, not runtime
- Use TypeScript strict mode
- Validate field mappings before rendering

---

## Adding a Collection

### Step 1: Create the Collection File

Create a new file in `apps/cms/src/collections/`:

```typescript
// apps/cms/src/collections/Products.ts
import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Products: CollectionConfig = {
  slug: 'products',
  
  admin: {
    useAsTitle: 'name',
    group: 'Shop', // Group in admin sidebar
    defaultColumns: ['name', 'price', '_status', 'updatedAt'],
  },

  // Enable versions for content collections
  versions: {
    drafts: {
      autosave: { interval: 300 },
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },

  // Access control
  access: {
    read: ({ req: { user } }) => {
      if (!user) return { _status: { equals: 'published' } }
      return true
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },

  // Revalidation hooks
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (doc._status === 'published') {
          await triggerRevalidation(req, 'products', doc.slug)
        }
        return doc
      },
    ],
  },

  fields: [
    { name: 'name', type: 'text', required: true },
    slugField(),
    // ... other fields
  ],
}
```

### Step 2: Register in payload.config.ts

```typescript
// apps/cms/src/payload.config.ts
import { Products } from './collections/Products'

export default buildConfig({
  collections: [
    // ... existing collections
    Products,
  ],
})
```

### Step 3: Add Types to Shared Package

```typescript
// packages/shared/src/types.ts
export interface Product {
  id: string
  name: string
  slug: string
  // ... other fields
}
```

### Step 4: Create Field Mappings

```typescript
// packages/shared/src/field-mappings.ts
export const productFieldMappings: FieldMapping[] = [
  { cmsField: 'name', templateField: 'title', transform: 'direct' },
  { cmsField: 'price', templateField: 'price', transform: 'currency' },
]
```

---

## Adding a Template

### Step 1: Create Template File

```typescript
// packages/templates/src/product/ProductDetail.tsx
import type { Product } from '@repo/shared'
import { mapFields } from '../utils/field-mapper'

interface ProductDetailProps {
  data: Product
}

export function ProductDetail({ data }: ProductDetailProps) {
  const mapped = mapFields(data, productFieldMappings)
  
  return (
    <article className="product-detail">
      <h1>{mapped.title}</h1>
      <p className="price">{mapped.price}</p>
    </article>
  )
}
```

### Step 2: Export from Index

```typescript
// packages/templates/src/index.ts
export { ProductDetail } from './product/ProductDetail'
```

### Step 3: Register Template in Collection

Add the template option to the collection's `template` field:

```typescript
{
  name: 'template',
  type: 'select',
  options: [
    { label: 'Product Detail', value: 'product-detail' },
    { label: 'Product Card', value: 'product-card' },
  ],
}
```

---

## Field Mapping Contract

### Mapping Structure

```typescript
interface FieldMapping {
  cmsField: string        // Field name in Payload CMS
  templateField: string   // Field name expected by template
  transform?: TransformType
  required?: boolean
  fallback?: any
}

type TransformType = 
  | 'direct'      // Pass through as-is
  | 'richText'    // Convert Lexical JSON to HTML
  | 'date'        // Format date string
  | 'currency'    // Format as currency
  | 'image'       // Extract URL from media relation
  | 'relation'    // Resolve relationship
  | 'array'       // Map array items
```

### Validation Rules

1. **Required fields** must exist in CMS data
2. **Transform functions** must handle null/undefined
3. **Fallbacks** are used when field is missing
4. **Type mismatches** should throw at build time

### Example Mapping

```typescript
export const artifactFieldMappings: FieldMapping[] = [
  { cmsField: 'title', templateField: 'title', transform: 'direct', required: true },
  { cmsField: 'description', templateField: 'body', transform: 'richText' },
  { cmsField: 'featuredImage', templateField: 'image', transform: 'image' },
  { cmsField: 'dateCreated', templateField: 'date', transform: 'date' },
  { cmsField: 'people', templateField: 'creators', transform: 'relation' },
]
```

---

## Adding Blocks

### Step 1: Create Block Definition

```typescript
// apps/cms/src/blocks/Pricing.ts
import type { Block } from 'payload'

export const pricingBlock: Block = {
  slug: 'pricing',
  labels: {
    singular: 'Pricing Table',
    plural: 'Pricing Tables',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'plans',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'price', type: 'number', required: true },
        { name: 'features', type: 'array', fields: [
          { name: 'feature', type: 'text' },
        ]},
      ],
    },
  ],
}
```

### Step 2: Export from Index

```typescript
// apps/cms/src/blocks/index.ts
export { pricingBlock } from './Pricing'
```

### Step 3: Add to Collection

```typescript
// In Pages.ts or relevant collection
import { pricingBlock } from '../blocks/Pricing'

{
  name: 'content',
  type: 'blocks',
  blocks: [
    // ... existing blocks
    pricingBlock,
  ],
}
```

### Step 4: Create Block Template

```typescript
// packages/templates/src/blocks/PricingBlock.tsx
export function PricingBlock({ data }) {
  return (
    <section className="pricing">
      <h2>{data.heading}</h2>
      <div className="plans">
        {data.plans.map(plan => (
          <PlanCard key={plan.name} plan={plan} />
        ))}
      </div>
    </section>
  )
}
```

---

## Seeding Data

### Creating a Preset Seeder

```typescript
// apps/cms/src/seed/presets/mypreset.ts
import { BaseSeeder, createRichText } from '../base'

export class MyPresetSeeder extends BaseSeeder {
  getPresetId(): string {
    return 'my-preset'
  }

  getCollections(): string[] {
    return ['pages', 'products']
  }

  async seed(): Promise<void> {
    this.log('Starting seed...')
    await this.seedProducts()
    await this.seedPages()
    this.log('Seed completed!')
  }

  async clear(): Promise<void> {
    await this.clearCollection('products')
    await this.clearCollection('pages')
  }

  private async seedProducts(): Promise<void> {
    await this.create('products', {
      name: 'Sample Product',
      slug: 'sample-product',
      price: 99.99,
      _status: 'published',
    })
  }
}
```

### Registering the Seeder

```typescript
// apps/cms/src/seed/presets/index.ts
export { MyPresetSeeder } from './mypreset'

// Add to PRESET_IDS and PRESET_METADATA
```

---

## Preview vs Publish Flow

### Draft Mode

1. User edits content in admin panel
2. Changes are saved as **draft** (`_status: 'draft'`)
3. Preview URL shows draft content via `/preview/[collection]/[slug]`
4. Frontend uses `?draft=true` parameter

### Publish Mode

1. User clicks "Publish" in admin panel
2. Status changes to **published** (`_status: 'published'`)
3. `afterChange` hook triggers revalidation
4. Frontend cache is invalidated
5. Public URL shows published content

### Preview URL Pattern

```
/preview/[collection]/[slug]?secret=[PREVIEW_SECRET]
```

### API Endpoints

- **Draft content:** `GET /api/[collection]?draft=true`
- **Published content:** `GET /api/[collection]`

---

## Revalidation Rules

### Tag Naming Convention

| Tag Pattern | Description | Example |
|-------------|-------------|---------|
| `collection:[name]` | All items in collection | `collection:posts` |
| `[collection]:[id]` | Specific item | `posts:abc123` |
| `archive:[collection]` | Archive/listing pages | `archive:posts` |
| `taxonomy:[type]:[slug]` | Taxonomy term pages | `taxonomy:category:tech` |
| `global:[slug]` | Global settings | `global:header` |

### Dependency Rules

When content changes, these tags should be invalidated:

| Change Type | Tags to Invalidate |
|-------------|-------------------|
| Page updated | `pages:[id]`, `collection:pages` |
| Post updated | `posts:[id]`, `collection:posts`, `archive:posts` |
| Category updated | `categories:[id]`, `taxonomy:category:[slug]`, `archive:posts` |
| Header updated | `global:header`, `collection:pages` |
| Media updated | `media:[id]`, related content tags |

### Revalidation Endpoint

```typescript
POST /api/revalidate
{
  "secret": "REVALIDATION_SECRET",
  "collection": "posts",
  "slug": "my-post",
  "tags": ["posts:abc123", "archive:posts"]
}
```

---

## What MUST NOT Be Changed

### Critical Files - DO NOT MODIFY

1. **`packages/shared/src/types.ts`** - Core type definitions
   - Only ADD new types, never remove or rename existing ones
   
2. **`apps/cms/src/collections/Users.ts`** - User authentication
   - Changing this can break authentication

3. **Database migrations** - Once deployed
   - Create new migrations instead of modifying existing ones

4. **Environment variable names** - Used by Railway template
   - `DATABASE_URL`, `PAYLOAD_SECRET`, `REVALIDATION_SECRET`

### Breaking Changes to Avoid

1. **Renaming collection slugs** - Breaks URLs and relationships
2. **Removing required fields** - Breaks existing content
3. **Changing field types** - Requires data migration
4. **Modifying access control** - Can expose private data

### Safe Modifications

1. Adding new collections
2. Adding new fields (optional)
3. Adding new blocks
4. Adding new templates
5. Adding new endpoints
6. Updating admin UI components

---

## Version Control Guidelines

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `release/*` - Release preparation

### Database Changes

⚠️ **WARNING:** Before pushing code that affects the database:

1. Set `RESET_DB=true` in your environment
2. Push the code
3. Verify migrations ran correctly
4. Set `RESET_DB=false`

---

## Quick Reference

### File Locations

| Component | Location |
|-----------|----------|
| Collections | `apps/cms/src/collections/` |
| Blocks | `apps/cms/src/blocks/` |
| Fields | `apps/cms/src/fields/` |
| Globals | `apps/cms/src/globals/` |
| Endpoints | `apps/cms/src/endpoints/` |
| Seed Data | `apps/cms/src/seed/` |
| Types | `packages/shared/src/types.ts` |
| Mappings | `packages/shared/src/field-mappings.ts` |
| Templates | `packages/templates/src/` |
| Presets | `presets/` |

### Common Commands

```bash
# Development
make dev              # Start all services
make dev-cms          # Start CMS only
make seed-museum      # Seed museum data
make seed-blog        # Seed blog data

# Building
make build            # Build all packages
make typecheck        # Run type checking

# Database
make db-migrate       # Run migrations
make db-reset         # Reset database

# Scaffolding
make create           # Create new project (interactive)
./scripts/create.sh blog-astro my-blog  # Create blog project
```

---

## Support

For questions or issues with this contract:

1. Check existing documentation in `/docs`
2. Review the README.md
3. Open an issue on GitHub
