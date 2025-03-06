<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `member.list.root`,
});
const pageId = {
  page: 'root',
};
</script>