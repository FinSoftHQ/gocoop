<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.each.fillin`,
});
const pageId = {
  page: 'fillin',
};
</script>