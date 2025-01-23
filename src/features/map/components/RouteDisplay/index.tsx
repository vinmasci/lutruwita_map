import React, { useEffect } from 'react';
import type { Map as MapboxMap } from 'mapbox-gl';
import type { Feature, LineString } from 'geojson';

interface RouteDisplayProps {
  map: MapboxMap | null;
  coordinates: [number, number][];
  color?: string;
  width?: number;
}

export function RouteDisplay({ map, coordinates, color = '#e17055', width = 4 }: RouteDisplayProps) {
  useEffect(() => {
    if (!map || coordinates.length === 0) return;

    const sourceId = 'route-source';
    const layerId = 'route-layer';

    // Remove existing route if present
    if (map.getSource(sourceId)) {
      map.removeLayer(layerId);
      map.removeSource(sourceId);
    }

    // Add route to map
    map.addSource(sourceId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates
        }
      }
    });

    map.addLayer({
      id: layerId,
      type: 'line',
      source: sourceId,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': color,
        'line-width': width
      }
    });

    // Fit bounds to route
    const bounds = coordinates.reduce(
      (bounds, coord) => bounds.extend(coord),
      new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
    );

    map.fitBounds(bounds, {
      padding: 50,
      duration: 1000
    });

    return () => {
      if (map.getSource(sourceId)) {
        map.removeLayer(layerId);
        map.removeSource(sourceId);
      }
    };
  }, [map, coordinates, color, width]);

  return null;
}