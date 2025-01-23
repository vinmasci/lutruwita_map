import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapViewProps {
  children?: React.ReactNode;
}

export function MapView({ children }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    if (!mapboxToken) {
      console.error('Mapbox token not found');
      return;
    }

    try {
      mapboxgl.accessToken = mapboxToken;

      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        bounds: [[144.5, -43.7], [148.5, -40.5]], // Tasmania bounds
        fitBoundsOptions: {
          padding: 50,
          pitch: 45,
          bearing: 0
        }
      });

      map.current = newMap;

      // Add terrain for 3D elevation
      newMap.on('load', () => {
        newMap.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });

        newMap.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

        // Add road tiles from DO server
        const tileUrl = 'https://api.maptiler.com/tiles/5dd3666f-1ce4-4df6-9146-eda62a200bcb/{z}/{x}/{y}.pbf?key=DFSAZFJXzvprKbxHrHXv';
        
        newMap.addSource('australia-roads', {
          type: 'vector',
          tiles: [tileUrl],
          minzoom: 12,
          maxzoom: 14
        });

        // Add custom roads layer
        newMap.addLayer({
          id: 'custom-roads',
          type: 'line',
          source: 'australia-roads',
          'source-layer': 'lutruwita',
          minzoom: 12,
          maxzoom: 14,
          layout: {
            visibility: 'visible'
          },
          paint: {
            'line-opacity': 1,
            'line-color': [
              'match',
              ['get', 'surface'],
              ['paved', 'asphalt', 'concrete', 'compacted', 'sealed', 'bitumen', 'tar'],
              '#4A90E2',
              ['unpaved', 'gravel', 'fine', 'fine_gravel', 'dirt', 'earth'],
              '#D35400',
              '#888888'
            ],
            'line-width': 2
          }
        });

        setIsMapReady(true);
      });

      // Add controls
      newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
      newMap.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      // Add control margin
      const controlContainer = document.querySelector('.mapboxgl-control-container');
      if (controlContainer) {
        (controlContainer as HTMLElement).style.marginTop = '64px';
      }

    } catch (err) {
      console.error('Error initializing map:', err);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="w-full h-full" />
      {children}
    </div>
  );
}