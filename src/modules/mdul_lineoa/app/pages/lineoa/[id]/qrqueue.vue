<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.each.qrqueue`,
});
const pageId = {
  page: 'qrqueue',
};
</script>