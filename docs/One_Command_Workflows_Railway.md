
# One‑Command Workflows & Automation (Non‑Technical Friendly)

This document defines **simple, fixed commands** that allow non‑technical users and AI agents to run, reset, and deploy the entire system with **one command per task**.

This file is designed to be used **alongside** the main Agent Build Brief.

---

## Fixed Ports (MUST NOT CHANGE)

To avoid conflicts and ambiguity, all services use fixed ports:

- **CMS**: http://localhost:3000  
- **Web**: http://localhost:3001  
- **PostgreSQL**: localhost:5432  

These ports must be hard‑coded in Docker Compose and documented in `.env.example`.

---

## Makefile (Command Wrapper)

A `Makefile` MUST exist at the repository root.  
It provides a simple command interface for non‑technical users.

All commands must be:
- non‑interactive
- idempotent
- safe to re‑run

### Required Makefile Targets

### `make up`
Start the full local stack.

- Starts PostgreSQL, CMS, and Web
- Uses Docker Compose
- Prints service URLs on completion

### `make down`
Stop the full local stack.

- Stops and removes containers created by this project

### `make reset`
Reset the local environment.

- Stops all services
- Deletes the local Postgres volume
- Restarts the full stack
- Runs migrations/seed logic if present

### `make cms`
Run CMS only.

- Starts PostgreSQL + CMS
- Web does not start
- Used for schema/content modelling work

### `make web`
Run Web only.

- Starts Web on port 3001
- Assumes CMS is already running
- Must fail fast if CMS is unreachable

### `make logs`
Stream logs from all services.

### `make status`
Show container/service status.

### `make railway`
Railway deployment (template mode).

- Prints instructions for deploying via Railway template
- Does NOT require credentials

### `make railway-auto`
Fully automated Railway deployment.

- Requires `RAILWAY_API_TOKEN`
- Runs provisioning script end‑to‑end
- Non‑interactive

---

## Makefile Template

```makefile
.PHONY: up down reset cms web logs status railway railway-auto

PROJECT_NAME=payload-jamstack-poc

up:
	@echo "Starting full local stack..."
	docker compose up -d
	@echo ""
	@echo "CMS  → http://localhost:3000/admin"
	@echo "WEB  → http://localhost:3001"

down:
	@echo "Stopping local stack..."
	docker compose down

reset:
	@echo "Resetting local environment (including database)..."
	docker compose down -v
	docker compose up -d
	@echo "Local stack reset complete."

cms:
	@echo "Starting CMS + Postgres only..."
	docker compose up -d postgres cms
	@echo "CMS → http://localhost:3000/admin"

web:
	@echo "Starting Web only (CMS must already be running)..."
	docker compose up -d web
	@echo "WEB → http://localhost:3001"

logs:
	docker compose logs -f

status:
	docker compose ps

railway:
	@echo ""
	@echo "Deploy to Railway using the project template:"
	@echo "1. Open the Railway template link"
	@echo "2. Click Deploy"
	@echo "3. Railway will provision postgres, cms, and web"
	@echo ""
	@echo "No local credentials required."

railway-auto:
	@if [ -z "$$RAILWAY_API_TOKEN" ]; then 		echo "ERROR: RAILWAY_API_TOKEN is not set"; 		exit 1; 	fi
	@echo "Running fully automated Railway provisioning..."
	sh scripts/railway-provision.sh
```

---

## Docker Compose Requirements

`docker/docker-compose.yml` MUST:

- Define services named exactly:
  - `postgres`
  - `cms`
  - `web`
- Bind fixed ports:
  - `3000:3000` (CMS)
  - `3001:3001` (Web)
  - `5432:5432` (Postgres)
- Use a **named volume** for Postgres data

---

## Railway Automation Script

File location:

```
scripts/railway-provision.sh
```

### Responsibilities

The script MUST:

1. Authenticate using `RAILWAY_API_TOKEN`
2. Create a Railway project
3. Add a managed PostgreSQL service
4. Deploy CMS and Web services
5. Set required environment variables
6. Print final service URLs

### Script Structure Template

```sh
#!/bin/sh
set -e

echo "Authenticating with Railway..."
railway login --token "$RAILWAY_API_TOKEN"

echo "Creating Railway project..."
railway init payload-jamstack-poc --yes

echo "Adding PostgreSQL..."
railway add postgres --yes

echo "Deploying CMS..."
railway up --service cms

echo "Deploying Web..."
railway up --service web

echo ""
echo "Railway deployment complete."
railway status
```

Script must be:
- non‑interactive
- safe to re‑run
- committed to the repository

---

## Environment Variable Contract

All services MUST rely on these variables.

### Shared
- `DATABASE_URL`
- `NODE_ENV=production`

### CMS
- `PAYLOAD_SECRET`
- `PAYLOAD_PUBLIC_SERVER_URL`

### Web
- `CMS_URL`
- `NEXT_PUBLIC_SITE_URL`
- `REVALIDATION_SECRET`

All variables must be listed in `.env.example`.

---

## Acceptance Criteria

The following commands MUST work:

- `make up`
- `make down`
- `make reset`
- `make cms`
- `make web`
- `make railway`
- `make railway-auto`

No additional commands should be required for local development or deployment.
