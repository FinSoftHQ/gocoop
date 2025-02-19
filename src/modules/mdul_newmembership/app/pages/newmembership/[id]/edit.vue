<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `newmembership.each.edit`,
});
const pageId = {
  page: 'edit',
};
</script>