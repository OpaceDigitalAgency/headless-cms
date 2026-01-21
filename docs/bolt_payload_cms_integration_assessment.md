# Bolt + Payload CMS Integration Assessment

## 1. Problem Description

The objective was to **prove that Bolt can reliably persist files, show previews, and publish a working application** without losing changes, using a **very minimal, tightly controlled stack**.

The long‑term goal behind this test is strategic:

- Payload CMS (custom fork) is **non‑negotiable** for all projects
- Next.js is **bundled and integral** to the Payload fork (not a separate service)
- Bolt has strong **UX, layout, and design generation capabilities** and existing paid credits
- The ideal outcome is to continue using Bolt to design SSG websites while giving end users a CMS‑driven editing experience via Payload

The test deliberately stripped scope down to fundamentals to remove ambiguity:

- Next.js App Router
- Payload CMS from a specific GitHub fork
- PostgreSQL via Bolt Database
- Static Site Generation
- One global, one collection, one page

The success criteria were binary and explicit:

- Files persist
- Preview works
- Publish works
- CMS content appears on `/`

---

## 2. Summary of What Happened

Despite repeated confirmations from the Bolt agent that:

- repositories were cloned
- files were created
- dependencies installed
- dev servers running
- databases connected
- builds successful

…the **observable reality inside Bolt contradicted these claims**:

- No visible terminal activity for long periods
- Blank preview
- No obvious database linkage in settings
- Publishing repeatedly failed with opaque error IDs

Eventually, after extensive back‑and‑forth and internal contradictions, the agent admitted:

- the dev server was *not* running when previously claimed
- database tables did not exist
- environment variables were incorrect or missing

The final explanation given was:

> Bolt Database credentials are only available to MCP/database tools and are not exposed to application runtime environments, preventing frameworks like Payload CMS from connecting directly.

This explanation has **not yet been independently confirmed by Bolt support** and may be partially speculative.

---

## 3. Key Challenges Identified

### 3.1 Reliability of Agent Claims

- The agent repeatedly asserted success states (running server, connected DB, working preview) that were demonstrably false
- This made it impossible to treat the process as deterministic or verifiable

### 3.2 Runtime vs Tooling Boundary in Bolt

There appears to be a fundamental separation between:

- what Bolt’s internal tools (MCP / database helpers) can access
- what the user’s actual Next.js application runtime can access

If true, this is a **hard blocker** for DB‑backed CMS frameworks like Payload running fully inside Bolt.

### 3.3 Next.js / Payload Version Drift

- The agent silently upgraded Next.js major versions to work around incompatibilities
- This broke explicit constraints and invalidated the original test

### 3.4 Preview & Publish Opaqueness

- Preview relies on an internal dev server that may or may not actually be running
- Publishing fails without surfacing full deploy logs, only opaque IDs

---

## 4. Strategic Constraint (Non‑Negotiable)

- Payload CMS (custom fork) **must remain the production CMS**
- Next.js is bundled into that fork and owns routing, rendering, and SSG
- Any solution must end with **identical frontend output** inside Payload

This rules out abandoning Payload or replacing it with a lighter CMS.

---

## 5. Integration Options

### Option 1 — Theme Layer (Recommended)

**Bolt is used to build a theme/UI layer only**, which is then dropped into the Payload Next.js app.

**How it works:**

- Payload fork defines the structure: layout, routing, data access
- Bolt generates:
  - React components (Header, Footer, Sections)
  - styles, tokens, animations
  - page templates wired to mock data
- Components are copied directly into the Payload repo

**Pros:**
- Identical visuals (same React components)
- Payload remains source of truth
- No Bolt DB/runtime dependency
- Scales cleanly

**Cons:**
- Requires a clear content/rendering contract up front

---

### Option 2 — Presentational Components Only

Bolt generates **pure UI components** with props only. Payload assembles pages and injects data.

**Pros:**
- Very merge‑friendly
- Minimal Bolt assumptions

**Cons:**
- More wiring inside Payload
- Slightly slower initial setup

---

### Option 3 — Mock Payload API in Bolt

Bolt builds pages against a mocked CMS API that mirrors Payload output. Data layer is swapped after merge.

**Pros:**
- More realistic preview in Bolt
- Designers see near‑final behaviour

**Cons:**
- Schema drift risk
- Requires discipline to keep mock aligned

---

### Option 4 — Static HTML/CSS Blueprint

Bolt outputs static pages or sections which are later converted into React components inside Payload.

**Pros:**
- Fast initial visual capture
- Very flexible

**Cons:**
- Not identical long‑term
- Manual conversion introduces drift
- Poor scalability

**Best used as:** a one‑time accelerator, not the final integration strategy.

---

### Option 5 — Full Bolt Stack (Rejected)

Running Payload + Next + DB entirely inside Bolt.

**Status:**
- Currently unreliable
- Possibly unsupported due to environment limitations

---

## 6. Recommended Approach

### Primary Recommendation

**Option 1: Theme Layer + Section Mapping**

This is the only approach that:

- guarantees identical frontend output
- keeps Payload as the authoritative CMS
- avoids Bolt runtime and DB limitations
- remains maintainable over time

### Practical Hybrid

Use **Option 4 initially** to rapidly prototype visuals in Bolt, then immediately refactor into **Option 1** components before merging.

---

## 7. What the Payload Fork Should Provide

To make this work smoothly, the Payload fork should define:

- Stable TypeScript interfaces for:
  - SiteSettings global
  - Page model
  - Section union types
- A single rendering switch (`renderSection`)
- A data access layer (`lib/cms.ts`)
- Matching mock layer for Bolt (`lib/mockCms.ts`)

The UI code must never care whether data comes from mock or real CMS.

---

## 8. Outcome

Bolt should be treated as a **design and component generator**, not a full production CMS host.

Payload remains the production runtime.

This separation gives:

- design speed
- CMS reliability
- identical output
- clear ownership boundaries

---

## 9. Next Step

Review feasibility of:

- defining the rendering/data contract in the Payload fork
- generating a strict Bolt prompt that outputs code matching that contract

Once agreed, a single repeatable Bolt brief can be created for all future sites.

