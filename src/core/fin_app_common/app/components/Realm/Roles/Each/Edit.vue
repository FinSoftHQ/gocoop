<template>
  <div>
    <FPartTitle
      icon="i-heroicons-pencil-square-20-solid"
      :actions
    >
      {{ title }}
    </FPartTitle>
    <RealmCardEdit
      :pageId="pageDef.pageId"
      :initial="data"
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

const { pageDef, pageFunctions, title, actions, data, saveThenGoNextPage } = useRoleForEdit(props.pageId, {
  updateDataHandler: async (data, pageFunctions) => {
    const result = await pageFunctions.backendCaller.update(data);
    return result;
  },
});
</script>
