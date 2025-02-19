<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `loanfast.create.confirm`,
});
const pageId = {
  page: 'confirm',
};
</script>