import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { UsersView } from "@/app/components/admin-users/UsersView"
import { getUsers } from "@/lib/api/admin-users"
import { getSession } from "@/lib/core/server"

export const metadata: Metadata = {
  title: "User Management · JobGlow",
  description: "Review, filter, and manage platform access for every user.",
}

const AdminUsersPage = async () => {
  const session = await getSession()

  // User management is only available to platform admins.
  if (session?.user?.role !== "admin") notFound()

  const users = await getUsers()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <UsersView users={users} />
    </div>
  )
}

export default AdminUsersPage
