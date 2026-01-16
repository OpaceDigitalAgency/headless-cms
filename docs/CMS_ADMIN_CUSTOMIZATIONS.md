# Payload CMS Admin Customizations

This document captures the bespoke admin/UI work done in this repo so it can be rebuilt in a clean Astro/Payload setup. Each section lists what it does, the files involved, and the implementation notes you need to recreate it.

## 1) Two-Panel Navigation Shell
- **Files:** `apps/cms/src/admin/TwoPanelNav.tsx`, `apps/cms/src/admin/navData.ts`, `apps/cms/src/admin/ThemeToggle.tsx`, `apps/cms/src/admin/HeaderActions.tsx` (optional), `apps/cms/src/app/(payload)/custom.scss` (styling), `apps/cms/src/payload.config.ts` (admin.components), `apps/cms/src/app/(payload)/admin/importMap.js` (maps components to Payload).
- **What it does:** Replaces Payload’s default nav with a fixed top bar and a side rail that lists sections (Dashboard, Content, Media, Site Settings, Admin). Includes icon set, inline search, theme toggle with localStorage persistence, and an account dropdown (My Account + Logout).
- **How it was wired:** In `payload.config.ts`, `admin.components.Nav` is set to `/admin/TwoPanelNav`. `admin.importMap.baseDir` points to `apps/cms/src`, letting the import map resolve those components. `importMap.js` maps `/admin/TwoPanelNav` and other custom admin components so Payload can render them.
- **Icons:** Inline SVGs are defined inside `TwoPanelNav.tsx` (see `NavIcon` map).
- **Account + logout:** `TwoPanelNav` includes an account button with a dropdown; logout posts to `/api/users/logout` then routes to `/admin/login`.
- **Theme toggle:** `ThemeToggle.tsx` stores the choice in `localStorage` under `payload-theme`, sets `document.documentElement.dataset.theme`, and syncs CSS vars (dark/light palettes defined in `custom.scss`).
- **Nav data:** `navData.ts` defines the sections/items and a helper `resolveActiveSection` used by `TwoPanelNav` to highlight the current section.
- **Key CSS (top bar, links, search, account dropdown) — from `apps/cms/src/app/(payload)/custom.scss`:**
  ```css
  .ra-top-nav { position: fixed; top: 0; height: 60px; background: var(--theme-elevation-50); border-bottom: 1px solid var(--theme-elevation-100); display: flex; align-items: center; gap: 0.5rem; padding: 0 2rem; z-index: 100; }
  .ra-top-nav__link { padding: 0.75rem 1.5rem; color: var(--theme-text); border-radius: 6px; font-weight: 500; }
  .ra-top-nav__link--active { background: var(--theme-elevation-150); color: var(--theme-success-500); }
  .ra-top-nav__search { position: relative; max-width: 280px; margin: 0 8px; }
  .ra-top-nav__search-input { display: flex; gap: 8px; background: var(--theme-elevation-100); border: 1px solid var(--theme-elevation-250); border-radius: 999px; padding: 6px 14px; }
  .ra-top-nav__search-input input { background: transparent; border: none; min-width: 160px; font-size: 13px; }
  .ra-top-nav__search-results { position: absolute; top: calc(100% + 8px); right: 0; width: min(420px, 80vw); background: var(--theme-elevation-100); border: 1px solid var(--theme-elevation-250); border-radius: 16px; padding: 6px; box-shadow: var(--shadow-xl); z-index: 9999; }
  .ra-top-nav__search-result { padding: 10px 12px; border-radius: 12px; display: flex; justify-content: space-between; }
  .ra-top-nav__account-btn { display: flex; gap: 6px; padding: 6px 12px; border: 1px solid var(--theme-elevation-250); border-radius: 4px; }
  .ra-top-nav__dropdown { position: absolute; top: calc(100% + 4px); right: 0; min-width: 150px; background: var(--theme-elevation-100); border: 1px solid var(--theme-elevation-250); border-radius: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.5); }
  ```

