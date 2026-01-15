# Versioning & Maintenance Policy

> **Version:** 1.0.0  
> **Last Updated:** January 2025

This document defines the versioning strategy, dependency management, and maintenance policy for the Payload CMS + Jamstack platform.

---

## Table of Contents

1. [Semantic Versioning](#semantic-versioning)
2. [Dependency Management](#dependency-management)
3. [Version Pinning Strategy](#version-pinning-strategy)
4. [Upgrade Path](#upgrade-path)
5. [Compatibility Matrix](#compatibility-matrix)
6. [Release Process](#release-process)
7. [Long-Term Support](#long-term-support)

---

## Semantic Versioning

This project follows [Semantic Versioning 2.0.0](https://semver.org/):

```
MAJOR.MINOR.PATCH
```

### Version Increments

| Type | When to Increment | Example |
|------|-------------------|---------|
| **MAJOR** | Breaking changes to API, schema, or contracts | 1.0.0 → 2.0.0 |
| **MINOR** | New features, backward-compatible | 1.0.0 → 1.1.0 |
| **PATCH** | Bug fixes, backward-compatible | 1.0.0 → 1.0.1 |

### Breaking Changes Include

- Removing or renaming collections
- Changing field types in existing collections
- Modifying access control in ways that restrict access
- Changing API endpoint signatures
- Removing environment variables
- Database schema changes requiring migration

### Non-Breaking Changes Include

- Adding new collections
- Adding optional fields to existing collections
- Adding new blocks
- Adding new templates
- Adding new API endpoints
- Performance improvements
- Bug fixes

---

## Dependency Management

### Core Dependencies

| Package | Pinned Version | Update Frequency |
|---------|---------------|------------------|
| `payload` | `^3.x` | Monthly review |
| `next` | `^15.x` | Quarterly review |
| `astro` | `^4.x` | Quarterly review |
| `react` | `^19.x` | Major releases only |
| `typescript` | `^5.x` | Bi-annual review |
| `@payloadcms/*` | Match `payload` | With payload updates |

### Database Dependencies

| Package | Pinned Version | Notes |
|---------|---------------|-------|
| `@payloadcms/db-postgres` | Match `payload` | Required |
| `pg` | `^8.x` | PostgreSQL driver |

### Development Dependencies

| Package | Pinned Version | Notes |
|---------|---------------|-------|
| `eslint` | `^8.x` | Code quality |
| `prettier` | `^3.x` | Code formatting |
| `vitest` | `^1.x` | Testing |

### Version Pinning in package.json

```json
{
  "dependencies": {
    "payload": "^3.0.0",
    "next": "^15.0.0",
    "@payloadcms/db-postgres": "^3.0.0",
    "@payloadcms/richtext-lexical": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "eslint": "^8.0.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

---

## Version Pinning Strategy

### Why Pin Versions?

1. **Reproducible builds** - Same code produces same result
2. **Stability** - Avoid unexpected breaking changes
3. **Security** - Control when updates are applied
4. **Testing** - Validate updates before deployment

### Pinning Levels

| Symbol | Meaning | Example | Updates Allowed |
|--------|---------|---------|-----------------|
| None | Exact version | `3.0.0` | None |
| `~` | Patch updates | `~3.0.0` | 3.0.x |
| `^` | Minor updates | `^3.0.0` | 3.x.x |
| `*` | Any version | `*` | All (not recommended) |

### Recommended Strategy

```json
{
  "dependencies": {
    // Core framework - allow minor updates
    "payload": "^3.0.0",
    
    // Payload plugins - match core version
    "@payloadcms/db-postgres": "^3.0.0",
    "@payloadcms/richtext-lexical": "^3.0.0",
    
    // Frontend framework - allow minor updates
    "next": "^15.0.0",
    
    // React - allow patch updates only
    "react": "~19.0.0",
    "react-dom": "~19.0.0",
    
    // Utilities - allow minor updates
    "lodash": "^4.17.0"
  }
}
```

### Lock File Management

- **Always commit** `pnpm-lock.yaml`
- **Never manually edit** lock files
- **Regenerate** after dependency changes: `pnpm install`

---

## Upgrade Path

### Before Upgrading

1. **Read changelogs** for all packages being updated
2. **Check compatibility** with other dependencies
3. **Review breaking changes** and migration guides
4. **Backup database** before major upgrades
5. **Test in staging** environment first

### Upgrade Process

```bash
# 1. Create upgrade branch
git checkout -b upgrade/payload-3.1

# 2. Check for outdated packages
pnpm outdated

# 3. Update specific package
pnpm update payload@^3.1.0

# 4. Update related packages
pnpm update @payloadcms/db-postgres@^3.1.0

# 5. Run type check
pnpm typecheck

# 6. Run tests
pnpm test

# 7. Test locally
pnpm dev

# 8. Commit changes
git add .
git commit -m "chore: upgrade payload to 3.1.0"
```

### Major Version Upgrades

For major version upgrades (e.g., Payload 3.x → 4.x):

1. **Create migration branch**
2. **Follow official migration guide**
3. **Update all related packages**
4. **Run database migrations**
5. **Update type definitions**
6. **Update API calls**
7. **Full regression testing**
8. **Staged rollout**

### Rollback Procedure

```bash
# Revert to previous lock file
git checkout HEAD~1 -- pnpm-lock.yaml

# Reinstall dependencies
pnpm install

# If database was migrated, restore backup
pg_restore -d payload backup.sql
```

---

## Compatibility Matrix

### Payload CMS Versions

| Platform Version | Payload | Next.js | Astro | Node.js | PostgreSQL |
|-----------------|---------|---------|-------|---------|------------|
| 1.0.x | 3.0.x | 15.x | 4.x | 18+ | 14+ |
| 1.1.x | 3.1.x | 15.x | 4.x | 18+ | 14+ |
| 2.0.x | 3.x | 15.x | 5.x | 20+ | 15+ |

### Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 14+ |
| Edge | 90+ |

### Node.js Support

| Node.js Version | Support Status |
|-----------------|----------------|
| 18.x LTS | ✅ Supported |
| 20.x LTS | ✅ Supported |
| 22.x | ✅ Supported |
| < 18 | ❌ Not supported |

---

## Release Process

### Release Types

| Type | Branch | Frequency | Notes |
|------|--------|-----------|-------|
| Major | `release/vX.0.0` | As needed | Breaking changes |
| Minor | `release/vX.Y.0` | Monthly | New features |
| Patch | `main` | As needed | Bug fixes |

### Release Checklist

- [ ] All tests passing
- [ ] Changelog updated
- [ ] Documentation updated
- [ ] Version bumped in package.json
- [ ] Migration guide (if breaking changes)
- [ ] Security audit passed
- [ ] Performance benchmarks acceptable
- [ ] Staging deployment verified

### Changelog Format

```markdown
## [1.1.0] - 2025-01-15

### Added
- New Gallery block for image collections
- Ecommerce preset with product collections
- Template-specific seed data

### Changed
- Improved admin dashboard UI
- Enhanced revalidation performance

### Fixed
- Fixed version history not showing for Places
- Fixed seed data not respecting preset selection

### Security
- Updated dependencies to patch CVE-XXXX-XXXX
```

---

## Long-Term Support

### LTS Policy

| Version | Release Date | Active Support | Security Support |
|---------|--------------|----------------|------------------|
| 1.0.x | Jan 2025 | 12 months | 24 months |
| 2.0.x | TBD | 12 months | 24 months |

### Support Levels

| Level | Description | Duration |
|-------|-------------|----------|
| **Active** | Bug fixes, security patches, minor features | 12 months |
| **Security** | Critical security patches only | 12 months after active |
| **End of Life** | No support | After security period |

### Deprecation Policy

1. **Announce deprecation** in changelog and documentation
2. **Provide migration path** with examples
3. **Maintain deprecated features** for at least one minor version
4. **Remove in next major version**

---

## CI/CD Integration

### Version Matrix Testing

```yaml
# .github/workflows/test.yml
jobs:
  test:
    strategy:
      matrix:
        node: [18, 20, 22]
        payload: [3.0, 3.1]
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
      - run: pnpm install
      - run: pnpm test
```

### Dependency Updates

```yaml
# .github/workflows/dependencies.yml
name: Update Dependencies

on:
  schedule:
    - cron: '0 0 * * 1' # Weekly on Monday

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm update
      - run: pnpm test
      - uses: peter-evans/create-pull-request@v5
        with:
          title: 'chore: update dependencies'
          branch: 'deps/weekly-update'
```

### Security Scanning

```yaml
# .github/workflows/security.yml
name: Security Audit

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 0 * * *' # Daily

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm audit
```

---

## Best Practices

### Do

- ✅ Pin major versions of core dependencies
- ✅ Allow patch updates for utilities
- ✅ Test upgrades in staging first
- ✅ Read changelogs before upgrading
- ✅ Keep lock files in version control
- ✅ Run security audits regularly

### Don't

- ❌ Use `*` or `latest` in production
- ❌ Upgrade multiple major versions at once
- ❌ Skip testing after upgrades
- ❌ Ignore deprecation warnings
- ❌ Delete lock files to "fix" issues
- ❌ Mix package managers (npm/yarn/pnpm)

---

## Resources

- [Payload CMS Changelog](https://github.com/payloadcms/payload/releases)
- [Next.js Upgrade Guide](https://nextjs.org/docs/upgrading)
- [Astro Upgrade Guide](https://docs.astro.build/en/guides/upgrade-to/)
- [Node.js Release Schedule](https://nodejs.org/en/about/releases/)
- [Semantic Versioning Spec](https://semver.org/)
