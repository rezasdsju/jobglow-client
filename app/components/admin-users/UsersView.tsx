"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { ChevronRight, Search, SearchX, Users } from "lucide-react"
import { toast } from "sonner"

import { UserStats } from "./UserStats"
import { UsersTable } from "./UsersTable"
import { ApplicationsPagination } from "@/app/components/applications/ApplicationsPagination"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  PLATFORM_ROLES,
  PLATFORM_ROLE_META,
  isPlatformRole,
} from "@/lib/users/roles"
import { getUserStats } from "@/lib/users/stats"
import type { ManagedUser, PlatformRole } from "@/types/userTypes"
import { updateUserRole } from "@/lib/actions/users"

const PAGE_SIZE = 8

type RoleFilter = PlatformRole | "all"

const ROLE_FILTER_ITEMS: { value: RoleFilter; label: string }[] = [
  { value: "all", label: "All roles" },
  ...PLATFORM_ROLES.map((role) => ({
    value: role,
    label: `${PLATFORM_ROLE_META[role].label}s`,
  })),
]

const EmptyUsers = () => (
  <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-16 text-center">
    <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
      <Users className="size-5" aria-hidden="true" />
    </span>
    <h2 className="text-sm font-medium">No users yet</h2>
    <p className="max-w-sm text-sm text-muted-foreground">
      New accounts will appear here as people sign up to the platform.
    </p>
  </div>
)

const NoMatchingUsers = ({ onReset }: { onReset: () => void }) => (
  <div className="mt-4 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border px-6 py-16 text-center">
    <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
      <SearchX className="size-5" aria-hidden="true" />
    </span>
    <h2 className="text-sm font-medium">No users match your filters</h2>
    <p className="max-w-sm text-sm text-muted-foreground">
      Try a different search term or include every role.
    </p>
    <Button
      type="button"
      variant="outline"
      onClick={onReset}
      className="mt-1 h-9 rounded-lg px-3.5"
    >
      Clear filters
    </Button>
  </div>
)

type UsersViewProps = {
  users: ManagedUser[]
}

/**
 * Admin user management screen. Filtering, search, and role switches are
 * client-side; the server page owns the user data.
 */
export const UsersView = ({ users }: UsersViewProps) => {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all")
  const [page, setPage] = useState(1)
  const [roleOverrides, setRoleOverrides] = useState<
    Record<string, { role: PlatformRole; from: PlatformRole }>
  >({})
  const [pendingIds, setPendingIds] = useState<Record<string, boolean>>({})

  const resolvedUsers = useMemo(
    () =>
      users.map((user) => {
        const override = roleOverrides[user.id]
        // The override only stands in for the role it replaced. Once refreshed
        // server data moves past that role, the saved value takes over.
        const applies = override && user.role === override.from

        return applies ? { ...user, role: override.role } : user
      }),
    [users, roleOverrides]
  )

  const stats = useMemo(() => getUserStats(resolvedUsers), [resolvedUsers])

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return resolvedUsers
      .filter((user) => roleFilter === "all" || user.role === roleFilter)
      .filter(
        (user) =>
          !normalizedQuery ||
          user.name.toLowerCase().includes(normalizedQuery) ||
          user.email.toLowerCase().includes(normalizedQuery)
      )
      .sort((first, second) => first.name.localeCompare(second.name))
  }, [resolvedUsers, query, roleFilter])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pagedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handleRoleChange = async (userId: string, role: PlatformRole) => {
    const user = resolvedUsers.find((item) => item.id === userId)
    if (!user || user.role === role || pendingIds[userId]) return

    const previousRole = user.role
    const roleLabel = PLATFORM_ROLE_META[role].label

    // Optimistic update so the switch reacts immediately.
    setRoleOverrides((current) => ({
      ...current,
      [userId]: { role, from: previousRole },
    }))
    setPendingIds((current) => ({ ...current, [userId]: true }))

    try {
      const result = await updateUserRole(userId, role)

      if (!result.ok) throw new Error(result.message)

      toast.success(
        result.changed
          ? `${user.name}'s role is now ${roleLabel}`
          : `${user.name} already has the ${roleLabel} role`
      )

      // Re-fetch the row from the server so the list reflects the saved role.
      router.refresh()
    } catch (error) {
      // Drop the override so the UI never shows a role that was not saved.
      setRoleOverrides((current) => {
        const next = { ...current }
        delete next[userId]
        return next
      })
      toast.error(`Couldn't update ${user.name}'s role`, {
        description:
          error instanceof Error ? error.message : "Please try again.",
      })
    } finally {
      setPendingIds((current) => {
        const next = { ...current }
        delete next[userId]
        return next
      })
    }
  }

  const resetFilters = () => {
    setQuery("")
    setRoleFilter("all")
    setPage(1)
  }

  return (
    <div>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
          >
            <Link
              href="/dashboard/admin"
              className="transition-colors hover:text-foreground"
            >
              Admin
            </Link>
            <ChevronRight
              className="size-3 text-muted-foreground/60"
              aria-hidden="true"
            />
            <span>Users</span>
          </nav>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              User Management
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Review, filter, and manage platform access for all users.
            </p>
          </div>
        </div>
      </header>

      <UserStats stats={stats} />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(1)
              }}
              placeholder="Search by name or email…"
              aria-label="Search users"
              className="h-9 pl-9"
            />
          </div>

          <Select
            items={ROLE_FILTER_ITEMS}
            value={roleFilter}
            onValueChange={(value) => {
              if (value === "all" || isPlatformRole(value)) {
                setRoleFilter(value)
                setPage(1)
              }
            }}
          >
            <SelectTrigger
              size="sm"
              aria-label="Filter users by role"
              className="h-9 w-full sm:w-36"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROLE_FILTER_ITEMS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-xs text-muted-foreground">
          {filteredUsers.length} of {resolvedUsers.length}{" "}
          {resolvedUsers.length === 1 ? "user" : "users"}
        </p>
      </div>

      <p className="mt-2 text-[11px] text-muted-foreground">
        Role changes are saved to the database immediately.
      </p>

      {resolvedUsers.length === 0 ? (
        <EmptyUsers />
      ) : filteredUsers.length === 0 ? (
        <NoMatchingUsers onReset={resetFilters} />
      ) : (
        <div className="mt-3 overflow-hidden rounded-xl border border-border">
          <UsersTable
            users={pagedUsers}
            onRoleChange={handleRoleChange}
            pendingUserIds={pendingIds}
          />
          <ApplicationsPagination
            page={currentPage}
            pageSize={PAGE_SIZE}
            totalItems={filteredUsers.length}
            totalPages={totalPages}
            onPageChange={setPage}
            itemNoun="user"
            ariaLabel="Users pagination"
          />
        </div>
      )}
    </div>
  )
}
