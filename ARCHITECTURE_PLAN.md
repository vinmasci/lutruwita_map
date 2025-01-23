# Architecture Plan

## Previous Issues (lutruwita2)
- Monolithic components (1000+ lines)
- Mixed concerns in server
- Scattered state management
- Deep nesting in UI components
- Duplicate business logic

## Core Architecture

### Component Structure
```tsx
// Example feature module
features/map/
  components/
    MapView/
      index.tsx           # Container
      MapControls.tsx     # UI controls
      types.ts           # Type definitions
      styles.module.css   # Scoped styles
```

### State Management
```tsx
// Zustand store example
interface MapStore {
  center: [number, number]
  zoom: number
  routes: Route[]
  setCenter: (center: [number, number]) => void
}

const useMapStore = create<MapStore>((set) => ({
  center: [146.8087, -41.4419],
  zoom: 12,
  routes: [],
  setCenter: (center) => set({ center })
}))
```

### Database Schema
```typescript
interface Route {
  _id: ObjectId
  name: string
  description?: string
  gpxData: string
  surfaces: Surface[]
  createdBy: string
  createdAt: Date
}

interface Photo {
  _id: ObjectId
  filename: string
  location: [number, number]
  takenBy: string
  uploadedAt: Date
}
```

### API Endpoints
```typescript
// Maps
POST   /api/maps      // Create map
GET    /api/maps      // List maps
PUT    /api/maps/:id  // Update map
DELETE /api/maps/:id  // Delete map

// Photos
POST   /api/photos/upload  // Upload photo
GET    /api/photos/near    // Get nearby photos

// Auth
GET    /api/profile       // Get profile
PUT    /api/profile      // Update profile
```

## File Size Rules
- Components: max 100 lines
- Services: max 150 lines
- Tests: max 200 lines
- TypeScript: strict mode

## Testing Strategy
```typescript
// Component test example
describe('MapView', () => {
  it('renders map with correct center', () => {
    render(<MapView center={[146.8087, -41.4419]} />)
    expect(screen.getByTestId('map')).toBeInTheDocument()
  })
})
```

## Migration Mapping
Old → New Location:
- map-container.tsx → features/maps/components/MapView/
- server.ts → server/routes/ (split by feature)
- photo-modal.tsx → features/photos/components/PhotoUpload/

## Documentation
Each feature module requires:
- README.md with usage examples
- TypeScript interfaces
- Component props documentation
- Test coverage report

## Error Handling
```typescript
// Global error boundary
export const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState<Error | null>(null)
  
  if (error) {
    return <ErrorDisplay error={error} />
  }
  
  return children
}
```