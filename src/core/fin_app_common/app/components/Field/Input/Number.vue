<template>
  <UFormGroup>
    <UInput v-model="inputModel"
      type="number"
      :icon="icon"
      :placeholder="placeholder" />
  </UFormGroup>
</template>

<script setup lang="ts">
const inputModel = defineModel();
const props = defineProps<{
  icon?: string;
  placeholder?: string;
}>();
</script>