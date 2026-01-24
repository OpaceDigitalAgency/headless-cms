# Complete Workflow and Deployment Guide
## Custom Payload CMS for Multiple Client Websites

**Last Updated:** January 24, 2026  
**Version:** 2.0 (Replaces Git-Workflow-Custom-Payload-Multiple-Client-Websites.md)

---

## Table of Contents

1. [Overview](#overview)
2. [Branch Strategy](#branch-strategy)
3. [Git Workflow](#git-workflow)
4. [Client Project Setup](#client-project-setup)
5. [Railway Deployment](#railway-deployment)
6. [Troubleshooting](#troubleshooting)

---

## Overview

This is a **custom Payload CMS v3** platform that serves as the base CMS for multiple client websites. It uses a **git submodule** approach where:

- **Core CMS Repository** (`headless-cms`): The main CMS codebase with all features
- **Client Projects** (e.g., `OBC`): Individual client sites that use the CMS as a submodule locked to specific versions

### Key Principles

✅ **Stable Releases**: Clients use tagged, stable versions (v1.0.0, v1.1.0, etc.)  
✅ **Experimental Development**: New features developed on `development` branch  
✅ **Client Preview**: `staging` branch for client testing before release  
✅ **Version Control**: All changes tracked via git with full history  

---

## Branch Strategy

### Core CMS Repository Branches

| Branch | Purpose | Stability | Who Uses It |
|--------|---------|-----------|-------------|
| **`main`** | Production releases with tagged versions (v1.0.0, v1.1.0) | ✅ Stable | Client projects via submodules |
| **`staging`** | Client preview and testing before release | ⚠️ Stable enough for review | Clients for testing |
| **`development`** | Experimental features, active development | ❌ Unstable | You and development agents |

### What's in Each Branch

**`main` (v1.0.0 - Production)**
- ✅ Core collections: Pages, Posts, Categories, Tags, Media, Users
- ✅ All blocks and admin improvements
- ✅ SEO features, form builder, nested docs, redirects
- ✅ Custom admin dashboard and tools
- ❌ No experimental features (seed system, custom content types, ecommerce)

**`development` (Experimental)**
- ✅ Everything from `main` PLUS:
- ✅ Seed system for sample data
- ✅ Custom content types
- ✅ Archive collections
- ✅ Ecommerce functionality
- ✅ All experimental blocks

**`staging` (Preview)**
- ✅ Features ready for client review
- ✅ Merged from `development` when features are stable enough
- ✅ Used for client testing before merging to `main`

---

## Git Workflow

### For Core CMS Development

**1. Daily Development Work**
```bash
# Always work on development branch
git checkout development
git pull origin development

# Make your changes
# ... edit files ...

# Commit and push
git add .
git commit -m "feat: add new feature"
git push origin development
```

**2. Preparing a Feature for Client Review**
```bash
# Merge to staging when ready for client preview
git checkout staging
git merge development
git push origin staging

# Client tests on staging environment
# Gather feedback, make adjustments on development
```

**3. Releasing a New Version**
```bash
# When client approves, merge to main and tag
git checkout main
git merge staging
git tag v1.1.0
git push origin main --tags

# Now clients can update to v1.1.0
```

### For Agents Working on the Project

**Automatic Branch Detection**
- When you close and reopen agents, they automatically detect the current branch
- If the repo is on `development`, agents work on `development`
- No manual branch switching needed

**Current Setup**
- ✅ Repository is on `development` branch
- ✅ All agents automatically work on `development`
- ✅ Changes push to `origin/development`

---

## Client Project Setup

### Structure

```
client-project/
├── headless-cms/          # Git submodule locked to v1.0.0
├── custom skins/          # Client-specific branding
├── .gitignore
├── .gitmodules
└── README.md
```

### Creating a New Client Project

**1. Initialize the Project**
```bash
# Create project directory
mkdir client-project
cd client-project

# Initialize git
git init

# Add CMS as submodule (locked to v1.0.0)
git submodule add -b main https://github.com/OpaceDigitalAgency/headless-cms.git
cd headless-cms
git checkout v1.0.0
cd ..

# Create .gitignore
cat > .gitignore << EOF
.DS_Store
node_modules
.env
.env.*
EOF

# Commit
git add .
git commit -m "feat: initialize project with headless-cms v1.0.0"
```

**2. Create GitHub Repository**
```bash
# Create repo on GitHub, then:
git remote add origin https://github.com/OpaceDigitalAgency/client-project.git
git push -u origin main
```

**3. Install and Run Locally**
```bash
# Initialize submodule
git submodule update --init --recursive

# Install dependencies
cd headless-cms
pnpm install

# Set up environment
cp apps/cms/.env.example apps/cms/.env
# Edit .env with your database credentials

# Run migrations
pnpm db:migrate

# Start development server
pnpm dev
```

The CMS admin panel will be at `http://localhost:3000/admin`

### Updating CMS Version in Client Project

```bash
cd headless-cms
git fetch --tags
git checkout v1.1.0  # or whatever version

cd ..
git add headless-cms
git commit -m "chore: update CMS to v1.1.0"
git push
```

---

## Railway Deployment

### Overview

Railway deployment uses a **Docker + Migrations** approach that has been proven to work reliably. This took days to configure correctly, so we use this exact method for all deployments.

### Core CMS Railway Setup (Already Deployed)

**Current Status:**
- ✅ Deployed to Railway from `development` branch
- ✅ Using Docker/migrations approach
- ✅ PostgreSQL database provisioned
- ✅ No errors in deployment

**Why `development` Branch?**
- Initially deployed from `main` → TypeScript errors (blocks referencing removed collections)
- Switched to `development` → Deployment successful
- `development` has all collections and features intact

**Railway Configuration:**
- **Branch:** `development`
- **Build Method:** Docker
- **Database:** PostgreSQL (Railway-managed)
- **Migrations:** Automatic on deployment

### Deploying a Client Project to Railway

**Important:** Use the **proven Docker/migrations approach** that's already working on the core CMS. Do NOT use Railway CLI or experimental methods.

#### Method: GitHub + Railway Dashboard (Recommended)

**Step 1: Prepare the Client Project**

```bash
cd "/path/to/client-project"

# Ensure it's a git repository with remote
git remote -v  # Should show GitHub URL

# If not set up:
git remote add origin https://github.com/OpaceDigitalAgency/client-project.git
git push -u origin main
```

**Step 2: Deploy via Railway Dashboard**

1. **Go to Railway Dashboard** → https://railway.app/dashboard
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your client repository** (e.g., `obc-cms`)
5. **Railway will auto-detect** the Payload CMS setup

**Step 3: Configure the Deployment**

Railway should automatically detect:
- ✅ Dockerfile in `headless-cms/apps/cms/`
- ✅ Node.js environment
- ✅ Build and start commands

**Manual Configuration (if needed):**
- **Root Directory:** `headless-cms/apps/cms`
- **Build Command:** Detected from Dockerfile
- **Start Command:** `node server.js`

**Step 4: Add PostgreSQL Database**

1. In Railway project → **Click "New"** → **Database** → **PostgreSQL**
2. Railway automatically creates `DATABASE_URL` variable
3. This is automatically available to your service

**Step 5: Set Environment Variables**

In Railway service settings → **Variables** tab:

**Required Variables:**
```bash
PAYLOAD_SECRET=<generate-random-32-char-string>
PAYLOAD_PUBLIC_SERVER_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

**Generate PAYLOAD_SECRET:**
```bash
# Run locally to generate:
openssl rand -hex 32
```

**Step 6: Deploy**

1. **Click "Deploy"** in Railway dashboard
2. **Wait for build** (first build takes 5-10 minutes)
3. **Check logs** for any errors
4. **Once deployed**, Railway provides a public URL

**Step 7: Access the CMS**

- **CMS Admin:** `https://your-railway-url.railway.app/admin`
- **Create first user** via the admin panel

### Using the Working Deployment as a Template

**Goal:** Save the working Railway configuration as a template for future client projects.

**Steps:**

1. **Ensure Current Deployment Works Perfectly**
   - ✅ Core CMS deployed from `development` branch
   - ✅ No errors in logs
   - ✅ Database migrations successful
   - ✅ Admin panel accessible

2. **Publish as Railway Template**
   - Go to Railway project → **Settings** (gear icon)
   - Navigate to **"Template"** section
   - Click **"Publish Template"**

3. **Configure Template Details**
   - **Name:** "Payload CMS v1.0.0 - Client Site"
   - **Description:** "Custom Payload CMS for client websites"
   - **Category:** CMS
   - **Tags:** payload, cms, nextjs, postgresql
   - **Repository:** Link to your GitHub repository

4. **Configure Template Variables**
   - Mark `PAYLOAD_SECRET` as **"Generate on deploy"**
   - Set default values for other variables
   - Railway will auto-generate secrets for new deployments

5. **Get Template URL**
   - Railway provides: `https://railway.app/template/[your-code]`
   - Save this URL for future use

6. **Deploy Future Clients**
   - Click the template URL
   - Railway creates new project with all settings
   - Just update the GitHub repository to the new client repo
   - Deploy automatically

### Railway Deployment Checklist

Before deploying a client project:

- [ ] Client project is a git repository
- [ ] Pushed to GitHub
- [ ] CMS submodule is locked to a stable version (v1.0.0)
- [ ] `.env.example` exists in `headless-cms/apps/cms/`
- [ ] Dockerfile exists and is tested locally
- [ ] Database migrations are up to date

During deployment:

- [ ] PostgreSQL database added to Railway project
- [ ] All environment variables set correctly
- [ ] `DATABASE_URL` references the Postgres service
- [ ] `PAYLOAD_PUBLIC_SERVER_URL` uses Railway's public domain variable
- [ ] Build completes without errors
- [ ] Migrations run successfully
- [ ] Admin panel is accessible

After deployment:

- [ ] Create first admin user
- [ ] Test content creation
- [ ] Verify media uploads work
- [ ] Check all collections are accessible
- [ ] Test frontend (if applicable)

---

## Troubleshooting

### Railway Deployment Errors

**Problem:** TypeScript errors about duplicate enum exports

**Cause:** Building from `main` branch which has experimental features removed, but build tries to compile blocks referencing those collections.

**Solution:** Deploy from `development` branch instead, which has all collections intact.

---

**Problem:** Database migration errors on first deploy

**Cause:** Railway's transaction limits or timing issues.

**Solution:** The Docker/migrations approach handles this automatically. If errors persist, check:
- `DATABASE_URL` is set correctly
- PostgreSQL service is running
- Migrations are in `headless-cms/apps/cms/migrations/` directory

---

**Problem:** "Cannot find module" errors

**Cause:** Dependencies not installed or wrong Node version.

**Solution:**
- Ensure `package.json` has all dependencies
- Check Node version in Dockerfile matches local (18+)
- Verify `pnpm install` runs in build step

---

**Problem:** Admin panel shows 404

**Cause:** `PAYLOAD_PUBLIC_SERVER_URL` not set or incorrect.

**Solution:**
- Set to `https://${{RAILWAY_PUBLIC_DOMAIN}}`
- Redeploy after setting
- Check Railway logs for the actual URL

---

### Git Submodule Issues

**Problem:** Submodule shows "detached HEAD" state

**Cause:** This is normal! Submodules point to specific commits (tags), not branches.

**Solution:** This is expected behaviour when locked to v1.0.0. No action needed.

---

**Problem:** Submodule not updating when pulling client project

**Cause:** Git doesn't auto-update submodules.

**Solution:**
```bash
git pull
git submodule update --init --recursive
```

---

**Problem:** Changes in submodule not committing

**Cause:** Submodule is a separate git repository.

**Solution:** Don't edit the CMS directly in client projects. Update the core CMS repo, tag a new version, then update the submodule reference.

---

## Summary

### Branch Usage

- **`development`**: Your daily work, experimental features
- **`staging`**: Client preview before release
- **`main`**: Tagged production releases (v1.0.0, v1.1.0)

### Client Projects

- Use CMS as git submodule
- Lock to stable tagged versions
- Don't modify CMS directly
- Update by changing submodule reference

### Railway Deployment

- Use proven Docker/migrations approach
- Deploy from GitHub via Railway dashboard
- Use `development` branch for core CMS (has all features)
- Use `main` branch tags for client projects (stable versions)
- Save working deployment as template for future projects

### Key Files

- `headless-cms/apps/cms/Dockerfile` - Docker build configuration
- `headless-cms/apps/cms/.env.example` - Environment variable template
- `headless-cms/apps/cms/migrations/` - Database migrations
- `.gitmodules` - Submodule configuration in client projects

---

**For questions or issues, refer to:**
- Railway docs: `headless-cms/docs/db-and-deployment/RAILWAY_ONE_CLICK_DEPLOY_NOTES.md`
- Template setup: `headless-cms/railway deploy docs/Original instructions/RAILWAY_TEMPLATE_SETUP.md`
- Database management: `headless-cms/docs/db-and-deployment/database-reset-notes.md`


