<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `salarycheck.create.root`,
});
const pageId = {
  page: 'root',
};
</script>