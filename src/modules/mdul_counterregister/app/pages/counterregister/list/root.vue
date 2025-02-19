<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.list.root`,
});
const pageId = {
  page: 'root',
};
</script>