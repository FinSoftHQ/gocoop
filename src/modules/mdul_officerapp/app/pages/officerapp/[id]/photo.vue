<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `officerapp.each.photo`,
});
const pageId = {
  page: 'photo',
};
</script>