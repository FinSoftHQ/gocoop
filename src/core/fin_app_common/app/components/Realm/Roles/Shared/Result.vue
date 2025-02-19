<template>
  <RealmCardView
    :pageId="pageDef.pageId"
    :initial="data"
  >
    <template #default="{ wrapped, entries, resolver }">
      <slot
        name="result"
        :wrapped
        :entries
        :resolver
      >
        <div class="flex flex-col items-center justify-center text-center w-full">
          <UIcon
            class="w-16 h-16 mb-4"
            :class="iconClass"
            :name="icon"
          />
          <h1 class="text-2xl font-bold mb-4">{{ title }}</h1>

          <slot
            name="default"
            :wrapped
            :entries
            :resolver
          ></slot>

          <FPartActionsBar class="mt-4">
            <UButton
              v-for="(abtn, idx) in actions"
              :key="idx"
              v-bind="{ ...abtn, color: abtn.color as ButtonColor || 'white', target: abtn.target ?? undefined }"
              @click="(abtn.click ?? (() => { }))()"
            ></UButton>
            <UButton @click="goNextPage">OK</UButton>
          </FPartActionsBar>
        </div>
      </slot>
    </template>
  </RealmCardView>
</template>

<script setup lang="ts">
import type { PageIdParam } from '@finsoft/blueprint';
import type { ButtonColor } from '#ui/types';

const props = defineProps<{
  pageId: PageIdParam,
}>()

const { pageDef, pageFunctions, title, actions, data, status, error, goNextPage } = useRoleForView(props.pageId);
const failureIcons = ['fail', 'failed', 'failure', 'fails', 'false'];
const success = !failureIcons.includes(pageDef.icon ?? 'success');
const icon = success ? 'i-line-md-confirm-circle' : 'i-line-md-close-circle';
const iconClass = success ? 'text-green-500' : 'text-red-500';
</script>
