<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `finance.each.root`,
});
const pageId = {
  page: 'root',
};
</script>