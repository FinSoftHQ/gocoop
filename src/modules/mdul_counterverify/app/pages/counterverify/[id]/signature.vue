<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.each.signature`,
});
const pageId = {
  page: 'signature',
};
</script>