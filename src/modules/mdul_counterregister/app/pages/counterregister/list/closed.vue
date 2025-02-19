<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.list.closed`,
});
const pageId = {
  page: 'closed',
};
</script>