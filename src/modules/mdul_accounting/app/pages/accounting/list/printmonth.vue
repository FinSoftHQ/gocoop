<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `accounting.list.printmonth`,
});
const pageId = {
  page: 'printmonth',
};
</script>