<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterloanfast.each.scan`,
});
const pageId = {
  page: 'scan',
};
</script>