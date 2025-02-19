<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `finance.each.edit`,
});
const pageId = {
  page: 'edit',
};
</script>