<template>
  <UFormGroup>
    <USelectMenu
      v-model="selected"
      :option-value="valueSelector"
      :options="choices"
      :icon="icon"
      :placeholder="placeholder"
    >
      <template #label>
        <span v-if="selected">{{ formatLinkValue(selected) }}</span>
        <span
          v-else
          class="text-gray-500 italic"
        >{{ placeholder || '&nbsp;' }}</span>
      </template>
      <template #option="{ option }">
        <span>{{ formatLinkValue(option) }}</span>
      </template>
    </USelectMenu>
    <template #label="{ label }">
      {{ label }}
      <UIcon
        name="i-heroicons-arrow-uturn-left-16-solid"
        class="text-orange-800"
        @click="clearValue"
      />
    </template>
  </UFormGroup>
</template>

<script setup lang="ts">
// const inputModel = defineModel<string>();
const props = defineProps<{
  modelValue: any;
  icon?: string;
  placeholder?: string;
  link: any;
  // labelField?: string;
}>();
const emits = defineEmits(['update:modelValue']);
const selected = ref<any>(null);
const clearValue = () => {
  selected.value = null;
};

const { search, data: _data, status, error, formatLinkValue } = useLinkQuery(props.link, props.modelValue);
const choices = computed(() => {
  return (_data?.value || []) as any[];
});
const valueSelector = computed(() => {
  return props.link?.value || 'id';
});

watchEffect(() => {
  const matchedItem = choices.value?.find((item: any) => item[valueSelector.value] === props.modelValue);
  selected.value = matchedItem || null;
});

watch(selected, (value: any) => {
  if (value && typeof value === 'object' && valueSelector.value in value) {
    emits('update:modelValue', value[valueSelector.value]);
  } else {
    emits('update:modelValue', null);
  }
});
</script>