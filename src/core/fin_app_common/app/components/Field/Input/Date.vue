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
  modelValue?: string;
  emptyLabel?: string;
}>();
const emits = defineEmits(['update:modelValue']);
const selected = ref<Date | undefined>(stringToDate8(props.modelValue));
const dateLabel = computed<string>(() => selected.value ? format(new Date(selected.value), 'd MMM, yyy') : props.emptyLabel || 'Select date');

watch(selected, (value) => {
  const date8 = value ? date8ToString(value) : '';
  emits('update:modelValue', date8);
});

watch(() => props.modelValue, (value) => {
  selected.value = stringToDate8(value);
});
</script>