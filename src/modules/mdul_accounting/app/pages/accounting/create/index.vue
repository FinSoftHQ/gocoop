<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `accounting.create.root`,
});
const pageId = {
  page: 'root',
};
</script>