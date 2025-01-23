export interface MapStore {
  center: [number, number]
  zoom: number
  routes: Route[]
  setCenter: (center: [number, number]) => void
  setZoom: (zoom: number) => void
  addRoute: (route: Route) => void
}

export interface Route {
  id: string
  name: string
  coordinates: [number, number][]
  surfaces: Surface[]
  createdAt: Date
}

export interface Surface {
  type: string
  confidence: number
  wayId: string
}