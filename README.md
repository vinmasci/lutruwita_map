# Lutruwita Map

A clean, maintainable reimplementation of lutruwita2 focused on maps and cycling routes in Tasmania.

## Features
- Interactive mapping with custom surfaces
- GPX route upload and visualization
- Location-based photo sharing
- Custom points of interest
- User profiles and saved routes

## Architecture
- Clean, modular code (max 100-150 lines per file)
- Feature-based organization
- Isolated business logic
- Strong typing with TypeScript

```
src/
  features/           # Core functionality modules
    maps/            # Map and route features
    photos/          # Photo management 
    auth/            # Authentication
  shared/            # Reusable components
  lib/               # Core utilities
  app/               # Application entry

server/              # Backend services
  routes/            # API endpoints
  services/          # Business logic
  middleware/        # Request processing
```

## Tech Stack
- React 18 + TypeScript
- Mapbox GL for mapping
- Auth0 authentication
- Express + MongoDB
- Zustand state management

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