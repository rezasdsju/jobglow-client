"use client"

import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export const authPrimaryButtonClassName = cn(
  "inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium text-white",
  "bg-[radial-gradient(ellipse_at_center,var(--color-indigo-600)_0%,var(--color-indigo-500)_100%)]",
  "shadow-sm shadow-indigo-600/25 transition-[filter,transform] hover:brightness-110 active:translate-y-px",
  "focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
)

export const authSecondaryButtonClassName = cn(
  "inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background px-4",
  "text-sm font-medium transition-colors hover:bg-muted dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
  "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
)

export const authInlineLinkClassName =
  "font-medium text-foreground underline-offset-4 transition-colors hover:text-indigo-600 hover:underline dark:hover:text-indigo-400 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"

type AuthFormProps = {
  children: ReactNode
  className?: string
}

export function AuthForm({ children, className }: AuthFormProps) {
  return (
    <form
      noValidate
      onSubmit={(event) => event.preventDefault()}
      className={cn("flex flex-col gap-5", className)}
    >
      {children}
    </form>
  )
}
