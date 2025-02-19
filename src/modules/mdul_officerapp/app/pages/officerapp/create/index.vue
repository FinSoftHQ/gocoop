<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `officerapp.create.root`,
});
const pageId = {
  page: 'root',
};
</script>