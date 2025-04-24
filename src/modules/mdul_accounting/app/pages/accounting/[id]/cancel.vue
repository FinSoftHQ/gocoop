<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `accounting.each.cancel`,
});
const pageId = {
  page: 'cancel',
};
</script>