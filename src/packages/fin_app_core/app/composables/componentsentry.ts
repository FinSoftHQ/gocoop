/**
 * Type definition for the component resolver function.
 * Resolves component names to objects.
 *
 * @param componentName - The name of the component to resolve.
 * @returns The resolved component object.
 */
export type EntryComponentResolver = (componentName: string) => object;

/**
 * Creates a component resolver function that resolves component names to objects.
 *
 * @param componentsMap - A record of component names and their corresponding objects.
 * @param fallback - A fallback component resolver function to be used if a component is not found in the components map.
 * @returns The component resolver function.
 */
export function createComponentResolver(
  componentsMap: Record<string, object>,
  fallback?: EntryComponentResolver
): EntryComponentResolver {
  return (componentName: string) =>
    componentsMap[componentName] ??
    (!fallback ? (null as unknown as object) : fallback(componentName));
}

export function chainComponentResolver(
  ...resolvers: EntryComponentResolver[]
): EntryComponentResolver {
  return (componentName: string) => {
    for (const resolver of resolvers) {
      const component = resolver(componentName);
      if (component) return component;
    }

    return {};
  };
}

const KEY_COMPONENT_RESOLVER = 'active-component-resolver';
/**
 * Provides a component resolver function to be used by other components.
 * If a resolver function is provided, it will be used. Otherwise, it will try to inject a resolver function from the component hierarchy.
 *
 * @param resolver - An optional component resolver function.
 * @returns The resolved component resolver function.
 */
export function useComponentResolver(resolver?: EntryComponentResolver) {
  if (!!resolver) {
    provide(KEY_COMPONENT_RESOLVER, resolver);
    return resolver;
  }

  const activeResolver = inject(
    KEY_COMPONENT_RESOLVER
  ) as EntryComponentResolver;

  return activeResolver;
}

const KEY_BASE_COMPONENTS_RESOLVER = 'base-components-resolver';
/**
 * Provides a component resolver function that resolves component names to objects.
 * If a resolver function is provided, it will be used. Otherwise, it will try to inject a resolver function from the component hierarchy.
 *
 * @param resolver - An optional component resolver function.
 * @returns The resolved component resolver function.
 */
export function useBaseComponentsResolver(resolver?: EntryComponentResolver) {
  if (!!resolver) {
    provide(KEY_BASE_COMPONENTS_RESOLVER, resolver);
    return resolver;
  }

  const activeResolver: EntryComponentResolver | undefined = inject(
    KEY_BASE_COMPONENTS_RESOLVER
  );

  return activeResolver;
}

const KEY_BASE_ROLES = 'base-roles';
export function useBaseRoles(rolesMap?: Record<string, any>) {
  if (!!rolesMap) {
    provide(KEY_BASE_ROLES, rolesMap);
    return rolesMap;
  }

  const activeRoles: Record<string, any> | undefined = inject(
    KEY_BASE_ROLES,
    {}
  );
  return activeRoles;
}
