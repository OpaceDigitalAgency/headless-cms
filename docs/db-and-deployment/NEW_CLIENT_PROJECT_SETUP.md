# New Client Project Setup - Automated Process

## Overview

This guide explains how to set up a new client project with **zero manual configuration**. The `setup.sh` script automates everything:

- ✅ Auto-detects project name from folder
- ✅ Auto-assigns unique database port (5432, 5433, 5434, etc.)
- ✅ Auto-assigns unique CMS port (3000, 3001, 3002, etc.)
- ✅ Generates secure secrets automatically
- ✅ Creates isolated PostgreSQL database
- ✅ Installs dependencies
- ✅ Runs migrations
- ✅ Ready to run `make dev`

---

## Quick Start - 3 Steps

### Step 1: Create Client Project Folder

```bash
mkdir -p "/path/to/client-projects/Client Name"
cd "/path/to/client-projects/Client Name"
git init
```

### Step 2: Add CMS as Submodule (Latest Stable Version)

```bash
git submodule add https://github.com/OpaceDigitalAgency/headless-cms.git headless-cms
cd headless-cms
git checkout v1.0.2  # Use latest stable version
cd ..
git add .gitmodules headless-cms
git commit -m "chore: add headless-cms submodule v1.0.2"
git push origin main
```

### Step 3: Run Setup Script

```bash
cd headless-cms
./setup.sh
```

The script will:
1. Ask you to confirm or change the project name
2. Auto-detect available ports
3. Generate all configuration
4. Install dependencies
5. Run migrations

---

## What Gets Automated

### Project Name Detection

The script detects the parent folder name and converts it:
- "Client Name" → `client-name`
- "Online Boiler Company" → `online-boiler-company`

You can override this by typing a different name when prompted.

### Port Assignment

**Database Ports:**
- Starts at 5432
- Auto-increments if port is in use (5433, 5434, etc.)

**CMS Ports:**
- Starts at 3000
- Auto-increments if port is in use (3001, 3002, etc.)

### Database Isolation

Each project gets:
- **Database name:** `{project-name}_db`
- **Container name:** `{project-name}-postgres-1`
- **Volume name:** `{project-name}_postgres_data`

This ensures multiple projects can run simultaneously without conflicts.

### Secrets Generation

Three secure secrets are auto-generated:
- `PAYLOAD_SECRET` - JWT signing and encryption
- `REVALIDATION_SECRET` - ISR revalidation
- `PREVIEW_SECRET` - Live preview tokens

---

## Running Multiple Projects Simultaneously

After setup, each project has its own:
- Database container
- Database volume
- CMS port

**Example:**
```bash
# Terminal 1: Dev version
cd /path/to/dev/headless-cms
make dev  # Runs on http://localhost:3000

# Terminal 2: Client 1
cd /path/to/client1/headless-cms
make dev  # Runs on http://localhost:3001

# Terminal 3: Client 2
cd /path/to/client2/headless-cms
make dev  # Runs on http://localhost:3002
```

All three run simultaneously with isolated databases!

---

## Version Management

Always use tagged versions for client projects:

- **v1.0.0** - Initial stable release
- **v1.0.1** - Added setup.sh
- **v1.0.2** - Auto-assign CMS port
- **v1.1.0** - Future releases

Update submodule to new version:
```bash
cd headless-cms
git fetch --tags
git checkout v1.0.2  # or latest version
cd ..
git add headless-cms
git commit -m "chore: update headless-cms to v1.0.2"
git push origin main
```

---

## Troubleshooting

**Port already in use?**
- Script auto-detects and assigns next available port
- Check with: `lsof -i :3000` or `lsof -i :5432`

**Dependencies not installing?**
- Ensure pnpm is installed: `npm install -g pnpm`
- Clear cache: `pnpm store prune`

**Migrations failing?**
- Check PostgreSQL is running: `docker ps`
- Check database exists: `docker exec {container} psql -U payload -l`

---

## Next Steps After Setup

1. **Start development server:**
   ```bash
   make dev
   ```

2. **Open CMS admin:**
   - URL shown in setup output (e.g., http://localhost:3001/admin)

3. **Create first admin user**
   - Follow on-screen prompts

4. **Deploy to Railway:**
   - See `RAILWAY_DEPLOYMENT_STEPS.md`

---

## Summary

The `setup.sh` script eliminates all manual configuration. For each new client:

1. Create folder
2. Add CMS submodule
3. Run `./setup.sh`
4. Done! ✅

Everything else is automated.

