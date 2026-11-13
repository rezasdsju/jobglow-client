import type { Metadata } from "next"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  Calculator,
  ChevronRight,
  Code2,
  Copy,
  GraduationCap,
  Headphones,
  MapPin,
  Megaphone,
  MoreVertical,
  Palette,
  Pencil,
  Plus,
  Server,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type {
  IJob,
  JobCategory,
  JobStatus,
  JobType,
  SalaryFrequency,
} from "@/types/jobTypes"

export const metadata: Metadata = {
  title: "Manage Job Posts · JobGlow",
  description:
    "Review live listings, monitor applicants, and update job details across your organization.",
}

type ManageJob = IJob & {
  id: string
  applicants: number
  currency: string
}

const categoryLabels: Record<JobCategory, string> = {
  "engineering-tech": "Engineering",
  "it-software": "IT & Software",
  "design-creative": "Design",
  "marketing-sales": "Marketing",
  "accounting-finance": "Finance",
  "education-training": "Education",
  "customer-support": "Support",
}

const categoryStyles: Record<
  JobCategory,
  { icon: LucideIcon; className: string }
> = {
  "engineering-tech": {
    icon: Code2,
    className: "bg-sky-500/10 text-sky-500 ring-sky-500/20",
  },
  "it-software": {
    icon: Server,
    className: "bg-cyan-500/10 text-cyan-500 ring-cyan-500/20",
  },
  "design-creative": {
    icon: Palette,
    className: "bg-amber-500/10 text-amber-500 ring-amber-500/20",
  },
  "marketing-sales": {
    icon: Megaphone,
    className: "bg-violet-500/10 text-violet-500 ring-violet-500/20",
  },
  "accounting-finance": {
    icon: Calculator,
    className: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20",
  },
  "education-training": {
    icon: GraduationCap,
    className: "bg-rose-500/10 text-rose-500 ring-rose-500/20",
  },
  "customer-support": {
    icon: Headphones,
    className: "bg-orange-500/10 text-orange-500 ring-orange-500/20",
  },
}

const jobTypeLabels: Record<JobType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
}

const statusStyles: Record<
  JobStatus,
  { label: string; note: string; className: string; dotClassName: string }
> = {
  published: {
    label: "Active",
    note: "Publicly visible",
    className:
      "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    dotClassName: "bg-emerald-500",
  },
  closed: {
    label: "Expired",
    note: "Closed",
    className: "border-border bg-muted/60 text-muted-foreground",
    dotClassName: "bg-muted-foreground/60",
  },
  draft: {
    label: "Draft",
    note: "Not published",
    className:
      "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dotClassName: "bg-amber-500",
  },
}

const currencySymbols: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  BDT: "৳",
}

const frequencySuffixes: Record<SalaryFrequency, string> = {
  hour: "/hr",
  day: "/day",
  month: "/mo",
  year: "/yr",
}

