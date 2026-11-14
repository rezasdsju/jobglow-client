import type { JobCategory, JobType } from "./jobTypes"

/** Every status an application can move through after it is submitted. */
export type ApplicationStatus =
  | "applied"
  | "review"
  | "shortlisted"
  | "interview"
  | "offered"
  | "rejected"
  | "withdrawn"

/**
 * A job application stored in the `applications` collection.
 *
 * The applicant and a snapshot of the job are copied onto the application so
 * the seeker's history stays readable even if the original job post changes or
 * is deleted.
 */
export interface IApplication {
  /** MongoDB id returned by the applications API */
  _id?: string

  /** Applicant details (copied from the signed-in user) */
  userId: string
  name: string
  email: string
  image?: string | null

  /** Job snapshot taken when the application was submitted */
  jobId: string
  jobTitle: string
  companyName: string
  category: JobCategory
  jobType: JobType
  isRemote: boolean
  location: string

  /** Progress */
  status: ApplicationStatus
  /** ISO date string, e.g. "2026-11-14T09:30:00.000Z" */
  appliedAt: string
  /** ISO date string, updated whenever the status changes */
  updatedAt: string
  archived: boolean

  /** Optional attachments and recruiter-facing notes */
  coverLetter?: string
  resumeUrl?: string
  portfolioUrl?: string
  note?: string
}

/**
 * Payload sent to `POST /applications`.
 *
 * The API owns the workflow fields, so they are filled in by `applyToJob`
 * instead of being supplied by the caller.
 */
export type NewApplication = Omit<
  IApplication,
  "_id" | "status" | "appliedAt" | "updatedAt" | "archived"
>
