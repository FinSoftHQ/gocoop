<template>
  <UFormGroup>
    <USelectMenu
      v-model="selected"
      :options="choices"
      :icon="icon"
      :placeholder="placeholder"
    >
    </USelectMenu>
    <template #label="{ label }">
      {{ label }}
      <UIcon
        name="i-heroicons-arrow-uturn-left-16-solid"
        class="text-purple-500"
        @click="clearValue"
      />
    </template>
  </UFormGroup>
</template>

<script setup lang="ts">
import type { ChoiceListArrayDefinition } from '@finsoft/blueprint';

// const inputModel = defineModel<string>();
const props = defineProps<{
  modelValue: any;
  icon?: string;
  placeholder?: string;
  choices?: ChoiceListArrayDefinition;
  labelField?: string;
  valueField?: string;
}>();
const emits = defineEmits(['update:modelValue']);
const selected = ref<any>(null);
const clearValue = () => {
  selected.value = null;
};
const valueSelector = props.valueField || 'value';

function setInputValue(value: any) {
  const matchedItem = props.choices?.find((item: any) => item[valueSelector] === value);
  selected.value = matchedItem || null;
}

watch(() => props.modelValue, (value: any) => {
  setInputValue(value);
});
setInputValue(props.modelValue);

watch(selected, (value: any) => {
  if (value && typeof value === 'object' && valueSelector in value) {
    emits('update:modelValue', value[valueSelector]);
  } else {
    emits('update:modelValue', null);
  }
});
</script>