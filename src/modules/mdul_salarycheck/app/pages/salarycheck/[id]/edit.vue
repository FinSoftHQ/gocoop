<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `salarycheck.each.edit`,
});
const pageId = {
  page: 'edit',
};
</script>