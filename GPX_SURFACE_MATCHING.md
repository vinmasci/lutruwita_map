# GPX Surface Matching System

## Current Issues
- Inaccurate surface detection on gravel/unsealed roads
- Processing timeouts on long routes
- High PostGIS load
- GPS drift causing mismatches

## New Architecture

### 1. Map Matching
```typescript
interface MatchedSegment {
  coordinates: [number, number][]
  confidence: number
  wayId: string
}

async function matchToRoads(points: Coordinate[]): Promise<MatchedSegment[]> {
  // Use Mapbox Map Matching API
  const response = await mapboxClient.matching({
    points,
    profile: 'cycling',
    geometries: 'geojson',
    tilesets: ['mapbox.road-network']
  })

  return response.matchings
}
```

### 2. Surface Detection
```typescript
interface SurfaceSegment {
  surface: string
  geometry: LineString
  confidence: number
}

async function detectSurfaces(matchedSegments: MatchedSegment[]): Promise<SurfaceSegment[]> {
  // Query our PostGIS database with matched road IDs
  const surfaces = await db.query(`
    WITH matched_ways AS (
      SELECT UNNEST($1::text[]) AS way_id
    )
    SELECT 
      r.surface_type,
      ST_AsGeoJSON(r.geometry) as geometry,
      r.surface_confidence
    FROM road_network r
    JOIN matched_ways m ON r.way_id = m.way_id::bigint
  `, [matchedSegments.map(s => s.wayId)])

  return surfaces
}
```

### 3. Caching Layer
```typescript
interface CachedSurface {
  wayId: string
  surface: string
  timestamp: number
}

class SurfaceCache {
  private cache: Map<string, CachedSurface>
  private TTL = 24 * 60 * 60 * 1000 // 24 hours

  async getSurface(wayId: string): Promise<string | null> {
    const cached = this.cache.get(wayId)
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      return cached.surface
    }
    return null
  }
}
```

### 4. Processing Pipeline
```typescript
async function processRoute(gpxData: string) {
  // 1. Parse GPX
  const points = parseGPX(gpxData)

  // 2. Match to roads
  const matched = await matchToRoads(points)

  // 3. Check cache
  const cachedSurfaces = await Promise.all(
    matched.map(segment => surfaceCache.getSurface(segment.wayId))
  )

  // 4. Query missing surfaces
  const missingSegments = matched.filter((_, i) => !cachedSurfaces[i])
  const newSurfaces = await detectSurfaces(missingSegments)

  // 5. Update cache
  newSurfaces.forEach(surface => surfaceCache.set(surface.wayId, surface))

  return {
    route: matched,
    surfaces: [...cachedSurfaces, ...newSurfaces]
  }
}
```

### 5. Error Handling
```typescript
class SurfaceMatchingError extends Error {
  constructor(
    message: string,
    public code: string,
    public segment?: MatchedSegment
  ) {
    super(message)
  }
}

const handleMatchingError = (error: Error) => {
  if (error.name === 'MapMatchingError') {
    // Fall back to direct PostGIS query
    return detectSurfacesDirectly(points)
  }
  throw error
}
```

## Benefits
- Better accuracy via Map Matching API
- Reduced database load through caching
- Handles GPS drift
- Faster processing
- Better error recovery

## Implementation Steps
1. Setup Map Matching API integration
2. Create surface cache service
3. Update PostGIS queries for matched segments
4. Implement error handling
5. Add monitoring
6. Cache invalidation system

## Monitoring
- Track matching confidence scores
- Monitor cache hit rates
- Log processing times
- Surface type distribution
- Error rates by segment