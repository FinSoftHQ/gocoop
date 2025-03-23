<template>
    <div>
        <FPartTitle icon="i-heroicons-pencil-square-20-solid"
            :actions>
            {{ title }}
        </FPartTitle>
        <FPartStepper :modelValue="pageDef.currentStepIndex"
            :steps="pageDef.steps?.steps"
            class="mb-4"></FPartStepper>
        <RealmCardEdit :pageId="pageDef.pageId"
            :initial="data"
            :showBackButton="pageDef.hasPrevPage"
            @save="saveThenGoNextPage">
            <ClientOnly>
                <FPdfPreview v-if="definedPdfPrint"></FPdfPreview>
                <p v-else>Missing print definition</p>
            </ClientOnly>
            <template #buttons>
                <UButton type="submit">
                    Next
                </UButton>
            </template>
        </RealmCardEdit>
    </div>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';
import { usePageDefinition, usePageFunctions } from '~/blueprint';

const props = defineProps<{
    pageId: PageIdParam,
}>()

const pageDef = usePageDefinition(props.pageId);
const pageFunctions = usePageFunctions(pageDef);

const title = computed(() => pageDef.label || 'Show Item');
const { data, status, error } = await pageFunctions.backendCaller.get();

const { saveThenGoNextPage } = useRoleForEdit(props.pageId, {
  loadDataHandler: (pageFunctions, pgId) => pageFunctions.localState.get(),
});
// const moduleInfo = useContextualModuleInfo();
const actions = computed(() => pageDef.actions || []);

const definedPdfPrint = ref(false);
const printDefinition = usePdfPrint();
if (import.meta.client && printDefinition) {
  const { data: pdfTemplateData } = await useFetch(printDefinition.templatePath);
  const inputData = computed(() => !printDefinition.dataTransformer ? data.value : printDefinition.dataTransformer(data.value));

  const pdf = await usePdfMeGenerator({ ...(pdfTemplateData.value as any) }, [inputData.value], printDefinition.basePdfPath || printDefinition.blankBasePdf);

  if (!printDefinition.blankBasePdf) {
    usePdf(pdf);
  } else {
    const pdfPrint = await usePdfMeGenerator({ ...(pdfTemplateData.value as any) }, [inputData.value], printDefinition.blankBasePdf);
    usePdf(pdf, pdfPrint);
  }
  definedPdfPrint.value = true;
}
</script>