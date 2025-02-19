<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.each.fillin`,
});
const pageId = {
  page: 'fillin',
};
</script>