const dummyJobs: ManageJob[] = [
  {
    id: "job_01",
    title: "Frontend Developer",
    company: "HireFuse Network",
    category: "engineering-tech",
    jobType: "full-time",
    isRemote: true,
    location: "New York, USA",
    deadline: "2025-05-30",
    min: 25,
    max: 40,
    frequency: "hour",
    applicants: 34,
    currency: "EUR",
    status: "published",
    responsibilities:
      "Build and maintain responsive interfaces with React and TypeScript.",
    qualifications:
      "3+ years of experience with React, TypeScript, and modern state architectures.",
  },
  {
    id: "job_02",
    title: "Senior Product Designer",
    company: "HireFuse Labs",
    category: "design-creative",
    jobType: "full-time",
    isRemote: false,
    location: "London, UK (Hybrid)",
    deadline: "2025-06-14",
    min: 90000,
    max: 115000,
    frequency: "year",
    applicants: 19,
    currency: "EUR",
    status: "published",
    responsibilities:
      "Own end-to-end product design across research, flows, and prototypes.",
    qualifications:
      "5+ years designing digital products with a strong portfolio.",
  },
  {
    id: "job_03",
    title: "DevOps Specialist",
    company: "HireFuse Platform",
    category: "it-software",
    jobType: "full-time",
    isRemote: true,
    location: "Berlin, Germany",
    deadline: "2025-06-30",
    min: 95000,
    max: 120000,
    frequency: "year",
    applicants: 12,
    currency: "EUR",
    status: "published",
    responsibilities:
      "Operate CI/CD pipelines, infrastructure as code, and observability.",
    qualifications:
      "Hands-on experience with Kubernetes, Terraform, and cloud platforms.",
  },
  {
    id: "job_04",
    title: "Product Marketing Lead",
    company: "HireFuse Network",
    category: "marketing-sales",
    jobType: "full-time",
    isRemote: true,
    location: "United States",
    deadline: "2025-07-15",
    min: 80000,
    max: 105000,
    frequency: "year",
    applicants: 27,
    currency: "EUR",
    status: "published",
    responsibilities:
      "Lead go-to-market strategy, positioning, and launch campaigns.",
    qualifications:
      "Experience marketing B2B SaaS products to technical audiences.",
  },
  {
    id: "job_05",
    title: "QA Automation Engineer",
    company: "HireFuse Platform",
    category: "engineering-tech",
    jobType: "part-time",
    isRemote: false,
    location: "Dublin, Ireland (Hybrid)",
    deadline: "2025-05-01",
    min: 35,
    max: 50,
    frequency: "hour",
    applicants: 8,
    currency: "EUR",
    status: "closed",
    responsibilities:
      "Write and maintain end-to-end automated test suites for web apps.",
    qualifications:
      "Experience with Playwright or Cypress and CI test pipelines.",
  },
]

