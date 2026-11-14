import type { IJob, SalaryFrequency } from "@/types/jobTypes"

const currencySymbols: Record<string, string> = {
  BDT: "৳",
  USD: "$",
  EUR: "€",
  GBP: "£",
}

const frequencySuffixes: Record<SalaryFrequency, string> = {
  hour: "/hr",
  day: "/day",
  month: "/mo",
  year: "/yr",
}

export const formatCount = (value: number) => value.toLocaleString("en-US")

/** Compact count used by the filter sidebar, e.g. 1248 -> "1.2k". */
export const formatCompactCount = (value: number) =>
  value >= 1000 ? `${Math.round(value / 100) / 10}k` : `${value}`

const formatAmount = (value: number, symbol: string) =>
  value >= 1000
    ? `${symbol}${Math.round(value / 100) / 10}k`
    : `${symbol}${value}`

export const formatSalary = (job: IJob) => {
  const currency = job.currency ?? "BDT"
  const symbol = currencySymbols[currency] ?? currency

  return `${formatAmount(job.min, symbol)} - ${formatAmount(job.max, symbol)} ${frequencySuffixes[job.frequency]}`
}

export const formatLocation = (job: Pick<IJob, "location" | "isRemote">) => {
  if (job.isRemote && !/remote/i.test(job.location)) {
    return `${job.location} (Remote)`
  }

  return job.location
}

export const formatWorkMode = (job: Pick<IJob, "isRemote">) =>
  job.isRemote ? "Remote" : "On-site"

export const isClosed = (job: Pick<IJob, "deadline" | "status">) =>
  job.status === "closed" ||
  new Date(`${job.deadline}T23:59:59`).getTime() < Date.now()

/** Formats an ISO deadline (YYYY-MM-DD) as a short readable date. */
export const formatDeadline = (deadline: string) =>
  new Date(`${deadline}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

/** Splits the prose returned by the jobs API into list items. */
export const toBullets = (text: string) =>
  text
    .split(/\r?\n+/)
    .flatMap((line) => line.split(/\.\s+/))
    .map((item) => item.trim().replace(/\.$/, ""))
    .filter(Boolean)
