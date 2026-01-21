# Dynamic Collections Architecture Diagrams

## Current State: Two Disconnected Systems

```mermaid
graph TB
    subgraph "Admin Panel"
        A1["Collections Manager<br/>(Pre-configured)"]
        A2["Content Types Manager<br/>(Dynamic)"]
        A3["Custom Items Editor<br/>(Dynamic)"]
    end

    subgraph "Backend"
        B1["Collection Templates<br/>payload.config.ts"]
        B2["ContentTypes Collection<br/>Database"]
        B3["CustomItems Collection<br/>Database"]
    end

    subgraph "Database"
        D1["Services Table<br/>Courses Table<br/>etc."]
        D2["content_types Table"]
        D3["custom_items Table<br/>All types mixed"]
    end

    A1 -->|Requires Restart| B1
    B1 -->|Creates| D1
    
    A2 -->|Create Type| B2
    B2 -->|Stores| D2
    
    A3 -->|Create Item| B3
    B3 -->|Stores| D3

    style A1 fill:#ffcccc
    style B1 fill:#ffcccc
    style D1 fill:#ffcccc
    style A2 fill:#ffffcc
    style A3 fill:#ffffcc
```

---

## Option 1: Status Quo (Custom Items Only)

```mermaid
graph LR
    A["Admin Creates<br/>Content Type<br/>Dinosaur"] -->|No Restart| B["ContentTypes<br/>Collection"]
    B -->|Stores Definition| C["Database:<br/>content_types"]
    
    D["Admin Creates<br/>Item<br/>T-Rex"] -->|No Restart| E["CustomItems<br/>Collection"]
    E -->|Stores with JSON| F["Database:<br/>custom_items<br/>customData: JSON"]
    
    C -.->|References| F
    
    G["Frontend<br/>Renders"] -->|Queries| F
    G -->|Parses JSON| H["Display<br/>Custom Fields"]
    
    style A fill:#ffffcc
    style D fill:#ffffcc
    style F fill:#ffcccc
    style H fill:#ffcccc
```

**Pros:** No restart, fully dynamic  
**Cons:** Single table, JSON storage, poor performance at scale

---

## Option 2: Dynamic Collections (Preferred)

```mermaid
graph TB
    subgraph "Admin Panel"
        A1["Clone Collection<br/>Dialog"]
        A2["Select Template<br/>Archive Item"]
        A3["Customize Fields<br/>extinctionDate, etc."]
    end

    subgraph "Backend Processing"
        B1["Generate Collection<br/>Config"]
        B2["Register at Runtime<br/>No Restart"]
        B3["Create Database<br/>Table"]
        B4["Update Navigation"]
    end

    subgraph "Result"
        R1["Dinosaurs Table<br/>Proper Columns"]
        R2["Admin Navigation<br/>Shows Dinosaurs"]
        R3["Type-Safe<br/>TypeScript Types"]
    end

    A1 --> A2
    A2 --> A3
    A3 -->|Submit| B1
    B1 --> B2
    B2 --> B3
    B2 --> B4
    B3 --> R1
    B4 --> R2
    B1 --> R3

    style A1 fill:#ccffcc
    style B2 fill:#ccffcc
    style R1 fill:#ccffcc
```

**Pros:** Best performance, clean navigation, type-safe  
**Cons:** Complex implementation, requires investigation

---

## Option 3: Hybrid + Improved UX (Test First)

```mermaid
graph TB
    subgraph "Improved Admin UI"
        A1["Custom Collections<br/>Manager"]
        A2["Clone Collection<br/>Button"]
        A3["Create New<br/>Collection"]
    end

    subgraph "Backend (Existing)"
        B1["ContentTypes<br/>Collection"]
        B2["CustomItems<br/>Collection"]
    end

    subgraph "Database"
        D1["content_types<br/>Table"]
        D2["custom_items<br/>Table"]
    end

    subgraph "Frontend"
        F1["Render Items<br/>with Blocks"]
        F2["Display Custom<br/>Fields"]
    end

    A1 -->|Improved UX| A2
    A2 -->|Clone Type| A3
    A3 -->|Create| B1
    B1 -->|Store| D1
    
    A3 -->|Create Items| B2
    B2 -->|Store| D2
    
    D2 -->|Query| F1
    D1 -->|Get Schema| F2

    style A1 fill:#ffffcc
    style A2 fill:#ffffcc
    style B1 fill:#ccffff
    style B2 fill:#ccffff
```

**Pros:** Quick to implement, validates workflow, no restart  
**Cons:** Single table limitation, performance ceiling

---

