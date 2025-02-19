<template>
  <UHorizontalNavigation :links />
</template>

<script setup lang="ts">
const props = defineProps<{
  tabs: NavigableItem[],
  actions?: NavigableItem[],
}>();

const links = computed(() => props.actions?.length ? [props.tabs, props.actions] : props.tabs);
</script>