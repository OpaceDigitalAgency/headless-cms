# Bolt Prompt Template (Component Generator)

Use this prompt when asking Bolt to generate a block, template, header, or footer component that can be dropped into the shared UI.

---

## Prompt

You are generating a **presentational React component** for a Payload CMS + Next.js monorepo.

Follow this contract exactly:
- Props-only, no data fetching.
- No `useEffect` for data.
- No `next/navigation` or routing logic.
- Tailwind classes only. No CSS files or `<style>` tags.
- No new dependencies.
- Use accessible HTML (headings, button types, alt text).

Target location:
- Blocks: `packages/ui/src/blocks/<Name>Block.tsx`
- Templates: `packages/templates/src/<Name>Template.tsx`
- Header/Footer: `packages/ui/src/components/<Name>.tsx`

Component type: {{COMPONENT_TYPE}}
Component name: {{COMPONENT_NAME}}
Props schema (TypeScript interface): {{PROPS_SCHEMA}}
Design brief: {{DESIGN_BRIEF}}

Output rules:
1) Return a single `.tsx` file only.
2) Use a named export `export function {{COMPONENT_NAME}}(...)`.
3) No markdown outside the code.

---

## Example Input

Component type: Block  
Component name: GalleryBlock  
Props schema:
```ts
interface GalleryBlockProps {
  block: {
    blockType: 'gallery'
    id?: string
    heading?: string
    images: Array<{ url: string; alt?: string }>
    columns?: 2 | 3 | 4
  }
}
```
Design brief:
Clean masonry-style gallery with a compact heading and hover captions.

---

## Example Output (shape only)

```tsx
export function GalleryBlock({ block }: GalleryBlockProps) {
  return (
    <section className="...">
      ...
    </section>
  )
}
```
