# Project Context

## Purpose
Rebuild of lutruwita2 to address:
- Performance issues with large routes
- Complex surface detection logic
- Photo management scaling
- Code maintainability

## User Base
- Tasmania cyclists and hikers
- Route planners and sharers
- Adventure photographers
- Local cycling groups

## Core Requirements

### Surface Detection
- Detect road/trail surfaces
- Categories: paved, gravel, trail
- Update frequency: daily
- Source: OpenStreetMap data

### Route Processing
- GPX file requirements:
  - Max size: 10MB
  - Required fields: coordinates, elevation
  - Optional: timestamps, heartrate
- Processing steps:
  1. Parse GPX
  2. Detect surfaces
  3. Generate elevation profile
  4. Save route data

### Photo System
- Upload limits: 5MB per photo
- Location radius: 500m
- Storage: DigitalOcean Spaces
- Required metadata:
  - GPS coordinates
  - Timestamp
  - Description (optional)

## Migration Strategy

### Timeline
- Phase 0 (Architecture): 1 week
- Phase 1 (Setup): 1 week
- Phase 2 (Features): 3 weeks
- Phase 3 (Backend): 2 weeks
- Phase 4 (Testing): 1 week

### MVP Features
Must have:
- Basic map display
- Route creation
- Surface detection
- Photo uploads
- User profiles

Nice to have:
- Offline support
- Route sharing
- Social features
- Advanced statistics

### Performance Targets
- Initial load: <2s
- Route processing: <5s
- Photo upload: <3s
- Map interaction: 60fps

### Testing Priorities
1. Surface detection accuracy
2. GPX processing reliability
3. Photo upload/retrieval
4. User authentication
5. Route saving/loading

## Architectural Decisions
- Small files for maintainability
- Feature-based organization
- Strong typing
- Comprehensive testing
- Clear documentation

See IMPLEMENTATION_PLAN.md for detailed steps.