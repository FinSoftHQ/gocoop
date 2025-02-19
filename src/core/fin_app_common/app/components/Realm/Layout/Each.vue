<template>
  <FPageContainer>
    <FPartHeader
      headline="ข้อมูล"
      :icon="icon || 'i-heroicons-home'"
    >{{ title }}
    </FPartHeader>

    <slot></slot>

  </FPageContainer>
</template>

<script setup lang="ts">
const _current_ctx_blueprint = setBlueprintContext({
  realm: 'each',
});
const moduleInfo = useContextualModuleInfo();
const title = moduleInfo.label;
const icon = moduleInfo.icon;
const resolver = useBaseComponentsResolver();
useComponentResolver(BuiltInResolvers(resolver).View);
</script>