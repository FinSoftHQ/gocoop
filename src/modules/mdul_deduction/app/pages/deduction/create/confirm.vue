<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `deduction.create.confirm`,
});
const pageId = {
  page: 'confirm',
};
</script>