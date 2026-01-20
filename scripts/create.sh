#!/bin/bash

# ===========================================
# Payload CMS + Jamstack Project Generator
# ===========================================
# 
# Creates a new project from a preset template.
# Usage: ./scripts/create.sh [preset] [project-name]
#
# Available presets:
#   - blog-astro      : Blog with Astro frontend
#   - brochure-astro  : Brochure/marketing site with Astro
#   - archive-next    : Archive site with Next.js
#   - ecommerce-next  : Ecommerce catalog with Next.js
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Available presets
PRESETS=("blog-astro" "brochure-astro" "archive-next" "ecommerce-next")

# ===========================================
# Helper Functions
# ===========================================

print_header() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║     Payload CMS + Jamstack Project Generator                 ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}→ $1${NC}"
}

show_usage() {
    echo "Usage: $0 [preset] [project-name]"
    echo ""
    echo "Available presets:"
    for preset in "${PRESETS[@]}"; do
        echo "  - $preset"
    done
    echo ""
    echo "Examples:"
    echo "  $0 blog-astro my-blog"
    echo "  $0 archive-next art-gallery"
    echo "  $0 ecommerce-next my-shop"
    echo ""
}

is_valid_preset() {
    local preset=$1
    for p in "${PRESETS[@]}"; do
        if [[ "$p" == "$preset" ]]; then
            return 0
        fi
    done
    return 1
}

# ===========================================
# Interactive Mode
# ===========================================

select_preset() {
    echo ""
    echo "Select a preset:"
    echo ""
    PS3="Enter number: "
    select preset in "${PRESETS[@]}"; do
        if [[ -n "$preset" ]]; then
            SELECTED_PRESET="$preset"
            break
        else
            print_error "Invalid selection. Please try again."
        fi
    done
}

get_project_name() {
    echo ""
    read -p "Enter project name (lowercase, no spaces): " PROJECT_NAME
    
    # Validate project name
    if [[ ! "$PROJECT_NAME" =~ ^[a-z][a-z0-9-]*$ ]]; then
        print_error "Invalid project name. Use lowercase letters, numbers, and hyphens only."
        get_project_name
    fi
}

# ===========================================
# Project Creation
# ===========================================

create_project() {
    local preset=$1
    local project_name=$2
    local target_dir="$PWD/$project_name"
    
    print_info "Creating project '$project_name' from preset '$preset'..."
    
    # Check if directory exists
    if [[ -d "$target_dir" ]]; then
        print_error "Directory '$project_name' already exists!"
        exit 1
    fi
    
    # Create project directory
    mkdir -p "$target_dir"
    
    # Determine frontend type
    local frontend_type=""
    if [[ "$preset" == *"-astro" ]]; then
        frontend_type="astro"
    else
        frontend_type="next"
    fi
    
    print_info "Setting up project structure..."
    
    # Copy base CMS files
    cp -r "$ROOT_DIR/apps/cms" "$target_dir/cms"
    
    # Copy frontend based on type
    if [[ "$frontend_type" == "astro" ]]; then
        cp -r "$ROOT_DIR/apps/frontend-astro" "$target_dir/frontend"
    else
        cp -r "$ROOT_DIR/apps/frontend-next" "$target_dir/frontend"
    fi
    
    # Copy shared packages
    mkdir -p "$target_dir/packages"
    cp -r "$ROOT_DIR/packages/shared" "$target_dir/packages/"
    cp -r "$ROOT_DIR/packages/templates" "$target_dir/packages/"
    
    # Copy preset-specific files
    local preset_dir="$ROOT_DIR/presets/$preset"
    if [[ -d "$preset_dir/collections" ]]; then
        cp -r "$preset_dir/collections/"* "$target_dir/cms/src/collections/" 2>/dev/null || true
    fi
    if [[ -d "$preset_dir/globals" ]]; then
        cp -r "$preset_dir/globals/"* "$target_dir/cms/src/globals/" 2>/dev/null || true
    fi
    if [[ -d "$preset_dir/seed" ]]; then
        cp -r "$preset_dir/seed/"* "$target_dir/cms/src/seed/" 2>/dev/null || true
    fi
    
    # Copy configuration files
    cp "$ROOT_DIR/package.json" "$target_dir/"
    cp "$ROOT_DIR/pnpm-workspace.yaml" "$target_dir/"
    cp "$ROOT_DIR/tsconfig.json" "$target_dir/"
    cp "$ROOT_DIR/.gitignore" "$target_dir/"
    cp "$ROOT_DIR/Makefile" "$target_dir/"
    
    # Copy Docker files
    cp "$ROOT_DIR/docker-compose.yml" "$target_dir/"
    cp -r "$ROOT_DIR/docker" "$target_dir/" 2>/dev/null || true
    
    # Copy preset manifest
    cp "$preset_dir/manifest.json" "$target_dir/preset.json"
    
    # Update package.json with project name
    sed -i "s/\"name\": \"headless-cms\"/\"name\": \"$project_name\"/" "$target_dir/package.json"
    
    # Create .env.example
    create_env_example "$target_dir" "$preset"
    
    # Create README
    create_readme "$target_dir" "$project_name" "$preset"
    
    print_success "Project created successfully!"
    echo ""
    echo "Next steps:"
    echo "  1. cd $project_name"
    echo "  2. cp .env.example .env"
    echo "  3. Edit .env with your configuration"
    echo "  4. pnpm install"
    echo "  5. make dev"
    echo ""
}

