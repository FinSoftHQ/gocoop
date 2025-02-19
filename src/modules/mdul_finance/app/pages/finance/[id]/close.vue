<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `finance.each.close`,
});
const pageId = {
  page: 'close',
};
</script>