## 2) Custom Views: Dashboard + Tools
- **Files:** `apps/cms/src/admin/views/Dashboard.tsx`, `apps/cms/src/admin/views/Tools.tsx`, `apps/cms/src/payload.config.ts`, `apps/cms/src/app/(payload)/admin/importMap.js`.
- **What it does:** Dashboard shows collection stats (counts via `/api/*?limit=0`), recent updates (sorted by updatedAt), drafts needing review, quick-create buttons, and site-config shortcuts. Tools page is a lightweight landing page with quick links for QA, publishing calendar, and media audit.
- **How it was wired:** In `payload.config.ts`, `admin.components.views.dashboard.Component` points to `/admin/views/Dashboard` and `admin.components.views.tools.Component` points to `/admin/views/Tools` with path `/tools`. `importMap.js` maps these paths to the compiled components so Payload can load them.
- **Styling:** Relies on the global overrides in `custom.scss` (typography, colors, cards). No extra CSS module.
- **Key CSS (cards, grids) — from `custom.scss`:**
  ```css
  .ra-dashboard { padding: 32px; max-width: 1400px; }
  .ra-dashboard__stats { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
  .ra-dashboard__stat-card { background: var(--theme-elevation-150); border: 1px solid var(--theme-elevation-250); border-radius: var(--border-radius-lg); padding: 20px; display: flex; gap: 16px; }
  .ra-dashboard__grid { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
  .ra-tools__grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
  .ra-tools__card { background: var(--theme-elevation-150); border: 1px solid var(--theme-elevation-250); border-radius: var(--border-radius-lg); padding: 18px; box-shadow: var(--shadow-md); }
  ```

## 3) Collapsible Sidebar Rail (Icon-Only When Closed)
- **Files:** `apps/cms/src/app/(payload)/custom.scss`, `apps/cms/src/admin/TwoPanelNav.tsx`, `apps/cms/src/admin/navData.ts`.
- **What it does:** When the Payload template class is not `template-default--nav-open` (or `template-minimal--nav-open`), the sidebar collapses to a 72px rail that shows only icons. When open, it shows labels/headings.
- **How it was done:** `custom.scss` targets Payload’s layout classes (`.template-default`, `.template-minimal`) and adjusts `grid-template-columns`, sidebar width, padding, and visibility of headings/labels based on the presence of `--nav-open`. No extra JS beyond Payload’s built-in toggle; `TwoPanelNav` renders the links and icons that shrink responsively.
- **Nav items:** Defined in `navData.ts` and rendered by `TwoPanelNav.tsx`; CSS handles the visual state.
- **Key CSS (layout + collapsed rail) — from `custom.scss`:**
  ```css
  .template-default, .template-minimal { margin-top: 60px; grid-template-columns: 72px 1fr; transition: grid-template-columns 0.2s ease-in-out; }
  .template-default.template-default--nav-open, .template-minimal.template-minimal--nav-open { grid-template-columns: 220px 1fr; }
  .ra-side-nav { position: fixed; top: 122px; left: 0; width: 220px; height: calc(100vh - 72px); background: var(--theme-elevation-50); border-right: 1px solid var(--theme-elevation-150); padding: 1rem 0; }
  .template-default:not(.template-default--nav-open) .ra-side-nav,
  .template-minimal:not(.template-minimal--nav-open) .ra-side-nav { width: 72px; padding: 12px 8px; gap: 6px; }
  .template-default:not(.template-default--nav-open) .ra-side-nav__heading { display: none; }
  .ra-side-nav__link { display: flex; align-items: center; gap: 10px; padding: 0.625rem 1.5rem; border-radius: 12px; }
  .template-default:not(.template-default--nav-open) .ra-side-nav__link { width: 44px; height: 44px; margin: 4px auto; padding: 0; border-radius: 12px; justify-content: center; }
  .template-default:not(.template-default--nav-open) .ra-side-nav__label { display: none; }
  .template-default:not(.template-default--nav-open) .ra-side-nav__icon { width: 44px; height: 44px; }
  ```

## 4) Top-Bar Search (Collections/Globals/Docs)
- **Files:** `apps/cms/src/admin/TwoPanelNav.tsx` (the `AdminSearch` component is inline there).
- **What it does:** A global search box in the top bar that:
  - Instantly lists matching collections/globals based on the query.
  - Debounces fetches (300ms) to `/api/{collection}` with `limit=3` and `contains` filters to surface documents across key collections.
  - Shows a clickable results dropdown; pressing Enter routes to the first result.
