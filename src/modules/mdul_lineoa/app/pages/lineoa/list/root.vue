<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.list.root`,
});
const pageId = {
  page: 'root',
};
</script>