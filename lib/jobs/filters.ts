import type { IJob } from "@/types/jobTypes"

import { JOB_CATEGORIES, JOB_TYPES, JOB_WORK_MODES } from "./options"
import type { SearchParams } from "./search-params"
import { toArray } from "./search-params"

export type JobFilterOption = {
  value: string
  label: string
  count: number
  checked: boolean
}

export type JobFilterSelection = "single" | "multiple"

export type JobFilterGroup = {
  name: string
  title: string
  selection: JobFilterSelection
  options: JobFilterOption[]
}

type FilterOptionConfig = {
  value: string
  label: string
  matches: (job: IJob) => boolean
}

type FilterGroupConfig = {
  name: string
  title: string
  selection: JobFilterSelection
  options: FilterOptionConfig[]
}

const FILTER_GROUPS: FilterGroupConfig[] = [
  {
    name: "jobType",
    title: "Job Type",
    selection: "single",
    options: JOB_TYPES.map((type) => ({
      value: type.value,
      label: type.label,
      matches: (job) => job.jobType === type.value,
    })),
  },
  {
    name: "category",
    title: "Category",
    selection: "single",
    options: JOB_CATEGORIES.map((category) => ({
      value: category.value,
      label: category.label,
      matches: (job) => job.category === category.value,
    })),
  },
  {
    name: "isRemote",
    title: "Work Mode",
    selection: "multiple",
    options: JOB_WORK_MODES.map((mode) => ({
      value: mode.value,
      label: mode.label,
      matches: (job) => job.isRemote === mode.isRemote,
    })),
  },
]

export const buildJobFilterGroups = (
  jobs: IJob[],
  params: SearchParams
): JobFilterGroup[] =>
  FILTER_GROUPS.map((group) => {
    const selected = toArray(params[group.name])

    return {
      name: group.name,
      title: group.title,
      selection: group.selection,
      options: group.options.map((option) => ({
        value: option.value,
        label: option.label,
        count: jobs.filter(option.matches).length,
        checked: selected.includes(option.value),
      })),
    }
  })
