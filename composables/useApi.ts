import type { FetchOptions } from "ohmyfetch";

export const useApi = <T>(url: string, opts?: FetchOptions) => useAsyncData(
  url,
  () => $api<T>(url, opts)
)