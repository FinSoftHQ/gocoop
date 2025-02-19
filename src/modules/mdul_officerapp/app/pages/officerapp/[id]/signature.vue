<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `officerapp.each.signature`,
});
const pageId = {
  page: 'signature',
};
</script>