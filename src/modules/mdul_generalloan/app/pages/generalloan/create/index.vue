<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `generalloan.create.root`,
});
const pageId = {
  page: 'root',
};
</script>