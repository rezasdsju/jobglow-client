"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { surfaceClassName } from "@/lib/jobs/surface"
import { useRouter } from "next/navigation"

type JobSearchBarProps = {
  defaultValue?: string
}

/**
 * Search card. Submitting only prevents the native form submit; the query is
 * left untouched until the search behaviour is implemented.
 */
export const JobSearchBar = ({ defaultValue = "" }: JobSearchBarProps) => {
  const router = useRouter()
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    // console.log(data)
    const search = data.search
    // console.log(search)

    const params = new URLSearchParams()
    params.set("search", search as string)
    router.push(`/browse-jobs?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={cn(
        surfaceClassName,
        "flex flex-col gap-2 p-2 sm:flex-row sm:items-center"
      )}
    >
      <div className="relative flex flex-1 items-center">
        <Search
          className="pointer-events-none absolute left-3 size-4 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          name="search"
          type="search"
          defaultValue={defaultValue}
          placeholder="Search by job title, keywords..."
          aria-label="Search jobs"
          className="h-10 border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0 dark:bg-transparent"
        />
      </div>

      <Button type="submit" className="h-10 shrink-0 px-6">
        Search Jobs
      </Button>
    </form>
  )
}
