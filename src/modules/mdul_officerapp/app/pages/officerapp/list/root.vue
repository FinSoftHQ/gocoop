<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `officerapp.list.root`,
});
const pageId = {
  page: 'root',
};
</script>