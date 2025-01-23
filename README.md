# Lutruwita Map

Interactive mapping application for Tasmania cyclists and hikers. This is a restructured version of lutruwita2, focusing on maintainability and performance through improved architecture.

## Project Goals
- Migrate functionality from lutruwita2 into a cleaner component structure
- Improve performance of map rendering and surface detection
- Enhance maintainability through modular design
- Reduce file sizes and component complexity

## Documentation
1. [Project Context](PROJECT_CONTEXT.md) - Background and requirements
2. [Architecture Plan](ARCHITECTURE_PLAN.md) - Technical design
3. [Implementation Plan](IMPLEMENTATION_PLAN.md) - Step-by-step guide
4. [Migration Examples](MIGRATION_EXAMPLES.md) - Code comparisons
5. [API Documentation](API_DOCS.md) - API endpoints
6. [Database Schema](DATABASE_SCHEMA.md) - Data structure
7. [Dev Setup](DEV_SETUP.md) - Development environment
8. [Bootstrap Guide](BOOTSTRAP.md) - Initial project setup
9. [GPX Surface Matching](GPX_SURFACE_MATCHING.md) - Enhanced surface detection system

## Project Status
Migration from lutruwita2 (github.com/vinmasci/lutruwita2)
- [ ] Phase 0: Architecture Setup (1 week)
- [ ] Phase 1: Project Setup (1 week)
- [ ] Phase 2: Core Features (3 weeks)
  - Enhanced surface detection with Mapbox Map Matching
  - Surface caching system
  - Improved GPS drift handling
- [ ] Phase 3: Backend Setup (2 weeks)
- [ ] Phase 4: Testing (1 week)

## Getting Started
1. Review [Bootstrap Guide](BOOTSTRAP.md)
2. Follow [Dev Setup](DEV_SETUP.md)
3. Check [Implementation Plan](IMPLEMENTATION_PLAN.md)

## Prerequisites
```bash
- Node.js 18+
- PostgreSQL 14+ with PostGIS
- MongoDB 6+
- pnpm
- Mapbox API key
```

## Development
- Each component is built by referencing the original lutruwita2 code
- Components are split into smaller, focused modules
- File size limits enforced per [Implementation Plan](IMPLEMENTATION_PLAN.md)

## Quick Start
```bash
git clone https://github.com/vinmasci/lutruwita_map.git
cd lutruwita_map
pnpm install
pnpm dev
```