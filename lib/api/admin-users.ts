import type { UserWithRole } from "better-auth/plugins"
import { headers } from "next/headers"

import { auth } from "../auth"
import { isPlatformRole } from "@/lib/users/roles"
import type { ManagedUser } from "@/types/userTypes"

const normalizeUser = (user: UserWithRole): ManagedUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  emailVerified: user.emailVerified,
  image: user.image ?? null,
  // The app treats a missing role as a seeker everywhere else, so default the
  // same way instead of showing an unusable "unassigned" state.
  role: isPlatformRole(user.role) ? user.role : "seeker",
  banned: Boolean(user.banned),
  createdAt: new Date(user.createdAt).toISOString(),
  updatedAt: new Date(user.updatedAt).toISOString(),
})

/**
 * Loads platform users for the admin management screen.
 *
 * The Better Auth admin plugin enforces the admin role. Filtering and paging
 * stay client-side while the user list is small.
 *
 * Server-only: `lib/api/users.ts` is also imported by client components, so the
 * auth/database imports live here instead.
 */
export const getUsers = async (): Promise<ManagedUser[]> => {
  const { users } = await auth.api.listUsers({
    query: {
      sortBy: "name",
      sortDirection: "asc",
      limit: 200,
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  })

  return users.map(normalizeUser)
}
