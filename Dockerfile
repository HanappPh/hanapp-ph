# Multi-stage Dockerfile for Nx monorepo
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Install dependencies
RUN npm ci --only=production --legacy-peer-deps && npm cache clean --force

# Build stage
FROM base AS builder
WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the applications
RUN npx nx build api --prod
RUN npx nx build web --prod

# Production stage for API
FROM node:20-alpine AS api-runner
WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S hanapp -u 1001

# Copy built API and dependencies
COPY --from=deps --chown=hanapp:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=hanapp:nodejs /app/dist/apps/api ./dist/apps/api
COPY --from=builder --chown=hanapp:nodejs /app/package.json ./

USER hanapp

EXPOSE 3001

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/apps/api/main.js"]

# Production stage for Web (if you want to serve it with Node.js)
FROM node:20-alpine AS web-runner
WORKDIR /app

RUN apk add --no-cache dumb-init
RUN addgroup -g 1001 -S nodejs && \
    adduser -S hanapp -u 1001

# Copy built web app
COPY --from=builder --chown=hanapp:nodejs /app/dist/apps/web ./dist/apps/web
COPY --from=builder --chown=hanapp:nodejs /app/package.json ./

USER hanapp

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["npx", "serve", "-s", "dist/apps/web", "-l", "3000"]