# Railway Template - Quick Start Guide

## TL;DR

Your repo is ready for Railway, but the one-click button won't work until you publish the template. Here's what to do:

## 3-Step Process

### 1️⃣ Deploy Manually (One Time)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Create project
cd headless-cms
railway init

# Add PostgreSQL
railway add --database postgres

# Deploy CMS
cd apps/cms
railway up --service cms

# Deploy Web
cd ../web
railway up --service web
```

**Then configure environment variables in Railway dashboard:**

**CMS Service:**
```bash
PAYLOAD_SECRET=$(openssl rand -hex 32)
PAYLOAD_PUBLIC_SERVER_URL=${{RAILWAY_PUBLIC_DOMAIN}}
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

**Web Service:**
```bash
CMS_URL=https://[your-cms-domain].railway.app
NEXT_PUBLIC_CMS_URL=https://[your-cms-domain].railway.app
NEXT_PUBLIC_SITE_URL=${{RAILWAY_PUBLIC_DOMAIN}}
REVALIDATION_SECRET=$(openssl rand -hex 32)
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

**Generate domains for both services** in Railway dashboard.

### 2️⃣ Publish Template

1. Go to your Railway project
2. Click ⚙️ (settings)
3. Click "Template" → "Publish as Template"
4. Fill in:
   - **Name**: Payload CMS + Jamstack Platform
   - **Description**: A super-powered, WordPress-like CMS with a decoupled Jamstack frontend
   - **Category**: CMS
   - **Tags**: payload, cms, nextjs, jamstack, postgresql
5. Mark these as "Generate on deploy":
   - `PAYLOAD_SECRET`
   - `REVALIDATION_SECRET`
6. Click "Publish"

### 3️⃣ Update README

Railway will give you a template URL like:
```
https://railway.app/template/abc123xyz
```

Update `README.md`:
```markdown
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/abc123xyz)
```

Commit and push:
```bash
git add README.md
git commit -m "Update Railway deploy button with published template"
git push
```

## Done! 🎉

Now anyone can click the button and get:
- ✅ PostgreSQL database
- ✅ CMS service
- ✅ Web service
- ✅ All environment variables auto-configured
- ✅ Everything linked and working

## Detailed Guides

- **Full deployment guide**: See `DEPLOY_TO_RAILWAY.md`
- **Template setup guide**: See `RAILWAY_TEMPLATE_SETUP.md`
- **Current status**: See `RAILWAY_STATUS.md`

## What Users Will Experience

When someone clicks your deploy button:

1. **Click** "Deploy on Railway" button
2. **Wait** 5-10 minutes for automatic provisioning
3. **Access** CMS at `https://[generated-domain].railway.app/admin`
4. **Create** first admin user
5. **Start** creating content

**Zero manual configuration required!**

## Testing Your Template

After publishing, test it yourself:

1. Open template URL in incognito window
2. Click "Deploy Now"
3. Wait for deployment
4. Verify everything works
5. If issues found, fix in original project and re-publish

## Common Issues

### "Template not found"
- You haven't published the template yet
- Follow Step 2 above

### "Build failed"
- Check Railway build logs
- Verify Dockerfiles work locally
- Check environment variables

### "Services can't connect"
- Verify service references use correct syntax
- Check that service names match exactly
- Ensure DATABASE_URL uses `${{Postgres.DATABASE_URL}}`

## Support

- **Railway Docs**: https://docs.railway.com
- **Railway Templates**: https://docs.railway.com/guides/templates
- **Railway Support**: https://railway.app/help

