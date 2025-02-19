<template>
  <div class="relative py-4">
    <div class="flex flex-col lg:flex-row items-center gap-2">
      <div
        v-if="icon"
        class="flex"
      >
        <UIcon
          :name="icon"
          class="w-5 h-5 flex-shrink-0 text-primary"
        />
      </div>
      <div class="flex-1">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <h1 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
            <slot></slot>
          </h1>
          <div
            v-if="actions"
            class="flex flex-wrap items-center gap-1.5 mt-4 lg:mt-0"
          >
            <UButton
              v-for="(abtn, idx) in barActions"
              :key="idx"
              v-bind="{ ...abtn, color: abtn.color as ButtonColor || 'white', target: abtn.target ?? undefined }"
              @click="(abtn.click ?? (() => { }))()"
            ></UButton>
            <UDropdown v-if="dropActions?.length > 0" :items="[dropActions]">
              <UButton
                icon="i-heroicons-ellipsis-vertical-16-solid"
                size="md"
                class="ml-1.5 rounded-full"
              />
            </UDropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ButtonColor } from '#ui/types';

const props = defineProps<{
  icon?: string,
  actions?: NavigableItem[],
}>();

const _FILTER_DROP_ITEMS_KEYS = 'drop';
const dropActions = computed(() => props.actions?.filter(action => action.slot === _FILTER_DROP_ITEMS_KEYS) || []);
const barActions = computed(() => props.actions?.filter(action => action.slot !== _FILTER_DROP_ITEMS_KEYS) || []);
</script>