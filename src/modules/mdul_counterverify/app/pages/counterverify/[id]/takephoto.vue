<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterverify.each.takephoto`,
});
const pageId = {
  page: 'takephoto',
};
</script>