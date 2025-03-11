<template>
  <div>
    <FPartTitle icon="i-heroicons-pencil-square-20-solid">
      {{ title }}
    </FPartTitle>
    <FPartStepper
      :modelValue="pageDef.currentStepIndex"
      :steps="pageDef.steps?.steps"
      class="mb-4"
    ></FPartStepper>    
   
    <RealmCardEdit
      :pageId="pageDef.pageId"
      :initial="data"
      :showBackButton="pageDef.hasPrevPage"
      @save="save"
    >
    <UCard>
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
          <di>
            <h3 class="text-2xl font-bold dark:text-white">สแกนเก็บลายเซ็น</h3>

            <div class="flex justify-center ml-11">
              <FLottie src="/scan.lottie" class="w-[300px] h-[300px]"></FLottie>
            </div>
            <UButton 
            icon="i-heroicons-play-solid"
            variant="solid"
            @click="alertScannerNotConnected">เริ่มสแกน</UButton>
          </di>         
        </div>
      </div>
    </UCard>
      <template #buttons>
        <UButton type="submit"> Next </UButton>
      </template>
    </RealmCardEdit>
  </div>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';
import FLottie from '~/components/FLottie.vue';

const props = defineProps<{
  pageId: PageIdParam;
}>();
const pageDef = usePageDefinition(props.pageId);
const pageFunctions = usePageFunctions(pageDef);

const title = computed(() => pageDef.label || 'Enter Information');
const data = ref<any>({});
const _current = pageDef.pageId;


if (_current.realm !== 'create' || _current.page !== 'root') {
  const {
    data: retrieved,
    status,
    error,
  } = await pageFunctions.backendCaller.get();

  watchEffect(() => {
    if (status.value === 'success') {
      data.value = retrieved.value;
    }
  });
}

async function save(data2save: any) {
  const result = (await pageFunctions.localState.update(data2save)) as any;

  if (result.id)
    await navigateTo({
      name: pageFunctions.nextPageId({ realm: 'each', page: 'root' }),
      params: { id: result.id },
    });
  else
    await navigateTo({
      name: pageFunctions.nextPageId({ realm: 'list', page: 'root' }),
    });
}

function alertScannerNotConnected() {
  alert('เกิดข้อผิดพลาดในการติดต่อเครื่องสแกน');
}
useComponentResolver(BuiltInResolvers.Edit);
</script>
