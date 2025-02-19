<template>
  <UFormGroup>
    <UTextarea
      v-model="inputModel"
      :placeholder="placeholder"
    />
  </UFormGroup>
</template>

<script setup lang="ts">
const inputModel = defineModel() as Ref<any>;
const props = defineProps<{
  icon?: string;
  placeholder?: string;
}>();
</script>