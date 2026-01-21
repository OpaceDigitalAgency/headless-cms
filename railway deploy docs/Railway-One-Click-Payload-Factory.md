# Railway One‑Click Deployment Factory (Payload CMS + Next.js)

This document explains **exactly how to set up ONE Railway template once**, and then use it to deploy **hundreds of separate websites** without manually creating services, databases, or environment variables again.

This is written so an AI agent (e.g. Manus) can **control the browser and complete the process end‑to‑end**.

---

## What This Achieves (Important Context)

After this setup:

• You will have **ONE Railway template**
• Each click creates a **brand‑new project**
• Each project includes:
  - PostgreSQL database
  - Payload CMS service
  - Next.js frontend service
• All environment variables are:
  - auto‑generated OR
  - auto‑linked between services

You **do NOT** repeat setup steps per website.

---

## Critical Caveat (Read This Once)

Railway templates must be **created once manually** so Railway knows what the stack contains.

This is:
✔ done once only  
✔ reused unlimited times  
✘ NOT repeated per website  

If you ever repeat service setup steps, the template was not created or not used.

---

## Prerequisites

• A Railway account (logged in via browser)  
• GitHub account connected to Railway  
• Repository already exists with:
  - Payload CMS (apps/cms)
  - Next.js frontend (apps/web)

---

## STEP 1 — Create the Railway Template (ONE TIME ONLY)

### 1. Open Railway
Go to:
https://railway.app

### 2. Create a New Template
Navigation:
Templates → **Create Template**

(Do NOT create a Project)

---

## STEP 2 — Add Services to the Template

### Add PostgreSQL
• Click **Add Service**
• Select **PostgreSQL**
• Accept defaults

---

### Add CMS Service
• Click **Add Service**
• Choose **GitHub Repo**
• Select your repository
• Root directory: `apps/cms`
• Runtime: Docker (default)
• Save

---

### Add Web Service
• Click **Add Service**
• Choose **GitHub Repo**
• Select the same repository
• Root directory: `apps/web`
• Runtime: Docker (default)
• Save

---

## STEP 3 — Configure Template Variables (VERY IMPORTANT)

### Auto‑Generated Secrets
Create these variables and mark them as **Generate on Deploy**:

• `PAYLOAD_SECRET`
• `REVALIDATION_SECRET`

(Do NOT hard‑code values)

---

### Database Connection
• Variable name: `DATABASE_URL`
• Source: **PostgreSQL service**
• Mode: Link service variable

(No manual values)

---

### CMS URL
• Variable name: `CMS_URL`
• Source: **CMS service domain**
• Mode: Link service domain

---

## STEP 4 — Enable Auto Domains

For **CMS service**:
• Enable “Generate Default Domain”

For **Web service**:
• Enable “Generate Default Domain”

(This prevents manual domain steps later)

---

## STEP 5 — Save & Publish Template

• Click **Create Template**
• Open the template settings
• Click **Publish / Share**
• Copy the template URL

It will look like:
https://railway.app/template/XXXXXXXX

THIS URL IS YOUR FACTORY.

---

## STEP 6 — Update Deploy Button (ONE LINE)

Replace any existing deploy button using:
`railway.com/deploy/...`

With:
https://railway.app/template/XXXXXXXX

(This is critical — deploy slugs are NOT templates)

---

## Daily Usage (Creating New Websites)

For EACH new website:

1. Open template URL
2. Click **Deploy**
3. Enter project name
4. Wait 5–10 minutes

That’s it.

No services.
No variables.
No databases.
No wiring.

---

## Important Scaling Decision (Read Once)

By default, deployments remain **linked to the same GitHub repo**.

This is fine if:
• all sites update together

If you want sites isolated:
• After deploy → Project Settings → Eject from template repo

This does NOT affect setup automation.

---

## Final Validation Check

You are doing it correctly if:
• Deploy screen lists **Postgres + CMS + Web**
• No variable forms appear
• No service creation screens appear

If you see setup screens:
✘ You are NOT deploying from the template

---

## End Result

You now have:
• One Railway account
• One template
• Unlimited independent Payload CMS + Next.js sites
• Zero repetitive setup work

