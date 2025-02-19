<template>
  <FPartActionsBar>
    <template
      #left
      v-if="showBackButton"
    >
      <UButton
        color="white"
        icon="i-heroicons-chevron-left-16-solid"
        @click="$router.back()"
      >
        Back
      </UButton>
    </template>
    <template #right>
      <slot>
        <UButton
          type="submit"
          :disabled="!enableSave"
        >
          Save
        </UButton>
      </slot>
    </template>
  </FPartActionsBar>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  showBackButton?: boolean,
  enableSave?: boolean,
}>(), {
  showBackButton: false,
  enableSave: true,
});
</script>