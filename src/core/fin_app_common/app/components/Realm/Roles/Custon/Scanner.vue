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

            <div class="flex justify-center mt-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                />
              </svg>
            </div>
            <UButton
              class="mt-5"
            >เริ่มสแกน</UButton>
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

useComponentResolver(BuiltInResolvers.Edit);
</script>
