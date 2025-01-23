# Database Schema

## MongoDB Collections

### Users Collection
```typescript
// Old Schema
interface User {
  _id: ObjectId
  auth0Id: string
  email: string
  name: string
}

// New Schema
interface User {
  _id: ObjectId
  auth0Id: string
  email: string
  name: string
  preferences: {
    defaultMapStyle: string
    measurementUnits: 'metric' | 'imperial'
    notifications: boolean
  }
  social: {
    strava?: string
    instagram?: string
  }
  createdAt: Date
  updatedAt: Date
}
```

### Routes Collection
```typescript
// Old Schema
interface Route {
  _id: ObjectId
  name: string
  gpxData: string
  createdBy: string
}

// New Schema
interface Route {
  _id: ObjectId
  name: string
  description?: string
  gpxData: string
  statistics: {
    distance: number
    elevation: number
    duration: number
  }
  surfaces: Array<{
    type: string
    distance: number
    confidence: number
  }>
  visibility: 'private' | 'public' | 'shared'
  sharedWith: string[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
  metadata: {
    source: 'upload' | 'drawn'
    device?: string
    software?: string
  }
}
```

### Photos Collection
```typescript
// Old Schema
interface Photo {
  _id: ObjectId
  filename: string
  key: string
  location: [number, number]
}

// New Schema
interface Photo {
  _id: ObjectId
  filename: string
  storage: {
    key: string
    bucket: string
    size: number
    format: string
  }
  location: {
    type: 'Point'
    coordinates: [number, number]
  }
  metadata: {
    takenAt: Date
    device?: string
    altitude?: number
    direction?: number
  }
  caption?: string
  tags: string[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
}
```

### Maps Collection
```typescript
// Old Schema
interface Map {
  _id: ObjectId
  name: string
  routes: string[]
  createdBy: string
}

// New Schema
interface Map {
  _id: ObjectId
  name: string
  description?: string
  bounds: {
    ne: [number, number]
    sw: [number, number]
  }
  center: [number, number]
  zoom: number
  style: string
  layers: Array<{
    id: string
    type: 'route' | 'photo' | 'poi'
    visible: boolean
    data: string // Reference to route/photo/poi
  }>
  sharing: {
    visibility: 'private' | 'public' | 'shared'
    sharedWith: string[]
    allowComments: boolean
  }
  metadata: {
    lastViewed: Date
    viewCount: number
  }
  createdBy: string
  createdAt: Date
  updatedAt: Date
}
```

## Indexes

### Routes Collection
```javascript
// Old
db.routes.createIndex({ createdBy: 1 })

// New
db.routes.createIndex({ createdBy: 1 })
db.routes.createIndex({ "surfaces.type": 1 })
db.routes.createIndex({ visibility: 1 })
db.routes.createIndex({ 
  location: "2dsphere"
})
```

### Photos Collection
```javascript
// Old
db.photos.createIndex({ location: "2d" })

// New
db.photos.createIndex({ 
  location: "2dsphere"
})
db.photos.createIndex({ createdBy: 1 })
db.photos.createIndex({ tags: 1 })
db.photos.createIndex({ "metadata.takenAt": 1 })
```

## Data Migration Steps
1. Backup existing collections
2. Run schema validation
3. Add new fields with defaults
4. Update indexes
5. Verify data integrity

See [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) for migration steps.