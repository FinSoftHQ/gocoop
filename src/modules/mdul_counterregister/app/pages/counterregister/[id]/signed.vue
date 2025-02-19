<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.each.signed`,
});
const pageId = {
  page: 'signed',
};
</script>