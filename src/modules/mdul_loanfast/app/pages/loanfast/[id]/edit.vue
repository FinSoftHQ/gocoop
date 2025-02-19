<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `loanfast.each.edit`,
});
const pageId = {
  page: 'edit',
};
</script>