# Lutruwita Map

Interactive mapping platform for Tasmania cyclists and hikers. Complete rebuild of lutruwita2 focusing on maintainability and performance.

## Documentation
1. [Project Context](PROJECT_CONTEXT.md) - Background and requirements
2. [Architecture Plan](ARCHITECTURE_PLAN.md) - Technical design
3. [Implementation Plan](IMPLEMENTATION_PLAN.md) - Step-by-step guide
4. [Migration Examples](MIGRATION_EXAMPLES.md) - Code comparisons
5. [API Documentation](API_DOCS.md) - API endpoints
6. [Database Schema](DATABASE_SCHEMA.md) - Data structure
7. [Dev Setup](DEV_SETUP.md) - Development environment

## Project Status
Migration from lutruwita2 (github.com/vinmasci/lutruwita2)
- [ ] Phase 0: Architecture Setup (1 week)
- [ ] Phase 1: Project Setup (1 week)
- [ ] Phase 2: Core Features (3 weeks)
- [ ] Phase 3: Backend Setup (2 weeks)
- [ ] Phase 4: Testing (1 week)

## Getting Started
See [DEV_SETUP.md](DEV_SETUP.md) for detailed setup instructions.

1. Prerequisites:
```bash
# Required
- Node.js 18+
- PostgreSQL 14+ with PostGIS
- MongoDB 6+
```

2. Installation:
```bash
git clone https://github.com/vinmasci/lutruwita_map.git
cd lutruwita_map
pnpm install
```

3. Development:
```bash
pnpm dev    # Frontend
pnpm server # Backend
```

## Key Features
- Interactive map
- Route creation/GPX import
- Surface detection
- Photo sharing
- User profiles

## Contributing
1. Review documentation
2. Follow coding guidelines
3. Write tests
4. Submit PRs