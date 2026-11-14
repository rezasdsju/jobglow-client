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

/** The API has no single-job endpoint yet, so look the job up in the list. */
export const getJobById = async (id: string): Promise<IJob | null> => {
  const jobs = await getJobs()
  return jobs.find((job) => job._id === id) ?? null
}
