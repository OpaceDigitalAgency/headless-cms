# ===========================================
# Payload CMS + Jamstack Platform Makefile
# ===========================================
# One-command workflows for development, testing, and deployment

.PHONY: help install dev dev-fresh build start stop clean test lint typecheck \
        docker-up docker-down docker-build docker-clean \
        db-migrate db-seed db-reset db-fresh \
        railway-provision railway-deploy \
        dev-cms dev-astro \
        build-cms build-astro \
        create blog-astro brochure-astro archive-next ecommerce-next \
        seed-blog seed-archive seed-ecommerce

# Default target
.DEFAULT_GOAL := help

# Colors for output
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

# ===========================================
# Help
# ===========================================

help: ## Show this help message
	@echo ""
	@echo "$(CYAN)Payload CMS + Jamstack Platform$(NC)"
	@echo "=================================="
	@echo ""
	@echo "$(GREEN)Available commands:$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-20s$(NC) %s\n", $$1, $$2}'
	@echo ""

# ===========================================
# Installation
# ===========================================

install: ## Install all dependencies
	@echo "$(CYAN)Installing dependencies...$(NC)"
	pnpm install
	@echo "$(GREEN)Dependencies installed successfully!$(NC)"

# ===========================================
# Project Scaffolding
# ===========================================

create: ## Create a new project (interactive mode)
	@./scripts/create.sh

blog: ## Create a new blog project
	@echo "$(CYAN)Creating blog project...$(NC)"
	@read -p "Enter project name: " name && ./scripts/create.sh blog $$name

brochure: ## Create a new brochure site
	@echo "$(CYAN)Creating brochure site...$(NC)"
	@read -p "Enter project name: " name && ./scripts/create.sh brochure $$name

archive: ## Create a new archive site
	@echo "$(CYAN)Creating archive site...$(NC)"
	@read -p "Enter project name: " name && ./scripts/create.sh archive $$name

ecommerce: ## Create a new ecommerce catalog
	@echo "$(CYAN)Creating ecommerce site...$(NC)"
	@read -p "Enter project name: " name && ./scripts/create.sh ecommerce $$name

# ===========================================
# Development
# ===========================================

dev: ## Start all services in development mode (requires Docker)
	@echo "$(CYAN)Starting development environment...$(NC)"
	docker compose up -d postgres
	@echo "$(CYAN)Starting CMS in development mode...$(NC)"
	@bash -c 'set -a; [ -f apps/cms/.env ] && source apps/cms/.env; set +a; pnpm dev'

dev-cms: ## Start only the CMS in development mode
	@echo "$(CYAN)Starting CMS development server...$(NC)"
	@bash -c 'set -a; [ -f apps/cms/.env ] && source apps/cms/.env; set +a; pnpm --filter @repo/cms dev'

dev-astro: ## Start only the Astro frontend in development mode
	@echo "$(CYAN)Starting Astro development server...$(NC)"
	pnpm --filter @repo/astro dev

# ===========================================
# Build
# ===========================================

build: ## Build all packages for production
	@echo "$(CYAN)Building all packages...$(NC)"
	pnpm build
	@echo "$(GREEN)Build completed successfully!$(NC)"

build-cms: ## Build only the CMS
	@echo "$(CYAN)Building CMS...$(NC)"
	pnpm --filter @repo/cms build

build-astro: ## Build only the Astro frontend (pure SSG)
	@echo "$(CYAN)Building Astro frontend...$(NC)"
	pnpm --filter @repo/astro build

# ===========================================
# Production
# ===========================================

start: ## Start all services in production mode
	@echo "$(CYAN)Starting production servers...$(NC)"
	pnpm start

stop: ## Stop all running services
	@echo "$(CYAN)Stopping services...$(NC)"
	docker compose down
	@echo "$(GREEN)Services stopped.$(NC)"

# ===========================================
# Docker
# ===========================================

