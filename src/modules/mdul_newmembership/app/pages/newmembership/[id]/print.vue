<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `newmembership.each.print`,
});
const pageId = {
  page: 'print',
};
</script>