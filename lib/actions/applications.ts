import { normalizeApplication } from "@/lib/applications/normalize"
import type { IApplication, NewApplication } from "@/types/applicationTypes"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

/**
 * Submit an application. The API is responsible for storing it, so the
 * workflow fields are defaulted here before the request is sent.
 */
export const applyToJob = async (data: NewApplication) => {
  const now = new Date().toISOString()
  const response = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      status: "applied",
      appliedAt: now,
      updatedAt: now,
      archived: false,
    }),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to submit application: ${response.status} ${response.statusText}`
    )
  }

  return response.json()
}

export const getApplications = async (query = ""): Promise<IApplication[]> => {
  const response = await fetch(
    `${BASE_URL}/applications${query ? `?${query}` : ""}`,
    { cache: "no-store" }
  )

  if (!response.ok) {
    throw new Error(
      `Failed to load applications: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()
  return (Array.isArray(data) ? data : []).map(normalizeApplication)
}
