"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  CalendarClock,
  ChevronRight,
  Info,
  MapPin,
  Users,
} from "lucide-react"
import { toast } from "sonner"

import { ApplicantsTable } from "./ApplicantsTable"
import { ApplicationsPagination } from "@/app/components/applications/ApplicationsPagination"
import { Button } from "@/components/ui/button"
import { getApplicationKey } from "@/lib/applications/key"
import { APPLICATION_STATUS_META } from "@/lib/applications/status"
import { formatDeadline, formatLocation } from "@/lib/jobs/format"
import { JOB_TYPE_LABELS } from "@/lib/jobs/options"
import type { ApplicationStatus, IApplication } from "@/types/applicationTypes"
import type { IJob } from "@/types/jobTypes"

const PAGE_SIZE = 8

type StatusOverride = {
  status: ApplicationStatus
  updatedAt: string
}

type JobApplicantsViewProps = {
  job: IJob
  applications: IApplication[]
}

const JobMeta = ({ job }: { job: IJob }) => (
  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
    <span className="inline-flex items-center gap-1.5">
      <Building2 className="size-3.5" aria-hidden="true" />
      {job.company}
    </span>
    <span className="inline-flex items-center gap-1.5">
      <MapPin className="size-3.5" aria-hidden="true" />
      {formatLocation(job)}
    </span>
    <span className="inline-flex items-center gap-1.5">
      <Briefcase className="size-3.5" aria-hidden="true" />
      {JOB_TYPE_LABELS[job.jobType]}
    </span>
    <span className="inline-flex items-center gap-1.5">
      <CalendarClock className="size-3.5" aria-hidden="true" />
      Apply by {formatDeadline(job.deadline)}
    </span>
  </div>
)

const EmptyApplicants = ({ jobId }: { jobId?: string }) => (
  <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-16 text-center">
    <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
      <Users className="size-5" aria-hidden="true" />
    </span>
    <h2 className="text-sm font-medium">No applications yet</h2>
    <p className="max-w-sm text-sm text-muted-foreground">
      Applications will appear here as candidates apply to this job.
    </p>
    {jobId && (
      <Button
        nativeButton={false}
        render={<Link href={`/browse-jobs/${jobId}`} />}
        variant="outline"
        className="mt-1 h-9 gap-1.5 rounded-lg px-3.5"
      >
        View job post
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
      </Button>
    )}
  </div>
)

/**
 * Recruiter review screen for one job. Applications are fetched on the server
 * and passed in; status changes are held in local state until the status
 * update endpoint is added.
 */
export const JobApplicantsView = ({
  job,
  applications,
}: JobApplicantsViewProps) => {
  const [page, setPage] = useState(1)
  const [overrides, setOverrides] = useState<Record<string, StatusOverride>>({})

  const sortedApplications = useMemo(
    () =>
      [...applications].sort(
        (first, second) =>
          new Date(second.appliedAt).getTime() -
          new Date(first.appliedAt).getTime()
      ),
    [applications]
  )

  const resolvedApplications = sortedApplications.map((application) => {
    const override = overrides[getApplicationKey(application)]
    return override ? { ...application, ...override } : application
  })

  const totalPages = Math.max(
    1,
    Math.ceil(resolvedApplications.length / PAGE_SIZE)
  )
  const currentPage = Math.min(page, totalPages)
  const pagedApplications = resolvedApplications.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handleStatusChange = (
    application: IApplication,
    status: ApplicationStatus
  ) => {
    if (status === application.status) return

    // TODO: Persist the new status through the applications API once the
    // endpoint exists. Until then the change only lives in this page's state.
    setOverrides((current) => ({
      ...current,
      [getApplicationKey(application)]: {
        status,
        updatedAt: new Date().toISOString(),
      },
    }))

    toast.info(
      `${application.name} moved to ${APPLICATION_STATUS_META[status].label}`,
      {
        description:
          "This change is only on this page — the database update is not wired up yet.",
      }
    )
  }

  return (
    <div>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Link
              href="/dashboard/recruiter/jobs"
              className="transition-colors hover:text-foreground"
            >
              Manage Jobs
            </Link>
            <ChevronRight
              className="size-3 text-muted-foreground/60"
              aria-hidden="true"
            />
            <span className="max-w-56 truncate">{job.title}</span>
            <ChevronRight
              className="size-3 text-muted-foreground/60"
              aria-hidden="true"
            />
            <span>Applicants</span>
          </nav>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Review Applicants
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Review every application for{" "}
              <span className="font-medium text-foreground">{job.title}</span>{" "}
              and move candidates through your hiring pipeline.
            </p>
            <JobMeta job={job} />
          </div>
        </div>

        <Button
          nativeButton={false}
          render={<Link href={`/browse-jobs/${job._id}`} />}
          variant="outline"
          className="h-9 shrink-0 gap-1.5 self-start rounded-lg px-3.5 sm:mt-6"
        >
          View job post
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Button>
      </header>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 text-sm font-medium">
          <Users className="size-4 text-muted-foreground" aria-hidden="true" />
          {applications.length}{" "}
          {applications.length === 1 ? "applicant" : "applicants"}
        </p>
        <p className="text-xs text-muted-foreground">
          Newest applications first
        </p>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <p>
          Status changes update this page only. Saving them to the database is
          not wired up yet.
        </p>
      </div>

      {resolvedApplications.length === 0 ? (
        <EmptyApplicants jobId={job._id} />
      ) : (
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <ApplicantsTable
            applications={pagedApplications}
            onStatusChange={handleStatusChange}
          />
          <ApplicationsPagination
            page={currentPage}
            pageSize={PAGE_SIZE}
            totalItems={resolvedApplications.length}
            totalPages={totalPages}
            onPageChange={setPage}
            itemNoun="applicant"
          />
        </div>
      )}
    </div>
  )
}
