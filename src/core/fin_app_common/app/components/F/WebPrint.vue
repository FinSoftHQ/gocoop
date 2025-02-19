<template>
  <div>
    <FPartActionsBar>
      <template #left>
        <UButton
          icon="i-heroicons-arrow-left"
          @click="$router.back()"
        >Close</UButton>
        <UButton
          v-for="(abtn, idx) in actions"
          :key="idx"
          v-bind="{ ...abtn, color: abtn.color as ButtonColor || 'white', target: abtn.target ?? undefined }"
          @click="(abtn.click ?? (() => { }))()"
        ></UButton>
      </template>
      <template #right>
        <UButton @click="print">Print</UButton>
      </template>
    </FPartActionsBar>
    <UCard class="mt-4">
      <div ref="printableArea">
        <slot></slot>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { ButtonColor } from '#ui/types';

const props = defineProps<{
  actions?: NavigableItem[],
}>();
const printableArea = ref<HTMLDivElement>();
const print = async () => {
  await nextTick();
  const printContents = printableArea.value?.innerHTML || 'NO CONTENT!!!';
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).map(style => style.outerHTML).join('');
  const fontLink = '<link href="https://fonts.googleapis.com/css2?family=Sarabun&display=swap" rel="stylesheet">';
  const fontStyle = '<style>body { font-family: "Sarabun", sans-serif; }</style>';
  printWindow?.document.write(`
    <html>
      <head>
        ${fontLink}
        ${styles}
        ${fontStyle}
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `);
  printWindow?.document.close();
  printWindow?.focus();
  printWindow?.print();
  printWindow?.close();
};
</script>