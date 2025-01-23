# Lutruwita Map

Interactive mapping platform for Tasmania, specifically designed for cyclists and hikers to:
- Create and share routes
- Track surface types (paved/unpaved)
- Share location-based photos
- Save custom maps and points of interest

## Current Project Status
Complete rebuild focused on:
- Cleaner architecture
- Smaller, focused components
- Better state management
- Improved performance
- Enhanced testing

## Architecture
```
├── src/
│   ├── features/           # Feature-based modules
│   │   ├── auth/          # Authentication
│   │   ├── maps/          # Map functionality
│   │   ├── photos/        # Photo management
│   │   └── profiles/      # User profiles
│   │
│   ├── shared/            # Shared resources
│   │   ├── components/    # Reusable UI
│   │   ├── hooks/        # Common hooks
│   │   ├── utils/        # Helper functions
│   │   └── types/        # Global types
│   │
│   ├── lib/              # Core functionality
│   │   ├── api/         # API client
│   │   ├── config/      # App config
│   │   └── db/          # Database
│   │
│   └── app/             # App core
│       ├── layout/      # Layout components
│       ├── routes/      # Route definitions
│       └── providers/   # Context providers

├── server/              # Backend
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── middleware/     # Express middleware
│   └── config/         # Server config
```

## Key Features
- Interactive map with custom styling
- Route creation and saving
- Surface type detection
- Photo uploads with location
- User profiles and saved maps
- GPX file support

## Tech Stack
- Frontend: React 18, TypeScript, Mapbox GL
- Backend: Express, MongoDB
- Auth: Auth0
- Storage: DO Spaces
- Maps: Mapbox

## Development
```bash
npm install
npm run dev
```

## Environment
Required in .env.local:
```
VITE_MAPBOX_TOKEN=
AUTH0_SECRET=
AUTH0_CLIENT_SECRET=
VITE_MONGODB_URI=
```