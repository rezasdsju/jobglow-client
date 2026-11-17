import type { LucideIcon } from "lucide-react"
import { BriefcaseBusiness, ShieldCheck, UserRound } from "lucide-react"

import { PLATFORM_ROLE_META } from "@/lib/users/roles"
import { cn } from "@/lib/utils"
import type { PlatformRole } from "@/types/userTypes"

const ROLE_ICONS: Record<PlatformRole, LucideIcon> = {
  seeker: UserRound,
  recruiter: BriefcaseBusiness,
  admin: ShieldCheck,
}

type RoleBadgeProps = {
  role: PlatformRole
  className?: string
}

/** Colored pill that shows the access level a user currently holds. */
export const RoleBadge = ({ role, className }: RoleBadgeProps) => {
  const meta = PLATFORM_ROLE_META[role]
  const Icon = ROLE_ICONS[role]

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap",
        meta.className,
        className
      )}
      title={meta.description}
    >
      <Icon className="size-3" aria-hidden="true" />
      {meta.label}
    </span>
  )
}

type AccountStatusBadgeProps = {
  suspended: boolean
  className?: string
}

/** Account state used in the users table. */
export const AccountStatusBadge = ({
  suspended,
  className,
}: AccountStatusBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap",
      suspended
        ? "border-rose-500/25 bg-rose-500/10 text-rose-600 dark:text-rose-400"
        : "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      className
    )}
  >
    <span
      className={cn(
        "size-1.5 rounded-full",
        suspended ? "bg-rose-500" : "bg-emerald-500"
      )}
      aria-hidden="true"
    />
    {suspended ? "Suspended" : "Active"}
  </span>
)
