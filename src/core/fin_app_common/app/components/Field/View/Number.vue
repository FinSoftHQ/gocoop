<template>
  <EntityInfoField :digit="digit"></EntityInfoField>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  digit?: number;
}>(), {
  digit: 2,
});
</script>