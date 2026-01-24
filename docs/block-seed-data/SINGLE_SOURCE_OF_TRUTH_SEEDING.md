# Single Source of Truth Seeding System  
**Problem, Root Cause, and Required Fix**  
**Date:** 2026-01-24  

---

## Executive Summary

The current seeding behaviour is inconsistent because **multiple generations of seed logic are still executable at the same time**.  
As a result, posts, pages, and collection items can be created from **different code paths**, some of which are obsolete but still wired in.

This document explains:
- Why old or random seed data appears
- Where the conflicts come from
- The **one correct, future-proof seeding model**
- The concrete steps required to enforce a **single source of truth** for *all* content types

---

## The Core Problem (In Plain Terms)

You currently have **more than one way to create content during seeding**.

That means:
- Clearing data does not guarantee correctness
- `db-fresh` does not guarantee determinism
- Legacy definitions still seed silently
- Posts are especially affected, but the risk applies to *all* content types

The system *appears* modernised, but **old entry points are still live**.

---

## Why This Happens

### 1. Multiple Seeding Entry Points Exist

There are (or have been) several ways content gets created:

- Preset-level seeding
- Template-based content-type seeding
- Legacy/demo/showcase seed files
- Backward-compatible template ID mapping

Even if only *one* of these still fires, ghost content will reappear.

---

### 2. Posts Are Uniquely Vulnerable

Posts currently pass through **template mapping**, which intentionally resolves legacy IDs like:

- `article`
- `post`
- `news`
- `long-form`

This was meant for compatibility, but it allows **obsolete definitions to still resolve and seed**.

Pages and collections *can* suffer the same fate if legacy seed logic remains imported.

---

### 3. Clearing or Reseeding Does Not Fix the Root Cause

When you reseed, you are effectively saying:

> “Run every seed definition that is still registered.”

The system does not know which one you *meant* to use.

---

## The Desired End State (Non‑Negotiable)

There must be **one and only one seeding pipeline**:

```
Preset
  → Content-Type Definition
    → Template
      → Blocks
```

This must apply equally to:
- Pages
- Posts
- Core collections
- Custom collections

No exceptions.

---

## The Correct Single Source of Truth Model

### 1. Templates Are the Only Source of Content

All content must originate from:

```
src/collection-templates/templates/
```

Each template:
- Defines structure
- Defines block composition
- Is variant-aware
- Is skin-agnostic

If content is not defined here, it must not exist.

---

### 2. Presets Only Select Templates

Presets must **never define content directly**.

Presets may only:
- Select which templates apply
- Define counts / variations
- Scope content by site type

Presets must not:
- Create blocks
- Create posts or pages inline
- Import seed helpers directly

---

### 3. The Base Seeder Only Executes Templates

The base seeder:
- Knows *how* to seed
- Never knows *what* to seed
- Never imports content definitions

---

### 4. The Seed API Only Calls One Path

All seeding (UI, CLI, db-fresh) must flow through:

```
/api/seed/content-type
```

No direct seeding of collections is allowed outside this path.

---

## The Fix Required (Concrete Steps)

### Step 1 — Delete or Hard-Disable Legacy Seed Files

Any file that:
- Seeds content directly
- Is not template-based
- Exists for demo, legacy, or showcase reasons

Must be:
- Deleted, **or**
- Throw a hard error if executed

No silent fallbacks.

---

### Step 2 — Remove Preset-Level Content Creation

Audit every file in:

```
apps/cms/src/seed/presets/
```

Ensure presets:
- Only reference template IDs
- Do not import seed helpers
- Do not define pages, posts, or collections inline

---

### Step 3 — Eliminate Template ID Guessing

Template mapping must be **explicit**, not forgiving.

Recommended rule:
- If a templateId is unknown → throw
- No automatic mapping from legacy IDs
- No aliases without explicit registration

This immediately prevents ghost posts.

---

### Step 4 — Make the Pipeline Symmetric

Pages, posts, and collections must all:

- Use templates
- Use the same execution path
- Be visible in the same UI
- Be seeded and cleared the same way

No “special” post logic.

---

### Step 5 — Enforce a Kill Switch (Optional but Strongly Recommended)

Add a development-only guard:

- Log every template used during seeding
- Log its source file
- Fail if two templates seed the same slug or title

This makes future regressions obvious.

---

## Point 8: What To Do If Something Appears Unexpectedly

If any content appears after seeding:

1. It must be traceable to **one template**
2. That template must live in `collection-templates/templates`
3. That template must be referenced by exactly one preset
4. No preset may seed the same content type in two ways
5. If any of these fail, the system is broken — not “misconfigured”

Unexpected content is **always a wiring problem**, never a data problem.

---

## Final Rule (Print This)

> If a piece of content cannot be traced back to a single template file, the system is invalid.

This rule applies forever.

---

## Outcome If Fixed Properly

- Deterministic seeding
- Zero ghost content
- Safe refactors
- New agents cannot accidentally reintroduce legacy behaviour
- `db-fresh` becomes trustworthy again

---

**Status:** Required architectural correction  
**Priority:** Critical  
**Applies To:** All content types, without exception
