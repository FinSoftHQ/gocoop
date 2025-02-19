<template>
  <EntityInfoField
    :date-format="dateFormat"
  ></EntityInfoField>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  dateFormat?: string;
  // emptyLabel?: string;
}>(), { dateFormat: 'date' });
</script>