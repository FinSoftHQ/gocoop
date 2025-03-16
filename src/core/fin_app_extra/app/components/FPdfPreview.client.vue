<template>
  <div>
    <FPartActionsBar>
      <template #left>
        <UButton icon="i-heroicons-arrow-left"
          @click="$router.back()">Close</UButton>
      </template>
      <template #right>
        <UPagination v-model="currentPage"
          :total="pages"
          :page-count="1"></UPagination>
        <UButton icon="i-heroicons-printer"
          @click="printPdf">Print</UButton>
      </template>
    </FPartActionsBar>
    <div class="flex justify-center items-center">
      <ClientOnly>
        <VuePDF :pdf="pdf"
          :page="currentPage" />
      </ClientOnly>
      <div v-if="printSrc"
        class="hidden">
        <iframe ref="pdfPrintObject"
          :src="printSrc"
          type="application/pdf"
          width="0"
          height="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf';

const props = defineProps<{
  src?: string,
  printSrc?: string,
}>();
const injectPdf = usePdf();
const pdfSrc = computed(() => props.src || injectPdf.path);
const printSrc = computed(() => props.printSrc || injectPdf.print);
const pdfPrintObject = ref<HTMLIFrameElement>();

const currentPage = ref(1);
const { pdf, pages, info, print } = usePDF(pdfSrc);

async function printPdf() {
  if (printSrc.value && pdfPrintObject.value?.contentWindow) {
    pdfPrintObject.value.contentWindow.print();
    return;
  }
  await print();
}
</script>
