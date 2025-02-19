<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.each.qrcode`,
});
const pageId = {
  page: 'qrcode',
};
</script>