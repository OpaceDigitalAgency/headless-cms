# Quick Reference - New Client Project Setup

## Copy & Paste Commands

### Step 1: Create Project Folder
```bash
mkdir -p "/path/to/projects/Client Name"
cd "/path/to/projects/Client Name"
git init
```

### Step 2: Add CMS Submodule
```bash
git submodule add https://github.com/OpaceDigitalAgency/headless-cms.git headless-cms
cd headless-cms
git fetch --tags
git checkout v1.0.2
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

When prompted:
- Press **Enter** to use auto-detected project name
- Or type a custom name (e.g., `online-boiler-company`)

### Step 4: Start Development
```bash
make dev
```

Open browser to URL shown in setup output (e.g., `http://localhost:3001/admin`)

---

## What Gets Automated

| Task | Before | Now |
|------|--------|-----|
| Project name | Manual | Auto-detected |
| Database port | Manual | Auto-assigned |
| CMS port | Manual | Auto-assigned |
| Secrets (3x) | Manual generation | Auto-generated |
| .env file | Manual copy + edit | Auto-created |
| Dependencies | `pnpm install` | Automated |
| Database setup | `make db-up` | Automated |
| Migrations | `make db-migrate` | Automated |

---

## Port Assignment Logic

**Database Ports:**
- Checks 5432 → 5433 → 5434 → etc.
- Uses first available port

**CMS Ports:**
- Checks 3000 → 3001 → 3002 → etc.
- Uses first available port

**Result:** Multiple projects run simultaneously!

---

## Example: Running 3 Projects

```bash
# Terminal 1: Dev version
cd ~/dev/headless-cms
make dev
# → http://localhost:3000/admin
# → Database: port 5432

# Terminal 2: Client 1
cd ~/clients/client1/headless-cms
make dev
# → http://localhost:3001/admin
# → Database: port 5433

# Terminal 3: Client 2
cd ~/clients/client2/headless-cms
make dev
# → http://localhost:3002/admin
# → Database: port 5434
```

All three run simultaneously with isolated databases!

---

## Version Updates

Check latest version:
```bash
cd headless-cms
git tag -l | sort -V | tail -5
```

Update to new version:
```bash
cd headless-cms
git fetch --tags
git checkout v1.0.3  # or latest version
cd ..
git add headless-cms
git commit -m "chore: update headless-cms to v1.0.3"
git push origin main
```

---

## Troubleshooting

**Port conflict?**
```bash
# Check what's using port 3000
lsof -i :3000

# Check what's using port 5432
lsof -i :5432
```

**Dependencies not installing?**
```bash
# Clear pnpm cache
pnpm store prune

# Reinstall
pnpm install
```

**Database issues?**
```bash
# Check Docker containers
docker ps

# Check Docker volumes
docker volume ls

# View logs
docker logs {container-name}
```

---

## Files Created by setup.sh

```
headless-cms/
├── apps/cms/.env          ← Auto-generated config
├── docker-compose.yml     ← Uses COMPOSE_PROJECT_NAME
└── setup.sh              ← The automation script
```

The `.env` file contains:
- DATABASE_URL
- PAYLOAD_SECRET
- REVALIDATION_SECRET
- PREVIEW_SECRET
- CMS_PORT
- POSTGRES_PORT
- All other required variables

---

## That's It!

For each new client:
1. Create folder
2. Add submodule
3. Run `./setup.sh`
4. Run `make dev`

Everything else is automated! ✅

