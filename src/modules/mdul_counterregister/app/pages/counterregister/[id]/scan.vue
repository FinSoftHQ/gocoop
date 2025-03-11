<template>
  <RealmPageEach :pageId></RealmPageEach>
</template>

<script setup lang="ts">
definePageMeta({
  name: `counterregister.each.scan`,
});
const pageId = {
  page: 'scan',
};
</script>