<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.create.confirm`,
});
const pageId = {
  page: 'confirm',
};
</script>