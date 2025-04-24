<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `generalloan.create.confirm`,
});
const pageId = {
  page: 'confirm',
};
</script>