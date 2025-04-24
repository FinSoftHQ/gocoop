<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `accounting.create.close`,
});
const pageId = {
  page: 'close',
};
</script>