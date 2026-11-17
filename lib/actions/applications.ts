import { normalizeApplication } from "@/lib/applications/normalize"
import type {
  ApplicationStatus,
  IApplication,
  NewApplication,
} from "@/types/applicationTypes"

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

export const getApplicationsCount = async (
  query = ""
): Promise<{ count: number }> => {
  const res = await fetch(`${BASE_URL}/applications/count?${query}`)
  return res.json()
}

export type UpdateApplicationStatusResult = {
  matchedCount: number
  modifiedCount: number
}

/**
 * Persists a new workflow status for one application.
 *
 * The API only accepts status updates through this endpoint; `updatedAt` is
 * set on the server so the history stays consistent.
 */
export const updateApplicationStatus = async (
  applicationId: string,
  data: { status: ApplicationStatus }
): Promise<UpdateApplicationStatusResult> => {
  const response = await fetch(`${BASE_URL}/applications/${applicationId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(
      `Failed to update application status: ${response.status} ${response.statusText}`
    )
  }

  return response.json()
}
