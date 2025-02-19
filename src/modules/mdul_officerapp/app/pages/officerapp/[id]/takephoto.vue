<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `officerapp.each.takephoto`,
});
const pageId = {
  page: 'takephoto',
};
</script>