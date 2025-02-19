<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `newmembership.list.root`,
});
const pageId = {
  page: 'root',
};
</script>