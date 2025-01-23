# Architecture Plan

## Current Issues (from lutruwita2)
1. Monolithic components (map-container.tsx)
2. Mixed concerns in server.ts
3. Scattered state management
4. Deep component nesting in POI system
5. Duplicated logic across services

## Architecture Decisions

### 1. File Size Rules
- Components: max 100 lines
- Services: max 150 lines
- Test files: max 200 lines
- TypeScript files: strict mode required

### 2. Feature Module Structure
```
src/features/map/
  components/
    MapView/
      index.tsx           # Container (50 lines)
      Controls.tsx        # UI controls (50 lines)
      types.ts           # Types only
      styles.module.css   # Scoped styles
    RouteLayer/
    SurfaceLayer/
  hooks/
    useMapControls.ts     # Single responsibility
    useMapState.ts
  services/
    mapService.ts        # API calls only
    routeService.ts 
  context/
    MapContext.tsx       # Global map state
```

### 3. State Management
- Zustand for complex state (maps, routes)
- React Context for UI state
- No prop drilling
- Computed values in hooks

### 4. Breaking Down Monoliths

#### Map Container Split:
```typescript
// Before: map-container.tsx (1000+ lines)
// After:
features/map/
  MapView/               # Basic map setup
  RouteLayer/           # Route handling
  SurfaceLayer/         # Surface types
  PhotoLayer/           # Photo markers
  ControlsLayer/        # UI controls
```

#### Server Split:
```typescript
server/
  routes/
    map.routes.ts      # Map endpoints
    photo.routes.ts    # Photo handling
    auth.routes.ts     # Auth routes
  services/           # Business logic
  middleware/         # Auth, validation
```

### 5. Testing Architecture
```
features/map/
  __tests__/
    unit/             # Component tests
    integration/      # Feature tests
  components/
    __tests__/       # Component-specific tests
```

### 6. Documentation Requirements
- README.md per feature module
- Props documentation
- Example usage
- Test coverage report

## Migration Path
1. Setup core architecture
2. Create feature modules
3. Migrate components
4. Add tests
5. Document

Progress tracked in IMPLEMENTATION_PLAN.md