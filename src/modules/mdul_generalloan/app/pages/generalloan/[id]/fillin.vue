<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `generalloan.each.fillin`,
});
const pageId = {
  page: 'fillin',
};
</script>