<template>
  <UFormGroup>
    <div>
      <UCard :ui="{ header: { padding: 'p-4 sm:px-6' }, body: { padding: '' } }">
        <template #header>
          <UButton
            icon="i-heroicons-plus-circle-16-solid"
            :ui="{ rounded: 'rounded-full' }"
            @click="isOpen = true"
          >Add</UButton>
        </template>
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
                <!-- <p class="text-gray-500 dark:text-gray-400 truncate">
                  {{ member.username }}
                </p> -->
              </div>
            </div>

            <div class="flex items-center gap-3">
              <UButton
                icon="i-heroicons-trash"
                color="gray"
                variant="ghost"
                @click="removeItem(index)"
              />
            </div>
          </li>
        </ul>
      </UCard>

      <UModal v-model="isCreateOpen">
        <RealmCardEdit
          :pageId="createPageId"
          @save="onCreateSave"
        ></RealmCardEdit>
      </UModal>

      <UModal v-model="isOpen">
        <UCommandPalette
          v-model="selected"
          nullable
          :groups="[{
            key: 'Search data',
            search: fnSearch,
          }]"
        >
          <template #empty-state>
          
            <div
              class="flex flex-col items-center justify-center py-6 gap-3"
            >
              <span class="italic text-sm">Searching for</span>'{{ searchText }}'
              <UButton
               
                label="Add item"
                @click="onAddItem"
              />
            </div>
          </template>
        </UCommandPalette>
      </UModal>

    </div>
  </UFormGroup>
</template>

<script setup lang="ts">
import { on } from 'v-calendar/dist/types/src/utils/helpers.js';

// const inputModel = defineModel<string>();
const props = defineProps<{
  modelValue: any;
  icon?: string;
  placeholder?: string;
  link: any;
}>();
const emits = defineEmits(['update:modelValue']);
const isOpen = ref(false);
const isCreateOpen = ref(false);
const listSelected = ref<any[]>(props.modelValue || []);
const selected = ref<any>();
const clearValue = () => {
  selected.value = [];
};

const { search, searchText, data: _data, status, error, formatLinkValue, createPageId } = useLinkQuery(props.link, props.modelValue);
const fnSearch = async (query: string) => {
  const result = await search(query) as any[] || [];
  return result.map((item) => {
    return {
      id: item.id,
      label: formatLinkValue(item),
    };
  });
};
const choices = computed(() => {
  return ((_data?.value || []) as any[]).map((item) => {
    return {
      id: item.id,
      label: formatLinkValue(item),
    };
  });
});

function removeItem(index: number) {
  listSelected.value.splice(index, 1);
  emits('update:modelValue', listSelected.value);
}

watch(selected, (value: any) => {
  if (value) {
    if (!listSelected.value.find((item) => item.id === value.id))
      listSelected.value.push(value);
    isOpen.value = false;
  }
  emits('update:modelValue', listSelected.value);
});
watch(props.modelValue, (value: any) => {
  listSelected.value = value || [];
});

async function onAddItem() {
  isOpen.value = false;
  await new Promise(resolve => setTimeout(resolve, 300));
  isCreateOpen.value = true;
}

const { pageFunctions, title: createTitle } = useRoleForEdit(createPageId, {
  loadDataHandler: (pageFunctions) => {
    return { data: ref({}), status: ref('success'), error: ref(null) };
  },
});

async function onCreateSave(data: any, reenableSave: () => void) {
  const result = await pageFunctions.backendCaller.update(data);
  isCreateOpen.value = false;
  listSelected.value.push({
    id: result.id,
    label: formatLinkValue(result),
  });
  emits('update:modelValue', listSelected.value);
  reenableSave();
}
</script>
