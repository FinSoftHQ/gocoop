<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `finance.list.approve`,
});
const pageId = {
  page: 'approve',
};
</script>