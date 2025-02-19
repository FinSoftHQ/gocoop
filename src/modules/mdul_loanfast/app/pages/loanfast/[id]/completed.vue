<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `loanfast.each.completed`,
});
const pageId = {
  page: 'completed',
};
</script>