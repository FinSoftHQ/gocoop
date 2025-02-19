<template>
  <div>
    <FPartTitle
      icon="i-heroicons-pencil-square-20-solid"
      :actions
    >
      {{ title }}
    </FPartTitle>
    <FPartStepper
      :modelValue="pageDef.currentStepIndex"
      :steps="pageDef.steps?.steps"
      class="mb-4"
    ></FPartStepper>
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
      <template #buttons>
        <UButton type="submit">
          Next
        </UButton>
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
  loadDataHandler: (pageFunctions, pgId) => pageFunctions.localState.get(),
});
</script>
