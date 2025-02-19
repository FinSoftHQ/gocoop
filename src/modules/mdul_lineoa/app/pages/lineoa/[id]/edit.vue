<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.each.edit`,
});
const pageId = {
  page: 'edit',
};
</script>