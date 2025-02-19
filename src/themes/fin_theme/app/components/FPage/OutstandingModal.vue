<template>
  <div class="flex items-center justify-center">

    <UButton
      :icon="closeAction == 'home' ? 'i-heroicons-home' : 'i-heroicons-chevron-left-16-solid'"
      :label="closeLabel"
      @click="handleClose"
      color="black"
      class="absolute top-4"
      :ui="{ rounded: 'rounded-full' }"
    />

    <UCard class="max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur">
      <slot></slot>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  closeLabel?: string
  closeAction?: 'back' | 'home'
}>(), { closeLabel: 'Close', closeAction: 'back' });

function handleClose() {
  const router = useRouter();
  if (props.closeAction === 'back') {
    router.back();
  } else {
    router.push('/');
  }
}
</script>