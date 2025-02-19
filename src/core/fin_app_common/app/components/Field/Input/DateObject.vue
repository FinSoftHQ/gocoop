<template>
  <UFormGroup>
    <UPopover :popper="{ placement: 'bottom-start' }">
      <UButton
        icon="i-heroicons-calendar-days-20-solid"
        :label="dateLabel"
        color="white"
      />

      <template #panel="{ close }">
        <DatePicker
          v-model="selected"
          is-required
          @close="close"
        />
      </template>
    </UPopover>
  </UFormGroup>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

const props = defineProps<{
  modelValue?: Date;
  emptyLabel?: string;
}>();
const emits = defineEmits(['update:modelValue']);
const selected = ref<Date | undefined>(props.modelValue);
const dateLabel = computed<string>(() => selected.value ? format(new Date(selected.value), 'd MMM, yyy') : props.emptyLabel || 'Select date');

watch(selected, (value) => {
  emits('update:modelValue', value);
});
</script>