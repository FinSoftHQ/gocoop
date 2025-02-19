<template>
  <FPageContainer>
    <FPartHeader
      headline="รายการ"
      :icon="icon || 'i-heroicons-home'"
    >{{ title }}
    </FPartHeader>

    <slot></slot>

  </FPageContainer>
</template>

<script setup lang="ts">
const _current_ctx_blueprint = setBlueprintContext({
  realm: 'list',
});
const moduleInfo = useContextualModuleInfo();
const title = moduleInfo.label;
const icon = moduleInfo.icon;
const resolver = useBaseComponentsResolver();
useComponentResolver(BuiltInResolvers(resolver).List);
</script>