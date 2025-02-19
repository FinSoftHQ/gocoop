<template>
  <UFormGroup>
    <span>
      <UIcon v-if="props.icon" :name="props.icon" class="mr-2" />
      <UToggle v-model="inputModel" />
      {{ toggleText }}
    </span>
  </UFormGroup>
</template>

<script setup lang="ts">
const inputModel = defineModel() as Ref<any>;
const props = defineProps<{
  icon?: string;
  yesLabel?: string;
  noLabel?: string;
}>();

const toggleText = computed(() => {
  return inputModel.value ? props.yesLabel || 'Yes' : props.noLabel || 'No';
});
</script>