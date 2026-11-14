"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { JOB_SORT_OPTIONS } from "@/lib/jobs/options"

const DEFAULT_SORT = "recent"

type JobSortSelectProps = {
  defaultValue?: string
}

/**
 * Sort picker. It keeps its own visual state and does not update the query
 * string until the sort behaviour is implemented.
 */
export const JobSortSelect = ({ defaultValue }: JobSortSelectProps) => {
  const isKnownSort = JOB_SORT_OPTIONS.some(
    (option) => option.value === defaultValue
  )

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Sort by:</span>
      <Select
        defaultValue={isKnownSort ? defaultValue : DEFAULT_SORT}
        items={JOB_SORT_OPTIONS}
      >
        <SelectTrigger
          className="w-32 bg-card/40 text-xs dark:bg-white/2"
          aria-label="Sort jobs"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {JOB_SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
