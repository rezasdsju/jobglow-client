import type { LucideIcon } from "lucide-react"
import { BadgeCheck, CalendarClock, FileText, TrendingUp } from "lucide-react"

import type { ApplicationStats as ApplicationStatsData } from "@/lib/applications/stats"
import { surfaceClassName } from "@/lib/jobs/surface"
import { cn } from "@/lib/utils"

type ApplicationStatsProps = {
  stats: ApplicationStatsData
}

type StatCard = {
  label: string
  value: string | number
  icon: LucideIcon
  tone: string
}

/** Four summary cards shown above the applications table. */
export const ApplicationStats = ({ stats }: ApplicationStatsProps) => {
  const cards: StatCard[] = [
    {
      label: "Total Applied",
      value: stats.total,
      icon: FileText,
      tone: "bg-sky-500/10 text-sky-500 ring-sky-500/20",
    },
    {
      label: "Shortlisted",
      value: stats.shortlisted,
      icon: BadgeCheck,
      tone: "bg-violet-500/10 text-violet-500 ring-violet-500/20",
    },
    {
      label: "Interviews",
      value: stats.interviews,
      icon: CalendarClock,
      tone: "bg-indigo-500/10 text-indigo-500 ring-indigo-500/20",
    },
    {
      label: "Success Rate",
      value: `${stats.successRate}%`,
      icon: TrendingUp,
      tone: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20",
    },
  ]

  return (
    <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <div
            key={card.label}
            className={cn(surfaceClassName, "flex items-center gap-3 p-4")}
          >
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset",
                card.tone
              )}
              aria-hidden="true"
            >
              <Icon className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xl font-semibold tracking-tight">
                {card.value}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {card.label}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
