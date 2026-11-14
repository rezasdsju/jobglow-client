import type { Metadata } from "next"

import { ApplicationsView } from "@/app/components/seeker-applications/ApplicationsView"
import { dummyApplications } from "@/lib/applications/dummy-data"

export const metadata: Metadata = {
  title: "My Applications · JobGlow",
  description:
    "Track the status of every role you've applied to and follow up with hiring teams.",
}

const SeekerApplicationsPage = () => (
  <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
    {/* TODO: replace the dummy list with the signed-in seeker's applications
        once the API exposes GET /applications. */}
    <ApplicationsView applications={dummyApplications} />
  </div>
)

export default SeekerApplicationsPage
