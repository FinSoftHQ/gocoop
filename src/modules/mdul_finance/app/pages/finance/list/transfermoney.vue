<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `finance.list.transfermoney`,
});
const pageId = {
  page: 'transfermoney',
};
</script>