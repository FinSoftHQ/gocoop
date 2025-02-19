import type { NavItem, ParsedContent } from '@nuxt/content';

export function setupAppNavigation(navigation: Ref<NavItem[]>, headlinks: any[], footers: any[]) {
  const { data: files } = useLazyFetch<ParsedContent[]>(
    '/api/content-search.json',
    { default: () => [], server: false }
  );

  provide('navigation', navigation);

  const links = headlinks;
  
  provide('app-links', links)
  provide('app-footers', footers)  

  return files;
}
