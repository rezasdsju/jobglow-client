import type { ApplicationStatus, IApplication } from "@/types/applicationTypes"

/** Statuses that count as progress past the initial screening stage. */
const SHORTLISTED_STATUSES: ApplicationStatus[] = [
  "shortlisted",
  "interview",
  "offered",
]

export type ApplicationStats = {
  total: number
  shortlisted: number
  interviews: number
  successRate: number
}

/**
 * Calculates the cards shown on the My Applications page.
 *
 * `successRate` is the share of applications that received an offer.
 */
export const getApplicationStats = (
  applications: IApplication[]
): ApplicationStats => {
  const total = applications.length
  const shortlisted = applications.filter((application) =>
    SHORTLISTED_STATUSES.includes(application.status)
  ).length
  const interviews = applications.filter(
    (application) => application.status === "interview"
  ).length
  const offers = applications.filter(
    (application) => application.status === "offered"
  ).length

  return {
    total,
    shortlisted,
    interviews,
    successRate: total === 0 ? 0 : Math.round((offers / total) * 100),
  }
}
