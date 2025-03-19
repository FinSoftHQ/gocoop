<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `officerapp.each.success`,
});
const pageId = {
  page: 'success',
};
</script>