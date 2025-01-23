# API Documentation

## API Changes
Old → New Endpoints

### Authentication
```typescript
// Old (server.ts)
GET /callback
GET /api/profile
PUT /api/profile

// New (auth.routes.ts)
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/profile
PUT  /api/auth/profile
```

### Maps
```typescript
// Old
POST /api/maps     // Large monolithic endpoint
GET  /api/maps     // No pagination
PUT  /api/maps/:id // Basic update

// New
POST /api/maps              // Create map
GET  /api/maps?page=1       // Paginated
PUT  /api/maps/:id         // Partial updates
GET  /api/maps/:id/routes  // Sub-resources
POST /api/maps/:id/share   // Sharing
```

### Routes
```typescript
// Old
POST /api/routes  // Single upload
GET  /api/routes  // Basic list

// New
POST /api/routes              // Upload route
GET  /api/routes?bounds=[]    // Spatial query
POST /api/routes/batch        // Batch upload
GET  /api/routes/:id/surface  // Surface info
```

### Photos
```typescript
// Old
POST /api/photos/upload     // Basic upload
GET  /api/photos/near      // Simple query

// New
POST /api/photos              // Upload with metadata
GET  /api/photos?location=[]  // Spatial search
PUT  /api/photos/:id/caption  // Update metadata
DELETE /api/photos/:id        // Delete photo
```

## Request/Response Examples

### Create Route
```typescript
// POST /api/routes
Request:
{
  name: string
  gpxData: string
  isPublic: boolean
}

Response:
{
  id: string
  name: string
  surfaces: Surface[]
  statistics: RouteStats
  createdAt: string
}
```

### Upload Photo
```typescript
// POST /api/photos
Request:
{
  photo: File
  location: [number, number]
  caption?: string
}

Response:
{
  id: string
  url: string
  location: [number, number]
  thumbnail: string
}
```

## Error Handling
```typescript
// Old
res.status(500).json({ error: err.message })

// New
interface APIError {
  code: string        // e.g. "INVALID_GPX"
  message: string     // User-friendly message
  details?: unknown   // Additional context
}

// Example
{
  code: "ROUTE_TOO_LARGE",
  message: "Route exceeds 100km limit",
  details: {
    size: 150,
    limit: 100
  }
}
```

## Rate Limiting
```typescript
// New endpoints include:
headers: {
  'X-RateLimit-Limit': '100',
  'X-RateLimit-Remaining': '99',
  'X-RateLimit-Reset': '1640995200'
}
```

## Authentication
```typescript
// Required headers
headers: {
  'Authorization': 'Bearer ${token}'
}
```

See [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) for migration steps.