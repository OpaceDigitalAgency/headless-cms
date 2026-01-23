# Base image
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9.1.0 --activate
WORKDIR /app

# Dependencies stage - Install all workspace package dependencies
FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY ./apps/cms/package.json ./apps/cms/
COPY ./packages/shared/package.json ./packages/shared/
COPY ./packages/templates/package.json ./packages/templates/
COPY ./packages/ui/package.json ./packages/ui/
RUN pnpm install --frozen-lockfile

# Development stage
FROM base AS development
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/cms/node_modules ./apps/cms/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=deps /app/packages/templates/node_modules ./packages/templates/node_modules
COPY --from=deps /app/packages/ui/node_modules ./packages/ui/node_modules
COPY . .
WORKDIR /app/apps/cms
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["pnpm", "dev"]

# Builder stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/cms/node_modules ./apps/cms/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=deps /app/packages/templates/node_modules ./packages/templates/node_modules
COPY --from=deps /app/packages/ui/node_modules ./packages/ui/node_modules
COPY . .

# Build shared packages first
WORKDIR /app/packages/shared
RUN pnpm --filter @repo/shared build --if-present

# Build CMS only (filtered build)
WORKDIR /app
ARG DATABASE_URL=postgresql://payload:payload@localhost:5432/payload
ARG PAYLOAD_SECRET=build-placeholder-secret
ARG PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
ENV DATABASE_URL=$DATABASE_URL
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV PAYLOAD_PUBLIC_SERVER_URL=$PAYLOAD_PUBLIC_SERVER_URL
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_STATIC_GENERATION=1
RUN pnpm --filter @repo/cms build

# Production stage
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 payloadcms

# Copy built application
COPY --from=builder /app/apps/cms/public ./apps/cms/public
COPY --from=builder --chown=payloadcms:nodejs /app/apps/cms/.next/standalone ./
COPY --from=builder --chown=payloadcms:nodejs /app/apps/cms/.next/static ./apps/cms/.next/static

# Include config + migrations so we can run `payload migrate` at runtime.
COPY --from=builder --chown=payloadcms:nodejs /app/apps/cms/src ./apps/cms/src
COPY --from=builder --chown=payloadcms:nodejs /app/apps/db/migrations ./apps/db/migrations

# Copy startup script
COPY --from=builder /app/apps/cms/start.sh ./apps/cms/start.sh
RUN chmod +x ./apps/cms/start.sh

# Install TS loader for runtime migrations (the migration files are TypeScript).
# Install into a dedicated folder to avoid mutating Next's standalone node_modules.
RUN mkdir -p /opt/tsx && cd /opt/tsx && npm install --omit=dev tsx@4.19.2

# Install migration dependencies that aren't included in Next.js standalone build.
# These are required by the migration files but not traced by Next.js.
RUN cd /app && npm install --omit=dev --no-save \
  @payloadcms/db-postgres@3.71.1 \
  payload@3.71.1 \
  drizzle-orm@0.44.7 \
  pg@8.16.3

# Create uploads directory
RUN mkdir -p /app/apps/cms/uploads && chown -R payloadcms:nodejs /app/apps/cms/uploads

USER payloadcms
WORKDIR /app/apps/cms
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["sh", "start.sh"]
