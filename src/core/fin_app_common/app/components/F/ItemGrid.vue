<template>
  <section
    class="grid gap-4"
    :class="gridClass"
  >
    <slot></slot>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  col: 'x2' | 'x3' | 'x4' | 'x5' | 'x6';
}>();

const gridClass = computed(() => {
  return {
    'grid-cols-1 sm:grid-cols-2': props.col === 'x2',
    'grid-cols-2 md:grid-cols-3': props.col === 'x3',
    'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4': props.col === 'x4',
    'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5': props.col === 'x5',
    'grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6': props.col === 'x6',
  };
});
</script>