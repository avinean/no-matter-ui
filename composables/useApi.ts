import type { FetchOptions } from 'ohmyfetch'

export function useApi<T>(url: string, opts?: FetchOptions) {
  return useAsyncData(
    url,
    () => $api<T>(url, opts),
  )
}
