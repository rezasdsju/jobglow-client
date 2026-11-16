import type { IJob } from "@/types/jobTypes"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export const getJobs = async (query = ""): Promise<IJob[]> => {
  const res = await fetch(`${BASE_URL}/jobs${query ? `?${query}` : ""}`)

  if (!res.ok) {
    throw new Error(`Failed to load jobs: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return Array.isArray(data) ? data : []
}

/** Loads one job by its Mongo id, returning null when it cannot be found. */
export const getJobById = async (jobId: string): Promise<IJob | null> => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, { cache: "no-store" })
  if (!res.ok) return null

  // The API replies with an empty body when the id does not exist.
  const body = await res.text()
  if (!body) return null

  try {
    return JSON.parse(body) as IJob
  } catch {
    return null
  }
}
