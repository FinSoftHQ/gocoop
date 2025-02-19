<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.each.print`,
});
const pageId = {
  page: 'print',
};
</script>