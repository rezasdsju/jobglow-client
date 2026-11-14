"use client"

import { RadioGroup } from "@/components/ui/radio-group"
import type { JobFilterGroup } from "@/lib/jobs/filters"
import { cn } from "@/lib/utils"

import { FilterOption } from "./FilterOption"
import { surfaceClassName } from "@/lib/jobs/surface"
import React from "react"
import { useRouter } from "next/navigation"

type JobFiltersProps = {
  groups: JobFilterGroup[]
}

/**
 * Filter sidebar built from the job fields. Job Type and Category are
 * single-select radio groups, while Work Mode stays multi-select. Changes are
 * logged only until the filter behaviour is wired up.
 */
export const JobFilters = ({ groups }: JobFiltersProps) => {
  const router = useRouter()
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target
    console.log("filter:", name, value, checked)
    const params = new URLSearchParams(window.location.search)
    params.set(name, event.target.value)
    router.push(`/browse-jobs?${params.toString()}`)
  }

  return (
    <aside className="h-fit">
      <div className={cn(surfaceClassName, "p-5")}>
        <h2 className="text-base font-semibold">Filters</h2>

        <div className="mt-5 flex flex-col gap-5">
          {groups
            .filter((group) => group.options.length > 0)
            .map((group) => (
              <section key={group.name} className="flex flex-col gap-2.5">
                <h3
                  id={`${group.name}-label`}
                  className="text-[13px] font-semibold"
                >
                  {group.title}
                </h3>

                {group.selection === "single" ? (
                  <RadioGroup
                    name={group.name}
                    defaultValue={
                      group.options.find((option) => option.checked)?.value
                    }
                    aria-labelledby={`${group.name}-label`}
                    className="gap-2.5"
                  >
                    {group.options.map((option) => (
                      <FilterOption
                        key={option.value}
                        control="radio"
                        name={group.name}
                        value={option.value}
                        label={option.label}
                        count={option.count}
                        onChange={handleFilterChange}
                      />
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    {group.options.map((option) => (
                      <FilterOption
                        key={option.value}
                        name={group.name}
                        value={option.value}
                        label={option.label}
                        count={option.count}
                        defaultChecked={option.checked}
                        onChange={handleFilterChange}
                      />
                    ))}
                  </div>
                )}
              </section>
            ))}
        </div>
      </div>
    </aside>
  )
}
