<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `generalloan.list.root`,
});
const pageId = {
  page: 'root',
};
</script>