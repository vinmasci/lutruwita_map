# Project Bootstrap

## Initial Structure
```
src/
  features/
    maps/
      components/
        index.ts        # Exports
        MapView/
          index.tsx     # Main component
          types.ts      # Component types
          styles.css    # Scoped styles
          tests/        # Component tests
      hooks/
        index.ts
        useMapState.ts
      services/
        index.ts
        mapService.ts
      store/
        index.ts
        mapStore.ts
    auth/
      [Same structure]
    photos/
      [Same structure]
```

## Configuration Files

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "ESNext"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@features/*": ["./src/features/*"],
      "@shared/*": ["./src/shared/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared')
    }
  }
})
```

### CI/CD (.github/workflows/main.yml)
```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install

      - name: Type check
        run: pnpm type-check

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy
        run: echo "Add deployment steps"
```

## Testing Setup

### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@shared': path.resolve(__dirname, './src/shared')
    }
  }
})
```

### Component Template
```typescript
// src/features/maps/components/MapView/index.tsx
import { FC } from 'react'
import { useMapStore } from '../../store'
import type { MapViewProps } from './types'
import './styles.css'

export const MapView: FC<MapViewProps> = ({ 
  initialCenter,
  zoom 
}) => {
  const { center, setCenter } = useMapStore()
  
  return (
    <div className="map-container">
      <Map center={center} zoom={zoom}>
        {/* Map layers */}
      </Map>
    </div>
  )
}
```

## Initial Commands
```bash
# Setup folders
mkdir -p src/{features,shared,lib,app}/{components,hooks,services,types}

# Generate configs
pnpm tsc --init
pnpm create vite . --template react-ts

# Test setup
pnpm add -D vitest @testing-library/react jsdom

# Install core deps
pnpm add react-router-dom @mapbox/mapbox-gl-draw zustand
```