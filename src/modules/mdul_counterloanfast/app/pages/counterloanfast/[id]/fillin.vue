<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterloanfast.each.fillin`,
});
const pageId = {
  page: 'fillin',
};
</script>