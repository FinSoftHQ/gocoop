<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `member.each.close`,
});
const pageId = {
  page: 'close',
};
</script>