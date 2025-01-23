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
    "mongodb": "^5.7.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vitest": "^0.34.0",
    "tailwindcss": "^3.0.0"
  }
}
```

## Phase 0: Architecture [Status: Not Started]
- [ ] Project Structure
  ```
  src/
    features/      # Feature modules
    shared/        # Common code
    lib/          # Core utilities
    app/          # Entry points
  ```
- [ ] File standards setup
  - Components: 100 lines
  - Services: 150 lines
  - Tests: 200 lines
  - Notes:

## Phase 1: Project Setup [Status: Not Started]
- [ ] Initialize project
  - Vite + React + TS
  - ESLint config
  - Prettier setup
  - Notes:

- [ ] Core configs
  - TypeScript strict mode
  - Path aliases
  - Build setup
  - Notes:

## Phase 2: Features [Status: Not Started]

### Map Module
Source: map-container.tsx
- [ ] Base components
  - MapView
  - Controls
  - Layer system
  - Notes:

- [ ] Route features
  - GPX upload
  - Drawing tools
  - Surface detection
  - Notes:

### Photo Module
Source: photo-modal.tsx
- [ ] Upload system
  - DO Spaces
  - Location tagging
  - Notes:

### Auth Module
Source: server.ts (auth config)
- [ ] Auth0 setup
  - Login flow
  - Profile management
  - Notes:

## Phase 3: Backend [Status: Not Started]
Source: server.ts

### API Routes
- [ ] Map endpoints
  - CRUD operations
  - Surface detection
  - Notes:

- [ ] Photo endpoints
  - Upload handling
  - Location queries
  - Notes:

### Database
- [ ] MongoDB setup
  - User collection
  - Routes collection
  - Photos collection
  - Notes:

## Phase 4: Testing [Status: Not Started]
- [ ] Test setup
  - Vitest config
  - MSW for mocking
  - Notes:

- [ ] Core tests
  - Components
  - Services
  - API endpoints
  - Notes:

## Feature Parity Checklist
From lutruwita2:
- [ ] Map display/controls
- [ ] Route creation
- [ ] GPX processing
- [ ] Surface detection
- [ ] Photo upload
- [ ] Location markers
- [ ] User profiles
- [ ] Saved routes
- Notes:

## Progress Updates
Add notes and completion dates here.

Last Updated: 2025-01-23
Current Phase: Planning