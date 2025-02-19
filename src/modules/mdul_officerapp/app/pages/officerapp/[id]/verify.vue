<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `officerapp.each.verify`,
});
const pageId = {
  page: 'verify',
};
</script>