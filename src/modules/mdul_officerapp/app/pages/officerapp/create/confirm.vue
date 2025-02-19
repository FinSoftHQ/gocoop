<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `officerapp.create.confirm`,
});
const pageId = {
  page: 'confirm',
};
</script>