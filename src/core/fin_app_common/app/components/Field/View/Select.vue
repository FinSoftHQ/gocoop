<template>
  <EntityInfoField
    v-model="selected"
    as-is
  ></EntityInfoField>
</template>

<script setup lang="ts">
import type { ChoiceListArrayDefinition } from '@finsoft/blueprint';

// const inputModel = defineModel<string>();
const props = defineProps<{
  modelValue: any;
  icon?: string;
  placeholder?: string;
  choices?: ChoiceListArrayDefinition;
  empty?: string;
  labelField?: string;
  valueField?: string;
}>();
const emits = defineEmits(['update:modelValue']);
const selected = ref<string>();
const clearValue = () => {
  selected.value = undefined;
};
const labelSelector = props.labelField || 'label';
const valueSelector = props.valueField || 'value';

function setInputValue(value: any) {
  const matchedItem: any = props.choices?.find((item: any) => item[valueSelector] === value);
  selected.value = matchedItem ? matchedItem[labelSelector] : props.empty || '';
}

watch(() => props.modelValue, (value: any) => {
  setInputValue(value);
});
setInputValue(props.modelValue);
</script>