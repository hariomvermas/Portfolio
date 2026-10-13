import projectsData from '../data/projects.js'

// TODO: When Spring Boot backend is ready, replace the static import above
// with a real fetch call:
//
//   const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
//
//   export async function getProjects() {
//     const res = await fetch(`${BASE_URL}/api/projects`)
//     if (!res.ok) throw new Error('Failed to fetch projects')
//     return res.json()
//   }

export async function getProjects() {
  return projectsData
}
