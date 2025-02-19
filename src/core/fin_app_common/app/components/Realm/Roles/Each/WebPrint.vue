<template>
  <div>
    <FPartTitle
      icon="i-heroicons-document"
    >
      {{ title }}
    </FPartTitle>

    <FWebPrint :actions="actions">
      <RealmCardView
        :pageId="pageDef.pageId"
        :initial="data"
        no-border
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
    </FWebPrint>
  </div>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';

const props = defineProps<{
  pageId: PageIdParam,
}>()

const { pageDef, pageFunctions, title, actions, data, status, error } = useRoleForView(props.pageId);
</script>
