<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `newmembership.each.takephoto`,
});
const pageId = {
  page: 'takephoto',
};
</script>