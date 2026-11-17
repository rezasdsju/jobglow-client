/** Initials shown in a user avatar when there is no profile image. */
export const getUserInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase() || "?"

/** Formats an ISO timestamp as the account join date, e.g. "Nov 16, 2026". */
export const formatJoinedDate = (isoDate: string) => {
  const date = new Date(isoDate)

  if (Number.isNaN(date.getTime())) return "—"

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}
