<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.each.qrcode`,
});
const pageId = {
  page: 'qrcode',
};
</script>