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
              กรุณาเตรียมโทรศัพท์มือถือ และ สแกน QR Code ในหน้านี้ เพื่อถ่ายรูป
            </h3>

            <div class="flex justify-between mt-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-44"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
              <div class="mt-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="{1.5}"
                  stroke="currentColor"
                  width="70"
                  height="70"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
              <!-- qrcode -->
              <FieldViewQrCode
                :modelValue="`link_your_website_here/officerapp/${data.id}/${pageId.page}`"
                class="w-[150px] h-[150px]"
              ></FieldViewQrCode>
            </div>
          </div>
          <div>
            <UButton
              icon="i-heroicons-arrow-path-solid"
              color="gray"
              variant="outline"
              @click="refreshQrCode"
            >Refresh</UButton>

            <div class="flex justify-center"></div>
            <p class="text-lg text-gray-500 dark:text-gray-400 mt-8">
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

function refreshQrCode() {
  window.location.reload();
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
