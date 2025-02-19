<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.create.confirm`,
});
const pageId = {
  page: 'confirm',
};
</script>