<template>
  <div>
    <FPartTitle
      icon="i-heroicons-document"
      :actions
    >
      {{ title }}
    </FPartTitle>
    <div class="flex-column space-y-4">
      <FPartStepper
        :modelValue="pageDef.currentStepIndex"
        :steps="pageDef.steps?.steps"
      ></FPartStepper>
      <RealmCardView
        :pageId="pageDef.pageId"
        :initial="data"
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
      </RealmCardView>
      <FPartStepButtonsBar
        :showBackButton="pageDef.hasPrevPage"
        :enableSave
      >
        <UButton
          @click="onConfirm"
          :disabled="!enableSave"
        >
          Confirm
        </UButton>
      </FPartStepButtonsBar>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';

const props = defineProps<{
  pageId: PageIdParam,
}>()

const { pageDef, pageFunctions, title, actions, data, status, error, saveThenGoNextPage } = useRoleForEdit(props.pageId, {
  loadDataHandler: (pageFunctions, pgId) => {
    return pageFunctions.localState.get();
  },
  updateDataHandler: async (data, pageFunctions, pgId, routeId) => {
    return await pageFunctions.backendCaller.update(data);
  },
});

const enableSave = ref(true);
async function onConfirm() {
  try {
    enableSave.value = false;
    await saveThenGoNextPage(data.value);
    pageFunctions.localState.clear();
  } finally {
    enableSave.value = true;
  }
}

const resolver = useBaseComponentsResolver();
useComponentResolver(BuiltInResolvers(resolver).View);
</script>
