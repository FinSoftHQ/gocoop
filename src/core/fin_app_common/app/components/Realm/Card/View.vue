<template>
  <UCard
    class="flex-1"
    :class="cardClass"
  >
    <slot
      :wrapped="{ data }"
      :entries="entries"
      :resolver="resolver"
    >
      <EntitySection
        v-if="!pageDef.component"
        v-model="data"
        :entries="entries"
        :resolver="resolver"
      ></EntitySection>
      <component
        v-else
        :is="viewComponent"
        v-model="data"
        :entries="entries"
        :resolver="resolver"
      ></component>
    </slot>
  </UCard>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';

const props = defineProps<{
  pageId: PageIdParam,
  initial?: any,
  noBorder?: boolean,
}>();

const pageDef = usePageDefinition(props.pageId);

const data = computed(() => props.initial || {});
const { fields } = useEntitySchema(pageDef);
const entries = ref(fields!);

const resolver = useComponentResolver();
const viewComponent = computed(() => resolver(pageDef.component || ''));

const cardClass = computed(() => ({
  'no-border': props.noBorder,
}));
</script>