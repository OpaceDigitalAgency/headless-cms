#!/bin/bash
# Railway Provisioning Script
# Creates all required services on Railway

set -e

echo "=========================================="
echo "Railway Provisioning Script"
echo "=========================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "Error: Railway CLI is not installed"
    echo "Install it with: npm install -g @railway/cli"
    exit 1
fi

# Check if logged in
if ! railway whoami &> /dev/null; then
    echo "Error: Not logged in to Railway"
    echo "Run: railway login"
    exit 1
fi

PROJECT_NAME="${1:-headless-cms}"
echo "Project Name: $PROJECT_NAME"

# Create project if it doesn't exist
echo ""
echo "Creating Railway project..."
railway init --name "$PROJECT_NAME" 2>/dev/null || echo "Project may already exist"

# Link to project
railway link

# Create PostgreSQL service
echo ""
echo "Creating PostgreSQL database..."
railway add --database postgres

# Get database URL
echo ""
echo "Fetching database connection string..."
DATABASE_URL=$(railway variables get DATABASE_URL 2>/dev/null || echo "")

if [ -z "$DATABASE_URL" ]; then
    echo "Warning: Could not fetch DATABASE_URL automatically"
    echo "Please set it manually in Railway dashboard"
fi

# Set environment variables
echo ""
echo "Setting environment variables..."

# Generate secrets
PAYLOAD_SECRET=$(openssl rand -hex 32)
REVALIDATION_SECRET=$(openssl rand -hex 16)

railway variables set \
    NODE_ENV=production \
    PAYLOAD_SECRET="$PAYLOAD_SECRET" \
    REVALIDATION_SECRET="$REVALIDATION_SECRET" \
    NEXT_TELEMETRY_DISABLED=1

echo ""
echo "=========================================="
echo "Provisioning Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Set PAYLOAD_PUBLIC_SERVER_URL to your CMS domain"
echo "2. Set NEXT_PUBLIC_SITE_URL to your frontend domain"
echo "3. Set NEXT_PUBLIC_CMS_URL to your CMS domain"
echo "4. Configure S3 for media storage (optional)"
echo "5. Deploy with: railway up"
echo ""
echo "Generated secrets (save these):"
echo "PAYLOAD_SECRET: $PAYLOAD_SECRET"
echo "REVALIDATION_SECRET: $REVALIDATION_SECRET"
