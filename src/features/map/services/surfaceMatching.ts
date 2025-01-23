import { MatchedSegment, SurfaceSegment } from '../types'

const MAPBOX_ACCESS_TOKEN = process.env.VITE_MAPBOX_TOKEN

interface MapboxMatchResponse {
  matchings: {
    confidence: number
    geometry: {
      coordinates: [number, number][]
    }
    legs: Array<{
      summary: string
      steps: Array<{
        name: string
        way_points: [number, number]
      }>
    }>
  }[]
}

export class SurfaceMatchingError extends Error {
  constructor(
    message: string,
    public code: string,
    public segment?: MatchedSegment
  ) {
    super(message)
    this.name = 'SurfaceMatchingError'
  }
}

export async function matchToRoads(points: [number, number][]): Promise<MatchedSegment[]> {
  try {
    const coordinates = points.map(([lng, lat]) => `${lng},${lat}`).join(';')
    const response = await fetch(
      `https://api.mapbox.com/matching/v5/mapbox/cycling/${coordinates}?access_token=${MAPBOX_ACCESS_TOKEN}&geometries=geojson&radiuses=25`
    )

    if (!response.ok) {
      throw new SurfaceMatchingError(
        `Mapbox API error: ${response.statusText}`,
        'MAPBOX_API_ERROR'
      )
    }

    const data: MapboxMatchResponse = await response.json()

    return data.matchings.map(match => ({
      coordinates: match.geometry.coordinates,
      confidence: match.confidence,
      wayId: match.legs[0].steps[0].name
    }))
  } catch (error) {
    if (error instanceof SurfaceMatchingError) {
      throw error
    }
    throw new SurfaceMatchingError(
      'Failed to match route to roads',
      'MATCHING_FAILED'
    )
  }
}

export async function detectSurfaces(segments: MatchedSegment[]): Promise<SurfaceSegment[]> {
  try {
    const wayIds = segments.map(s => s.wayId)
    const response = await fetch('/api/surfaces', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wayIds })
    })

    if (!response.ok) {
      throw new SurfaceMatchingError(
        'Failed to fetch surface data',
        'SURFACE_API_ERROR'
      )
    }

    const surfaces: SurfaceSegment[] = await response.json()
    return surfaces
  } catch (error) {
    if (error instanceof SurfaceMatchingError) {
      throw error
    }
    throw new SurfaceMatchingError(
      'Failed to detect surfaces',
      'DETECTION_FAILED'
    )
  }
}