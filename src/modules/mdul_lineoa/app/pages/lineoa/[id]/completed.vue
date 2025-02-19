<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.each.completed`,
});
const pageId = {
  page: 'completed',
};
</script>