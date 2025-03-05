<template>
  <div>
    <FPartTitle
      icon="i-heroicons-pencil-square-20-solid"
      :actions
    >
      {{ title }}
    </FPartTitle>
    <FTakePhoto
      class="h-80"
      @photoTaken="onSave"
    ></FTakePhoto>

    <!-- <RealmCardView
      :pageId="pageDef.pageId"
      :initial="data"
      :showBackButton="pageDef.hasPrevPage"
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
    </RealmCardView> -->
  </div>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';

const props = defineProps<{
  pageId: PageIdParam,
}>()

const { pageDef, pageFunctions, title, actions, data, status, error, saveThenGoNextPage } = await useRoleForEdit(props.pageId, {
  loadDataHandler: async (pageFunctions) => {
    const result = await pageFunctions.backendCaller.get();
    return { data: ref(result), status: ref('success'), error: ref(null) };
  },
  updateDataHandler: async (data, pageFunctions) => {
    const result = await pageFunctions.backendCaller.update(data);
    return result;
  },
});

async function onSave(data: any) {
  const dataEntries = [pageDef.pageId.page, data];
  const dataToSave = Object.fromEntries([dataEntries]);
  return await saveThenGoNextPage(dataToSave);
}
</script>
