<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `officerapp.each.root`,
});
const pageId = {
  page: 'root',
};
</script>