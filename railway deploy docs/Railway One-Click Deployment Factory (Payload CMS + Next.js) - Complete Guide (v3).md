# Railway One-Click Deployment Factory (Payload CMS + Next.js) - Complete Guide (v3)

This guide provides a comprehensive, step-by-step process for creating a Railway One-Click Deployment Factory for a monorepo containing a Payload CMS with a bundled Next.js frontend. This version incorporates all learnings from our debugging sessions and is designed to work correctly the first time.

## Key Learnings & Issues Addressed

This guide addresses all the issues we encountered:

1.  **Monorepo Build Failures:** The initial builds failed because Railway was trying to build the entire monorepo, including an `apps/astro` workspace that had build errors (`node:sqlite` not found).
2.  **Incorrect Root Directory:** Setting the Root Directory to `apps/cms` caused build failures because the Dockerfile couldn’t access parent directories (like `packages/`).
3.  **Missing Dockerfile Path:** When setting the Root Directory to the repo root (`.`), Railway needs to be explicitly told which Dockerfile to use.
4.  **Extraneous Web Service:** The template initially included a separate `apps/web` service that was removed from the repository, causing deployment failures.
5.  **Dockerfile Errors:** The Dockerfile had references to a non-existent `packages/templates` directory, which was fixed.

## Final Correct Configuration

This guide will walk you through setting up the following correct and final configuration:

-   **Services:**
    -   PostgreSQL Database
    -   Payload CMS Service (with bundled Next.js)
-   **CMS Service Configuration:**
    -   **Root Directory:** `.` (repo root)
    -   **Dockerfile Path:** `apps/cms/Dockerfile`
    -   **Custom Build Command:** `pnpm --filter=@repo/cms install && pnpm --filter=@repo/cms build`
-   **Environment Variables:** All necessary variables with correct references.

---

## Step 1: Create a New Railway Template

1.  Navigate to your Railway dashboard.
2.  Go to **Workspace Settings** > **Templates**.
3.  Click **New Template**.
4.  Give your template a name (e.g., `payload-cms-factory`).

## Step 2: Add PostgreSQL Database

1.  In the template editor, click **Add New**.
2.  Select **Database** > **PostgreSQL**.

## Step 3: Add Payload CMS Service

1.  Click **Add New**.
2.  Select **GitHub Repo**.
3.  Choose your `headless-cms` repository.

## Step 4: Configure the CMS Service

This is the most critical step. You need to configure the service to build correctly from the monorepo root.

1.  Click on the CMS service in the template editor.
2.  Go to **Settings** > **Build**.
3.  Set the following:
    -   **Root Directory:** `.` (the repository root)
    -   **Dockerfile Path:** `apps/cms/Dockerfile`
    -   **Custom Build Command:** `pnpm --filter=@repo/cms install && pnpm --filter=@repo/cms build`
4.  Save the changes.

## Step 5: Configure Environment Variables

1.  Go to the **Variables** tab for the CMS service.
2.  Add the following variables:

| Variable Name                 | Value                                                 |
| ----------------------------- | ----------------------------------------------------- |
| `PAYLOAD_SECRET`              | `${{GENERATE_RANDOM_STRING}}` (toggle "Generate on Deploy") |
| `REVALIDATION_SECRET`         | `${{GENERATE_RANDOM_STRING}}` (toggle "Generate on Deploy") |
| `DATABASE_URL`                | `${{Postgres.DATABASE_URL}}` (use variable reference)    |
| `PAYLOAD_PUBLIC_SERVER_URL`   | `https://${{RAILWAY_PUBLIC_DOMAIN}}` (use variable reference) |
| `NODE_ENV`                    | `production`                                          |
| `NEXT_TELEMETRY_DISABLED`     | `1`                                                   |

## Step 6: Enable Public Networking

1.  Go to **Settings** > **Networking** for the CMS service.
2.  Click **Generate Domain** to enable a public URL.

## Step 7: Save and Test the Template

1.  Click **Save** to finalize the template.
2.  Click **Share** and copy the deployment URL.
3.  Open the URL in a new tab and click **Deploy**.
4.  The deployment should now build and deploy successfully!

---

This guide provides the complete and correct steps to create a functional Railway One-Click Deployment Factory for your monorepo. By following these instructions, you will avoid all the issues we previously encountered.
