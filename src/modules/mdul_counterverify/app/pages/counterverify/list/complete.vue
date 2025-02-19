<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.list.complete`,
});
const pageId = {
  page: 'complete',
};
</script>