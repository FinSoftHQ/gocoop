<template>
  <EntityInfoField
    v-model="selected"
    as-is
  ></EntityInfoField>
</template>

<script setup lang="ts">
// const inputModel = defineModel<string>();
const props = defineProps<{
  modelValue: any;
  icon?: string;
  placeholder?: string;
  link: any;
  emptyLabel?: string;
  labelField?: string;
}>();
const emits = defineEmits(['update:modelValue']);
const selected = ref<any>(null);

const { get, formatLinkValue } = useLinkQuery(props.link, props.modelValue);
const optionLabel = computed(() => {
  // TODO: props.link.labels should be an array of strings, check the definition for this again
  const labels = props.link?.labels || ['name'];
  return labels[0];
});
const linkid = computed(() => props.modelValue);
const { data: _data, status, error } = get(linkid);

watchEffect(() => {
  const matchedItem = _data.value as any;
  selected.value = matchedItem ? formatLinkValue(matchedItem, props.emptyLabel) : props.emptyLabel || '';
});
</script>