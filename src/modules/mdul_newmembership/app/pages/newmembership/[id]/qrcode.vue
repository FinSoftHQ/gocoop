<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `newmembership.each.qrcode`,
});
const pageId = {
  page: 'qrcode',
};
</script>