
# Base vs Optional Content Types – Clarification for AI Agents & Developers

This document clarifies **what is a base content type**, **what is optional**, and **how these choices are surfaced to users immediately on CMS install**.

It exists to prevent confusion between:
- base templates
- optional content types
- custom content types
- navigation visibility
- runtime vs code-time behaviour

---

## Core Principle

**Only Page and Post are mandatory.  
Everything else is optional and user-enabled.**

Optional does NOT mean:
- hidden behind settings
- buried in documentation
- unavailable without code changes

Optional means:
- clearly visible
- clearly explained
- intentionally enabled by the user

---

## Mandatory Content Types (Always Enabled)

These are installed and enabled by default because they are fundamental to almost every site.

- **Page**
  - URL-based, block-composed content
  - Used for homepage, about, contact, landing pages

- **Post**
  - Feed-based editorial content
  - Used for blogs, news, updates

These two types are the absolute minimum viable CMS.

---

## Optional Base Content Types (Visible but Disabled by Default)

These are **first-class base templates**, but are **not enabled automatically**.

They are shown to the user immediately on install with:
- a clear description
- an explicit “Enable” action
- no implication that they are already active

### Optional Base Templates

- **Archive Item**
  - Generic structured record with rich metadata
  - Foundation for portfolios, artworks, artefacts, collections

- **Person**
  - Profile-based entity
  - Foundation for team members, authors, actors, characters

- **Place**
  - Location-based entity
  - Addresses, maps, opening hours, regions
  - Supports taxonomy (e.g. city, town, region)

- **Event**
  - Time-based entity
  - Dates, venues, schedules, recurrence

- **Product**
  - Commerce entity
  - Only available when Shop is enabled

- **FAQ**
  - Question / answer pairs
  - Reusable across pages
  - Distinct data shape and workflow

These are **base types**, not presets, because they have:
- a distinct data model
- a distinct editing workflow
- a distinct reuse pattern

---

## Visibility & Enablement Rules

On first install, users must see:

- Page (enabled)
- Post (enabled)
- All optional base templates (visible, disabled)

Example UI language:
> “Enable the content types you need. You can enable more at any time.”

There must be:
- no hidden settings page
- no implied activation
- no “Disable” button (collections cannot be removed at runtime)

Instead:
- Enable / Create
- Manage visibility via Navigation Settings

---

## Custom Content Types (User-Created)

Once a base template is enabled, users can create **custom content types** from it.

Custom content types:
- extend a base template
- rename fields
- add new fields
- define labels and descriptions
- optionally participate in shared taxonomy

Examples:
- Case Study → based on Post
- Service → based on Page or Archive Item
- Venue → based on Place
- Gallery → based on Archive Item
- Actor / Author → based on Person
- Exhibition → based on Event

These are NOT base templates and are NOT shipped by default.

---

## What This System Avoids

- Shipping niche content types nobody asked for
- Forcing everything into a single “Archive” abstraction
- Confusing editors with technical terms like “collection”
- Pretending collections can be disabled at runtime

---

## Single Source of Truth Rule

- **Base templates** define fundamental shapes of content
- **Optional base templates** are visible but user-enabled
- **Custom content types** are always created by the user
- **Navigation Settings** control visibility, not existence

---

## Summary (For AI Agents)

If you are an AI agent or developer working in this codebase:

- Do NOT assume all content types are enabled
- Do NOT add niche collections by default
- Do NOT use the word “Disable” for collections
- DO surface optional base templates clearly
- DO guide users to enable what they need
- DO treat Page and Post as the only mandatory types

This document overrides any older assumptions.
