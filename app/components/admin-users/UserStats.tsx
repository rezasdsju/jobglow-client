import type { LucideIcon } from "lucide-react"
import { BriefcaseBusiness, ShieldCheck, UserPlus, Users } from "lucide-react"

import type { UserStats as UserStatsData } from "@/lib/users/stats"
import { surfaceClassName } from "@/lib/jobs/surface"
import { cn } from "@/lib/utils"

type UserStatsProps = {
  stats: UserStatsData
}

type StatCard = {
  label: string
  value: string | number
  hint: string
  icon: LucideIcon
  tone: string
}

/** Four summary cards shown above the user management table. */
export const UserStats = ({ stats }: UserStatsProps) => {
  const cards: StatCard[] = [
    {
      label: "Total users",
      value: stats.total,
      hint: `${stats.seekers} ${stats.seekers === 1 ? "seeker" : "seekers"} on the platform`,
      icon: Users,
      tone: "bg-sky-500/10 text-sky-500 ring-sky-500/20",
    },
    {
      label: "Recruiters",
      value: stats.recruiters,
      hint: `${stats.roleShares.recruiter}% of all users`,
      icon: BriefcaseBusiness,
      tone: "bg-violet-500/10 text-violet-500 ring-violet-500/20",
    },
    {
      label: "Admins",
      value: stats.admins,
      hint: `${stats.roleShares.admin}% of all users`,
      icon: ShieldCheck,
      tone: "bg-amber-500/10 text-amber-500 ring-amber-500/20",
    },
    {
      label: "New this week",
      value: stats.newThisWeek,
      hint: "Joined in the last 7 days",
      icon: UserPlus,
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
            className={cn(surfaceClassName, "flex items-start gap-3 p-4")}
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
              <p className="truncate text-xs font-medium">{card.label}</p>
              <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
                {card.hint}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
