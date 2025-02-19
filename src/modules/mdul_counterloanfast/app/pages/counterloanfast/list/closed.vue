<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterloanfast.list.closed`,
});
const pageId = {
  page: 'closed',
};
</script>