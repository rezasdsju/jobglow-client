const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
})

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30 * DAY
const YEAR = 365 * DAY

/** Formats an ISO timestamp as "2 days ago", "just now", etc. */
export const formatRelativeTime = (isoDate: string) => {
  const date = new Date(isoDate)

  if (Number.isNaN(date.getTime())) return "—"

  const diff = date.getTime() - Date.now()
  const absolute = Math.abs(diff)

  if (absolute < MINUTE) return "just now"
  if (absolute < HOUR)
    return relativeTimeFormatter.format(Math.round(diff / MINUTE), "minute")
  if (absolute < DAY)
    return relativeTimeFormatter.format(Math.round(diff / HOUR), "hour")
  if (absolute < WEEK)
    return relativeTimeFormatter.format(Math.round(diff / DAY), "day")
  if (absolute < MONTH)
    return relativeTimeFormatter.format(Math.round(diff / WEEK), "week")
  if (absolute < YEAR)
    return relativeTimeFormatter.format(Math.round(diff / MONTH), "month")

  return relativeTimeFormatter.format(Math.round(diff / YEAR), "year")
}

/** Formats an ISO timestamp as a short, readable date. */
export const formatApplicationDate = (isoDate: string) => {
  const date = new Date(isoDate)

  if (Number.isNaN(date.getTime())) return "—"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}
