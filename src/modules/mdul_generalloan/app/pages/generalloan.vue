<template>
  <FAppModuleLayout>
    <NuxtPage />
  </FAppModuleLayout>
</template>

<script setup lang="ts">
const _current_ctx_blueprint = setBlueprintContext({
  module: 'generalloan',
  realm: 'list',
}, true);

const resolver = useComponentResolver();
useComponentResolver(BuiltInResolvers(resolver).List);
</script>