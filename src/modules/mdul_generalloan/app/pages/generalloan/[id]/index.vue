<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `generalloan.each.root`,
});
const pageId = {
  page: 'root',
};
</script>