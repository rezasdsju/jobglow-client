import type { Metadata } from "next"
import { headers } from "next/headers"

import { ApplicationsView } from "@/app/components/seeker-applications/ApplicationsView"
import { getApplications } from "@/lib/actions/applications"
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
  title: "My Applications · JobGlow",
  description:
    "Track the status of every role you've applied to and follow up with hiring teams.",
}

const SeekerApplicationsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() })

  const applications = session?.user
    ? (await getApplications(`applicantId=${session.user.id}`))
    : []

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <ApplicationsView applications={applications} />
    </div>
  )
}

export default SeekerApplicationsPage
