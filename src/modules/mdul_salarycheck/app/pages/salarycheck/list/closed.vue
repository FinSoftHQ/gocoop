<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `salarycheck.list.closed`,
});
const pageId = {
  page: 'closed',
};
</script>