import type { ApplicationStatus } from "@/types/applicationTypes"

export type ApplicationStatusMeta = {
  label: string
  className: string
  dotClassName: string
}

/** Shared labels and colors for every application status. */
export const APPLICATION_STATUS_META: Record<
  ApplicationStatus,
  ApplicationStatusMeta
> = {
  applied: {
    label: "Applied",
    className: "border-sky-500/25 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    dotClassName: "bg-sky-500",
  },
  review: {
    label: "In Review",
    className:
      "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dotClassName: "bg-amber-500",
  },
  shortlisted: {
    label: "Shortlisted",
    className:
      "border-violet-500/25 bg-violet-500/10 text-violet-600 dark:text-violet-400",
    dotClassName: "bg-violet-500",
  },
  interview: {
    label: "Interview",
    className:
      "border-indigo-500/25 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    dotClassName: "bg-indigo-500",
  },
  offered: {
    label: "Offered",
    className:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    dotClassName: "bg-emerald-500",
  },
  rejected: {
    label: "Rejected",
    className:
      "border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-400",
    dotClassName: "bg-rose-500",
  },
  withdrawn: {
    label: "Withdrawn",
    className: "border-border bg-muted/60 text-muted-foreground",
    dotClassName: "bg-muted-foreground/60",
  },
}

/** Runtime guard for status values coming from the API. */
export const isApplicationStatus = (
  value: unknown
): value is ApplicationStatus =>
  typeof value === "string" && value in APPLICATION_STATUS_META
