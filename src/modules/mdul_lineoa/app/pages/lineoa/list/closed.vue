<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.list.closed`,
});
const pageId = {
  page: 'closed',
};
</script>