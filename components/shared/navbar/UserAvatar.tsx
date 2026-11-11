"use client"

import * as React from "react"
import { LuChevronDown } from "react-icons/lu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { IUser } from "@/types/userTypes"

export function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")

  return initials || "U"
}

type Props = { user: IUser } & React.ComponentProps<"div">

const UserAvatar = React.forwardRef<HTMLDivElement, Props>(
  ({ user, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "flex cursor-pointer items-center justify-center gap-1.5 rounded-xl p-1 transition-colors hover:bg-muted/60",
          className
        )}
      >
        <Tooltip>
          <TooltipTrigger
            render={
              <div className="flex items-center justify-center gap-1.5">
                <Avatar>
                  {user.image ? (
                    <AvatarImage src={user.image} alt={user.name} />
                  ) : null}
                  <AvatarFallback className="text-xs font-medium">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <LuChevronDown
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            }
          />
          <TooltipContent>
            <p>{user.name}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    )
  }
)

UserAvatar.displayName = "UserAvatar"

export default UserAvatar
