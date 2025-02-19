<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `finance.create.root`,
});
const pageId = {
  page: 'root',
};
</script>