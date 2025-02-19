<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.each.confirmfillin`,
});
const pageId = {
  page: 'confirmfillin',
};
</script>