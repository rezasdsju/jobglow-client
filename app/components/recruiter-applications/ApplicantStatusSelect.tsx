"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  APPLICATION_STATUS_META,
  RECRUITER_APPLICATION_STATUSES,
  isApplicationStatus,
} from "@/lib/applications/status"
import { cn } from "@/lib/utils"
import type { ApplicationStatus } from "@/types/applicationTypes"

type ApplicantStatusSelectProps = {
  applicantName: string
  status: ApplicationStatus
  onChange: (status: ApplicationStatus) => void
  className?: string
}

const STATUS_ITEMS = RECRUITER_APPLICATION_STATUSES.map((value) => ({
  value,
  label: APPLICATION_STATUS_META[value].label,
}))

/**
 * Dropdown used by recruiters to move an applicant through the hiring
 * workflow. The parent owns the status value so the table stays in sync.
 */
export const ApplicantStatusSelect = ({
  applicantName,
  status,
  onChange,
  className,
}: ApplicantStatusSelectProps) => (
  <Select
    items={STATUS_ITEMS}
    value={status}
    onValueChange={(value) => {
      if (isApplicationStatus(value)) onChange(value)
    }}
  >
    <SelectTrigger
      size="sm"
      aria-label={`Update application status for ${applicantName}`}
      className={cn("w-full sm:w-40", className)}
    >
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {RECRUITER_APPLICATION_STATUSES.map((option) => (
        <SelectItem key={option} value={option}>
          {APPLICATION_STATUS_META[option].label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)
