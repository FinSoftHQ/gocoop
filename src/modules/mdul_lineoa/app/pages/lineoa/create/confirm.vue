<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `lineoa.create.confirm`,
});
const pageId = {
  page: 'confirm',
};
</script>