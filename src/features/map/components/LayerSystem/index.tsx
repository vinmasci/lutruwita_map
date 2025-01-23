import React from 'react';
import type { Map as MapboxMap } from 'mapbox-gl';

interface Layer {
  id: string;
  name: string;
  visible: boolean;
}

interface LayerSystemProps {
  map: MapboxMap | null;
  layers?: Layer[];
  onLayerToggle?: (layerId: string, visible: boolean) => void;
}

export function LayerSystem({ map, layers = [], onLayerToggle }: LayerSystemProps) {
  if (!map) return null;

  const handleToggle = (layerId: string, visible: boolean) => {
    if (map) {
      const visibility = visible ? 'visible' : 'none';
      map.setLayoutProperty(layerId, 'visibility', visibility);
      onLayerToggle?.(layerId, visible);
    }
  };

  return (
    <div className="absolute bottom-8 right-4 z-10 bg-white/90 p-4 rounded-lg shadow-lg">
      <h3 className="text-gray-800 font-medium mb-2">Layers</h3>
      <div className="flex flex-col gap-2">
        {layers.map(layer => (
          <label key={layer.id} className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={layer.visible}
              onChange={(e) => handleToggle(layer.id, e.target.checked)}
              className="rounded border-gray-300"
            />
            {layer.name}
          </label>
        ))}
      </div>
    </div>
  );
}