export type JobType = "full-time" | "part-time" | "contract" | "internship"

export type JobCategory =
  | "engineering-tech"
  | "it-software"
  | "design-creative"
  | "marketing-sales"
  | "accounting-finance"
  | "education-training"
  | "customer-support"

export type SalaryFrequency = "hour" | "day" | "month" | "year"

export type JobStatus = "draft" | "published" | "closed"

export interface IJob {
  /** MongoDB id returned by the jobs API */
  _id?: string
  title: string
  company: string
  category: JobCategory
  jobType: JobType
  isRemote: boolean
  location: string
  /** ISO date string, e.g. "2025-09-30" */
  deadline: string
  min: number
  max: number
  frequency: SalaryFrequency
  /** ISO 4217 code. The API does not send one yet, so the UI defaults to BDT */
  currency?: string
  /** Applicant count is not returned by the jobs API yet */
  applicants?: number
  responsibilities: string
  qualifications: string
  status: JobStatus
  createdAt?: string
  updatedAt?: string
}
