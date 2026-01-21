# Deploy to Railway - Complete Guide

This guide explains how to deploy this Payload CMS + Jamstack platform to Railway with true one-click deployment.

## Important Note About Railway Templates

Railway templates are **NOT** created from a JSON file in your repository. Instead, they are created through the Railway dashboard after you have a working deployment. This guide will walk you through both:

1. **Initial Setup**: Deploy your project to Railway manually first
2. **Template Creation**: Publish it as a template for one-click deployment

## Part 1: Initial Deployment (Do This Once)

### Prerequisites

- Railway account (sign up at https://railway.app)
- Railway CLI installed: `npm install -g @railway/cli`
- This repository cloned locally

### Step 1: Login to Railway

```bash
railway login
```

This will open your browser for authentication.

### Step 2: Create a New Project

```bash
cd headless-cms
railway init
```

Select "Create new project" and give it a name like "payload-jamstack-platform".

### Step 3: Add PostgreSQL Database

```bash
railway add --database postgres
```

This creates a PostgreSQL database service in your project.

### Step 4: Link and Deploy CMS Service

```bash
# Link to the CMS service
railway link

# Deploy the CMS
cd apps/cms
railway up --service cms
```

### Step 5: Configure CMS Environment Variables

In the Railway dashboard:

1. Go to your project
2. Select the `cms` service
3. Go to "Variables" tab
4. Add these variables:

```bash
# Auto-generated secret (generate with: openssl rand -hex 32)
PAYLOAD_SECRET=your_generated_secret_here

# Will be set automatically after first deploy
PAYLOAD_PUBLIC_SERVER_URL=${{RAILWAY_PUBLIC_DOMAIN}}

# Standard variables
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Database (should already be set automatically)
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

### Step 6: Generate Domain for CMS

1. In the CMS service settings
2. Go to "Settings" → "Networking"
3. Click "Generate Domain"
4. Copy the generated domain (e.g., `cms-production-xxxx.up.railway.app`)

### Step 7: Deploy Web Service

```bash
cd ../web
railway up --service web
```

### Step 8: Configure Web Environment Variables

In the Railway dashboard:

1. Select the `web` service
2. Go to "Variables" tab
3. Add these variables:

```bash
# Reference the CMS domain you copied earlier
CMS_URL=https://cms-production-xxxx.up.railway.app
NEXT_PUBLIC_CMS_URL=https://cms-production-xxxx.up.railway.app

# Auto-generated secret (generate with: openssl rand -hex 32)
REVALIDATION_SECRET=your_generated_secret_here

# Will be set automatically
NEXT_PUBLIC_SITE_URL=${{RAILWAY_PUBLIC_DOMAIN}}

# Standard variables
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Database
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

### Step 9: Generate Domain for Web

1. In the Web service settings
2. Go to "Settings" → "Networking"
3. Click "Generate Domain"

### Step 10: Verify Deployment

1. Visit your CMS domain: `https://cms-production-xxxx.up.railway.app/admin`
2. Create your first admin user
3. Visit your Web domain: `https://web-production-xxxx.up.railway.app`
4. Verify the frontend loads correctly

## Part 2: Create the Template (For One-Click Deploy)

Once your deployment is working perfectly:

### Step 1: Publish Template

1. Go to your Railway project dashboard
2. Click the project settings (⚙️ gear icon)
3. Navigate to "Template" section
4. Click "Publish as Template"

### Step 2: Configure Template Details

Fill in the template form:

**Basic Information:**
- **Name**: Payload CMS + Jamstack Platform
- **Description**: A super-powered, WordPress-like CMS with a decoupled Jamstack frontend
- **Category**: CMS
- **Tags**: payload, cms, nextjs, jamstack, postgresql

**Template Configuration:**
- **Services**: All three services (postgres, cms, web) should be included
- **Environment Variables**: 
  - Mark `PAYLOAD_SECRET` as "Generate on deploy"
  - Mark `REVALIDATION_SECRET` as "Generate on deploy"
  - Set service references for `DATABASE_URL`, `CMS_URL`, etc.

**Documentation:**
- **README**: Copy content from your repository's README.md
- **Demo URL**: Your deployed web service URL
- **Repository**: Link to your GitHub repository

### Step 3: Test the Template

1. Railway will give you a template URL like: `https://railway.app/template/abc123`
2. Open this URL in an incognito window
3. Click "Deploy Now"
4. Verify that:
   - All three services are created
   - Environment variables are set correctly
   - Services deploy successfully
   - The application works end-to-end

### Step 4: Update Repository

Update your `README.md` with the actual template URL:

```markdown
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/abc123)
```

## What Users Get with One-Click Deploy

When someone clicks your "Deploy on Railway" button:

✅ **Automatic Provisioning:**
- PostgreSQL database created and configured
- CMS service deployed with Dockerfile
- Web service deployed with Dockerfile
- All services linked together

✅ **Auto-Generated Secrets:**
- `PAYLOAD_SECRET` generated automatically
- `REVALIDATION_SECRET` generated automatically

✅ **Service References:**
- `DATABASE_URL` automatically linked from PostgreSQL
- `CMS_URL` automatically linked from CMS service
- Public domains generated for both services

✅ **Zero Manual Steps:**
- No environment variables to set manually
- No services to link manually
- No configuration needed
- Just click deploy and wait

## Troubleshooting

### Build Fails

Check the build logs in Railway dashboard. Common issues:
- Missing dependencies in package.json
- Dockerfile syntax errors
- Build context path incorrect

### Services Can't Connect

Verify environment variables:
- Check that `DATABASE_URL` references `${{Postgres.DATABASE_URL}}`
- Check that `CMS_URL` references the CMS service domain
- Ensure service names match exactly

### Database Connection Errors

- Verify PostgreSQL service is running
- Check that `DATABASE_URL` is set correctly
- Ensure migrations ran successfully

## Support

For issues with:
- **This template**: Open an issue on GitHub
- **Railway platform**: Contact Railway support or check their docs
- **Payload CMS**: Check Payload documentation

## Next Steps

After deployment:
1. Visit `/admin` on your CMS domain
2. Create your first admin user
3. Start creating content
4. View your content on the frontend

