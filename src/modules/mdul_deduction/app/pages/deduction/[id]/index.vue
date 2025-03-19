<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `deduction.each.root`,
});
const pageId = {
  page: 'root',
};
</script>