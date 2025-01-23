# Lutruwita Map

Interactive mapping platform for Tasmania cyclists and hikers. Complete rebuild of lutruwita2 focusing on maintainability and performance.

## Project Documentation
1. [Project Context](PROJECT_CONTEXT.md) - Background and requirements
2. [Architecture Plan](ARCHITECTURE_PLAN.md) - Technical design
3. [Implementation Plan](IMPLEMENTATION_PLAN.md) - Step-by-step guide
4. [Migration Examples](MIGRATION_EXAMPLES.md) - Code comparisons

## Project Status
Migration from lutruwita2 (github.com/vinmasci/lutruwita2)
- [ ] Phase 0: Architecture Setup (1 week)
- [ ] Phase 1: Project Setup (1 week)
- [ ] Phase 2: Core Features (3 weeks)
- [ ] Phase 3: Backend Setup (2 weeks)
- [ ] Phase 4: Testing (1 week)

## Key Features
- Interactive map with custom styling
- Route creation and GPX import
- Surface type detection (paved/unpaved)
- Location-based photo sharing
- Custom points of interest
- User profiles and saved maps

## Development Setup

1. Clone and install:
```bash
git clone https://github.com/vinmasci/lutruwita_map.git
cd lutruwita_map
npm install
```

2. Environment (.env.local):
```
VITE_MAPBOX_TOKEN=
AUTH0_SECRET=
AUTH0_CLIENT_SECRET=
VITE_MONGODB_URI=
```

3. Development server:
```bash
npm run dev
```

## Contributing
1. Review all documentation files for context
2. Follow architecture guidelines
3. Check migration examples for patterns
4. Use implementation plan for tasks