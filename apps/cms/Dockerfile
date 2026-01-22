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
RUN pnpm build || true

# Build CMS only (filtered build)
WORKDIR /app
ARG DATABASE_URL=postgresql://payload:payload@localhost:5432/payload
ARG PAYLOAD_SECRET=build-placeholder-secret
ARG PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
ENV DATABASE_URL=$DATABASE_URL
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV PAYLOAD_PUBLIC_SERVER_URL=$PAYLOAD_PUBLIC_SERVER_URL
ENV SKIP_STATIC_GENERATION=1
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
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

# Create uploads directory
RUN mkdir -p /app/apps/cms/uploads && chown -R payloadcms:nodejs /app/apps/cms/uploads

USER payloadcms
WORKDIR /app/apps/cms
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
