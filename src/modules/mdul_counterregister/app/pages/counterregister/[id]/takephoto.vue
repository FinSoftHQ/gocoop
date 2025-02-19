<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.each.takephoto`,
});
const pageId = {
  page: 'takephoto',
};
</script>