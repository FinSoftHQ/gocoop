<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `finance.list.completed`,
});
const pageId = {
  page: 'completed',
};
</script>