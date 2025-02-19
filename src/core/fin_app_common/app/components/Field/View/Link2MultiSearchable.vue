<template>
  <UFormGroup>
    <UCard :ui="{ header: { padding: 'p-4 sm:px-6' }, body: { padding: '' } }">
      <ul
        role="list"
        class="divide-y divide-gray-200 dark:divide-gray-800"
      >
        <li
          v-for="(listItem, index) in listSelected"
          :key="index"
          class="flex items-center justify-between gap-3 py-3 px-4 sm:px-6"
        >
          <div class="flex items-center gap-3 min-w-0">
            <div class="text-sm min-w-0">
              <p class="text-gray-900 dark:text-white font-medium truncate">
                {{ listItem.label }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <UButton
              icon="i-heroicons-ellipsis-vertical"
              color="gray"
              variant="ghost"
            />
          </div>
        </li>
      </ul>
    </UCard>
  </UFormGroup>
</template>

<script setup lang="ts">
const listSelected = defineModel<any[]>({
  default: [],
});
const props = defineProps<{
  modelValue: any;
  icon?: string;
  placeholder?: string;
  link: any;
}>();
// const emits = defineEmits(['update:modelValue']);
// const isOpen = ref(false);
// const listSelected = ref<any[]>(props.modelValue || []);
// const selected = ref<any>();
// const clearValue = () => {
//   selected.value = [];
// };

// const { search, searchText, data: _data, status, error, formatLinkValue } = useLinkQuery(props.link, props.modelValue);
// const fnSearch = async (query: string) => {
//   const result = await search(query) as any[] || [];
//   return result.map((item) => {
//     return {
//       id: item.id,
//       label: formatLinkValue(item),
//     };
//   });
// };
// const choices = computed(() => {
//   return ((_data?.value || []) as any[]).map((item) => {
//     return {
//       id: item.id,
//       label: formatLinkValue(item),
//     };
//   });
// });

// function removeItem(index: number) {
//   listSelected.value.splice(index, 1);
//   emits('update:modelValue', listSelected.value);
// }

// watch(selected, (value: any) => {
//   if (value) {
//     if (!listSelected.value.find((item) => item.id === value.id))
//       listSelected.value.push(value);
//     isOpen.value = false;
//   }
//   emits('update:modelValue', listSelected.value);
// });
// watch(props.modelValue, (value: any) => {
//   listSelected.value = value || [];
// });
</script>
