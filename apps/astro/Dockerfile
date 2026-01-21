# syntax = docker/dockerfile:1

# Base stage
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9.1.0 --activate

# Dependencies stage
FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY ./apps/astro/package.json ./apps/astro/
COPY ./packages/shared/package.json ./packages/shared/
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/astro/node_modules ./apps/astro/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY . .
RUN pnpm --filter @repo/astro build

# Production stage
FROM base AS runner
COPY --from=builder /app/apps/astro/dist ./apps/astro/dist
COPY --from=builder /app/apps/astro/package.json ./apps/astro/package.json
COPY --from=deps /app/node_modules ./node_modules
WORKDIR /app/apps/astro

# Install astro CLI for preview server
RUN pnpm add astro

EXPOSE 4321
ENV PORT=4321

CMD ["pnpm", "exec", "astro", "preview", "--host", "0.0.0.0", "--port", "4321"]
