<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `accounting.each.root`,
});
const pageId = {
  page: 'root',
};
</script>