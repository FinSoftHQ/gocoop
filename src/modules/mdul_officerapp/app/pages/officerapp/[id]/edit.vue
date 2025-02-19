<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `officerapp.each.edit`,
});
const pageId = {
  page: 'edit',
};
</script>