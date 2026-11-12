"use client"

import { useState } from "react"
import { BriefcaseBusiness, ShieldCheck, UserSearch } from "lucide-react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

const roleOptions = [
  {
    value: "seeker",
    label: "Seeker",
    description: "Find a job",
    icon: UserSearch,
  },
  {
    value: "recruiter",
    label: "Recruiter",
    description: "Hire talent",
    icon: BriefcaseBusiness,
  },
  {
    value: "admin",
    label: "Admin",
    description: "Manage site",
    icon: ShieldCheck,
  },
]

export default function SelectUserRole() {
  const [role, setRole] = useState("")

  return (
    <RadioGroup
      name="role"
      value={role}
      onValueChange={setRole}
      className="mt-2 flex w-full flex-row gap-2 sm:gap-3"
    >
      {roleOptions.map((option) => {
        const Icon = option.icon
        const isSelected = role === option.value

        return (
          <label
            key={option.value}
            htmlFor={`role-${option.value}`}
            data-selected={isSelected}
            className={cn(
              "group relative flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-2 rounded-xl border bg-card px-2 py-3.5 text-center transition-[background-color,border-color,box-shadow,transform] duration-200 select-none",
              "has-focus-visible:ring-2 has-focus-visible:ring-indigo-500/40 has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background",
              isSelected
                ? "border-indigo-500 bg-indigo-50 shadow-sm ring-1 shadow-indigo-600/10 ring-indigo-500/20 dark:border-indigo-400/60 dark:bg-indigo-500/10 dark:ring-indigo-400/20"
                : "border-border hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-muted/50 dark:hover:border-indigo-500/40"
            )}
          >
            <RadioGroupItem
              id={`role-${option.value}`}
              value={option.value}
              className="absolute top-2 right-2 size-3.5"
            />

            <span
              className={cn(
                "flex size-8 items-center justify-center rounded-lg transition-colors",
                isSelected
                  ? "bg-indigo-500 text-white shadow-sm shadow-indigo-600/30"
                  : "bg-muted text-muted-foreground group-hover:bg-indigo-500/10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
            </span>

            <span className="flex min-w-0 flex-col gap-0.5">
              <span
                className={cn(
                  "truncate text-xs font-medium",
                  isSelected
                    ? "text-indigo-700 dark:text-indigo-200"
                    : "text-foreground"
                )}
              >
                {option.label}
              </span>
              <span className="hidden text-[10px] leading-tight text-muted-foreground sm:block">
                {option.description}
              </span>
            </span>
          </label>
        )
      })}
    </RadioGroup>
  )
}
