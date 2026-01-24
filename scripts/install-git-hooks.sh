#!/bin/bash
# Install Git hooks for safe branch switching

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GIT_HOOKS_DIR="$(git rev-parse --git-dir)/hooks"

echo ""
echo -e "${GREEN}Installing Git hooks for safe branch switching...${NC}"
echo ""

# Install post-checkout hook
if [ -f "$SCRIPT_DIR/git-hooks/post-checkout" ]; then
    cp "$SCRIPT_DIR/git-hooks/post-checkout" "$GIT_HOOKS_DIR/post-checkout"
    chmod +x "$GIT_HOOKS_DIR/post-checkout"
    echo -e "${GREEN}✓ Installed post-checkout hook${NC}"
    echo "  This will warn you if you switch branches while dev server is running"
else
    echo -e "${YELLOW}⚠ Could not find post-checkout hook template${NC}"
fi

echo ""
echo -e "${GREEN}Git hooks installed successfully!${NC}"
echo ""
echo "The hooks will now:"
echo "  • Detect when you switch branches while dev server is running"
echo "  • Show a clear warning with instructions"
echo "  • Remind you to use 'make checkout BRANCH=<name>' instead"
echo ""

