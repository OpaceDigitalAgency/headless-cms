# Phase 1 & 2 Gap Analysis (Current State)

- **Template mapping contract (Phase 2):** `ContentTypes.customFields` still aren’t enforced or rendered; dynamic fields remain free-form JSON with no validation/UI generation.

- **Starter/preset coherence (Phase 2):** Presets/starters don’t yet surface the new dynamic content system (no seed data, routes, or archives for custom types), so the feature isn’t productised in starters.

- **Migrations discipline (Phase 1):** No Drizzle migrations were added for new schema (ContentTypes, CustomItems, Settings); still relying on adapter push instead of production-safe migration flow.
