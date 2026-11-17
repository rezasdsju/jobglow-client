import { BadgeCheck } from "lucide-react"

import { RoleToggle } from "./RoleToggle"
import { AccountStatusBadge, RoleBadge } from "./UserBadges"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatJoinedDate, getUserInitials } from "@/lib/users/format"
import { surfaceClassName } from "@/lib/jobs/surface"
import { cn } from "@/lib/utils"
import type { ManagedUser, PlatformRole } from "@/types/userTypes"

type UsersTableProps = {
  users: ManagedUser[]
  onRoleChange: (userId: string, role: PlatformRole) => void
  /** Users whose role is currently being saved. */
  pendingUserIds: Record<string, boolean>
}

const UserAvatar = ({ user }: { user: ManagedUser }) => (
  <Avatar className="size-9">
    <AvatarImage src={user.image ?? undefined} alt="" />
    <AvatarFallback className="text-xs">
      {getUserInitials(user.name)}
    </AvatarFallback>
  </Avatar>
)

const VerifiedIcon = () => (
  <BadgeCheck
    className="size-3.5 shrink-0 text-emerald-500"
    aria-label="Email verified"
    role="img"
  />
)

const UserCell = ({ user }: { user: ManagedUser }) => (
  <div className="flex min-w-0 items-center gap-2.5">
    <UserAvatar user={user} />
    <p className="truncate text-sm font-medium">{user.name}</p>
  </div>
)

const EmailCell = ({ user }: { user: ManagedUser }) => (
  <div className="flex min-w-0 items-center gap-1.5">
    <span className="truncate text-sm text-muted-foreground">{user.email}</span>
    {user.emailVerified && <VerifiedIcon />}
  </div>
)

/** Desktop table and matching card list for the user management screen. */
export const UsersTable = ({
  users,
  onRoleChange,
  pendingUserIds,
}: UsersTableProps) => (
  <>
    <div className="hidden xl:block">
      <table className="w-full table-fixed text-left text-sm">
        <colgroup>
          <col className="w-[24%]" />
          <col className="w-[24%]" />
          <col className="w-[11%]" />
          <col className="w-[11%]" />
          <col className="w-[10%]" />
          <col className="w-[20%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-border bg-muted/30 text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
            <th scope="col" className="px-4 py-2.5 font-medium">
              User name
            </th>
            <th scope="col" className="px-4 py-2.5 font-medium">
              Email address
            </th>
            <th scope="col" className="px-4 py-2.5 font-medium">
              Role
            </th>
            <th scope="col" className="px-4 py-2.5 font-medium">
              Joined
            </th>
            <th scope="col" className="px-4 py-2.5 font-medium">
              Status
            </th>
            <th scope="col" className="px-4 py-2.5 text-right font-medium">
              Change role
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">
          {users.map((user) => (
            <tr key={user.id} className="transition-colors hover:bg-muted/20">
              <td className="px-4 py-3">
                <UserCell user={user} />
              </td>
              <td className="px-4 py-3">
                <EmailCell user={user} />
              </td>
              <td className="px-4 py-3">
                <RoleBadge role={user.role} />
              </td>
              <td className="px-4 py-3 text-sm whitespace-nowrap text-muted-foreground">
                {formatJoinedDate(user.createdAt)}
              </td>
              <td className="px-4 py-3">
                <AccountStatusBadge suspended={user.banned} />
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end">
                  <RoleToggle
                    userName={user.name}
                    role={user.role}
                    disabled={Boolean(pendingUserIds[user.id])}
                    onChange={(role) => onRoleChange(user.id, role)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="grid gap-3 p-4 xl:hidden">
      {users.map((user) => (
        <article key={user.id} className={cn(surfaceClassName, "p-4")}>
          <div className="flex items-start gap-3">
            <UserAvatar user={user} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                <span className="truncate">{user.email}</span>
                {user.emailVerified && <VerifiedIcon />}
              </p>
            </div>
            <AccountStatusBadge suspended={user.banned} className="shrink-0" />
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-border/70 pt-3 text-xs">
            <div>
              <dt className="text-muted-foreground">Role</dt>
              <dd className="mt-1">
                <RoleBadge role={user.role} />
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Joined</dt>
              <dd className="mt-0.5 font-medium">
                {formatJoinedDate(user.createdAt)}
              </dd>
            </div>
          </dl>

          <div className="mt-3 border-t border-border/70 pt-3">
            <p className="mb-1.5 text-[11px] font-medium text-muted-foreground">
              Change role
            </p>
            <RoleToggle
              userName={user.name}
              role={user.role}
              disabled={Boolean(pendingUserIds[user.id])}
              onChange={(role) => onRoleChange(user.id, role)}
              className="w-full justify-center"
            />
          </div>
        </article>
      ))}
    </div>
  </>
)
