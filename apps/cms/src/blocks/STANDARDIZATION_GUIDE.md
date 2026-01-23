# Block Standardization Guide (2026)

**Purpose:** Ensure all 20+ blocks work seamlessly with the Skin System (10+ skins) by enforcing strict portability rules.

---

## 1. Field Naming Standards
*Consistency allows for easier template switching and code maintenance.*

| Element | Field Name | Required? | Type | Admin Description |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Heading** | `heading` | ✅ Yes | Text | "Primary headline for this section" |
| **Secondary Text** | `description` | ❌ No | Textarea | "Supporting text or sub-headline" |
| **Eyebrow Label** | `eyebrow` | ❌ No | Text | "Small label above the heading (e.g., 'NEW')" |
| **Main Content** | `richText` | ❌ No | RichText | "Main body content" |
| **Buttons/Links** | `links` | ❌ No | Array | "Call to action buttons" |
| **Media Item** | `media` | ❌ No | Upload | "Image or video file" |
| **Items/Cards** | `items` | ❌ No | Array | "List of items to display" |

**Rule:** DO NOT use `title` for headings (reserved for document titles). Use `heading`.

---

## 2. Variant Architecture (CRITICAL)
*Variants must describe LAYOUT INTENT, not VISUAL STYLE.*

### ❌ WRONG (Skin-based naming)
*   `variant: 'agency'`
*   `variant: 'retro'`
*   `variant: 'glass'`
*   *Why?* Breaks when adding a NEW skin (e.g., 'retail') that wants the same layout.

### ✅ CORRECT (Intent-based naming)
*   `variant: 'split'` (Content left, image right)
*   `variant: 'centered'` (All text centered)
*   `variant: 'cards'` (Grid of cards)
*   `variant: 'hero-led'` (Large typography focus)
*   `variant: 'fullscreen'` (Takes up 100vh)

### Standard Variant Options (Use these)
```typescript
options: [
    { label: 'Standard', value: 'standard' },
    { label: 'Hero-Led', value: 'hero-led' },
    { label: 'Editorial', value: 'editorial' },
    { label: 'Split', value: 'split' },
    { label: 'Grid', value: 'grid' },
    { label: 'Cards', value: 'cards' },
    { label: 'List', value: 'list' },
    { label: 'Fullscreen', value: 'fullscreen' },
    { label: 'Minimal', value: 'minimal' },
    { label: 'Stacked', value: 'stacked' }
]
```

---

## 3. Semantic Styling (Skin Compatibility)
*Never use hardcoded colors. Use the system tokens.*

| Purpose | ❌ Avoid | ✅ Use Token Class |
| :--- | :--- | :--- |
| **Backgrounds** | `bg-white`, `bg-slate-900` | `bg-background`, `bg-card`, `bg-muted` |
| **Text** | `text-gray-600`, `text-black` | `text-foreground`, `text-muted`, `text-accent` |
| **Borders** | `border-gray-200` | `border-border` |
| **Primary Actions** | `bg-blue-600` | `bg-primary text-primary-foreground` |
| **Gradients** | `bg-gradient-to-r` | `[background:var(--bg-gradient-primary)]` |

---

## 4. Implementation Checklist
When auditing a block, verify:
1.  [ ] `heading` is used, not `title` or `headline`.
2.  [ ] `variant` field description says "Layout structure (works with any skin)".
3.  [ ] No `options` in `variant` are named after a specific skin (e.g. 'agency').
4.  [ ] TS Interface (if present) matches the fields.
