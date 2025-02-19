<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.each.confirmfillin`,
});
const pageId = {
  page: 'confirmfillin',
};
</script>