<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `finance.list.success`,
});
const pageId = {
  page: 'success',
};
</script>