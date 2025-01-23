export interface User {
  id: string
  name: string
  email: string
}

export interface Photo {
  id: string
  url: string
  location: [number, number]
  takenBy: string
  uploadedAt: Date
}