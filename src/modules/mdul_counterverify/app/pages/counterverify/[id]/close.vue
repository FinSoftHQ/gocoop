<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.each.close`,
});
const pageId = {
  page: 'close',
};
</script>