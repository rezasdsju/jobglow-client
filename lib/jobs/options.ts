import type { JobCategory, JobType } from "@/types/jobTypes"

export type JobOption<T extends string> = {
  value: T
  label: string
}

export const JOB_TYPES: JobOption<JobType>[] = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
]

export const JOB_CATEGORIES: JobOption<JobCategory>[] = [
  { value: "engineering-tech", label: "Engineering" },
  { value: "it-software", label: "IT & Software" },
  { value: "design-creative", label: "Design" },
  { value: "marketing-sales", label: "Marketing" },
  { value: "accounting-finance", label: "Finance" },
  { value: "education-training", label: "Education" },
  { value: "customer-support", label: "Support" },
]

export const JOB_WORK_MODES = [
  { value: "true", label: "Remote", isRemote: true },
  { value: "false", label: "On-site", isRemote: false },
] as const

export const JOB_SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "salary", label: "Highest Salary" },
  { value: "deadline", label: "Closing Soon" },
]

export const JOB_TYPE_LABELS = Object.fromEntries(
  JOB_TYPES.map((option) => [option.value, option.label])
) as Record<JobType, string>

export const JOB_CATEGORY_LABELS = Object.fromEntries(
  JOB_CATEGORIES.map((option) => [option.value, option.label])
) as Record<JobCategory, string>
