import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { Banknote, Bookmark, Briefcase, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  formatLocation,
  formatSalary,
  formatWorkMode,
  isClosed,
} from "@/lib/jobs/format"
import { JOB_TYPE_LABELS } from "@/lib/jobs/options"
import { cn } from "@/lib/utils"
import type { IJob } from "@/types/jobTypes"

import { surfaceClassName } from "@/lib/jobs/surface"
import Link from "next/link"

type JobTagProps = {
  icon: LucideIcon
  children: ReactNode
  tone?: "default" | "warning"
}

const tagTones = {
  default: "border-border bg-muted/40 text-muted-foreground",
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
}

const JobTag = ({ icon: Icon, children, tone = "default" }: JobTagProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-medium",
      tagTones[tone]
    )}
  >
    <Icon className="size-3.5" aria-hidden="true" />
    {children}
  </span>
)

export const JobCard = ({ job }: { job: IJob }) => {
  const closed = isClosed(job)

  return (
    <Link
      href={`/browse-jobs/${job._id}`}
      className={cn(
        surfaceClassName,
        "p-4 transition-colors hover:border-border/80 hover:bg-card/60 sm:p-5 dark:hover:bg-white/3"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold uppercase"
          aria-hidden="true"
        >
          {job.company.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-[15px] font-semibold">
                {job.title}
              </h2>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {job.company} • {formatLocation(job)}
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Save ${job.title}`}
              className="shrink-0 text-muted-foreground"
            >
              <Bookmark className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <JobTag icon={Banknote}>{formatSalary(job)}</JobTag>
            <JobTag icon={Briefcase}>{JOB_TYPE_LABELS[job.jobType]}</JobTag>
            <JobTag icon={MapPin}>{formatWorkMode(job)}</JobTag>
            {closed && (
              <JobTag icon={Clock} tone="warning">
                Closed
              </JobTag>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
