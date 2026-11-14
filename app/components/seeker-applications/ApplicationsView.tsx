"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronRight, FileDown, FileText, Search } from "lucide-react"

import { ApplicationStats } from "./ApplicationStats"
import { ApplicationsPagination } from "./ApplicationsPagination"
import { ApplicationsTable } from "./ApplicationsTable"
import { Button } from "@/components/ui/button"
import { getApplicationStats } from "@/lib/applications/stats"
import { cn } from "@/lib/utils"
import type { IApplication } from "@/types/applicationTypes"

const PAGE_SIZE = 6

type ApplicationTab = "active" | "archived"

type TabOption = {
  value: ApplicationTab
  label: string
  count: number
}

const EmptyApplications = ({ tab }: { tab: ApplicationTab }) => (
  <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-16 text-center">
    <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
      <FileText className="size-5" aria-hidden="true" />
    </span>
    <h2 className="text-sm font-medium">
      {tab === "active" ? "No active applications" : "No archived applications"}
    </h2>
    <p className="max-w-sm text-sm text-muted-foreground">
      {tab === "active"
        ? "Once you apply to a job, it will show up here with its latest status."
        : "Applications you archive will be kept here for reference."}
    </p>
    {tab === "active" && (
      <Button
        nativeButton={false}
        render={<Link href="/browse-jobs" />}
        className="mt-1 h-9 gap-1.5 rounded-lg bg-indigo-500 px-3.5 text-white shadow-xs shadow-indigo-500/25 hover:bg-indigo-600 focus-visible:ring-indigo-500/40"
      >
        <Search className="size-4" aria-hidden="true" />
        Browse Jobs
      </Button>
    )}
  </div>
)

/**
 * Seeker "My Applications" dashboard page. Receives the applications as a
 * prop so the server page can swap dummy data for the real list later.
 */
export const ApplicationsView = ({
  applications,
}: {
  applications: IApplication[]
}) => {
  const [tab, setTab] = useState<ApplicationTab>("active")
  const [page, setPage] = useState(1)

  const activeApplications = applications.filter(
    (application) => !application.archived
  )
  const archivedApplications = applications.filter(
    (application) => application.archived
  )
  const visibleApplications =
    tab === "active" ? activeApplications : archivedApplications

  const totalPages = Math.max(
    1,
    Math.ceil(visibleApplications.length / PAGE_SIZE)
  )
  const currentPage = Math.min(page, totalPages)
  const pagedApplications = visibleApplications.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )
  const stats = getApplicationStats(activeApplications)

  const tabs: TabOption[] = [
    { value: "active", label: "Active", count: activeApplications.length },
    {
      value: "archived",
      label: "Archived",
      count: archivedApplications.length,
    },
  ]

  const selectTab = (next: ApplicationTab) => {
    setTab(next)
    setPage(1)
  }

  return (
    <div>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Link
              href="/dashboard/seeker"
              className="transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <ChevronRight
              className="size-3 text-muted-foreground/60"
              aria-hidden="true"
            />
            <span>My Applications</span>
          </nav>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              My Applications
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Track the status of every role you&apos;ve applied to and follow
              up with hiring teams.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => window.print()}
          className="h-9 shrink-0 gap-1.5 self-start rounded-lg px-3.5 sm:mt-6"
        >
          <FileDown className="size-4" aria-hidden="true" />
          Export PDF
        </Button>
      </header>

      <ApplicationStats stats={stats} />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Applications"
          className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-1"
        >
          {tabs.map((item) => {
            const isActive = tab === item.value

            return (
              <button
                key={item.value}
                type="button"
                role="tab"
                id={`applications-tab-${item.value}`}
                aria-selected={isActive}
                aria-controls={`applications-panel-${item.value}`}
                onClick={() => selectTab(item.value)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                    isActive
                      ? "bg-muted text-foreground"
                      : "bg-muted/60 text-muted-foreground"
                  )}
                >
                  {item.count}
                </span>
              </button>
            )
          })}
        </div>

        <p className="text-xs text-muted-foreground">
          {visibleApplications.length}{" "}
          {visibleApplications.length === 1 ? "application" : "applications"}
        </p>
      </div>

      <div
        role="tabpanel"
        id={`applications-panel-${tab}`}
        aria-labelledby={`applications-tab-${tab}`}
        className="mt-4"
      >
        {visibleApplications.length === 0 ? (
          <EmptyApplications tab={tab} />
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <ApplicationsTable applications={pagedApplications} />
            <ApplicationsPagination
              page={currentPage}
              pageSize={PAGE_SIZE}
              totalItems={visibleApplications.length}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  )
}
