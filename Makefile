# ===========================================
# Payload CMS + Jamstack Platform Makefile
# ===========================================
# One-command workflows for development, testing, and deployment

.PHONY: help install dev build start stop clean test lint typecheck \
        docker-up docker-down docker-build docker-clean \
        db-migrate db-seed db-reset \
        railway-provision railway-deploy \
        cms-dev web-dev

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
# Development
# ===========================================

dev: ## Start all services in development mode (requires Docker)
	@echo "$(CYAN)Starting development environment...$(NC)"
	docker-compose up -d postgres
	@echo "$(YELLOW)Waiting for PostgreSQL to be ready...$(NC)"
	@sleep 5
	@echo "$(CYAN)Starting CMS and Web in parallel...$(NC)"
	pnpm dev

cms-dev: ## Start only the CMS in development mode
	@echo "$(CYAN)Starting CMS development server...$(NC)"
	cd apps/cms && pnpm dev

web-dev: ## Start only the Web frontend in development mode
	@echo "$(CYAN)Starting Web development server...$(NC)"
	cd apps/web && pnpm dev

# ===========================================
# Build
# ===========================================

build: ## Build all packages for production
	@echo "$(CYAN)Building all packages...$(NC)"
	pnpm build
	@echo "$(GREEN)Build completed successfully!$(NC)"

build-cms: ## Build only the CMS
	@echo "$(CYAN)Building CMS...$(NC)"
	cd apps/cms && pnpm build

build-web: ## Build only the Web frontend
	@echo "$(CYAN)Building Web frontend...$(NC)"
	cd apps/web && pnpm build

# ===========================================
# Production
# ===========================================

start: ## Start all services in production mode
	@echo "$(CYAN)Starting production servers...$(NC)"
	pnpm start

stop: ## Stop all running services
	@echo "$(CYAN)Stopping services...$(NC)"
	docker-compose down
	@echo "$(GREEN)Services stopped.$(NC)"

# ===========================================
# Docker
# ===========================================

docker-up: ## Start all services with Docker Compose
	@echo "$(CYAN)Starting Docker services...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)Services started!$(NC)"
	@echo ""
	@echo "$(CYAN)CMS:$(NC) http://localhost:3000/admin"
	@echo "$(CYAN)Web:$(NC) http://localhost:3001"

docker-down: ## Stop all Docker services
	@echo "$(CYAN)Stopping Docker services...$(NC)"
	docker-compose down
	@echo "$(GREEN)Services stopped.$(NC)"

docker-build: ## Build Docker images
	@echo "$(CYAN)Building Docker images...$(NC)"
	docker-compose build
	@echo "$(GREEN)Images built successfully!$(NC)"

docker-clean: ## Remove all Docker containers, volumes, and images
	@echo "$(YELLOW)Warning: This will remove all data!$(NC)"
	@read -p "Are you sure? [y/N] " confirm && [ "$$confirm" = "y" ]
	docker-compose down -v --rmi all
	@echo "$(GREEN)Docker resources cleaned.$(NC)"

docker-logs: ## View Docker logs
	docker-compose logs -f

docker-logs-cms: ## View CMS Docker logs
	docker-compose logs -f cms

docker-logs-web: ## View Web Docker logs
	docker-compose logs -f web

# ===========================================
# Database
# ===========================================

db-migrate: ## Run database migrations
	@echo "$(CYAN)Running database migrations...$(NC)"
	cd apps/cms && pnpm payload migrate
	@echo "$(GREEN)Migrations completed!$(NC)"

db-seed: ## Seed the database with sample data
	@echo "$(CYAN)Seeding database...$(NC)"
	cd apps/cms && pnpm seed
	@echo "$(GREEN)Database seeded!$(NC)"

db-reset: ## Reset database (drop all tables and re-migrate)
	@echo "$(YELLOW)Warning: This will delete all data!$(NC)"
	@read -p "Are you sure? [y/N] " confirm && [ "$$confirm" = "y" ]
	cd apps/cms && pnpm payload migrate:reset
	@echo "$(GREEN)Database reset!$(NC)"

db-studio: ## Open Drizzle Studio for database management
	@echo "$(CYAN)Opening Drizzle Studio...$(NC)"
	cd apps/cms && pnpm drizzle-kit studio

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
	rm -rf apps/web/node_modules apps/web/.next apps/web/dist
	rm -rf packages/shared/node_modules packages/shared/dist
	rm -rf packages/templates/node_modules packages/templates/dist
	@echo "$(GREEN)Cleanup completed!$(NC)"

clean-docker: ## Clean Docker resources
	@echo "$(CYAN)Cleaning Docker resources...$(NC)"
	docker-compose down -v
	docker system prune -f
	@echo "$(GREEN)Docker cleanup completed!$(NC)"

# ===========================================
# Utilities
# ===========================================

env-setup: ## Create .env file from example
	@echo "$(CYAN)Setting up environment...$(NC)"
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "$(GREEN).env file created from .env.example$(NC)"; \
		echo "$(YELLOW)Please edit .env with your configuration$(NC)"; \
	else \
		echo "$(YELLOW).env file already exists$(NC)"; \
	fi

generate-secret: ## Generate a random secret key
	@echo "$(CYAN)Generated secret:$(NC)"
	@openssl rand -hex 32

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
	@echo "  2. Run 'make docker-up' to start services"
	@echo "  3. Run 'make db-seed' to add sample data"
	@echo "  4. Visit http://localhost:3000/admin"
	@echo ""

quickstart: setup docker-up ## One-command quickstart (setup + start)
	@echo ""
	@echo "$(GREEN)========================================$(NC)"
	@echo "$(GREEN)Quickstart completed!$(NC)"
	@echo "$(GREEN)========================================$(NC)"
	@echo ""
	@echo "$(CYAN)CMS Admin:$(NC) http://localhost:3000/admin"
	@echo "$(CYAN)Frontend:$(NC)  http://localhost:3001"
	@echo ""
	@echo "Default admin credentials:"
	@echo "  Email: admin@example.com"
	@echo "  Password: admin123"
	@echo ""
