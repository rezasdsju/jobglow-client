'use client'
import { Bookmark } from "lucide-react"

import { Button } from "@/components/ui/button"
import { isClosed } from "@/lib/jobs/format"
import { surfaceClassName } from "@/lib/jobs/surface"
import { cn } from "@/lib/utils"
import type { IJob } from "@/types/jobTypes"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

/**
 * Job title, company, hiring status, and the primary actions. The Apply and
 * Save buttons are presentational until their behaviour is wired up.
 */
export const JobDetailHeader = ({ job }: { job: IJob }) => {
  const closed = isClosed(job)
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  if (isPending) {
    return <div>Loading...</div>
  }
  const user = session?.user
  const handleApplyNow = () => {
    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
      return
    }
  }
  return (
    <section className={cn(surfaceClassName, "p-5 sm:p-6")}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div
            className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-muted text-lg font-semibold uppercase"
            aria-hidden="true"
          >
            {job.company.charAt(0)}
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-tight wrap-break-word sm:text-2xl">
              {job.title}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span className="text-muted-foreground">{job.company}</span>
              <span className="text-muted-foreground/40" aria-hidden="true">
                •
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-medium",
                  closed
                    ? "text-muted-foreground"
                    : "text-emerald-600 dark:text-emerald-400"
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    closed ? "bg-muted-foreground" : "bg-emerald-500"
                  )}
                  aria-hidden="true"
                />
                {closed ? "Applications closed" : "Actively hiring"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={`Save ${job.title}`}
            className="size-9"
          >
            <Bookmark className="size-4" aria-hidden="true" />
          </Button>
          {/* TODO: wire the apply flow. */}
          <Button
            onClick={handleApplyNow}
            type="button"
            className="h-9 px-5">
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  )
}
