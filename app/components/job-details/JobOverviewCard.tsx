import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  formatDeadline,
  formatLocation,
  formatWorkMode,
} from "@/lib/jobs/format"
import { JOB_CATEGORY_LABELS } from "@/lib/jobs/options"
import { surfaceClassName } from "@/lib/jobs/surface"
import { cn } from "@/lib/utils"
import type { IJob } from "@/types/jobTypes"

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-3 py-2.5">
    <dt className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
      {label}
    </dt>
    <dd className="truncate text-sm font-medium" title={value}>
      {value}
    </dd>
  </div>
)

/** Sidebar summary of the company and the role's key facts. */
export const JobOverviewCard = ({ job }: { job: IJob }) => (
  <aside className={cn(surfaceClassName, "h-fit p-5 lg:sticky lg:top-20")}>
    <h2 className="text-base font-semibold">Company Overview</h2>

    <div className="mt-4 flex aspect-[16/9] items-center justify-center rounded-lg border border-border bg-linear-to-br from-muted to-muted/30">
      <span className="text-3xl font-semibold text-muted-foreground/50 uppercase">
        {job.company.charAt(0)}
      </span>
    </div>

    <dl className="mt-3 divide-y divide-border">
      <DetailRow label="Industry" value={JOB_CATEGORY_LABELS[job.category]} />
      <DetailRow label="Location" value={formatLocation(job)} />
      <DetailRow label="Work Mode" value={formatWorkMode(job)} />
      <DetailRow label="Deadline" value={formatDeadline(job.deadline)} />
    </dl>

    <Button
      nativeButton={false}
      render={
        <Link href={`/browse-jobs?search=${encodeURIComponent(job.company)}`} />
      }
      variant="outline"
      className="mt-4 w-full"
    >
      View company jobs
    </Button>
  </aside>
)
