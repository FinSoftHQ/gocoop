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
        <div class="mx-auto max-w-screen-sm text-center">
          <div>
            <h3 class="text-2xl font-bold dark:text-white">
              กรุณาเปิดกล้องโทรศัทพ์ของคุณสแกน
            </h3>
            <h3 class="text-2xl font-bold dark:text-white">
              QR Code บนโทรศัทพ์ของสมาชิก
            </h3>

            <div class="flex justify-center mt-8">
              <!-- <FieldViewQrCode modelValue="กรุณาเปิดกล้องโทรศัทพ์ของคุณในการสแกน" class="w-[150px] h-[150px]" ></FieldViewQrCode> -->
              <div class="flex justify-center ml-11">
                <FLottie src="/ScanWithPhone.lottie"  size="150"></FLottie>
              </div>

            </div>
          </div>
          <div>
            <!-- <UButton class="mt-10"
            icon="i-heroicons-arrow-path-solid"
            color="gray"
            variant="outline">Refresh</UButton> -->

            <div class="mt-10 flex justify-center"></div>

            <p class="text-lg text-gray-500 dark:text-gray-400 mt-4">
              กรุณาเปิดกล้องโทรศัทพ์ของคุณในการสแกน QR Code
              เพื่อให้โทรศัทพ์ของคุณ
            </p>
            <p class="text-lg text-gray-500 dark:text-gray-400">
              สามารถ สแกนเอกสาร หรือ ถ่ายรูปถ่าย และทำธุรกรรมต่อได้
            </p>
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

useComponentResolver(BuiltInResolvers.Edit);
</script>
