<template>
  <UTable
    v-model="selected"
    :rows="data ?? []"
    :loading="loading"
    :columns="columns"
    @select="select"
  >
    <template
      v-if="caption"
      #caption
    >
      <caption>{{ caption }}</caption>
    </template>
    <template
      v-for="(column, _index) in templateColumns"
      :key="column.label"
      v-slot:[`${column.key}-data`]="{ row }"
    >
      <slot
        :name="`${column.key}-data`"
        :row="row"
        :column="column"
      >
        {{ column.formatDisplay ? column.formatDisplay(row[column.key]) : row[column.key] }}
      </slot>
    </template>
    <template #row-actions-data="{ row }">
      <slot>
        <UIcon name="i-heroicons-arrow-top-right-on-square-16-solid" />
      </slot>
    </template>
  </UTable>
</template>

<script setup lang="ts" generic="T extends { id: any, [key: string]: any }">
import type { TableColumn } from '#ui/types';
import type { DataDefinition } from '@finsoft/blueprint';

const selected = defineModel<T[] | undefined>({
  default: undefined,
});
const props = defineProps<{
  data: T[],
  loading?: boolean,
  caption?: string,
  columns?: TableColumn[],
  entries?: DataDefinition;
}>();
const emits = defineEmits(['selectionChanged']);

const templateColumns = computed(() => {
  const _entries = props.entries?.flat();
  const _columns = _entries && _entries.length > 0 ? (props.columns ?? []) : [];
  return _columns.filter(column => column.key !== 'row-actions').map(column => {
    const entry = _entries?.find(entry => entry.model === column.key);
    let options;
    switch (entry?.component) {
      case 'number':
        options = { digit: 2 };
        break;
      case 'date':
        options = { dateFormat: 'date' };
        break;
      case 'radio':
      case 'select':
        options = { choices: entry.choices };
        break;
      case 'link2multisearch':
        options = {};
        break;
      case 'text':
      default:
        options = { asIs: true };
        break;
    }
    const { formatDisplay } = useDisplayField(options);
    return entry ? { ...entry, ...column, formatDisplay } : column;
  });
});

function select(row: T) {
  if (!selected.value) {
    emits('selectionChanged', row);
    return;
  }

  const index = selected.value!.findIndex((item) => item.id === row.id)
  if (index === -1) {
    selected.value!.push(row)
  } else {
    selected.value!.splice(index, 1)
  }
  emits('selectionChanged', row);
}
</script>