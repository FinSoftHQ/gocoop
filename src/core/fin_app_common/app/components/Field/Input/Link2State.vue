<template>
  <RealmCardView
    :pageId="linkedPageId"
    :initial="data"
  ></RealmCardView>
</template>

<script setup lang="ts">
const inputModel = defineModel<string>();
const props = defineProps<{
  module?: string,
}>();

const linked = useLinkModule(props.module);
const linkedPageId = linked?.pageId || { realm: 'each', page: 'root' };
const selectedValue = linked?.selected || '';

const pageDef = usePageDefinition(linkedPageId);
const pageFunctions = usePageFunctions(pageDef);
const { data, status, error } = pageFunctions.backendCaller.get(inputModel.value || selectedValue);

if (!inputModel.value) {
  inputModel.value = selectedValue;
}
</script>