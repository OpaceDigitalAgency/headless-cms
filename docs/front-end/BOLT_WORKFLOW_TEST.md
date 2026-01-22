# Bolt Workflow Test (Manual Checklist)

Date: 2026-01-21

## Goal

Validate the Bolt workflow end-to-end:
generate → copy → wire → render.

## Steps

1. Pick a simple block (e.g., `PromoBlock`) with 3-4 fields.
2. Use `docs/BOLT_PROMPT_TEMPLATE.md` to generate the component in Bolt.
3. Copy the output to `packages/ui/src/blocks/PromoBlock.tsx`.
4. Export it in `packages/ui/src/blocks/index.ts`.
5. Add it to `packages/ui/src/RenderBlocks.tsx`:
   - Key: `promo`
   - Component: `PromoBlock`
6. Add the Payload block definition in `apps/cms/src/blocks/Promo.ts`.
7. Register the block in the relevant collections (e.g., `Pages`).
8. Create a page in the CMS using the new block.
9. Verify the block renders in:
   - Public frontend (`apps/cms`)
   - Preview route

## Pass Criteria

- Block renders with CMS data.
- No data fetching in the Bolt component.
- No runtime errors in preview or build.
