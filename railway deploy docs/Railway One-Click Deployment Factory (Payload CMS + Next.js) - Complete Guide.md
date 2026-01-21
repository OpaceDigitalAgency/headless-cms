# Railway One-Click Deployment Factory (Payload CMS + Next.js) - Complete Guide

This document provides a complete, step-by-step guide to creating a Railway One-Click Deployment Factory. This allows you to deploy hundreds of separate websites without repeating the setup process.

This guide is written to be executed by an AI agent (e.g., Manus) controlling a browser.

---

## What This Achieves

After completing this setup, you will have a single Railway template that, when used, will automatically create a new, independent project with:

- A PostgreSQL database
- A Payload CMS service
- A Next.js frontend service

All environment variables will be automatically generated or linked between services, requiring zero manual configuration on deployment.

---

## Prerequisites

- A Railway account, logged in via browser.
- A GitHub account connected to your Railway account.
- A GitHub repository that includes:
  - Payload CMS in an `apps/cms` directory.
  - A Next.js frontend in an `apps/web` directory.

---

## STEP 1 — Create the Railway Template

1.  **Navigate to Railway:** Open [https://railway.app](https://railway.app) in your browser.
2.  **Create a New Template:** Go to **Templates** and click **Create Template**. Do **NOT** create a project.

---

## STEP 2 — Add Services to the Template

### Add PostgreSQL

1.  Click **Add Service**.
2.  Select **PostgreSQL**.
3.  Accept the default settings.

### Add CMS Service

1.  Click **Add Service**.
2.  Choose **GitHub Repo**.
3.  Select your repository.
4.  Set the **Root directory** to the repo root (leave blank or use `.`).
5.  Set the **Dockerfile path** to `apps/cms/Dockerfile`.
6.  Save the service.

### Add Web Service

1.  Click **Add Service**.
2.  Choose **GitHub Repo**.
3.  Select the **same** repository.
4.  Set the **Root directory** to the repo root (leave blank or use `.`).
5.  Set the **Dockerfile path** to `apps/web/Dockerfile`.
6.  Save the service.

Note: This repo uses a PNPM workspace with shared packages in `packages/`. If the root directory is set to `apps/cms` or `apps/web`, the build context will not include `packages/*`, which causes errors like `packages/templates/package.json: not found`.

---

## STEP 3 — Configure CMS Service Variables

Navigate to the **CMS service** and add the following variables:

| Variable Name                 | Value                               | Notes                                    |
| ----------------------------- | ----------------------------------- | ---------------------------------------- |
| `PAYLOAD_SECRET`              | `${{GENERATE_RANDOM_STRING}}`        | Auto-generated on deploy.                |
| `REVALIDATION_SECRET`         | `${{GENERATE_RANDOM_STRING}}`        | Auto-generated on deploy.                |
| `DATABASE_URL`                | `${{Postgres.DATABASE_URL}}`         | Links to the PostgreSQL service.         |
| `PAYLOAD_PUBLIC_SERVER_URL`   | `https://{{RAILWAY_PUBLIC_DOMAIN}}` | The public URL of the CMS service.       |
| `NODE_ENV`                    | `production`                        | Sets the environment to production.      |
| `NEXT_TELEMETRY_DISABLED`     | `1`                                 | Disables Next.js telemetry.              |

---

## STEP 4 — Configure Web Service Variables

Navigate to the **Web service** and add the following variables:

| Variable Name           | Value                                     | Notes                                      |
| ----------------------- | ----------------------------------------- | ------------------------------------------ |
| `CMS_URL`               | `https://{{cms.RAILWAY_PUBLIC_DOMAIN}}`   | Links to the public domain of the CMS service. |
| `NEXT_PUBLIC_CMS_URL`   | `https://{{cms.RAILWAY_PUBLIC_DOMAIN}}`   | Links to the public domain of the CMS service. |
| `NEXT_PUBLIC_SITE_URL`  | `https://{{RAILWAY_PUBLIC_DOMAIN}}`     | The public URL of the Web service.         |
| `NODE_ENV`              | `production`                              | Sets the environment to production.        |
| `NEXT_TELEMETRY_DISABLED` | `1`                                       | Disables Next.js telemetry.                |

---

## STEP 5 — Enable Auto Domains

For **both the CMS and Web services**:

1.  Go to the service **Settings**.
2.  Navigate to the **Networking** section.
3.  Click **Generate Domain** or **Add HTTP Proxy** to enable a public URL.

---

## STEP 6 — Save & Publish Template

1.  Click **Save** to save all your template configurations.
2.  Open the template settings and click **Publish / Share**.
3.  Copy the provided template URL. This is your deployment factory URL.

---

## STEP 7 — Update Deploy Button

Replace any existing `railway.com/deploy/...` button in your repository's `README.md` with your new template URL:

```markdown
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/YOUR_TEMPLATE_ID)
```

---

## Daily Usage

To create a new website, simply open your template URL and click **Deploy**. A new, independent project will be created with all services and configurations automatically set up.

---

## Final Validation Check

When you use the template URL, the deployment screen should list all three services (Postgres, CMS, Web) and should not ask for any environment variables.

If you are prompted to configure services or variables, you are not using the template correctly.

---

## End Result

You now have a fully automated, one-click deployment factory for your Payload CMS and Next.js projects on Railway.
