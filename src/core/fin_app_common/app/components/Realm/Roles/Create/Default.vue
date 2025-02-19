<template>
  <div>
    <FPartTitle
      icon="i-heroicons-document-plus"
      :actions
    >{{ title }}</FPartTitle>
    <RealmCardEdit
      :pageId="pageDef.pageId"
      :showBackButton="pageDef.hasPrevPage"
      @save="saveThenGoNextPage"
    >
      <template
        v-if="$slots.default"
        #default="{ wrapped, entries, resolver }"
      >
        <slot
          :wrapped
          :entries
          :resolver
        ></slot>
      </template>
    </RealmCardEdit>
  </div>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';

const props = defineProps<{
  pageId: PageIdParam,
}>()
const { pageDef, pageFunctions, title, actions, data, status, error, saveThenGoNextPage } = useRoleForEdit(props.pageId, {
  loadDataHandler: (pageFunctions) => {
    return { data: ref({}), status: ref('success'), error: ref(null) };
  },
  updateDataHandler: async (data, pageFunctions) => {
    const result = await pageFunctions.backendCaller.update(data);
    return result;
  },
});
</script>
