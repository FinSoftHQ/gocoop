<template>
  <FItemGrid col="x4">
    <UPageCard
      v-for="(menu, index) in menuItems"
      :key="index"
      class="text-red-500"
      v-bind="menu"
    >
    </UPageCard>
  </FItemGrid>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';

const props = defineProps<{
  pageId: PageIdParam,
  modelValue?: NavigableItem[],
}>()

const { pageDef, pageFunctions, title, actions, data, status, error } = useRoleForView(props.pageId);
const menuItems = computed(() => props.modelValue ?? actions.value ?? []);
</script>
