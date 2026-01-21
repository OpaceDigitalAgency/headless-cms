# Railway One-Click Deploy Checklist

Use this checklist to track your progress in setting up the Railway template.

## Prerequisites

- [ ] Railway account created (https://railway.app)
- [ ] Railway CLI installed (`npm install -g @railway/cli`)
- [ ] Logged into Railway CLI (`railway login`)
- [ ] Repository cloned locally
- [ ] All local tests passing

## Phase 1: Manual Deployment (One Time)

### 1.1 Create Railway Project

- [ ] Navigate to `headless-cms` directory
- [ ] Run `railway init`
- [ ] Project created successfully
- [ ] Project name: ________________

### 1.2 Add PostgreSQL Database

- [ ] Run `railway add --database postgres`
- [ ] PostgreSQL service created
- [ ] DATABASE_URL available

### 1.3 Deploy CMS Service

- [ ] Navigate to `apps/cms`
- [ ] Run `railway up --service cms`
- [ ] Build completed successfully
- [ ] Service deployed successfully

### 1.4 Configure CMS Environment Variables

In Railway Dashboard → CMS Service → Variables:

- [ ] `PAYLOAD_SECRET` set (generated with `openssl rand -hex 32`)
- [ ] `PAYLOAD_PUBLIC_SERVER_URL` set to `${{RAILWAY_PUBLIC_DOMAIN}}`
- [ ] `NODE_ENV` set to `production`
- [ ] `NEXT_TELEMETRY_DISABLED` set to `1`
- [ ] `DATABASE_URL` set to `${{Postgres.DATABASE_URL}}`

### 1.5 Generate CMS Domain

- [ ] Go to CMS Service → Settings → Networking
- [ ] Click "Generate Domain"
- [ ] Domain generated: ________________
- [ ] CMS accessible at domain

### 1.6 Deploy Web Service

- [ ] Navigate to `apps/web`
- [ ] Run `railway up --service web`
- [ ] Build completed successfully
- [ ] Service deployed successfully

### 1.7 Configure Web Environment Variables

In Railway Dashboard → Web Service → Variables:

- [ ] `CMS_URL` set to CMS domain (https://...)
- [ ] `NEXT_PUBLIC_CMS_URL` set to CMS domain (https://...)
- [ ] `NEXT_PUBLIC_SITE_URL` set to `${{RAILWAY_PUBLIC_DOMAIN}}`
- [ ] `REVALIDATION_SECRET` set (generated with `openssl rand -hex 32`)
- [ ] `NODE_ENV` set to `production`
- [ ] `NEXT_TELEMETRY_DISABLED` set to `1`
- [ ] `DATABASE_URL` set to `${{Postgres.DATABASE_URL}}`

### 1.8 Generate Web Domain

- [ ] Go to Web Service → Settings → Networking
- [ ] Click "Generate Domain"
- [ ] Domain generated: ________________
- [ ] Web frontend accessible at domain

### 1.9 Verify Deployment

- [ ] CMS admin accessible at `/admin`
- [ ] Can create first admin user
- [ ] Can login to CMS
- [ ] Can create content in CMS
- [ ] Web frontend loads correctly
- [ ] Web frontend displays content from CMS
- [ ] Database connection working
- [ ] No errors in logs

## Phase 2: Template Publishing (One Time)

### 2.1 Access Template Settings

- [ ] Open Railway project dashboard
- [ ] Click project settings (⚙️ gear icon)
- [ ] Navigate to "Template" section

### 2.2 Configure Template Details

- [ ] Click "Publish as Template"
- [ ] Name: "Payload CMS + Jamstack Platform"
- [ ] Description: "A super-powered, WordPress-like CMS with a decoupled Jamstack frontend"
- [ ] Category: CMS
- [ ] Tags: payload, cms, nextjs, jamstack, postgresql

### 2.3 Configure Auto-Generation

- [ ] `PAYLOAD_SECRET` marked as "Generate on deploy"
- [ ] `REVALIDATION_SECRET` marked as "Generate on deploy"
- [ ] Service references configured correctly
- [ ] Default values set for other variables

### 2.4 Publish Template

- [ ] Template published successfully
- [ ] Template URL received: ________________
- [ ] Template visible in Railway marketplace

## Phase 3: Repository Update (One Time)

### 3.1 Update README

- [ ] Open `README.md`
- [ ] Find deploy button (line 7 and line 61)
- [ ] Replace placeholder URL with actual template URL
- [ ] Save file

### 3.2 Commit and Push

- [ ] Run `git add README.md`
- [ ] Run `git commit -m "Update Railway deploy button with published template"`
- [ ] Run `git push`
- [ ] Changes pushed to GitHub

## Phase 4: Testing (One Time)

### 4.1 Test Template Deployment

- [ ] Open template URL in incognito window
- [ ] Click "Deploy Now"
- [ ] Wait for provisioning to complete
- [ ] All services created successfully
- [ ] All environment variables set correctly
- [ ] All services deployed successfully

### 4.2 Verify Test Deployment

- [ ] CMS admin accessible
- [ ] Can create admin user
- [ ] Can create content
- [ ] Web frontend accessible
- [ ] Web frontend displays content
- [ ] No errors in deployment

### 4.3 Clean Up Test Deployment

- [ ] Delete test project from Railway (optional)
- [ ] Or keep as demo/staging environment

## Phase 5: Documentation (Optional)

### 5.1 Update Documentation

- [ ] Add demo URL to template
- [ ] Add screenshots to README
- [ ] Update deployment section with actual URLs
- [ ] Add troubleshooting tips based on experience

### 5.2 Share Template

- [ ] Share template URL with team
- [ ] Add to Railway marketplace (if public)
- [ ] Announce on social media (if applicable)

## Completion

- [ ] All phases completed
- [ ] Template working perfectly
- [ ] Users can one-click deploy
- [ ] Zero manual configuration required

## Notes

Use this space to track any issues, custom configurations, or important information:

```
Template URL: ________________

CMS Domain: ________________

Web Domain: ________________

Issues Encountered:
- 
- 
- 

Custom Configurations:
- 
- 
- 
```

## Support

If you encounter issues:

1. Check `RAILWAY_DEPLOYMENT_SUMMARY.md` for overview
2. See `DEPLOY_TO_RAILWAY.md` for detailed steps
3. See `RAILWAY_TEMPLATE_SETUP.md` for template creation
4. Contact Railway support: https://railway.app/help

