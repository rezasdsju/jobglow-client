import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  Banknote,
  Briefcase,
  CalendarClock,
  Laptop,
  MapPin,
  Sparkles,
  Wallet,
} from "lucide-react"

import { BulletList } from "@/app/components/job-details/BulletList"
import { JobDetailHeader } from "@/app/components/job-details/JobDetailHeader"
import { JobDetailSection } from "@/app/components/job-details/JobDetailSection"
import { JobOverviewCard } from "@/app/components/job-details/JobOverviewCard"
import { JobStatCard } from "@/app/components/job-details/JobStatCard"
import { getJobById } from "@/lib/api/jobs"
import {
  formatDeadline,
  formatLocation,
  formatSalary,
  formatWorkMode,
  isClosed,
  toBullets,
} from "@/lib/jobs/format"
import { JOB_CATEGORY_LABELS, JOB_TYPE_LABELS } from "@/lib/jobs/options"
import { surfaceClassName } from "@/lib/jobs/surface"
import { cn } from "@/lib/utils"

type JobDetailPageProps = {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({
  params,
}: JobDetailPageProps): Promise<Metadata> => {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) return { title: "Job not found · JobGlow" }

  return {
    title: `${job.title} · ${job.company} · JobGlow`,
    description: `${job.company} is hiring a ${job.title} in ${formatLocation(job)}. Apply on JobGlow.`,
  }
}

const JobDetailPage = async ({ params }: JobDetailPageProps) => {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) notFound()

  const closed = isClosed(job)
  const category = JOB_CATEGORY_LABELS[job.category]
  const jobType = JOB_TYPE_LABELS[job.jobType]
  const location = formatLocation(job)
  const deadline = formatDeadline(job.deadline)

  const responsibilities = toBullets(job.responsibilities)
  const qualifications = toBullets(job.qualifications)

  const skillTags = [category, jobType, formatWorkMode(job)]

  const highlights = [
    {
      icon: Laptop,
      label: job.isRemote ? "Remote-friendly role" : "On-site role",
    },
    { icon: Briefcase, label: `${jobType} position` },
    { icon: Wallet, label: "Competitive salary" },
    {
      icon: CalendarClock,
      label: closed ? "Applications closed" : `Apply by ${deadline}`,
    },
  ]

  return (
    <main className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-4 sm:py-6">
      <JobDetailHeader job={job} />

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <JobStatCard
          icon={Banknote}
          label="Salary Range"
          value={formatSalary(job)}
        />
        <JobStatCard icon={MapPin} label="Location" value={location} />
        <JobStatCard icon={Briefcase} label="Job Type" value={jobType} />
        <JobStatCard icon={CalendarClock} label="Deadline" value={deadline} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className={cn(surfaceClassName, "flex flex-col gap-6 p-5 sm:p-6")}>
          <JobDetailSection title="Job Description">
            <p>
              {job.company} is hiring a {job.title} for its {category} team.
              This is a {jobType.toLowerCase()} role based in {location}.
              {closed
                ? " Applications for this role are now closed."
                : ` Applications are open until ${deadline}.`}
            </p>
          </JobDetailSection>

          <JobDetailSection title="Responsibilities" divider>
            <BulletList items={responsibilities} />
          </JobDetailSection>

          <JobDetailSection title="Requirements" divider>
            <div className="flex flex-wrap gap-2">
              {skillTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>
            <BulletList items={qualifications} className="mt-4" />
          </JobDetailSection>

          <JobDetailSection title="Job Highlights" divider>
            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </JobDetailSection>
        </div>

        <JobOverviewCard job={job} />
      </div>
    </main>
  )
}

export default JobDetailPage
