<template>
  <div>
    <FPartTitle
      icon="i-heroicons-numbered-list"
    >{{ title }}</FPartTitle>

    <FPartTabsBar
      v-if="pageDef.tabs"
      :tabs="pageDef.tabs"
    ></FPartTabsBar>

    <FWebPrint :actions="barActions">
      <RealmCardList
        :pageId="pageDef.pageId"
        @select="select"
      >
        <template
          v-if="$slots.default"
          #default="{ wrapped, error, loading, columns, entries, resolver }"
        >
          <slot
            :wrapped
            :error
            :loading
            :columns
            :entries
            :resolver
          ></slot>
        </template>
      </RealmCardList>
    </FWebPrint>
  </div>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';

const props = defineProps<{ pageId: PageIdParam }>();
const { pageDef, title, barActions, titleActions, select } = useRoleForList(props.pageId);
</script>