docker-up: ## Start all services with Docker Compose
	@echo "$(CYAN)Starting Docker services...$(NC)"
	docker compose up -d
	@echo "$(GREEN)Services started!$(NC)"
	@echo ""
	@echo "$(CYAN)CMS & Frontend:$(NC) http://localhost:3000"
	@echo "$(CYAN)CMS Admin:$(NC)      http://localhost:3000/admin"
	@echo "$(CYAN)Astro:$(NC)          http://localhost:4321"

docker-down: ## Stop all Docker services
	@echo "$(CYAN)Stopping Docker services...$(NC)"
	docker compose down
	@echo "$(GREEN)Services stopped.$(NC)"

docker-build: ## Build Docker images
	@echo "$(CYAN)Building Docker images...$(NC)"
	docker compose build
	@echo "$(GREEN)Images built successfully!$(NC)"

docker-clean: ## Remove all Docker containers, volumes, and images
	@echo "$(YELLOW)Warning: This will remove all data!$(NC)"
	@read -p "Are you sure? [y/N] " confirm && [ "$$confirm" = "y" ]
	docker compose down -v --rmi all
	@echo "$(GREEN)Docker resources cleaned.$(NC)"

docker-logs: ## View Docker logs
	docker compose logs -f

docker-logs-cms: ## View CMS Docker logs
	docker compose logs -f cms

# ===========================================
# Database
# ===========================================

db-up: ## Start only PostgreSQL
	@echo "$(CYAN)Starting PostgreSQL...$(NC)"
	docker compose up -d postgres
	@echo "$(GREEN)PostgreSQL started on port 5432$(NC)"

db-down: ## Stop PostgreSQL
	@echo "$(CYAN)Stopping PostgreSQL...$(NC)"
	docker compose stop postgres
	@echo "$(GREEN)PostgreSQL stopped.$(NC)"

db-migrate: ## Run database migrations
	@echo "$(CYAN)Running database migrations...$(NC)"
	pnpm --filter @repo/cms migrate
	@echo "$(GREEN)Migrations completed!$(NC)"

db-seed: ## Seed the database with sample data
	@echo "$(CYAN)Seeding database...$(NC)"
	pnpm --filter @repo/cms seed
	@echo "$(GREEN)Database seeded!$(NC)"

db-reset: ## Reset database (drop all tables and re-migrate)
	@echo "$(YELLOW)Warning: This will delete all data!$(NC)"
	@read -p "Are you sure? [y/N] " confirm && [ "$$confirm" = "y" ]
	pnpm --filter @repo/cms migrate:reset
	@echo "$(GREEN)Database reset!$(NC)"

db-fresh: ## Fresh database reset using migrations (non-interactive, safe default)
	@$(MAKE) db-fresh-migrations

dev-fresh: ## Start CMS dev server after a fresh reset (no push mode)
	@echo "$(CYAN)Starting CMS development server...$(NC)"
	@cd apps/cms && pnpm dev

