<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterloanfast.each.edit`,
});
const pageId = {
  page: 'edit',
};
</script>