## Data Flow: Creating a Dinosaur Collection (Option 3)

```mermaid
sequenceDiagram
    participant Admin as Admin User
    participant UI as Admin UI
    participant API as Backend API
    participant DB as Database
    participant Frontend as Website

    Admin->>UI: Click "Create Collection"
    UI->>UI: Show template options
    Admin->>UI: Select "Archive Item"
    Admin->>UI: Enter "Dinosaur"
    Admin->>UI: Add custom fields
    Admin->>UI: Click "Create"
    
    UI->>API: POST /api/content-types
    API->>DB: Insert content type
    DB-->>API: Success
    API-->>UI: Collection created
    UI-->>Admin: Redirect to items
    
    Admin->>UI: Click "Create Item"
    Admin->>UI: Enter "T-Rex"
    Admin->>UI: Fill custom fields
    Admin->>UI: Add blocks
    Admin->>UI: Publish
    
    UI->>API: POST /api/custom-items
    API->>DB: Insert item
    DB-->>API: Success
    API-->>UI: Item published
    
    Frontend->>API: GET /api/custom-items?type=dinosaur
    API->>DB: Query items
    DB-->>API: Return data
    API-->>Frontend: JSON response
    Frontend->>Frontend: Render with blocks
    Frontend-->>Admin: View on website
```

---

## Database Schema Comparison

### Option 1 & 3: Custom Items (Single Table)
```
custom_items
├── id (PK)
├── title
├── slug
├── content (rich text)
├── blocks (JSON)
├── contentType (FK → content_types)
├── customData (JSON) ← All custom fields here
├── featuredImage (FK → media)
├── gallery (JSON array)
├── categories (array)
├── tags (array)
├── status (published/draft)
└── createdAt, updatedAt
```

**Problem:** All custom fields in JSON = slower queries, no validation

---

### Option 2: Dynamic Collections (Multiple Tables)
```
dinosaurs
├── id (PK)
├── title
├── slug
├── content (rich text)
├── blocks (JSON)
├── extinctionDate ← Proper column
├── discoveryLocation ← Proper column
├── fossilType ← Proper column
├── featuredImage (FK → media)
├── gallery (JSON array)
├── categories (array)
├── tags (array)
├── status (published/draft)
└── createdAt, updatedAt

classic_cars
├── id (PK)
├── title
├── slug
├── content (rich text)
├── blocks (JSON)
├── manufacturer ← Proper column
├── yearProduced ← Proper column
├── engineType ← Proper column
├── ... (same media/status fields)
```

**Benefit:** Proper columns = faster queries, validation, type safety

---

## Performance Comparison

```mermaid
graph LR
    A["Items Count"] -->|100| B1["Option 1/3<br/>~50ms"]
    A -->|100| B2["Option 2<br/>~10ms"]
    
    A -->|1000| C1["Option 1/3<br/>~200ms"]
    A -->|1000| C2["Option 2<br/>~20ms"]
    
    A -->|10000| D1["Option 1/3<br/>~2000ms ⚠️"]
    A -->|10000| D2["Option 2<br/>~50ms ✅"]

    style D1 fill:#ffcccc
    style D2 fill:#ccffcc
```

---

## Implementation Timeline

```mermaid
gantt
    title Dynamic Collections Implementation Timeline
    
    section Option 3 Testing
    Seed Data :opt3a, 0, 3d
    UI Improvements :opt3b, 3d, 3d
    Blocks Support :opt3c, 6d, 2d
    Testing & Feedback :opt3d, 8d, 3d
    
    section Option 2 Investigation
    Research Payload :opt2a, 11d, 5d
    Prototype :opt2b, 16d, 7d
    Implementation :opt2c, 23d, 14d
    
    section Decision
    Evaluate Results :decision, 37d, 2d
    Final Decision :final, 39d, 1d
```

---

## Decision Tree

```mermaid
graph TD
    A["Start: Need Custom Collections"] --> B["Test Option 3<br/>Hybrid + UX"]
    
    B --> C{Option 3<br/>Successful?}
    
    C -->|Yes| D{Performance<br/>Acceptable?}
    C -->|No| E["Fix Issues<br/>Re-test"]
    
    D -->|Yes| F["Use Option 3<br/>Long-term"]
    D -->|No| G["Investigate<br/>Option 2"]
    
    E --> C
    
    G --> H["Research Payload<br/>Capabilities"]
    H --> I{Option 2<br/>Feasible?}
    
    I -->|Yes| J["Implement<br/>Option 2"]
    I -->|No| F
    
    F --> K["✅ Decision Made"]
    J --> K

    style K fill:#ccffcc
```

