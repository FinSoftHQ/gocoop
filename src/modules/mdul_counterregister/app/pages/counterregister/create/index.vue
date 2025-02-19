<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.create.root`,
});
const pageId = {
  page: 'root',
};
</script>