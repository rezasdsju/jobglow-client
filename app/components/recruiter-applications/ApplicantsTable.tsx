import { Mail } from "lucide-react"

import { ApplicantStatusSelect } from "./ApplicantStatusSelect"
import { ApplicationStatusBadge } from "@/app/components/applications/ApplicationStatusBadge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  formatApplicationDate,
  formatRelativeTime,
} from "@/lib/applications/format"
import { getApplicationKey } from "@/lib/applications/key"
import { surfaceClassName } from "@/lib/jobs/surface"
import { cn } from "@/lib/utils"
import type { ApplicationStatus, IApplication } from "@/types/applicationTypes"

type ApplicantsTableProps = {
  applications: IApplication[]
  onStatusChange: (application: IApplication, status: ApplicationStatus) => void
}

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase() || "?"

const ApplicantMark = ({ application }: { application: IApplication }) => (
  <Avatar className="size-9">
    <AvatarImage src={application.image ?? undefined} alt="" />
    <AvatarFallback className="bg-indigo-500/10 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
      {getInitials(application.name)}
    </AvatarFallback>
  </Avatar>
)

const ApplicantCell = ({ application }: { application: IApplication }) => (
  <div className="flex min-w-0 items-center gap-3">
    <ApplicantMark application={application} />
    <div className="min-w-0">
      <p className="truncate text-sm font-medium">{application.name}</p>
      <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
        <Mail className="size-3 shrink-0" aria-hidden="true" />
        <span className="truncate">{application.email}</span>
      </p>
    </div>
  </div>
)

const AppliedCell = ({ appliedAt }: { appliedAt: string }) => (
  <>
    <p className="text-sm whitespace-nowrap">{formatRelativeTime(appliedAt)}</p>
    <p className="text-[11px] text-muted-foreground">
      {formatApplicationDate(appliedAt)}
    </p>
  </>
)

/** Applicant review table plus a card list for smaller screens. */
export const ApplicantsTable = ({
  applications,
  onStatusChange,
}: ApplicantsTableProps) => (
  <>
    <div className="hidden lg:block">
      <table className="w-full table-fixed text-left text-sm">
        <colgroup>
          <col className="w-[36%]" />
          <col className="w-[18%]" />
          <col className="w-[18%]" />
          <col className="w-[28%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-border bg-muted/30 text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
            <th scope="col" className="px-4 py-2.5 font-medium">
              Applicant
            </th>
            <th scope="col" className="px-4 py-2.5 font-medium">
              Applied
            </th>
            <th scope="col" className="px-4 py-2.5 font-medium">
              Status
            </th>
            <th scope="col" className="px-4 py-2.5 text-right font-medium">
              Update status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">
          {applications.map((application) => (
            <tr
              key={getApplicationKey(application)}
              className="transition-colors hover:bg-muted/20"
            >
              <td className="px-4 py-3">
                <ApplicantCell application={application} />
              </td>
              <td className="px-4 py-3">
                <AppliedCell appliedAt={application.appliedAt} />
              </td>
              <td className="px-4 py-3">
                <ApplicationStatusBadge status={application.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end">
                  <ApplicantStatusSelect
                    applicantName={application.name}
                    status={application.status}
                    onChange={(status) => onStatusChange(application, status)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="grid gap-3 p-4 lg:hidden">
      {applications.map((application) => (
        <article
          key={getApplicationKey(application)}
          className={cn(surfaceClassName, "p-4")}
        >
          <div className="flex items-start gap-3">
            <ApplicantMark application={application} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{application.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {application.email}
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
              <dt className="text-muted-foreground">Last update</dt>
              <dd className="mt-0.5 font-medium">
                {formatRelativeTime(application.updatedAt)}
              </dd>
            </div>
          </dl>

          <div className="mt-3 border-t border-border/70 pt-3">
            <p className="mb-1 text-[11px] font-medium text-muted-foreground">
              Update status
            </p>
            <ApplicantStatusSelect
              applicantName={application.name}
              status={application.status}
              onChange={(status) => onStatusChange(application, status)}
            />
          </div>
        </article>
      ))}
    </div>
  </>
)
