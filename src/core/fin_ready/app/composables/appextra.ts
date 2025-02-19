export function useAppExtraRolesAndComponents() {
  const extraComponents = ExtraRolesAndComponents.Components;
  const fallableResolver = createComponentResolver(extraComponents);
  useBaseComponentsResolver(fallableResolver);
  useBaseRoles(ExtraRolesAndComponents.Roles);
}