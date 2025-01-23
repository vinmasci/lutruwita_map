import type { Coordinate, MatchedSegment, SurfaceSegment } from '../types';

const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
const doServerUrl = import.meta.env.VITE_DO_SERVER_URL;
const doApiSecret = import.meta.env.VITE_DO_API_SECRET;
const doApiKeyId = import.meta.env.VITE_DO_API_KEY_ID;

// [Rest of the file unchanged...]

export async function detectSurfaces(segments: MatchedSegment[]): Promise<SurfaceSegment[]> {
  try {
    const wayIds = segments.map(s => s.wayId);
    const response = await fetch(`${doServerUrl}/surfaces`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key-ID': doApiKeyId,
        'X-API-Secret': doApiSecret
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