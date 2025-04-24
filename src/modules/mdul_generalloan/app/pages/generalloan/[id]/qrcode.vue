<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `generalloan.each.qrcode`,
});
const pageId = {
  page: 'qrcode',
};
</script>