import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

type JobPaginationProps = {
  page: number
  totalPages: number
}

type PageItem = number | "ellipsis"

const getPageItems = (page: number, totalPages: number): PageItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((item) => item >= 1 && item <= totalPages)
    .sort((a, b) => a - b)

  const items: PageItem[] = []

  pages.forEach((item, index) => {
    const previous = pages[index - 1]
    if (previous && item - previous > 1) items.push("ellipsis")
    items.push(item)
  })

  return items
}

/**
 * Presentational pagination. The buttons do not navigate yet; the current page
 * is read from the search params by the page component.
 */
export const JobPagination = ({ page, totalPages }: JobPaginationProps) => {
  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="Job pagination"
      className="mt-5 flex items-center justify-center gap-1"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Previous page"
        disabled={page === 1}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </Button>

      {getPageItems(page, totalPages).map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-1 text-xs text-muted-foreground"
          >
            …
          </span>
        ) : (
          <Button
            key={item}
            type="button"
            variant={item === page ? "default" : "ghost"}
            size="icon-sm"
            aria-label={`Page ${item}`}
            aria-current={item === page ? "page" : undefined}
            className={item === page ? "font-semibold" : undefined}
          >
            {item}
          </Button>
        )
      )}

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label="Next page"
        disabled={page === totalPages}
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </Button>
    </nav>
  )
}
