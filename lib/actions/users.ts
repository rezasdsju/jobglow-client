import { isPlatformRole } from "@/lib/users/roles"
import type { PlatformRole } from "@/types/userTypes"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export type UpdateUserRoleResult =
  | { ok: true; role: PlatformRole; changed: boolean }
  | { ok: false; message: string }

/**
 * Saves a user's platform role through the API.
 *
 * `changed` mirrors MongoDB's `modifiedCount`: false means the stored role
 * already matched, which is a no-op rather than an error.
 */
export const updateUserRole = async (
  userId: string,
  role: PlatformRole
): Promise<UpdateUserRoleResult> => {
  if (!isPlatformRole(role)) {
    return { ok: false, message: "Unknown role." }
  }

  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      return {
        ok: false,
        message:
          typeof data?.message === "string"
            ? data.message
            : "The server could not update the role.",
      }
    }

    return {
      ok: true,
      role,
      changed: Number(data?.modifiedCount) > 0,
    }
  } catch {
    return { ok: false, message: "Could not reach the server." }
  }
}
