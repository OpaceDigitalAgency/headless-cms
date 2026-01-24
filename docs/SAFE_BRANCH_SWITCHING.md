# Safe Branch Switching Guide

## The Problem

Switching Git branches while the development server is running causes the server to automatically reload with the new branch's code. This leads to:

- **Runtime errors** - Code from one branch trying to run with database schema from another
- **Collection mismatches** - Main branch doesn't have experimental collections that development has
- **Confusing debugging** - You think you're on one branch but the server is running different code
- **Time wasted** - Resolving errors that wouldn't exist if branches were switched safely

## The Solution

We've created a safe checkout script that prevents branch switching when dev servers are running.

### Method 1: Using Make (Recommended)

```bash
# Switch to main branch
make checkout BRANCH=main

# Switch to development branch
make checkout BRANCH=development

# Switch to any branch
make checkout BRANCH=feature/my-feature
```

### Method 2: Using the Script Directly

```bash
# Switch to main branch
./scripts/safe-checkout.sh main

# Switch to development branch
./scripts/safe-checkout.sh development

# Force switch (not recommended)
./scripts/safe-checkout.sh main --force
```

## How It Works

The script checks for running processes before switching:

1. **Port 3000** - Next.js/CMS dev server
2. **Port 4321** - Astro dev server  
3. **make dev** - Make process
4. **pnpm dev** - Package manager dev processes

If any are detected, it blocks the switch and shows you how to proceed safely.

## Safe Workflow

### Switching Branches

```bash
# 1. Stop the dev server
# Press Ctrl+C in the terminal running 'make dev'

# 2. Switch branches safely
make checkout BRANCH=main

# 3. Restart dev server
make dev
```

### For AI Agents

When an AI agent needs to examine code on a different branch:

**❌ DON'T:**
```bash
git checkout main  # Dangerous if dev server is running
```

**✅ DO:**
```bash
# Option 1: Use safe checkout
make checkout BRANCH=main

# Option 2: View files without switching
git show main:path/to/file.ts

# Option 3: Compare branches
git diff main development -- path/to/file.ts
```

## Branch Overview

### Main Branch
- **Purpose:** Production-ready, stable code
- **Collections:** Users, Media, Pages, Posts, Categories, Tags
- **Use for:** Client deployments, stable releases
- **Version:** Tagged with semantic versions (v1.0.x)

### Development Branch  
- **Purpose:** Experimental features, testing
- **Collections:** All main collections + experimental (ContentTypes, CustomItems, People, Places, Events, Products, etc.)
- **Use for:** Feature development, testing new ideas
- **Version:** Untagged, frequently updated

## Troubleshooting

### "Branch switch blocked" but no dev server visible

Check for orphaned processes:

```bash
# Check what's using port 3000
lsof -ti:3000

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Check what's using port 4321
lsof -ti:4321

# Kill process on port 4321
lsof -ti:4321 | xargs kill -9
```

### Need to force switch anyway

```bash
./scripts/safe-checkout.sh main --force
```

**Warning:** This can cause errors. Only use if you know what you're doing.

### Already switched by accident

If you've already switched branches while dev server was running:

```bash
# 1. Stop the dev server (Ctrl+C)

# 2. Switch back to the correct branch
git checkout development  # or main

# 3. Restart dev server
make dev
```

## For Repository Maintainers

### Adding to New Projects

The safe checkout script is automatically included when you:

1. Clone the repository
2. Run `make quickstart` or `./setup.sh`

### Updating the Script

The script is located at:
- `scripts/safe-checkout.sh` - Main script
- `Makefile` - Make command wrapper

To update, edit these files and commit to both main and development branches.

## Best Practices

1. **Always use `make checkout`** instead of `git checkout` when switching branches
2. **Stop dev server before switching** - It only takes a few seconds
3. **Check current branch** with `git branch` before starting work
4. **Use git show** to view files from other branches without switching
5. **Document branch purpose** in commit messages and PR descriptions

## Related Documentation

- [MASTER.md](../MASTER.md) - Complete developer guide
- [COMPLETE_WORKFLOW_AND_DEPLOYMENT_GUIDE.md](./COMPLETE_WORKFLOW_AND_DEPLOYMENT_GUIDE.md) - Deployment workflows
- [Makefile](../Makefile) - All available make commands

