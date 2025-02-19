<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `officerapp.list.complete`,
});
const pageId = {
  page: 'complete',
};
</script>