<template>
  <slot
    :wrapped="{ data }"
    :error="error"
    :columns="columns"
    :entries="entries"
    :resolver="resolver"
    :loading="status === 'pending'"
  >
    <EntityTable
      :data="data"
      :columns="columns"
      :entries="entries"
      :loading="status === 'pending'"
      @selectionChanged="select"
    ></EntityTable>
  </slot>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';

const props = defineProps<{
  pageId: PageIdParam,
}>();
const emits = defineEmits(['select']);

const pageDef = usePageDefinition(props.pageId);
const pageFunctions = usePageFunctions(pageDef);

const { data: list_data, status, error } = pageFunctions.backendCaller.list();
const data = computed(() => list_data.value as any[]);
const { fields } = useEntitySchema(pageDef);
const entries = ref(fields!);

const resolver = useComponentResolver();

// TODO: Make use of component and resolver
const columns = computed(() => {
  return entries.value
    .flat()
    .filter(entry => entry.component !== 'image')
    .map(entry => ({
      key: entry.model,
      label: entry.label
    })) || [{
      key: 'id',
      label: 'ID'
    }];
});
// const fallback_columns = computed(() => {
//   return data.value?.length !== 0 ? undefined: columns;
// });

function select(item: any) {
  emits('select', item);
}
</script>
