<template>
  <UDashboardNavbar
    class="!border-transparent"
    :ui="{ left: 'flex-1' }"
  >
    <template #left>
      <UDropdown
        v-slot="{ open }"
        mode="hover"
        :items="[]"
        class="w-full"
        :ui="{ width: 'w-full' }"
        :popper="{ strategy: 'absolute' }"
      >
        <UButton
          color="gray"
          variant="ghost"
          :class="[open && 'bg-gray-50 dark:bg-gray-800']"
          class="w-full"
        >
          <UAvatar
            src="/logo-theme-fin.jpg"
            size="2xs"
          />

          <span class="truncate text-gray-900 dark:text-white font-semibold">{{ teamLabel }}</span>
        </UButton>
      </UDropdown>
    </template>
  </UDashboardNavbar>
</template>

<script setup lang="ts">
const teamLabel = 'Fin Theme';
</script>