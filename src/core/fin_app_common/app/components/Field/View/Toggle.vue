<template>
  <EntityInfoField
    v-model="toggleText"
    as-is
  ></EntityInfoField>
</template>

<script setup lang="ts">
const inputModel = defineModel() as Ref<any>;
const props = defineProps<{
  yesLabel?: string;
  noLabel?: string;
}>();

const toggleText = computed(() => {
  return inputModel.value ? props.yesLabel || 'Yes' : props.noLabel || 'No';
});
</script>