<template>
  <RealmPageCreate :pageId></RealmPageCreate>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.create.root`,
});
const pageId = {
  page: 'root',
};
</script>