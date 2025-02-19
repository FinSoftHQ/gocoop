<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.list.closed`,
});
const pageId = {
  page: 'closed',
};
</script>