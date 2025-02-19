<template>
  <RealmPageList :pageId></RealmPageList>
</template>

<script setup lang="ts">
definePageMeta({
  name: `finance.list.active`,
});
const pageId = {
  page: 'active',
};
</script>