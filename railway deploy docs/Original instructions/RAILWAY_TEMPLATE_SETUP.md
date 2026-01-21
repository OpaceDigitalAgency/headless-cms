# Railway One-Click Deploy Template Setup

This document explains how to set up the one-click "Deploy on Railway" button for this repository.

## Overview

Railway templates are created through the Railway dashboard, not via a JSON file. The repository needs proper configuration files, and then you publish the template through Railway's web interface.

## Current Status

✅ **Ready for Template Creation:**
- Individual service configurations (`railway.json` files)
- Dockerfiles for CMS and Web services
- Environment variable documentation
- Monorepo structure properly configured

## Steps to Create the Template

### 1. Deploy Your Project to Railway First

Before creating a template, you need to have a working deployment:

```bash
# Install Railway CLI if not already installed
npm install -g @railway/cli

# Login to Railway
railway login

# Create a new project
railway init

# Add PostgreSQL database
railway add --database postgres

# Deploy the CMS service
cd apps/cms
railway up

# Deploy the Web service  
cd ../web
railway up
```

### 2. Configure Services in Railway Dashboard

1. Go to your Railway project dashboard
2. For each service (CMS, Web, PostgreSQL), configure:
   - **Service Name**: `cms`, `web`, `postgres`
   - **Root Directory**: `apps/cms` or `apps/web`
   - **Build Command**: Automatically detected from Dockerfile
   - **Start Command**: `node server.js`

### 3. Set Up Environment Variables

Railway will automatically provide `DATABASE_URL` from the PostgreSQL service.

**Required Environment Variables to Set:**

For **CMS Service**:
- `PAYLOAD_SECRET` - Auto-generate: `$(openssl rand -hex 32)`
- `PAYLOAD_PUBLIC_SERVER_URL` - Will be: `https://${{RAILWAY_PUBLIC_DOMAIN}}`
- `NODE_ENV` - Set to: `production`
- `NEXT_TELEMETRY_DISABLED` - Set to: `1`

For **Web Service**:
- `CMS_URL` - Reference CMS service: `https://${{cms.RAILWAY_PUBLIC_DOMAIN}}`
- `NEXT_PUBLIC_CMS_URL` - Reference CMS service: `https://${{cms.RAILWAY_PUBLIC_DOMAIN}}`
- `NEXT_PUBLIC_SITE_URL` - Will be: `https://${{RAILWAY_PUBLIC_DOMAIN}}`
- `REVALIDATION_SECRET` - Auto-generate: `$(openssl rand -hex 32)`
- `NODE_ENV` - Set to: `production`
- `NEXT_TELEMETRY_DISABLED` - Set to: `1`

**Shared Variables** (set on both services):
- `DATABASE_URL` - Reference from postgres: `${{Postgres.DATABASE_URL}}`

### 4. Create the Template in Railway Dashboard

Once your project is working:

1. Go to your Railway project
2. Click on the project settings (gear icon)
3. Navigate to the "Template" section
4. Click "Publish Template"
5. Fill in the template details:
   - **Name**: "Payload CMS + Jamstack Platform"
   - **Description**: "A super-powered, WordPress-like CMS with a decoupled Jamstack frontend"
   - **Category**: CMS
   - **Tags**: payload, cms, nextjs, jamstack, postgresql
   - **README**: Use the content from this repository's README.md
   - **Demo URL**: Your deployed site URL
   - **Repository**: Link to your GitHub repository

6. Configure template variables:
   - Mark `PAYLOAD_SECRET` as "Generate on deploy"
   - Mark `REVALIDATION_SECRET` as "Generate on deploy"
   - Set default values for other variables

7. Publish the template

### 5. Get Your Template URL

After publishing, Railway will provide you with a template URL like:
```
https://railway.app/template/[your-template-code]
```

### 6. Update README Deploy Button

Update the deploy button in `README.md` to use your actual template URL:

```markdown
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/[your-template-code])
```

## Service Reference Variables

Railway allows services to reference each other using special syntax:

- `${{SERVICE_NAME.VARIABLE_NAME}}` - Reference another service's variable
- `${{RAILWAY_PUBLIC_DOMAIN}}` - The public domain for the current service
- `${{RAILWAY_PRIVATE_DOMAIN}}` - The private domain for internal communication

## Template Features

When users click "Deploy on Railway", they will get:

✅ **Automatic Setup:**
- PostgreSQL database provisioned
- CMS service deployed
- Web service deployed
- All services linked together
- Environment variables auto-configured
- Public domains generated

✅ **Zero Manual Configuration:**
- No need to set environment variables manually
- No need to link services
- No need to configure databases
- Everything works out of the box

## Testing the Template

Before publishing publicly:

1. Use the template yourself to deploy a new instance
2. Verify all services start correctly
3. Check that the CMS admin is accessible
4. Verify the frontend can connect to the CMS
5. Test creating content and viewing it on the frontend

## Troubleshooting

If deployment fails:

1. Check the build logs in Railway dashboard
2. Verify all environment variables are set correctly
3. Ensure service references use correct syntax
4. Check that Dockerfiles build successfully locally

## Additional Resources

- [Railway Templates Documentation](https://docs.railway.com/guides/templates)
- [Railway Template Marketplace](https://railway.com/templates)
- [Railway Environment Variables](https://docs.railway.com/guides/variables)

