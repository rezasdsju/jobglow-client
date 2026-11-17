import type { PlatformRole } from "@/types/userTypes"

export type PlatformRoleMeta = {
  label: string
  description: string
  className: string
  dotClassName: string
}

/** Shared labels and colors for the platform roles. */
export const PLATFORM_ROLE_META: Record<PlatformRole, PlatformRoleMeta> = {
  seeker: {
    label: "Seeker",
    description: "Can search jobs and apply to listings.",
    className: "border-sky-500/25 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    dotClassName: "bg-sky-500",
  },
  recruiter: {
    label: "Recruiter",
    description: "Can publish jobs and review applicants.",
    className:
      "border-violet-500/25 bg-violet-500/10 text-violet-600 dark:text-violet-400",
    dotClassName: "bg-violet-500",
  },
  admin: {
    label: "Admin",
    description: "Can manage users, roles, and platform access.",
    className:
      "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dotClassName: "bg-amber-500",
  },
}

/** Roles in the order they appear in filters and role toggles. */
export const PLATFORM_ROLES: PlatformRole[] = ["seeker", "recruiter", "admin"]

/** Runtime guard for role values coming from the API or UI. */
export const isPlatformRole = (value: unknown): value is PlatformRole =>
  typeof value === "string" && value in PLATFORM_ROLE_META
