<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `salarycheck.create.confirm`,
});
const pageId = {
  page: 'confirm',
};
</script>