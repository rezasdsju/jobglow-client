import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JobApplicantsView } from "@/app/components/recruiter-applications/JobApplicantsView"
import { getApplications } from "@/lib/actions/applications"
import { getJobById } from "@/lib/api/jobs"
import { getSession } from "@/lib/core/server"

export const metadata: Metadata = {
  title: "Review Applicants · JobGlow",
  description:
    "Review applications and update candidate status for your job post.",
}

type JobApplicationsPageProps = {
  params: Promise<{ id: string }>
}

const JobApplicationsPage = async ({ params }: JobApplicationsPageProps) => {
  const { id } = await params
  const session = await getSession()

  if (!session?.user) notFound()

  // The applications API can only filter by applicant, so load the list and
  // narrow it down to this job on the server.
  const [job, applications] = await Promise.all([
    getJobById(id),
    getApplications(),
  ])

  // Only the recruiter who owns the post can review its applicants.
  if (!job || job.recruiterId !== session.user.id) notFound()

  const jobApplications = applications.filter(
    (application) => application.jobId === id
  )

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <JobApplicantsView job={job} applications={jobApplications} />
    </div>
  )
}

export default JobApplicationsPage
