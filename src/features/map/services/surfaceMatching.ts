import type { Coordinate, MatchedSegment, SurfaceSegment } from '../types';

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

export class SurfaceMatchingError extends Error {
  constructor(
    message: string,
    public code: string,
    public segment?: MatchedSegment
  ) {
    super(message);
    this.name = 'SurfaceMatchingError';
  }
}

// 1. Map Matching API
export async function matchToRoads(points: Coordinate[]): Promise<MatchedSegment[]> {
  try {
    const coordinates = points.map(p => `${p.lon},${p.lat}`).join(';');
    const response = await fetch(
      `https://api.mapbox.com/matching/v5/mapbox/cycling/${coordinates}?access_token=${mapboxToken}&geometries=geojson&radiuses=25`
    );

    if (!response.ok) {
      throw new SurfaceMatchingError(
        'Map matching API error',
        'MATCHING_API_ERROR'
      );
    }

    const data = await response.json();
    return data.matchings.map((match: any) => ({
      coordinates: match.geometry.coordinates,
      confidence: match.confidence,
      wayId: match.legs[0]?.steps[0]?.name || ''
    }));
  } catch (error) {
    if (error instanceof SurfaceMatchingError) throw error;
    throw new SurfaceMatchingError(
      'Failed to match route to roads',
      'MATCHING_FAILED'
    );
  }
}

// 2. Surface Detection (API calls to your DO server)
export async function detectSurfaces(segments: MatchedSegment[]): Promise<SurfaceSegment[]> {
  try {
    const wayIds = segments.map(s => s.wayId);
    const doServerUrl = 'https://your-do-server.com/api/surfaces'; // Update with real URL
    
    const response = await fetch(doServerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DO_API_KEY}` // Use your DO credentials
      },
      body: JSON.stringify({ wayIds })
    });

    if (!response.ok) {
      throw new SurfaceMatchingError(
        'Surface detection API error',
        'SURFACE_API_ERROR'
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof SurfaceMatchingError) throw error;
    throw new SurfaceMatchingError(
      'Failed to detect surfaces',
      'DETECTION_FAILED'
    );
  }
}

// 3. Caching Layer
class SurfaceCache {
  private cache: Map<string, CachedSurface> = new Map();
  private TTL = 24 * 60 * 60 * 1000; // 24 hours

  async getSurface(wayId: string): Promise<string | null> {
    const cached = this.cache.get(wayId);
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      return cached.surface;
    }
    return null;
  }

  async setSurface(wayId: string, surface: string): Promise<void> {
    this.cache.set(wayId, {
      wayId,
      surface,
      timestamp: Date.now()
    });
  }

  getStats() {
    const now = Date.now();
    let hits = 0;
    let totalAge = 0;

    this.cache.forEach(entry => {
      const age = now - entry.timestamp;
      if (age < this.TTL) {
        hits++;
        totalAge += age;
      }
    });

    return {
      size: this.cache.size,
      hitRate: hits / this.cache.size,
      avgAge: totalAge / hits
    };
  }
}

export const surfaceCache = new SurfaceCache();

// 4. Processing Pipeline
export async function processRoute(gpxData: string) {
  try {
    // 1. Parse GPX points
    const points = parseGPX(gpxData);

    // 2. Match to roads
    const matched = await matchToRoads(points);

    // 3. Check cache
    const cachedSurfaces = await Promise.all(
      matched.map(segment => surfaceCache.getSurface(segment.wayId))
    );

    // 4. Query missing surfaces
    const missingSegments = matched.filter((_, i) => !cachedSurfaces[i]);
    const newSurfaces = await detectSurfaces(missingSegments);

    // 5. Update cache
    newSurfaces.forEach(surface => 
      surfaceCache.setSurface(surface.wayId, surface.surface)
    );

    return {
      route: matched,
      surfaces: [...cachedSurfaces, ...newSurfaces]
    };
  } catch (error) {
    if (error instanceof SurfaceMatchingError) {
      return handleMatchingError(error);
    }
    throw error;
  }
}

async function handleMatchingError(error: SurfaceMatchingError) {
  console.error('Surface matching error:', error);
  // Fall back to direct PostGIS query if necessary
  if (error.code === 'MATCHING_API_ERROR') {
    // Implement fallback
  }
  throw error;
}

interface CachedSurface {
  wayId: string;
  surface: string;
  timestamp: number;
}