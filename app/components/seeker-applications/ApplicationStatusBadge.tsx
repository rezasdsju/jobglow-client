import { APPLICATION_STATUS_META } from "@/lib/applications/status"
import { cn } from "@/lib/utils"
import type { ApplicationStatus } from "@/types/applicationTypes"

type ApplicationStatusBadgeProps = {
  status: ApplicationStatus
  className?: string
}

/** Colored pill that shows where an application currently stands. */
export const ApplicationStatusBadge = ({
  status,
  className,
}: ApplicationStatusBadgeProps) => {
  const meta = APPLICATION_STATUS_META[status]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap",
        meta.className,
        className
      )}
    >
      <span
        className={cn("size-1.5 rounded-full", meta.dotClassName)}
        aria-hidden="true"
      />
      {meta.label}
    </span>
  )
}