function formatCompensation(job: ManageJob) {
  const symbol = currencySymbols[job.currency] ?? job.currency
  const amount = (value: number) =>
    value >= 1000
      ? `${symbol}${Math.round(value / 1000)}k`
      : `${symbol}${value}`

  return `${amount(job.min)} - ${amount(job.max)} ${frequencySuffixes[job.frequency]}`
}

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`))
}

function locationLabel(job: ManageJob) {
  return job.isRemote ? `Remote (${job.location})` : job.location
}

function StatusPill({ status }: { status: JobStatus }) {
  const style = statusStyles[status]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap",
        style.className
      )}
    >
      <span
        className={cn("size-1.5 rounded-full", style.dotClassName)}
        aria-hidden="true"
      />
      {style.label}
    </span>
  )
}

function JobRowActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-7 gap-1.5 border-indigo-500/30 bg-indigo-500/10 px-2 text-indigo-600 hover:bg-indigo-500/20 hover:text-indigo-500 dark:text-indigo-400"
      >
        <Pencil className="size-3" aria-hidden="true" />
        Update
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Duplicate job"
        className="hidden text-muted-foreground 2xl:inline-flex"
      >
        <Copy className="size-3.5" aria-hidden="true" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="More actions"
        className="text-muted-foreground"
      >
        <MoreVertical className="size-3.5" aria-hidden="true" />
      </Button>
    </div>
  )
}

function CompanyCell({ job }: { job: ManageJob }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm">{job.company}</p>
      <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
        <MapPin className="size-3 shrink-0" aria-hidden="true" />
        <span className="truncate">{locationLabel(job)}</span>
      </p>
    </div>
  )
}

function TitleCell({ job }: { job: ManageJob }) {
  const category = categoryStyles[job.category]
  const Icon = category.icon

  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-md ring-1 ring-inset",
          category.className
        )}
      >
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{job.title}</p>
        <p className="truncate text-[11px] text-muted-foreground">
          {categoryLabels[job.category]}
        </p>
      </div>
    </div>
  )
}

const ManageJobsPage = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
          >
            <span>Manage Jobs</span>
            <ChevronRight
              className="size-3 text-muted-foreground/60"
              aria-hidden="true"
            />
            <span>Job Listings &amp; Postings</span>
          </nav>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Manage Job Posts
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>
        </div>

        <Button
          nativeButton={false}
          render={<Link href="/dashboard/recruiter/jobs/new" />}
          className="h-9 shrink-0 gap-1.5 self-start rounded-lg bg-indigo-500 px-3.5 text-white shadow-xs shadow-indigo-500/25 hover:bg-indigo-600 focus-visible:ring-indigo-500/40 sm:mt-6"
        >
          <Plus className="size-4" aria-hidden="true" />
          New Job Post
        </Button>
      </header>

      {/* Table — desktop */}
      <div className="mt-6 hidden overflow-hidden rounded-xl border border-border xl:block">
        <table className="w-full table-fixed text-left text-sm">
          <colgroup>
            <col className="w-[17.5%]" />
            <col className="w-[15%]" />
            <col className="w-[8.5%]" />
            <col className="w-[13%]" />
            <col className="w-[8%]" />
            <col className="w-[11%]" />
            <col className="w-[11.5%]" />
            <col className="w-[15.5%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-border bg-muted/30 text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
              <th scope="col" className="px-3 py-2.5 font-medium">
                Job title &amp; dept
              </th>
              <th scope="col" className="px-3 py-2.5 font-medium">
                Company &amp; location
              </th>
              <th scope="col" className="px-3 py-2.5 font-medium">
                Type
              </th>
              <th scope="col" className="px-3 py-2.5 font-medium">
                Compensation
              </th>
              <th scope="col" className="px-3 py-2.5 font-medium">
                Applicants
              </th>
              <th scope="col" className="px-3 py-2.5 font-medium">
                Status
              </th>
              <th scope="col" className="px-3 py-2.5 font-medium">
                Deadline
              </th>
              <th scope="col" className="px-3 py-2.5 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {dummyJobs.map((job) => (
              <tr key={job.id} className="transition-colors hover:bg-muted/20">
                <td className="px-3 py-3">
                  <TitleCell job={job} />
                </td>
                <td className="px-3 py-3">
                  <CompanyCell job={job} />
                </td>
                <td className="px-3 py-3 text-sm whitespace-nowrap text-muted-foreground">
                  {jobTypeLabels[job.jobType]}
                </td>
                <td className="px-3 py-3 text-sm whitespace-nowrap">
                  {formatCompensation(job)}
                </td>
                <td className="px-3 py-3">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-muted-foreground">
                    <Users className="size-3.5" aria-hidden="true" />
                    <span className="text-sm font-medium text-foreground">
                      {job.applicants}
                    </span>
                  </span>
                </td>
                <td className="px-3 py-3">
                  <StatusPill status={job.status} />
                  <p className="mt-1 hidden text-[10px] text-muted-foreground 2xl:block">
                    {statusStyles[job.status].note}
                  </p>
                </td>
                <td className="px-3 py-3">
                  <p className="text-sm whitespace-nowrap">
                    {formatDate(job.deadline)}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {job.status === "closed" ? "Closed" : "Open"}
                  </p>
                </td>
                <td className="px-3 py-3">
                  <JobRowActions className="justify-end" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards — small screens */}
      <div className="mt-6 grid gap-3 xl:hidden">
        {dummyJobs.map((job) => (
          <article
            key={job.id}
            className="rounded-xl border border-border bg-card/40 p-4 dark:bg-white/2"
          >
            <div className="flex items-start gap-3">
              <TitleCell job={job} />
              <div className="ml-auto shrink-0">
                <StatusPill status={job.status} />
              </div>
            </div>

            <div className="mt-3">
              <CompanyCell job={job} />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-border/70 pt-3 text-xs">
              <div>
                <dt className="text-muted-foreground">Type</dt>
                <dd className="mt-0.5 font-medium">
                  {jobTypeLabels[job.jobType]}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Compensation</dt>
                <dd className="mt-0.5 font-medium">
                  {formatCompensation(job)}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Applicants</dt>
                <dd className="mt-0.5 inline-flex items-center gap-1.5 font-medium">
                  <Users className="size-3.5" aria-hidden="true" />
                  {job.applicants} Candidates
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Deadline</dt>
                <dd className="mt-0.5 font-medium">
                  {formatDate(job.deadline)}
                </dd>
              </div>
            </dl>

            <div className="mt-3 border-t border-border/70 pt-3">
              <JobRowActions className="justify-end" />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default ManageJobsPage
