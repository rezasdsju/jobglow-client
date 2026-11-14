import type { Metadata } from "next"

import { JobCard } from "@/app/components/browse-jobs/JobCard"
import { JobFilters } from "@/app/components/browse-jobs/JobFilters"
import { JobPagination } from "@/app/components/browse-jobs/JobPagination"
import { JobSearchBar } from "@/app/components/browse-jobs/JobSearchBar"
import { JobSortSelect } from "@/app/components/browse-jobs/JobSortSelect"
import { getJobs } from "@/lib/api/jobs"
import { buildJobFilterGroups } from "@/lib/jobs/filters"
import { formatCount } from "@/lib/jobs/format"
import { getParam, toQueryString } from "@/lib/jobs/search-params"
import type { SearchParams } from "@/lib/jobs/search-params"

export const metadata: Metadata = {
  title: "Browse Jobs · JobGlow",
  description:
    "Search open roles, filter by job type, category, and work mode, and find your next opportunity.",
}

const PAGE_SIZE = 6

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) => {
  const params = await searchParams
  const query = toQueryString(params)
  // Facet counts use the whole catalogue so they stay stable while filtering.
  const [jobs, allJobs] = await Promise.all([getJobs(query), getJobs()])

  const filterGroups = buildJobFilterGroups(allJobs, params)
  const totalPages = Math.max(1, Math.ceil(jobs.length / PAGE_SIZE))
  const requestedPage = Math.trunc(Number(getParam(params, "page"))) || 1
  const page = Math.min(Math.max(requestedPage, 1), totalPages)
  const visibleJobs = jobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <main className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-4 sm:py-6">
      <JobSearchBar key={query} defaultValue={getParam(params, "search")} />

      <div className="mt-4 grid gap-4 md:grid-cols-[240px_minmax(0,1fr)]">
        <JobFilters key={query} groups={filterGroups} />

        <section className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
              Found {formatCount(jobs.length)} Professional{" "}
              {jobs.length === 1 ? "Job" : "Jobs"}
            </h1>
            <JobSortSelect
              key={query}
              defaultValue={getParam(params, "sort")}
            />
          </div>

          {visibleJobs.length > 0 ? (
            <div className="mt-4 flex flex-col gap-3">
              {visibleJobs.map((job) => (
                <JobCard
                  key={job._id ?? `${job.title}-${job.company}`}
                  job={job}
                />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-border px-6 py-12 text-center">
              <p className="text-sm font-medium">No jobs found</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          )}

          <JobPagination page={page} totalPages={totalPages} />
        </section>
      </div>
    </main>
  )
}

export default BrowseJobsPage
