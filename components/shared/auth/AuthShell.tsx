import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type AuthShellProps = {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export function AuthShell({
  title,
  description,
  children,
  footer,
  className,
}: AuthShellProps) {
  return (
    <div className="relative flex min-h-[calc(100svh-4.5rem)] items-center justify-center overflow-hidden px-4 py-10 sm:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-200 left-1/2 size-120 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15" />
        <div className="absolute right-1/4 bottom-0 size-72 rounded-full bg-fuchsia-500/10 blur-3xl dark:bg-fuchsia-500/10" />
      </div>

      <div className={cn("w-full max-w-md", className)}>
        <div className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-lg shadow-black/5 backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex flex-col gap-1.5">
            <h1 className="text-2xl font-semibold tracking-tight text-balance">
              {title}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          {children}
        </div>

        {footer && (
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
