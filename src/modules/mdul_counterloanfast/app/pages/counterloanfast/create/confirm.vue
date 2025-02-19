<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterloanfast.create.confirm`,
});
const pageId = {
  page: 'confirm',
};
</script>