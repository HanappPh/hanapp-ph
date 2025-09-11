# 🐳 Docker Setup Guide for HanApp-PH

## Prerequisites

1. Install Docker Desktop: https://www.docker.com/products/docker-desktop/
2. Ensure Docker is running (you'll see the whale icon in your system tray)

## Quick Start Guide

### For Development (Recommended for beginners)

#### 1. Start Development Database

```bash
# Copy environment file
cp .env.example .env

# Start PostgreSQL database in Docker
npm run docker:dev

# Your database is now running on:
# - PostgreSQL: localhost:5432
# - Database Admin Panel: http://localhost:8080
```

#### 2. Run Your Apps Normally

```bash
# Terminal 1: Start API
npx nx serve api

# Terminal 2: Start Web
npx nx serve web
```

#### 3. Stop Development Services

```bash
npm run docker:dev:down
```

### For Production-like Testing

#### 1. Build and Run Everything in Docker

```bash
# Build Docker images
npm run docker:build:api
npm run docker:build:web

# Start production environment
npm run docker:prod

# Your apps are now running in Docker:
# - API: http://localhost:3001
# - Web: http://localhost:3000
```

#### 2. View Logs

```bash
npm run docker:logs
```

#### 3. Stop Everything

```bash
npm run docker:prod:down
```

## When to Use Docker?

### Use Docker When:

- **Joining team members** - Ensure everyone has the same environment
- **Deploying to production** - Consistent deployment across cloud providers
- **CI/CD setup** - Automated testing and deployment
- **Database needed** - Easy PostgreSQL setup for development
- **Microservices** - Running API and Web separately

### Don't Use Docker When:

- **Just starting development** - npm run serve is simpler for learning
- **Only front-end changes** - Next.js hot reload is faster without Docker
- **Learning the codebase** - Direct debugging is easier

## Useful Commands

```bash
# Development
npm run docker:dev              # Start dev services (DB, Redis, etc.)
npm run docker:dev:down         # Stop dev services

# Production testing
npm run docker:prod             # Start production containers
npm run docker:prod:down        # Stop production containers

# Building
npm run docker:build:api        # Build API container
npm run docker:build:web        # Build Web container

# Running individual containers
npm run docker:run:api          # Run API container only
npm run docker:run:web          # Run Web container only

# Maintenance
npm run docker:logs             # View all container logs
npm run docker:clean            # Clean up unused Docker resources
```

## Environment Variables

Copy `.env.example` to `.env` and update:

```bash
# Required for Docker
DATABASE_URL=postgresql://postgres:password@postgres:5432/hanapp_dev
NEXT_PUBLIC_API_URL=http://localhost:3001

# Add your actual values
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
JWT_SECRET=change-this-in-production
```

## Troubleshooting

### Port Already in Use

```bash
# Find what's using the port
netstat -ano | findstr :3001

# Kill the process (Windows)
taskkill /F /PID <process-id>
```

### Docker Desktop Not Running

- Check if Docker Desktop is installed and running
- You should see a whale icon in your system tray

### Build Errors

```bash
# Clean Docker cache
npm run docker:clean

# Rebuild from scratch
docker build --no-cache -t hanapp-ph-api --target api-runner .
```

## Next Steps

1. **Start with development setup**: Use `npm run docker:dev` for database
2. **Run your apps normally**: Use `npx nx serve` commands
3. **When ready for production**: Use full Docker setup
4. **For deployment**: Use Docker images with cloud providers (AWS, DigitalOcean, etc.)
