<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.each.root`,
});
const pageId = {
  page: 'root',
};
</script>