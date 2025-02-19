<template>
  <FPageContainer>
    <FPartHeader
      headline="สร้าง"
      :icon="icon || 'i-heroicons-home'"
    >{{ title }}
    </FPartHeader>

    <slot></slot>

  </FPageContainer>
</template>

<script setup lang="ts">
const _current_ctx_blueprint = setBlueprintContext({
  realm: 'create',
});
const moduleInfo = useContextualModuleInfo();
const title = moduleInfo.label;
const icon = moduleInfo.icon;
const resolver = useBaseComponentsResolver();
useComponentResolver(BuiltInResolvers(resolver).Edit);
</script>