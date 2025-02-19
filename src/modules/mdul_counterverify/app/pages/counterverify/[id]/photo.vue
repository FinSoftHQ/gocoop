<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.each.photo`,
});
const pageId = {
  page: 'photo',
};
</script>