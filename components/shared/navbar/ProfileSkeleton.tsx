import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-1.5 rounded-xl p-1"
    >
      <Skeleton className="size-8 rounded-full" />
      <Skeleton className="size-4 rounded-sm" />
    </div>
  )
}
