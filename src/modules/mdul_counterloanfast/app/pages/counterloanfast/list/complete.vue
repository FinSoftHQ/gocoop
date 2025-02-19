<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterloanfast.list.complete`,
});
const pageId = {
  page: 'complete',
};
</script>