<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `finance.list.report`,
});
const pageId = {
  page: 'report',
};
</script>