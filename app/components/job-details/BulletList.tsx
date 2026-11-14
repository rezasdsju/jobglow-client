import { cn } from "@/lib/utils"

type BulletListProps = {
  items: string[]
  className?: string
}

/** Dotted list used for responsibilities and qualifications. */
export const BulletList = ({ items, className }: BulletListProps) => {
  if (items.length === 0) return null

  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span
            className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/50"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
