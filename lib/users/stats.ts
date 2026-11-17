import type { ManagedUser, PlatformRole } from "@/types/userTypes"
import { PLATFORM_ROLES } from "@/lib/users/roles"

const WEEK = 7 * 24 * 60 * 60 * 1000

export type UserStats = {
  total: number
  seekers: number
  recruiters: number
  admins: number
  newThisWeek: number
  roleShares: Record<PlatformRole, number>
}

/**
 * Summarises the users shown above the management table. `roleShares` are
 * rounded percentages of the total so each card can explain its number.
 */
export const getUserStats = (
  users: ManagedUser[],
  now = Date.now()
): UserStats => {
  const total = users.length
  const roleCounts = Object.fromEntries(
    PLATFORM_ROLES.map((role) => [
      role,
      users.filter((user) => user.role === role).length,
    ])
  ) as Record<PlatformRole, number>

  const newThisWeek = users.filter(
    (user) => new Date(user.createdAt).getTime() >= now - WEEK
  ).length

  const share = (count: number) =>
    total === 0 ? 0 : Math.round((count / total) * 100)

  return {
    total,
    seekers: roleCounts.seeker,
    recruiters: roleCounts.recruiter,
    admins: roleCounts.admin,
    newThisWeek,
    roleShares: Object.fromEntries(
      PLATFORM_ROLES.map((role) => [role, share(roleCounts[role])])
    ) as Record<PlatformRole, number>,
  }
}
