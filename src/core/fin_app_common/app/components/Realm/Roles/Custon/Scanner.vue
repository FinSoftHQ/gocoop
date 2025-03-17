<template>
  <div>
    <FPartTitle icon="i-heroicons-pencil-square-20-solid">
      {{ title }}
    </FPartTitle>
    <FPartStepper :modelValue="pageDef.currentStepIndex"
      :steps="pageDef.steps?.steps"
      class="mb-4"></FPartStepper>

    <RealmCardEdit :pageId="pageDef.pageId"
      :initial="data"
      :showBackButton="pageDef.hasPrevPage"
      @save="save">
      <UCard>
        <div class="mx-auto max-w-screen-sm text-center">
          <h3 class="text-2xl font-bold dark:text-white">
            สแกนเก็บเอกสาร
          </h3>
          <div>
            <p class="text-lg text-gray-500 dark:text-gray-400 mt-4">
              กรุณานำเอกสารใส่เครื่องสแกนและกดปุ่ม "scan" เพื่อแสกนเอกสารเข้าในระบบ
            </p>
          </div>
          <div class="flex justify-center ml-10">
            <div class="flex justify-center">
              <FLottie src="/scan.lottie"
              class="w-[250px] h-[250px]"></FLottie>
            </div>
          </div>
          <div class="flex justify-center">
            <UButton icon="i-heroicons-play-solid"
              variant="solid"
              @click="alertScannerNotConnected">scan</UButton>
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
