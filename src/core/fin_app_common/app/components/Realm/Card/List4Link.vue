<template>
  <slot
    :wrapped="{ data }"
    :error="error"
    :loading="status === 'pending'"
    :columns="columns"
    :entries="entries"
    :formatLinkValue="formatLinkValue"
  >
    <EntityTable
      :data="data"
      :loading="status === 'pending'"
      :columns="columns"
      :entries="entries"
      @selectionChanged="select"
    ></EntityTable>
  </slot>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';

const dataLink = defineModel();
const props = defineProps<{
  link: EntityLink,
  searchTerm?: string,
}>();
const emits = defineEmits(['select']);

// const pageDef = usePageDefinition(props.pageId);
// const pageFunctions = usePageFunctions(pageDef);

// const { data: list_data, status, error } = pageFunctions.backendCaller.list();
// const data = computed(() => list_data.value as any[]);
// const { fields } = useEntitySchema(pageDef);
// const entries = ref(fields!);

// const resolver = useComponentResolver();

const { formatLinkValue, searchText, data, status, error, columns, entries } = useLinkQuery(props.link, dataLink);

function select(itempTap: any) {
  emits('select', item);
}
</script>
