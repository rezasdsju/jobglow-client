import type { LucideIcon } from "lucide-react"

import { surfaceClassName } from "@/lib/jobs/surface"
import { cn } from "@/lib/utils"

type JobStatCardProps = {
  icon: LucideIcon
  label: string
  value: string
}

/** One compact fact card shown under the job header. */
export const JobStatCard = ({ icon: Icon, label, value }: JobStatCardProps) => (
  <div className={cn(surfaceClassName, "p-4")}>
    <div className="flex items-center gap-1.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </div>
    <p className="mt-2 truncate text-sm font-semibold" title={value}>
      {value}
    </p>
  </div>
)
