<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `loanfast.create.root`,
});
const pageId = {
  page: 'root',
};
</script>