<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.each.root`,
});
const pageId = {
  page: 'root',
};
</script>