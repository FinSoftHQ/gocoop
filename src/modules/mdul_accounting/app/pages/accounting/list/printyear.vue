<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `accounting.list.printyear`,
});
const pageId = {
  page: 'printyear',
};
</script>