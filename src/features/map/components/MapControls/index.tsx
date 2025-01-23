import React from 'react';
import type { Map as MapboxMap } from 'mapbox-gl';

interface MapControlsProps {
  map: MapboxMap | null;
  onUpload?: () => void;
  onSave?: () => void;
}

export function MapControls({ map, onUpload, onSave }: MapControlsProps) {
  if (!map) return null;

  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
      <button 
        onClick={onUpload}
        className="bg-white/90 hover:bg-white px-4 py-2 rounded-lg shadow-lg text-gray-800 font-medium transition-colors"
      >
        Upload GPX
      </button>
      <button 
        onClick={onSave}
        className="bg-white/90 hover:bg-white px-4 py-2 rounded-lg shadow-lg text-gray-800 font-medium transition-colors"
      >
        Save Map
      </button>
    </div>
  );
}