db-fresh-migrations: ## Fresh database with regenerated migrations (for production deployment)
	@echo "$(YELLOW)═══════════════════════════════════════════════════════$(NC)"
	@echo "$(YELLOW)  Fresh Database & Migration Regeneration$(NC)"
	@echo "$(YELLOW)  This will DELETE all data and regenerate migrations$(NC)"
	@echo "$(YELLOW)═══════════════════════════════════════════════════════$(NC)"
	@read -p "Are you sure? [y/N] " confirm && [ "$$confirm" = "y" ]
	@echo ""
	@echo "$(CYAN)[1/6] Stopping any running dev servers...$(NC)"
	@-lsof -ti :3000 | xargs kill -9 2>/dev/null || true
	@-lsof -ti :3001 | xargs kill -9 2>/dev/null || true
	@-lsof -ti :4321 | xargs kill -9 2>/dev/null || true
	@sleep 1
	@echo "$(CYAN)[2/6] Removing database volume and recreating...$(NC)"
	@docker compose down -v
	@docker compose up -d postgres
	@echo "$(CYAN)[3/6] Waiting for PostgreSQL to be ready...$(NC)"
	@sleep 5
	@echo "$(CYAN)[4/6] Clearing old migrations...$(NC)"
	@rm -f apps/db/migrations/*.ts apps/db/migrations/*.json
	@echo 'export const migrations = [];' > apps/db/migrations/index.ts
	@echo "$(CYAN)[5/6] Generating fresh migrations from current schema...$(NC)"
	@pnpm --filter @repo/cms migrate:create
	@echo "$(CYAN)[6/6] Running migrations (standard mode)...$(NC)"
	@pnpm --filter @repo/cms migrate
	@echo ""
	@echo "$(GREEN)═══════════════════════════════════════════════════════$(NC)"
	@echo "$(GREEN)  Database refreshed successfully!$(NC)"
	@echo "$(GREEN)═══════════════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "Next steps:"
	@echo "  1. Run 'make dev' to start the dev server"
	@echo "  2. Go to http://localhost:3000/admin to create admin user"
	@echo "  3. Run seed scripts from within the CMS"
	@echo ""

db-studio: ## Open Drizzle Studio for database management
	@echo "$(CYAN)Opening Drizzle Studio...$(NC)"
	cd apps/cms && pnpm drizzle-kit studio

# ===========================================
# Preset-Specific Seeding
# ===========================================

seed-blog: ## Seed blog-specific sample data
	@echo "$(CYAN)Seeding blog data...$(NC)"
	SEED_PRESET=blog pnpm --filter @repo/cms seed
	@echo "$(GREEN)Blog data seeded!$(NC)"

seed-archive: ## Seed archive-specific sample data
	@echo "$(CYAN)Seeding archive data...$(NC)"
	SEED_PRESET=archive pnpm --filter @repo/cms seed
	@echo "$(GREEN)Archive data seeded!$(NC)"

seed-ecommerce: ## Seed ecommerce-specific sample data
	@echo "$(CYAN)Seeding ecommerce data...$(NC)"
	SEED_PRESET=ecommerce pnpm --filter @repo/cms seed
	@echo "$(GREEN)Ecommerce data seeded!$(NC)"

seed-with-media: ## Seed data including sample media downloads
	@echo "$(CYAN)Seeding data with media...$(NC)"
	SEED_MEDIA=true pnpm --filter @repo/cms seed
	@echo "$(GREEN)Data with media seeded!$(NC)"

# ===========================================
# Code Quality
# ===========================================

lint: ## Run ESLint on all packages
	@echo "$(CYAN)Running linter...$(NC)"
	pnpm lint
	@echo "$(GREEN)Linting completed!$(NC)"

lint-fix: ## Run ESLint and fix issues
	@echo "$(CYAN)Running linter with auto-fix...$(NC)"
	pnpm lint:fix
	@echo "$(GREEN)Linting completed!$(NC)"

typecheck: ## Run TypeScript type checking
	@echo "$(CYAN)Running type check...$(NC)"
	pnpm typecheck
	@echo "$(GREEN)Type check completed!$(NC)"

format: ## Format code with Prettier
	@echo "$(CYAN)Formatting code...$(NC)"
	pnpm format
	@echo "$(GREEN)Formatting completed!$(NC)"

test: ## Run all tests
	@echo "$(CYAN)Running tests...$(NC)"
	pnpm test
	@echo "$(GREEN)Tests completed!$(NC)"

# ===========================================
# Railway Deployment
# ===========================================

railway-provision: ## Provision Railway services
	@echo "$(CYAN)Provisioning Railway services...$(NC)"
	chmod +x scripts/railway-provision.sh
	./scripts/railway-provision.sh
	@echo "$(GREEN)Railway provisioning completed!$(NC)"

railway-deploy: ## Deploy to Railway
	@echo "$(CYAN)Deploying to Railway...$(NC)"
	railway up
	@echo "$(GREEN)Deployment completed!$(NC)"

railway-logs: ## View Railway logs
	railway logs

railway-status: ## Check Railway deployment status
	railway status

# ===========================================
# Cleanup
# ===========================================

clean: ## Clean all build artifacts and dependencies
	@echo "$(CYAN)Cleaning build artifacts...$(NC)"
	rm -rf node_modules
	rm -rf apps/cms/node_modules apps/cms/.next apps/cms/dist
	rm -rf apps/astro/node_modules apps/astro/dist
	rm -rf packages/shared/node_modules packages/shared/dist
	rm -rf packages/templates/node_modules packages/templates/dist
	rm -rf packages/ui/node_modules packages/ui/dist
	@echo "$(GREEN)Cleanup completed!$(NC)"

clean-docker: ## Clean Docker resources
	@echo "$(CYAN)Cleaning Docker resources...$(NC)"
	docker compose down -v
	docker system prune -f
	@echo "$(GREEN)Docker cleanup completed!$(NC)"

# ===========================================
# Utilities
# ===========================================

env-setup: ## Create .env files from examples
	@echo "$(CYAN)Setting up environment...$(NC)"
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "$(GREEN)Root .env file created from .env.example$(NC)"; \
	else \
		echo "$(YELLOW)Root .env file already exists$(NC)"; \
	fi
	@if [ ! -e apps/cms/.env ]; then \
		ln -s ../../.env apps/cms/.env; \
		echo "$(GREEN)CMS .env symlink created (points to root .env)$(NC)"; \
	else \
		echo "$(YELLOW)CMS .env already exists$(NC)"; \
	fi
	@echo "$(YELLOW)Please edit .env with your configuration if needed$(NC)"

generate-secret: ## Generate a random secret key
	@echo "$(CYAN)Generated secret:$(NC)"
	@openssl rand -hex 32

generate-types: ## Generate TypeScript types from Payload
	@echo "$(CYAN)Generating TypeScript types...$(NC)"
	pnpm --filter @repo/cms generate:types
	@echo "$(GREEN)Types generated!$(NC)"

generate-graphql: ## Generate GraphQL schema
	@echo "$(CYAN)Generating GraphQL schema...$(NC)"
	pnpm --filter @repo/cms generate:graphql
	@echo "$(GREEN)GraphQL schema generated!$(NC)"

check-deps: ## Check for outdated dependencies
	@echo "$(CYAN)Checking for outdated dependencies...$(NC)"
	pnpm outdated

update-deps: ## Update all dependencies
	@echo "$(CYAN)Updating dependencies...$(NC)"
	pnpm update
	@echo "$(GREEN)Dependencies updated!$(NC)"

# ===========================================
# Quick Start
# ===========================================

setup: env-setup install ## Complete setup for new developers
	@echo ""
	@echo "$(GREEN)========================================$(NC)"
	@echo "$(GREEN)Setup completed!$(NC)"
	@echo "$(GREEN)========================================$(NC)"
	@echo ""
	@echo "Next steps:"
	@echo "  1. Edit .env with your configuration"
	@echo "  2. Run 'make db-up' to start PostgreSQL"
	@echo "  3. Run 'make db-migrate' to run migrations"
	@echo "  4. Run 'make db-seed' to add sample data"
	@echo "  5. Run 'make dev' to start all services"
	@echo ""

quickstart: env-setup install db-up ## One-command quickstart (setup + start)
	@echo "$(YELLOW)Waiting for PostgreSQL to be ready...$(NC)"
	@sleep 5
	@echo "$(CYAN)Running migrations...$(NC)"
	@pnpm --filter @repo/cms migrate || true
	@echo "$(CYAN)Seeding database...$(NC)"
	@pnpm --filter @repo/cms seed || true
	@echo ""
	@echo "$(GREEN)========================================$(NC)"
	@echo "$(GREEN)Quickstart completed!$(NC)"
	@echo "$(GREEN)========================================$(NC)"
	@echo ""
	@echo "$(CYAN)Starting development servers...$(NC)"
	@echo ""
	@echo "Access points:"
	@echo "  $(CYAN)CMS Admin:$(NC)  http://localhost:3000/admin"
	@echo "  $(CYAN)Next.js:$(NC)    http://localhost:3001"
	@echo "  $(CYAN)Astro:$(NC)      http://localhost:4321"
	@echo ""
	@echo "Default admin credentials:"
	@echo "  Email: admin@example.com"
	@echo "  Password: admin123"
	@echo ""
	@pnpm dev
