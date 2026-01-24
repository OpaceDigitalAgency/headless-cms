#!/bin/bash
# Safe Git Checkout Script
# Prevents branch switching when dev server is running

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Check if any dev processes are running
check_dev_processes() {
    local processes_found=0
    
    # Check for Next.js dev server (CMS) on port 3000
    if lsof -ti:3000 >/dev/null 2>&1; then
        echo -e "${YELLOW}  • Dev server running on port 3000${NC}"
        processes_found=1
    fi
    
    # Check for Astro dev server on port 4321
    if lsof -ti:4321 >/dev/null 2>&1; then
        echo -e "${YELLOW}  • Astro server running on port 4321${NC}"
        processes_found=1
    fi
    
    # Check for make dev process
    if pgrep -f "make dev" >/dev/null 2>&1; then
        echo -e "${YELLOW}  • 'make dev' process running${NC}"
        processes_found=1
    fi
    
    # Check for pnpm dev processes
    if pgrep -f "pnpm.*dev" >/dev/null 2>&1; then
        echo -e "${YELLOW}  • pnpm dev process running${NC}"
        processes_found=1
    fi
    
    return $processes_found
}

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
TARGET_BRANCH="$1"

# Check if target branch was provided
if [ -z "$TARGET_BRANCH" ]; then
    echo -e "${RED}Error: Please specify a branch name${NC}"
    echo "Usage: ./scripts/safe-checkout.sh <branch-name>"
    exit 1
fi

# Check if already on target branch
if [ "$TARGET_BRANCH" = "$CURRENT_BRANCH" ]; then
    echo -e "${GREEN}Already on branch '${TARGET_BRANCH}'${NC}"
    exit 0
fi

# Check for running dev processes
echo "Checking for running development servers..."
if check_dev_processes; then
    echo ""
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${RED}⚠️  BRANCH SWITCH BLOCKED${NC}"
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Cannot switch from '${CURRENT_BRANCH}' to '${TARGET_BRANCH}' while"
    echo "development servers are running."
    echo ""
    echo -e "${YELLOW}Why this matters:${NC}"
    echo "  Switching branches while the dev server is running causes it to"
    echo "  reload with different code, which can lead to:"
    echo "    • Runtime errors and crashes"
    echo "    • Database schema mismatches"
    echo "    • Confusing debugging sessions"
    echo ""
    echo -e "${YELLOW}To switch branches safely:${NC}"
    echo "  1. Stop the dev server (Ctrl+C in the terminal running 'make dev')"
    echo "  2. Run this script again: ./scripts/safe-checkout.sh ${TARGET_BRANCH}"
    echo "  3. Restart dev server: make dev"
    echo ""
    echo -e "${YELLOW}Or use the force flag (not recommended):${NC}"
    echo "  ./scripts/safe-checkout.sh ${TARGET_BRANCH} --force"
    echo ""
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    exit 1
fi

# Check for --force flag
if [ "$2" = "--force" ]; then
    echo -e "${YELLOW}⚠️  Force flag detected - switching anyway${NC}"
fi

# All clear - perform the checkout
echo -e "${GREEN}✓ No dev servers running${NC}"
echo "Switching from '${CURRENT_BRANCH}' to '${TARGET_BRANCH}'..."
git checkout "$TARGET_BRANCH"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Successfully switched to '${TARGET_BRANCH}'${NC}"
    echo ""
    echo "You can now start the dev server with: make dev"
else
    echo -e "${RED}✗ Failed to switch branches${NC}"
    exit 1
fi

