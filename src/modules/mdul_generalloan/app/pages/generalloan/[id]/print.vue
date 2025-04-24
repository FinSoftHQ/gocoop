<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `generalloan.each.print`,
});
const pageId = {
  page: 'print',
};
</script>