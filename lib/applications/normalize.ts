import type { ApplicationStatus, IApplication } from "@/types/applicationTypes"

import { isApplicationStatus } from "./status"

/**
 * Older application records use slightly different status names. Map them to
 * the names used by the current application model.
 */
const LEGACY_STATUS_MAP: Record<string, ApplicationStatus> = {
  pending: "applied",
  reviewing: "review",
  accepted: "offered",
}

/** Converts a stored status into one the UI knows how to render. */
export const normalizeApplicationStatus = (
  status: unknown
): ApplicationStatus => {
  if (isApplicationStatus(status)) return status
  if (typeof status === "string" && status in LEGACY_STATUS_MAP) {
    return LEGACY_STATUS_MAP[status]
  }

  return "applied"
}

/**
 * Makes API responses safe for the UI: older records may use legacy status
 * names or be missing workflow fields.
 */
export const normalizeApplication = (
  application: IApplication
): IApplication => ({
  ...application,
  status: normalizeApplicationStatus(application.status),
  archived: Boolean(application.archived),
})
