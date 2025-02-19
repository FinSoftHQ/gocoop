<template>
  <UFormGroup>
    <UTextarea
      v-model="inputModel"
      :placeholder="emptyLabel || ' '"
      :padded="false"
      variant="none"
      :disabled="true"
    />
  </UFormGroup>
</template>

<script setup lang="ts">
const inputModel = defineModel() as Ref<any>;
const props = defineProps<{
  icon?: string;
  emptyLabel?: string;
}>();
</script>