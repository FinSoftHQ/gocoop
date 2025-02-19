<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.list.service`,
});
const pageId = {
  page: 'service',
};
</script>