<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.each.signed`,
});
const pageId = {
  page: 'signed',
};
</script>