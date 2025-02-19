<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `loanfast.each.root`,
});
const pageId = {
  page: 'root',
};
</script>