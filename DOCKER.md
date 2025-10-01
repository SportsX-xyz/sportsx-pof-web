# Docker Setup for SportsX Frontend

This document provides instructions for running the SportsX React frontend application using Docker in both development and production environments.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

## Quick Start

### Development Environment

```bash
# Build and run development container
docker-compose -f docker-compose.dev.yml up --build

# Or using the main docker-compose with dev profile
docker-compose --profile dev up --build
```

The development server will be available at `http://localhost:8080`

### Production Environment

```bash
# Build and run production container
docker-compose -f docker-compose.prod.yml up --build

# Or using the main docker-compose with prod profile
docker-compose --profile prod up --build
```

The production application will be available at `http://localhost:80`

## Individual Docker Commands

### Development

```bash
# Build development image
docker build -f Dockerfile.dev -t sportsx-dev .

# Run development container
docker run -p 8080:8080 -v $(pwd):/app -v /app/node_modules sportsx-dev
```

### Production

```bash
# Build production image
docker build -f Dockerfile -t sportsx-prod .

# Run production container
docker run -p 80:80 sportsx-prod
```

## Docker Files Overview

### `Dockerfile.dev`
- Uses Node.js 18 Alpine base image
- Uses `npm install` (works without package-lock.json)
- Installs all dependencies (including dev dependencies)
- Runs Vite development server with hot reload
- Exposes port 8080
- Optimized for development with volume mounting

### `Dockerfile` (Production)
- Multi-stage build for optimized production image
- Stage 1: Builds the React application using Node.js
- Stage 2: Serves the built application using Nginx
- Includes security headers and gzip compression
- Runs as non-root user for security
- Includes health check endpoint

### `nginx.conf`
- Custom Nginx configuration for serving React SPA
- Handles client-side routing with fallback to index.html
- Implements caching strategies for static assets
- Includes security headers
- Gzip compression enabled

## Environment Variables

### Development
- `NODE_ENV=development`
- `VITE_HOST=0.0.0.0`
- `VITE_PORT=8080`

### Production
- `NODE_ENV=production`

## Volume Mounting (Development)

The development setup uses volume mounting to enable hot reload:
- Source code is mounted to `/app`
- `node_modules` is excluded to prevent conflicts

## Security Features

### Production Container
- Runs as non-root user (`nextjs:nodejs`)
- Security headers included in Nginx configuration
- Health check endpoint for monitoring
- Minimal attack surface with Alpine Linux

## Health Checks

The production container includes a health check endpoint at `/health` that returns a simple "healthy" response.

## Troubleshooting

### Development Issues

#### npm install Issues
If you encounter dependency installation errors:

```bash
# Build with verbose output to see detailed logs
docker build -f Dockerfile.dev -t sportsx-dev . --no-cache --progress=plain

# Or try the alternative Dockerfile
docker-compose -f docker-compose.dev.alt.yml up --build
```

#### Common Solutions:
- Ensure Docker has enough memory allocated (recommended: 4GB+)
- Check that port 8080 is not in use by other services
- Verify volume mounting permissions on Linux/macOS
- Clear Docker cache: `docker system prune -a`
- The Dockerfile now uses `npm install` which works without package-lock.json

### Production Issues
- Check Nginx logs: `docker logs <container_id>`
- Verify port 80 is not in use
- Ensure the build completed successfully in the builder stage

### Common Commands

```bash
# View container logs
docker logs <container_id>

# Execute commands in running container
docker exec -it <container_id> sh

# Remove all containers and images
docker system prune -a

# View running containers
docker ps

# View all containers (including stopped)
docker ps -a
```

## Performance Optimization

### Development
- Uses `npm ci` for faster, reliable installs
- Volume mounting for instant code changes
- Polling enabled for file watching in containers

### Production
- Multi-stage build reduces final image size
- Nginx serves static files efficiently
- Gzip compression reduces bandwidth usage
- Proper caching headers for better performance

## Monitoring

The production container includes:
- Health check endpoint at `/health`
- Access and error logging
- Built-in Nginx metrics (if enabled)

## Scaling

For production scaling, consider:
- Using a reverse proxy (Traefik, Nginx Proxy Manager)
- Load balancing multiple container instances
- Using Docker Swarm or Kubernetes for orchestration
- Implementing proper logging aggregation (ELK stack, etc.)