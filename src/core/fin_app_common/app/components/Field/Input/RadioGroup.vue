<template>
  <URadioGroup
    v-model="inputModel"
    :options="choices"
    :legend="label"
  />
</template>

<script setup lang="ts">
import type { ChoiceListArrayDefinition } from '@finsoft/blueprint';

const inputModel = defineModel<string>();
const props = defineProps<{
  icon?: string;
  label?: string;
  placeholder?: string;
  choices?: ChoiceListArrayDefinition;
}>();
</script>