# Seeded Pages Audit

Date: 2026-01-21

This audit is based on the preset seed files in `apps/cms/src/seed/presets/`. It confirms which pages are created and which blocks each page uses. Visual QA should still be done in the browser after tokenization.

## Core Preset (`core.ts`)

- Home (`/home`)
  - Hero: fullscreen
  - Blocks: grid (cards), archive (featured items)
- About (`/about`)
  - Hero: standard
  - Blocks: content (rich text), timeline

Notes:
- Minimal page count (2). Good baseline but limited block variety.

## Blog Preset (`blog.ts`)

- Home (`/home`)
  - Hero: fullscreen
  - Blocks: content, stats, archive (posts), testimonials, CTA
- About (`/about`)
  - Hero: standard
  - Blocks: content, features, team, content (values), CTA
- Contact (`/contact`)
  - Hero: standard
  - Blocks: content, content (contact info), FAQ

Notes:
- Strong coverage of core blocks. Good for testing tokenized styles.

## Brochure Preset (`brochure.ts`)

- Home (`/home`)
  - Hero: fullscreen
  - Blocks: grid (features), content (two columns), grid (stats), CTA
- About (`/about`)
  - Hero: standard
  - Blocks: content, grid (values), timeline
- Services (`/services`)
  - Hero: standard
  - Blocks: grid (cards), CTA
- Contact (`/contact`)
  - Hero: minimal
  - Blocks: content, form, grid (icons)
- Privacy (`/privacy`)
  - Hero: minimal
  - Blocks: content (single column)

Notes:
- Good variety, but Privacy is intentionally minimal.

## Ecommerce Preset (`ecommerce.ts`)

- Home (`/home`)
  - Hero: fullscreen
  - Blocks: grid (categories), archive (products)
- About (`/about`)
  - Hero: standard
  - Blocks: content, grid (features)
- Contact (`/contact`)
  - Hero: minimal
  - Blocks: content, form

Notes:
- Adequate coverage for shop UX. Lacks testimonials/CTA by default.

## Follow-Up Visual QA (Recommended)

After tokenization:
- Verify header/footer, hero, grid, and form blocks for each preset.
- Confirm cards/buttons/text use tokens (not hardcoded colors).
- Confirm skins change typography, spacing, and card styles consistently.
