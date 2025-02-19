<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterloanfast.each.qrcode`,
});
const pageId = {
  page: 'qrcode',
};
</script>