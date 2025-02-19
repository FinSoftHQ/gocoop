<template>
  <div class="relative border-b border-gray-200 dark:border-gray-800 py-4 mb-4">
    <div
      v-if="headline"
      class="mb-2 text-sm/6 font-semibold text-primary flex items-center gap-1.5"
    >
      {{ headline }}
    </div>
    <div class="flex flex-col lg:flex-row items-start gap-2">
      <div class="flex-1 flex flex-row gap-2">
        <div
          v-if="icon"
          class="flex"
        >
          <UIcon
            :name="icon"
            class="w-7 h-7 flex-shrink-0 text-primary"
          />
        </div>
        <div class="flex-1">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              <slot></slot>
            </h1>
          </div>
        </div>
      </div>
      <div
        v-if="items"
        class="flex items-stretch flex-shrink-0 gap-1.5"
      >
        <UDropdown :items="items">
          <UButton
            icon="i-heroicons-plus"
            size="sm"
            class="ml-1.5 rounded-full"
          />
        </UDropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavigableItem } from 'fin-app-common/app/composables/blueprint';

const props = defineProps<{
  headline?: string,
  icon?: string,
  items?: NavigableItem[][],
}>();
</script>