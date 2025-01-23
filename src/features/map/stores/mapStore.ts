import { create } from 'zustand'
import { MapStore } from '../types'

export const useMapStore = create<MapStore>((set) => ({
  center: [146.8087, -41.4419],
  zoom: 12,
  routes: [],
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  addRoute: (route) => set((state) => ({ routes: [...state.routes, route] })),
}))