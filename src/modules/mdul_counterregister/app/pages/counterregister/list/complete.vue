<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.list.complete`,
});
const pageId = {
  page: 'complete',
};
</script>