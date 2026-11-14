import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type JobDetailSectionProps = {
  title: string
  children: ReactNode
  /** Draws a separator above the section. */
  divider?: boolean
  className?: string
}

/** Titled block used for the description, responsibilities, and requirements. */
export const JobDetailSection = ({
  title,
  children,
  divider = false,
  className,
}: JobDetailSectionProps) => (
  <section className={cn(divider && "border-t border-border pt-6", className)}>
    <h2 className="text-base font-semibold">{title}</h2>
    <div className="mt-3 text-sm leading-6 text-muted-foreground">
      {children}
    </div>
  </section>
)