- **Config:** `collectionSearchConfig` and `globalLinks` arrays inside `TwoPanelNav.tsx` drive which collections/globals are searched and how titles are derived (`title`/`name` fields).
- **Routing:** Uses Next’s `useRouter` to push to admin collection/global/doc routes.
- **Key CSS (search pill + dropdown) — from `custom.scss`:**
  ```css
  .ra-top-nav__search { position: relative; max-width: 280px; }
  .ra-top-nav__search-input { display: flex; align-items: center; gap: 8px; background: var(--theme-elevation-100); border: 1px solid var(--theme-elevation-250); border-radius: 999px; padding: 6px 14px; }
  .ra-top-nav__search-input input { background: transparent; border: none; min-width: 160px; font-size: 13px; }
  .ra-top-nav__search-results { position: absolute; top: calc(100% + 8px); right: 0; width: min(420px, 80vw); background: var(--theme-elevation-100); border: 1px solid var(--theme-elevation-250); border-radius: 16px; padding: 6px; box-shadow: var(--shadow-xl); }
  .ra-top-nav__search-result { display: flex; justify-content: space-between; gap: 12px; padding: 10px 12px; border-radius: 12px; }
  ```

## 5) Mobile-Friendly Nav Treatment
- **Files:** `apps/cms/src/app/(payload)/custom.scss`, `apps/cms/src/admin/TwoPanelNav.tsx`.
- **What it does:** Keeps a visible slim rail on collapse (72px), hides labels/headings, and preserves icon pills for touch targets. Top bar is fixed and responsive; body/background gradients are theme-aware.
- **CSS specifics:** In `custom.scss`, look for rules that:
  - Set `grid-template-columns` to `72px 1fr` when nav is closed; `220px 1fr` when open.
  - Hide `.ra-side-nav__heading` and text labels when collapsed; keep icons centered.
  - Fix the top bar at 60px height with padding and backdrop colors for both themes.
  - Apply dark/light theme variables, font faces (Sora, JetBrains Mono), login rebrand, and general admin theming.

## Supporting Pieces (used by several items above)
- **Import map:** `apps/cms/src/app/(payload)/admin/importMap.js` registers all custom admin components (TwoPanelNav, LivePreviewZoom, Dashboard, Tools) for Payload’s admin runtime.
- **Admin config:** `apps/cms/src/payload.config.ts` sets `admin.components.Nav`, the custom views under `admin.components.views`, and the import map base directory.
- **Live preview helpers:** `apps/cms/src/admin/LivePreviewZoom.tsx` (persistent zoom), `apps/cms/src/admin/LivePreviewLink.tsx` (per-doc live link), `apps/cms/src/util/preview.ts` (URL builders) if you also want the preview UX parity when rebuilding.

## Rebuild Checklist (clean install)
1) Copy `TwoPanelNav.tsx`, `navData.ts`, `ThemeToggle.tsx`, `HeaderActions.tsx` (optional), `custom.scss`, `Dashboard.tsx`, `Tools.tsx`, `LivePreviewZoom.tsx`, `LivePreviewLink.tsx`, and `util/preview.ts` into the same relative paths.
2) Update `payload.config.ts`:
   - `admin.components.Nav = '/admin/TwoPanelNav'`
   - `admin.components.views.dashboard.Component = '/admin/views/Dashboard'`
   - `admin.components.views.tools = { Component: '/admin/views/Tools', path: '/tools' }`
   - Set `admin.importMap.baseDir` to the CMS `src` directory.
3) Ensure `apps/cms/src/app/(payload)/admin/importMap.js` includes entries mapping those component paths.
4) Make sure `custom.scss` is loaded by Payload (place under `(payload)/custom.scss`, matching the current structure).
5) Verify fonts/assets referenced in `custom.scss` (`/fonts/Sora-*.ttf`, `/fonts/JetBrainsMono-*.ttf`) exist or adjust URLs.
6) Test collapse/expand: toggle the Payload nav; confirm grid columns shift and icon-only rail appears on collapse. Test search: type a term, see instant collection/global matches and fetched docs; Enter should navigate to the first result.
