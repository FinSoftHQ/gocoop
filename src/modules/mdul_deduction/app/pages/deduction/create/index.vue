<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `deduction.create.root`,
});
const pageId = {
  page: 'root',
};
</script>