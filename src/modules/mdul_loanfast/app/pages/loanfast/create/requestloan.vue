<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `loanfast.create.requestloan`,
});
const pageId = {
  page: 'requestloan',
};
</script>