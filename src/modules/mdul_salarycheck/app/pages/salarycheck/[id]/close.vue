<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `salarycheck.each.close`,
});
const pageId = {
  page: 'close',
};
</script>