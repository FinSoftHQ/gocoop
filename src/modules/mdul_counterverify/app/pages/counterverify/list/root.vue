<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.list.root`,
});
const pageId = {
  page: 'root',
};
</script>