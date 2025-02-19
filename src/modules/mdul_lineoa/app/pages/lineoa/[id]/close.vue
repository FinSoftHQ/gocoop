<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.each.close`,
});
const pageId = {
  page: 'close',
};
</script>