create_env_example() {
    local target_dir=$1
    local preset=$2
    
    cat > "$target_dir/.env.example" << 'EOF'
# ===========================================
# Database Configuration
# ===========================================
DATABASE_URL=postgres://postgres:postgres@localhost:5432/payload

# ===========================================
# Payload CMS Configuration
# ===========================================
PAYLOAD_SECRET=your-super-secret-key-change-in-production
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# ===========================================
# Frontend Configuration
# ===========================================
NEXT_PUBLIC_SITE_URL=http://localhost:3001
NEXT_PUBLIC_CMS_URL=http://localhost:3000

# ===========================================
# Revalidation
# ===========================================
REVALIDATION_SECRET=your-revalidation-secret

# ===========================================
# Optional: S3 Storage
# ===========================================
# S3_BUCKET=
# S3_REGION=
# S3_ACCESS_KEY_ID=
# S3_SECRET_ACCESS_KEY=
# S3_ENDPOINT=

# ===========================================
# Optional: Email (SMTP)
# ===========================================
# SMTP_HOST=
# SMTP_PORT=
# SMTP_USER=
# SMTP_PASS=
# SMTP_FROM=
EOF
}

create_readme() {
    local target_dir=$1
    local project_name=$2
    local preset=$3
    
    cat > "$target_dir/README.md" << EOF
# $project_name

This project was created from the **$preset** preset using the Payload CMS + Jamstack platform.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL 14+ (or use Docker)

### Installation

1. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

2. Copy environment file:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

3. Edit \`.env\` with your configuration

4. Start development:
   \`\`\`bash
   make dev
   \`\`\`

### Available Commands

| Command | Description |
|---------|-------------|
| \`make dev\` | Start development servers |
| \`make build\` | Build for production |
| \`make seed\` | Seed sample data |
| \`make reset\` | Reset database |
| \`make lint\` | Run linting |
| \`make test\` | Run tests |

## Project Structure

\`\`\`
$project_name/
├── cms/                 # Payload CMS application
│   ├── src/
│   │   ├── collections/ # Content collections
│   │   ├── globals/     # Global settings
│   │   ├── blocks/      # Content blocks
│   │   └── seed/        # Seed data
├── frontend/            # Frontend application
├── packages/
│   ├── shared/          # Shared types and utilities
│   └── templates/       # Rendering templates
└── docker/              # Docker configuration
\`\`\`

## Documentation

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Platform Documentation](./docs/)

## License

MIT
EOF
}

# ===========================================
# Main Script
# ===========================================

main() {
    print_header
    
    # Check for arguments
    if [[ $# -eq 0 ]]; then
        # Interactive mode
        select_preset
        get_project_name
        create_project "$SELECTED_PRESET" "$PROJECT_NAME"
    elif [[ $# -eq 1 ]]; then
        # Show usage if only one argument
        if [[ "$1" == "-h" || "$1" == "--help" ]]; then
            show_usage
            exit 0
        fi
        print_error "Missing project name"
        show_usage
        exit 1
    elif [[ $# -eq 2 ]]; then
        # Direct mode with arguments
        local preset=$1
        local project_name=$2
        
        if ! is_valid_preset "$preset"; then
            print_error "Invalid preset: $preset"
            show_usage
            exit 1
        fi
        
        create_project "$preset" "$project_name"
    else
        print_error "Too many arguments"
        show_usage
        exit 1
    fi
}

# Run main function
main "$@"
