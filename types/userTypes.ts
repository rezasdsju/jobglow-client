export interface IUser {
  name: string
  email: string
  image?: string | null
}

/** Roles a platform user can hold. */
export type PlatformRole = "seeker" | "recruiter" | "admin"

/**
 * Platform user shaped for the admin user management screen.
 *
 * Timestamps are ISO strings so the server component can pass users straight
 * to a client component.
 */
export type ManagedUser = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string | null
  role: PlatformRole
  banned: boolean
  createdAt: string
  updatedAt: string
}
