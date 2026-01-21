# Bolt Component Contract (Shared UI + Templates)

Date: 2026-01-21

## Purpose

Bolt is a **component generator only**. Components must be drop-in, presentational, and compatible with the shared UI + template system.

This contract keeps Bolt output reusable in:
- `apps/cms` (Next.js bundled frontend)
- `apps/astro` (optional)
- `packages/ui` and `packages/templates` (single source of truth)

## Core Rules (Non-Negotiable)

1. **Props-only**: components accept props and render UI. No data fetching.
2. **No runtime side effects**: no `fetch`, no `useEffect` for data, no `localStorage`, no `process.env`.
3. **No routing logic**: no `next/navigation`, no `useRouter`, no server actions.
4. **No global CSS**: use Tailwind classes only (no `<style>` tags, no CSS files).
5. **No new deps**: stick to `react`, `next` (if required), and `@repo/shared` types.
6. **Accessibility**: proper headings, alt text, button types, aria labels when needed.

## Component Signatures

### Blocks (in `packages/ui/src/blocks`)

Signature:
```tsx
export function ExampleBlock({ block }: { block: ExampleBlockProps }) {
  return <section>...</section>
}
```

Rules:
- Accept a single `block` prop.
- `block.blockType` and `block.id` are always present.
- Use block fields only (no lookups).

### Templates (in `packages/templates/src`)

Signature:
```tsx
export interface ExampleTemplateProps {
  heading: string
  body?: React.ReactNode
}

export function ExampleTemplate(props: ExampleTemplateProps) {
  return <main>...</main>
}
```

Rules:
- Props must be explicit (no implicit data access).
- Template composition uses `@repo/ui` blocks/primitives.

### Header / Footer (in `packages/ui/src/components`)

Signature:
```tsx
import type { HeaderGlobal, FooterGlobal } from '@repo/shared'

export function Header({ data }: { data: HeaderGlobal }) {
  return <header>...</header>
}
```

Rules:
- Props are `HeaderGlobal`/`FooterGlobal` only.
- No internal fetching or global reads.

## File + Export Rules

Blocks:
- File: `packages/ui/src/blocks/<Name>Block.tsx`
- Export: `export function <Name>Block(...)`
- Add to `packages/ui/src/blocks/index.ts`
- Wire in `packages/ui/src/RenderBlocks.tsx`

Templates:
- File: `packages/templates/src/<Name>Template.tsx`
- Export from `packages/templates/src/index.ts`

Header/Footer:
- File: `packages/ui/src/components/<Name>.tsx`
- Export from `packages/ui/src/components/index.ts`

## Allowed Imports

- `react`
- `next/link` or `next/image` (only if the component targets Next.js runtime)
- `@repo/shared` types
- `@repo/ui` primitives/components (for templates)

## Disallowed Imports

- Anything in `apps/*`
- Payload SDK or CMS APIs
- `next/navigation`, `next/headers`, `next/server`
- Data fetching libs (SWR, React Query)

## Integration Steps (Manual Wiring)

1. Copy Bolt-generated component into the correct package.
2. Confirm it matches the signature above.
3. Export it in the package index.
4. Add it to the `RenderBlocks` registry (for blocks).
5. Map it to a Payload block slug in `apps/cms/src/blocks`.
6. Use normal CMS content to verify rendering.
