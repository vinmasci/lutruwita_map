# Development Setup

## System Requirements
- Node.js 18+
- PostgreSQL 14+ (PostGIS extension)
- MongoDB 6+
- pnpm or npm

## Dependencies
```json
{
  "dependencies": {
    "@mapbox/mapbox-gl-draw": "1.4.3",
    "mapbox-gl": "2.15.0",
    "react": "18.2.0",
    "zustand": "4.5.0",
    "@auth0/auth0-react": "2.2.1",
    "express": "4.18.2",
    "mongodb": "5.7.0"
  },
  "devDependencies": {
    "@types/react": "18.2.0",
    "@types/mapbox-gl": "2.7.15",
    "typescript": "5.0.0",
    "vitest": "0.34.0",
    "prettier": "3.0.0",
    "eslint": "8.45.0"
  }
}
```

## Local Setup
1. Database:
```bash
# PostgreSQL
createdb lutruwita
psql -d lutruwita -c "CREATE EXTENSION postgis;"

# MongoDB
mongod --dbpath ./data
```

2. Environment:
```bash
cp .env.example .env.local
# Set required keys
```

3. Development:
```bash
pnpm install
pnpm dev    # Frontend: localhost:5173
pnpm server # Backend: localhost:3001
```

## Common Issues
- PostGIS extension missing
- Node version mismatch
- MongoDB connection errors
- Mapbox token scope issues

## VS Code Setup
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Testing
```bash
pnpm test          # Unit tests
pnpm test:e2e     # E2E tests
pnpm test:coverage # Coverage report
```