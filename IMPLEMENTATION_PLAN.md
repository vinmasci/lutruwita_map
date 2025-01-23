# Implementation Plan

This plan details the migration from lutruwita2 to lutruwita_map, with clear steps for feature transfer and implementation.

## Source Repository
- Original: github.com/vinmasci/lutruwita2
- Key files to reference:
  - src/components/map-container.tsx
  - server.ts
  - src/services/gpx-processor.ts

## Feature Migration Checklist

### 1. Project Setup [Status: Not Started]
- [ ] Initialize Vite + React + TypeScript
  - Command: `npm create vite@latest lutruwita_map`
  - Notes: 

- [ ] Core Dependencies
  ```json
  {
    "dependencies": {
      "@mapbox/mapbox-gl-draw": "^1.4.3",
      "mapbox-gl": "^2.15.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "@auth0/auth0-react": "^2.2.1",
      "express": "^4.18.2",
      "mongodb": "^5.7.0"
    }
  }
  ```
  - Notes:

### 2. Map Features [Status: Not Started]
From: src/components/map-container.tsx
- [ ] Basic Map Display
  - Mapbox setup
  - Custom styling
  - Controls implementation
  - Notes:

- [ ] Route Management
  - [ ] Route drawing tools
  - [ ] GPX file upload
  - [ ] Route saving/loading
  - Source files:
    - src/services/gpx-processor.ts
    - src/components/ui/gpx-uploader.tsx
  - Notes:

- [ ] Surface Detection
  - [ ] PostGIS integration
  - [ ] Surface visualization
  - Source: server.ts (detectSurface endpoint)
  - Notes:

### 3. Photo Features [Status: Not Started]
From: src/components/ui/photo-modal.tsx
- [ ] Upload System
  - [ ] DO Spaces integration
  - [ ] Location tagging
  - Source: server.ts (uploadPhoto endpoint)
  - Notes:

### 4. Authentication [Status: Not Started]
From: server.ts (Auth0 config)
- [ ] Auth0 Setup
  - [ ] Login/logout
  - [ ] Protected routes
  - [ ] Profile management
  - Notes:

### 5. Database [Status: Not Started]
From: server.ts
- [ ] MongoDB Setup
  - Collections needed:
    - users
    - routes
    - photos
    - maps
  - Notes:

### 6. Server Implementation [Status: Not Started]
From: server.ts
- [ ] Express Setup
  - [ ] Route handlers
  - [ ] Middleware
  - [ ] Error handling
  - Notes:

## Testing Requirements
- [ ] Unit Tests
  - Components
  - Services
  - Utils
- [ ] Integration Tests
  - API endpoints
  - Data flow
- [ ] E2E Tests
  - User flows
  - Map interactions

## Documentation Standards
- Every component needs:
  - TypeScript interfaces
  - Usage examples
  - Props documentation

## Progress Tracking
- Check off items as completed
- Add implementation notes under each section
- Document any deviations from plan
- Note technical debt items

## Completion Criteria
- All features from lutruwita2 implemented
- Tests passing
- Documentation complete
- Performance metrics met

Last Updated: 2025-01-23
Current Phase: Setup