<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `loanfast.list.root`,
});
const pageId = {
  page: 'root',
};
</script>