<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.create.root`,
});
const pageId = {
  page: 'root',
};
</script>