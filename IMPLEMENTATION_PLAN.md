# Implementation Plan

## Source Reference
Migrating from lutruwita2 (github.com/vinmasci/lutruwita2):
- map-container.tsx → Map functionality
- server.ts → Backend services
- gpx-processor.ts → Route processing

## Dependencies
```json
{
  "dependencies": {
    "@mapbox/mapbox-gl-draw": "^1.4.3",
    "mapbox-gl": "^2.15.0",
    "react": "^18.2.0",
    "zustand": "^4.5.0",
    "@auth0/auth0-react": "^2.2.1",
    "express": "^4.18.2",
    "mongodb": "^5.7.0",
    "@mapbox/mapbox-matching": "^0.5.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vitest": "^0.34.0",
    "tailwindcss": "^3.0.0"
  }
}
```

## Phase 0: Architecture [Status: Complete]
- [x] Project Structure
  ```
  src/
    features/      # Feature modules
    shared/        # Common code
    lib/          # Core utilities
    app/          # Entry points
  ```
- [x] File standards setup
  - Components: 100 lines
  - Services: 150 lines
  - Tests: 200 lines

## Phase 1: Project Setup [Status: Complete]
- [x] Initialize project
  - Vite + React + TS
  - ESLint config
  - Prettier setup

- [x] Core configs
  - TypeScript strict mode
  - Path aliases
  - Build setup

## Phase 2: Features [Status: In Progress]

### Map Module [Status: In Progress]
Source: map-container.tsx
- [x] Base components
  - MapView: Basic map with terrain and roads
  - Controls: Upload and save buttons
  - Layer system: Toggle map features
- [ ] Additional features
  - GPX upload handler
  - Route display
  - Surface detection integration
  - Photo markers

### Surface Detection Module
Source: gpx-processor.ts
- [ ] Map Matching Integration
  - Mapbox Map Matching API setup
  - GPS drift handling
  - Confidence scoring

- [ ] Surface Cache System
  - Cache service implementation
  - TTL management
  - Invalidation strategy

- [ ] PostGIS Integration
  - Optimized queries
  - Batch processing
  - Error handling

- [ ] Monitoring
  - Processing times
  - Cache hit rates
  - Error tracking
  - Surface distribution

### Photo Module
Source: photo-modal.tsx
- [ ] Upload system
  - DO Spaces
  - Location tagging

### Auth Module
Source: server.ts (auth config)
- [ ] Auth0 setup
  - Login flow
  - Profile management

## Phase 3: Backend [Status: Not Started]
Source: server.ts

### API Routes
- [ ] Map endpoints
  - CRUD operations
  - Surface detection
  - Map matching

- [ ] Photo endpoints
  - Upload handling
  - Location queries

### Database
- [ ] MongoDB setup
  - User collection
  - Routes collection
  - Photos collection
  - Surface cache collection

## Phase 4: Testing [Status: Not Started]
- [ ] Test setup
  - Vitest config
  - MSW for mocking

- [ ] Core tests
  - Components
  - Services
  - API endpoints
  - Surface matching

## Feature Parity Checklist
From lutruwita2:
- [x] Map display/controls
- [ ] Route creation
- [ ] GPX processing
- [ ] Surface detection with Map Matching
- [ ] Surface caching system
- [ ] Photo upload
- [ ] Location markers
- [ ] User profiles
- [ ] Saved routes

## Progress Updates
2025-01-24: 
- Completed Phase 0 (Architecture) and Phase 1 (Project Setup)
- Created base map components (MapView, MapControls, LayerSystem)
Current Phase: Phase 2 (Features)