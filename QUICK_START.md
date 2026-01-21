# Quick Start Guide - Headless CMS

## Prerequisites

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **Docker Desktop** installed and running ([Download](https://www.docker.com/products/docker-desktop))
- **pnpm** installed (`npm install -g pnpm`)

## One-Command Setup (Recommended)

The fastest way to get started:

```bash
# Clone the repository
git clone https://github.com/OpaceDigitalAgency/headless-cms.git
cd headless-cms

# Run the quickstart command
make quickstart
```

This single command will:
1. ✅ Create `.env` files from examples
2. ✅ Install all dependencies
3. ✅ Start PostgreSQL via Docker
4. ✅ Run database migrations
5. ✅ Seed sample data
6. ✅ Start the CMS and integrated frontend on http://localhost:3000

**Then:**
1. Open your browser to: `http://localhost:3000/admin/create-first-user`
2. Fill in your admin credentials
3. Click "Create"

You're now ready to use the CMS!

---

## Manual Setup (Step-by-Step)

If you prefer to run each step manually or if `make quickstart` doesn't work:

### 1. Stop Any Local PostgreSQL

If you have PostgreSQL running locally on port 5432, stop it:

```bash
# Check if PostgreSQL is running
lsof -i :5432

# Stop Homebrew PostgreSQL if running
brew services stop postgresql@15
# or
brew services stop postgresql
```

### 2. Clone and Navigate

```bash
git clone https://github.com/OpaceDigitalAgency/headless-cms.git
cd headless-cms
```

### 3. Create Environment Files

```bash
# Copy environment examples
cp .env.example .env
cp apps/cms/.env.example apps/cms/.env

# Or use the Makefile command
make env-setup
```

### 4. Install Dependencies

```bash
pnpm install
```

### 5. Start PostgreSQL Database

```bash
docker compose up -d postgres
```

Wait 10-15 seconds for PostgreSQL to initialize.

### 6. Run Database Migrations

```bash
cd apps/cms
pnpm migrate
cd ../..
```

### 7. Start the CMS

```bash
cd apps/cms
pnpm dev
```

The CMS will start on `http://localhost:3000`

### 8. Create Your First Admin User

1. Open your browser to: `http://localhost:3000/admin/create-first-user`
2. Fill in your admin credentials
3. Click "Create"

You're now ready to use the CMS!

---

## Daily Usage

### Start Everything

**Option 1: Using Make (Recommended)**
```bash
cd headless-cms
make dev
```

**Option 2: Manual**
```bash
# Terminal 1: Start PostgreSQL
cd headless-cms
docker compose up -d postgres

# Terminal 2: Start CMS
cd apps/cms
pnpm dev
```

### Stop Everything

```bash
# Stop CMS: Press Ctrl+C in the terminal

# Stop PostgreSQL
docker compose down
```

## Available URLs

- **Admin Panel:** http://localhost:3000/admin
- **API Docs:** http://localhost:3000/api-docs
- **GraphQL Playground:** http://localhost:3000/api/graphql

## Collections Available

1. **Pages** - Website pages with flexible layouts
2. **Posts** - Blog posts and articles
3. **Places** - Locations with map coordinates (PostGIS)
4. **Media** - File uploads and images
5. **Content Types** - Reusable content blocks
6. **Categories** - Taxonomy for organizing content
7. **Tags** - Keywords for content
8. **Users** - Admin and editor accounts

---

## Troubleshooting

### ❌ Missing Environment Variables Error

If you see an error about missing environment variables:

```bash
# Make sure .env files exist
ls -la .env
ls -la apps/cms/.env

# If they don't exist, create them
make env-setup

# Or manually
cp .env.example .env
cp apps/cms/.env.example apps/cms/.env
```

### ❌ Port 5432 Already in Use

```bash
# Find what's using the port
lsof -i :5432

# Stop local PostgreSQL
brew services stop postgresql@15
# or
brew services stop postgresql
```

### ❌ CMS Won't Start

```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# If not running, start it
docker compose up -d postgres

# Wait 10 seconds, then restart CMS
cd apps/cms
pnpm dev
```

### ❌ Database Connection Errors

```bash
# Check environment variables
cat apps/cms/.env

# Should contain:
# DATABASE_URL=postgresql://payload:payload_secret@localhost:5432/payload

# Check if PostgreSQL is accessible
docker compose exec postgres psql -U payload -d payload -c "SELECT 1"
```

### ❌ Module Not Found Errors

```bash
# Reinstall dependencies
rm -rf node_modules apps/*/node_modules
pnpm install
```

### 🔄 Clear Database and Start Fresh

```bash
# Stop everything
docker compose down

# Remove database volume
docker volume rm headless-cms_postgres_data

# Start fresh
make quickstart
```

## Development Tips

### Generate TypeScript Types

```bash
cd apps/cms
pnpm payload generate:types
```

### Create a Migration

```bash
cd apps/cms
pnpm payload migrate:create
```

### Run Migrations

```bash
cd apps/cms
pnpm payload migrate
```

### Access PostgreSQL CLI

```bash
cd headless-cms
docker compose exec postgres psql -U payload -d payload
```

## Environment Variables

Key environment variables in `apps/cms/.env`:

```env
# Database
DATABASE_URL=postgresql://payload:payload_secret@localhost:5432/payload

# Security
PAYLOAD_SECRET=your-secret-key-change-in-production

# URLs
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Next Steps

1. Explore the admin panel at http://localhost:3000/admin
2. Create some test content
3. Check out the GraphQL API at http://localhost:3000/api/graphql
4. Read the full documentation in the `/docs` folder

## Support

For issues or questions:
1. Check `AUDIT_REPORT.md` for known issues
2. Review logs in the terminal
3. Check Docker logs: `docker compose logs postgres`

---

**Happy Building! 🚀**

