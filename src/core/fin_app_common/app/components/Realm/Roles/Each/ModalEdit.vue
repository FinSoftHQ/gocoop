<template>
  <UModal
    v-model="shouldOpen"
    @after-leave="$router.back()"
  >
    <UCard>
      <template #header>
        {{ title }}
      </template>
      <RealmCardEdit
        :pageId="pageDef.pageId"
        :initial="data"
        :showBackButton="pageDef.hasPrevPage"
        @save="onSave"
      >
        <template #default="{ entries, resolver }">
          <slot
            :wrapped="{ data }"
            :entries
            :resolver
          >
            <EntitySection
              v-model="data"
              :entries="entries"
              :resolver="resolver"
            ></EntitySection>
          </slot>
        </template>
      </RealmCardEdit>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';

const props = defineProps<{
  pageId: PageIdParam,
}>()

const { pageDef, pageFunctions, title, data } = useRoleForEdit(props.pageId);
const shouldOpen = ref(true);

async function onSave(payload: any) {
  await pageFunctions.backendCaller.update(payload);
  shouldOpen.value = false;
}
</script>
