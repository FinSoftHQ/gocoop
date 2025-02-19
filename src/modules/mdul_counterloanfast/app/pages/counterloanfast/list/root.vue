<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterloanfast.list.root`,
});
const pageId = {
  page: 'root',
};
</script>