<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const navigation = ref([]);
const headlinks = [{
  label: 'ขอสินเชื่อฉุกเฉิน',
  to: '/loanfast'
}]

const footers: any[] = []

const _files = setupAppNavigation(navigation, headlinks, footers);
// useAppExtraRolesAndComponents();
</script>
