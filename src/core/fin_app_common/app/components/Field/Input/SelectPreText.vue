<template>
  <UFormGroup>
    <USelectMenu
      v-model="selected"
      :options="choices"
      :icon="icon"
      :placeholder="placeholder"
      searchable
      creatable
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
  modelValue?: string;
  icon?: string;
  placeholder?: string;
  choices?: ChoiceListArrayDefinition;
  labelField?: string;
  // valueField?: string;
}>();
const emits = defineEmits(['update:modelValue']);
const selected = ref<string>();
const selectedLabel = computed({
  get: () => selected.value,
  set: (value) => {
    if (value && !choices.value.includes(value)) {
      customTexts.value.push(value);
    }
    setInputValue(value);
  },
});
const clearValue = () => {
  selected.value = undefined;
};
const labelSelector = props.labelField || 'label';
// const valueSelector = props.valueField || 'value';
const customTexts = ref<string[]>([]);
const choices = computed(() => {
  const predefinedChoices = (props.choices || []).map((item: any) => item[labelSelector]);
  return [...customTexts.value, ...predefinedChoices];
});

function setInputValue(value?: string) {
  selected.value = value;
}

watch(() => props.modelValue, (value: any) => {
  setInputValue(value);
});
setInputValue(props.modelValue);

watch(selected, (value?: string) => {
  emits('update:modelValue', value);
});
</script>