<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `deduction.each.close`,
});
const pageId = {
  page: 'close',
};
</script>