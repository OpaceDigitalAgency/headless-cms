# Railway Template Setup Guide

This guide explains how to turn this repository into a reusable **Railway Template** for one-click deployments.

## Prerequisites

1.  You have deployed this repository firmly to Railway at least once (to verify it works).
2.  You have a Railway account.

## Step 1: Prepare the Repository

Ensure your repository has the verified fixes:
-   `apps/cms/Dockerfile` (must install `bash`, `postgresql-client`)
-   `scripts/run-migration-direct.sh` (must handle both local/prod execution)
-   `apps/db/migrations` (must contain commit with generated migration files)

## Step 2: Create the Template

1.  **Fork this repository** to your own GitHub account (if you haven't already).
2.  Log in to **Railway**.
3.  Click **New Project** -> **Deploy from GitHub repo**.
4.  Select your forked repository.
5.  **Add a Database**:
    -   Right-click the empty canvas (or click "New").
    -   Choose **Database** -> **PostgreSQL**.
6.  **Configure Environment Variables**:
    -   Click on your App Service (`headless-cms`).
    -   Go to **Variables**.
    -   Add `DATABASE_URL` and reference the variable `${{Postgres.DATABASE_URL}}`.
    -   Add `PAYLOAD_SECRET` (generate a random string).
    -   Set `NODE_ENV` to `production`.
7.  **Deploy** to verify everything starts.

## Step 3: Generate the Template Link

1.  Go to your Project **Settings**.
2.  Scroll down to the **Template** section.
3.  Click **Generate Template**.
4.  Fill in the details:
    -   **Name**: "Payload Jamstack Platform"
    -   **Description**: "Next.js + Payload CMS with automated migrations."
    -   **Icon**: Upload a logo (optional).
5.  **Important**: In the Service configuration step of the template generator:
    -   Ensure the **PostgreSQL** service is included.
    -   Ensure the **App** service is included.
    -   Mark variables like `PAYLOAD_SECRET` as "Required" (so the user is prompted).
6.  Click **Publish**.

## Step 4: Use the Template

Railway will provide a link, typically looking like:
`https://railway.app/template/YOUR_TEMPLATE_ID?referralCode=...`

You can update the **Deploy on Railway** button in the `README.md` with this new link.

## Notes on Scaling

When deploying 100s of instances using this template:
-   **Database**: Each "One Click" deployment creates a *new*, isolated PostgreSQL service.
-   **Migrations**: The system will automatically run `make db-fresh-migrations` logic on boot, so the database will always be initialized correctly without manual intervention.
-   **Public URL**: Users will still need to click "Generate Domain" in the Railway UI after deployment, unless you automate this via the Railway API as described in `docs/deployment/RAILWAY_ONE_CLICK_DEPLOY_NOTES.md`.
