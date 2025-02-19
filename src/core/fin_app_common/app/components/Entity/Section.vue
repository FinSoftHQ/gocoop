<template>
  <section class="space-y-4">
    <div
      v-for="(row, idxRow) in entityEntries"
      :key="idxRow"
      class="form-entry-row flex space-y-4 md:space-y-0 md:space-x-4 flex-col md:flex-row"
    >
      <div
        v-for="(fld, idxCol) in row"
        :key="idxCol"
        class="form-entry-col w-full"
      >

        <component
          v-if="!loading && fld && fld.model"
          :is="compResolver(fld.component)"
          :name="fld.model"
          :modelValue="getFieldData(fld).modelValue"
          @update:modelValue="getFieldData(fld).updateModel($event)"
          v-bind="fld"
        ></component>
        <slot
          v-else
          name="loading"
        >
          <div class="space-y-4">
            <USkeleton class="h-5 w-full" />
            <USkeleton class="h-5 w-full" />
          </div>
        </slot>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import type { DataDefinition, FieldDefinition } from '@finsoft/blueprint';

const props = defineProps<{
  entries: DataDefinition;
  modelValue: T;
  pending?: boolean;
  pick?: string[];
  resolver?: EntryComponentResolver;
}>();
const emits = defineEmits(["update:modelValue"]);
const pickFilter = props.pick ?? [];
const entityEntries = computed(() => {
  const _entityEntries = props.entries as FieldDefinition[][];
  return pickFilter.length === 0
    ? _entityEntries
    : _entityEntries.map(row => row.filter(fld => pickFilter.includes(fld.model))).filter(row => row.length > 0);
});
const loading = computed(() => props.pending ?? false);

const compResolver = useComponentResolver(props.resolver);

const getFieldData = computed(() => (fld: FieldDefinition) => {
  return {
    modelValue: !!props.modelValue ? props.modelValue[fld.model] : '',
    updateModel: (value: any) => (<any>props.modelValue[fld.model]) = value,
  };
});
</script>