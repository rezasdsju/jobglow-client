import Link from "next/link"
import { ArrowUpRight, MapPin } from "lucide-react"

import { ApplicationStatusBadge } from "./ApplicationStatusBadge"
import { Button } from "@/components/ui/button"
import {
  formatApplicationDate,
  formatRelativeTime,
} from "@/lib/applications/format"
import { formatLocation } from "@/lib/jobs/format"
import { surfaceClassName } from "@/lib/jobs/surface"
import { cn } from "@/lib/utils"
import type { IApplication } from "@/types/applicationTypes"

const CompanyMark = ({ application }: { application: IApplication }) => (
  <span
    className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-muted-foreground uppercase ring-1 ring-border ring-inset"
    aria-hidden="true"
  >
    {application.companyName.charAt(0)}
  </span>
)

const PositionCell = ({ application }: { application: IApplication }) => (
  <div className="flex min-w-0 items-center gap-3">
    <CompanyMark application={application} />
    <div className="min-w-0">
      <p className="truncate text-sm font-medium">{application.jobTitle}</p>
      <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
        <span className="truncate">{application.companyName}</span>
        <span aria-hidden="true">•</span>
        <MapPin className="size-3 shrink-0" aria-hidden="true" />
        <span className="truncate">{formatLocation(application)}</span>
      </p>
    </div>
  </div>
)

const ViewJobButton = ({ jobId }: { jobId: string }) => (
  <Button
    nativeButton={false}
    render={<Link href={`/browse-jobs/${jobId}`} />}
    variant="outline"
    size="sm"
    className="h-8 gap-1.5 rounded-lg px-2.5"
  >
    View Job
    <ArrowUpRight className="size-3.5" aria-hidden="true" />
  </Button>
)

/** Desktop table plus a card list for smaller screens. */
export const ApplicationsTable = ({
  applications,
}: {
  applications: IApplication[]
}) => (
  <>
    <div className="hidden lg:block">
      <table className="w-full table-fixed text-left text-sm">
        <colgroup>
          <col className="w-[42%]" />
          <col className="w-[20%]" />
          <col className="w-[18%]" />
          <col className="w-[20%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-border bg-muted/30 text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
            <th scope="col" className="px-4 py-2.5 font-medium">
              Position
            </th>
            <th scope="col" className="px-4 py-2.5 font-medium">
              Applied
            </th>
            <th scope="col" className="px-4 py-2.5 font-medium">
              Status
            </th>
            <th scope="col" className="px-4 py-2.5 text-right font-medium">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">
          {applications.map((application) => (
            <tr
              key={
                application._id ??
                `${application.jobId}-${application.appliedAt}`
              }
              className="transition-colors hover:bg-muted/20"
            >
              <td className="px-4 py-3">
                <PositionCell application={application} />
              </td>
              <td className="px-4 py-3">
                <p className="text-sm whitespace-nowrap">
                  {formatRelativeTime(application.appliedAt)}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {formatApplicationDate(application.appliedAt)}
                </p>
              </td>
              <td className="px-4 py-3">
                <ApplicationStatusBadge status={application.status} />
              </td>
              <td className="px-4 py-3 text-right">
                <ViewJobButton jobId={application.jobId} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="grid gap-3 p-4 lg:hidden">
      {applications.map((application) => (
        <article
          key={
            application._id ?? `${application.jobId}-${application.appliedAt}`
          }
          className={cn(surfaceClassName, "p-4")}
        >
          <div className="flex items-start gap-3">
            <CompanyMark application={application} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {application.jobTitle}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {application.companyName}
              </p>
            </div>
            <ApplicationStatusBadge
              status={application.status}
              className="shrink-0"
            />
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-border/70 pt-3 text-xs">
            <div>
              <dt className="text-muted-foreground">Applied</dt>
              <dd className="mt-0.5 font-medium">
                {formatApplicationDate(application.appliedAt)}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Location</dt>
              <dd className="mt-0.5 font-medium">
                {formatLocation(application)}
              </dd>
            </div>
          </dl>

          <div className="mt-3 flex justify-end border-t border-border/70 pt-3">
            <ViewJobButton jobId={application.jobId} />
          </div>
        </article>
      ))}
    </div>
  </>
)
