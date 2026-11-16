import type { IApplication } from "@/types/applicationTypes"

/** Stable key used for React lists and local status overrides. */
export const getApplicationKey = (application: IApplication) =>
  application._id ?? `${application.userId}-${application.jobId}`
