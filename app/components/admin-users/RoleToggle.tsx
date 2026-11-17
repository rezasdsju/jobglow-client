"use client"

import { PLATFORM_ROLES, PLATFORM_ROLE_META } from "@/lib/users/roles"
import { cn } from "@/lib/utils"
import type { PlatformRole } from "@/types/userTypes"

type RoleToggleProps = {
  userName: string
  role: PlatformRole
  onChange: (role: PlatformRole) => void
  /** Blocks input while this user's role is being saved. */
  disabled?: boolean
  className?: string
}

/**
 * Three-way role switch shown on each user row.
 *
 * The parent owns the selected role so the row, badge, and stats stay in sync.
 */
export const RoleToggle = ({
  userName,
  role,
  onChange,
  disabled = false,
  className,
}: RoleToggleProps) => (
  <div
    role="group"
    aria-label={`Change role for ${userName}`}
    aria-busy={disabled}
    className={cn(
      "inline-flex items-center gap-0.5 rounded-lg border border-border bg-muted/30 p-0.5",
      disabled && "opacity-60",
      className
    )}
  >
    {PLATFORM_ROLES.map((option) => {
      const isActive = option === role
      const label = PLATFORM_ROLE_META[option].label

      return (
        <button
          key={option}
          type="button"
          disabled={disabled}
          aria-pressed={isActive}
          title={`Set ${userName} to ${label}`}
          onClick={() => onChange(option)}
          className={cn(
            "rounded-md px-2 py-1 text-[11px] font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed",
            isActive
              ? "bg-background text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground disabled:hover:text-muted-foreground"
          )}
        >
          {label}
        </button>
      )
    })}
  </div>
)
