export type PageItem = number | "ellipsis"

/**
 * Builds the page buttons shown by a paginator, collapsing long ranges into
 * ellipses, e.g. [1, "ellipsis", 7, 8, 9, "ellipsis", 20].
 */
export const getPageItems = (page: number, totalPages: number): PageItem[] => {
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
