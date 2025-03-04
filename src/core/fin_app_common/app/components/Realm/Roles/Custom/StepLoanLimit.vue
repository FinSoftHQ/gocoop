<template>
    <div>
        <FPartTitle icon="i-heroicons-pencil-square-20-solid"
            :actions>
            {{ title }}
        </FPartTitle>
        <FPartStepper :modelValue="pageDef.currentStepIndex"
            :steps="pageDef.steps?.steps"
            class="mb-4"></FPartStepper>
        <UCard v-if="resultMessage"
            class="mb-4 mt-4 ">
            <p class="flex justify-center text-md font-bold text-gray-500 dark:text-gray-400 dark:text-white">
                คุณสามารถกู้เงินได้สูงสุด
            </p>
            <div class="flex justify-center">
                <p class=" text-4xl font-bold text-green-600 dark:text-white mt-5">
                    {{ resultMessage }}
                </p>
                <p class=" text-md font-bold text-gray-500 dark:text-gray-400 dark:text-white ml-2 mt-9">
                    บาท
                </p>
            </div>
        </UCard>
        <RealmCardEdit :pageId="pageDef.pageId"
            :initial="data"
            :showBackButton="pageDef.hasPrevPage"
            @save="saveThenGoNextPage">
            <template v-if="$slots.default"
                #default="{ wrapped, entries, resolver }">
                <slot :wrapped
                    :entries
                    :resolver></slot>
            </template>
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

const props = defineProps<{
    pageId: PageIdParam,
}>()

const { pageDef, pageFunctions, title, actions, data, status, error, saveThenGoNextPage } = useRoleForEdit(props.pageId, {
    loadDataHandler: (pageFunctions, pgId) => pageFunctions.localState.get(),
});

const resultMessage = ref<string>('');

const maxLoanLimits: Record<string, number> = {
    option1: 200000,
    option2: 50000,
    option3: 100000,
    option4: 100000
};

const maxLoanAmount = computed(() => {
    const remainingSalary = data.value.salary - data.value.expense;
    const calculatedLoan = remainingSalary * 3;
    return Math.min(calculatedLoan, maxLoanLimits[data.value.position] || 0);
});

watchEffect(() => {
    if (maxLoanAmount.value > 0) {
        resultMessage.value = `${maxLoanAmount.value} `;
    } else {
        resultMessage.value = `❌ ไม่สามารถคำนวนได้ `;
    }
});

</script>