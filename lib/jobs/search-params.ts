export type SearchParams = Record<string, string | string[] | undefined>

export const getParam = (params: SearchParams, key: string) => {
  const value = params[key]
  return Array.isArray(value) ? value[0] : value
}

export const toArray = (value: string | string[] | undefined) => {
  if (value === undefined) return []
  return Array.isArray(value) ? value : [value]
}

export const toQueryString = (params: SearchParams) => {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    for (const item of toArray(value)) {
      if (item) query.append(key, item)
    }
  }

  return query.toString()
}
