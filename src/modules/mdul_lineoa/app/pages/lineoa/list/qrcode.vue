<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.list.qrcode`,
});
const pageId = {
  page: 'qrcode',
};
</script>