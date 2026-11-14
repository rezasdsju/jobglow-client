"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { formatCompactCount } from "@/lib/jobs/format"
import React from "react"

export type FilterOptionProps = {
  name: string
  value: string
  label: string
  count: number
  control?: "checkbox" | "radio"
  defaultChecked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * One filter row. The control is uncontrolled and never touches the query
 * string: checkboxes stay multi-select and radios are single-select within
 * their group. Wire the group handler when the filter behaviour is ready.
 */
export const FilterOption = ({
  name,
  value,
  label,
  count,
  control = "checkbox",
  defaultChecked,
  onChange,
}: FilterOptionProps) => {
  const id = `${name}-${value}`

  // Base UI renders a hidden native input. Attach the handler to that input so
  // callers can keep the familiar onChange(event) signature, which the Base UI
  // components themselves do not expose.
  const attachNativeChange = (input: HTMLInputElement | null) => {
    if (!input) return
    input.onchange = (event) =>
      onChange?.(event as unknown as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <div className="flex items-center gap-2.5">
      {control === "radio" ? (
        <RadioGroupItem id={id} value={value} inputRef={attachNativeChange} />
      ) : (
        <Checkbox
          id={id}
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          inputRef={attachNativeChange}
        />
      )}
      <label
        htmlFor={id}
        className="flex-1 cursor-pointer text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        {label}
      </label>
      <span className="text-xs text-muted-foreground tabular-nums">
        {formatCompactCount(count)}
      </span>
    </div>
  )
}
