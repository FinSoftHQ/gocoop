<template>
  <UFormGroup>
    <UInput v-model="inputModel"
      :icon="icon"
      :placeholder="placeholder" />
  </UFormGroup>
</template>

<script setup lang="ts">
const inputModel = defineModel() as Ref<any>;
const props = defineProps<{
  icon?: string;
  placeholder?: string;
}>();
</script>