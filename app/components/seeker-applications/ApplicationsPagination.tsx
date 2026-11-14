"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getPageItems } from "@/lib/pagination"

type ApplicationsPaginationProps = {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
  onPageChange: (page: number) => void
}

/**
 * Footer for the applications table. The parent owns the page state so the
 * pagination resets when the Active/Archived tab changes.
 */
export const ApplicationsPagination = ({
  page,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
}: ApplicationsPaginationProps) => {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalItems)

  return (
    <div className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {start}–{end}
        </span>{" "}
        of <span className="font-medium text-foreground">{totalItems}</span>{" "}
        {totalItems === 1 ? "application" : "applications"}
      </p>

      {totalPages > 1 && (
        <nav
          aria-label="Applications pagination"
          className="flex items-center gap-1"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
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
                onClick={() => onPageChange(item)}
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
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </nav>
      )}
    </div>
  )
}
