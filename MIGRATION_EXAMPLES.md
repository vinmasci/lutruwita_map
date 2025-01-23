# Migration Examples

## Component Migration Examples

### Map Container
Old (1200+ lines):
```tsx
// lutruwita2/src/components/map-container.tsx
export const MapContainer = () => {
  const [routes, setRoutes] = useState<Route[]>([])
  const [photos, setPhotos] = useState<Photo[]>([])
  const [surfaces, setSurfaces] = useState<Surface[]>([])
  // 100+ lines of state/effects

  const handleRouteUpload = async (file: File) => {
    // 50+ lines of upload logic
  }

  const detectSurfaces = async (route: Route) => {
    // 80+ lines of surface detection
  }

  return (
    <div>
      {/* 300+ lines of JSX */}
    </div>
  )
}
```

New (split components):
```tsx
// features/maps/components/MapView/index.tsx
export const MapView = () => {
  const { center, zoom } = useMapStore()
  return (
    <div>
      <Map center={center} zoom={zoom}>
        <RouteLayer />
        <SurfaceLayer />
        <PhotoLayer />
      </Map>
    </div>
  )
}

// features/maps/components/RouteLayer/index.tsx
export const RouteLayer = () => {
  const routes = useRoutes()
  return routes.map(route => (
    <Route key={route.id} {...route} />
  ))
}
```

## State Management
Old (scattered state):
```tsx
// Global state
const MapContext = createContext<MapState>(null)

// Component state
const [routes, setRoutes] = useState<Route[]>([])

// Service state
let cachedRoutes: Route[] = []
```

New (Zustand):
```tsx
// features/maps/store/mapStore.ts
interface MapStore {
  center: [number, number]
  zoom: number
  routes: Route[]
  addRoute: (route: Route) => void
}

export const useMapStore = create<MapStore>((set) => ({
  center: [146.8087, -41.4419],
  zoom: 12,
  routes: [],
  addRoute: (route) => set((state) => ({
    routes: [...state.routes, route]
  }))
}))
```

## Surface Detection
Old:
```typescript
// server.ts
app.post('/api/surface-detection', async (req, res) => {
  try {
    // 80+ lines of inline logic
    const route = req.body
    const surfaces = await detectSurfaces(route)
    // More inline processing
    res.json(surfaces)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})
```

New:
```typescript
// server/routes/surface.routes.ts
router.post('/detection', 
  validateRoute,
  async (req: Request<DetectionBody>, res: Response) => {
    const result = await surfaceService.detect(req.body)
    res.json(result)
  }
)

// server/services/surface.service.ts
export class SurfaceService {
  async detect(route: Route): Promise<Surface[]> {
    const segments = await this.splitRoute(route)
    return await this.processBatch(segments)
  }
}
```

## Photo Upload
Old:
```typescript
// server.ts
app.post('/photos/upload', upload.single('photo'), async (req, res) => {
  // 50+ lines of inline upload logic
})
```

New:
```typescript
// server/routes/photo.routes.ts
router.post('/upload',
  photoUpload.single('photo'),
  validatePhoto,
  async (req, res) => {
    const result = await photoService.upload(req.file)
    res.json(result)
  }
)

// server/services/photo.service.ts
export class PhotoService {
  async upload(file: File): Promise<Photo> {
    const metadata = await this.extractMetadata(file)
    const location = await this.uploadToSpaces(file)
    return this.saveToDb({ ...metadata, location })
  }
}
```

## Migration Benefits
- File size: 1200+ → ~100 lines
- Clear separation of concerns
- TypeScript improvements
- Testable units
- Better error handling

See IMPLEMENTATION_PLAN.md for complete migration steps.