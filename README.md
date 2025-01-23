# Lutruwita Map - Interactive Mapping Application

Interactive mapping platform for Tasmania.

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

## Tech Stack
- React + TypeScript
- Mapbox GL
- Auth0
- Express
- MongoDB

## Development
```bash
npm install
npm run dev
```

## Environment
Required .env.local:
```
VITE_MAPBOX_TOKEN=
AUTH0_SECRET=
AUTH0_CLIENT_SECRET=
VITE_MONGODB_URI=
```