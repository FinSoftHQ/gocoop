import type { UseFetchOptions } from 'nuxt/app';

export function useApiFetch<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>
) {
  const tweakOptions = {
    lazy: true,
    default: () => (Array.isArray(options?.default) ? [] : {}) as unknown as T,
    ...options,
  };
  const finalOptions = {
    ...tweakOptions,
    $fetch: useNuxtApp().$api as typeof $fetch,
  } as UseFetchOptions<T>;
  return useFetch(url, finalOptions);
}
