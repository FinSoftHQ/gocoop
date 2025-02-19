<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.create.qrcode`,
});
const pageId = {
  page: 'qrcode',
};
</script>