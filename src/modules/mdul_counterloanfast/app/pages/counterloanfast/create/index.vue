<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterloanfast.create.root`,
});
const pageId = {
  page: 'root',
};
</script>