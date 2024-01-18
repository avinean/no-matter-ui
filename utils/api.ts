import type { FetchOptions } from "ohmyfetch";

export const $api = <T>(url: string, opts?: FetchOptions) => {
  const token = useCookie('sraka');

  const headers: HeadersInit = {
    ...(opts?.headers || {}),
    ...(token && { Authorization: `Bearer ${token.value}` }),
  };

  return $fetch<T>(`/api${url}`, { ...opts, headers });
};