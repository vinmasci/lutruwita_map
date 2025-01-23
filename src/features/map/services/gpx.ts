import type { Feature, LineString } from 'geojson';

interface ProcessedGpx {
  coordinates: [number, number][];
  distance: number;
  elevation: number[];
}

export async function processGpxFile(file: File): Promise<ProcessedGpx> {
  const text = await file.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "text/xml");
  
  // Extract track points
  const trackPoints = Array.from(xmlDoc.getElementsByTagName('trkpt'));
  const coordinates: [number, number][] = [];
  const elevation: number[] = [];
  
  trackPoints.forEach(point => {
    const lat = parseFloat(point.getAttribute('lat') || '0');
    const lon = parseFloat(point.getAttribute('lon') || '0');
    const ele = parseFloat(point.getElementsByTagName('ele')[0]?.textContent || '0');
    
    coordinates.push([lon, lat]);
    elevation.push(ele);
  });

  // Calculate total distance
  let distance = 0;
  for (let i = 1; i < coordinates.length; i++) {
    const [lon1, lat1] = coordinates[i - 1];
    const [lon2, lat2] = coordinates[i];
    distance += calculateDistance(lat1, lon1, lat2, lon2);
  }

  return {
    coordinates,
    distance,
    elevation
  };
}

// Haversine formula for distance calculation
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * Math.PI / 180;
}
