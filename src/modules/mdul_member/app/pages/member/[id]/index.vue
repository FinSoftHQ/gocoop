<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `member.each.root`,
});
const pageId = {
  page: 'root',
};
</script>