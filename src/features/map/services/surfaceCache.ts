interface CachedSurface {
  wayId: string
  surface: string
  confidence: number
  timestamp: number
}

export class SurfaceCache {
  private cache: Map<string, CachedSurface>
  private TTL = 24 * 60 * 60 * 1000 // 24 hours

  constructor() {
    this.cache = new Map()
  }

  async getSurface(wayId: string): Promise<{ surface: string; confidence: number } | null> {
    const cached = this.cache.get(wayId)
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      return {
        surface: cached.surface,
        confidence: cached.confidence
      }
    }
    return null
  }

  async setSurface(wayId: string, surface: string, confidence: number): Promise<void> {
    this.cache.set(wayId, {
      wayId,
      surface,
      confidence,
      timestamp: Date.now()
    })
  }

  async invalidate(wayId: string): Promise<void> {
    this.cache.delete(wayId)
  }

  async getStats(): Promise<{
    size: number
    hitRate: number
    avgAge: number
  }> {
    const now = Date.now()
    let totalAge = 0
    let hits = 0

    this.cache.forEach(entry => {
      const age = now - entry.timestamp
      if (age < this.TTL) {
        hits++
        totalAge += age
      }
    })

    return {
      size: this.cache.size,
      hitRate: hits / this.cache.size,
      avgAge: totalAge / hits
    }
  }
}