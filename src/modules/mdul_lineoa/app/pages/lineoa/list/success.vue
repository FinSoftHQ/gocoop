<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.list.success`,
});
const pageId = {
  page: 'success',
};
</script>